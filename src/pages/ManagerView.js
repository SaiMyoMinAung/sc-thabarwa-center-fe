import React, { useEffect, useState } from 'react';
import { confirmEventById, fetchEvents } from '../api/eventClient.js';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';

export default function ManagerView() {
  const { t, i18n } = useTranslation();
  const today = new Date();

  const [eventData, setEventData] = useState([]);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [rowLoading, setRowLoading] = useState({}); // { [id]: boolean }
  const [toast, setToast] = useState({ open: false, severity: 'success', message: '' });

  useEffect(() => {
    const controller = new AbortController();

    fetchEvents({ params: { date: `${currentYear}-${currentMonth + 1}` }, signal: controller.signal })
      .then(data => {
        setEventData(Array.isArray(data.data) ? data.data : []);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          console.error(err);
          setToast({ open: true, severity: 'error', message: err.message || 'Failed to load events' });
          window.location.href = '/manager-login';
        }
      });

    return () => controller.abort();
  }, [currentYear, currentMonth]);

  const changeToNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 11) {
        setCurrentYear((prevYear) => prevYear + 1);
        return 0;
      }
      return prevMonth + 1;
    });
  };

  const changeToPrevMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 0) {
        setCurrentYear((prevYear) => prevYear - 1);
        return 11;
      }
      return prevMonth - 1;
    });
  };

  const handleConfirm = async (ev, id, confirm) => {
    ev.preventDefault();
    if (!id) return;
    setRowLoading(prev => ({ ...prev, [id]: true }));
    try {
      // send update to backend
      await confirmEventById(id, { confirm: confirm });

      // update local state
      setEventData(prev => prev.map(item => item.id === id ? { ...item, confirm: confirm } : item));

      setToast({ open: true, severity: 'success', message: confirm ? 'Confirmed Successful' : 'Remove Confirmation Successful' });
    } catch (err) {
      console.error(err);
      const msg = err?.message || 'Failed to confirm';
      setToast({ open: true, severity: 'error', message: msg });
    } finally {
      setRowLoading(prev => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setToast(prev => ({ ...prev, open: false }))} severity={toast.severity} sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Manager - Events ({currentYear}-{String(currentMonth + 1).padStart(2, '0')})</h1>
        <div className="space-x-2">
          <button onClick={changeToPrevMonth} className="px-3 py-1 bg-gray-200 rounded">Prev</button>
          <button onClick={changeToNextMonth} className="px-3 py-1 bg-gray-200 rounded">Next</button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr className='font-bold '>
              <th className="min-w-40 text-center px-4 py-2 text-sm font-medium text-gray-700">{t('donate_date')}</th>
              <th className="min-w-40 text-center px-4 py-2 text-sm font-medium text-gray-700">{t('donate_event_for')}</th>
              <th className="min-w-40 text-center px-4 py-2 text-sm font-medium text-gray-700">{t('donate_title')}</th>
              <th className="min-w-40 text-center px-4 py-2 text-sm font-medium text-gray-700">{t('donate_description')}</th>
              <th className="min-w-40 text-center px-4 py-2 text-sm font-medium text-gray-700">{t('donate_address')}</th>
              <th className="min-w-40 text-center px-4 py-2 text-sm font-medium text-gray-700">{t('donate_phone')}</th>
              <th className="min-w-40 text-center px-4 py-2 text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {eventData.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-sm text-gray-500">No events</td>
              </tr>
            ) : (
              eventData.map(ev => (
                <tr className={ev.confirm ? 'bg-green-300' : 'bg-red-300'} key={ev.id || ev._id || `${ev.date}-${ev.event_for}`}>
                  <td className="px-4 py-3 text-sm text-gray-700">{ev.date}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{ev.event_for}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{ev.title}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{ev.description}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{ev.address}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{ev.phone}</td>
                  <td className="px-4 py-3 text-right text-sm">
                    <div className="inline-flex items-center space-x-2">
                      <button
                        onClick={(e) => handleConfirm(e, ev.id, !ev.confirm)}
                        // disabled={ev.confirm || rowLoading[ev.id]}
                        className={`px-3 py-1 rounded text-sm ${ev.confirm ? 'bg-gray-200 text-gray-600' : 'bg-indigo-600 text-white hover:bg-indigo-500'}`}
                      >
                        {rowLoading[ev.id] ? 'Confirming...' : (ev.confirm ? 'Remove Confirmation' : 'Need To Confirm')}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
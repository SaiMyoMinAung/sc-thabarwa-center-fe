import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';
import Modal from '@mui/material/Modal';
import { deleteAnnouncement, fetchAnnouncements, fetchEachAnnouncement, saveAnnouncements, setAnnouncementAlwaysTrue, updateAnnouncement } from '../api/announcementClient.js';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BasicDatePicker from '../components/BasicDatePicker.js';

const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AnnouncementView() {
  const { t, i18n } = useTranslation();
  const today = new Date();

  const [announcementData, setannouncementData] = useState([]);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [rowLoading, setRowLoading] = useState({}); // { [id]: boolean }
  const [toast, setToast] = useState({ open: false, severity: 'success', message: '' });
  const [open, setOpen] = React.useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  // form data
  const [date, setDate] = React.useState(`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`);
  const [annoText, setAnnoText] = React.useState('');
  // edit control
  const [editId, setEditId] = React.useState('');
  const [editDate, setEditDate] = React.useState('');
  const [annoEditText, setAnnoEditText] = React.useState('');
  const [editOpen, setEditOpen] = React.useState(false);
  const handleOpenEditModal = () => setEditOpen(true);
  const handleCloseEditModal = () => setEditOpen(false);

  const submitAnno = () => {
    if (!date) {
      alert('please select date')
    }

    if (!annoText) {
      alert('please select annoText')
    }

    saveAnnouncements({
      date: date,
      announcement: annoText
    }).then(data => {
      setannouncementData([...announcementData, data])
    }).catch(err => {
      console.log(err)
      setToast({ open: true, severity: 'error', message: err.message || 'Failed to create announcement' });
    });

    handleCloseModal()
  };

  useEffect(() => {
    const controller = new AbortController();

    fetchAnnouncements({ params: { year: currentYear, month: `${String(currentMonth + 1).padStart(2, '0')}` }, signal: controller.signal })
      .then(data => {
        setannouncementData(Array.isArray(data.data) ? data.data : []);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setToast({ open: true, severity: 'error', message: err.message || 'Failed to load events' });
          window.location.href = '/manager-login';
        }
      });

    return () => controller.abort();
  }, [currentYear, currentMonth]);

  const deleteHandle = (e, id) => {

    if (window.confirm("Are you sure to delete") == true) {

      deleteAnnouncement(id).then(data => {
        if (data) {

          setannouncementData(prev => prev.filter(item => item.id !== id))

          setToast({ open: true, severity: 'success', message: 'Delete Successful' });
        } else {
          setToast({ open: true, severity: 'error', message: 'Failed to delete' });
        }
      }).catch(err => {
        if (err.name !== 'AbortError') {
          setToast({ open: true, severity: 'error', message: err.message || 'Failed to load events' });
          // window.location.href = '/manager-login';
        }
      });
    }
  }

  const editHandle = (e, id) => {

    fetchEachAnnouncement(id)
      .then(data => {
        console.log(data)
        setEditDate(data.date)
        setAnnoEditText(data.announcement)
        setEditId(data.id)
        handleOpenEditModal()
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setToast({ open: true, severity: 'error', message: err.message || 'Failed to load events' });
          // window.location.href = '/manager-login';
        }
      });
  }

  const submitEditAnno = async (ev) => {
    ev.preventDefault();

    if (!editId) return;

    setRowLoading(prev => ({ ...prev, [editId]: true }));

    try {
      const updated = await updateAnnouncement(editId, {
        date: editDate,
        announcement: annoEditText
      });

      // update local state
      setannouncementData(prev => prev.map(item => item.id === editId ? updated : item));

      handleCloseEditModal()

      setToast({ open: true, severity: 'success', message: 'Set Successful' });
    } catch (err) {
      console.error(err);
      const msg = err?.message || 'Failed to set';
      setToast({ open: true, severity: 'error', message: msg });
    } finally {
      setRowLoading(prev => ({ ...prev, [editId]: false }));
    }
  }

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

  const handleControl = async (ev, id) => {
    ev.preventDefault();

    if (!id) return;

    setRowLoading(prev => ({ ...prev, [id]: true }));

    try {
      await setAnnouncementAlwaysTrue(id);

      // update local state
      setannouncementData(prev => prev.map(item => item.id === id ? { ...item, always_show: true } : { ...item, always_show: false }));

      setToast({ open: true, severity: 'success', message: 'Set Successful' });
    } catch (err) {
      console.error(err);
      const msg = err?.message || 'Failed to set';
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
        <h1 className="text-xl font-semibold">
          Announcement ({currentYear}-{String(currentMonth + 1).padStart(2, '0')})
          <Button onClick={handleOpenModal}>Create Announcement</Button>
        </h1>
        <div className="space-x-2">
          <button onClick={changeToPrevMonth} className="px-3 py-1 bg-gray-200 rounded">Prev</button>
          <button onClick={changeToNextMonth} className="px-3 py-1 bg-gray-200 rounded">Next</button>
          <Modal
            open={open}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography className="border border-1" id="modal-modal-title" variant="h6" component="h2">
                Create Announcement Form
              </Typography>

              {/* date */}
              <div className="sm:col-span-2">
                <div className="mt-2.5">
                  <BasicDatePicker
                    date={date}
                    onChange={(d) => {
                      // d is a dayjs object or null
                      const iso = d ? d.format('YYYY-MM-DD') : null;
                      setDate(iso);
                    }}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="annoText" className={`block text-sm/6 font-semibold text-gray-900`}>
                  Announcement
                </label>
                <div className="mt-2.5">
                  <textarea
                    onChange={(e) => setAnnoText(e.target.value)}
                    value={annoText}
                    id="annoText"
                    name="annoText"
                    autoComplete="annoText"
                    placeholder="Announcement"
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                  >
                  </textarea>
                </div>
              </div>

              <div className="mt-10">
                <button
                  onClick={(e) => submitAnno(e)}
                  className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Create
                </button>
              </div>

            </Box>
          </Modal>
          <Modal
            open={editOpen}
            onClose={handleCloseEditModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography className="border border-1" variant="h6" component="h2">
                Edit Announcement Form
              </Typography>

              {/* date */}
              <div className="sm:col-span-2">
                <div className="mt-2.5">
                  <BasicDatePicker
                    date={editDate}
                    onChange={(d) => {
                      // d is a dayjs object or null
                      const iso = d ? d.format('YYYY-MM-DD') : null;
                      setDate(iso);
                    }}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="annoText" className={`block text-sm/6 font-semibold text-gray-900`}>
                  Announcement
                </label>
                <div className="mt-2.5">
                  <textarea
                    onChange={(e) => setAnnoEditText(e.target.value)}
                    value={annoEditText}
                    id="annoText"
                    name="annoText"
                    autoComplete="annoText"
                    placeholder="Announcement"
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                  >
                  </textarea>
                </div>
              </div>

              <div className="mt-10">
                <button
                  onClick={(e) => submitEditAnno(e)}
                  className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Update
                </button>
              </div>

            </Box>
          </Modal>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr className='font-bold'>
              <th className="min-w-40 text-center px-4 py-2 text-sm font-medium text-gray-700">Date</th>
              <th className="min-w-40 text-center px-4 py-2 text-sm font-medium text-gray-700">Announcement</th>
              <th className="min-w-40 text-center px-4 py-2 text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {announcementData.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-sm text-gray-500">No announcement</td>
              </tr>
            ) : (
              announcementData.map(ev => (
                <tr className="text-center" key={ev.id}>
                  <td className="px-4 py-3 text-sm text-gray-700">{ev.date}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{ev.announcement}</td>
                  <td className="px-4 py-3 text-center text-sm">
                    <button
                      onClick={(e) => handleControl(e, ev.id)}
                      // disabled={ev.confirm || rowLoading[ev.id]}
                      className={`px-3 py-1 rounded text-sm ${ev.always_show ? 'bg-green-200 text-gray-600' : 'bg-gray-600 text-white hover:bg-indigo-500'}`}
                    >
                      {rowLoading[ev.id] ? 'Changing...' : 'Set Always Show'}
                    </button>
                    <button
                      onClick={(e) => editHandle(e, ev.id)}
                      className={`ml-1 px-3 py-1 bg-blue-300 rounded text-sm hover:bg-indigo-500 hover:text-white`}
                    >
                      edit
                    </button>
                    <button
                      onClick={(e) => deleteHandle(e, ev.id)}
                      className={`ml-1 px-3 py-1 bg-red-300 rounded text-sm hover:bg-indigo-500 hover:text-white`}
                    >
                      delete
                    </button>

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
import SimpleCalendar from '../components/SimpleCalendar';
import { fetchCalenderData } from '../api/eventClient.js';
import React, { useEffect, useState } from 'react';
import './Home.css';
import { getTodayAnnouncementData } from '../api/announcementClient.js';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const today = new Date();
  const { t } = useTranslation();

  const [calendarData, setCalendarData] = useState([]);
  const [announcementData, setAnnouncementData] = useState('');
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const controller = new AbortController();

    setLoading(true)

    fetchCalenderData({ params: { 'date': `${currentYear}-${currentMonth + 1}` }, signal: controller.signal })
      .then(data => {
        setCalendarData(data)
        setLoading(false)
      })
      .catch(err => {
        if (err.name !== 'AbortError') console.error(err);
      });

    getTodayAnnouncementData()
      .then(data => {
        setAnnouncementData(data)
        setLoading(false)
      })
      .catch(err => {
        if (err.name !== 'AbortError') console.error(err);
      });

    return () => controller.abort(); // cancels when component unmounts

  }, [currentYear, currentMonth]);

  const changeToNextMonth = () => {

    setCurrentMonth((prevMonth) => {
      if (prevMonth === 11) {
        setCurrentYear((prevYear) => prevYear + 1);
        return 0;
      } else {
        return prevMonth + 1;
      }
    });

  }

  const changeToPrevMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 0) {
        setCurrentYear((prevYear) => prevYear - 1);
        return 11;
      } else {
        return prevMonth - 1;
      }
    });
  }

  return (
    <div className='bg-gray-200'>
      <header className="text-center my-6">
        <h1 className="text-3xl md:text-4xl font-bold text-teal-700">အလှူတော် မှတ်တမ်း ပြက္ခဒိန်</h1>
        <p className="text-gray-600 mt-4">ရိပ်သာအတွက် အလှူရှင်များ၏ အလှူတော်များကို မှတ်သားရန်</p>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg">
          <SimpleCalendar loading={loading} prevMonthClicked={() => changeToPrevMonth()} nextMonthClicked={() => changeToNextMonth()} year={currentYear} month={currentMonth} calendarData={calendarData} />
        </div>

        <div className="space-y-8">

          <div id="announcement-section" className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold border-b pb-2 mb-4 text-teal-700">ရိပ်သာမှ အသိပေးကြေညာချက်</h3>
            <div id="announcement-content" className="text-gray-700 space-y-2">
              {
                announcementData ?
                  <p>{announcementData.announcement}</p>
                  :
                  <p>{t('no_announcement')}</p>
              }

            </div>
          </div>

        </div>
      </main>

    </div>
  )
}

export default Home;

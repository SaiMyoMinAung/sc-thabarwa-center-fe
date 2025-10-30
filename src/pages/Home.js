import SimpleCalendar from '../components/SimpleCalendar';
import { fetchCalenderData } from '../api/eventClient.js';
import React, { useEffect, useState } from 'react';
import './Home.css';

const Home = () => {
  const today = new Date();

  const [calendarData, setCalendarData] = useState([]);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  useEffect(() => {

    const controller = new AbortController();

    fetchCalenderData({ params: { 'date': `${currentYear}-${currentMonth + 1}` }, signal: controller.signal })
      .then(data => {
        setCalendarData(data)
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
        <p className="text-gray-600 mt-2">ရိပ်သာအတွက် အလှူရှင်များ၏ အလှူတော်များကို မှတ်သားရန်</p>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg">
          <SimpleCalendar prevMonthClicked={() => changeToPrevMonth()} nextMonthClicked={() => changeToNextMonth()} year={currentYear} month={currentMonth} calendarData={calendarData} />
        </div>

        <div className="space-y-8">

          <div id="announcement-section" className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold border-b pb-2 mb-4 text-teal-700">ရိပ်သာမှ အသိပေးကြေညာချက်</h3>
            <div id="announcement-content" className="text-gray-700 space-y-2">
              <p>Loading...</p>
            </div>
          </div>

          <div id="admin-panel" className="hidden bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold border-b pb-2 mb-4 text-indigo-700">အလှူလက်ခံရန် စာရင်း</h3>
            <div id="pending-requests" className="space-y-4">
              <p className="text-gray-500">လက်ခံရန် အလှူစာရင်းမရှိပါ။</p>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-bold border-b pb-2 mb-4 text-indigo-700">ကြေညာချက်တင်ရန်</h3>
              <textarea id="announcement-input" className="w-full p-2 border rounded-lg" rows="4" placeholder="ကြေညာချက် စာသား ရိုက်ထည့်ပါ..."></textarea>
              <div className="flex gap-2 mt-2">
                <button id="post-announcement" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">Post</button>
                <button id="gemini-suggestion-btn" className="w-full flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">✨ အကြံတောင်းရန်</button>
              </div>
            </div>
          </div>

        </div>
      </main>

    </div>
  )
}

export default Home;

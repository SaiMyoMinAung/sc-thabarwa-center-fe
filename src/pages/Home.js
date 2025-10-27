import SimpleCalendar from '../components/SimpleCalendar';
import { fetchCalenderData } from '../api/eventClient.js';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [calendarData, setCalendarData] = useState([]);
  // require format for event to show on calendar:

  useEffect(() => {

    const controller = new AbortController();

    fetchCalenderData({ params: { 'date': '2025-10' }, signal: controller.signal })
      .then(data => {
        setCalendarData(data)
      })
      .catch(err => {
        if (err.name !== 'AbortError') console.error(err);
      });

    return () => controller.abort(); // cancels when component unmounts
  }, []);

  return (
    <div>
      <SimpleCalendar calendarData={calendarData} />
    </div>
  )
}

export default Home;

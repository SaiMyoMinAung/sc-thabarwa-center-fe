import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchCalenderDetailData } from '../api/eventClient';
import { useTranslation } from 'react-i18next';
import convertDateLang from '../utils/convertDateLang';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import BackButton from '../components/BackButton';

export default function Detail(props) {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const [calendarDetailData, setCalendarDetailData] = useState({});

  useEffect(() => {
    const controller = new AbortController();

    fetchCalenderDetailData({ params: { date: params.date }, signal: controller.signal })
      .then(data => {
        setCalendarDetailData(data || {});
      })
      .catch(err => {
        if (err.name !== 'AbortError') console.error(err);
      });

    return () => controller.abort();
  }, [params.date]);

  const renderCard = (key, label, data) => {
    if (data) {
      return (
        <div className="border rounded-lg bg-white p-4 shadow-sm flex flex-col">
          <h1 className="text-center text-green-400 font-bold text-3xl my-4">{t(data.event_for)} {t('detail_donar')}</h1>
          <h1 className="text-1xl my-2">{t('donate_title')}</h1>
          <h1 className="text-2xl text-blue-500 my-2">{data.title}</h1>
          <h1 className="text-1xl my-2">{t('donate_description')}</h1>
          <h1 className="text-2xl text-blue-500 my-2">{data.description}</h1>
          <h1 className="text-1xl my-2">{t('phone')}</h1>
          <h1 className="text-2xl text-blue-500 my-2">{data.phone}</h1>
          <h1 className="text-1xl my-2">{t('donate_address')}</h1>
          <h1 className="text-2xl text-blue-500 my-2">{data.address}</h1>
        </div>
      );
    }

    // not donated -> show donate button
    return (
      <div className="border rounded-lg bg-white p-4 shadow-sm flex flex-col items-center">
        <div className="font-bold text-center text-3xl text-red-400 mb-10">{t(label)} {t('detail_no_donor')}</div>
        <Link
          to={`/donate/${label}/${params.date}`}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 text-sm"
        >
          {t('detail_donation_button')}
        </Link>
      </div>
    );
  };

  // note: your API returns breakfast and lunch. user requested "dinner and breakfast side by side"
  // we place breakfast and lunch side-by-side; label right column "Dinner" if you prefer change label.
  return (
    <div className="isolate bg-white px-6 py-10 sm:py-6 lg:px-8 w-full min-h-screen flex flex-col bg-gray-50">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        />
      </div>
      <BackButton />
      <header className="mb-6">
        <h1 className="text-center text-2xl font-bold">{convertDateLang(params.date, i18n.language)}</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        {renderCard('breakfast', 'breakfast', calendarDetailData[params.date]?.breakfast)}
        {renderCard('lunch', 'lunch', calendarDetailData[params.date]?.lunch)}
      </div>
    </div>
  );
}

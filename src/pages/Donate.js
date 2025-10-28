import React, { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import BasicDatePicker from '../components/BasicDatePicker.js';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router';
import convertDateLang from '../utils/convertDateLang.js';
import { createEvent } from '../api/eventClient.js';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import BackButton from '../components/BackButton.js';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #07ec39ff',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Donate = () => {
  const params = useParams()
  console.log('Donate page params:', params)
  const { t, i18n } = useTranslation();

  const [date, setDate] = useState(params.date);
  const [title, setTitle] = useState('');
  const [phone, setPhone] = useState('');
  const [eventFor, setEventFor] = useState(params.eventFor || 'breakfast');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [alert, setAlert] = useState({ open: false, severity: 'error', message: '' });
  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setAlert(prev => ({ ...prev, open: false }));
  };

  const [titleError, setTitleError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const [addressError, setAddressError] = useState(null);

  const [modelBoxOpen, setModelBoxOpen] = useState(false);

  const submitEvent = (e) => {
    e.preventDefault();

    let payload = {
      date,
      title,
      phone,
      event_for: eventFor,
      description,
      address,
    };

    if (title === '') {
      setTitleError(true)
    } else {
      setTitleError(false)
    }

    if (phone === '') {
      setPhoneError(true)
    } else {
      setPhoneError(false)
    }

    if (description === '') {
      setDescriptionError(true)
    } else {
      setDescriptionError(false)
    }

    if (address === '') {
      setAddressError(true)
    } else {
      setAddressError(false)
    }

    console.log('Submitting event payload:', payload);

    createEvent(payload)
      .then(res => {
        setAlert({ open: true, severity: 'success', message: t('donate_success_message') });
        setModelBoxOpen(true)
        // auto hide after 4s
        // Snackbar will auto hide; keep timeout optional
      })
      .catch(err => {
        console.error('Error submitting event:', err);
        const msg = err?.message || (err?.data?.message) || (t('donate_error') || 'Failed to save. Please try again.');
        setAlert({ open: true, severity: 'error', message: msg });
      })
  }

  return (
    <div className="isolate bg-white px-6 py-10 sm:py-6 lg:px-8">
      <BackButton />
      <Modal
        open={modelBoxOpen}
        // onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 500, height: 120 }}>

          <p className='text-center' id="parent-modal-description">
            {t('donate_success_message')}
          </p>

          <p className='text-center mt-5'>
            <Link to={`/`}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 text-sm">
              Back to Home
            </Link>
          </p>

        </Box>
      </Modal>
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
      <div className="mx-auto max-w-2xl text-center">
        <h3 className="text-balance text-3xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
          <span className="text-blue-700">{convertDateLang(date, i18n.language)} </span> {t('detail_heading_for')}
        </h3>
        <h4 className="pt-4 text-balance text-3xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
          <span className="text-blue-700">{t(eventFor)}</span> {t('donate_heading')}
        </h4>
      </div>
      <form className="mx-auto mt-8 max-w-xl sm:mt-8">
        <Snackbar
          open={alert.open}
          autoHideDuration={alert.severity === 'error' ? 6000 : 4000}
          onClose={handleToastClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleToastClose} severity={alert.severity} sx={{ width: '100%' }}>
            {alert.message}
          </Alert>
        </Snackbar>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">

          {/* date */}
          {/* <div className="sm:col-span-2">
            <label htmlFor="date" className="block text-sm/6 font-semibold text-gray-900">
              {t('donate_date')}
            </label>
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
            <div className='pt-1'>{convertDateLang(date, i18n.language)} {t('donate_selected_date')}</div>
          </div> */}

          {/* <div>
            <label htmlFor="event_for" className="block text-sm/6 font-semibold text-gray-900">
              {t('donate_event_for')}
            </label>
            <div className="mt-1.5">
              <div className="flex rounded-md bg-white outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                <select
                  id="event_for"
                  name="event_for"
                  value={eventFor}
                  onChange={(e) => setEventFor(e.target.value)}
                  autoComplete="event_for"
                  aria-label="Donation For"
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md py-2 pl-3.5 pr-7 text-base text-gray-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                  <option value="breakfast">{t('breakfast')}</option>
                  <option value="lunch">{t('lunch')}</option>
                </select>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
              </div>
            </div>
          </div> */}

          <div className="sm:col-span-2">
            <label htmlFor="title" className={`block ${titleError === true ? 'text-red-500' : ''} text-sm/6 font-semibold text-gray-900`}>
              {t('donate_title')}
            </label>
            <div className="mt-2.5">
              <input
                id="title"
                name="title"
                type="text"
                value={title}
                placeholder={t('demo_placeholder_title')}
                onChange={(e) => setTitle(e.target.value)}
                className={`block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600`}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="description" className={`block ${descriptionError === true ? 'text-red-500' : ''} text-sm/6 font-semibold text-gray-900`}>
              {t('donate_description')}
            </label>
            <div className="mt-2.5">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="description"
                name="description"
                autoComplete="description"
                placeholder={t('demo_placeholder_description')}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              >
              </textarea>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="address" className={`block ${addressError === true ? 'text-red-500' : ''} text-sm/6 font-semibold text-gray-900`}>
              {t('donate_address')}
            </label>
            <div className="mt-2.5">
              <textarea
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                id="address"
                name="address"
                autoComplete="address"
                placeholder={t('demo_placeholder_address')}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              >
              </textarea>
            </div>
          </div>

          {/* phone */}
          <div>
            <label htmlFor="phone-number" className={`block ${phoneError === true ? 'text-red-500' : ''}  text-sm/6 font-semibold text-gray-900`}>
              {t('donate_phone')}
            </label>
            <div className="mt-2.5">
              <div className="flex rounded-md bg-white outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                <input
                  onChange={(e) => setPhone(e.target.value)}
                  id="phone-number"
                  name="phone-number"
                  type="number"
                  value={phone}
                  placeholder={t('demo_phone')}
                  autoComplete="tel"
                  aria-label="Phone Number"
                  className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                />
              </div>
            </div>
          </div>

        </div>
        <div className="mt-10">
          <button
            type="submit"
            onClick={(e) => submitEvent(e)}
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {t('donate_submit')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Donate
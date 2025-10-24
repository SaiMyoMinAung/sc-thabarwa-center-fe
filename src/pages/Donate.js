import React, { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import BasicDatePicker from '../components/BasicDatePicker.js';

const Donate = () => {
  const [date, setDate] = useState('');

  const [phone, setPhone] = useState('');
  const [eventFor, setEventFor] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div className="isolate bg-white px-6 py-20 sm:py-10 lg:px-8">
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
        <h2 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          Submit Alms Donation
        </h2>
        <p className="mt-2 text-lg/8 text-gray-600">
          Everyone can donate breakfast, lunch and tea time.
        </p>
      </div>
      <form className="mx-auto mt-8 max-w-xl sm:mt-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          
          {/* date */}
          <div className="sm:col-span-2">
            <label htmlFor="date" className="block text-sm/6 font-semibold text-gray-900">
              Date
            </label>
            <div className="mt-2.5">
              <BasicDatePicker />
            </div>
          </div>

          {/* phone */}
          <div>
            <label htmlFor="phone-number" className="block text-sm/6 font-semibold text-gray-900">
              Phone number
            </label>
            <div className="mt-2.5">
              <div className="flex rounded-md bg-white outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                <input
                  id="phone-number"
                  name="phone-number"
                  type="text"
                  placeholder="09 123 456 789"
                  className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="event_for" className="block text-sm/6 font-semibold text-gray-900">
              Donation For
            </label>
            <div className="mt-1.5">
              <div className="flex rounded-md bg-white outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                <select
                  id="event_for"
                  name="event_for"
                  autoComplete="event_for"
                  aria-label="Donation For"
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md py-2 pl-3.5 pr-7 text-base text-gray-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="tea time">Tea Time</option>
                </select>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
              </div>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="title" className="block text-sm/6 font-semibold text-gray-900">
              Title
            </label>
            <div className="mt-2.5">
              <input
                id="title"
                name="title"
                type="text"
                autoComplete="organization"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="description" className="block text-sm/6 font-semibold text-gray-900">
              Description
            </label>
            <div className="mt-2.5">
              <textarea
                id="description"
                name="description"
                autoComplete="description"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              >
              </textarea>
            </div>
          </div>

        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit Now
          </button>
        </div>
      </form>
    </div>
  )
}

export default Donate
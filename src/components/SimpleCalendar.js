import { CheckCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// FullScreenCalendar.jsx
// Displays a large, full-screen monthly calendar view.
// Uses Tailwind CSS for styling.

export default function SimpleCalendar(props) {
    const { t, i18n } = useTranslation();

    const today = new Date();
    const year = today.getFullYear();
    const monthIndex = today.getMonth(); // 0-11

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const firstOfMonth = new Date(year, monthIndex, 1);
    const lastOfMonth = new Date(year, monthIndex + 1, 0);
    const startWeekday = firstOfMonth.getDay();
    const daysInMonth = lastOfMonth.getDate();

    const cells = [];
    for (let i = 0; i < startWeekday; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);

    const findCalendarDataForDay = (day, month, year) => {
        if (!props.calendarData || props.calendarData.length === 0) return null;

        const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        return props.calendarData[dateStr];

    };

    const determineCellColor = (day, foundData) => {

        let colored = 'bg-white';
        console.log('day', day)
        console.log('today', today.getDate());
        console.log('checking', day >= today.getDate())

        if (foundData !== null) {
            // console.log('foundData', foundData)
            if (foundData !== undefined) {
                if (foundData.breakfast !== null && foundData.lunch !== null) {
                    colored = 'bg-red-500';
                } if (
                    (foundData.breakfast !== null && foundData.lunch === null)
                    ||
                    (foundData.breakfast === null && foundData.lunch !== null)
                ) {
                    colored = 'bg-yellow-300';
                } else if ((day >= today.getDate())) {
                    if (foundData.lunch === null || foundData.breakfast === null) {
                        colored = 'bg-green-300';
                    }

                }
            }
        }
        console.log('color ', colored)
        return colored;


        // ? ((day !== null) ? 'bg-red-400' : '') : ((day !== null) ? 'bg-green-300' : ''

        // if (data) {
        //     if (data.breakfast && data.lunch) return 'bg-red-400'; // Both donated
        //     return 'bg-green-300'; // Partial donation
        // }
        // return 'bg-white'; // No donation
    }

    return (
        <div className="w-full h-screen flex flex-col bg-gray-100 p-6">
            <header className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800">{monthNames[monthIndex]}</h1>
                    <p className="text-lg text-gray-500">{year}</p>
                </div>
                <div className="text-md text-gray-600">Today: {today.toLocaleDateString()}</div>
            </header>

            <div className="grid grid-cols-7 gap-2 text-center text-base font-semibold text-gray-700 border-b border-gray-300 pb-2">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
            </div>

            <div className="grid grid-cols-7 gap-2 flex-1 mt-2 [grid-auto-rows:1fr]">
                {cells.map((day, idx) => {
                    const isToday = day === today.getDate();
                    const foundData = findCalendarDataForDay(day, monthIndex + 1, year);
                    const controlBg = determineCellColor(day, foundData);
                    // console.log('foundData for day', foundData);
                    // determineCellColor(day);
                    return (
                        <Link
                            to={
                                day ?
                                    `/detail/${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                                    :
                                    '/'
                            }
                            key={idx}
                            className={`
                                ${controlBg}
                                border rounded-xl text-lg transition-all duration-200 ${day ? '' : 'bg-transparent'} ${isToday ? 'border-2 border-blue-600 font-bold text-blue-600' : 'border-gray-200 text-gray-700'}`}
                        >
                            {/* <div className="flex items-center space-x-3 p-2">
                                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-gray-50">
                                    <span className="font-medium text-gray-800">{day || ''}</span>
                                </div>
                            </div> */}
                            {
                                foundData !== null && foundData !== undefined
                                    ?
                                    <div className="flex items-center space-x-3 p-2">
                                        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-gray-50">
                                            <span className="text-sm font-medium text-gray-800">{day || ''}</span>
                                        </div>
                                        <div className="flex-1">
                                            <ul>
                                                {foundData.breakfast ?
                                                    <li className="text-xs p-1">

                                                        <div className="flex items-center justify-between">
                                                            <span className={`${controlBg === 'bg-red-500' ? 'text-white' : ''}`}>{t('breakfast')}</span>
                                                            <CheckCircleIcon className="inline-block h-5 w-5 text-green-500" />
                                                        </div>
                                                    </li>
                                                    :
                                                    ''
                                                }
                                                {foundData.lunch ?
                                                    <li className="text-xs p-1">
                                                        <div className="flex items-center justify-between">
                                                            <span className={`${controlBg === 'bg-red-500' ? 'text-white' : ''}`}>{t('lunch')}</span>
                                                            <CheckCircleIcon className="inline-block h-5 w-5 text-green-500" />
                                                        </div>
                                                    </li>
                                                    :
                                                    ''
                                                }
                                                {/* {controlBg === 'bg-green-300' ?
                                                    <Link
                                                        className="flex items-center justify-between"
                                                        to={`/donate/${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`}
                                                    >
                                                        <span className="border rounded-md bg-white font-bold text-blue-700 px-2 mt-2 text-center hover:bg-gray-100" style={{ fontSize: '10px' }}>လှူဒါန်းမည်</span>
                                                    </Link>
                                                    : ''} */}
                                            </ul>
                                        </div>
                                    </div>
                                    :
                                    <div className="p-2">
                                        <span className="text-sm font-medium text-gray-800">{day || ''}</span>
                                    </div>
                            }
                        </Link>
                    );
                })}
            </div>
        </div >
    );
}
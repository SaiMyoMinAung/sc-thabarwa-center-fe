import { CheckCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { convertYear, convertMonth } from "../utils/convertDateLang";
import CircularProgress from "@mui/material/CircularProgress";

export default function SimpleCalendar({ loading, year, month, calendarData, nextMonthClicked, prevMonthClicked }) {
    const { t, i18n } = useTranslation();

    const today = new Date();

    const firstOfMonth = new Date(year, month, 1);
    const lastOfMonth = new Date(year, month + 1, 0);
    const startWeekday = firstOfMonth.getDay();
    const daysInMonth = lastOfMonth.getDate();

    const cells = [];
    for (let i = 0; i < startWeekday; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);

    const findCalendarDataForDay = (day, month, year) => {
        if (!calendarData || calendarData.length === 0) return null;

        const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        return calendarData[dateStr];
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
    }

    return (
        <div className="w-full flex flex-col p-6">

            <div className="flex justify-between items-center mb-4">
                <button onClick={() => prevMonthClicked()} className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">&lt;</button>
                <h2 className="lg:text-2xl font-bold">{convertYear(year, i18n.language)} {convertMonth(month, i18n.language)}</h2>
                <button onClick={() => nextMonthClicked()} className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">&gt;</button>
            </div>

            <div className="calendar-grid mb-2">
                <div className="day-name text-xs md:text-lg lg:text-lg xl:text-lg 2xl:text-lg rounded-t-lg">{t('sunday')}</div>
                <div className="day-name text-xs md:text-lg lg:text-lg xl:text-lg 2xl:text-lg rounded-t-lg">{t('monday')}</div>
                <div className="day-name text-xs md:text-lg lg:text-lg xl:text-lg 2xl:text-lg rounded-t-lg">{t('tuesday')}</div>
                <div className="day-name text-xs md:text-lg lg:text-lg xl:text-lg 2xl:text-lg rounded-t-lg">{t('wednesday')}</div>
                <div className="day-name text-xs md:text-lg lg:text-lg xl:text-lg 2xl:text-lg rounded-t-lg">{t('thursday')}</div>
                <div className="day-name text-xs md:text-lg lg:text-lg xl:text-lg 2xl:text-lg rounded-t-lg">{t('friday')}</div>
                <div className="day-name text-xs md:text-lg lg:text-lg xl:text-lg 2xl:text-lg rounded-t-lg">{t('sunday')}</div>
            </div>
            {
                loading ?
                    <div className="flex flex-col items-center m-40">
                        <CircularProgress size={60} />
                    </div>
                    :
                    <div className="grid grid-cols-7 gap-2 mt-2 [grid-auto-rows:1fr]">
                        {cells.map((day, idx) => {
                            const isToday = day === today.getDate();
                            const foundData = findCalendarDataForDay(day, month + 1, year);
                            const controlBg = determineCellColor(day, foundData);
                            // console.log('foundData for day', foundData);
                            // determineCellColor(day);
                            return (
                                <Link
                                    className={`
                                ${controlBg}
                                flex calendar-grid border rounded-xl transition-all duration-200 ${day ? '' : 'bg-transparent'} ${isToday ? 'border-2 border-blue-600 font-bold text-blue-600' : 'border-gray-200 text-gray-700'}`}
                                    to={
                                        day ?
                                            `/detail/${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                                            :
                                            '/'
                                    }
                                    key={idx}
                                >
                                    {
                                        foundData !== null && foundData !== undefined
                                        &&
                                        <div className="flex-1">
                                            <div className="p-1 font-bold lg:text-lg">{day}</div>

                                            <div className="hidden md:block lg:block xl:block 2xl:block flex-1 text-sm mt-auto text-green-700">
                                                {foundData.breakfast ?
                                                    <div className="text-xs p-1 flex flex-row items-center justify-between">
                                                        <span className={`${controlBg === 'bg-red-500' ? 'text-white' : ''}`}>{t('breakfast')}</span>
                                                        <CheckCircleIcon className="inline-block h-5 w-5 text-green-500" />
                                                    </div>
                                                    :
                                                    ''
                                                }

                                                {foundData.lunch ?
                                                    <div className=" text-xs p-1 flex flex-row items-center justify-between">
                                                        <span className={`${controlBg === 'bg-red-500' ? 'text-white' : ''}`}>{t('lunch')}</span>
                                                        <CheckCircleIcon className="inline-block h-5 w-5 text-green-500" />
                                                    </div>

                                                    : ''
                                                }

                                            </div>
                                        </div>

                                    }
                                </Link>

                                // <Link
                                //     to={
                                //         day ?
                                //             `/detail/${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                                //             :
                                //             '/'
                                //     }
                                //     key={idx}
                                //     className={`
                                //         ${controlBg}
                                //         border rounded-xl text-lg transition-all duration-200 ${day ? '' : 'bg-transparent'} ${isToday ? 'border-2 border-blue-600 font-bold text-blue-600' : 'border-gray-200 text-gray-700'}`}
                                // >
                                //     {
                                //         foundData !== null && foundData !== undefined
                                //             ?
                                //             <div className="flex items-center space-x-3 p-2">
                                //                 <div className="md:w-10 md:h-10 lg:w-10 lg:h-10 xl:w-10 xl:h-10 2xl:w-10 2xl:h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-gray-50">
                                //                     <span className="text-sm font-medium text-gray-800">{day || ''}</span>
                                //                 </div>
                                //                 <div className="flex-1 hidden md:block lg:block xl:block 2xl:block">
                                //                     <ul>
                                //                         {foundData.breakfast ?
                                //                             <li className="text-xs p-1">

                                //                                 <div className="flex items-center justify-between">
                                //                                     <span className={`${controlBg === 'bg-red-500' ? 'text-white' : ''}`}>{t('breakfast')}</span>
                                //                                     <CheckCircleIcon className="inline-block h-5 w-5 text-green-500" />
                                //                                 </div>
                                //                             </li>
                                //                             :
                                //                             ''
                                //                         }
                                //                         {foundData.lunch ?
                                //                             <li className="text-xs p-1">
                                //                                 <div className="flex items-center justify-between">
                                //                                     <span className={`${controlBg === 'bg-red-500' ? 'text-white' : ''}`}>{t('lunch')}</span>
                                //                                     <CheckCircleIcon className="inline-block h-5 w-5 text-green-500" />
                                //                                 </div>
                                //                             </li>
                                //                             :
                                //                             ''
                                //                         }
                                //                     </ul>
                                //                 </div>
                                //             </div>
                                //             :
                                //             <div className="p-2">
                                //                 <span className="text-sm font-medium text-gray-800">{day || ''}</span>
                                //             </div>
                                //     }
                                // </Link>
                            );
                        })}
                    </div>
            }

        </div>
    );
}
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

    const determineCellColor = (day, month, year) => {

        let colored = 'bg-white';
        let foundData = null;

        if (!calendarData || calendarData.length === 0) return { foundData, colored };;

        const passedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        foundData = calendarData[passedDate];
        colored = 'bg-white';

        console.log('day', day)
        console.log('today', today.getDate());
        console.log('checking', day >= today.getDate())

        if (foundData !== null && foundData !== undefined) {
            console.log('foundData', foundData)

            if (foundData.breakfast !== null && foundData.lunch !== null) {
                console.log('red condition')
                colored = 'bg-red-500';
            } else if (
                (foundData.breakfast !== null && foundData.lunch === null)
                ||
                (foundData.breakfast === null && foundData.lunch !== null)
            ) {
                console.log('yellow condition')
                colored = 'bg-yellow-300';
            } else if ((new Date(passedDate) >= new Date())) {
                if (foundData.lunch === null || foundData.breakfast === null) {
                    console.log('green condition')
                    colored = 'bg-green-300';
                }
            }

        }

        return { foundData, colored };
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

                            const { foundData, colored } = determineCellColor(day, month + 1, year);

                            return (
                                <Link
                                    className={`
                                ${colored}
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
                                            <div className="p-1 font-bold lg:text-lg">
                                                {day}
                                                {isToday && <span class="text-sm"> {t('today')} </span>}
                                            </div>

                                            <div className="hidden md:block lg:block xl:block 2xl:block flex-1 text-sm mt-auto text-green-700">
                                                {foundData.breakfast ?
                                                    <div className="text-xs p-1 flex flex-row items-center justify-between">
                                                        <span className={`${colored === 'bg-red-500' ? 'text-white' : ''}`}>{t('breakfast')}</span>
                                                        <CheckCircleIcon className="inline-block h-5 w-5 text-green-500" />
                                                    </div>
                                                    :
                                                    ''
                                                }

                                                {foundData.lunch ?
                                                    <div className=" text-xs p-1 flex flex-row items-center justify-between">
                                                        <span className={`${colored === 'bg-red-500' ? 'text-white' : ''}`}>{t('lunch')}</span>
                                                        <CheckCircleIcon className="inline-block h-5 w-5 text-green-500" />
                                                    </div>

                                                    : ''
                                                }

                                            </div>
                                        </div>

                                    }
                                </Link>
                            );
                        })}
                    </div>
            }

        </div>
    );
}
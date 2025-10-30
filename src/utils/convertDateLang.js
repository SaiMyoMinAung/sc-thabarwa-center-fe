/**
 * convertDateLang.js
 *
 * Convert a date to English ('en') or Myanmar ('my') human-readable string.
 *
 * Usage:
 *   convertDateLang(dateInput, 'en') -> "1 January 2025" (depends on engine locale)
 *   convertDateLang(dateInput, 'my') -> "၁ ဇန်နဝါရီ ၂၀၂၅"
 *
 * Accepts Date object, timestamp, or date string.
 */

const MY_DIGITS = ['၀', '၁', '၂', '၃', '၄', '၅', '၆', '၇', '၈', '၉'];

const EN_MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const MY_MONTHS = [
    'ဇန်နဝါရီ', 'ဖေဖော်ဝါရီ', 'မတ်', 'ဧပြီ', 'မေ', 'ဇွန်',
    'ဇူလိုင်', 'ဩဂုတ်', 'စက်တင်ဘာ', 'အောက်တိုဘာ', 'နိုဝင်ဘာ', 'ဒီစင်ဘာ'
];

/**
 * Convert digits in a string to Myanmar numerals.
 */
function toMyanmarDigits(str) {
    return String(str).replace(/\d/g, (d) => MY_DIGITS[Number(d)]);
}

export const convertYear = (year, changeTo = 'en') => {
    if (changeTo === 'my') {
        return toMyanmarDigits(year);
    }

    return String(year);
}

export const convertMonth = (monthIdx, changeTo = 'en') => {
    if (changeTo === 'my') {
        return MY_MONTHS[monthIdx];
    }

    return EN_MONTHS[monthIdx];
}

/**
 * Convert a date to the requested language.
 * @param {Date|string|number} input - Date object, ISO date string, or timestamp.
 * @param {'en'|'my'} changeTo - Target language code ('en' or 'my').
 * @returns {string|null} Formatted date string or null if invalid date.
 */
export default function convertDateLang(input, changeTo = 'en') {
    const d = input instanceof Date ? input : new Date(input);
    if (Number.isNaN(d.getTime())) return null;

    const lang = changeTo === 'my' ? 'my' : 'en';
    const options = { day: 'numeric', month: 'long', year: 'numeric' };

    // Try Intl formatting first
    let formatted;
    try {
        formatted = new Intl.DateTimeFormat(lang, options).format(d);
    } catch (e) {
        // Fallback: build using month arrays
        const day = d.getDate();
        const monthIdx = d.getMonth();
        const year = d.getFullYear();
        formatted = `${day} ${lang === 'my' ? MY_MONTHS[monthIdx] : EN_MONTHS[monthIdx]} ${year}`;
    }

    if (changeTo === 'my') {
        // Ensure month name is in Myanmar (Intl may already provide it; if not, replace English month)
        const lower = formatted.toLowerCase();
        for (let i = 0; i < EN_MONTHS.length; i++) {
            if (lower.includes(EN_MONTHS[i].toLowerCase())) {
                const re = new RegExp(EN_MONTHS[i], 'ig');
                formatted = formatted.replace(re, MY_MONTHS[i]);
                break;
            }
        }
        // Convert Western digits to Myanmar digits
        formatted = toMyanmarDigits(formatted);
    }

    return formatted;
}
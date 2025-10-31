import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            "home": "Calendar",
            "about": "About",
            "contact": "Contact",
            "menu_title": "Shwe Chaung Thabarwa Center",
            "donate": "Donate",
            // demo
            "demo_placeholder_title": "Eg. Mingalar Oo Donation",
            "demo_placeholder_description": "Eg. Ko Mg Mg and Ma La La’s Breakfast Alms Donation for their Wedding Ceremony.",
            "demo_placeholder_address": "Eg. No.123, Pan Bait Tan Street, Hlaing Tharyar Township, Yangon.",
            "demo_phone": "09 456 789 123",
            // 
            "phone": "Phone : ",
            "back": "Back",
            // option
            "breakfast": "Breakfast",
            "lunch": "Lunch",
            "both_breakfast_lunch": "Both Breakfast And Lunch",
            // donate page
            "donate_heading": "Donate Breakfast Or Lunch",
            "donate_description": "Please fill out the form below to make a donation for meals.",
            "donate_selected_date": "Date Selected",
            "donate_phone": "Phone Number",
            "donate_date": "Date",
            "donate_event_for": "Breakfast Or Lunch",
            "donate_title": "Donation Title",
            "donate_address": "Donation Address",
            "donate_submit": "Submit Now",
            // detail page
            'detail_heading_for': "",
            'detail_donar': "Donor",
            'detail_no_donar': "no donar yet.",
            'detail_donation_button': "Doate Now",
            // detail page
            'detail_title': "Title",
            'detail_description': "Description",
            'detail_phone': "Phone",
            'detail_date': "Date",
            // donate success message
            "donate_success_message": "The meditation center will get back to you soon.",
            // day
            'monday': 'Mon',
            'tuesday': 'Tues',
            'wednesday': 'Wed',
            'thursday': 'Thu',
            'friday': 'Fri',
            'saturday': 'Sat',
            'sunday': 'Sun',
        }
    },
    my: {
        translation: {
            "home": "ပြက္ခဒိန်",
            "about": "အကြောင်း",
            "contact": "ဆက်သွယ်ရန်",
            "menu_title": "ရွှေချောင်းသဘာဝဓမ္မရိပ်သာ ပြက္ခဒိန် ",
            "donate": "လှူဒါန်းမည်",
            // demo
            "demo_placeholder_title": "ဥပမာ. မင်္ဂလာဦး ဆွမ်းအလှူ",
            "demo_placeholder_description": "ဥပမာ. ကိုမောင်မောင် နှင့် မလလ တို့၏ မင်္ဂလာဆောင်ဦး အလှူ",
            "demo_placeholder_address": "ဥပမာ. ရန်ကုန်မြို့၊ လှိုင်သာယာမြို့နယ်၊ ပန်းဘဲတန်းလမ်း၊ အမှတ် ၁၂၃",
            "demo_phone": "၀၉ ၄၅၆ ၇၈၉ ၁၂၃",
            // other
            "phone": "ဖုန်းနံပါတ် : ",
            "back": "နောက်သို့",
            // option
            "breakfast": "အရုဏ်ဆွမ်း",
            "lunch": "နေ့ဆွမ်း",
            "both_breakfast_lunch": "တနေ့တာ",
            // donate page
            "donate_heading": " လှူဒါန်းရန်",
            "donate_event_for": "လှူဒါန်းမည့် ဆွမ်း ရွေးပါ",
            "donate_date": "ရက်စွဲ",
            "donate_selected_date": " ကို ရွေးထားပါသည်။",
            "donate_phone": "ဖုန်းနံပါတ် ဖြည့်ပါ",
            "donate_submit": "လှူဒါန်းမည်",
            "donate_address": "လှူဒါန်းမည့် လိပ်စာ",
            "donate_title": "လှူဒါန်းမည့် ခေါင်းစဉ်",
            "donate_description": "လှူဒါန်းမည့် အခြား ဖော်ပြချက်",
            // detail page
            'detail_donar': "အလှူရှင်",
            'detail_heading_for': " နေ့ အတွက်",
            'detail_no_donar': "အလှူရှင် မရှိသေးပါ။",
            'detail_donation_button': "လှူဒါန်းရန် နှိပ်ပါ။",
            // message
            "donate_success_message": "ရိပ်သာမှ မကြာမီပြန်လည်အကြောင်းပြန်ပါမည်။",
            // day
            'monday': 'တနင်္လာ',
            'tuesday': 'အင်္ဂါ',
            'wednesday': 'ဗုဒ္ဓဟူး',
            'thursday': 'ကြာသပတေး',
            'friday': 'သောကြာ',
            'saturday': 'စနေ',
            'sunday': 'တနင်္ဂနွေ',
        }
    }
};

const savedLng = localStorage.getItem('i18nextLng') || 'en';

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: savedLng,
        fallbackLng: 'en',
        interpolation: { escapeValue: false },
    });

export default i18n;
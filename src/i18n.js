import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            "home": "Home",
            "about": "About",
            "contact": "Contact",
            "submit": "Submit Now",
            "menu_title": "Shwe Chaung Thabarwa Center",
            "donate": "Donate"
        }
    },
    my: {
        translation: {
            "home": "ပင်မ",
            "about": "အကြောင်း",
            "contact": "ဆက်သွယ်ရန်",
            "submit": "တင်မည်",
            "menu_title": "ရွှေချောင်း သဘာဝတရား ရိပ်သာ",
            "donate": "လှူဒါန်းမည်"
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
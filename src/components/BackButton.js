// src/components/BackButton.jsx
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function BackButton() {

    const { t } = useTranslation();

    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)}
            className="fixed top-20 left-8 z-50 bg-white border-2 border-blue-400 text-blue-500 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 shadow-sm"
        >
            {t('back')}
        </button>
    );
}
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ka from './locales/ka.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ka: { translation: ka },
    },
    lng: localStorage.getItem('cinesphere-lang')
      ? JSON.parse(localStorage.getItem('cinesphere-lang'))
      : 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;

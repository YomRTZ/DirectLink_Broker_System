import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation files will be loaded manually from JSON objects in this example
import enTranslation from './locales/en/translation.json';
import amTranslation from './locales/am/translation.json';

i18n
  .use(LanguageDetector) // Automatically detect language
  .use(initReactI18next)  // React bindings
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      am: {
        translation: amTranslation,
      },
    },
    fallbackLng: 'en',  // Fallback language if the detected language isn't available
    debug: true,
    interpolation: {
      escapeValue: false,  // React already escapes values
    },
  });

export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { getLanguageFromBrowser } from '@common/utils';
import loginEn from './login/en.json';
import loginEs from './login/es.json';

const languageDetector = new LanguageDetector();
languageDetector.addDetector({
  name: 'preferredLanguage',
  lookup() {
    return (
      localStorage.getItem('PREFERRED_LANGUAGE') ||
      getLanguageFromBrowser()
    );
  },
});

void i18n.use(initReactI18next).use(languageDetector).init({
  fallbackLng: 'en',
  partialBundledLanguages: true,
  ns: [],
  resources: {},
});

i18n.addResourceBundle('en', 'login', loginEn);
i18n.addResourceBundle('es', 'login', loginEs);

export { i18n };

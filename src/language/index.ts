import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { getLanguageFromBrowser } from '@common/utils';
import notFoundEn from './notFound/en.json';
import notFoundEs from './notFound/es.json';
import loginEn from './login/en.json';
import loginEs from './login/es.json';
import sideNavBarEn from './sideNavBar/en.json';
import sideNavBarEs from './sideNavBar/es.json';
import settingsEn from './settings/en.json';
import settingsEs from './settings/es.json';
import tracksEn from './tracks/en.json';
import tracksEs from './tracks/es.json';
import mediaHeaderEn from './mediaHeader/en.json';
import mediaHeaderEs from './mediaHeader/es.json';
import artistEn from './artist/en.json';
import artistEs from './artist/es.json';

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

i18n.addResourceBundle('en', 'notFound', notFoundEn);
i18n.addResourceBundle('es', 'notFound', notFoundEs);
i18n.addResourceBundle('en', 'login', loginEn);
i18n.addResourceBundle('es', 'login', loginEs);
i18n.addResourceBundle('en', 'sideNavBar', sideNavBarEn);
i18n.addResourceBundle('es', 'sideNavBar', sideNavBarEs);
i18n.addResourceBundle('en', 'settings', settingsEn);
i18n.addResourceBundle('es', 'settings', settingsEs);
i18n.addResourceBundle('en', 'tracks', tracksEn);
i18n.addResourceBundle('es', 'tracks', tracksEs);
i18n.addResourceBundle('en', 'mediaHeader', mediaHeaderEn);
i18n.addResourceBundle('es', 'mediaHeader', mediaHeaderEs);
i18n.addResourceBundle('en', 'artist', artistEn);
i18n.addResourceBundle('es', 'artist', artistEs);

export { i18n };

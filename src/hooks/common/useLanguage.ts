import { i18n } from '@language/index';

export const useLanguage = (ns?: string) => {
  const nsTranslate = ns || 'layout';
  const lng: string = 'en';

  const t = (key: string, object?: { [key: string]: unknown }) => {
    return i18n.t(key, {
      ...object,
      lng,
      ns: nsTranslate,
      interpolation: { escapeValue: false },
    });
  };

  return { t, lng };
};

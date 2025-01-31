export const getLanguageFromBrowser = (): string => {
  const language = (
    window.navigator.languages
      ? window.navigator.languages[0]
      : window.navigator.language
  ).split('-')[0];

  if (['en', 'es'].includes(language)) {
    return language;
  }

  return 'en';
};

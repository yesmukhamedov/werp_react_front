export const loadLang = () => {
  try {
    const serializedLang = localStorage.getItem('lang');
    if (serializedLang === null) {
      return undefined;
    }
    return JSON.parse(serializedLang);
  } catch (error) {
    return undefined;
  }
};

export const saveLang = lang => {
  try {
    const serializedLang = JSON.stringify(lang);
    localStorage.setItem('lang', serializedLang);
    localStorage.setItem('language', lang.locales.lang);
  } catch (error) {
    // Ignore write errors.
  }
};

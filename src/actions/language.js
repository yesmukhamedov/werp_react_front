import { CHANGE_LANGUAGE } from './types';

export default function changeLanguage(lang) {
  return dispatch => {
    localStorage.setItem('language', lang);
    dispatch({
      type: CHANGE_LANGUAGE,
      payload: lang,
    });
  };
}

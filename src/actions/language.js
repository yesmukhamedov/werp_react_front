import { CHANGE_LANGUAGE } from './types';

export default function changeLanguage(lang) {
  return (dispatch) => {
    dispatch({
      type: CHANGE_LANGUAGE,
      payload: lang,
    });
  };
}

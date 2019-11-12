import { CHANGE_LANGUAGE } from './types';
import Cookies from 'js-cookie';
import { setContentLanguageHeader } from '../utils/setHeaders';

export default function changeLanguage(lang) {
  return dispatch => {
    Cookies.set('JWT-LANG', lang);
    dispatch({
      type: CHANGE_LANGUAGE,
      payload: lang,
    });
  };
}

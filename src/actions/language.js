import { CHANGE_LANGUAGE } from './types';
import Cookies from 'js-cookie';
//import { setContentLanguageHeader } from '../utils/setHeaders';

export default function changeLanguage(lang) {
  return dispatch => {
    Cookies.set(
      process.env.REACT_APP_LEGACY_COOKIE_PARAMS_LANG_TOKEN_NAME,
      lang,
    );
    dispatch({
      type: CHANGE_LANGUAGE,
      payload: lang,
    });
  };
}

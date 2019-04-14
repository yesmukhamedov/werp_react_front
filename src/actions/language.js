import { CHANGE_LANGUAGE } from './types';
import { setContentLanguageHeader } from '../utils/setHeaders';

export default function changeLanguage(lang) {
  return dispatch => {
    //setContentLanguageHeader(lang);
    dispatch({
      type: CHANGE_LANGUAGE,
      payload: lang,
    });
  };
}

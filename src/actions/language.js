import { CHANGE_LANGUAGE } from './types';

export default function changeLanguage(lang) {
  return {
    type: CHANGE_LANGUAGE,
    payload: lang,
  };
}

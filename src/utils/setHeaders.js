import axios from 'axios';
import { DEFAULT_LANGUAGE } from './constants';

export const setAuthorizationHeader = (token = null) => {
  if (token) {
    axios.defaults.headers.common.Authorization = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export const setContentLanguageHeader = (lang = DEFAULT_LANGUAGE) => {
  axios.defaults.headers.common['Content-Language'] = lang;
};

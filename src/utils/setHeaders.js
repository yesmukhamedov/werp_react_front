import axios from 'axios';

export const setAuthorizationHeader = (token = null) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const setContentLanguageHeader = (lang = 'ru') => {
  axios.defaults.headers.common['Content-Language'] = lang;
};

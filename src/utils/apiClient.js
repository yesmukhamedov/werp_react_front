import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(config => {
  config.withCredentials = true;
  let token = Cookies.get(
    process.env.REACT_APP_LEGACY_COOKIE_PARAMS_JWT_TOKEN_NAME,
  );
  if (token) {
    config.headers['authorization'] = token;
  } else {
    config.headers['authorization'] = '';
  }

  config.headers['Content-Language'] = localStorage.getItem('language');
  return config;
});

export default axiosInstance;

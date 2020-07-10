import axios from 'axios';
// import Cookies from 'js-cookie';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(config => {
  config.withCredentials = true;
  // config.headers.Authorization = localStorage.getItem('token');
  config.headers['authorization'] = localStorage.getItem('token');
  config.headers['Content-Language'] = localStorage.getItem('language');
  config.headers[
    'Time-Zone'
  ] = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return config;
});

export default axiosInstance;

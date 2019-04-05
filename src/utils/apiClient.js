import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(config => {
  config.headers.Authorization = localStorage.getItem('token');
  config.headers['Content-Language'] = localStorage.getItem('language');
  return config;
});

export default axiosInstance;

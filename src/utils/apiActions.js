import axios from 'axios';
import axiosInstance from './apiClient';
import { ROOT_URL, SERVICE_URL, YANDEX_GEOCODE } from './constants';
import { ROOT_URL, SERVICE_URL, CRM_URL, CRM_CALL_CENTER } from './constants';

const defineBackendUrl = uri => {
  let arr = uri.split('/');
  if (arr && arr.length > 0) {
    switch (arr[0].toUpperCase()) {
      case 'SERVICE':
        return SERVICE_URL;
      case 'CORE':
        return ROOT_URL;
      case 'YANDEX_GEOCODE':
        return YANDEX_GEOCODE;
      case 'CRM2':
        return CRM_URL;
      case 'CALL_CENTER_2021':
        return CRM_CALL_CENTER;
      default:
        return ROOT_URL;
    }
  } else return ROOT_URL;
};

export const doGet = (uri, params = {}) => {
  let url = defineBackendUrl(uri);
  return axiosInstance.get(url + '/api/' + uri, {
    params,
  });
};

export const doGetYandex = (params = {}) => {
  return axios.get('https://geocode-maps.yandex.ru/1.x', {
    params,
  });
};

export const doGet2 = (uri, params = {}) => {
  let url = CRM_URL;
  return axiosInstance.get(url + '/api/' + uri, {
    params,
  });
};

export const doPost = (uri, postData, params = {}) => {
  let url = defineBackendUrl(uri);
  return axiosInstance.post(url + '/api/' + uri, postData, {
    params,
  });
};

export const doPut = (uri, putData, params = {}) => {
  let url = defineBackendUrl(uri);
  return axiosInstance.put(url + '/api/' + uri, putData, {
    params,
  });
};

export const doDelete = (uri, delData, params = {}) => {
  let url = defineBackendUrl(uri);
  return axiosInstance.delete(url + '/api/' + uri, delData, {
    params,
  });
};

export const doGetCancelToken = (uri, token, params = {}) => {
  let url = defineBackendUrl(uri);
  return axiosInstance.get(url + '/api/' + uri, {
    params,
    cancelToken: token,
  });
};

export const doPostExcel = (uri, postData, params = {}) => {
  let url = defineBackendUrl(uri);
  return axiosInstance.post(url + '/api/' + uri, postData, {
    params,
    responseType: 'blob',
  });
};

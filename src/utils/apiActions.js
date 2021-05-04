import axiosInstance from './apiClient';
import { ROOT_URL, SERVICE_URL, CRM_URL } from './constants';

const defineBackendUrl = uri => {
  let arr = uri.split('/');
  if (arr && arr.length > 0) {
    switch (arr[0].toUpperCase()) {
      case 'SERVICE':
        return SERVICE_URL;
      case 'CORE':
        return ROOT_URL;
      case 'RECO':
        return CRM_URL;
      case 'CALL':
        return CRM_URL;
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
export const doGet2 = (uri, params = {}) => {
  let url = defineBackendUrl(uri);
  console.log('uri: ' + uri, 'url: ' + url);
  return axiosInstance.get(url + '/' + uri, {
    params,
  });
};

export const doPost = (uri, postData, params = {}) => {
  let url = defineBackendUrl(uri);
  return axiosInstance.post(url + '/api/' + uri, postData, {
    params,
  });
};

export const doPost2 = (uri, postData, params = {}) => {
  let url = defineBackendUrl(uri);
  return axiosInstance.post(url + uri, postData, {
    params,
  });
};

export const doPut = (uri, putData, params = {}) => {
  let url = defineBackendUrl(uri);
  return axiosInstance.put(url + '/api/' + uri, putData, {
    params,
  });
};

export const doPut2 = (uri, putData, params = {}) => {
  let url = defineBackendUrl(uri);
  return axiosInstance.put(url + uri, putData, {
    params,
  });
};

export const doDelete = (uri, delData, params = {}) => {
  let url = defineBackendUrl(uri);
  return axiosInstance.delete(url + '/api/' + uri, delData, {
    params,
  });
};

export const doDelete2 = (uri, delData, params = {}) => {
  let url = defineBackendUrl(uri);
  return axiosInstance.delete(url + uri, delData, {
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

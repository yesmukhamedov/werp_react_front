import axiosInstance from './apiClient';
import { ROOT_URL } from './constants';

export const doGet = (uri, params = {}) => {
  return axiosInstance.get(`${ROOT_URL}` + '/api/' + uri, {
    params,
  });
};

export const doPost = (uri, postData, params = {}) => {
  return axiosInstance.post(`${ROOT_URL}` + '/api/' + uri, postData, {
    params,
  });
};

export const doPut = (uri, putData, params = {}) => {
  return axiosInstance.put(`${ROOT_URL}` + '/api/' + uri, putData, {
    params,
  });
};

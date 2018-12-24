import axios from 'axios';
import { ROOT_URL } from '../../../utils/constants';

export const blankSubCompany = () => {
  return dispatch =>
    axios.get(`${ROOT_URL}/api/reference/blank-sub-company`, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    });
};

export const fetchSubCompany = id => {
  return dispatch =>
    axios.get(`${ROOT_URL}/api/reference/sub-company/` + id, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    });
};

export const createSubCompany = o => {
  return dispatch =>
    axios.post(`${ROOT_URL}/api/reference/sub-company`, o, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    });
};

export const updateSubCompany = o => {
  return dispatch =>
    axios.put(`${ROOT_URL}/api/reference/sub-company`, o, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    });
};

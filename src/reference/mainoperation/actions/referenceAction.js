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

export const saveNationality = o => {
  if (o.new) {
    return dispatch =>
      axios.post(`${ROOT_URL}/api/reference/nationalities`, o, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      });
  }
  return dispatch =>
    axios.put(`${ROOT_URL}/api/reference/nationalities`, o, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    });
};

export const blankLeaveReason = () => {
  return dispatch =>
    axios.get(`${ROOT_URL}/api/reference/leave-reasons/blank`, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    });
};

export const fetchLeaveReasons = params => {
  return dispatch =>
    axios.get(`${ROOT_URL}/api/reference/leave-reasons`, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
      params: params,
    });
};

export const blankDemoPrice = () => {
  return dispatch =>
    axios.get(`${ROOT_URL}/api/reference/demo-prices/blank`, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    });
};

export const fetchDemoPrices = params => {
  return dispatch =>
    axios.get(`${ROOT_URL}/api/reference/demo-prices`, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
      params: params,
    });
};

export const fetchLeaveReason = id => {
  return dispatch =>
    axios.get(`${ROOT_URL}/api/reference/leave-reasons/` + id, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    });
};

export const createLeaveReason = o => {
  return dispatch =>
    axios.post(`${ROOT_URL}/api/reference/leave-reasons`, o, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    });
};

export const updateLeaveReason = o => {
  return dispatch =>
    axios.put(`${ROOT_URL}/api/reference/leave-reasons`, o, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    });
};

export const fetchDemoPrice = id => {
  return dispatch =>
    axios.get(`${ROOT_URL}/api/reference/demo-prices/` + id, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    });
};

export const createDemoPrice = o => {
  return dispatch =>
    axios.post(`${ROOT_URL}/api/reference/demo-prices`, o, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    });
};

export const updateDemoPrice = o => {
  return dispatch =>
    axios.put(`${ROOT_URL}/api/reference/demo-prices`, o, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    });
};

export const blankStaffProblem = () => {
  return dispatch =>
    axios.get(`${ROOT_URL}/api/reference/staff-problems/blank`, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    });
};

export const fetchStaffProblems = params => {
  return dispatch =>
    axios.get(`${ROOT_URL}/api/reference/staff-problems`, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
      params: params,
    });
};

export const fetchStaffProblem = id => {
  return dispatch =>
    axios.get(`${ROOT_URL}/api/reference/staff-problems/` + id, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    });
};

export const createStaffProblem = o => {
  return dispatch =>
    axios.post(`${ROOT_URL}/api/reference/staff-problems`, o, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    });
};

export const updateStaffProblem = o => {
  return dispatch =>
    axios.put(`${ROOT_URL}/api/reference/staff-problems`, o, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    });
};

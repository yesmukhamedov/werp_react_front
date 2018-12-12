import axios from 'axios';
import { ROOT_URL } from '../../../../utils/constants';
import { modifyLoader } from '../../../../general/loader/loader_action';
import {
  handleError,
  notify,
  NOTIFY,
} from '../../../../general/notification/notification_action';

export const HR_TIMESHEET_FETCH_ITEMS = 'HR_TIMESHEET_FETCH_ITEMS';
export const HR_TIMESHEET_FETCH_STATUSES = 'HR_TIMESHEET_FETCH_STATUSES';

export function fetchItems(params) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    axios
      .get(`${ROOT_URL}/api/hr/staff/timesheet`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
        params,
      })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: HR_TIMESHEET_FETCH_ITEMS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function fetchStatuses() {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    axios
      .get(`${ROOT_URL}/api/hr/staff/timesheet-statuses`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: HR_TIMESHEET_FETCH_STATUSES,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function saveData(data) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    axios
      .put(`${ROOT_URL}/api/hr/staff/timesheet`, data, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch(notify(NOTIFY, 'Сохранено успешно'));
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

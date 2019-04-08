import axios from 'axios';
import { ROOT_URL } from '../../utils/constants';
import { modifyLoader } from '../../general/loader/loader_action';
import {
  handleError,
  notify,
} from '../../general/notification/notification_action';

export const ALL_SYSTEM_USERS = 'ALL_SYSTEM_USERS';
export const NEW_USER = 'NEW_USER';
export const ROW_UPDATE = 'ROW_UPDATE';
export const TRANSACTION_UPDATE = 'TRANSACTION_UPDATE';
export const STAFF_SEARCH = 'STAFF_SEARCH';

export function fetchAll() {
  return function(dispatch) {
    dispatch(modifyLoader(false));
    axios
      .get(`${ROOT_URL}/api/users/list`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        modifyLoader(false);
        dispatch({
          type: ALL_SYSTEM_USERS,
          payload: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function saveNewUser(newTr) {
  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const language = localStorage.getItem('language');
  return function(dispatch) {
    dispatch(modifyLoader(false));
    axios
      .post(`${ROOT_URL}/api/users/user/save`, newTr, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data) {
          dispatch(
            notify(
              'success',
              errorTable[`104${language}`],
              errorTable[`101${language}`],
            ),
          );
          dispatch({
            type: NEW_USER,
            payload: newTr,
          });
        } else {
          dispatch(
            notify(
              'info',
              errorTable[`133${language}`],
              errorTable[`132${language}`],
            ),
          );
        }
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function updateRow(row) {
  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const language = localStorage.getItem('language');
  return function(dispatch) {
    axios
      .put(`${ROOT_URL}/api/users/update`, row, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data) {
          dispatch(
            notify(
              'success',
              errorTable[`104${language}`],
              errorTable[`101${language}`],
            ),
          );
          dispatch({
            type: ROW_UPDATE,
            payload: row,
          });
        } else {
          dispatch(
            notify(
              'info',
              errorTable[`133${language}`],
              errorTable[`132${language}`],
            ),
          );
        }
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function searchStaff(sstaff) {
  return function(dispatch) {
    dispatch(modifyLoader(false));
    axios
      .post(`${ROOT_URL}/api/users/search`, sstaff, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: STAFF_SEARCH,
          payload: data,
        });
      })
      .catch(e => {
        handleError(e, dispatch);
      });
  };
}

import { modifyLoader } from '../general/loader/loader_action';
import {
  handleError,
  notify,
} from '../general/notification/notification_action';
import { doGet, doPut, doPost } from '../utils/apiActions';

export const REF_CURRENT_TRANSACTIONS = 'REF_CURRENT_TRANSACTIONS';
export const TRANSACTION_UPDATE = 'TRANSACTION_UPDATE';
export const NEW_TRANSACTION = 'NEW_TRANSACTION';
export const ALL_SYSTEM_USERS = 'ALL_SYSTEM_USERS';
export const NEW_USER = 'NEW_USER';
export const ROW_UPDATE = 'ROW_UPDATE';
export const STAFF_SEARCH = 'STAFF_SEARCH';
export const FETCH_BUKRS_BRANCHES = 'FETCH_BUKRS_BRANCHES';
export const SHOW_MODAL = 'SHOW_MODAL';
export const SHOW_UPDATE_MODAL = 'SHOW_UPDATE_MODAL';
export const ALL_EVETNT = 'ALL_EVETNT';
export const ALL_ROLE = 'ALL_ROLE';
export const ROLE_ACCESS = 'ROLE_ACCESS';
export const ROLE_NAME_UPDATE = 'ROLE_NAME_UPDATE';
export const ROLE_NEW = 'ROLE_NEW';

export function fetchCurrentTransactions() {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`/dit/transactions/list`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: REF_CURRENT_TRANSACTIONS,
          items: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function newTransaction(newTr) {
  return function(dispatch) {
    dispatch(modifyLoader(false));
    doPost(`/dit/transactions/list`, newTr)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data) {
          dispatch(successed());
          dispatch({
            type: NEW_TRANSACTION,
            payload: newTr,
          });
        } else {
          dispatch(notSuccessed());
        }
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function updateTransaction(row) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPut('dit/transactions/list/update', row)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data) {
          dispatch(successed());
          dispatch({
            type: TRANSACTION_UPDATE,
            payload: row,
          });
        } else {
          dispatch(notSuccessed());
        }
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        dispatch(notify('error', error.response.data.message, 'Ошибка'));
      });
  };
}

/***********************************************************        SYSTEM USER  */

export function showAddModal(flag) {
  return {
    type: SHOW_MODAL,
    payload: flag,
  };
}
export function showUpdateModal(flag) {
  return {
    type: SHOW_UPDATE_MODAL,
    payload: flag,
  };
}

export function fetchSUserAll() {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`users/list`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: ALL_SYSTEM_USERS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function saveNewUser(newUser) {
  return function(dispatch) {
    dispatch(modifyLoader(false));
    doPost(`users/user/save`, newUser)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data) {
          dispatch(successed());
          dispatch({
            type: NEW_USER,
            payload: newUser,
          });
        } else {
          dispatch(notSuccessed());
        }
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function updateRow(row) {
  return function(dispatch) {
    doPut('users/update', row)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data) {
          dispatch(successed());
          dispatch({
            type: ROW_UPDATE,
            payload: row,
          });
        } else {
          dispatch(notSuccessed());
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
    doPost(`users/search`, sstaff)
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

export function fetchBrchesByBukrs(bukrs) {
  return function(dispatch) {
    doGet(`users/branches/${bukrs}`)
      .then(({ data }) => {
        dispatch({
          type: FETCH_BUKRS_BRANCHES,
          payload: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}
/***********************************************************        ROLES        */

export function fetchRoles() {
  return function(dispatch) {
    dispatch(modifyLoader(false));
    doGet(`dit/role/list`)
      .then(({ data }) => {
        modifyLoader(false);
        dispatch({
          type: ALL_ROLE,
          payload: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function getRoleAccesses(role_id) {
  return function(dispatch) {
    doGet(`dit/role/accesses/${role_id}`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: ROLE_ACCESS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function saveRoles(newRoles) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost(`dit/role/save_roles`, newRoles)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data) {
          dispatch(successed());
          dispatch({
            type: ROLE_ACCESS,
            payload: newRoles,
          });
        } else {
          dispatch(notSuccessed());
        }
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function updRNomination(role) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPut('dit/role/update', role)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data) {
          dispatch(successed());
          dispatch({
            type: ROLE_NAME_UPDATE,
            payload: role,
          });
        } else {
          dispatch(notSuccessed());
        }
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function newRole(role) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost(`dit/role/newrole`, role)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data) {
          dispatch(successed());
          dispatch({
            type: ROLE_NEW,
            payload: role,
          });
        } else {
          dispatch(notSuccessed());
        }
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

/***********************************************************        EVENT        */
export function fetchEvAll(page) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`eventlog/all?${page}`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: ALL_EVETNT,
          items: data.items,
          meta: data.meta,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function successed() {
  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const language = localStorage.getItem('language');
  return notify(
    'success',
    errorTable[`104${language}`],
    errorTable[`101${language}`],
  );
}

export function notSuccessed() {
  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const language = localStorage.getItem('language');
  return notify(
    'info',
    errorTable[`104${language}`],
    errorTable[`101${language}`],
  );
}

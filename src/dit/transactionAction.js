import { modifyLoader } from '../general/loader/loader_action';
import {
  handleError,
  notify,
} from '../general/notification/notification_action';
import { doGet, doPut, doPost } from '../utils/apiActions';

/*******************************************************************    EVENT                  */
export const ALL_EVETNT = 'ALL_EVETNT';

/*******************************************************************    SYSTEM USER            */
export const ALL_SYSTEM_USERS = 'ALL_SYSTEM_USERS';
export const NEW_SYS_USER = 'NEW_SYS_USER';
export const UPDATE_SYS_USER = 'UPDATE_SYS_USER';
export const STAFF_FOR_SYS_USER = 'STAFF_FOR_SYS_USER';
export const BRANCHES_FOR_SYS_USER = 'BRANCHES_FOR_SYS_USER';
export const SHOW_SYS_USER = 'SHOW_SYS_USER';
export const SHOW_SYS_USER_UPDATE = 'SHOW_SYS_USER_UPDATE';

/*******************************************************************    MENU                    */
export const ALL_MENU_NODES = 'ALL_MENU_NODES';
export const NEW_MENU_NODE = 'NEW_MENU_NODE';
export const ON_MENU_NODE_MOVE = 'ON_MENU_NODE_MOVE';
export const TREE_MENU_CHANGED = 'TREE_MENU_CHANGED';
export const BLANK_MENU_NODE = 'BLANK_MENU_NODE';
export const MENU_NODE_UPD = 'MENU_NODE_UPD';
export const DELETE_MENU_NODE = 'DELETE_MENU_NODE';

/*******************************************************************    ROLES                     */
export const ALL_ROLE = 'ALL_ROLE';
export const ROLE_ACCESS = 'ROLE_ACCESS';
export const ROLE_NAME_UPDATE = 'ROLE_NAME_UPDATE';
export const ROLE_NEW = 'ROLE_NEW';

/*******************************************************************    TRANSACTIOS               */
export const ALL_CURRENT_TRANSACTIONS = 'ALL_CURRENT_TRANSACTIONS';
export const TRANSACTION_UPDATE = 'TRANSACTION_UPDATE';
export const NEW_TRANSACTION = 'NEW_TRANSACTION';

/*******************************************************************    EVENT ACTIONCALLS          */
export function fetchAllEvents(page) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`eventlog/getAllEvent?${page}`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: ALL_EVETNT,
          events: data.events,
          evRowPr: data.evRowPr,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

/*******************************************************************    SYSTEM USER ACTIONCALLS    */

export function showAddModal(flag) {
  return {
    type: SHOW_SYS_USER,
    payload: flag,
  };
}
export function showUpdateModal(flag) {
  return {
    type: SHOW_SYS_USER_UPDATE,
    payload: flag,
  };
}

export function fetchSUserAll() {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`users/fetchSUserAll`)
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

export function saveNewSUser(newUser) {
  return function(dispatch) {
    dispatch(modifyLoader(false));
    doPost(`users/saveNewSUser`, newUser)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data) {
          dispatch(successed());
          dispatch({
            type: NEW_SYS_USER,
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

export function updateSUserRow(row) {
  return function(dispatch) {
    doPut('users/update/system/user', row)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data) {
          dispatch(successed());
          dispatch({
            type: UPDATE_SYS_USER,
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

export function searchStaffforSUser(sstaff) {
  return function(dispatch) {
    dispatch(modifyLoader(false));
    doPost(`users/searchStaff/forsysuser`, sstaff)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: STAFF_FOR_SYS_USER,
          payload: data,
        });
      })
      .catch(e => {
        handleError(e, dispatch);
      });
  };
}

export function getBrByBukrSysUser(bukrs) {
  return function(dispatch) {
    doGet(`users/branches/${bukrs}`)
      .then(({ data }) => {
        dispatch({
          type: BRANCHES_FOR_SYS_USER,
          payload: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

/*******************************************************************        MENU ACTIONCALLS    */

export function fetchCurrentMenu() {
  return function(dispatch) {
    dispatch(modifyLoader(false));
    doGet(`dit/menu/list`)
      .then(({ data }) => {
        modifyLoader(false);
        dispatch({
          type: ALL_MENU_NODES,
          payload: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function newMenuNode(newNode) {
  return function(dispatch) {
    dispatch(modifyLoader(false));
    doPost(`dit/menu/save`, newNode)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data) {
          dispatch(successed());
          dispatch({
            type: NEW_MENU_NODE,
            payload: data,
          });
        } else {
          dispatch(notSuccessed());
        }
      })
      .catch(e => {
        handleError(e, dispatch);
      });
  };
}

export function onMoveMenuNode(node, changeNode) {
  return function(dispatch) {
    dispatch(modifyLoader(false));
    doPost(`dit/menu/move`, { node, changeNode })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data) {
          dispatch(successed());
          dispatch({
            type: ON_MENU_NODE_MOVE,
            payload: { node, changeNode },
          });
        } else {
          dispatch(notSuccessed());
        }
      })
      .catch(e => {
        handleError(e, dispatch);
      });
  };
}

export function updMenuNode(node) {
  return function(dispatch) {
    doPut(`dit/menu/update/${node.id}`, node)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: MENU_NODE_UPD,
          payload: node,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function treeMenuChanged(treeMenu) {
  return {
    type: TREE_MENU_CHANGED,
    payload: treeMenu,
  };
}

export function getBlankMenu(parentId) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`dit/menu/blank/${parentId}`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: BLANK_MENU_NODE,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function deleteMenuNode(nMenu) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost(`dit/menu/delete/${nMenu.id}`)
      .then(() => {
        dispatch(modifyLoader(false));
        dispatch({
          type: DELETE_MENU_NODE,
          payload: nMenu,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

/*******************************************************************        ROLE ACTIONCALLS    */

export function fetchAllRoles() {
  return function(dispatch) {
    dispatch(modifyLoader(false));
    doGet(`dit/role/all/roles`)
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

/*******************************************************************        TRANSACTION ACTIONCALLS    */

export function fetchCurrentTransactions() {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`/dit/transactions/list`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: ALL_CURRENT_TRANSACTIONS,
          payload: data,
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

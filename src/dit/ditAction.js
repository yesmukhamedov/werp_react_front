import { modifyLoader } from '../general/loader/loader_action';
import {
  handleError,
  notify,
} from '../general/notification/notification_action';
import { doGet, doPut, doPost } from '../utils/apiActions';

/*******************************************************************    DIT_ELLST              */
export const DIT_ELLST = 'DIT_ELLST';

/*******************************************************************    DIT_USER_LST            */
export const ALL_DIT_USR_LST = 'ALL_DIT_USR_LST';
export const NEW_DIT_USR_LST = 'NEW_DIT_USR_LST';
export const UPD_DIT_USR_LST = 'UPD_DIT_USR_LST';
export const STAFF_FOR_DIT_USR_LST = 'STAFF_FOR_DIT_USR_LST';
export const BRNCHS_FOR_DIT_USR_LST = 'BRNCHS_FOR_DIT_USR_LST';
export const SHOW_DIT_USER_LST = 'SHOW_DIT_USER_LST';
export const SHOW_DIT_USR_UPD = 'SHOW_DIT_USR_UPD';

/*******************************************************************    DMU_LST                 */
export const ALL_DMU_LST = 'ALL_DMU_LST';
export const NEW_DMU_LST = 'NEW_DMU_LST';
export const ON_DMU_LST_MOVE = 'ON_DMU_LST_MOVE';
export const TREE_DMU_LST_CHANGED = 'TREE_DMU_LST_CHANGED';
export const BLANK_DMU_LST_NODE = 'BLANK_DMU_LST_NODE';
export const DMU_LST_NODE_UPD = 'DMU_LST_NODE_UPD';
export const DEL_DMU_LST_NODE = 'DEL_DMU_LST_NODE';

/*******************************************************************    DRLIST                     */
export const ALL_DR_LIST = 'ALL_DR_LIST';
export const DR_ACCESS = 'DR_ACCESS';
export const DR_NAME_UPD = 'DR_NAME_UPD';
export const DR_NEW = 'DR_NEW';

/*******************************************************************    TRANSACTIOS               */
export const ALL_CURR_DTR = 'ALL_CURR_DTR';
export const UPD_DTR = 'UPD_DTR';
export const NEW_DTR = 'NEW_DTR';

/*******************************************************************    DIT_ELLST                 */
export function fetchAllEllist(page) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`ditellist/getallellist?${page}`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: DIT_ELLST,
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
    type: SHOW_DIT_USER_LST,
    payload: flag,
  };
}
export function showUpdateModal(flag) {
  return {
    type: SHOW_DIT_USR_UPD,
    payload: flag,
  };
}

export function fetchDSUserAll() {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`dituserlist/fetchDSUserAll`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: ALL_DIT_USR_LST,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function saveNewDSUser(newUser) {
  return function(dispatch) {
    dispatch(modifyLoader(false));
    doPost(`dituserlist/saveNewSUser`, newUser)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data) {
          dispatch(successed());
          dispatch({
            type: NEW_DIT_USR_LST,
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

export function updateDSUserRow(row) {
  return function(dispatch) {
    doPut('dituserlist/upd/system/user', row)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data) {
          dispatch(successed());
          dispatch({
            type: UPD_DIT_USR_LST,
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

export function searchStafforDSUser(sstaff) {
  return function(dispatch) {
    dispatch(modifyLoader(false));
    doPost(`dituserlist/searchStaff/forsysuser`, sstaff)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: STAFF_FOR_DIT_USR_LST,
          payload: data,
        });
      })
      .catch(e => {
        handleError(e, dispatch);
      });
  };
}

export function getBrByBukrDSysUser(bukrs) {
  return function(dispatch) {
    doGet(`dituserlist/branchesbybukrs/${bukrs}`)
      .then(({ data }) => {
        dispatch({
          type: BRNCHS_FOR_DIT_USR_LST,
          payload: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

/*******************************************************************        DMULIST ACTIONCALLS    */

export function fetchCurrDmulst() {
  return function(dispatch) {
    dispatch(modifyLoader(false));
    doGet(`dit/dmulist/getall`)
      .then(({ data }) => {
        modifyLoader(false);
        dispatch({
          type: ALL_DMU_LST,
          payload: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function newDmuNode(newNode) {
  return function(dispatch) {
    dispatch(modifyLoader(false));
    doPost(`dit/dmulist/savenewdmu`, newNode)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data) {
          dispatch(successed());
          dispatch({
            type: NEW_DMU_LST,
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

export function onMoveDmuNode(node, changeNode) {
  return function(dispatch) {
    dispatch(modifyLoader(false));
    doPost(`dit/dmulist/movenode`, { node, changeNode })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data) {
          dispatch(successed());
          dispatch({
            type: ON_DMU_LST_MOVE,
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

export function updDmuNode(node) {
  return function(dispatch) {
    doPut(`dit/dmulist/update/${node.id}`, node)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: DMU_LST_NODE_UPD,
          payload: node,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function treeDmuChanged(treeMenu) {
  return {
    type: TREE_DMU_LST_CHANGED,
    payload: treeMenu,
  };
}

export function getBlankDmu(parentId) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`dit/dmulist/blankdmu/${parentId}`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: BLANK_DMU_LST_NODE,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function deleteDmuNode(nMenu) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost(`dit/dmulist/deletenode/${nMenu.id}`)
      .then(() => {
        dispatch(modifyLoader(false));
        dispatch({
          type: DEL_DMU_LST_NODE,
          payload: nMenu,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

/*******************************************************************        DRLIST ACTIONCALLS    */

export function fetchDrlstAll() {
  return function(dispatch) {
    dispatch(modifyLoader(false));
    doGet(`dit/drlist/drlistall`)
      .then(({ data }) => {
        modifyLoader(false);
        dispatch({
          type: ALL_DR_LIST,
          payload: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function getDrAccesses(role_id) {
  return function(dispatch) {
    doGet(`dit/drlist/draccesses/${role_id}`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: DR_ACCESS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function saveDrLst(newRoles) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost(`dit/drlist/drsave_roles`, newRoles)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data) {
          dispatch(successed());
          dispatch({
            type: DR_ACCESS,
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

export function updDrNomin(role) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPut('dit/drlist/drupdate', role)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data) {
          dispatch(successed());
          dispatch({
            type: DR_NAME_UPD,
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

export function newDrole(role) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost(`dit/drlist/newdr`, role)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data) {
          dispatch(successed());
          dispatch({
            type: DR_NEW,
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

/*******************************************************************        DTRLST ACTIONCALLS    */

export function fetchCurrDtrLst() {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`/dit/dtrlist/trall`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: ALL_CURR_DTR,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function newDtr(newTr) {
  return function(dispatch) {
    dispatch(modifyLoader(false));
    doPost(`/dit/dtrlist/newtr`, newTr)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data) {
          dispatch(successed());
          dispatch({
            type: NEW_DTR,
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

export function updDtr(row) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPut('dit/dtrlist/trupdate', row)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: UPD_DTR,
          payload: row,
        });
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

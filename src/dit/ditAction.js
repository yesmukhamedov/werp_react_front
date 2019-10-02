import { modifyLoader } from '../general/loader/loader_action';
import {
  handleError,
  notify,
} from '../general/notification/notification_action';
import { doGet, doPut, doPost, doDelete } from '../utils/apiActions';

export const DIT_CLEAR_DYN_OBJ = 'DIT_CLEAR_DYN_OBJ';
/*******************************************************************    DIT_ELLST              */
export const ALL_DITELLST = 'ALL_DITELLST';

/*******************************************************************    DIT_USERLST            */
export const ALL_DITUSRLST = 'ALL_DITUSRLST';
export const NEW_DITUSRLST = 'NEW_DITUSRLST';
export const UPD_DITUSRLST = 'UPD_DITUSRLST';
export const STAFF_FOR_DITUSRLST = 'STAFF_FOR_DITUSRLST';
export const BRNCHS_FOR_DITUSRLST = 'BRNCHS_FOR_DITUSRLST';
export const SHOW_DITUSERLST = 'SHOW_DITUSERLST';
export const SHOW_DITUSR_UPD = 'SHOW_DITUSR_UPD';

/*******************************************************************    DMU_LST                 */
export const ALL_DMULST = 'ALL_DMULST';
export const NEW_DMULST = 'NEW_DMULST';
export const ON_DMULST_MOVE = 'ON_DMULST_MOVE';
export const TREE_DMULST_CHANGED = 'TREE_DMULST_CHANGED';
export const BLANK_DMULST_NODE = 'BLANK_DMULST_NODE';
export const DMU_LST_NODE_UPD = 'DMU_LST_NODE_UPD';
export const DEL_DMULST_NODE = 'DEL_DMULST_NODE';

/*******************************************************************    DRLIST                     */
export const ALL_DRLIST = 'ALL_DRLIST';
export const ACCESS_DRLST = 'ACCESS_DRLST';
export const UPD_DR_LST_NAME = 'UPD_DR_LST_NAME';
export const NEW_DR_LST = 'NEW_DR_LST';

/*******************************************************************    TRANSACTIOS               */
export const ALL_CURR_DTR = 'ALL_CURR_DTR';
export const UPD_DTR = 'UPD_DTR';
export const NEW_DTR = 'NEW_DTR';

/*******************************************************************    DPHBOOK ACTIONCALLS       */
export const GET_PHONEBOOK = 'GET_PHONEBOOK';

/*******************************************************************    ZREPORT ACTIONCALLS      */
export const ALL_ZREPORT = 'ALL_ZREPORT';
export const NEW_ZREPORT = 'NEW_ZREPORT';
export const GET_ZREPORT = 'GET_ZREPORT';
export const DELETE_ZREPORT = 'DELETE_ZREPORT';
export const UPDATE_ZREPORT = 'UPDATE_ZREPORT';

/*******************************************************************    DITELLST                 */

export function fetchAllEllist(page) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`ditellist/ditellistAll?${page}`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: ALL_DITELLST,
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
    type: SHOW_DITUSERLST,
    payload: flag,
  };
}
export function showUpdateModal(flag) {
  return {
    type: SHOW_DITUSR_UPD,
    payload: flag,
  };
}

export function fetchDSUserAll() {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`dituserlist/ditSUserAll`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: ALL_DITUSRLST,
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
    doPost(`dituserlist/ditsaveSUser`, newUser)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data) {
          dispatch(successed());
          dispatch({
            type: NEW_DITUSRLST,
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
    doPut('dituserlist/ditupdSUser', row)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data) {
          dispatch(successed());
          dispatch({
            type: UPD_DITUSRLST,
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
    doPost(`dituserlist/ditsearchStaff/forSUser`, sstaff)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: STAFF_FOR_DITUSRLST,
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
    doGet(`dituserlist/ditbranchesbybukrs/${bukrs}`)
      .then(({ data }) => {
        dispatch({
          type: BRNCHS_FOR_DITUSRLST,
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
    doGet(`dit/dmulist/dmulstAll`)
      .then(({ data }) => {
        modifyLoader(false);
        dispatch({
          type: ALL_DMULST,
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
    doPost(`dit/dmulist/dmusavenew`, newNode)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data) {
          dispatch(successed());
          dispatch({
            type: NEW_DMULST,
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
    doPost(`dit/dmulist/dmumovenode`, { node, changeNode })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data) {
          dispatch(successed());
          dispatch({
            type: ON_DMULST_MOVE,
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
    doPut(`dit/dmulist/dmuupdate/${node.id}`, node)
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
    type: TREE_DMULST_CHANGED,
    payload: treeMenu,
  };
}

export function getBlankDmu(parentId) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`dit/dmulist/dmublank/${parentId}`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: BLANK_DMULST_NODE,
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
    doPost(`dit/dmulist/dmudeletenode/${nMenu.id}`)
      .then(() => {
        dispatch(modifyLoader(false));
        dispatch({
          type: DEL_DMULST_NODE,
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
    doGet(`dit/drlist/drlstAll`)
      .then(({ data }) => {
        modifyLoader(false);
        dispatch({
          type: ALL_DRLIST,
          payload: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function getDrlstAccesses(role_id) {
  return function(dispatch) {
    doGet(`dit/drlist/drlstaccesses/${role_id}`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: ACCESS_DRLST,
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
    doPost(`dit/drlist/drlstsave_roles`, newRoles)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data) {
          dispatch(successed());
          dispatch({
            type: ACCESS_DRLST,
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

export function updDrlstNomin(role) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPut('dit/drlist/drlstupdate', role)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data) {
          dispatch(successed());
          dispatch({
            type: UPD_DR_LST_NAME,
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
    doPost(`dit/drlist/drlstnew`, role)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data) {
          dispatch(successed());
          dispatch({
            type: NEW_DR_LST,
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

/*******************************************************************        DPHBOOK ACTIONCALLS    */
export function getPhoneBook(book) {
  return function(dispatch) {
    dispatch(clearDynObj());
    dispatch(modifyLoader(true));
    doGet('dit/phonebook', book)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: GET_PHONEBOOK,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        dispatch(notify('error', error.response.data.message, 'Ошибка'));
      });
  };
}

/*******************************************************************        ZREPORT ACTIONCALLS    */

export function fetchZreports() {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet('dit/zreport/all')
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: ALL_ZREPORT,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function updateZreport(id, file, name) {
  return function(dispatch) {
    doPut(`dit/zreport/update/${id}`, file)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data) {
          dispatch(successed());
          dispatch({
            type: UPDATE_ZREPORT,
            payload: { id, name },
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

export function uploadZReport(newReport, fileData) {
  return function(dispatch) {
    dispatch(modifyLoader(false));
    doPost(`dit/zreport/upload`, newReport)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data) {
          dispatch(successed());
          dispatch({
            type: NEW_ZREPORT,
            payload: fileData,
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

export function deleteFile(id) {
  return function(dispatch) {
    dispatch(modifyLoader(false));
    doDelete(`dit/zreport/delete/${id}`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data) {
          dispatch(successed());
          dispatch({
            type: DELETE_ZREPORT,
            payload: id,
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

export function clearDynObj() {
  const obj = {
    type: DIT_CLEAR_DYN_OBJ,
  };
  return obj;
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

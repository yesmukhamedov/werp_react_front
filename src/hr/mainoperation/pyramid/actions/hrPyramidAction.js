import { modifyLoader } from '../../../../general/loader/loader_action';
import { handleError } from '../../../../general/notification/notification_action';
//import browserHistory from '../../../../utils/history';
import { doGet, doPut, doPost, doDelete } from '../../../../utils/apiActions';

export const HR_PYRAMID_FETCH_BUKRS_TREE = 'HR_PYRAMID_FETCH_BUKRS_TREE';
export const HR_PYRAMID_TREE_CHANGED = 'HR_PYRAMID_TREE_CHANGED';
export const HR_PYRAMID_TREE_DELETED = 'HR_PYRAMID_TREE_DELETED';
export const HR_PYRAMID_FORM_MODAL_TOGGLE = 'HR_PYRAMID_FORM_MODAL_TOGGLE';
export const HR_PYRAMID_BLANK_ITEM = 'HR_PYRAMID_BLANK_ITEM';
export const HR_PYRAMID_FETCH_ITEM = 'HR_PYRAMID_FETCH_ITEM';
export const HR_PYRAMID_ITEM_UPDATED = 'HR_PYRAMID_ITEM_UPDATED';

export function fetchBukrsPyramidsTree(bukrs) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`hr/pyramid/tree`, {
      bukrs,
    })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: HR_PYRAMID_FETCH_BUKRS_TREE,
          payload: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function pyramidTreeChanged(treeData) {
  return {
    type: HR_PYRAMID_TREE_CHANGED,
    payload: treeData,
  };
}

export function deletePyramid(id, callback) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doDelete(`hr/pyramid/${id}`)
      .then(() => {
        dispatch(modifyLoader(false));
        if (callback) {
          callback();
        }
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function removeStaffFromEmployee(id, callback) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPut(`hr/pyramid/remove-staff/${id}`, {})
      .then(() => {
        dispatch(modifyLoader(false));
        if (callback) {
          callback();
        }
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function blankItem(parentId) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`hr/pyramid/blank/${parentId}`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        // console.log(data)
        dispatch({
          type: HR_PYRAMID_BLANK_ITEM,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function fetchItem(id) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`hr/pyramid/view/${id}`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: HR_PYRAMID_FETCH_ITEM,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function updatePyramid(p) {
  return dispatch => doPut(`hr/pyramid/${p.id}`, p);
}

export function createPyramid(p) {
  return dispatch => doPost(`hr/pyramid`, p);
}

export function toggleFormModal(flag) {
  return {
    type: HR_PYRAMID_FORM_MODAL_TOGGLE,
    payload: flag,
  };
}

import { handleError } from '../../../../general/notification/notification_action';
import { modifyLoader } from '../../../../general/loader/loader_action';
import browserHistory from '../../../../utils/history';
import { doGet, doPut, doDelete, doPost } from '../../../../utils/apiActions';

/**
 *
 */
export const CRM_VISIT_FETCH_ARCHIVE = 'CRM_VISIT_FETCH_ARCHIVE';
export const CRM_VISIT_CLEAR_STATE = 'CRM_VISIT_CLEAR_STATE';
export const CRM_VISIT_MODAL_CLEAR = 'CRM_VISIT_MODAL_CLEAR';

export const CRM_VISIT_FETCH_SINGLE = 'CRM_VISIT_FETCH_SINGLE';
export const CRM_VISIT_DELETE = 'CRM_VISIT_DELETE';
export const CRM_VISIT_CREATE = 'CRM_VISIT_CREATE';
export const CRM_VISIT_UPDATE = 'CRM_VISIT_UPDATE';
export const CRM_VISIT_MODAL_TOGGLE = 'CRM_VISIT_MODAL_TOGGLE';
export const CRM_VISIT_SET_FOR_UPDATE = 'CRM_VISIT_SET_FOR_UPDATE';
export const CRM_VISIT_SET_FOR_CREATE = 'CRM_VISIT_SET_FOR_CREATE';
export const CRM_VISIT_FETCH_CHILD_RECOS = 'CRM_VISIT_FETCH_CHILD_RECOS';

export function fetchArchive() {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`crm2/visit/archive`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: CRM_VISIT_FETCH_ARCHIVE,
          payload: data,
        });
      })
      .catch(e => {
        dispatch(modifyLoader(false));
        handleError(e, dispatch);
      });
  };
}

export function fetchSingleVisit(id) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`crm2/visit/${id}`)
      .then(({ data }) => {
        console.log('fetchSingleVisit data: ', data);
        dispatch(modifyLoader(false));
        dispatch({
          type: CRM_VISIT_FETCH_SINGLE,
          payload: data,
        });
      })
      .catch(e => {
        dispatch(modifyLoader(false));
        handleError(e, dispatch);
      });
  };
}

export function deleteVisit(id) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doDelete(`crm2/visit/${id}`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        browserHistory.push('/crm2021/visit/archive');
      })
      .catch(e => {
        dispatch(modifyLoader(false));
        handleError(e, dispatch);
      });
  };
}

export function createVisit(o) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost(`crm2/visit`, o)
      .then(({ data }) => {
        console.log('createVisit data: ', data);
        dispatch(modifyLoader(false));
        dispatch({
          type: CRM_VISIT_CREATE,
          payload: data,
        });
        // dispatch(fetchArchive())
      })
      .catch(e => {
        dispatch(modifyLoader(false));
        if (
          e.response &&
          e.response.data &&
          e.response.data.recoId &&
          e.response.status &&
          e.response.status === 303
        ) {
          dispatch(modalToggle(false));
          browserHistory.push(`/crm2021/reco/view/${e.response.data.recoId}`);
        } else {
          handleError(e, dispatch);
        }
      });
  };
}

export function updateVisit(o, fromComponent, fun) {
  return function(dispatch) {
    dispatch(modifyLoader(true));

    doPut(`crm2/visit`, o)
      .then(({ data }) => {
        console.log('update visit data: ', data);
        dispatch(modifyLoader(false));
        if (fromComponent === 'archive') {
          dispatch(fetchArchive());
        } else if (fromComponent === 'view') {
          dispatch(fetchSingleVisit(o.id));
        }
      })
      .catch(e => {
        dispatch(modifyLoader(false));
        handleError(e, dispatch);
      });
  };
}

export function modalToggle(flag) {
  return {
    type: CRM_VISIT_MODAL_TOGGLE,
    payload: flag,
  };
}

export function setVisitForUpdate(visit) {
  return {
    type: CRM_VISIT_SET_FOR_UPDATE,
    payload: visit,
  };
}

export function blankForCreate(recoId, staffId) {
  return function(dispatch) {
    dispatch(modifyLoader(true));

    doGet(`crm/visit/blank/${recoId}/${staffId}`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: CRM_VISIT_SET_FOR_CREATE,
          payload: data,
        });
      })
      .catch(e => {
        dispatch(modifyLoader(false));
        handleError(e, dispatch);
      });
  };
}

export function fetchVisitChildRecos(id) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`crm2/visit/${id}/recos`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: CRM_VISIT_FETCH_CHILD_RECOS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function visitModalClearState() {
  return {
    type: CRM_VISIT_MODAL_CLEAR,
  };
}

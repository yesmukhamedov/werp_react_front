import { doGet, doPost, doPut, doDelete } from '../utils/apiActions';
import {
  handleError,
  notify,
} from '../general/notification/notification_action';
import { modifyLoader } from '../general/loader/loader_action';
export const SERVICE_ADD = 'SERVICE_ADD';
export const FETCH_DYNOBJ_SERVICE = 'FETCH_DYNOBJ_SERVICE';
export const CHANGE_DYNOBJ_SERVICE = 'CHANGE_DYNOBJ_SERVICE';
export const FETCH_SMSETPP_TYPE = 'FETCH_SMSETPP_TYPE';
export const FETCH_SMSETPP_POST = 'FETCH_SMSETPP_POST';
export const CLEAR_DYNOBJ_SERVICE = 'CLEAR_DYNOBJ_SERVICE';
export const ADD_SMSETCT = 'ADD_SMSETCT';
export const SEARCH_SMSETCT = 'SEARCH_SMSETCT';
export const EDIT_SMSETCT = 'EDIT_SMSETCT';
export const FETCH_SMSETPP = 'FETCH_SMSETPP';
export const FETCH_SRLS = 'FETCH_SMSETPP';
export const DELETE_SMCETST = 'DELETE_SMCETST';

const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
const language = localStorage.getItem('language');

export function changeDynObjService(a_obj) {
  const obj = {
    type: CHANGE_DYNOBJ_SERVICE,
    data: a_obj,
  };
  return obj;
}

export function fetchSmsetpp() {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`werp/mservice/smsetpp`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SMSETPP,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function fetchSmsetppType() {
  return function(dispatch) {
    doGet(`werp/mservice/smsetpp/type`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SMSETPP_TYPE,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function fetchSmsetppPost(informations) {
  console.log(informations, 'inf');
  return function(dispatch) {
    doPost(`werp/mservice/smsetpp/create`, informations)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SMSETPP_POST,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function fetchSrls() {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`werp/mservice/report/srls`)
      .then(({ data }) => {
        console.log('SRLS ACTION', data.data.data);
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SRLS,
          payload: data.data.data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function clearDynObjService() {
  const obj = {
    type: CLEAR_DYNOBJ_SERVICE,
  };
  return obj;
}

export function fetchDynObjService(url, params) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(url, { ...params })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_DYNOBJ_SERVICE,
          data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
        dispatch(modifyLoader(false));
      });
  };
}

export const addSmsetct = smSetCtAdd => {
  return function(dispatch) {
    console.log('smSetCtAdd', smSetCtAdd);
    dispatch(modifyLoader(true));
    doPost(`werp/mservice/smsetct/create`, smSetCtAdd)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: ADD_SMSETCT,
          payload: data.data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
};

export function searchSmsetct(smCetStSearch) {
  console.log('smCetStSearch', smCetStSearch);
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`werp/mservice/smsetct`, smCetStSearch)
      .then(({ data }) => {
        //
        dispatch(modifyLoader(false));
        dispatch({
          type: SEARCH_SMSETCT,
          payload: data.data.data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function editSmsetct(sm_set_ct_Edit) {
  console.log('update.id', sm_set_ct_Edit.id);
  console.log('updateInAction', sm_set_ct_Edit);
  return function(dispatch) {
    doPut(`werp/mservice/smsetct/update`, sm_set_ct_Edit)
      .then(response => {
        console.log('INRerquest', sm_set_ct_Edit);
        console.log('response', response);
        if (response) {
          console.log('INRerquest', sm_set_ct_Edit);
          dispatch(
            notify(
              'success',
              errorTable[`104${language}`],
              errorTable[`101${language}`],
            ),
          );
          dispatch({
            type: EDIT_SMSETCT,
            payload: sm_set_ct_Edit,
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
      .catch(e => {
        handleError(e, dispatch);
      });
    console.log('put');
  };
}

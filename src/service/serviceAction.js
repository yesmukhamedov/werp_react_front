import { doGet, doPost, doPut, doDelete } from '../utils/apiActions';
import {
  handleError,
  notify,
} from '../general/notification/notification_action';
import { modifyLoader } from '../general/loader/loader_action';
export const FETCH_DYNOBJ_SERVICE = 'FETCH_DYNOBJ_SERVICE';
export const CHANGE_DYNOBJ_SERVICE = 'CHANGE_DYNOBJ_SERVICE';
export const CLEAR_DYNOBJ_SERVICE = 'CLEAR_DYNOBJ_SERVICE';
export const ADD_SMSETCT = 'ADD_SMSETCT';
export const SEARCH_SMSETCT = 'SEARCH_SMSETCT';
export const EDIT_SMSETCT = 'EDIT_SMSETCT';
export const TEST_DATA = 'TEST_DATA';
export const FETCH_SMSETPP = 'FETCH_SMSETPP';
export const FETCH_PHONE = 'FETCH_PHONE';
export const FETCH_PHONE_TYPE = 'FETCH_PHONE_TYPE';
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
          payload: data.data.data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function docs(dataList) {
  console.log(dataList);
  return function(dispatch) {
    dispatch({
      type: 'TEST_DATA',
      payload: dataList,
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

export const addSmsetct = params => {
  console.log('in action ', params);
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost(`url`, params);

    doGet(`url...`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: ADD_SMSETCT,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
    console.log('addSmsetCt');
  };
};

export function searchSmsetct() {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`url...`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: SEARCH_SMSETCT,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
    console.log('search');
  };
}

export function editSmsetct(update) {
  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const language = localStorage.getItem('language');
  return function(dispatch) {
    doPut(`...url${update.id}`, { ...update })
      .then(response => {
        if (response) {
          dispatch(
            notify(
              'success',
              errorTable[`104${language}`],
              errorTable[`101${language}`],
            ),
          );
          dispatch({
            type: EDIT_SMSETCT,
            payload: update,
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

export function fetchPhone() {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`werp/dictionary/phone/`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_PHONE,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function fetchPhoneType() {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet('werp/dictionary/phone/type')
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_PHONE_TYPE,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

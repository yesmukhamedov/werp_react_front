import { doGet, doPost, doPut } from '../../../utils/apiActions';
import {
  handleError,
  notify,
} from '../../../general/notification/notification_action';
import { errorTableText } from '../../../utils/helpers';
import { modifyLoader } from '../../../general/loader/loader_action';
//import { date } from 'yup';
export const POST_SMSETCT = 'POST_SMSETCT';
export const FETCH_SMSETCT = 'FETCH_SMSETCT';
export const EDIT_SMSETCT = 'EDIT_SMSETCT';
export const HISTORY_EDITING_SMSETCT = 'HISTORY_EDITING_SMSETCT';
export const FETCH_PRODUCT_LIST_SMSETCT = 'FETCH_PRODUCT_LIST_SMSETCT';
export const CLEAR_DYNOBJ_SERVICE = 'CLEAR_DYNOBJ_SERVICE';
export const CHANGE_DYNOBJ_SERVICE = 'CHANGE_DYNOBJ_SERVICE';

//const errorTable = JSON.parse(localStorage.getItem('errorTableString'));

//const language = localStorage.getItem('language');
export function changeDynObjService(a_obj) {
  const obj = {
    type: CHANGE_DYNOBJ_SERVICE,
    data: a_obj,
  };
  return obj;
}

export function postSmsetct(postParams, fetchSmsetct) {
  return function(dispatch) {
    doPost(`service/smsetct/create`, postParams)
      .then(data => {
        if (data.data.status === 200 || data.data.status === 'OK') {
          dispatch(notify('success', errorTableText(101)));
          fetchSmsetct();
        } else {
          dispatch(notify('error', errorTableText(133), errorTableText(132)));
        }
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function editSmsetct(editParams, fetchSmsetct) {
  return function(dispatch) {
    doPut(`service/smsetct/update`, editParams)
      .then(data => {
        if (data.data.status === 200 || data.data.status === 'OK') {
          dispatch(notify('success', errorTableText(104), errorTableText(101)));
          fetchSmsetct();
        } else {
          dispatch(notify('error', errorTableText(133), errorTableText(132)));
        }
      })
      .catch(error => {
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

export function applySmsetct(param) {
  return dispatch => {
    dispatch(modifyLoader(true));
    doGet(`service/smsetct/apply`, param)
      .then(({ data }) => {
        if (data.status === 200 || data.status === 'OK') {
          dispatch(notify('success', errorTableText(101)));
          fetchSmsetct();
        } else {
          dispatch(notify('error', errorTableText(133), errorTableText(132)));
        }
        dispatch(modifyLoader(false));
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function fetchProductListSmsetct(param) {
  return dispatch => {
    dispatch(modifyLoader(true));
    doGet(`service/smsetct/getProductList`, param)
      .then(({ data }) => {
        dispatch({
          type: FETCH_PRODUCT_LIST_SMSETCT,
          payload: data.data,
        });
        dispatch(modifyLoader(false));
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function fetchSmsetct(searchParams, searchArray) {
  let queryString = '';
  if (searchArray !== undefined) {
    queryString = Object.keys(searchArray)
      .map(key => 'branchId=' + searchArray[key].branchId)
      .join('&');
  }
  return dispatch => {
    dispatch(modifyLoader(true));
    doGet(
      `service/smsetct/view?direction=DESC&orderBy=id&${queryString}`,
      searchParams,
    )
      .then(({ data }) => {
        dispatch({
          type: FETCH_SMSETCT,
          payload: data.data,
        });

        doGet(
          `service/smsetct/audit?direction=DESC&orderBy=id&${queryString}`,
          searchParams,
        )
          .then(({ data }) => {
            dispatch(modifyLoader(false));
            dispatch({
              type: HISTORY_EDITING_SMSETCT,
              payload: data.data,
            });
          })
          .catch(error => {
            dispatch(modifyLoader(false));
            handleError(error, dispatch);
          });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

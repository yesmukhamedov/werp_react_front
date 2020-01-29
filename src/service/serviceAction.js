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
export const FETCH_SMSETPP_PUT = 'FETCH_SMSETPP_PUT';
export const FETCH_SMSETPP_PREMIUM_PRICE_TYPE =
  'FETCH_SMSETPP_PREMIUM_PRICE_TYPE';
export const FETCH_SMSETPP_SEARCH = 'FETCH_SMSETPP_SEARCH';
export const CLEAR_DYNOBJ_SERVICE = 'CLEAR_DYNOBJ_SERVICE';
export const POST_SMSETCT = 'POST_SMSETCT';
export const FETCH_SMSETCT = 'FETCH_SMSETCT';
export const EDIT_SMSETCT = 'EDIT_SMSETCT';
export const FETCH_SMSETPP = 'FETCH_SMSETPP';
export const FETCH_SRLS = 'FETCH_SMSETPP';
export const DELETE_SMCETST = 'DELETE_SMCETST';
export const FETCH_SMPLB = 'FETCH_SMPLB';
export const FETCH_SMPLB_ADD = 'FETCH_SMPLB_ADD';
//export const DELETE_SMCETST = 'DELETE_SMCETST';
export const HISTORY_EDITING_SMSETCT = 'HISTORY_EDITING_SMSETCTS';

const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
const language = localStorage.getItem('language');
export function changeDynObjService(a_obj) {
  const obj = {
    type: CHANGE_DYNOBJ_SERVICE,
    data: a_obj,
  };
  return obj;
}

export function fetchSmsetpp(params) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smsetpp/view?direction=DESC&orderBy=id`, params)
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

export function fetchSmsetppPut(params, fetchSmsetpp) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPut(`smsetpp/update`, params)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SMSETPP_PUT,
          payload: data,
        });
        fetchSmsetpp();
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function fetchSmsetppSearch(fetchSmsetpp) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    fetchSmsetpp();
  };
}

export function fetchSmsetppPremiumPriceType() {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`premium_price_type/view`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SMSETPP_PREMIUM_PRICE_TYPE,
          payload: data.data,
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
    doGet(`service_type/view`)
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

export function fetchSmsetppPost(informations, fetchSmsetpp) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost(`smsetpp/create`, informations)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SMSETPP_POST,
          payload: data,
        });
        fetchSmsetpp();
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
export function fetchSmsetct(searchParams) {
  console.log('orderBy');
  console.log('smCetStSearch', searchParams);
  return dispatch => {
    dispatch(modifyLoader(true));
    doGet(`smsetct/view?direction=DESC&orderBy=id`, searchParams)
      .then(({ data }) => {
        console.log('dataAction', data);
        dispatch({
          type: FETCH_SMSETCT,
          payload: data.data,
        });
        doGet(`smsetct/audit?direction=DESC&orderBy=rev`, searchParams)
          .then(({ data }) => {
            console.log('dataHistory', data.data);
            dispatch(modifyLoader(false));
            dispatch({
              type: HISTORY_EDITING_SMSETCT,
              payload: data.data,
            });
          })
          .catch(error => {
            handleError(error, dispatch);
          });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}
export const postSmsetct = (postParams, fetchSmsetct, searchParams) => {
  return function(dispatch) {
    console.log('postParams', postParams);

    doPost(`smsetct/create`, postParams)
      .then(({ data }) => {
        console.log('dataAdd', data);
        if (data & (data.status === 'success')) {
          dispatch(notify('success', errorTable[`101${language}`]));
        } else {
          dispatch(notify('info', errorTable[`132${language}`])); //Не добавлен
        }
        if (searchParams.length !== 0) {
          fetchSmsetct(searchParams);
        }
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
};

export function editSmsetct(editParams, searchParams, fetchSmsetct) {
  console.log('EdirParams', editParams);
  return function(dispatch) {
    doPut(`smsetct/update`, editParams)
      .then(data => {
        if (data & (data.status === 'success')) {
          console.log('responseEdit', data);
          dispatch(
            notify(
              'success',
              errorTable[`104${language}`],
              errorTable[`101${language}`],
            ),
          );
        } else {
          dispatch(
            notify(
              'info',
              errorTable[`133${language}`],
              errorTable[`132${language}`],
            ),
          );
        }
        console.log('SEARCH', searchParams);
        fetchSmsetct(searchParams);
      })
      .catch(e => {
        handleError(e, dispatch);
      });
  };
}

export function fetchSmplb(params) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smsetpp/view?direction=DESC&orderBy=id`, params)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SMPLB,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

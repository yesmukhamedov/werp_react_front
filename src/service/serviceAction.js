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
export const ADD_SMSETCT = 'ADD_SMSETCT';
export const SEARCH_SMSETCT = 'SEARCH_SMSETCT';
export const EDIT_SMSETCT = 'EDIT_SMSETCT';
export const FETCH_SMSETPP = 'FETCH_SMSETPP';
export const FETCH_SRLS = 'FETCH_SMSETPP';
export const DELETE_SMCETST = 'DELETE_SMCETST';
export const FETCH_SMPLB = 'FETCH_SMPLB';
export const FETCH_SMPLB_ADD = 'FETCH_SMPLB_ADD';

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

export const addSmsetct = smSetCtAdd => {
  return function(dispatch) {
    console.log('smSetCtAdd', smSetCtAdd);
    dispatch(modifyLoader(true));
    doPost(`werp/mservice/smsetct/create`, smSetCtAdd)
      .then(({ data }) => {
        if (data) {
          dispatch(notify('success', errorTable[`101${language}`]));
          dispatch(modifyLoader(false));
          dispatch({
            type: ADD_SMSETCT,
            payload: data.data,
          });
        } else {
          dispatch(notify('info', errorTable[`132${language}`])); //Не добавлен
        }
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
};

export function searchSmsetct(conf) {
  console.log('smCetStSearch', conf);
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`werp/mservice/smsetct`, conf)
      .then(({ data }) => {
        console.log('data', data);
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

export function editSmsetct(sm_set_ct_Edit, smCetStSearch) {
  return function(dispatch) {
    doPut(`werp/mservice/smsetct/update`, sm_set_ct_Edit)
      .then(response => {
        if (response) {
          console.log('response', response.data.data);
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
        doGet(`werp/mservice/smsetct`, smCetStSearch)
          .then(({ data }) => {
            dispatch({
              type: SEARCH_SMSETCT,
              payload: data.data.data,
            });
          })
          .catch(error => {
            handleError(error, dispatch);
          });
      })
      .catch(e => {
        handleError(e, dispatch);
      });
  };
}

export function fetchSmplb(params) {
  console.log(params);
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smplb/list`, params)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        console.log(data, 'data');
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

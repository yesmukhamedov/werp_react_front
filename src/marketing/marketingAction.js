import { modifyLoader } from '../general/loader/loader_action';
import {
  handleError,
  notify,
} from '../general/notification/notification_action';

import { doGet, doPost, doPut } from '../utils/apiActions';

/******************************************************************** PRICE LIST */
export const GET_PRLIST = 'GET_PRLIST';
export const GET_MATNRS = 'GET_MATNRS';
export const NEW_PRICE = 'NEW_PRICE';
export const UPD_PRLIST = 'UPD_PRLIST';

export const FETCH_DYNOBJ_MARKETING = 'FETCH_DYNOBJ_MARKETING';
export const CHANGE_DYNOBJ_MARKETING = 'CHANGE_DYNOBJ_MARKETING';
export const CLEAR_DYNOBJ_MARKETING = 'CLEAR_DYNOBJ_MARKETING';

/******************************************************************** DMSCLIST */
export const GET_CONT_DMSC_SEAR_OPTS = 'GET_CONT_DMSC_SEAR_OPTS';
export const CONT_DMSC_LIST = 'CONT_DMSC_LIST';

const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
const language = localStorage.getItem('language');

export function getByDefSearchOpts(branchId) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`marketing/dmsclist/getbybranch/` + branchId)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: GET_CONT_DMSC_SEAR_OPTS,
          dealers: data.dealers,
          demosec: data.demosec,
          collectors: data.collectors,
          contstatus: data.contstatus,
          contlaststate: data.contlaststate,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function getContByOpts(searchPms) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`marketing/dmsclist/searchbyparams`, searchPms)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: CONT_DMSC_LIST,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

/****************************************************** PRICE LIST */

export function getLazyPrList(bukrs) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`pricelist/matnrpricelazy?${bukrs}`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: GET_PRLIST,
          pritms: data.pritms,
          prtotRws: data.prtotRws,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function getAllMatnr() {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`pricelist/matnrs`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: GET_MATNRS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function savePrice(price) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost(`pricelist/newprice/`, price)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data) {
          dispatch(successed());
          dispatch({
            type: NEW_PRICE,
            payload: price,
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

export function updPrListRow(row) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPut('pricelist/update', row)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: UPD_PRLIST,
          payload: row,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        dispatch(notify('error', error.response.data.message, 'Ошибка'));
      });
  };
}

export function fetchDynObjMarketing(url, params = {}, setIsLoading) {
  setIsLoading(true);
  return function(dispatch) {
    doGet(url, params)
      .then(({ data }) => {
        setIsLoading(false);
        dispatch({
          type: FETCH_DYNOBJ_MARKETING,
          data,
        });
      })
      .catch(error => {
        setIsLoading(false);
        handleError(error, dispatch);
      });
  };
}

export function changeDynObjMarketing(a_obj) {
  const obj = {
    type: CHANGE_DYNOBJ_MARKETING,
    data: a_obj,
  };
  return obj;
}
export function clearDynObjMarketing() {
  const obj = {
    type: CLEAR_DYNOBJ_MARKETING,
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
  return notify(
    'info',
    errorTable[`104${language}`],
    errorTable[`101${language}`],
  );
}

export function onSaveMmcTrans(url, body, params, setIsSaving) {
  setIsSaving(true);
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost(url, body, { ...params })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        setIsSaving(false);
        dispatch({
          type: FETCH_DYNOBJ_MARKETING,
          data,
        });
        dispatch(
          notify(
            'success',
            errorTable[`104${language}`],
            errorTable[`101${language}`],
          ),
        );
      })
      .catch(error => {
        handleError(error, dispatch);
        dispatch(modifyLoader(false));
        setIsSaving(false);
      });
  };
}

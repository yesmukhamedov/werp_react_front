import { modifyLoader } from '../general/loader/loader_action';
import {
  handleError,
  notify,
} from '../general/notification/notification_action';

import { doGet, doPost, doPut } from '../utils/apiActions';

/******************************************************************** LPLIST */
export const GET_LPLST = 'GET_LPLST';
export const GET_MATNRS = 'GET_MATNRS';
export const NEW_LPLST = 'NEW_LPLST';
export const UPD_LPLST = 'UPD_LPLST';

export const FETCH_DYNOBJ_MARKETING = 'FETCH_DYNOBJ_MARKETING';
export const CHANGE_DYNOBJ_MARKETING = 'CHANGE_DYNOBJ_MARKETING';
export const CLEAR_DYNOBJ_MARKETING = 'CLEAR_DYNOBJ_MARKETING';

/******************************************************************** DMSCLIST */
export const GET_CONT_DMSCLST_DEF = 'GET_CONT_DMSCLST_DEF';
export const GET_CONT_DMSCLST = 'GET_CONT_DMSCLST';

/******************************************************************** DMSCLIST */
export const ALL_DMSP_LST = 'ALL_DMSP_LST';

const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
const language = localStorage.getItem('language');

export function getByDefSearchOpts(branchId) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`marketing/report/dmsclistbybranch/` + branchId)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: GET_CONT_DMSCLST_DEF,
          payload: data,
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
    doGet(`marketing/report/dmsclistbyprms`, searchPms)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: GET_CONT_DMSCLST,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

/****************************************************** LP_LIST */

export function getLazyPrList(bukrs) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`lplist/matnrlpricelazy?${bukrs}`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: GET_LPLST,
          payload: data,
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
    doGet(`lplist/lpmatnrs`)
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
    doPost(`lplist/lpnew`, price)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data) {
          dispatch(successed());
          dispatch({
            type: NEW_LPLST,
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
    doPut('lplist/lpupdate', row)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data) {
          dispatch(successed());
          dispatch({
            type: UPD_LPLST,
            payload: row,
          });
        } else {
          dispatch(notSuccessed());
        }
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        dispatch(notify('error', error.response.data.message, 'Ошибка'));
      });
  };
}

/****************************************************** END LP_LIST */

export function fetchDmsplist() {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`marketing/mainoperaton/dmsplist`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: ALL_DMSP_LST,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
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
export function onSaveContractMmcc(
  url,
  body,
  params,
  setIsSaving,
  redirectToMmcv,
) {
  console.log('clieck');
  return function(dispatch) {
    setIsSaving(true);
    dispatch(modifyLoader(true));
    doPost(url, body, { ...params })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        setIsSaving(false);
        redirectToMmcv(data.contractNumber);
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

export function successed() {
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

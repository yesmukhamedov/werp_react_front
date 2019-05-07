import { modifyLoader } from '../../../general/loader/loader_action';
import {
  handleError,
  notify,
} from '../../../general/notification/notification_action';

import { doGet, doPost, doPut } from '../../../utils/apiActions';

export const ALL_PRLIST = 'ALL_PRLIST';
export const ALL_MATNR = 'ALL_MATNR';
export const UPD_PRLIST = 'UPD_PRLIST';
export const FETCH_BUKRS_BRANCHES = 'FETCH_BUKRS_BRANCHES';
export const NEW_PRICE = 'NEW_PRICE';

export function fetchAll(bukrs) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`pricelist/all?${bukrs}`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: ALL_PRLIST,
          items: data.items,
          totalRows: data.totalRows,
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
    doGet(`pricelist/allmatnr`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: ALL_MATNR,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function updateRow(row) {
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

export function fetchBrchesByBukrs(bukrs) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`users/branches/` + bukrs)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_BUKRS_BRANCHES,
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
    const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
    const language = localStorage.getItem('language');
    dispatch(modifyLoader(true));
    doPost(`pricelist/newprice/`, price)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data) {
          dispatch(
            notify(
              'success',
              errorTable[`104${language}`],
              errorTable[`101${language}`],
            ),
          );
          dispatch({
            type: NEW_PRICE,
            payload: price,
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
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

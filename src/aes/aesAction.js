import axios from 'axios';
import { ROOT_URL } from '../utils/constants';
import {
  handleError,
  notify,
} from '../general/notification/notification_action';
import { modifyLoader } from '../general/loader/loader_action';
export const AES_BLANK = 'AES_BLANK';
//******************************AES ADD*/
export const APPR_REJ = 'APPR_REJ';
export const NEW_AES = 'NEW_AES';
export const NEW_OS = 'NEW_OS';
export const NEW_TYPE1 = 'NEW_TYPE1';
export const NEW_TYPE2 = 'NEW_TYPE2';
export const NEW_TYPE3 = 'NEW_TYPE3';
//****************fetch items */
export const CURRENT_AES = 'CURRENT_AES';
export const NEW_DETAIL = 'NEW_DETAIL';
export const NEW_RNUM = 'NEW_RNUM';
export const NEW_STATUS = 'NEW_STATUS';
export const COMP_BR = 'COMP_BR';
export const CCBRANCH_AES = 'CCBRANCH_AES';
export const CURRENT_ALL = 'CURRENT_ALL';

/************************** staffs */
export const CLEAR_ALL = 'CLEAR_ALL';
export const CLEAR_T3_OSDET = 'CLEAR_T3_OSDET';
export const DIS_DET = 'DIS_DET';
export const DIS_OS = 'DIS_OS';
export const DIS_TYPE1 = 'DIS_TYPE1';
export const DIS_TYPE2 = 'DIS_TYPE2';
export const DIS_TYPE3 = 'DIS_TYPE3';
export const UNMOUNT_ALL = 'UNMOUNT_ALL';

export function fetchCCBranch(bukrs, country_id) {
  return function(dispatch) {
    dispatch(modifyLoader(false));
    axios
      .post(
        `${ROOT_URL}/api/aes/cc/fetch`,
        { bukrs, country_id },
        {
          headers: {
            authorization: localStorage.getItem('token'),
          },
        },
      )
      .then(({ data }) => {
        modifyLoader(false);
        dispatch({
          type: CCBRANCH_AES,
          payload: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function fetchBlank() {
  return function(dispatch) {
    dispatch(modifyLoader(false));
    axios
      .get(`${ROOT_URL}/api/aes/aes/blank`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        modifyLoader(false);
        dispatch({
          type: AES_BLANK,
          payload: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function fetchAes(aes) {
  return function(dispatch) {
    dispatch(modifyLoader(false));

    axios
      .post(`${ROOT_URL}/api/aes/appr`, aes, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        modifyLoader(false);
        dispatch({
          type: CURRENT_AES,
          payload: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function fetchReport(aes) {
  return function(dispatch) {
    dispatch(modifyLoader(false));
    axios
      .post(`${ROOT_URL}/api/aes/report`, aes, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        modifyLoader(false);
        dispatch({
          type: CURRENT_AES,
          payload: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function newAes(newAes) {
  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const language = localStorage.getItem('language');
  return function(dispatch) {
    dispatch(modifyLoader(true));
    axios
      .post(`${ROOT_URL}/api/aes/save`, newAes, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
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
            type: NEW_AES,
            payload: data,
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

export function saveApprRej(apprRej, rejected) {
  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const language = localStorage.getItem('language');
  return function(dispatch) {
    dispatch(modifyLoader(false));
    axios
      .put(
        `${ROOT_URL}/api/aes/apprjec`,
        { apprRej, rejected },
        {
          headers: {
            authorization: localStorage.getItem('token'),
          },
        },
      )
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
            type: APPR_REJ,
            payload: [],
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
  };
}

//**************************** fetch Items ******************************* */

export function fetchAll() {
  return function(dispatch) {
    dispatch(modifyLoader(false));
    axios
      .get(`${ROOT_URL}/api/aes/list/all`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        modifyLoader(false);
        dispatch({
          type: CURRENT_ALL,
          payload: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

//*********************************************************** find sub Items ******************************* */

export function clearAll(a_obj) {
  const obj = {
    type: CLEAR_ALL,
    payload: a_obj,
  };
  return obj;
}
export function clearT3Osdet(a_obj) {
  const obj = {
    type: CLEAR_T3_OSDET,
    payload: a_obj,
  };
  return obj;
}

export function unmountAll() {
  const obj = {
    type: UNMOUNT_ALL,
  };
  return obj;
}

export function findObject(url, params) {
  let fullUrl = `${ROOT_URL}` + url + `/${params}`;
  return function(dispatch) {
    if (url === '/api/aes/find/type1/') dispatch(clearAll([]));
    if (url === '/api/aes/find/type2/') dispatch(clearT3Osdet([]));
    axios
      .get(fullUrl, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: CURRENT_ALL,
          payload: data,
        });
      })
      .catch(e => {
        handleError(e, dispatch);
      });
  };
}

//**************************** create new Items ******************************* */
export function findCompBrCode(bukrs, branch_id) {
  return function(dispatch) {
    dispatch(modifyLoader(false));
    axios
      .post(
        `${ROOT_URL}/api/aes/cbcode/fetch`,
        { bukrs, branch_id },
        {
          headers: {
            authorization: localStorage.getItem('token'),
          },
        },
      )
      .then(({ data }) => {
        modifyLoader(false);
        dispatch({
          type: COMP_BR,
          payload: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function newObject(url, params, type) {
  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const language = localStorage.getItem('language');
  let fullUrl = `${ROOT_URL}` + url;
  return function(dispatch) {
    axios
      .post(fullUrl, params, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
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
            type: type,
            payload: data,
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
  };
}

export function disableObject(url, params, type) {
  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const language = localStorage.getItem('language');
  let fullUrl = `${ROOT_URL}` + url + `/${params.key}`;
  return function(dispatch) {
    axios
      .put(fullUrl, params, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
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
            type: type,
            payload: params,
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
  };
}

/*
export function newOs(newOs) {
  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const language = localStorage.getItem('language');
  return function(dispatch) {
    dispatch(modifyLoader(false));
    axios
      .post(`${ROOT_URL}/api/aes/os/save`, newOs, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
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
            type: NEW_OS,
            payload: data,
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
  };
}

export function newCompBr(newCompBr) {
  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const language = localStorage.getItem('language');
  return function(dispatch) {
    dispatch(modifyLoader(false));
    axios
      .post(`${ROOT_URL}/api/aes/compbr/save`, newCompBr, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        modifyLoader(false);
        if (data) {
          console.log("daa ",data)
          dispatch(
            notify(
              'success',
              errorTable[`104${language}`],
              errorTable[`101${language}`],
            ),
          );
          dispatch({
            type: COMP_BR,
            payload: data,
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
*/

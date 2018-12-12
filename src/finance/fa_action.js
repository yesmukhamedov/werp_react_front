import axios from 'axios';
import { ROOT_URL } from '../utils/constants';
import {
  handleError,
  notify,
} from '../general/notification/notification_action';
import { modifyLoader } from '../general/loader/loader_action';

export const CHANGE_FA_BKPF = 'CHANGE_FA_BKPF';
export const CLEAR_FA_BKPF = 'CLEAR_FA_BKPF';
export const FETCH_CASHBANKHKONTS_BY_BRANCH = 'FETCH_CASHBANKHKONTS_BY_BRANCH';
export const CLEAR_CASHBANKHKONTS_BY_BRANCH = 'CLEAR_CASHBANKHKONTS_BY_BRANCH';
export const FETCH_EXPENSEHKONTS_BY_BUKRS = 'FETCH_EXPENSEHKONTS_BY_BUKRS';
export const CLEAR_EXPENSEHKONTS_BY_BUKRS = 'CLEAR_EXPENSEHKONTS_BY_BUKRS';

export const FETCH_DYNOBJ_FI = 'FETCH_DYNOBJ_FI';
export const CHANGE_DYNOBJ_FI = 'CHANGE_DYNOBJ_FI';
export const CLEAR_DYNOBJ_FI = 'CLEAR_DYNOBJ_FI';

export function fetchCashBankHkontsByBranch(a_bukrs, a_brnch) {
  return function(dispatch) {
    axios
      .get(
        `${ROOT_URL}/api/finance/mainoperation/fetchCashBankHkontsByBranch`,
        {
          headers: {
            authorization: localStorage.getItem('token'),
          },
          params: {
            bukrs: a_bukrs,
            brnch: a_brnch,
          },
        },
      )
      .then(({ data }) => {
        dispatch({
          type: FETCH_CASHBANKHKONTS_BY_BRANCH,
          hkontOptions: data.hkontOptions,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}
export function fetchExpenseHkontsByBukrs(a_bukrs) {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/api/finance/mainoperation/fetchExpenseHkontsByBukrs`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
        params: {
          bukrs: a_bukrs,
        },
      })
      .then(({ data }) => {
        dispatch({
          type: FETCH_EXPENSEHKONTS_BY_BUKRS,
          hkontOptions: data.hkontOptions,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function fetchIncomeHkontsByBukrs(a_bukrs) {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/api/finance/mainoperation/fetchIncomeHkontsByBukrs`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
        params: {
          bukrs: a_bukrs,
        },
      })
      .then(({ data }) => {
        dispatch({
          type: FETCH_EXPENSEHKONTS_BY_BUKRS,
          hkontOptions: data.hkontOptions,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function changefaBkpf(bkpf) {
  const obj = {
    type: CHANGE_FA_BKPF,
    bkpf,
  };
  return obj;
}
export function clearfaBkpf() {
  const obj = {
    type: CLEAR_FA_BKPF,
  };
  return obj;
}
export function changeDynObj(a_obj) {
  const obj = {
    type: CHANGE_DYNOBJ_FI,
    data: a_obj,
  };
  return obj;
}
export function clearDynObj() {
  const obj = {
    type: CLEAR_DYNOBJ_FI,
  };
  return obj;
}

// FMCP/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function fetchFMCP(a_zregOrConNum) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    axios
      .get(`${ROOT_URL}/api/finance/mainoperation/fmcp/fetch`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
        params: {
          zregOrConNum: a_zregOrConNum,
        },
      })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_DYNOBJ_FI,
          data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
        dispatch(modifyLoader(false));
      });
  };
}

export function saveFMCP(a_contract) {
  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const language = localStorage.getItem('language');
  return function(dispatch) {
    dispatch(modifyLoader(true));

    axios
      .post(
        `${ROOT_URL}/api/finance/mainoperation/fmcp/save`,
        {
          ...a_contract,
        },
        {
          headers: {
            // 'Content-Type': 'application/json;charset=UTF-8',
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
          dispatch(fetchFMCP(a_contract.zregOrConNum));
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
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FCIS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function saveFcis(a_bkpf, a_bseg, initFcis) {
  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const language = localStorage.getItem('language');
  return function(dispatch) {
    axios
      .post(
        `${ROOT_URL}/api/finance/mainoperation/fcis/save`,
        {
          bkpf: a_bkpf,
          ...a_bseg,
        },
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
          dispatch(clearfaBkpf());
          initFcis();
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
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FA03-FA02////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function saveFA02(a_bukrs, a_belnr, a_gjahr, a_bktxt, al_bseg) {
  return function(dispatch) {
    axios
      .post(
        `${ROOT_URL}/api/finance/mainoperation/fa02/save`,
        {
          bukrs: a_bukrs,
          belnr: a_belnr,
          gjahr: a_gjahr,
          bktxt: a_bktxt,
          bseg: al_bseg,
        },
        {
          headers: {
            authorization: localStorage.getItem('token'),
          },
        },
      )

      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch(notify(data.type, data.message, data.header));
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function cancelFA02(a_bukrs, a_belnr, a_gjahr) {
  return function(dispatch) {
    axios
      .post(
        `${ROOT_URL}/api/finance/mainoperation/fa02/cancel`,
        {
          bukrs: a_bukrs,
          belnr: a_belnr,
          gjahr: a_gjahr,
        },
        {
          headers: {
            authorization: localStorage.getItem('token'),
          },
        },
      )

      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch(notify(data.type, data.message, data.header));

        if (data.result) {
          const searchParameters = {
            bukrs: a_bukrs,
            belnr: a_belnr,
            gjahr: a_gjahr,
          };
          dispatch(fetchFA03(searchParameters));
        }
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}
export function fetchFA02(a_searchParameters) {
  return function(dispatch) {
    dispatch(clearDynObj());
    axios
      .get(`${ROOT_URL}/api/finance/mainoperation/fa02/fetch`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
        params: {
          ...a_searchParameters,
        },
      })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_DYNOBJ_FI,
          data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
        dispatch(modifyLoader(false));
      });
  };
}
export function fetchFA03(a_searchParameters) {
  return function(dispatch) {
    dispatch(clearDynObj());
    axios
      .get(`${ROOT_URL}/api/finance/mainoperation/fa03/fetch`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
        params: {
          ...a_searchParameters,
        },
      })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_DYNOBJ_FI,
          data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
        dispatch(modifyLoader(false));
      });
  };
}
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function saveFiSrcDocs(args, tcode, initFun) {
  let url = '';
  if (tcode === 'FACI01')
    url = `${ROOT_URL}/api/finance/mainoperation/faci01/save`;
  else if (tcode === 'FACO01')
    url = `${ROOT_URL}/api/finance/mainoperation/faco01/save`;

  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const language = localStorage.getItem('language');
  return function(dispatch) {
    axios
      .post(
        url,
        {
          ...args,
        },
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
          initFun();
        } else {
          dispatch(
            notify(
              'error',
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

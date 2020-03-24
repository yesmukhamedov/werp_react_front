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
export const FETCH_SMPLB_POST = 'FETCH_SMPLB_POST';
export const FETCH_SMPLB_PUT = 'FETCH_SMPLB_PUT';
export const FETCH_SMPLB_DELETE = 'FETCH_SMPLB_DELETE';
export const HISTORY_EDITING_SMSETCT = 'HISTORY_EDITING_SMSETCT';
export const FETCH_SMCUSPOR = 'FETCH_SMCUSPOR';
export const FETCH_SMCUSPOR_HISTORY_ALL = 'FETCH_SMCUSPOR_HISTORY_ALL';
export const FETCH_SMCUSPOR_HISTORY_APP = 'FETCH_SMCUSPOR_HISTORY_APP';
export const FETCH_SMCUSPOR_HISTORY_CALL = 'FETCH_SMCUSPOR_HISTORY_CALL';
export const FETCH_SMCUSPOR_HISTORY_SERVICE = 'FETCH_SMCUSPOR_HISTORY_SERVICE';
export const FETCH_SMECI = 'FETCH_SMECI';
export const POST_SMECI = 'POST_SMECI';
export const FETCH_SERV_CRM_CALL_STATUS = 'FETCH_SERV_CRM_CALL_STATUS';
export const POST_SMREGC_CREATE_CALL = 'POST_SMREGC_CREATE_CALL';
export const POST_SMCCA_CREATE_APP = 'POST_SMCCA_CREATE_APP';
export const POST_SMCCALD_CREATE_APP = 'POST_SMCCALD_CREATE_APP';
export const FETCH_APP_STATUS = 'FETCH_APP_STATUS';
export const FETCH_APP_TYPE = 'FETCH_APP_TYPE';
export const FETCH_APP_LIST = 'FETCH_APP_LIST';
export const FETCH_APP_MASTER_LIST = 'FETCH_APP_MASTER_LIST';
export const FETCH_EDIT_APP = 'FETCH_EDIT_APP';
export const FETCH_CLEAR_APP_LIST = 'FETCH_CLEAR_APP_LIST';
export const FETCH_ERROR_TABLE = 'FETCH_ERROR_TABLE';
export const FETCH_SMSLSP = 'FETCH_SMSLSP';
export const FETCH_SMSRCUS = 'FETCH_SMSRCUS';
export const FETCH_TOVAR_CATEGORYS = 'FETCH_TOVAR_CATEGORYS';
export const FETCH_CONTRACT_STATUS = 'FETCH_CONTRACT_STATUS';
export const FETCH_SMECAM = 'FETCH_SMECAM';
export const FETCH_SERV_APP_STATUS = 'FETCH_SERV_APP_STATUS';
export const EDIT_SMECAM = 'EDIT_SMECAM';
export const EDIT_SMECA = 'EDIT_SMECA';
export const FETCH_SMVCA = 'FETCH_SMVCA';
export const FETCH_SMECA = 'FETCH_SMECA';
export const FETCH_SMSETPLP = 'FETCH_SMSETPLP';
export const POST_SMSETPLP = 'POST_SMSETPLP';
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
  return dispatch => {
    dispatch(modifyLoader(true));
    doGet(`smsetct/view?direction=DESC&orderBy=id`, searchParams)
      .then(({ data }) => {
        dispatch({
          type: FETCH_SMSETCT,
          payload: data.data,
        });
        doGet(`smsetct/audit?direction=DESC&orderBy=rev`, searchParams)
          .then(({ data }) => {
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
export function postSmsetct(postParams, fetchSmsetct, searchParams) {
  return function(dispatch) {
    doPost(`smsetct/create`, postParams)
      .then(() => {
        if (searchParams.length !== 0) {
          fetchSmsetct(searchParams);
        }
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function editSmsetct(editParams, searchParams, fetchSmsetct) {
  return function(dispatch) {
    doPut(`smsetct/update`, editParams)
      .then(() => {
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
    doGet(`smplb/list`, params)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SMPLB,
          payload: data.data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function fetchSmplbPost(docs, fetchSmplb) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost(`smplb/create`, docs)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SMPLB_POST,
          payload: data,
        });
        fetchSmplb();
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function fetchSmplbPut(params, fetchSmplb) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPut(`smplb/update`, params)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SMPLB_PUT,
          payload: data,
        });
        fetchSmplb();
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function fetchSmplbDelete(id, fetchSmplb) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doDelete(`smplb/delete/${id}`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SMPLB_DELETE,
          payload: data,
        });
        fetchSmplb();
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function fetchSmcusporClientHistory(contractNumber) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smcuspor/contractInfo`, contractNumber)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SMCUSPOR,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function fetchServCrmHistoryAll(date, type) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    switch (type) {
      case 'all':
        doGet(`smcuspor/servCrmHistoryAll`, date)
          .then(({ data }) => {
            dispatch(modifyLoader(false));
            dispatch({
              type: FETCH_SMCUSPOR_HISTORY_ALL,
              payload: data,
            });
          })
          .catch(error => {
            dispatch(modifyLoader(false));
            handleError(error, dispatch);
          });
        break;
      case 'services':
        doGet(`smcuspor/servCrmHistoryService`, date)
          .then(({ data }) => {
            dispatch(modifyLoader(false));
            dispatch({
              type: FETCH_SMCUSPOR_HISTORY_APP,
              payload: data,
            });
          })
          .catch(error => {
            dispatch(modifyLoader(false));
            handleError(error, dispatch);
          });
        break;
      case 'calls':
        doGet(`smcuspor/servCrmHistoryCall`, date)
          .then(({ data }) => {
            dispatch(modifyLoader(false));
            dispatch({
              type: FETCH_SMCUSPOR_HISTORY_CALL,
              payload: data,
            });
          })
          .catch(error => {
            dispatch(modifyLoader(false));
            handleError(error, dispatch);
          });
        break;
      case 'requests':
        doGet(`smcuspor/servCrmHistoryApp`, date)
          .then(({ data }) => {
            dispatch(modifyLoader(false));
            dispatch({
              type: FETCH_SMCUSPOR_HISTORY_SERVICE,
              payload: data,
            });
          })
          .catch(error => {
            dispatch(modifyLoader(false));
            handleError(error, dispatch);
          });
        break;
    }
  };
}

export function fetchSmeciContractInfo(contractNumber) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smeci/contractInfo`, contractNumber)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SMECI,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function postSmeciContractInfo(contract, fetchSmcuspor) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost(`smeci/edit`, contract)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: POST_SMECI,
          payload: data,
        });
        fetchSmcuspor();
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function fetchServCrmCallStatus() {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`serv_crm_call_status`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SERV_CRM_CALL_STATUS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function postSmregcCreateCall(call, back) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost(`smregc/create`, call)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: POST_SMREGC_CREATE_CALL,
          payload: data,
        });
        back();
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function postSmccaCreateApp(application, back) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost(`smcca/create`, application)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: POST_SMCCA_CREATE_APP,
          payload: data,
        });
        back();
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function fetchSmsrcus(searchParams) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet('smsrcus/list', searchParams)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data.status === 200) {
          dispatch({
            type: FETCH_SMSRCUS,
            payload: data.data,
          });
        }
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function fetchTovarCategorys() {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet('smcs/categoryId')
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_TOVAR_CATEGORYS,
          payload: data.data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function fetchContractStatus() {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet('ContractStatus/view')
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_CONTRACT_STATUS,
          payload: data.data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function postSmccaldCreateApp(application) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost(`smccald/create`, application)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: POST_SMCCALD_CREATE_APP,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function fetchSmecam(id) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smecam/${id}`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SMECAM,
          payload: data.data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function fetchServAppStatus() {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet('service/reference/serv_app_status')
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SERV_APP_STATUS,
          payload: data.data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function fetchSmsetplp(params) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smsetplp`, { ...params })
      .then(data => {
        dispatch(modifyLoader(false));
        if ((data.status === 200) & (data.data.data.length > 0)) {
          dispatch({
            type: FETCH_SMSETPLP,
            payload: data.data,
          });
        }
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function postSmsetplp(params) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost(`smsetplp/create`, params)
      .then(data => {
        dispatch(modifyLoader(false));
        if ((data.status === 200) & (data.data.data.length > 0)) {
          dispatch({
            type: POST_SMSETPLP,
            payload: data.data.data,
          });
        }
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function editSmecam(editParams) {
  return function(dispatch) {
    doPut('smecam/edit', editParams)
      .then(data => {
        if (data.status === 200) {
          dispatch({
            type: EDIT_SMECAM,
            payloda: data,
          });
        }
      })
      .catch(e => {
        handleError(e, dispatch);
      });
  };
}

export function editSmeca(editParams) {
  return function(dispatch) {
    console.log('editEdit', editParams);
    doPut('smeca/edit', editParams)
      .then(data => {
        if (data.status === 200) {
          dispatch({
            type: EDIT_SMECA,
            payloda: data,
          });
        }
      })
      .catch(e => {
        handleError(e, dispatch);
      });
  };
}

export function fetchAppStatus() {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet('service/reference/serv_app_status')
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_APP_STATUS,
          payload: data.data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function fetchAppType() {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet('service/reference/serv_app_type')
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_APP_TYPE,
          payload: data.data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function fetchAppList(params) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet('smappl/appList?direction=ASC&orderBy=id', params)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_APP_LIST,
          payload: data.data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function fetchAppMasterList(params) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet('smappl/masterList', params)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_APP_MASTER_LIST,
          payload: data.data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function fetchEditApp(params, fetchSmappl) {
  return function(dispatch) {
    doPost('smappl/editApp', params)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        fetchSmappl(params);
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function fetchClearAppList() {
  return function(dispatch) {
    dispatch({
      type: FETCH_CLEAR_APP_LIST,
    });
  };
}

export function fetchSmslsp(params) {
  return function(dispatch) {
    doGet('smslspl/view?direction=ASC&orderBy=id', params)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SMSLSP,
          payload: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function fetchSmeca(id) {
  console.log('id', id);
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smeca/${id}`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SMECA,
          payload: data.data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function fetchSmvca(id) {
  console.log('id', id);
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smvca/${id}`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SMVCA,
          payload: data.data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function editSmsetplp(params) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPut(`smsetplp/update`, params)
      .then(data => {
        dispatch(modifyLoader(false));
        if (data.status === 200) {
          dispatch(notify('success', errorTable[`104`], errorTable[`101`]));
        } else {
          dispatch(notify('error', errorTable[`133`], errorTable[`132`]));
        }
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function fetchErrorTable() {
  return function(dispatch) {
    doGet(`error_table`)
      .then(data => {
        console.log('error', data.data.data);
        dispatch({
          type: FETCH_ERROR_TABLE,
          payload: data.data.data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

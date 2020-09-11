import { doGet, doPost, doPut, doDelete } from '../utils/apiActions';
import {
  handleError,
  notify,
} from '../general/notification/notification_action';
import { errorTableText } from '../utils/helpers';
import { modifyLoader } from '../general/loader/loader_action';
//import { date } from 'yup';
export const SERVICE_ADD = 'SERVICE_ADD';
export const FETCH_DYNOBJ_SERVICE = 'FETCH_DYNOBJ_SERVICE';
export const CHANGE_DYNOBJ_SERVICE = 'CHANGE_DYNOBJ_SERVICE';
export const FETCH_SMSETPP_TYPE = 'FETCH_SMSETPP_TYPE';
export const FETCH_SMSETPP_POST = 'FETCH_SMSETPP_POST';
export const FETCH_SMSETPP_PUT = 'FETCH_SMSETPP_PUT';
export const FETCH_SMSETPP_PREMIUM_PRICE_TYPE =
  'FETCH_SMSETPP_PREMIUM_PRICE_TYPE';
export const FETCH_SMSETPP_SEARCH = 'FETCH_SMSETPP_SEARCH';
export const FETCH_SMSETPP = 'FETCH_SMSETPP';
export const FETCH_SRLS = 'FETCH_SMSETPP';
export const DELETE_SMCETST = 'DELETE_SMCETST';
export const FETCH_SMPLB = 'FETCH_SMPLB';
export const FETCH_SMPLB_POST = 'FETCH_SMPLB_POST';
export const FETCH_SMPLB_PUT = 'FETCH_SMPLB_PUT';
export const FETCH_SMPLB_DELETE = 'FETCH_SMPLB_DELETE';
export const FETCH_SMCUSPOR_CONTRACT = 'FETCH_SMCUSPOR_CONTRACT';
export const FETCH_SMCUSPOR_HISTORY_ALL = 'FETCH_SMCUSPOR_HISTORY_ALL';
export const FETCH_SMCUSPOR_HISTORY_APP = 'FETCH_SMCUSPOR_HISTORY_APP';
export const FETCH_SMCUSPOR_HISTORY_CALL = 'FETCH_SMCUSPOR_HISTORY_CALL';
export const FETCH_SMCUSPOR_HISTORY_SERVICE = 'FETCH_SMCUSPOR_HISTORY_SERVICE';
export const FETCH_SMECI = 'FETCH_SMECI';
export const POST_SMECI = 'POST_SMECI';
export const POST_SMECIM = 'POST_SMECIM';
export const FETCH_SERV_CRM_CALL_STATUS = 'FETCH_SERV_CRM_CALL_STATUS';
export const POST_SMREGC_CREATE_CALL = 'POST_SMREGC_CREATE_CALL';
export const POST_SMCCA_CREATE_APP = 'POST_SMCCA_CREATE_APP';
export const POST_SMCCA_CREATE_CRM_HISTORY = 'POST_SMCCA_CREATE_CRM_HISTORY';
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
export const FETCH_OPERTAION_TYPE_LIST = 'FETCH_OPERTAION_TYPE_LIST';
export const FETCH_SMECA = 'FETCH_SMECA';
export const FETCH_SMSETPLP = 'FETCH_SMSETPLP';
export const POST_SMSETPLP = 'POST_SMSETPLP';
export const FETCH_APP_LIST_SEARCH_PARAMS = 'FETCH_APP_LIST_SEARCH_PARAMS';
export const FETCH_SMSETPLP_ID = 'FETCH_SMSETPLP_ID';
export const FETCH_SMSETPP_HISTORY = 'FETCH_SMSETPP_HISTORY';
export const FETCH_SMSETPP_SERVICE_TYPE_ID = 'FETCH_SMSETPP_SERVICE_TYPE_ID';
export const FETCH_SMSETPP_GET_PRODUCT_LIST = 'FETCH_SMSETPP_GET_PRODUCT_LIST';
export const FETCH_SMCUSPOR_CONTRACT_HISTORY =
  'FETCH_SMCUSPOR_CONTRACT_HISTORY';
export const FETCH_BRANCH_LIST = 'FETCH_BRANCH_LIST';
export const CLEAR_DYNOBJ_SERVICE = 'CLEAR_DYNOBJ_SERVICE';
export const FETCH_SMCUSPORLE = 'FETCH_SMCUSPORLE';
export const FETCH_MASTER_LIST = 'FETCH_MASTER_LIST';
export const CLEAR_MASTER_LIST = 'CLEAR_MASTER_LIST';
export const FETCH_OPERATOR_LIST = 'FETCH_OPERATOR_LIST';
export const CLEAR_OPERATOR_LIST = 'CLEAR_OPERATOR_LIST';
export const PUT_RESOLD = 'PUT_RESOLD';

//const errorTable = JSON.parse(localStorage.getItem('errorTableString'));

//const language = localStorage.getItem('language');
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

export function clearDynObjService() {
  const obj = {
    type: CLEAR_DYNOBJ_SERVICE,
  };
  return obj;
}

export function fetchSmsetppHistory(params) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smsetpp/audit`, params)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SMSETPP_HISTORY,
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

export function fetchSmsetppServiceTypeId() {
  return function(dispatch) {
    doGet(`smcs/getServiceTypeList`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SMSETPP_SERVICE_TYPE_ID,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}
export function fetchSmsetppGetProductList(param) {
  return function(dispatch) {
    doGet(`smsetpp/getProductList`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SMSETPP_GET_PRODUCT_LIST,
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

export function fetchSmcusporContract(contractNumber) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smcuspor/contract`, contractNumber)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SMCUSPOR_CONTRACT,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function fetchSmcusporContractHistory(contractNumber) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smcuspor/contractHistory`, contractNumber)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SMCUSPOR_CONTRACT_HISTORY,
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
        doGet(`smcuspor/serviceCrmHistoryAll`, date)
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
        doGet(`smcuspor/serviceCrmHistoryService`, date)
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
      case 'calls':
        doGet(`smcuspor/serviceCrmHistoryCall`, date)
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
        doGet(`smcuspor/serviceCrmHistoryApplication`, date)
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
      default:
        alert('Нет таких значении');
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

//Редактирование для операторов
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

//Редактирование для менеджеров
export function postSmecimContractInfo(contract, fetchSmcuspor) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost(`smecim/edit`, contract)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: POST_SMECIM,
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
    doPost(`smregc/createCrmHistory`, call)
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
        if (data.status === 200 || data.status === 'OK') {
          dispatch({
            type: FETCH_SMSRCUS,
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

export function fetchTovarCategorys() {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet('smcs/getCategoryList')
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
export function fetchBranchList(params) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet('smcs/getBranchList', params)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_BRANCH_LIST,
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
    doGet(`smsetplp/view?direction=DESC&orderBy=id`, params)
      .then(data => {
        console.log('data', data);
        dispatch(modifyLoader(false));
        if (data.data.status === 200 || data.data.status === 'OK') {
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

export function fetchSmsetplpId(id) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smsetplp/${id}`)
      .then(data => {
        if (data.data.status === 200 || data.data.status === 'OK') {
          dispatch({
            type: FETCH_SMSETPLP_ID,
            payload: data.data,
          });
          dispatch(modifyLoader(false));
        }
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function postSmsetplp(params, fetchSmsetplp) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost(`smsetplp/create`, params)
      .then(data => {
        dispatch(modifyLoader(false));
        if (data.data.status === 200 || data.data.status === 'OK') {
          dispatch({
            type: POST_SMSETPLP,
            payload: data.data.data,
          });
          dispatch(notify('success', errorTableText(101)));
          fetchSmsetplp();
        } else {
          dispatch(notify('error', errorTableText(132)));
        }
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function editSmecam(editParams, fetchSmecam) {
  return function(dispatch) {
    doPut('smecam/edit', editParams)
      .then(data => {
        if (data.status === 200 || data.status === 'OK') {
          dispatch({
            type: EDIT_SMECAM,
            payloda: data,
          });
          fetchSmecam();
          dispatch(notify('success', errorTableText(104), errorTableText(101)));
        } else {
          dispatch(notify('error', errorTableText(133), errorTableText(132)));
        }
      })
      .catch(e => {
        handleError(e, dispatch);
      });
  };
}

export function editSmeca(editParams, fetchSmeca) {
  return function(dispatch) {
    doPut('smeca/edit', editParams)
      .then(data => {
        if (data.status === 200 || data.status === 'OK') {
          dispatch({
            type: EDIT_SMECA,
            payloda: data,
          });
          fetchSmeca();
          dispatch(notify('success', errorTableText(104), errorTableText(101)));
        } else {
          dispatch(notify('error', errorTableText(133), errorTableText(132)));
        }
      })
      .catch(e => {
        handleError(e, dispatch);
      });
  };
}

export function fetchAppStatus() {
  return function(dispatch) {
    doGet('service/reference/serv_app_status')
      .then(({ data }) => {
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
    doGet('service/reference/serv_app_type')
      .then(({ data }) => {
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

export function fetchAppList(params, search) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet('smappl/appList', params, search)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_APP_LIST,
          payload: data.data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function fetchAppMasterList(params) {
  return function(dispatch) {
    doGet('smappl/getMasterList', params)
      .then(({ data }) => {
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

export function fetchEditApp(params, fetchAppList) {
  return function(dispatch) {
    doPost('smappl/editApp', params)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        fetchAppList();
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
    doGet('smslspl?direction=ASC', params)
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

export function editSmsetplp(params, fetchSmsetplp) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPut(`smsetplp/update`, params)
      .then(data => {
        dispatch(modifyLoader(false));
        if (data.data.status === 200 || data.data.status === 'OK') {
          dispatch(notify('success', errorTableText(104), errorTableText(101)));
          fetchSmsetplp();
        } else {
          dispatch(notify('error', errorTableText(133), errorTableText(132)));
        }
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function fetchOperationTypeList() {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet('service_operation_type/view')
      .then(data => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_OPERTAION_TYPE_LIST,
          payload: data.data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function fetchAppListSearchParam(data) {
  return function(dispatch) {
    dispatch({
      type: FETCH_APP_LIST_SEARCH_PARAMS,
      payload: data,
    });
  };
}

export function fetchSmcusporle() {
  return function(dispatch) {
    doGet('smcusporle')
      .then(data => {
        dispatch({
          type: FETCH_SMCUSPORLE,
          payload: data.data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export const fetchMasterList = param => {
  return function(dispatch) {
    doGet(`smappl/getMasterList`, param)
      .then(({ data }) => {
        dispatch({
          type: FETCH_MASTER_LIST,
          data: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
};
export const clearMasterList = () => {
  return function(dispatch) {
    dispatch({
      type: CLEAR_MASTER_LIST,
    });
  };
};
export const fetchOperatorList = param => {
  return function(dispatch) {
    doGet(`smappl/getOperatorList`, param)
      .then(({ data }) => {
        dispatch({
          type: FETCH_OPERATOR_LIST,
          data: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
};
export const clearOperatorList = () => {
  return function(dispatch) {
    dispatch({
      type: CLEAR_OPERATOR_LIST,
    });
  };
};

export function putResold(params, fetchSmeciContractInfo) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPut(`smecim/resold?contractNumber=${params}`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: PUT_RESOLD,
          payload: data,
        });
        fetchSmeciContractInfo();
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

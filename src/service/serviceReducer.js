import {
  FETCH_DYNOBJ_SERVICE,
  CHANGE_DYNOBJ_SERVICE,
  FETCH_SMSETPP,
  FETCH_SMSETPP_HISTORY,
  FETCH_SMSETPP_SERVICE_TYPE_ID,
  FETCH_SMSETPP_TYPE,
  FETCH_SMSETPP_SEARCH,
  FETCH_SRLS,
  FETCH_SMSETPP_PREMIUM_PRICE_TYPE,
  FETCH_SMPLB,
  FETCH_SMCUSPOR_CONTRACT,
  FETCH_SMCUSPOR_HISTORY_ALL,
  FETCH_SMCUSPOR_HISTORY_APP,
  FETCH_SMCUSPOR_HISTORY_CALL,
  FETCH_SMCUSPOR_HISTORY_SERVICE,
  FETCH_SMSRCUS,
  FETCH_TOVAR_CATEGORYS,
  FETCH_CONTRACT_STATUS,
  FETCH_SMECI,
  POST_SMECI,
  POST_SMECIM,
  FETCH_SERV_CRM_CALL_STATUS,
  POST_SMREGC_CREATE_CALL,
  POST_SMREGC_CREATE_CRM_SCHEDULE,
  FETCH_APP_STATUS,
  FETCH_APP_TYPE,
  FETCH_APP_LIST,
  FETCH_APP_MASTER_LIST,
  FETCH_CLEAR_APP_LIST,
  FETCH_SMSLSP,
  FETCH_SMECAM,
  FETCH_SERV_APP_STATUS,
  FETCH_SMVCA,
  FETCH_SMECA,
  FETCH_SMSETPLP,
  POST_SMSETPLP,
  FETCH_OPERTAION_TYPE_LIST,
  FETCH_APP_LIST_SEARCH_PARAMS,
  FETCH_SMSETPLP_ID,
  FETCH_SMSETPP_GET_PRODUCT_LIST,
  FETCH_SMCUSPOR_CONTRACT_HISTORY,
  FETCH_BRANCH_LIST,
  POST_SMCCA_CREATE_CRM_HISTORY,
} from './serviceAction';

const INITIAL_STATE = {
  dynamicObject: {},
  historyDynamicObject: {},
  tovarCategorys: [],
  contractStatus: [],
  operationTypeList: [],
  appList: [],
  appMasterList: [],
  data: {
    service: [],
    type: [],
    addedRequest: [],
  },
  clientHistory: [],
  crmHistoryAll: [],
  smeciContractInfo: [],
  servCrmCallStatus: [],
  smregcCreateCall: [],
  smregcCreateCrmSchedule: [],
  appStatus: [],
  appType: [],
  listOfEmployees: [],
  errorTable: [],
  dataID: [],
  productList: [],
  smcusporContractHistory: [],
  crmHistory: [],
  branchList: [],
  smccaCrmHistory: [],
};
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_DYNOBJ_SERVICE:
      return {
        ...state,
        dynamicObject: { ...state.dynamicObject, ...action.data },
      };

    case CHANGE_DYNOBJ_SERVICE:
      console.log('in reducer ', action.payload);
      return {
        ...state,
        dynamicObject: { ...state.dynamicObject, ...action.data },
      };

    case FETCH_SMSETPP:
      return {
        ...state,
        dynamicObject: {
          ...state.dynamicObject,
          service: [...action.payload.data],
        },
      };
    case FETCH_SMSETPP_HISTORY:
      return {
        ...state,
        dynamicObject: {
          ...state.dynamicObject,
          smsetppHistory: [...action.payload.data],
        },
      };
    case FETCH_SMSETPP_SERVICE_TYPE_ID:
      return {
        ...state,
        dynamicObject: {
          ...state.dynamicObject,
          smsetppServiceType: [...action.payload.data],
        },
      };
    case FETCH_SMSETPP_GET_PRODUCT_LIST:
      return {
        ...state,
        dynamicObject: {
          ...state.dynamicObject,
          smsetppProductList: [...action.payload.data],
        },
      };

    case FETCH_SMSETPP_PREMIUM_PRICE_TYPE:
      return {
        ...state,
        dynamicObject: {
          ...state.dynamicObject,
          premiumPriceTypeId: [...action.payload],
        },
      };

    case FETCH_SMSETPP_TYPE:
      return {
        ...state,
        dynamicObject: {
          ...state.dynamicObject,
          type: [...action.payload.data],
        },
      };
    case FETCH_SMSETPP_SEARCH:
      return {
        ...state,
        dynamicObject: {
          ...state.dynamicObject,
          service: [...action.payload.data],
        },
      };
    case FETCH_SRLS:
      console.log('SRLS REDUCER', action.payload);
      return {
        ...state,
        dynamicObject: { ...state.dynamicObject, ...action.payload },
      };

    case FETCH_SMPLB: {
      return {
        ...state,
        dynamicObject: { ...state.dynamicObject, data: [...action.payload] },
      };
    }

    case FETCH_SMCUSPOR_CONTRACT: {
      return { ...state, clientContract: action.payload.data };
    }

    case FETCH_SMCUSPOR_CONTRACT_HISTORY: {
      return { ...state, smcusporContractHistory: action.payload.data };
    }

    case FETCH_SMCUSPOR_HISTORY_ALL: {
      return { ...state, crmHistoryAll: action.payload.data };
    }

    case FETCH_SMCUSPOR_HISTORY_APP: {
      return { ...state, crmHistoryApp: action.payload.data };
    }

    case FETCH_SMCUSPOR_HISTORY_CALL: {
      return { ...state, crmHistoryCall: action.payload.data };
    }

    case FETCH_SMCUSPOR_HISTORY_SERVICE: {
      return { ...state, crmHistoryServ: action.payload.data };
    }
    case FETCH_SMSRCUS: {
      return {
        ...state,
        dynamicObject: action.payload,
      };
    }

    case FETCH_TOVAR_CATEGORYS: {
      return {
        ...state,
        tovarCategorys: [...action.payload],
      };
    }

    case FETCH_CONTRACT_STATUS: {
      return {
        ...state,
        contractStatus: [...action.payload],
      };
    }

    case FETCH_SMECI: {
      return { ...state, smeciContractInfo: action.payload.data };
    }
    case POST_SMECI: {
      return { ...state, smeciContractInfo: {} };
    }

    case POST_SMECIM: {
      return { ...state, smecimContractInfo: {} };
    }

    case FETCH_SERV_CRM_CALL_STATUS: {
      return { ...state, servCrmCallStatus: action.payload.data };
    }

    case POST_SMREGC_CREATE_CALL: {
      return { ...state, smregcCreateCall: action.payload };
    }

    case POST_SMREGC_CREATE_CRM_SCHEDULE: {
      return { ...state, smregcCreateCrmSchedule: action.payload };
    }

    case FETCH_SMECAM: {
      return {
        ...state,
        dynamicObject: action.payload.servApp,
        historyDynamicObject: [...action.payload.servAppHistory],
      };
    }

    case FETCH_APP_STATUS: {
      return {
        ...state,
        appStatus: [...action.payload],
      };
    }
    case FETCH_APP_TYPE: {
      return {
        ...state,
        appType: [...action.payload],
      };
    }
    case FETCH_APP_LIST:
      return {
        ...state,
        appList: action.payload,
      };
    case FETCH_APP_MASTER_LIST:
      return {
        ...state,
        appMasterList: [...action.payload],
      };
    case FETCH_CLEAR_APP_LIST:
      return {
        ...state,
        appList: [],
        appMasterList: [],
      };
    case FETCH_SMSLSP:
      return {
        ...state,
        listOfEmployees: { ...action.payload },
      };

    case FETCH_SERV_APP_STATUS: {
      return {
        ...state,
        servAppStatus: [...action.payload],
      };
    }

    case FETCH_SMVCA: {
      return {
        ...state,
        dynamicObject: action.payload.servApp,
        historyDynamicObject: [...action.payload.servAppHistory],
      };
    }

    case FETCH_SMECA: {
      return {
        ...state,
        dynamicObject: action.payload.servApp,
        historyDynamicObject: [...action.payload.servAppHistory],
      };
    }
    case FETCH_SMSETPLP: {
      return {
        ...state,
        dynamicObject: action.payload,
      };
    }

    case POST_SMSETPLP: {
      return {
        ...state,
        dynamicObject: [action.payload],
      };
    }
    case FETCH_OPERTAION_TYPE_LIST: {
      return {
        ...state,
        operationTypeList: [...action.payload.data],
      };
    }

    case FETCH_OPERTAION_TYPE_LIST: {
      return {
        ...state,
        operationTypeList: [...action.payload.data],
      };
    }
    case FETCH_SMSETPLP_ID: {
      console.log('ac', action.payload);
      return {
        ...state,
        dataID: { ...action.payload.data },
      };
    }
    case FETCH_APP_LIST_SEARCH_PARAMS:
      return {
        ...state,
        dynamicObject: {
          appListSearchParams: action.payload,
        },
      };
    case FETCH_BRANCH_LIST:
      return {
        ...state,
        branchList: [...action.payload],
      };
    case POST_SMCCA_CREATE_CRM_HISTORY:
      return {
        ...state,
        smccaCrmHistory: [],
      };
    default:
      return state;
  }
}

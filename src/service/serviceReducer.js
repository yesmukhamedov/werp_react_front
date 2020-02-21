import {
  FETCH_DYNOBJ_SERVICE,
  CHANGE_DYNOBJ_SERVICE,
  CLEAR_DYNOBJ_SERVICE,
  POST_SMSETCT,
  FETCH_SMSETCT,
  EDIT_SMSETCT,
  FETCH_SMSETPP,
  FETCH_SMSETPP_TYPE,
  FETCH_SMSETPP_POST,
  FETCH_SMSETPP_SEARCH,
  FETCH_SMSETPP_PUT,
  FETCH_SRLS,
  FETCH_SMSETPP_PREMIUM_PRICE_TYPE,
  FETCH_SMPLB,
  FETCH_SMPLB_ADD,
  HISTORY_EDITING_SMSETCT,
  FETCH_SMCUSPOR,
  FETCH_SMCUSPOR_HISTORY_ALL,
  FETCH_SMCUSPOR_HISTORY_APP,
  FETCH_SMCUSPOR_HISTORY_CALL,
  FETCH_SMCUSPOR_HISTORY_SERVICE,
  FETCH_SMSRCUS,
  FETCH_TOVAR_CATEGORYS,
  FETCH_CONTRACT_STATUS,
  FETCH_SMECI,
  FETCH_SERV_CRM_CALL_STATUS,
  POST_SMREGC_CREATE_CALL,
  FETCH_APP_STATUS,
  FETCH_APP_TYPE,
} from './serviceAction';

const INITIAL_STATE = {
  dynamicObject: {},
  historyDynamicObject: {},
  tovarCategorys: [],
  contractStatus: [],
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
  appStatus: [],
  appType: [],
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

    case CLEAR_DYNOBJ_SERVICE:
      return {
        ...state,
        dynamicObject: {},
        historyDynamicObject: {},
      };
    case POST_SMSETCT:
      if (
        Object.keys(state.dynamicObject).length === 0 ||
        state.dynamicObject === undefined
      ) {
        return { ...state, dynamicObject: [] };
      } else {
        return {
          ...state,
          dynamicObject: [...state.dynamicObject, action.payload],
        };
      }

    case FETCH_SMSETCT:
      return {
        ...state,
        dynamicObject: [...action.payload],
      };
    case EDIT_SMSETCT:
      return {
        ...state,
        dynamicObject: [...state.dynamicObject, action.payload],
      };
    case HISTORY_EDITING_SMSETCT:
      return {
        ...state,
        historyDynamicObject: [...action.payload],
      };

    case FETCH_SMSETPP:
      return {
        ...state,
        dynamicObject: {
          ...state.dynamicObject,
          service: [...action.payload.data],
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

    case FETCH_SMSETPP_POST:
      console.log('object', action.payload);
      return {
        ...state,
        data: {
          ...state.data,
          service: [...state.data.service, action.payload],
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
    case FETCH_SMSETPP_PUT:
      return {
        ...state,
        data: {
          ...state.data,
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
      console.log('in reducer');
      return {
        ...state,
        dynamicObject: { ...state.dynamicObject, data: [...action.payload] },
      };
    }

    case FETCH_SMPLB: {
      console.log('in reducer');
      return {
        ...state,
        dynamicObject: { ...state.dynamicObject, data: [...action.payload] },
      };
    }

    case FETCH_SMCUSPOR: {
      return { ...state, clientHistory: action.payload };
    }

    case FETCH_SMCUSPOR_HISTORY_ALL: {
      return { ...state, crmHistoryAll: action.payload };
    }

    case FETCH_SMCUSPOR_HISTORY_APP: {
      return { ...state, crmHistoryAll: action.payload };
    }

    case FETCH_SMCUSPOR_HISTORY_CALL: {
      return { ...state, crmHistoryAll: action.payload };
    }

    case FETCH_SMCUSPOR_HISTORY_SERVICE: {
      return { ...state, crmHistoryAll: action.payload };
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
      return { ...state, smeciContractInfo: action.payload.data.contractInfo };
    }

    case FETCH_SERV_CRM_CALL_STATUS: {
      return { ...state, servCrmCallStatus: action.payload.data };
    }

    case POST_SMREGC_CREATE_CALL: {
      return { ...state, smregcCreateCall: action.payload };
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

    default:
      return state;
  }
}

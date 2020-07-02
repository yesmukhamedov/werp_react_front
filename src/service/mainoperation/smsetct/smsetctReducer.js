import {
  POST_SMSETCT,
  FETCH_SMSETCT,
  EDIT_SMSETCT,
  HISTORY_EDITING_SMSETCT,
  FETCH_PRODUCT_LIST_SMSETCT,
  CLEAR_DYNOBJ_SERVICE,
} from './smsetctAction';

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
    case CLEAR_DYNOBJ_SERVICE:
      return {
        ...state,
        dynamicObject: {},
        historyDynamicObject: {},
      };

    case FETCH_SMSETCT:
      return {
        ...state,
        dynamicObject: [...action.payload],
      };

    case HISTORY_EDITING_SMSETCT:
      return {
        ...state,
        historyDynamicObject: [...action.payload],
      };

    case FETCH_PRODUCT_LIST_SMSETCT:
      return {
        ...state,
        productList: [...action.payload],
      };

    case EDIT_SMSETCT:
      return {
        ...state,
        dynamicObject: [...state.dynamicObject, action.payload],
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
    default:
      return state;
  }
}

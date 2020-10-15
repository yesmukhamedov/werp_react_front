import {
  FETCH_SMSRCUS_LIST,
  CLEAR_SMSRCUS_LIST,
  CLEAR_SMSRCUS_BLACK_LIST,
  FETCH_SMSRCUS_BLACK_LIST,
  FETCH_SMSRCUS_CLIENT,
  CLEAR_SMSRCUS_CLIENT,
  POST_SMSRCUS_DEACTIVATE_CLIENT_FILTER,
} from './smsrcusAction';

const INITIAL_STATE = {
  dynamicObject: [],
  transfer: [],
  CRMSchedule: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    //
    case FETCH_SMSRCUS_LIST:
      return {
        ...state,
        smsrcusData: { ...action.payload.data },
      };
    case CLEAR_SMSRCUS_LIST:
      return {
        ...state,
        smsrcusData: {},
      };
    //
    case FETCH_SMSRCUS_BLACK_LIST:
      return {
        ...state,
        smsrcusBlackListData: { ...action.payload.data },
      };

    case CLEAR_SMSRCUS_BLACK_LIST:
      return {
        ...state,
        smsrcusBlackListData: {},
      };
    //
    case FETCH_SMSRCUS_CLIENT:
      return {
        ...state,
        smsrcusClient: {
          contractnumber: action.payload.data.contract.contractNumber,
          contract: action.payload.data.contract,
          filter: action.payload.data.filter,
        },
      };
    case CLEAR_SMSRCUS_CLIENT:
      return {
        ...state,
        smsrcusClient: {},
      };
    case POST_SMSRCUS_DEACTIVATE_CLIENT_FILTER:
      return {
        ...state,
        smsrcusDeactivateData: { ...action.payload },
      };

    default:
      return state;
  }
}

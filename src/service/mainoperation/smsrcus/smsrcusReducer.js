import {
  FETCH_SMSRCUS_LIST,
  CLEAR_SMSRCUS_LIST,
  CLEAR_SMSRCUS_BLACK_LIST,
  FETCH_SMSRCUS_BLACK_LIST,
} from './smsrcusAction';

const INITIAL_STATE = {
  dynamicObject: [],
  transfer: [],
  CRMSchedule: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SMSRCUS_LIST:
      return {
        ...state,
        smsrcusData: { ...action.payload.data },
      };
    case FETCH_SMSRCUS_BLACK_LIST:
      return {
        ...state,
        smsrcusBlackListData: { ...action.payload.data },
      };
    case CLEAR_SMSRCUS_LIST:
      return {
        ...state,
        smsrcusData: {},
      };
    case CLEAR_SMSRCUS_BLACK_LIST:
      return {
        ...state,
        smsrcusBlackListData: {},
      };

    default:
      return state;
  }
}

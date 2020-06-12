import {
  FETCH_SMCCALD_GET_PRODUCT_LIST,
  FETCH_CURRENT_STAFF,
  POST_SMCCALD_CREATE_APP,
} from './smccaldActions';

const INITIAL_STATE = {
  dynamicObject: [],
  transfer: [],
  CRMSchedule: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SMCCALD_GET_PRODUCT_LIST:
      return {
        ...state,
        smccaldProductList: [...action.payload.data],
      };
      break;
    case FETCH_CURRENT_STAFF:
      return {
        ...state,
        currentStaff: { ...action.payload.data },
      };
      break;
    case POST_SMCCALD_CREATE_APP:
      return {
        ...state,
        smccaldCreate: { ...action.payload.data },
      };
      break;

    default:
      return state;
  }
}

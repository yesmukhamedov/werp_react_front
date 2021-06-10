import {
  FETCH_COLLECT_MONIES,
  POST_APPROVE_COLLECT_MONEY,
  POST_CREATE_COLLECT_MONEY,
  POST_REJECT_COLLECT_MONEY,
} from './foacAction';

const INITIAL_STATE = {
  collectMoniesList: [],
  collectMoneyApprove: {},
  collectMoneyCreate: {},
  collectMoneyReject: {},
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_COLLECT_MONIES:
      return {
        ...state,
        collectMoniesList: action.data.data,
      };
    case POST_APPROVE_COLLECT_MONEY:
      return {
        ...state,
        collectMoneyApprove: action.data,
      };
    case POST_CREATE_COLLECT_MONEY:
      return {
        ...state,
        collectMoneyCreate: action.data,
      };
    case POST_REJECT_COLLECT_MONEY:
      return {
        ...state,
        collectMoneyReject: action.data,
      };
    default:
      return state;
  }
}

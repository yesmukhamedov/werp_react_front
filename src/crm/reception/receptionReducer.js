import {
  FETCH_ALL_DEMO_LIST,
  CLEAR_DEMO_LIST,
  FETCH_MONEY_STATUS_LIST,
  //
} from './receptionAction';

const INITIAL_STATE = {
  allDemoList: [],
  moneyStatusesList: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ALL_DEMO_LIST:
      return {
        ...state,
        allDemoList: { ...action.payload },
      };
    case CLEAR_DEMO_LIST:
      return {
        ...state,
        allDemoList: {},
      };
    case FETCH_MONEY_STATUS_LIST:
      return {
        ...state,
        moneyStatusesList: { ...action.payload },
      };
    default:
      return state;
  }
}

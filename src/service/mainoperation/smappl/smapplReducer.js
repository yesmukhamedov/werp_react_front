import {
  FETCH_SMAPPL_LIST,
  CLEAR_SMAPPL_LIST,
  //
  FETCH_MASTER_LIST_SMAPPL,
  CLEAR_MASTER_LIST_SMAPPL,
  //
  FETCH_OPERATOR_LIST_SMAPPL,
  CLEAR_OPERATOR_LIST_SMAPPL,
  //
  SMAPPL_FETCH_CATEGORY,
  SMAPPL_FETCH_APP_STATUS,
  SMAPPL_FETCH_APP_TYPE,
} from './smapplAction';

const INITIAL_STATE = {
  smapplList: [],
  masterListSmappl: [],
  operatorListSmappl: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SMAPPL_LIST:
      return {
        ...state,
        smapplList: { ...action.payload },
      };
    case CLEAR_SMAPPL_LIST:
      return {
        ...state,
        smapplList: {},
      };

    case FETCH_MASTER_LIST_SMAPPL:
      return {
        ...state,
        masterListSmappl: [...action.data.data],
      };
    case CLEAR_MASTER_LIST_SMAPPL:
      return {
        ...state,
        masterListSmappl: [],
      };

    case FETCH_OPERATOR_LIST_SMAPPL:
      return {
        ...state,
        operatorListSmappl: [...action.data.data],
      };
    case CLEAR_OPERATOR_LIST_SMAPPL:
      return {
        ...state,
        operatorListSmappl: [],
      };
    case SMAPPL_FETCH_CATEGORY:
      return {
        ...state,
        smapplCategory: [...action.data.data],
      };
    case SMAPPL_FETCH_APP_STATUS:
      return {
        ...state,
        smapplAppStatus: [...action.data.data],
      };
    case SMAPPL_FETCH_APP_TYPE:
      return {
        ...state,
        smapplAppType: [...action.data.data],
      };
    default:
      return state;
  }
}

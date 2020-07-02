import {
  FETCH_SMCRLD_LIST,
  POST_SMCRLD_FORMPLAN,
  FETCH_SMCRLD,
  FETCH_SMVOD_LIST,
  FETCH_SMRD_OPERATOR,
  POST_SMRD_OPERATORS_BY_BRANCH,
  POST_REDIST_SMRD_OPERATOR,
} from './smdisAction';

const INITIAL_STATE = {
  dynamicObject: {},
  contract: {},
  matnr: {},
  smcrldListData: [],
  smcrldListSum: {},
  smrdRedistOperator: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SMCRLD_LIST:
      return {
        ...state,
        smcrldListData: [...action.payload.data.listData],
        smcrldListSum: { ...action.payload.data.listSum },
      };

    case POST_SMCRLD_FORMPLAN:
      return {
        ...state,
        formPlanList: { ...action.data },
      };

    case FETCH_SMCRLD:
      return {
        ...state,
        tovar: { ...action.data.data },
      };

    case FETCH_SMVOD_LIST:
      return {
        ...state,
        smvod: { ...action.data.data },
      };

    case FETCH_SMRD_OPERATOR:
      return {
        ...state,
        smrdOperator: { ...action.data.data },
      };

    case POST_SMRD_OPERATORS_BY_BRANCH:
      return {
        ...state,
        operatorsByBranch: [...action.data.data],
      };

    case POST_REDIST_SMRD_OPERATOR:
      return {
        ...state,
        smrdRedistOperator: [...action.data.data],
      };

    default:
      return state;
  }
}

import {
  FETCH_SMCRLD_LIST,
  POST_SMCRLD_FORMPLAN,
  FETCH_SMCRLD,
  FETCH_SMVOD_LIST,
} from './smdisAction';

const INITIAL_STATE = {
  dynamicObject: {},
  contract: {},
  matnr: {},
  smcrldListData: [],
  smcrldListSum: {},
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SMCRLD_LIST:
      return {
        ...state,
        smcrldObject: { ...action.data.data },
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

    default:
      return state;
  }
}

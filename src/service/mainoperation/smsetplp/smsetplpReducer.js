import { FETCH_SMSETPLP_LIST } from './smsetplpAction';

const INITIAL_STATE = {
  dynamicObject: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SMSETPLP_LIST:
      return {
        ...state,
        smsetplpList: { ...action },
      };

    default:
      return state;
  }
}

import { FETCH_SMVS_LIST } from './smvsAction';

const INITIAL_STATE = {
  smvsList: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SMVS_LIST:
      return {
        ...state,
        smvsList: { ...action.data.data },
        editStat: true,
      };

    default:
      return state;
  }
}

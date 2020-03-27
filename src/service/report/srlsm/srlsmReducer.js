import { FETCH_SRLSM } from './srlsmAction';

const INITIAL_STATE = {
  dynamicObject: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SRLSM:
      return {
        ...state,
        srlsmList: [...action.data.data.data],
      };

    default:
      return state;
  }
}

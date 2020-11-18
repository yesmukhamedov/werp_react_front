import { FETCH_SRQPWGS_LIST, CLEAR_SRQPWGS_LIST } from './srqpwgsAction';

const INITIAL_STATE = {
  srqpwgsList: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SRQPWGS_LIST:
      return {
        ...state,
        srqpwgsList: [...action.data.outputTable],
      };
    case CLEAR_SRQPWGS_LIST:
      return {
        ...state,
        srqpwgsList: [],
      };

    default:
      return state;
  }
}

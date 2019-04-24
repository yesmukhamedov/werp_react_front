import { ALL_EVETNT } from './eventLogAction';

const INITIAL_STATE = {
  listAll: {},
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ALL_EVETNT:
      return { ...state, listAll: action.payload };
    default:
      return state;
  }
}

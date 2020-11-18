import { FETCH_SRTBB_LIST, CLEAR_SRTBB_LIST } from './srtbbAction';

const INITIAL_STATE = {
  srlsList: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SRTBB_LIST:
      return {
        ...state,
        srtbbList: [...action.data.outputTable],
      };
    case CLEAR_SRTBB_LIST:
      return {
        ...state,
        srtbbList: [],
      };

    default:
      return state;
  }
}

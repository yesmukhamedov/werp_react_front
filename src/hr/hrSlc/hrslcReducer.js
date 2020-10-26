import { FETCH_HR_SLC, CLEAR_HR_SLC } from './hrslcAction';

const INITIAL_STATE = {
  srlsList: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_HR_SLC:
      return {
        ...state,
        hrSlcData: { ...action.data.data },
      };
    case CLEAR_HR_SLC:
      return {
        ...state,
        hrSlcData: {},
      };

    default:
      return state;
  }
}

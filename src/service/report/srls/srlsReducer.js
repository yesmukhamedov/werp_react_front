import { FETCH_SERVICE_LIST } from './srlsAction';

const INITIAL_STATE = {
  srlsList: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SERVICE_LIST:
      return {
        ...state,
        srlsList: { ...action.data.data.data },
      };

    default:
      return state;
  }
}

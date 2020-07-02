import { FETCH_SERV_APP_TYPE } from './srefAction';

const INITIAL_STATE = {
  servAppType: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SERV_APP_TYPE: {
      return { ...state, servAppType: action.payload.data };
    }
    default:
      return state;
  }
}

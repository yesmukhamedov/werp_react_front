import {
  LOG_WERKS_REQUEST_LIST_FETCHED,
  LOG_WERKS_REQUEST_BLANKED,
} from '../actions/logisticsActionTypes';

const INITIAL_STATE = {
  werksRequests: [],
  werksRequestModel: {},
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOG_WERKS_REQUEST_LIST_FETCHED:
      return { ...state, werksRequests: action.payload };

    case LOG_WERKS_REQUEST_BLANKED:
      return { ...state, werksRequestModel: action.payload };

    default:
      return state;
  }
}

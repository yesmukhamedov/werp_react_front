import {
  LOG_WERKS_REQUEST_LIST_FETCHED,
  LOG_WERKS_REQUEST_BLANKED,
  LOG_MATNRS_FETCHED,
  LOG_MATNRS_LOADING,
  LOG_WERKS_REQUEST_ITEM_BLANKED,
  LOG_WERKS_REQUEST_FETCHED,
} from '../actions/logisticsActionTypes';

const INITIAL_STATE = {
  werksRequests: [],
  werksRequestModel: {},
  werksRequestItemModel: {},
  matnrs: [],
  matnrsLoading: false,
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOG_MATNRS_FETCHED:
      return { ...state, matnrs: action.payload };

    case LOG_MATNRS_LOADING:
      return { ...state, matnrsLoading: action.payload };

    case LOG_WERKS_REQUEST_LIST_FETCHED:
      return { ...state, werksRequests: action.payload };

    case LOG_WERKS_REQUEST_BLANKED:
    case LOG_WERKS_REQUEST_FETCHED:
      return { ...state, werksRequestModel: action.payload };

    case LOG_WERKS_REQUEST_ITEM_BLANKED:
      return { ...state, werksRequestItemModel: action.payload };

    default:
      return state;
  }
}

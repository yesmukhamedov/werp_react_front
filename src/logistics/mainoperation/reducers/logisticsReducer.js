import {
  LOG_WERKS_REQUEST_LIST_FETCHED,
  LOG_WERKS_REQUEST_BLANKED,
  LOG_MATNRS_FETCHED,
  LOG_MATNRS_LOADING,
  LOG_WERKS_REQUEST_ITEM_BLANKED,
  LOG_WERKS_REQUEST_FETCHED,
  LOG_INVOICES_FETCHED,
  LOG_INVOICE_BLANKED,
  LOG_INVOICE_FETCHED,
  LOG_SET_INVOICE_MODEL,
  LOG_INVOICES_FETCHED_BY_STATUS,
} from '../actions/logisticsActionTypes';

const INITIAL_STATE = {
  werksRequests: [],
  werksRequestModel: {},
  werksRequestItemModel: {},
  matnrs: [],
  matnrsLoading: false,
  invoicePage: {},
  invoiceModel: {},
  invoicePageByStatus: {},
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

    case LOG_INVOICES_FETCHED:
      return { ...state, invoicePage: action.payload };

    case LOG_SET_INVOICE_MODEL:
    case LOG_INVOICE_BLANKED:
    case LOG_INVOICE_FETCHED:
      return { ...state, invoiceModel: action.payload };

    case LOG_INVOICES_FETCHED_BY_STATUS:
      let temp = Object.assign({}, state.invoicePageByStatus);
      temp[action.status] = action.data;
      return { ...state, invoicePageByStatus: temp };

    default:
      return state;
  }
}

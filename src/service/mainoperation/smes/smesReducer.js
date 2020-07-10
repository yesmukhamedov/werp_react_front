import {
  FETCH_SMES_LIST,
  FETCH_PAYMENT_OPTIONS,
  ACCEPT_PAYMENT,
  CANCEL_PAYMENT,
} from './smesAction';

const INITIAL_STATE = {
  smvsList: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SMES_LIST:
      return {
        ...state,
        smesList: { ...action.data.data },
      };
    case FETCH_PAYMENT_OPTIONS:
      return {
        ...state,
        paymentOptions: [...action.data.hkontOptions],
      };

    case ACCEPT_PAYMENT:
      return {
        ...state,
        acceptPayment: { ...action.data },
      };

    case CANCEL_PAYMENT:
      console.log('REDUCER', action);
      return {
        ...state,
        cancelPayment: { ...action.data },
      };

    default:
      return state;
  }
}

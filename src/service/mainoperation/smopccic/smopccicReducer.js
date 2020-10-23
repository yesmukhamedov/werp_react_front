import {
  FETCH_SEARCH_CUSTOMER,
  CLEAR_SEARCH_CUSTOMER,
  FETCH_TRANSFER_APPLICATION,
  FETCH_MY_APPLICATION,
  CLEAR_MY_APPLICATION_EXODUS,
} from './smopccicAction';

const INITIAL_STATE = {
  dynamicObject: [],
  searchCustomerData: {},
  transferApplicationData: {},
  myApplicationData: {},
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SEARCH_CUSTOMER:
      return {
        ...state,
        searchCustomerData: { ...action.payload.data },
      };

    case CLEAR_SEARCH_CUSTOMER:
      return {
        ...state,
        searchCustomerData: {},
      };

    case FETCH_TRANSFER_APPLICATION:
      return {
        ...state,
        transferApplicationData: { ...action.payload },
      };

    case FETCH_MY_APPLICATION:
      return {
        ...state,
        myApplicationData: { ...action.payload.data },
      };
    case CLEAR_MY_APPLICATION_EXODUS:
      return {
        ...state,
        myApplicationData: {},
      };

    default:
      return state;
  }
}

import {
  FETCH_SEARCH_CUSTOMER,
  FETCH_TRANSFER_APPLICATION,
  FETCH_MY_APPLICATION,
} from './smopccicAction';

const INITIAL_STATE = {
  dynamicObject: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SEARCH_CUSTOMER:
      return {
        ...state,
        searchCustomerData: [...action.data],
      };

    case FETCH_TRANSFER_APPLICATION:
      return {
        ...state,
        transferApplicationData: { ...action.data },
      };

    case FETCH_MY_APPLICATION:
      return {
        ...state,
        myApplicationData: { ...action.data },
      };

    default:
      return state;
  }
}

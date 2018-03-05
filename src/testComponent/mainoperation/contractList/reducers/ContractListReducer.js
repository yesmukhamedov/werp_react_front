import {
  CONTRACT_LIST_DIRECTORIES,
  CLEAR_CONSTRACT_LIST_STORE,
  FOUND_CONTRACTS,
} from '../actions/ContractListAction';

export default function (state = {}, action) {
  // eslint-disable-next-line
    switch(action.type) {
    case CONTRACT_LIST_DIRECTORIES:
      return { ...state, directories: action.payload };
    case FOUND_CONTRACTS:
      return { ...state, result: action.payload };
    case CLEAR_CONSTRACT_LIST_STORE:
      return { ...state, directories: undefined };
  }

  return state;
}

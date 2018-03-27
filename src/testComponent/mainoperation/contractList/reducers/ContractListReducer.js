import _ from 'lodash';
import {
  CONTRACT_LIST_DIRECTORIES,
  CLEAR_CONSTRACT_LIST_STORE,
  FOUND_CONTRACTS,
  EDIT_CONTRACT_OPERATOR,
} from '../actions/ContractListAction';

export default function (state = {}, action) {
  // eslint-disable-next-line
  switch (action.type) {
    case CONTRACT_LIST_DIRECTORIES:
      return { ...state, directories: action.payload };
    case FOUND_CONTRACTS:
      const result = _.mapKeys(action.payload, 'contractNumber');
      return { ...state, result };
    case EDIT_CONTRACT_OPERATOR:
      const newResult = { ...state.result, [action.payload.contractNumber]: action.payload };
      return { ...state, result: newResult };
    case CLEAR_CONSTRACT_LIST_STORE:
      return {
        ...state, directories: undefined, result: undefined,
      };
  }

  return state;
}

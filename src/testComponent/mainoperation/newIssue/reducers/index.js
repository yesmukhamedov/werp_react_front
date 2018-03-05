import { FETCH_CONTRACT_DETAILS, FETCH_TASKS } from '../actions/actionTypes';

export default function (prevState = {}, action) {
  switch (action.type) {
    case FETCH_CONTRACT_DETAILS:
      console.log("setting in reducer")
      return {
        ...prevState,
        contractDetails: action.payload,
      };
    case FETCH_TASKS:
      break;
    default:
      break;
  }
  return prevState;
}

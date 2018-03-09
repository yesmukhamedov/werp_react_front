import {
  FETCH_CONTRACT_DETAILS,
  FETCH_TASKS,
} from '../actions/actionTypes';

const newIssuePageReducer = (prevState = {}, action) => {
  switch (action.type) {
    case FETCH_CONTRACT_DETAILS:
      // TODO: refactor after backend splits into separate objects
      const { comments, ...contractDetails } = action.payload;
      return {
        ...prevState,
        contractDetails,
      };
    case FETCH_TASKS:
      break;
    default:
      break;
  }
  return prevState;
};

export default newIssuePageReducer;

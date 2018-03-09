import {
  EDIT_OUTCALL_COMMENT,
  FETCH_CONTRACT_DETAILS,
  SUBMIT_OUTCALL_COMMENT,
} from '../actions/actionTypes';

const initialState = {
  comments: [],
  newComment: '',
};

const outCallDetailsPanelReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTRACT_DETAILS:
      return {
        ...prevState,
        comments: action.payload.comments,
      };
    case EDIT_OUTCALL_COMMENT:
      return {
        ...prevState,
        newComment: action.payload,
      };
    case SUBMIT_OUTCALL_COMMENT:
      return {
        ...prevState,
        newComment: '',
        comments: [...prevState.comments, action.payload],
      };
    default:
      break;
  }
  return prevState;
};

export default outCallDetailsPanelReducer;

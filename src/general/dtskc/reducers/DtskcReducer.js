import {
  DTSKC_FETCH_REFERENCES,
  DTSKC_FETCH_ASSIGNEES,
  DTSKC_ASSIGNEE_MODAL_TOGGLE,
} from '../actions/actionTypes';

const initialState = {
  reference: {
    deptOpts: [],
  },
  assigneeModal: true,
};

const DtskcReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case DTSKC_FETCH_ASSIGNEES:
      return {
        ...prevState,
        assigneeOpts: action.payload,
      };
    case DTSKC_FETCH_REFERENCES:
      return {
        ...prevState,
        reference: { ...action.payload },
      };
    case DTSKC_ASSIGNEE_MODAL_TOGGLE:
      return {
        ...prevState,
        assigneeModal: !action.payload,
      };
    default:
      break;
  }
  return prevState;
};

export default DtskcReducer;

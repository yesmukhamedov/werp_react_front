import { DTSKC_FETCH_REFERENCES, DTSKC_FETCH_ASSIGNEES } from '../actions/actionTypes';

const initialState = {
  reference: {
    deptOpts: [],
  },
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
    default:
      break;
  }
  return prevState;
};

export default DtskcReducer;

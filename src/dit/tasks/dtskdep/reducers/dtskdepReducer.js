import {
  DTSKDEP_FETCH_REFERENCES,
  DTSKDEP_FETCH_TASKADMINS,
} from '../actions';

const initialState = {
  reference: {
    deptOpts: [],
  },
};

const dtskdepReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case DTSKDEP_FETCH_REFERENCES:
      return {
        ...prevState,
        reference: {...action.payload},
      };
    case DTSKDEP_FETCH_TASKADMINS:
      return {
        ...prevState,
        ...action.payload,
      };
    default:
      break;
  }
  return prevState;
};

export default dtskdepReducer;

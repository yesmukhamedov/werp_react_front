import {
  CLEAR_TASK_STORE,
  FETCH_TASK_DETAILS,
} from '../actions/TaskAction';

export default function (state = {}, action) {
  // eslint-disable-next-line
    switch(action.type) {
    case FETCH_TASK_DETAILS:
      return { ...state, taskDetails: action.payload };
    case CLEAR_TASK_STORE:
      return { ...state, directories: undefined, taskDetails: undefined };
  }

  return state;
}

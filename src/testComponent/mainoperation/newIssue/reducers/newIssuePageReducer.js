import {
  FETCH_CONTRACT_DETAILS,
  FETCH_TASKS,
} from '../actions/actionTypes';
import { TASK_LIST_DIRECTORIES } from '../../taskList/actions/TaskListAction';

const initialState = {
  modalOpen: false,
  details: {},
  directories: {},
};

const newIssuePageReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTRACT_DETAILS:
      return {
        ...prevState,
        contractDetails: action.payload.details,
        outCallId: action.payload.details.id,
      };
    case TASK_LIST_DIRECTORIES:
      return {
        ...prevState,
        directories: action.payload,
      };
    case FETCH_TASKS:
      return {
        ...prevState,
        tasks: action.payload,
      };
    default:
      break;
  }
  return prevState;
};

export default newIssuePageReducer;

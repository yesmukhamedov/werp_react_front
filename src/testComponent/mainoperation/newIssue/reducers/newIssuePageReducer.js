import {
  FETCH_CONTRACT_DETAILS,
  CREATE_OUTCALL,
  CREATE_NEW_TASK,
  FETCH_TASKS,
  OUTCALL_STATUS_COMMENT_UPDATED,
} from '../actions/actionTypes';
import { TASK_LIST_DIRECTORIES } from '../../taskList/actions/TaskListAction';

const initialState = {
  modalOpen: false,
  details: {},
  directories: {},
  contractDetails: {},
  outCallInfo: {
    status: {},
  },
  tasks: [],
  bukrs: '0',
  comments: [],
};

const newIssuePageReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case CREATE_OUTCALL:
    case OUTCALL_STATUS_COMMENT_UPDATED:
    case FETCH_CONTRACT_DETAILS:
      return {
        ...prevState,
        contractDetails: action.payload.details,
        outCallId: action.payload.details.id,
        bukrs: action.payload.details.bukrs,
        outCallInfo: {
          contractNumber: action.payload.details.contractNumber,
          status: action.payload.details.status,
          operator: action.payload.details.operator,
          createdAt: action.payload.details.createdAt,
          modifiedAt: action.payload.details.modifiedAt,
        },
        comments: action.payload.comments,
      };
    case TASK_LIST_DIRECTORIES:
      return {
        ...prevState,
        directories: action.payload,
      };
    case CREATE_NEW_TASK:
      return {
        ...prevState,
        tasks: [...prevState.tasks, action.payload],
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

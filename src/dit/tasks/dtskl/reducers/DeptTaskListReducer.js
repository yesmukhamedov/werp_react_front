import {
  DEPT_TASK_LIST_DIRECTORIES,
  CLEAR_DEPT_TASK_LIST,
  FOUND_DEPT_TASKS,
  FETCH_PRIVATE_TASKS,
  FETCH_ASSIGNEE_DETAILS,
  EDIT_TASK_RECIPIENT,
} from '../actions/DeptTaskListAction';

export default function(state = {}, action) {
  // eslint-disable-next-line
  switch (action.type) {
    case DEPT_TASK_LIST_DIRECTORIES:
      return { ...state, directories: action.payload };
    case FOUND_DEPT_TASKS:
      return { ...state, result: action.payload };
    case FETCH_PRIVATE_TASKS:
      return {
        ...state,
        privateTasks: action.payload,
        size: action.payload.length,
      };
    case CLEAR_DEPT_TASK_LIST:
      return {
        ...state,
        directories: undefined,
        result: undefined,
        privateTasks: undefined,
      };
    case FETCH_ASSIGNEE_DETAILS:
      return { ...state, assigneeDetails: action.payload };
    case EDIT_TASK_RECIPIENT:
      return { ...state, editDetails: action.payload };
  }

  return state;
}

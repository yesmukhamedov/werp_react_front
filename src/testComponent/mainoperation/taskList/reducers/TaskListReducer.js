import {
  TASK_LIST_DIRECTORIES,
  CLEAR_TASK_LIST_STORE,
  FOUND_TASKS,
} from '../actions/TaskListAction';

export default function (state = {}, action) {
  // eslint-disable-next-line
    switch(action.type) {
    case TASK_LIST_DIRECTORIES:
      return { ...state, directories: action.payload };
    case FOUND_TASKS:
      return { ...state, result: action.payload };
    case CLEAR_TASK_LIST_STORE:
      return { ...state, directories: undefined, result: undefined };
  }

  return state;
}

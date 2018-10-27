import {
  MONITOR_TASK_LIST_DIRECTORIES,
  CLEAR_MONITOR_TASK_LIST,
  FOUND_MONITOR_TASKS,
} from '../actions/TaskMonitorAction';

export default function (state = {}, action) {
  // eslint-disable-next-line
  switch(action.type) {
    case MONITOR_TASK_LIST_DIRECTORIES:
      return { ...state, directories: action.payload };
    case FOUND_MONITOR_TASKS:
      return { ...state, result: action.payload };
    case CLEAR_MONITOR_TASK_LIST:
      return { ...state, directories: undefined, result: undefined };
  }

  return state;
}

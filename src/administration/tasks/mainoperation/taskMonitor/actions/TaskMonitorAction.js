import axios from 'axios';
import _ from 'lodash';
import { ROOT_URL } from '../../../../../utils/constants';
import { notify } from '../../../../../general/notification/notification_action';

export const MONITOR_TASK_LIST_DIRECTORIES = 'monitor_task_list_directories';
export const CLEAR_MONITOR_TASK_LIST = 'clear_monitor_task_list';
export const FOUND_MONITOR_TASKS = 'found_monitor_tasks';

export function searchTasks(params, resolve) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/api/tasks?${params}`, {
      headers: { authorization: localStorage.getItem('token') },
    })
      .then(({ data }) => {
        console.log(data);
        dispatch({
          type: FOUND_MONITOR_TASKS,
          payload: data,
        });
        resolve();
      })
      .catch((error) => {
        console.log('ERROR in general task list search', error);
        if (error.response) {
          dispatch(notify('error', error.response.data.message, 'Ошибка'));
        } else {
          Promise.resolve({ error }).then(response => dispatch(notify('error', error.response.data.message, 'Ошибка')));
        }
      });
  };
}

export function clearTaskMonitorStore() {
  return (dispatch) => {
    dispatch({ type: CLEAR_MONITOR_TASK_LIST });
  };
}

export function getTaskMonitorDirectories(lang) {
  return (dispatch) => {
    const directories = {
      departmentOptions: [
        { key: 1, value: 1, text: 'First dept' },
        { key: 2, value: 2, text: 'Second dept' },
        { key: 3, value: 3, text: 'Third dept' },
      ],
      typeOptions: [
        { key: 1, value: 1, text: 'First type' },
        { key: 2, value: 2, text: 'Second type' },
        { key: 3, value: 3, text: 'Third type' },
      ],
    };
    setTimeout(function(){
      dispatch({
        type: MONITOR_TASK_LIST_DIRECTORIES,
        payload: directories,
      });
    }, 1000);
  };
}

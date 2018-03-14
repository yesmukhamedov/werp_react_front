/* jshint esversion: 6 */
import axios from 'axios';
import { ROOT_URL } from '../../../../utils/constants';

export const CLEAR_TASK_STORE = 'clear_task_store';
export const FETCH_TASK_DETAILS = 'fetch_task_details';

export function clearTaskStore() {
  return (dispatch) => {
    dispatch({ type: CLEAR_TASK_STORE });
  };
}

export function fetchTaskById(taskId) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/api/tasks/${taskId}`, {
      headers: { authorization: localStorage.getItem('token') },
    })
      .then(({ data }) => {
        dispatch({
          type: FETCH_TASK_DETAILS,
          payload: data,
        });
      })
      .catch(err => console.log('ERROR in task search by id', err));
  };
}

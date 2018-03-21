/* jshint esversion: 6 */
import axios from 'axios';
import { ROOT_URL } from '../../../../utils/constants';
import { notify } from '../../../../general/notification/notification_action';

export const CLEAR_TASK_STORE = 'clear_task_store';
export const FETCH_TASK_DETAILS = 'fetch_task_details';
export const EDIT_TASK = 'edit_task';

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
      .catch((error) => {
        console.log('ERROR in task search by id', error);
        if (error.response) {
          dispatch(notify('error', error.response.data.message, 'Ошибка'));
        } else {
          Promise.resolve({ error }).then(response => dispatch(notify('error', error.response.data.message, 'Ошибка')));
        }
      });
  };
}

export function editTask(taskId, fields) {
  const dirtyFields = {};
  if (fields.title) {
    dirtyFields.title = fields.title;
  }
  if (fields.description) {
    dirtyFields.description = fields.description;
  }
  if (fields.status) {
    const status = { id: fields.status };
    dirtyFields.status = status;
  }
  if (fields.priority) {
    const priority = { id: fields.priority };
    dirtyFields.priority = priority;
  }
  if (fields.branch) {
    const branchId = { branch: { id: fields.branch } };
    dirtyFields.recipient = branchId;
  }
  if (fields.department) {
    const departmentId = { department: { id: fields.department } };
    dirtyFields.recipient = departmentId;
  }
  if (fields.position) {
    const positionId = { position: { id: fields.position } };
    dirtyFields.recipient = positionId;
  }
  if (fields.comment) {
    dirtyFields.newComment = fields.comment;
  }
  // console.log("dirty: ", dirtyFields)
  return (dispatch) => {
    axios.put(
      `${ROOT_URL}/api/tasks/${taskId}`,
      dirtyFields,
      { headers: { authorization: localStorage.getItem('token') } },
    ).then(({ data }) => {
      // console.log('data: ', data);
      dispatch({
        type: EDIT_TASK,
        payload: data,
      });
    })
      .catch((error) => {
        console.log('ERROR in task edit', error);
        if (error.response) {
          dispatch(notify('error', error.response.data.message, 'Ошибка'));
        } else {
          Promise.resolve({ error }).then(response => dispatch(notify('error', error.response.data.message, 'Ошибка')));
        }
      });
  };
}

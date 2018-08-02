/* jshint esversion: 6 */
import axios from 'axios';
import { ROOT_URL } from '../../../../../utils/constants';
import { notify } from '../../../../../general/notification/notification_action';

export const CLEAR_TASK_STORE = 'clear_task_store';
export const FETCH_TASK_DETAILS = 'fetch_task_details';
export const EDIT_TASK = 'edit_task';

export function clearTaskStore() {
  return (dispatch) => {
    dispatch({ type: CLEAR_TASK_STORE });
  };
}

function extractAttachments(attachment) {
  const { attachmentJson, ...rest } = attachment;
  if (attachmentJson) {
    try {
      const list = JSON.parse(attachmentJson);
      return {
        ...rest,
        attachmentJson: list,
      };
    } catch (error) {
      console.error('Could not parse attachment in extractAttachments()', error);
    }
  }
  return {};
}

export function fetchTaskById(taskId) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/api/tasks/${taskId}`, {
      headers: { authorization: localStorage.getItem('token') },
    })
      .then(({ data }) => {
        const { attachment, ...rest } = data;
        const parsedAttachment = extractAttachments(attachment);

        dispatch({
          type: FETCH_TASK_DETAILS,
          payload: { ...rest, attachment: parsedAttachment },
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
  if (fields.branch || fields.department || fields.position) {
    dirtyFields.recipient = {};
    if (fields.branch) {
      const branchId = { id: fields.branch };
      dirtyFields.recipient.branch = branchId;
    }
    if (fields.department) {
      const departmentId = { id: fields.department };
      dirtyFields.recipient.department = departmentId;
    }
    if (fields.position) {
      const positionId = { id: fields.position };
      dirtyFields.recipient.position = positionId;
    }
  }
  if (fields.comment) {
    dirtyFields.newComment = fields.comment;
  }
  return (dispatch) => {
    axios.put(
      `${ROOT_URL}/api/tasks/${taskId}`,
      dirtyFields,
      { headers: { authorization: localStorage.getItem('token') } },
    ).then(({ data }) => {
      // console.log('data: ', data);

      const { attachment, ...rest } = data;
      const parsedAttachment = extractAttachments(attachment);

      dispatch({
        type: EDIT_TASK,
        payload: { ...rest, attachment: parsedAttachment },
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

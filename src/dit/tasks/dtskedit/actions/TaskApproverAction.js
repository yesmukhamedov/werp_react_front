/* jshint esversion: 6 */
import axios from 'axios';
import _ from 'lodash';
import { ROOT_URL } from '../../../../utils/constants';
import { notify } from '../../../../general/notification/notification_action';

export const FETCH_TASK_DOC_STATUS = 'fetch_task_doc_status';

const taskApproveUrl = `${ROOT_URL}/api/tasks`;

export function fetchTaskDocStatus(taskId, authorsManager, recipient) {
  const paramsDict = {
    authorsManager: authorsManager && authorsManager.id,
    assigneesManager: recipient.assigneesManager && recipient.assigneesManager.id,
  };

  const params = _.map(
    paramsDict,
    (val, key) =>
      (val ? `${key}=${val}` : val === false ? `${key}=${val}` : ''),
  )
    .filter(param => param)
    .join('&');

  return (dispatch) => {
    axios.get(`${taskApproveUrl}/status/${taskId}?${params}`, {
      headers: { authorization: localStorage.getItem('token') },
    })
      .then(({ data }) => {
        dispatch({
          type: FETCH_TASK_DOC_STATUS,
          payload: data,
        });
      })
      .catch((error) => {
        console.log('ERROR in task doc status search by id', error);
        if (error.response) {
          dispatch(notify('error', error.response.data.message, 'Ошибка'));
        } else {
          Promise.resolve({ error }).then(response => dispatch(notify('error', response.data.message, 'Ошибка')));
        }
      });
  };
}

export function approve(task, successCallback) {
  return (dispatch) => {
    axios.post(`${taskApproveUrl}/approve`, task, {
      headers: { authorization: localStorage.getItem('token') },
    })
      .then(() => {
        dispatch(notify('success', 'Задача успешно одобрена', 'Успешно'));
        if (successCallback) {
          successCallback();
        }
      })
      .catch((error) => {
        console.log('ERROR in task doc approve', error);
        if (error.response) {
          dispatch(notify('error', error.response.data.message, 'Ошибка'));
        } else {
          Promise.resolve({ error }).then(response => dispatch(notify('error', response.data.message, 'Ошибка')));
        }
      });
  };
}

export function reject(task, successCallback) {
  return (dispatch) => {
    axios.post(`${taskApproveUrl}/reject`, task, {
      headers: { authorization: localStorage.getItem('token') },
    })
      .then(({ data }) => {
        dispatch(notify('success', 'Задача отклонена', 'Успешно'));
        if (successCallback) {
          successCallback();
        }
      })
      .catch((error) => {
        console.log('ERROR in task doc approve', error);
        if (error.response) {
          dispatch(notify('error', error.response.data.message, 'Ошибка'));
        } else {
          Promise.resolve({ error }).then(response => dispatch(notify('error', response.data.message, 'Ошибка')));
        }
      });
  };
}
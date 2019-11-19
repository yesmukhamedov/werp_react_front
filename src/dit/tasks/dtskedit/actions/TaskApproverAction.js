/* jshint esversion: 6 */
import { doGet, doPost } from '../../../../utils/apiActions';
import _ from 'lodash';
import { notify } from '../../../../general/notification/notification_action';

export const FETCH_TASK_DOC_STATUS = 'fetch_task_doc_status';

const taskApproveUrl = `tasks`;

export function fetchTaskDocStatus(taskId, authorsManager, recipient) {
  const paramsDict = {
    authorsManager: authorsManager && authorsManager.id,
    assigneesManager:
      recipient.assigneesManager && recipient.assigneesManager.id,
  };

  const params = _.map(paramsDict, (val, key) =>
    val ? `${key}=${val}` : val === false ? `${key}=${val}` : '',
  )
    .filter(param => param)
    .join('&');

  return dispatch => {
    doGet(`${taskApproveUrl}/status/${taskId}?${params}`)
      .then(({ data }) => {
        dispatch({
          type: FETCH_TASK_DOC_STATUS,
          payload: data,
        });
      })
      .catch(error => {
        console.log('ERROR in task doc status search by id', error);
        if (error.response) {
          dispatch(notify('error', error.response.data.message, 'Ошибка'));
        } else {
          Promise.resolve({ error }).then(response =>
            dispatch(notify('error', response.data.message, 'Ошибка')),
          );
        }
      });
  };
}

export function approve(task, successCallback) {
  return dispatch => {
    doPost(`${taskApproveUrl}/approve`, task)
      .then(() => {
        dispatch(notify('success', 'Задача успешно одобрена', 'Успешно'));
        if (successCallback) {
          successCallback();
        }
      })
      .catch(error => {
        console.log('ERROR in task doc approve', error);
        if (error.response) {
          dispatch(notify('error', error.response.data.message, 'Ошибка'));
        } else {
          Promise.resolve({ error }).then(response =>
            dispatch(notify('error', response.data.message, 'Ошибка')),
          );
        }
      });
  };
}

export function reject(task, successCallback) {
  return dispatch => {
    doPost(`${taskApproveUrl}/reject`, task)
      .then(({ data }) => {
        dispatch(notify('success', 'Задача отклонена', 'Успешно'));
        if (successCallback) {
          successCallback();
        }
      })
      .catch(error => {
        console.log('ERROR in task doc approve', error);
        if (error.response) {
          dispatch(notify('error', error.response.data.message, 'Ошибка'));
        } else {
          Promise.resolve({ error }).then(response =>
            dispatch(notify('error', response.data.message, 'Ошибка')),
          );
        }
      });
  };
}

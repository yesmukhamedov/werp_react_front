import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
import { ROOT_URL } from '../../../../utils/constants';
import apiClient from '../../../../utils/apiClient';
import { notify } from '../../../../general/notification/notification_action';

export const DEPT_TASK_LIST_DIRECTORIES = 'dept_task_list_directories';
export const CLEAR_DEPT_TASK_LIST = 'clear_dept_task_list';
export const FOUND_DEPT_TASKS = 'found_dept_tasks';
export const FETCH_PRIVATE_TASKS = 'fetch_private_tasks';
export const EDIT_TASK_RECIPIENT = 'edit_task_recipient';
export const FETCH_ASSIGNEE_DETAILS = 'fetch_assignee_details';

export function searchTasks(params, resolve) {
  return dispatch => {
    apiClient
      .get(`${ROOT_URL}/api/dtskl/tasks?${params}`)
      .then(({ data }) => {
        // console.log(data);
        dispatch({
          type: FOUND_DEPT_TASKS,
          payload: data,
        });
        resolve();
      })
      .catch(error => {
        console.log('ERROR in DEPT task list search', error);
        if (error.response) {
          dispatch(notify('error', error.response.data.message, 'Ошибка...'));
        } else {
          Promise.resolve({ error }).then(response =>
            dispatch(notify('error', response, 'Ошибка')),
          );
        }
        resolve();
      });
  };
}

export function fetchPrivateTasks() {
  return dispatch => {
    apiClient
      .get(`${ROOT_URL}/api/dtskl/privateTasks`)
      .then(({ data }) => {
        // console.log(data);
        dispatch({
          type: FETCH_PRIVATE_TASKS,
          payload: data,
        });
      })
      .catch(error => {
        console.log('ERROR in private task list fetch', error);
        if (error.response) {
          dispatch(notify('error', error.response.data.message, 'Ошибка...'));
        } else {
          Promise.resolve({ error }).then(response =>
            dispatch(notify('error', response, 'Ошибка')),
          );
        }
      });
  };
}

export function clearDeptTaskListStore() {
  return dispatch => {
    dispatch({ type: CLEAR_DEPT_TASK_LIST });
  };
}

export function getDeptTaskListDirectoriesOld(lang) {
  return dispatch => {
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
    setTimeout(() => {
      dispatch({
        type: DEPT_TASK_LIST_DIRECTORIES,
        payload: directories,
      });
    }, 1000);
  };
}

function getTaskDirectory(name) {
  return apiClient.get(`${ROOT_URL}/api/tasks/${name}`);
}

function getRefDirectory(name) {
  return apiClient.get(`${ROOT_URL}/api/reference/${name}`);
}

export function getDeptTaskListDirectories(lang) {
  return dispatch => {
    axios
      .all([
        getTaskDirectory('types'),
        getTaskDirectory('status'),
        getRefDirectory('departments'),
      ])
      .then(
        axios.spread(
          ({ data: typeList }, { data: statusList }, { data: deptList }) => {
            const typeOpts = typeList.map(item => ({
              key: item.code,
              value: item.code,
              text: item[lang],
            }));
            const statusOpts = statusList.map(item => ({
              key: item.id,
              value: item.id,
              text: item[lang],
            }));
            const deptOpts = deptList.map(item => ({
              key: item.dep_id,
              value: item.dep_id,
              text:
                lang === 'ru'
                  ? item.name_ru
                  : lang === 'en'
                  ? item.name_en
                  : item.name_tr,
            }));
            const directories = {
              typeOptions: _.mapKeys(typeOpts, 'key'),
              statusOptions: _.mapKeys(statusOpts, 'key'),
              deptOptions: _.mapKeys(deptOpts, 'key'),
            };
            dispatch({
              type: DEPT_TASK_LIST_DIRECTORIES,
              payload: directories,
            });
          },
        ),
      )
      .catch(error => {
        console.log('Error in department task list directories', error);
        if (error.response) {
          dispatch(notify('error', error.response.data.message, 'Ошибка'));
        } else {
          Promise.resolve({ error }).then(response =>
            dispatch(notify('error', response, 'Ошибка')),
          );
        }
      });
  };
}

export function editRecipient(taskId, fields, resolve) {
  const dirtyFields = {};
  if (fields.recipient) {
    dirtyFields.recipient = {};
    dirtyFields.recipient.assignee = { id: fields.recipient };
  }
  if (fields.expectedEndDate) {
    const endDateFromUtc = moment.utc(fields.expectedEndDate).format();
    dirtyFields.estimatedAt = endDateFromUtc;
  }
  return dispatch => {
    apiClient
      .put(`${ROOT_URL}/api/dtskl/tasks/${taskId}`, dirtyFields)
      .then(({ data }) => {
        const editDetails = {
          expectedEndDate: data.estimatedAt,
          recipient: data.recipient.assignee,
        };

        dispatch({
          type: EDIT_TASK_RECIPIENT,
          payload: { ...editDetails },
        });
        dispatch(notify('success', 'Successufully updated.', 'Успешно'));
        if (resolve) {
          resolve();
        }
      })
      .catch(error => {
        console.log('ERROR in task assignee edit', error);
        if (error.response) {
          dispatch(notify('error', error.response.data, 'Ошибка'));
        } else {
          Promise.resolve({ error }).then(response =>
            dispatch(notify('error', response.data.message, 'Ошибка')),
          );
        }
        if (resolve) {
          resolve();
        }
      });
  };
}

const assigneesUrl = `${ROOT_URL}/api/users/assignee`;

export function fetchTaskById(taskId) {
  return async dispatch => {
    function onError(error) {
      dispatch(notify('error', error, 'Ошибка'));
      return error;
    }
    function onSuccess(success) {
      const { estimatedAt, bukrs, recipient } = success.data;
      apiClient
        .get(`${assigneesUrl}?branchId=${recipient.branch.id}&bukrs=${bukrs}`)
        .then(({ data }) => {
          const assigneesOpts = data.map(item => ({
            key: item.userId,
            value: item.userId,
            text: item.fio,
          }));

          const assigneeDetails = {
            expectedEndDate: estimatedAt,
            recipient: recipient.assignee,
            assigneeOptions: assigneesOpts,
          };

          dispatch({
            type: FETCH_ASSIGNEE_DETAILS,
            payload: { ...assigneeDetails },
          });
        })
        .catch(error => onError(error));
    }
    try {
      const success = await apiClient.get(`${ROOT_URL}/api/tasks/${taskId}`);
      return onSuccess(success);
    } catch (error) {
      return onError(error);
    }
  };
}

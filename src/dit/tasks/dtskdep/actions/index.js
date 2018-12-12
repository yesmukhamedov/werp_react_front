import axios from 'axios';
import _ from 'lodash';
import { ROOT_URL } from '../../../../utils/constants';
import { constructFullName, GET } from '../../../../utils/helpers';
import { notify } from '../../../../general/notification/notification_action';

/* action types */
export const DTSKDEP_ADD_TASK_ADMIN = 'DTSKDEP_ADD_TASK_ADMIN';
export const DTSKDEP_REMOVE_TASK_ADMIN = 'DTSKDEP_REMOVE_TASK_ADMIN';
export const DTSKDEP_FETCH_REFERENCES = 'DTSKDEP_FETCH_REFERENCES';
export const DTSKDEP_FETCH_TASKADMINS = 'DTSKDEP_FETCH_TASKADMINS';

const departmentsUrl = `${ROOT_URL}/api/reference/departments`;
const taskAdminUrl = `${ROOT_URL}/api/task-admins/all`;
const usersUrl = `${ROOT_URL}/api/users?active=true`;

const createTaskAdminUrl = `${ROOT_URL}/api/task-admins`;
const removeTaskAdminUrl = `${ROOT_URL}/api/task-admins`;

export function createTaskAdmin(params, userId, successCallback) {
  const req = axios.post(
    createTaskAdminUrl,
    {
      department: {
        id: params.department,
      },
      user: {
        id: userId,
      },
    },
    {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    },
  );
  return dispatch => {
    req
      .then(() => {
        dispatch(notify('success', 'Task admin was created.', 'Успешно'));
        if (successCallback) {
          successCallback();
        }
      })
      .catch(({ response = {} }) => {
        dispatch(
          notify('error', `Task admin was not created! ${response}`, 'Ошибка'),
        );
      });
  };
}

export function removeTaskAdmin(taskAdminId, successCallback) {
  const req = axios.delete(`${removeTaskAdminUrl}/${taskAdminId}`, {
    headers: {
      authorization: localStorage.getItem('token'),
    },
  });
  return dispatch => {
    req
      .then(() => {
        dispatch(notify('success', 'Task admin was deleted.', 'Успешно'));
        if (successCallback) {
          successCallback();
        }
      })
      .catch(({ response = {} }) => {
        dispatch(
          notify('error', `Task admin was not deleted! ${response}`, 'Ошибка'),
        );
      });
  };
}

export function fetchTaskAdmins(lang) {
  const req = GET(taskAdminUrl);
  return dispatch => {
    req
      .then(({ data: taskAdminList }) => {
        const taskAdminOpts = taskAdminList.map(({ id, department, user }) => ({
          key: id,
          departmentId: department.id,
          value: user.id,
          text: `${constructFullName(user)} - ${department[lang]}`,
        }));

        const directories = {
          taskAdminOptions: _.mapKeys(taskAdminOpts, 'key'),
          taskAdminList,
        };

        dispatch({
          type: DTSKDEP_FETCH_TASKADMINS,
          payload: directories,
        });
      })
      .catch(error => {
        if (error.response) {
          dispatch(notify('error', error.response.data.message, 'Ошибка'));
          console.log(error.response, 'Ошибка');
        }
      });
  };
}

export function fetchReferences(lang) {
  return dispatch => {
    axios
      .all([
        GET(departmentsUrl),
        // GET(usersUrl)
      ])
      .then(
        axios.spread(({ data: deptList }) =>
          // { data: userList }
          {
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

            // const userOpts = userList.users.map(item => ({
            //   key: item.id,
            //   value: item.id,
            //   text: constructFullName(item),
            // }));

            const directories = {
              deptOptions: _.mapKeys(deptOpts, 'key'),
              // userOptions: _.mapKeys(userOpts, 'key'),
            };

            dispatch({
              type: DTSKDEP_FETCH_REFERENCES,
              payload: directories,
            });
          },
        ),
      )
      .catch(error => {
        if (error.response) {
          dispatch(notify('error', error.response.data.message, 'Ошибка'));
          console.log(error.response, 'Ошибка');
        }
      });
  };
}

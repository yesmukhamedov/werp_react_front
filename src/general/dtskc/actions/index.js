import axios from 'axios';
import _ from 'lodash';
import { ROOT_URL } from '../../../utils/constants';
import { constructFullName } from '../../../utils/helpers';
import { notify } from '../../../general/notification/notification_action';
import {
  DTSKC_FETCH_REFERENCES,
  DTSKC_FETCH_ASSIGNEES,
} from './actionTypes';

const statusUrl = `${ROOT_URL}/api/tasks/status`;
const departmentsUrl = `${ROOT_URL}/api/reference/departments`;
const assigneesUrl = `${ROOT_URL}/api/users?active=true`;
const taskTypesUrl = `${ROOT_URL}/api/tasks/types`;
const managersUrl = `${ROOT_URL}/api/task-admins`;
const createTaskUrl = `${ROOT_URL}/api/tasks`;

function getReference(url) {
  return axios.get(url, {
    headers: { authorization: localStorage.getItem('token') },
  });
}
// api/users?active=true&branchId=104&departmentId=6&bukrs=2000
export function fetchUsers(args) {
  const {
    branchId,
    burks,
    // departmentId,
  } = args;
  // &departmentId=${departmentId}
  return (dispatch) => {
    axios
      .get(`${assigneesUrl}&branchId=${branchId}&bukrs=${burks}`, {
        headers: { authorization: localStorage.getItem('token') },
      })
      .then(({ data }) => {
        const assigneesOpts = data.users.map(item => ({
          key: item.id,
          value: item.id,
          text: constructFullName(item),
        }));

        dispatch({
          type: DTSKC_FETCH_ASSIGNEES,
          payload: { ...assigneesOpts },
        });
      })
      .catch((error) => {
        if (error.response) {
          dispatch(notify('error', error.response.data.message, 'Ошибка'));
        }
      });
  };
}

export function fetchReferences(lang) {
  return (dispatch) => {
    axios
      .all([
        getReference(departmentsUrl),
        getReference(statusUrl),
        getReference(taskTypesUrl),
        getReference(managersUrl),
      ])
      .then(axios.spread((
        { data: deptList },
        { data: statusList },
        { data: taskTypeList },
        { data: managersList },
      ) => {
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

        const statusOpts = statusList.map(item => ({
          key: item.id,
          value: item.id,
          text: item[lang],
        }));

        const taskTypeOpts = taskTypeList.map(item => ({
          key: item.departmentId,
          value: item.code,
          text: lang === 'ru' ? item.ru : lang === 'en' ? item.en : item.tr,
        }));

        const managerOpts = managersList.map(({ id, department, user }) => ({
          key: id,
          departmentId: department.id,
          value: user.id,
          text: `${constructFullName(user)} - ${department[lang]}`,
        }));

        const directories = {
          deptOptions: _.mapKeys(deptOpts, 'key'),
          statusOptions: _.mapKeys(statusOpts, 'key'),
          taskTypeOptions: _.mapKeys(taskTypeOpts, 'key'),
          managerOptions: _.mapKeys(managerOpts, 'key'),
        };

        dispatch({
          type: DTSKC_FETCH_REFERENCES,
          payload: directories,
        });
      }))
      .catch((error) => {
        if (error.response) {
          dispatch(notify('error', error.response.data.message, 'Ошибка'));
          console.log(error.response, 'Ошибка');

          // } else {
          //   Promise.resolve({ error })
          //     .then(response => dispatch(notify('error', error.response.data.message, 'Ошибка')));
        }
      });
  };
}

export function createTask(formValues, successCallback) {
  const newTask = {
    title: formValues.title,
    description: formValues.description,
    status: {
      id: formValues.status,
    },
    priority: {
      // TODO: get rid of hardcoded value
      id: 2,
    },
    bukrs: formValues.company,
    recipient: {
      branch: {
        id: formValues.branch,
      },
      department: {
        id: formValues.department,
      },
      // TODO: what does *position* mean
      position: {
        id: 38,
      },
      assignee: {
        id: formValues.assignee,
      },
      assigneesManager: {
        id: formValues.assigneeManager,
      },
    },
    type: {
      code: formValues.taskType,
    },
    authorsManager: {
      id: formValues.initiatorManager,
    },
  };

  const request = axios.post(
    createTaskUrl,
    newTask,
    {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    },
  );
  return (dispatch) => {
    request
      .then(({ data }) => {
        if (successCallback) successCallback(data);
        dispatch(notify('success', 'Задача успешно создана.', 'Успешно'));
      })
      .catch((error) => {
        if (error.response) {
          dispatch(notify('error', error.response.data.message, 'Ошибка'));
        }
      });
  };
}

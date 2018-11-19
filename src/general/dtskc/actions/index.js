import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import { ROOT_URL } from '../../../utils/constants';
import { constructFullName, GET } from '../../../utils/helpers';
import { notify } from '../../../general/notification/notification_action';
import {
  DTSKC_FETCH_REFERENCES,
  DTSKC_FETCH_ASSIGNEES,
  DTSKC_ASSIGNEE_MODAL_TOGGLE,
  DTSKC_ADD_ASSIGNEE_GROUP,
  DTSKC_ADD_ASSIGNEE_PERSON,
  DTSKC_REMOVE_ASSIGNEE_GROUP,
  DTSKC_REMOVE_ASSIGNEE_PERSON,
  CLEAR_TRANSACTION,
} from './actionTypes';

const statusUrl = `${ROOT_URL}/api/tasks/status`;
const departmentsUrl = `${ROOT_URL}/api/reference/departments`;
const assigneesUrl = `${ROOT_URL}/api/users?active=true`;
const taskTypesUrl = `${ROOT_URL}/api/tasks/types`;
const managersUrl = `${ROOT_URL}/api/task-admins`;
const groupsUrl = `${ROOT_URL}/api/messgr`;
const createTaskUrl = `${ROOT_URL}/api/tasks`;

export function fetchUsers(args) {
  const {
    branchId,
    burks,
  } = args;
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
        GET(departmentsUrl),
        GET(statusUrl),
        GET(taskTypesUrl),
        GET(managersUrl),
        GET(groupsUrl),
      ])
      .then(axios.spread((
        { data: deptList },
        { data: statusList },
        { data: taskTypeList },
        { data: managersList },
        { data: groupList },
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


        const groupOpts = groupList.map(({ groupId, groupName }) => ({
          key: groupId,
          value: groupId,
          text: groupName,
        }));

        const directories = {
          deptOptions: _.mapKeys(deptOpts, 'key'),
          statusOptions: _.mapKeys(statusOpts, 'key'),
          taskTypeOptions: _.mapKeys(taskTypeOpts, 'key'),
          managerOptions: _.mapKeys(managerOpts, 'key'),
          groupOptions: _.mapKeys(groupOpts, 'key'),
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
    recipient: [...formValues.allRecipients],
    type: {
      code: formValues.taskType,
    },
    authorsManager: {
      id: formValues.initiatorManager,
    },
    estimatedAt: moment.utc(formValues.estimatedAt, 'DD.MM.YYYY').format(),
    attachment: {
      attachmentJson: JSON.stringify(formValues.uploadList),
    },
  };

  console.log("ALL_RECIPIENTS", formValues.allRecipients);

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

export function toggleAssigneeModal() {
  return {
    type: DTSKC_ASSIGNEE_MODAL_TOGGLE,
  };
}

export const addAssigneeGroup = group => ({
  type: DTSKC_ADD_ASSIGNEE_GROUP,
  payload: group,
});

export const addAssigneePerson = person => ({
  type: DTSKC_ADD_ASSIGNEE_PERSON,
  payload: person,
});

export const removeAssigneeGroup = id => ({
  type: DTSKC_REMOVE_ASSIGNEE_GROUP,
  payload: id,
});

export const removeAssigneePerson = id => ({
  type: DTSKC_REMOVE_ASSIGNEE_PERSON,
  payload: id,
});

export const clearTransaction = () => ({
  type: CLEAR_TRANSACTION,
});


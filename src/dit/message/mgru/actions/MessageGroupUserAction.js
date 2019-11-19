import { doGet, doPost, doDelete } from '../../../../utils/apiActions';
import _ from 'lodash';
import { constructFullName } from '../../../../utils/helpers';
import { notify } from '../../../../general/notification/notification_action';

/* action URLs */
const messageGroupUserUrl = `mgru`;
const departmentsUrl = `reference/departments`;
const taskAdminUrl = `task-admins/all`;
// const usersUrl = `users?active=true`;
const messageGroupUrl = `messgr`;

/* action types */
export const MGRU_FETCH_MESSAGE_GROUP_USERS = 'mgru_fetch_message_group_users';
export const MGRU_FETCH_REFERENCES = 'MGRU_FETCH_REFERENCES';

export function fetchMessageGroupUsers(params, resolve) {
  const req = params
    ? doGet(`${messageGroupUserUrl}?${params}`)
    : doGet(messageGroupUserUrl);
  return dispatch => {
    req
      .then(({ data }) => {
        dispatch({
          type: MGRU_FETCH_MESSAGE_GROUP_USERS,
          payload: data,
        });
        resolve && resolve();
      })
      .catch(error => {
        console.log('ERROR in fetch message group users', error);
        if (error.response) {
          dispatch(notify('error', error.response.data.message, 'Ошибка'));
        } else {
          Promise.resolve({ error }).then(response =>
            dispatch(notify('error', response, 'Ошибка')),
          );
        }
        resolve && resolve();
      });
  };
}

export function removeMessageGroupUser(id, successCallback) {
  const req = doDelete(`${messageGroupUserUrl}/${id}`);
  return dispatch => {
    req
      .then(() => {
        dispatch(
          notify('success', 'Message group user was deleted.', 'Успешно'),
        );
        if (successCallback) {
          successCallback();
        }
      })
      .catch(({ response = {} }) => {
        dispatch(
          notify(
            'error',
            `Message group user was not deleted! ${response}`,
            'Ошибка',
          ),
        );
      });
  };
}

export function createMessageGroupUser(formValues, userId, successCallback) {
  const newMessageGroupUser = {
    branch: {
      id: formValues.branch,
    },
    department: {
      id: formValues.department,
    },
    supervisor: {
      id: formValues.supervisor,
    },
    messageGroup: {
      groupId: formValues.messageGroup,
    },
    user: {
      id: userId,
    },
  };
  const req = doPost(messageGroupUserUrl, newMessageGroupUser);
  return dispatch => {
    req
      .then(() => {
        dispatch(
          notify('success', 'Message group user was created.', 'Успешно'),
        );
        if (successCallback) {
          successCallback();
        }
      })
      .catch(({ response = {} }) => {
        dispatch(
          notify(
            'error',
            `Message group user was not created! ${response}`,
            'Ошибка',
          ),
        );
      });
  };
}

export function updateMessageGroupUser(id, formValues, successCallback) {
  const updatedMessageGroupUser = {
    branch: {
      id: formValues.branch,
    },
    department: {
      id: formValues.department,
    },
    supervisor: {
      id: formValues.supervisor,
    },
    messageGroup: {
      groupId: formValues.messageGroup,
    },
    user: {
      id: formValues.user,
    },
  };
  const req = doPut(`${messageGroupUserUrl}/${id}`, updatedMessageGroupUser);
  return dispatch => {
    req
      .then(() => {
        dispatch(
          notify('success', 'Message group user was updated.', 'Успешно'),
        );
        if (successCallback) {
          successCallback();
        }
      })
      .catch(({ response = {} }) => {
        dispatch(
          notify(
            'error',
            `Message group user was not updated! ${response}`,
            'Ошибка',
          ),
        );
      });
  };
}

export function fetchReferences(lang) {
  return dispatch => {
    axios
      .all([doGet(departmentsUrl), doGet(messageGroupUrl), doGet(taskAdminUrl)])
      // GET(usersUrl),
      .then(
        axios.spread(
          (
            { data: deptList },
            { data: messageGroupList },
            { data: taskAdminList },
          ) =>
            // { data: userList },
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

              const messgrOpts = messageGroupList.map(item => ({
                key: item.groupId,
                value: item.groupId,
                text: item.groupName,
              }));

              const taskAdminOpts = taskAdminList.map(
                ({ id, department, user }) => ({
                  key: id,
                  departmentId: department.id,
                  value: user.id,
                  text: `${constructFullName(user)} - ${department[lang]}`,
                }),
              );

              const directories = {
                deptOptions: _.mapKeys(deptOpts, 'key'),
                // userOptions: _.mapKeys(userOpts, 'key'),
                messgrOptions: _.mapKeys(messgrOpts, 'key'),
                taskAdminOptions: _.mapKeys(taskAdminOpts, 'key'),
              };

              dispatch({
                type: MGRU_FETCH_REFERENCES,
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

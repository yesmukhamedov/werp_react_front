import axios from 'axios';
import _ from 'lodash';
import { ROOT_URL } from '../../../../utils/constants';
import { GET, DELETE } from '../../../../utils/helpers';
import { notify } from '../../../../general/notification/notification_action';

/* action URLs */
const messageGroupUserUrl = `${ROOT_URL}/api/mgru`;

/* action types */
export const MGRU_FETCH_MESSAGE_GROUP_USERS = 'mgru_fetch_message_group_users';

export function fetchMessageGroupUsers() {
  const req = GET(messageGroupUserUrl);
  return (dispatch) => {
    req
      .then(({ data }) => {
        dispatch({
          type: MGRU_FETCH_MESSAGE_GROUP_USERS,
          payload: data,
        });
      })
      .catch((error) => {
        console.log('ERROR in fetch message groups', error);
        if (error.response) {
          dispatch(notify('error', error.response.data.message, 'Ошибка'));
        } else {
          Promise.resolve({ error }).then(response => dispatch(notify('error', response, 'Ошибка')));
        }
      });
  };
}

export function removeMessageGroupUser(groupId, successCallback) {
  const req = DELETE(`${messageGroupUserUrl}/${groupId}`);
  return (dispatch) => {
    req
      .then(() => {
        dispatch(notify('success', 'Message group was deleted.', 'Успешно'));
        if (successCallback) {
          successCallback();
        }
      })
      .catch(({ response = {} }) => {
        dispatch(notify('error', `Message group was not deleted! ${response}`, 'Ошибка'));
      });
  };
}

export function createMessageGroupUser(groupName, successCallback) {
  const req = axios.post(
    messageGroupUserUrl, groupName,
    {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    },
  );
  return (dispatch) => {
    req
      .then(() => {
        dispatch(notify('success', 'Message group was created.', 'Успешно'));
        if (successCallback) {
          successCallback();
        }
      })
      .catch(({ response = {} }) => {
        dispatch(notify('error', `Message group was not created! ${response}`, 'Ошибка'));
      });
  };
}

export function updateMessageGroupUser(groupId, groupName, successCallback) {
  const req = axios.put(
    `${messageGroupUserUrl}/${groupId}`, groupName,
    {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    },
  );
  return (dispatch) => {
    req
      .then(() => {
        dispatch(notify('success', 'Message group was updated.', 'Успешно'));
        if (successCallback) {
          successCallback();
        }
      })
      .catch(({ response = {} }) => {
        dispatch(notify('error', `Message group was not updated! ${response}`, 'Ошибка'));
      });
  };
}
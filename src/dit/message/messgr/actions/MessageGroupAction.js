import { doGet, doPost, doPut, doDelete } from '../../../../utils/apiActions';
//import _ from 'lodash';
import { notify } from '../../../../general/notification/notification_action';

/* action URLs */
const messageGroupUrl = `messgr`;

/* action types */
export const MESSGR_FETCH_MESSAGE_GROUPS = 'messgr_fetch_message_groups';

export function fetchMessageGroups() {
  // const req = GET(messageGroupUrl);
  return dispatch => {
    // req

    doGet(messageGroupUrl)
      .then(({ data }) => {
        dispatch({
          type: MESSGR_FETCH_MESSAGE_GROUPS,
          payload: data,
        });
      })
      .catch(error => {
        console.log('ERROR in fetch message groups', error);
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

export function removeMessageGroup(groupId, successCallback) {
  // const req = DELETE(`${messageGroupUrl}/${groupId}`);
  return dispatch => {
    // req

    doDelete(`${messageGroupUrl}/${groupId}`)
      .then(() => {
        dispatch(notify('success', 'Message group was deleted.', 'Успешно'));
        if (successCallback) {
          successCallback();
        }
      })
      .catch(({ response = {} }) => {
        dispatch(
          notify(
            'error',
            `Message group was not deleted! ${response}`,
            'Ошибка',
          ),
        );
      });
  };
}

export function createMessageGroup(groupName, successCallback) {
  // const req = post(messageGroupUrl, groupName, {
  //   headers: {
  //     authorization: localStorage.getItem('token'),
  //   },
  // });
  return dispatch => {
    // req

    doPost(messageGroupUrl, groupName)
      .then(() => {
        dispatch(notify('success', 'Message group was created.', 'Успешно'));
        if (successCallback) {
          successCallback();
        }
      })
      .catch(({ response = {} }) => {
        dispatch(
          notify(
            'error',
            `Message group was not created! ${response}`,
            'Ошибка',
          ),
        );
      });
  };
}

export function updateMessageGroup(groupId, groupName, successCallback) {
  // const req = put(`${messageGroupUrl}/${groupId}`, groupName, {
  //   headers: {
  //     authorization: localStorage.getItem('token'),
  //   },
  // });
  return dispatch => {
    // req

    doPut(`${messageGroupUrl}/${groupId}`, groupName)
      .then(() => {
        dispatch(notify('success', 'Message group was updated.', 'Успешно'));
        if (successCallback) {
          successCallback();
        }
      })
      .catch(({ response = {} }) => {
        dispatch(
          notify(
            'error',
            `Message group was not updated! ${response}`,
            'Ошибка',
          ),
        );
      });
  };
}

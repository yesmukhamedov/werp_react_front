import { INBOX_UNREAD } from './types';
import axios from 'axios';
import { ROOT_URL } from '../utils/constants';

export function fetchUnreadMessages({ userId }) {
  return (dispatch) => {
    const url = `${ROOT_URL}/inbox/${userId}`;
    axios
      .get(url)
      .then((response) => {
        // console.log(`fetchUnreadMessages(${userId}): ${JSON.stringify(response)}`);
        // If request is good...
        // - TODO check whether response is successful

        dispatch(unreadMessages(response.data));
      })
      .catch(err =>
        console.log(
          'Error fetching unread messages for user with id',
          userId,
          err,
        ),);
  };
}

function unreadMessages(messages) {
  // console.log('_unreadMessages:', JSON.stringify(messages));
  return {
    type: INBOX_UNREAD,
    payload: messages,
  };
}

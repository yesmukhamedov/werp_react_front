import axios from 'axios';
import jwt from 'jwt-simple';
import moment from 'moment';
import browserHistory from '../utils/history';
import { ROOT_URL, TOKEN_REFRESH_LIMIT } from '../utils/constants';
import { resetLocalStorage } from '../utils/helpers';
import { UNAUTH_USER, AUTH_ERROR, CHANGE_LANGUAGE } from '../actions/types';
import { notify } from '../general/notification/notification_action';

function isAlmostExpired(dispatch) {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const tokenPayload = jwt.decode(token, 'secret');
      const exp = moment.utc(tokenPayload.exp * 1000);
      const now = moment.utc();
      const refreshTime = moment
        .utc(tokenPayload.exp * 1000)
        .subtract(TOKEN_REFRESH_LIMIT, 'm');

      if (exp.isAfter(now)) {
        if (now.isAfter(refreshTime)) {
          return true;
        }
      }
      return false;
    } catch (error) {
      console.log(error);
      if (error.response) {
        dispatch(notify('error', error.response.data.message, 'Ошибка'));
      } else {
        Promise.resolve({ error }).then(response =>
          dispatch(notify('error', response, 'Ошибка')),
        );
      }
      signoutUser(dispatch, error.message);
    }
  } else return false;
}

export default function({ dispatch }) {
  return next => action => {
    if (isAlmostExpired(dispatch)) {
      tokenRefresh(dispatch, action);
    }
    return next(action);
  };
}

function tokenRefresh(dispatch, action) {
  axios
    .get(`${ROOT_URL}/tokenRefresh`, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    })
    .then(response => {
      // If request is good...
      // - save the refreshed JWT token
      localStorage.setItem('token', response.data.token);
      dispatch(action);
    })
    .catch(error => {
      // If request is bad...
      // - Show an error to the user
      const msg = "Can't refresh token. Please sign in again";
      if (error.response) {
        console.log(msg + error.response.data.message);
      } else {
        Promise.resolve({ error }).then(response =>
          console.log(msg + response.error.message),
        );
      }
    });
}

function signoutUser(dispatch, errorMsg) {
  resetLocalStorage();
  dispatch({ type: UNAUTH_USER });
  dispatch({
    type: CHANGE_LANGUAGE,
    payload: 'ru',
  });
  dispatch({
    type: AUTH_ERROR,
    payload: errorMsg,
  });
  browserHistory.push('/');
}

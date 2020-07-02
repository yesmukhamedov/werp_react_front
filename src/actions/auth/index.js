import axios from 'axios';
import { ROOT_URL } from '../../utils/constants';
import { doGet, doPost } from '../../utils/apiActions';
import browserHistory from '../../utils/history';
import { resetLocalStorage } from '../../utils/helpers';
import {
  AUTH_USER,
  AUTH_ERROR,
  FETCH_USERS,
  USERS_ERROR,
  UNAUTH_USER,
} from '../types';

export function usersError(error) {
  return {
    type: USERS_ERROR,
    payload: error,
  };
}

export function authUser(payload) {
  return dispatch => {
    dispatch({
      type: AUTH_USER,
      payload,
    });
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}

export function signinUser({ username, password }, language) {
  return dispatch => {
    // Submit username/password to the server
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic V0VSUDpwYXNzd29yZA==',
    };

    var bodyFormData = new FormData();
    bodyFormData.set('grant_type', 'password');
    bodyFormData.set('username', username);
    bodyFormData.set('password', password);

    console.log('Authorization', headers.Authorization);

    axios
      .post(`${ROOT_URL}/api/v1/werp/auth-server/oauth/token`, bodyFormData, {
        headers: headers,
      })

      // doPost(`signin`, {
      //   username,
      //   password,
      //   language,
      // })
      .then(response => {
        // If request is good...
        // - save the JWT token

        const { access_token, refresh_token, user_id } = response.data;

        // console.log(response.data.access_token);

        localStorage.setItem('username', username);
        localStorage.setItem('userId', user_id);
        //localStorage.setItem('userId', user_id);
        localStorage.setItem('language', language);
        localStorage.setItem('token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('token_time', new Date().getTime());

        axios
          .get(`${ROOT_URL}/api/error_table`, {
            headers: {
              Authorization: access_token,
            },
          })

          .then(res => {
            let err = res.data.data;

            localStorage.setItem('errorTableString', JSON.stringify(err));
          });

        if (
          response.data.internalNumber &&
          response.data.internalNumber.length > 0
        ) {
          localStorage.setItem('internalNumber', response.data.internalNumber);
        } else {
          localStorage.removeItem('internalNumber');
        }

        // setAuthorizationHeader(token);
        // setContentLanguageHeader(language);
        // - update state to indicate user is authenticated
        dispatch(authUser({ username, user_id }));
        // - redirect to the route '/'
        const path = localStorage.getItem('currentPathName');
        if (path) {
          browserHistory.push(path);
        } else {
          browserHistory.push('/');
        }
      })
      .catch(error => {
        // If request is bad...
        // - Show an error to the user

        if (error.response) {
          dispatch(authError(error.response.data.message));
        } else if (error.stack) {
          Promise.resolve({ error }).then(response =>
            dispatch(authError(response.error.message)),
          );
        }
      });
  };
}

export function signoutUser() {
  // setAuthorizationHeader();
  return dispatch => {
    // .post(`${ROOT_URL}/signout`)
    doPost(`signout`)
      .then(response => {
        resetLocalStorage();
        dispatch({
          type: UNAUTH_USER,
        });
        browserHistory.push('/');
      })
      .catch(error => {
        console.log(error.response);
      });
  };
}

export function clearUserAuth() {
  // setAuthorizationHeader();
  return dispatch => {
    // .post(`${ROOT_URL}/signout`)
    //resetLocalStorage();
    dispatch({
      type: UNAUTH_USER,
    });
    browserHistory.push('/');
  };
}

export function fetchUsers() {
  return dispatch => {
    // .get(`${ROOT_URL}/users`)

    doGet('users')
      .then(response => {
        dispatch({
          type: FETCH_USERS,
          payload: response,
        });
      })
      .catch(error => {
        const msg = "Can't fetch all users. ";
        if (error.response) {
          dispatch(usersError(msg + error.response.data.message));
        } else {
          Promise.resolve({ error }).then(response =>
            dispatch(usersError(msg + response.error.message)),
          );
        }
      });
  };
}

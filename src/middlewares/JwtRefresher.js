//import jwt from 'jwt-simple';
import moment from 'moment';
import browserHistory from '../utils/history';
import {
  TOKEN_REFRESH_LIMIT,
  //TOKEN_PASSWORD
} from '../utils/constants';
import { resetLocalStorage } from '../utils/helpers';
import { UNAUTH_USER, AUTH_ERROR, CHANGE_LANGUAGE } from '../actions/types';
//import { doGet, doPost } from '../utils/apiActions';
import axios from 'axios';
import { ROOT_URL, AUTH_URL } from '../utils/constants';

const signoutUser = (dispatch, errorMsg) => {
  resetLocalStorage();
  dispatch({ type: UNAUTH_USER });
  dispatch({ type: AUTH_ERROR, payload: errorMsg });
  browserHistory.push('/');
};

const requestToken = (dispatch, token, language) => {
  // doPost(`v1/werp/auth-server/oauth/token`, bodyFormData, {
  //   headers: headers,
  // })

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic V0VSUDpwYXNzd29yZA==',
  };

  var bodyFormData = new FormData();
  bodyFormData.set('grant_type', 'refresh_token');
  bodyFormData.set('refresh_token', localStorage.getItem('refresh_token'));

  axios
    .post(`${AUTH_URL}/oauth/token`, bodyFormData, {
      headers: headers,
    })
    .then(({ data }) => {
      // If request is good...
      // - save the refreshed JWT token
      const { access_token, refresh_token, user_id } = data;

      localStorage.setItem('userId', user_id);
      localStorage.setItem('token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      localStorage.setItem('token_time', new Date().getTime());
      // setAuthorizationHeader(data.token);
    })
    .catch(error => {
      console.log('err14', error);

      signoutUser(dispatch, '');
    });
};

const tokenRefresherMiddleware = ({ dispatch }) => next => action => {
  let isRenewingToken = false;
  const token = localStorage.getItem('token');
  const language = localStorage.getItem('language');
  const formAction =
    (action.meta && action.meta.form) || typeof action === 'function';

  if (action.type === CHANGE_LANGUAGE) {
    try {
      //jwt.decode(token, TOKEN_PASSWORD);
      token && requestToken(dispatch, token, language);
      return next(action);
    } catch (error) {
      console.log('error12', error);
      return next(action);
    }
  }

  if (formAction || !token) {
    return next(action);
  }

  if (!isRenewingToken) {
    try {
      const token_time = localStorage.getItem('token_time');
      const language = localStorage.getItem('language');
      const exp = moment.utc(parseInt(token_time));
      const now = moment.utc();

      const remainedUntilRefresh = exp.diff(now, 's');
      if (remainedUntilRefresh > TOKEN_REFRESH_LIMIT) {
        isRenewingToken = true;
        requestToken(dispatch, token, language);
        isRenewingToken = false;
      }
    } catch (error) {
      console.log('error13', error);
      isRenewingToken = false;
      signoutUser(dispatch, error.message);
    }
  }

  next(action);
};

export default tokenRefresherMiddleware;

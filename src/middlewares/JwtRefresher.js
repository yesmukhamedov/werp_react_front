//import jwt from 'jwt-simple';
import moment from 'moment';
import browserHistory from '../utils/history';
import {
  TOKEN_REFRESH_LIMIT,
  //TOKEN_PASSWORD
} from '../utils/constants';
import { resetLocalStorage } from '../utils/helpers';
import {
  UNAUTH_USER,
  CHANGE_LANGUAGE,
  AUTH_USER,
  TREE_MENU,
  INBOX_UNREAD,
} from '../actions/types';

import { FETCH_USER_INFO } from '../general/userInfo/userInfo_action';

//import { doGet, doPost } from '../utils/apiActions';
import axios from 'axios';
import { ROOT_URL, AUTH_URL } from '../utils/constants';

const signoutUser = (dispatch, errorMsg) => {
  resetLocalStorage();
  dispatch({ type: UNAUTH_USER });
  // dispatch({ type: AUTH_ERROR, payload: errorMsg });
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
    });
};

// 'change_language','auth_user', 'tree_menu', 'inbox_unread','FETCH_USER_INFO', 'unauth_user'

const tokenRefresherMiddleware = ({ dispatch }) => next => action => {
  const actionTypes = [];
  actionTypes.push(CHANGE_LANGUAGE);
  actionTypes.push(AUTH_USER);
  actionTypes.push(TREE_MENU);
  actionTypes.push(INBOX_UNREAD);
  actionTypes.push(UNAUTH_USER);
  actionTypes.push(FETCH_USER_INFO);

  // console.log(typeof action, action.type)

  if (typeof action === 'object' && !actionTypes.includes(action.type)) {
    const token_time = localStorage.getItem('token_time');
    const refresh_token = localStorage.getItem('refresh_token');
    const exp = token_time ? moment.utc(parseInt(token_time)) : moment.utc();
    const now = moment.utc();
    const diff = exp.diff(now, 's') * -1;

    //34200 is 9.5 hours
    //at the server, token expires after 10 hours
    //so, after 9.5 hours and if refresh token exists, refresh token
    if (diff > 34200 && refresh_token) {
      requestToken(dispatch);
    }

    return next(action);
  } else {
    return next(action);
  }

  // const formAction =
  //   (action.meta && action.meta.form) || typeof action === 'function';

  // console.log(action.type,'action.type')
  // console.log(typeof action,'action.typeof')

  // // let isRenewingToken = false;
  // const token = localStorage.getItem('token');
  // // const language = localStorage.getItem('language');
  // const formAction =
  //   (action.meta && action.meta.form) || typeof action === 'function';

  // console.log(action,'action')
  // return next(action);
  // if (action && action.type && !action.type.includes["REQUEST"]) {
  //   return next(action);
  // }

  // if (action.type === CHANGE_LANGUAGE) {
  //   try {
  //     //jwt.decode(token, TOKEN_PASSWORD);
  //     token && requestToken(dispatch, token, language);
  //     return next(action);
  //   } catch (error) {
  //     console.log('error12', error);
  //     return next(action);
  //   }
  // }
  // console.log(action.type,'next')
  // console.log(1)

  //   console.log(action)
  //   if (formAction ) {
  //   console.log(2)
  //   return next(action);
  // }

  // // console.log(3)
  // const token_time = localStorage.getItem('token_time');
  // const exp = moment.utc(parseInt(token_time));
  // const now = moment.utc();
  // console.log(exp.diff(now, 's'),'exp.diff(no')
  // if (exp.diff(now, 's') < -10) {
  //   console.log(4)
  //   signoutUser(dispatch, 'Time out');
  // }

  // if (formAction && token) {
  //   console.log(2)
  //   return next(action);
  // }
  // console.log(5)

  // console.log(exp.format('YYYY-MM-DD hh:mm:ss'),'exp')
  // console.log(now.format('YYYY-MM-DD hh:mm:ss'),'now')
  // console.log(exp.diff(now, 's'),'exp.diff')

  // if (exp.diff(now, 's') < -28800) {
  //   signoutUser(dispatch, 'Time out');
  // }

  // if (!isRenewingToken) {
  //   try {
  //     const token_time = localStorage.getItem('token_time');
  //     const language = localStorage.getItem('language');
  //     const exp = moment.utc(parseInt(token_time));
  //     const now = moment.utc();

  //     const remainedUntilRefresh = exp.diff(now, 's');
  //     if (remainedUntilRefresh > TOKEN_REFRESH_LIMIT) {
  //       isRenewingToken = true;
  //       requestToken(dispatch, token, language);
  //       isRenewingToken = false;
  //     }
  //   } catch (error) {
  //     console.log('error13', error);
  //     isRenewingToken = false;
  //     signoutUser(dispatch, error.message);
  //   }
  // }

  // return next(action);
};

export default tokenRefresherMiddleware;

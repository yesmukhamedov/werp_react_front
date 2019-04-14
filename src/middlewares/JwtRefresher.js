import axios from 'axios';
import jwt from 'jwt-simple';
import moment from 'moment';
import browserHistory from '../utils/history';
import { ROOT_URL, TOKEN_REFRESH_LIMIT } from '../utils/constants';
import { resetLocalStorage } from '../utils/helpers';
import { setAuthorizationHeader } from '../utils/setHeaders';
import { UNAUTH_USER, AUTH_ERROR } from '../actions/types';

const signoutUser = (dispatch, errorMsg) => {
  resetLocalStorage();
  dispatch({ type: UNAUTH_USER });
  dispatch({ type: AUTH_ERROR, payload: errorMsg });
  browserHistory.push('/');
};

const tokenRefresherMiddleware = ({ dispatch }) => next => action => {
  let isRenewingToken = false;
  const token = localStorage.getItem('token');
  const formAction =
    (action.meta && action.meta.form) || typeof action === 'function';

  if (formAction || !token) {
    return next(action);
  }

  if (!isRenewingToken) {
    try {
      const tokenPayload = jwt.decode(token, 'secret');

      const exp = moment.utc(tokenPayload.exp * 1000);
      const now = moment.utc();

      const remainedUntilRefresh = exp.diff(now, 's');

      if (remainedUntilRefresh < TOKEN_REFRESH_LIMIT) {
        isRenewingToken = true;

        axios
          .get(`${ROOT_URL}/tokenRefresh`, {
            headers: { authorization: token },
          })
          .then(({ data }) => {
            // If request is good...
            // - save the refreshed JWT token
            localStorage.setItem('token', data.token);
            // setAuthorizationHeader(data.token);
            isRenewingToken = false;
          })
          .catch(error => {
            // If request is bad...
            // - Show an error to the user
            isRenewingToken = false;
            throw new Error(
              `Can't refresh token. Please sign in again ${JSON.stringify(
                error,
              )}`,
            );
          });
      }
    } catch (error) {
      isRenewingToken = false;
      signoutUser(dispatch, error.message);
    }
  }

  next(action);
};

export default tokenRefresherMiddleware;

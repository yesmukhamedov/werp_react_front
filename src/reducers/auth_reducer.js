import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,
} from '../actions/types';

export default function(state = {}, action) {
  // eslint-disable-next-line
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        error: '',
        username: action.payload.username,
        userId: action.payload.userId,
        authenticated: true,
      };
    case UNAUTH_USER:
      return {
        ...state,
        authenticated: false,
        locale: state.locale,
      };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case FETCH_MESSAGE:
      return { ...state, message: action.payload };
  }

  return state;
}

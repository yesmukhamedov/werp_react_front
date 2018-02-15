import axios from "axios";
import jwt from "jwt-simple";
import browserHistory from "../utils/history";
import { ROOT_URL, TOKEN_REFRESH_LIMIT } from "../utils/constants";
import { resetLocalStorage } from "../utils/helpers";
import { UNAUTH_USER, AUTH_ERROR, CHANGE_LANGUAGE } from "../actions/types";

export default function({ dispatch }) {
  return next => action => {
    if (isAlmostExpired(dispatch)) {
      tokenRefresh(dispatch, action);
    }
    return next(action);
  };
}

function isAlmostExpired(dispatch) {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const tokenPayload = jwt.decode(token, "secret");
      let exp = new Date(tokenPayload.exp * 1000);
      let now = new Date();
      if (exp > now) {
        let delta = exp - now;
        if (delta < TOKEN_REFRESH_LIMIT) {
          return true;
        }
      }
      return false;
    } catch (err) {
      signoutUser(dispatch, err.message);
    }
  } else return false;
}

function tokenRefresh(dispatch, action) {
  axios
    .get(`${ROOT_URL}/tokenRefresh`, {
      headers: {
        authorization: localStorage.getItem("token")
      }
    })
    .then(response => {
      // If request is good...
      // - save the refreshed JWT token
      localStorage.setItem("token", response.data.token);
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
          console.log(msg + response.error.message)
        );
      }
    });
}

function signoutUser(dispatch, errorMsg) {
  resetLocalStorage();
  dispatch({ type: UNAUTH_USER });
  dispatch({
    type: CHANGE_LANGUAGE,
    payload: "ru"
  });
  dispatch({
    type: AUTH_ERROR,
    payload: errorMsg
  });
  browserHistory.push("/");
}

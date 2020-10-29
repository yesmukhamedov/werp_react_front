import { doGet, doPost } from '../../../utils/apiActions';
import {
  handleError,
  notify,
} from '../../../general/notification/notification_action';
import { modifyLoader } from '../../../general/loader/loader_action';
import { errorTableText } from '../../../utils/helpers';

export const FETCH_SMCCALD_GET_PRODUCT_LIST = 'FETCH_SMCCALD_GET_PRODUCT_LIST';
export const FETCH_CURRENT_STAFF = 'FETCH_CURRENT_STAFF';
export const POST_SMCCALD_CREATE_APP = 'POST_SMCCALD_CREATE_APP';

// const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
// const language = localStorage.getItem('language');

export function fetchSmccaldGetProductList(param) {
  return function(dispatch) {
    doGet(`service/smccald/getProductList`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SMCCALD_GET_PRODUCT_LIST,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function fetchCurrentStaff() {
  return function(dispatch) {
    doGet(`service/smccald/`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_CURRENT_STAFF,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function postSmccaldCreateApp(application) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost(`service/smccald/create`, application)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: POST_SMCCALD_CREATE_APP,
          payload: data,
        });
        dispatch(notify('success', errorTableText(101), errorTableText(104)));
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

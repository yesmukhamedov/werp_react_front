import { doGet, doPost, doPut, doDelete } from '../../../utils/apiActions';
import {
  handleError,
  notify,
} from '../../../general/notification/notification_action';
import { modifyLoader } from '../../../general/loader/loader_action';

export const FETCH_SMCCALD_GET_PRODUCT_LIST = 'FETCH_SMCCALD_GET_PRODUCT_LIST';
export const FETCH_CURRENT_STAFF = 'FETCH_CURRENT_STAFF';

const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
const language = localStorage.getItem('language');

export function fetchSmccaldGetProductList(param) {
  return function(dispatch) {
    doGet(`smccald/getProductList`, param)
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
    doGet(`smccald/`)
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

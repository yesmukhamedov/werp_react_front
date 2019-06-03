import { doGet, doPost } from '../utils/apiActions';
import {
  handleError,
  notify,
} from '../general/notification/notification_action';
import { modifyLoader } from '../general/loader/loader_action';

export const FETCH_DYNOBJ_HR = 'FETCH_DYNOBJ_HR';
export const CHANGE_DYNOBJ_HR = 'CHANGE_DYNOBJ_HR';
export const CLEAR_DYNOBJ_HR = 'CLEAR_DYNOBJ_HR';

export const POST_NEW_CUSTOMER = 'POST_NEW_CUSTOMER';
export const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER';

export function changeDynObjHr(a_obj) {
  const obj = {
    type: CHANGE_DYNOBJ_HR,
    data: a_obj,
  };
  return obj;
}

export function clearDynObjHr() {
  const obj = {
    type: CLEAR_DYNOBJ_HR,
  };
  return obj;
}

export function fetchDynObjHr(url, params) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(url, { ...params })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_DYNOBJ_HR,
          data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
        dispatch(modifyLoader(false));
      });
  };
}

export function saveHrc01(url, body, params, setIsLoading, clearCustomer) {
  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const language = localStorage.getItem('language');
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost(url, body, { ...params })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        setIsLoading(false);
        clearCustomer();
        dispatch({
          type: POST_NEW_CUSTOMER,
          data,
        });
        dispatch(
          notify(
            'success',
            errorTable[`104${language}`],
            errorTable[`101${language}`],
          ),
        );
      })
      .catch(error => {
        handleError(error, dispatch);
        dispatch(modifyLoader(false));
        setIsLoading(false);
      });
  };
}

export function saveHrc02(url, body, params, setIsLoading) {
  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const language = localStorage.getItem('language');
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost(url, body, { ...params })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        setIsLoading(false);
        dispatch({
          type: UPDATE_CUSTOMER,
          data,
        });
        dispatch(
          notify(
            'success',
            errorTable[`104${language}`],
            errorTable[`101${language}`],
          ),
        );
      })
      .catch(error => {
        handleError(error, dispatch);
        dispatch(modifyLoader(false));
        setIsLoading(false);
      });
  };
}

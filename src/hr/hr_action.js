import { doGet } from '../utils/apiActions';
import { handleError } from '../general/notification/notification_action';
import { modifyLoader } from '../general/loader/loader_action';

export const FETCH_DYNOBJ_HR = 'FETCH_DYNOBJ_HR';
export const CHANGE_DYNOBJ_HR = 'CHANGE_DYNOBJ_HR';
export const CLEAR_DYNOBJ_HR = 'CLEAR_DYNOBJ_HR';

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

import { doGet, doPost } from '../../utils/apiActions';
import {
  handleError,
  notify,
} from '../../general/notification/notification_action';
import { modifyLoader } from '../../general/loader/loader_action';

export const ACTION_TYPE = 'ACTION_TYPE';

const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
const language = localStorage.getItem('language');

export function fetchDynObjHr(url, params) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(url, { ...params })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: ACTION_TYPE,
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
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost(url, body, { ...params })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        setIsLoading(false);
        clearCustomer();
        dispatch({
          type: ACTION_TYPE,
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

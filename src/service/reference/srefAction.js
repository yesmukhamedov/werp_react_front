import { doGet } from '../../utils/apiActions';
import {
  handleError,
  // notify,
} from '../../general/notification/notification_action';
import { modifyLoader } from '../../general/loader/loader_action';

export const FETCH_SERV_APP_TYPE = 'FETCH_SERV_APP_TYPE';

// const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
// const language = localStorage.getItem('language');

export function fetchServAppType() {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet('service/reference/serv_app_type')
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SERV_APP_TYPE,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

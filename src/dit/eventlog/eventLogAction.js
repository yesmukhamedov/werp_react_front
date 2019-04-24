import axios from 'axios';
import { ROOT_URL } from '../../utils/constants';
import { modifyLoader } from '../../general/loader/loader_action';
import {
  handleError,
  notify,
} from '../../general/notification/notification_action';

export const ALL_EVETNT = 'ALL_EVETNT';

export function fetchAll() {
  return function(dispatch) {
    dispatch(modifyLoader(false));
    axios
      .get(`${ROOT_URL}/api/eventlog/all`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        console.log('data', data);
        modifyLoader(false);
        dispatch({
          type: ALL_EVETNT,
          payload: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

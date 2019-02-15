import axios from 'axios';
import { ROOT_URL } from '../../utils/constants';
import { modifyLoader } from '../../general/loader/loader_action';
import { handleError } from '../../general/notification/notification_action';

export const REF_CURRENT_MENU = 'REF_CURRENT_MENU';

export function fetchCurrentMenu() {
  return function(dispatch) {
    dispatch(modifyLoader(false));
    axios
      .get(`${ROOT_URL}/api/dit/menu/list`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        modifyLoader(false);
        dispatch({
          type: REF_CURRENT_MENU,
          payload: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

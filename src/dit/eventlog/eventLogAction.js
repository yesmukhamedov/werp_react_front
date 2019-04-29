import { ROOT_URL } from '../../utils/constants';
import { modifyLoader } from '../../general/loader/loader_action';
import {
  handleError,
  notify,
} from '../../general/notification/notification_action';

import axiosInstance from '../../utils/apiClient';

export const ALL_EVETNT = 'ALL_EVETNT';

export function fetchAll(page) {
  return function(dispatch) {
    dispatch(modifyLoader(false));
    axiosInstance
      .get(`${ROOT_URL}/api/eventlog/all?${page}`)
      .then(({ data }) => {
        modifyLoader(false);
        dispatch({
          type: ALL_EVETNT,
          items: data.items,
          meta: data.meta,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

import axios from 'axios';
import { ROOT_URL } from '../../../utils/constants';
import { handleError } from '../../../general/notification/notification_action';
// import browserHistory from '../../../../utils/history';

export const DOC_MYDOCS_LOADED = 'DOC_MYDOCS_LOADED';
export const DOC_MYDOCS_PAGE_LOADING = 'DOC_MYDOCS_PAGE_LOADING';

export function fetchMydocs(statusId) {
  return function(dispatch) {
    dispatch(setLoading(true));
    axios
      .get(`${ROOT_URL}/api/documents/my-docs/${statusId}`, {
        headers: { authorization: localStorage.getItem('token') },
      })
      .then(({ data }) => {
        dispatch(setLoading(false));
        dispatch({
          type: DOC_MYDOCS_LOADED,
          payload: data,
        });
      })
      .catch(e => {
        dispatch(setLoading(false));
        handleError(e, dispatch);
      });
  };
}

export function setLoading(flag) {
  return {
    type: DOC_MYDOCS_PAGE_LOADING,
    payload: flag,
  };
}

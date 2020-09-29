import { doGet, doPut } from '../../../utils/apiActions';
import { modifyLoader } from '../../../general/loader/loader_action';
import { errorTableText } from '../../../utils/helpers';
import {
  handleError,
  notify,
} from '../../../general/notification/notification_action';

export const FETCH_SMECAM = 'FETCH_SMECAM';
export const EDIT_SMECAM = 'EDIT_SMECAM';

// const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
// const language = localStorage.getItem('language');

export function fetchSmecam(id) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smecam/${id}`)
      .then(({ data }) => {
        dispatch({
          type: FETCH_SMECAM,
          payload: data,
        });
        dispatch(modifyLoader(false));
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function editSmecam(param) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPut('smecam/edit', { ...param })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: EDIT_SMECAM,
          payload: data,
        });
        dispatch(notify('success', errorTableText(104), errorTableText(101)));
      })
      .catch(e => {
        dispatch(modifyLoader(false));
        dispatch(notify('error', errorTableText(133), errorTableText(132)));
        handleError(e, dispatch);
      });
  };
}

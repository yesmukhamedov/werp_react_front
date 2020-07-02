import { doGet, doPut } from '../../../utils/apiActions';
import { modifyLoader } from '../../../general/loader/loader_action';
import { errorTableText } from '../../../utils/helpers';
import {
  handleError,
  notify,
} from '../../../general/notification/notification_action';

export const FETCH_SMECA = 'FETCH_SMECA';
export const EDIT_SMECA = 'EDIT_SMECA';

const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
const language = localStorage.getItem('language');

export function fetchSmeca(id) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smeca/${id}`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SMECA,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function editSmeca(param) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPut('smeca/edit', { ...param })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: EDIT_SMECA,
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

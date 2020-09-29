import { doGet } from '../../../utils/apiActions';
import { modifyLoader } from '../../../general/loader/loader_action';
//import { errorTableText } from '../../../utils/helpers';
import {
  handleError,
  //notify,
} from '../../../general/notification/notification_action';

export const FETCH_SMVCA = 'FETCH_SMVCA';
export const CLEAR_DYNOBJ_SERVICE = 'CLEAR_DYNOBJ_SERVICE';

// const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
// const language = localStorage.getItem('language');

export function fetchSmvca(id) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smvca/${id}`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SMVCA,
          payload: data.data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function clearDynObjService() {
  const obj = {
    type: CLEAR_DYNOBJ_SERVICE,
  };
  return obj;
}

import { doGet, doPut } from '../../../utils/apiActions';
import { modifyLoader } from '../../../general/loader/loader_action';
import { errorTableText } from '../../../utils/helpers';
import {
  handleError,
  notify,
} from '../../../general/notification/notification_action';

export const FETCH_SMECAM = 'FETCH_SMECAM';
export const CLEAR_DYNOBJ_SERVICE = 'CLEAR_DYNOBJ_SERVICE';
export const EDIT_SMECAM = 'EDIT_SMECAM';

const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
const language = localStorage.getItem('language');

export function fetchSmecam(id) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smecam/${id}`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SMECAM,
          payload: data.data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

// export function editSmecam(param) {
//   return function(dispatch) {
//     dispatch(modifyLoader(true));
//     doPut('smecam/edit', param)
//       .then(data => {
//         console.log('SUCCESS EDIT');
//         dispatch(modifyLoader(false));
//         dispatch({
//           type: EDIT_SMECAM,
//           payload: data,
//         });
//         dispatch(notify('success', errorTableText(104), errorTableText(101)));
//       })
//       .catch(e => {
//         console.log('ERROR EDIT');
//         dispatch(modifyLoader(false));
//         dispatch(notify('error', errorTableText(133), errorTableText(132)));
//       });
//   };
// }

export const editSmecam = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPut('smecam/edit', param)
      .then(data => {
        console.log('SUCCESS EDIT');
        dispatch(modifyLoader(false));
        dispatch({
          type: EDIT_SMECAM,
          payload: data.data.data,
        });
        //dispatch(notify('success', errorTableText(104), errorTableText(101)));
      })
      .catch(error => {
        console.log('ERROR EDIT');
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

export function clearDynObjService() {
  const obj = {
    type: CLEAR_DYNOBJ_SERVICE,
  };
  return obj;
}

import { modifyLoader } from '../../../general/loader/loader_action';
import {
  handleError,
  notify,
} from '../../../general/notification/notification_action';
import { doGet, doPut, doPost } from '../../../utils/apiActions';

export const CURRENT_POSITIONS = 'CURRENT_POSITIONS';
export const POSITION_UPDATE = 'POSITION_UPDATE';
export const NEW_POSITION = 'NEW_POSITION';

export function fetchCurrentPositions() {
  return function(dispatch) {
    dispatch(modifyLoader(false));
    doGet(`hr/positions/list`)
      .then(({ data }) => {
        modifyLoader(false);
        dispatch({
          type: CURRENT_POSITIONS,
          items: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function newPosition(newPos) {
  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const language = localStorage.getItem('language');
  return function(dispatch) {
    doPost(`hr/position/save`, newPos)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data) {
          dispatch(
            notify(
              'success',
              errorTable[`104${language}`],
              errorTable[`101${language}`],
            ),
          );
          dispatch({
            type: NEW_POSITION,
            payload: data,
          });
        } else {
          dispatch(
            notify(
              'info',
              errorTable[`133${language}`],
              errorTable[`132${language}`],
            ),
          );
        }
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function updatePosition(update) {
  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const language = localStorage.getItem('language');
  return function(dispatch) {
    doPut(`hr/position/update/${update.position_id}`, { ...update })
      .then(response => {
        if (response) {
          dispatch(
            notify(
              'success',
              errorTable[`104${language}`],
              errorTable[`101${language}`],
            ),
          );
          dispatch({
            type: POSITION_UPDATE,
            payload: update,
          });
        } else {
          dispatch(
            notify(
              'info',
              errorTable[`133${language}`],
              errorTable[`132${language}`],
            ),
          );
        }
      })
      .catch(e => {
        handleError(e, dispatch);
      });
  };
}

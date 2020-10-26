import { doGet } from '../../utils/apiActions';
import { handleError } from '../../general/notification/notification_action';
import { modifyLoader } from '../../general/loader/loader_action';

export const FETCH_HR_SLC = 'FETCH_HR_SLC';
export const CLEAR_HR_SLC = 'CLEAR_HR_SLC';

// const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
// const language = localStorage.getItem('language');

export const fetchHrSlc = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`srls`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_HR_SLC,
          data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};
export function clearHrSlc() {
  return function(dispatch) {
    dispatch({
      type: CLEAR_HR_SLC,
    });
  };
}

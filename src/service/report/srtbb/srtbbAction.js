import { doGet } from '../../../utils/apiActions';
import { handleError } from '../../../general/notification/notification_action';
import { modifyLoader } from '../../../general/loader/loader_action';

export const FETCH_SRTBB_LIST = 'FETCH_SRTBB_LIST';
export const CLEAR_SRTBB_LIST = 'CLEAR_SRTBB_LIST';

//SRLS список сервисов
export const fetchSrtbbList = (param, setFunc) => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`service/report/srtbb/search`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SRTBB_LIST,
          data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};
export function clearSrtbbList() {
  return function(dispatch) {
    dispatch({
      type: CLEAR_SRTBB_LIST,
    });
  };
}

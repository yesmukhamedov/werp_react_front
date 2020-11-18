import { doGet } from '../../../utils/apiActions';
import { handleError } from '../../../general/notification/notification_action';
import { modifyLoader } from '../../../general/loader/loader_action';

export const FETCH_SRQPWGS_LIST = 'FETCH_SRQPWGS_LIST';
export const CLEAR_SRQPWGS_LIST = 'CLEAR_SRQPWGS_LIST';

//SRLS список сервисов
export const fetchSrqpwgsList = (param, setFunc) => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`service/report/srqpwgs/search`, param)
      .then(({ data }) => {
        console.log('data', data);
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SRQPWGS_LIST,
          data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};
export function clearSrqpwgsList() {
  return function(dispatch) {
    dispatch({
      type: CLEAR_SRQPWGS_LIST,
    });
  };
}

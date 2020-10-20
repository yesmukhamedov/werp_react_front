import { doGet } from '../../../utils/apiActions';
import { handleError } from '../../../general/notification/notification_action';
import { modifyLoader } from '../../../general/loader/loader_action';

export const FETCH_SRLS = 'FETCH_SRLS';
export const CLEAR_SRLS = 'CLEAR_SRLS';
export const FETCH_SERVICE_TYPE_LIST = 'FETCH_SERVICE_TYPE_LIST';

// const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
// const language = localStorage.getItem('language');

//SRLS список сервисов
export const fetchSrls = (param, setFunc) => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`srls`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SRLS,
          data,
        });
        setFunc();
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};
export function clearSrls() {
  return function(dispatch) {
    dispatch({
      type: CLEAR_SRLS,
    });
  };
}

export const fetchServiceTypeList = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`service_type`, param)
      .then(({ data }) => {
        //console.log(data, 'ACTION');
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SERVICE_TYPE_LIST,
          data: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

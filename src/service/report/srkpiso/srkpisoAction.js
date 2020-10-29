import { doGet } from '../../../utils/apiActions';
import { handleError } from '../../../general/notification/notification_action';
import { modifyLoader } from '../../../general/loader/loader_action';

export const FETCH_SRKPISO = 'FETCH_SRKPISO';
export const CLEAR_SRKPISO = 'CLEAR_SRKPISO';
export const FETCH_SRKPISO_DETAL = 'FETCH_SRKPISO_DETAL';
export const CLEAR_SRKPISO_DETAL = 'CLEAR_SRKPISO_DETAL';

//SRKPISO  KPI Сервис операторов
export const fetchSrkpiso = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`service/report/srkpiso`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SRKPISO,
          data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};
//Детализация
export const fetchSrkpisoDetal = (param, setFunc) => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`service/report/srkpisod`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SRKPISO_DETAL,
          data,
        });
        setFunc();
      })
      .catch(error => {
        setFunc();
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

export function clearSrkpisoDetal() {
  return function(dispatch) {
    dispatch({
      type: CLEAR_SRKPISO_DETAL,
    });
  };
}
export function clearSrkpiso() {
  return function(dispatch) {
    dispatch({
      type: CLEAR_SRKPISO,
    });
  };
}

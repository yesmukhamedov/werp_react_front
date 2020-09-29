import { doGet } from '../../../utils/apiActions';
import { handleError } from '../../../general/notification/notification_action';
import { modifyLoader } from '../../../general/loader/loader_action';

export const FETCH_SRKPISO = 'FETCH_SRKPISO';

//SRKPISO  KPI Сервис операторов
export const fetchSrkpiso = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`srkpiso`, param)
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

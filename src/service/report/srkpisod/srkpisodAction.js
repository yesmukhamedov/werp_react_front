import { doGet } from '../../../utils/apiActions';
import { handleError } from '../../../general/notification/notification_action';
import { modifyLoader } from '../../../general/loader/loader_action';

export const FETCH_SRKPISOD = 'FETCH_SRKPISOD';

//SRKPISO  KPI Сервис операторов
export const fetchSrkpisod = param => {
  return function(dispatch) {
    doGet(`srkpiso`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SRKPISOD,
          data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

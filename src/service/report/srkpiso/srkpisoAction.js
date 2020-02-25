import { doGet, doPost, doPut, doDelete } from '../../../utils/apiActions';
import {
  handleError,
  notify,
} from '../../../general/notification/notification_action';
import { modifyLoader } from '../../../general/loader/loader_action';

export const FETCH_SRKPISO = 'FETCH_SRKPISO';

const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
const language = localStorage.getItem('language');

//SRKPISO  KPI Сервис операторов
export const fetchSrkpiso = param => {
  return function(dispatch) {
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

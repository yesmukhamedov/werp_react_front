import { doGet, doPost, doPut, doDelete } from '../../../utils/apiActions';
import {
  handleError,
  notify,
} from '../../../general/notification/notification_action';
import { modifyLoader } from '../../../general/loader/loader_action';

export const FETCH_SERVICE_LIST = 'FETCH_SERVICE_LIST';

const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
const language = localStorage.getItem('language');

//SRLS список сервисов
export const fetchServiceList = param => {
  console.log('PARAMETR', param);
  return function(dispatch) {
    doGet(`werp/mservice/report/srls`, param)
      .then(({ data }) => {
        console.log('ACTION', data);
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SERVICE_LIST,
          data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

export default fetchServiceList;

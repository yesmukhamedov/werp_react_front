import { doGet, doPost, doPut, doDelete } from '../../../utils/apiActions';
import {
  handleError,
  notify,
} from '../../../general/notification/notification_action';
import { modifyLoader } from '../../../general/loader/loader_action';

export const FETCH_SEARCH_CUSTOMER = 'FETCH_SEARCH_CUSTOMER';

export const FETCH_TRANSFER_APPLICATION = 'FETCH_TRANSFER_APPLICATION';

export const FETCH_MY_APPLICATION = 'FETCH_MY_APPLICATION';

const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
const language = localStorage.getItem('language');

//Поиск клиентов
export const fetchSearchCustomer = param => {
  return function(dispatch) {
    doGet(`smopccoc/ServiceFilterPlan`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SEARCH_CUSTOMER,
          data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

//Перенесенные заявки
export const fetchTransferApplication = param => {
  return function(dispatch) {
    doGet(`smopccic/transferApplicationEntry`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_TRANSFER_APPLICATION,
          data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

//Мои заявки
export const fetchMyApplicationExodus = param => {
  return function(dispatch) {
    doGet(`smopccic/myApplication`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_MY_APPLICATION,
          data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

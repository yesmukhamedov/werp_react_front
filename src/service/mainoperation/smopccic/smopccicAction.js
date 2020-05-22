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
    doGet(`smopccic/search_customer`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SEARCH_CUSTOMER,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

//Перенесенные заявки
export const fetchTransferApplication = () => {
  return function(dispatch) {
    doGet(`smopccic/rescheduledApplication`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_TRANSFER_APPLICATION,
          payload: data,
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
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

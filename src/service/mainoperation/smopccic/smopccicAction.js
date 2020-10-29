import { doGet } from '../../../utils/apiActions';
import {
  handleError,
  //notify,
} from '../../../general/notification/notification_action';
import { modifyLoader } from '../../../general/loader/loader_action';

export const FETCH_SEARCH_CUSTOMER = 'FETCH_SEARCH_CUSTOMER';
export const CLEAR_SEARCH_CUSTOMER = 'CLEAR_SEARCH_CUSTOMER';

export const FETCH_TRANSFER_APPLICATION = 'FETCH_TRANSFER_APPLICATION';

export const FETCH_MY_APPLICATION = 'FETCH_MY_APPLICATION';
export const CLEAR_MY_APPLICATION_EXODUS = 'CLEAR_MY_APPLICATION_EXODUS';

// const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
// const language = localStorage.getItem('language');

//Поиск клиентов
export const fetchSearchCustomer = (param, setFunc) => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`service/smopccic/search_customer`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SEARCH_CUSTOMER,
          payload: data,
        });
        setFunc();
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

export function clearSearchCustomer() {
  return function(dispatch) {
    dispatch({
      type: CLEAR_SEARCH_CUSTOMER,
    });
  };
}

//Перенесенные заявки
export const fetchTransferApplication = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`service/smopccic/rescheduledApplication`, param)
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
export const fetchMyApplicationExodus = (param, setFunc) => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`service/smopccic/myApplication`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_MY_APPLICATION,
          payload: data,
        });
        setFunc();
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

export function clearMyApplicationExodus() {
  return function(dispatch) {
    dispatch({
      type: CLEAR_MY_APPLICATION_EXODUS,
    });
  };
}

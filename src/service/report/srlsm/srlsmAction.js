import { doGet } from '../../../utils/apiActions';
import { handleError } from '../../../general/notification/notification_action';
import { modifyLoader } from '../../../general/loader/loader_action';

export const FETCH_SRLSM = 'FETCH_SRLSM';
export const CLEAR_SRLSM = 'CLEAR_SRLSM';
export const FETCH_SERVICE_TYPE_LIST = 'FETCH_SERVICE_TYPE_LIST';
export const FETCH_ACCEPT_PAYMENT_USERS = 'FETCH_ACCEPT_PAYMENT_USERS';
export const FETCH_MASTER_LIST = 'FETCH_MASTER_LIST';
export const FETCH_OPERATOR_LIST = 'FETCH_OPERATOR_LIST';

// const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
// const language = localStorage.getItem('language');

//SRLS список сервисов
export const fetchSrlsm = (param, setFunc) => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`service/report/srlsm`, param)
      .then(({ data }) => {
        setFunc();
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SRLSM,
          data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

export function clearSrlsm() {
  return function(dispatch) {
    dispatch({
      type: CLEAR_SRLSM,
    });
  };
}
export const fetchAcceptPaymentUsers = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`service/report/srlsm/accepted_payment_users`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_ACCEPT_PAYMENT_USERS,
          data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

export const fetchServiceTypeList = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`service/service_type`, param)
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
export const fetchMasterList = param => {
  return function(dispatch) {
    doGet(`service/report/srlsm/getMasterList`, param)
      .then(({ data }) => {
        dispatch({
          type: FETCH_MASTER_LIST,
          data: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
};
export const fetchOperatorList = param => {
  return function(dispatch) {
    doGet(`service/report/srlsm/getOperatorList`, param)
      .then(({ data }) => {
        dispatch({
          type: FETCH_OPERATOR_LIST,
          data: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
};

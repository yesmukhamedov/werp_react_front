import { doGet, doPost, doPut, doDelete } from '../../../utils/apiActions';
import {
  handleError,
  notify,
} from '../../../general/notification/notification_action';
import { modifyLoader } from '../../../general/loader/loader_action';

//План по замене картриджей
export const FETCH_SERVICE_FILTER_PLAN = 'FETCH_SERVICE_FILTER_PLAN';

//Перенесенные заявки исход
export const FETCH_SERVICE_TRANSFER_APPLICATION_EXODUS =
  'FETCH_SERVICE_TRANSFER_APPLICATION_EXODUS';

//Назначенные звонки
export const FETCH_SERVICE_ASSIGNED_CALLS = 'FETCH_SERVICE_ASSIGNED_CALLS';

//Мои заявки
export const FETCH_SERVICE_MY_APPLICATION_EXODUS =
  'FETCH_SERVICE_MY_APPLICATION_EXODUS';

const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
const language = localStorage.getItem('language');

//План по замене картриджей
export const fetchServiceFilterPlan = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smopccoc/ServiceFilterPlan`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SERVICE_FILTER_PLAN,
          data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

//Перенесенные заявки исход
export const fetchTransferApplicationExodus = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smopccoc/transferApplicationExodus`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SERVICE_TRANSFER_APPLICATION_EXODUS,
          data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

//Назначенные звонки
export const fetchAssignedCalls = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smopccoc/assignedCalls`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SERVICE_ASSIGNED_CALLS,
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
    dispatch(modifyLoader(true));
    doGet(`smopccoc/MyApplicationExodus`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SERVICE_MY_APPLICATION_EXODUS,
          data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

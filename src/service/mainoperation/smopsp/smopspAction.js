import { doGet, doPost, doPut, doDelete } from '../../../utils/apiActions';
import {
  handleError,
  notify,
} from '../../../general/notification/notification_action';
import { modifyLoader } from '../../../general/loader/loader_action';

//План по сервис пакетам
export const FETCH_SERVICE_PACKET_PLAN = 'FETCH_SERVICE_PACKET_PLAN';

//Перенесенные заявки
export const FETCH_TRANSFER_APPLICATION = 'FETCH_TRANSFER_APPLICATION';

//Назначенные звонки
export const FETCH_ASSIGNED_CALLS = 'FETCH_ASSIGNED_CALLS';

//Мои заявки
export const FETCH_MY_APPLICATION = 'FETCH_MY_APPLICATION';

const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
const language = localStorage.getItem('language');

//План по сервис пакетам
export const fetchServicePacketPlan = param => {
  return function(dispatch) {
    doGet(`smopsp/ServiceFilterVC`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SERVICE_PACKET_PLAN,
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
    doGet(`smopsp/transferApplication`, param)
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

//Назначенные звонки
export const fetchAssignedCalls = param => {
  return function(dispatch) {
    doGet(`smopsp/assignedCalls`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_ASSIGNED_CALLS,
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
export const fetchMyApplication = param => {
  return function(dispatch) {
    doGet(`smopsp/myApplication`, param)
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

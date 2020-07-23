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
export const FETCH_SERVICE_CRMSchedule = 'FETCH_SERVICE_CRMSchedule';

//Мои заявки
export const FETCH_SERVICE_MY_APPLICATION_EXODUS =
  'FETCH_SERVICE_MY_APPLICATION_EXODUS';

export const POST_TO_CANCEL_PLAN = 'POST_TO_CANCEL_PLAN';

const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
const language = localStorage.getItem('language');

//План по замене картриджей
export const fetchServiceFilterPlan = param => {
  console.log(param);
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smopccoc/serviceFilterPlan`, {
      ...param,
      planStatusId: param.planStatusId.toString(),
    })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SERVICE_FILTER_PLAN,
          payload: data,
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
    doGet(`smopccoc/rescheduledApplication`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SERVICE_TRANSFER_APPLICATION_EXODUS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

//Назначенные звонки
export const fetchCRMSchedule = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smopccoc/CRMSchedule`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SERVICE_CRMSchedule,
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
    dispatch(modifyLoader(true));
    doGet(`smopccoc/myApplication`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SERVICE_MY_APPLICATION_EXODUS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

//Отмена заявки
export const postToCancelPlan = (param, fetchFilterPlan) => {
  let queryString = Object.keys(param)
    .map(key => key + '=' + param[key])
    .join('&');
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost(`smopccoc/toCancelPlan?${queryString}`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: POST_TO_CANCEL_PLAN,
          payload: data,
        });
        fetchFilterPlan();
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

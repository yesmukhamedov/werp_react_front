import { doGet, doPost } from '../../../utils/apiActions';
import { handleError } from '../../../general/notification/notification_action';
import { modifyLoader } from '../../../general/loader/loader_action';

//План по сервис пакетам
export const FETCH_SERVICE_PACKET_PLAN = 'FETCH_SERVICE_PACKET_PLAN';

//Перенесенные заявки
export const FETCH_RESCHEDULED_APPLICATION = 'FETCH_RESCHEDULED_APPLICATION';

//Назначенные звонки
export const FETCH_ASSIGNED_CALLS = 'FETCH_ASSIGNED_CALLS';

//Мои заявки
export const FETCH_MY_APPLICATION = 'FETCH_MY_APPLICATION';

export const POST_TO_CANCEL_PLAN_VC = 'POST_TO_CANCEL_PLAN_VC';

//План по сервис пакетам
export const fetchServicePacketPlan = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smopsp/serviceFilterVCPlan?direction=DESC&orderBy=id`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SERVICE_PACKET_PLAN,
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
export const fetchRescheduledApplication = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smopsp/rescheduledApplication?direction=DESC&orderBy=id`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_RESCHEDULED_APPLICATION,
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
export const fetchAssignedCalls = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smopsp/CRMSchedule?direction=DESC&orderBy=id`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_ASSIGNED_CALLS,
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
export const fetchMyApplication = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smopsp/myApplication?direction=DESC&orderBy=id`, param)
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

//Отмена заявки
export const postToCancelPlanVC = (param, fetchServPacketVC) => {
  let queryString = Object.keys(param)
    .map(key => key + '=' + param[key])
    .join('&');
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost(`smopsp/toCancelPlan?${queryString}`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: POST_TO_CANCEL_PLAN_VC,
          payload: data,
        });
        fetchServPacketVC();
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

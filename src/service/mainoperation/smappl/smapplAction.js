import { doGet, doPost } from '../../../utils/apiActions';
import {
  handleError,
  notify,
} from '../../../general/notification/notification_action';
import { modifyLoader } from '../../../general/loader/loader_action';
import { errorTableText } from '../../../utils/helpers';

export const FETCH_SMAPPL_LIST = 'FETCH_SMAPPL_LIST';
export const CLEAR_SMAPPL_LIST = 'CLEAR_SMAPPL_LIST';
export const FETCH_MASTER_LIST_SMAPPL = 'FETCH_MASTER_LIST_SMAPPL';
export const CLEAR_MASTER_LIST_SMAPPL = 'FETCH_MASTER_LIST_SMAPPL';
export const FETCH_OPERATOR_LIST_SMAPPL = 'FETCH_OPERATOR_LIST_SMAPPL';
export const CLEAR_OPERATOR_LIST_SMAPPL = 'CLEAR_OPERATOR_LIST_SMAPPL';
export const SMAPPL_FETCH_CATEGORY = 'SMAPPL_FETCH_CATEGORY';
export const SMAPPL_FETCH_APP_STATUS = 'SMAPPL_FETCH_APP_STATUS';
export const SMAPPL_FETCH_APP_TYPE = 'SMAPPL_FETCH_APP_TYPE';

//const errorTable = JSON.parse(localStorage.getItem('errorTableString'));

export function fetchSmapplList(params, setFunc) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet('service/smappl/appList', params)
      .then(({ data }) => {
        setFunc();
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SMAPPL_LIST,
          payload: data.data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function clearSmapplList() {
  return function(dispatch) {
    dispatch({
      type: CLEAR_SMAPPL_LIST,
    });
  };
}

export function postApplicationsOperator(params, success) {
  return function(dispatch) {
    doPost(
      `service/smappl/changeOperator?applicationId=${params.applicationId}&operatorId=${params.operatorId}`,
    )
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        success();
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function postEditApp(params, setFunc, clearFunc) {
  return function(dispatch) {
    doPost('service/smappl/editApp', params)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        setFunc();
      })
      .catch(error => {
        clearFunc();
        handleError(error, dispatch);
      });
  };
}

export function fetchMasterListSmappl(params) {
  return function(dispatch) {
    doGet('service/smappl/getMasterList', params)
      .then(({ data }) => {
        dispatch({
          type: FETCH_MASTER_LIST_SMAPPL,
          data: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function clearMasterListSmappl() {
  return function(dispatch) {
    dispatch({
      type: CLEAR_MASTER_LIST_SMAPPL,
    });
  };
}

export const fetchOperatorListSmappl = param => {
  return function(dispatch) {
    doGet(`service/smappl/getOperatorList`, param)
      .then(({ data }) => {
        dispatch({
          type: FETCH_OPERATOR_LIST_SMAPPL,
          data: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
};
export function clearOperatorListSmappl() {
  return function(dispatch) {
    dispatch({
      type: CLEAR_OPERATOR_LIST_SMAPPL,
    });
  };
}

export function smapplFetchCategory(data) {
  return function(dispatch) {
    doGet('service/service_category/view', data)
      .then(({ data }) => {
        dispatch({
          type: SMAPPL_FETCH_CATEGORY,
          data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}
export function smapplFetchAppStatus(data) {
  return function(dispatch) {
    doGet('service/reference/serv_app_status', data)
      .then(({ data }) => {
        dispatch({
          type: SMAPPL_FETCH_APP_STATUS,
          data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}
export function smapplFetchAppType(data) {
  return function(dispatch) {
    doGet('service/reference/serv_app_type', data)
      .then(({ data }) => {
        dispatch({
          type: SMAPPL_FETCH_APP_TYPE,
          data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

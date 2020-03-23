import { doGet, doPost } from '../../../utils/apiActions';
import { handleError } from '../../../general/notification/notification_action';
import { modifyLoader } from '../../../general/loader/loader_action';

export const FETCH_SMCRLD_LIST = 'FETCH_SRKPISO';
export const POST_SMCRLD_FORMPLAN = 'POST_SMCRLD_FORMPLAN';
export const FETCH_SMCRLD = 'FETCH_SMCRLD';
export const FETCH_SMVOD_LIST = 'FETCH_SMVOD_LIST';
export const FETCH_SMRD_OPERATOR = 'FETCH_SMRD_OPERATOR';
export const POST_SMRD_OPERATORS_BY_BRANCH = 'POST_SMRD_OPERATORS_BY_BRANCH';

//SMCRLD Получить список распределении
export const fetchSmcrldList = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smcrld`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SMCRLD_LIST,
          data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

//Сформировать план
export const postSmcrldFormplan = param => {
  let queryString = Object.keys(param)
    .map(key => key + '=' + param[key])
    .join('&');
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost(`smcrld/formPlan?${queryString}`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: POST_SMCRLD_FORMPLAN,
          formPlanList: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

//SMCRLD Получить список распределении
export const fetchSmcrld = param => {
  return function(dispatch) {
    doGet(`smcrld/view`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SMCRLD,
          data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

//SMVOD Просмотр распределения по операторам
export const fetchSmvodList = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smvod`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SMVOD_LIST,
          data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

//SMRD Перераспределение(получить данные оператора)
export const fetchSmrdOperator = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smrd`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SMRD_OPERATOR,
          data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

//SMRD Получить список операторов по филиалу
export const postSmrdOperatorsByBranch = param => {
  let queryString = Object.keys(param)
    .map(key => key + '=' + param[key])
    .join('&');
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost(`smrd/operatorsByBranchId?${queryString}`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: POST_SMRD_OPERATORS_BY_BRANCH,
          data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

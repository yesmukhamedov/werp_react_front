import { doGet } from '../../../utils/apiActions';
import { handleError } from '../../../general/notification/notification_action';
import { modifyLoader } from '../../../general/loader/loader_action';

export const FETCH_REPORT_BY_CATEGORIES = 'FETCH_REPORT_BY_CATEGORIES';
export const FETCH_REPORT_BY_BRANCHES = 'FETCH_REPORT_BY_BRANCHES';
export const CLEAR_ALL = 'CLEAR_ALL';

// Types of coefficients
export const COEFFICIENT_TYPE_MONEY_RATE = 'MONEY_RATE';
export const COEFFICIENT_TYPE_VC_OPERATOR_BONUS = 'VC_OPERATOR_BONUS';
export const COEFFICIENT_TYPE_LOGISTICS_RATE = 'LOGISTICS_RATE';
export const COEFFICIENT_TYPE_MANAGER_BONUS = 'MANAGER_BONUS';
export const COEFFICIENT_TYPE_CHIEF_DEPARTMENT_BONUS = 'CHIEF_DEPARTMENT_BONUS';

export const fetchReportByCategories = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`service/srgfr/part1`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_REPORT_BY_CATEGORIES,
          payload: data.data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

export const fetchReportByBranches = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`service/srgfr/part2`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_REPORT_BY_BRANCHES,
          payload: data.data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

export const fetchExchangeRate = () => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`service/report/coefficients/coefficients`, {
      type: COEFFICIENT_TYPE_MONEY_RATE,
    })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: COEFFICIENT_TYPE_MONEY_RATE,
          payload: data.data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

export function clearAll() {
  return function(dispatch) {
    dispatch({
      type: CLEAR_ALL,
    });
  };
}

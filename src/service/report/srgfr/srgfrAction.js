import { doGet } from '../../../utils/apiActions';
import { handleError } from '../../../general/notification/notification_action';
import { modifyLoader } from '../../../general/loader/loader_action';

export const FETCH_REPORT_BY_CATEGORIES = 'FETCH_REPORT_BY_CATEGORIES';
export const FETCH_REPORT_BY_BRANCHES = 'FETCH_REPORT_BY_BRANCHES';
export const CLEAR_ALL = 'CLEAR_ALL';

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

export function clearAll() {
  return function(dispatch) {
    dispatch({
      type: CLEAR_ALL,
    });
  };
}

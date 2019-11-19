import { modifyLoader } from '../../../../general/loader/loader_action';
import {
  handleError,
  notify,
  NOTIFY,
} from '../../../../general/notification/notification_action';
import { doGet, doPut } from '../../../../utils/apiActions';

export const HR_TIMESHEET_FETCH_ITEMS = 'HR_TIMESHEET_FETCH_ITEMS';
export const HR_TIMESHEET_FETCH_STATUSES = 'HR_TIMESHEET_FETCH_STATUSES';

export function fetchItems(params) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`hr/staff/timesheet`, {
      params,
    })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: HR_TIMESHEET_FETCH_ITEMS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function fetchStatuses() {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`hr/staff/timesheet-statuses`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: HR_TIMESHEET_FETCH_STATUSES,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function saveData(data) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPut(`hr/staff/timesheet`, data)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch(notify(NOTIFY, 'Сохранено успешно'));
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

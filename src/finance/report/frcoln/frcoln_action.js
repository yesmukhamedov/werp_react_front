import { doGet, doPost } from '../../../utils/apiActions';
import {
  notify,
  handleError,
} from '../../../general/notification/notification_action';
import { modifyLoader } from '../../../general/loader/loader_action';

export const FRCOLN_SAVE_DATA = 'FRCOLN_SAVE_DATA';
export const FRCOLN_SEARCH_DATA = 'FRCOLN_SEARCH_DATA';
export const FRCOLN_FETCH_BRANCH_DATA = 'FRCOLN_FETCH_BRANCH_DATA';
export const FRCOLN_FETCH_COLLECTOR_DATA = 'FRCOLN_FETCH_COLLECTOR_DATA';
export const CHANGE_ACTIVE_INDEX = 'CHANGE_ACTIVE_INDEX';
export const CLEAR_STATE = 'CLEAR_STATE';

export function frcolnSearchData(
  a_bukrs,
  a_branchList,
  a_status,
  a_date,
  a_period,
) {
  const year = a_date.format('YYYY');
  const month = a_date.format('MM');

  return function(dispatch) {
    dispatch(modifyLoader(true));

    doGet(`finance/reports/frcoln/searchByBranches`, {
      bukrs: a_bukrs,
      branchIds: a_branchList.join(),
      year,
      month,
      status: a_status,
      period: a_period,
    })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FRCOLN_SEARCH_DATA,
          tab2OutputTable: data.tab2OutputTable,
          tab2TotalTable: data.tab2TotalTable,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}
export function frcolnFetchBranchData(
  a_bukrs,
  a_branchId,
  a_status,
  a_date,
  a_waers,
  a_period,
) {
  const year = a_date.format('YYYY');
  const month = a_date.format('MM');
  // console.log(222);
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`finance/reports/frcoln/searchByBranch`, {
      bukrs: a_bukrs,
      branchId: a_branchId,
      waers: a_waers,
      year,
      month,
      status: a_status,
      period: a_period,
    })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FRCOLN_FETCH_BRANCH_DATA,
          tab3OutputTable: data.tab3OutputTable,
          tab3TotalTable: data.tab3TotalTable,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function frcolnFetchCollectorData(
  a_bukrs,
  a_branchId,
  a_status,
  a_date,
  a_waers,
  a_staff_id,
  a_ps,
  a_period,
) {
  const year = a_date.format('YYYY');
  const month = a_date.format('MM');

  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`finance/reports/frcoln/searchByCollector`, {
      bukrs: a_bukrs,
      branchId: a_branchId,
      waers: a_waers,
      year,
      month,
      ps: a_ps,
      staff_id: a_staff_id,
      status: a_status,
      period: a_period,
    })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FRCOLN_FETCH_COLLECTOR_DATA,
          tab4OutputTable: data.tab4OutputTable,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function frcolnSaveData(a_bukrs, a_date, a_period) {
  const year = a_date.format('YYYY');
  const month = a_date.format('MM');

  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost(
      `finance/reports/frcoln/saveFrcolStatistics`,
      {},
      {
        bukrs: a_bukrs,
        year,
        month,
        period: a_period,
      },
    )
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data) {
          dispatch(notify('success', 'Сохранен.', 'Успешно'));
        } else {
          dispatch(notify('info', 'Не сохранен.', 'Ошибка'));
        }
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function changeTab(idx) {
  const obj = {
    type: CHANGE_ACTIVE_INDEX,
    activeIndex: idx,
  };
  return obj;
}

export function clearState() {
  const obj = {
    type: CLEAR_STATE,
  };
  return obj;
}

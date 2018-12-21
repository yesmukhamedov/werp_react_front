import axios from 'axios';
import { ROOT_URL } from '../../utils/constants';
import { handleError } from '../../general/notification/notification_action';

export const F4_FETCH_MATNR_LIST = 'F4_FETCH_MATNR_LIST';
export const F4_CLEAR_MATNR_LIST = 'F4_CLEAR_MATNR_LIST';

export const F4_FETCH_POSITION_LIST = 'F4_FETCH_POSITION_LIST';
export const F4_CLEAR_POSITION_LIST = 'F4_CLEAR_POSITION_LIST';

export const F4_FETCH_CURRENCY_LIST = 'F4_FETCH_CURRENCY_LIST';
export const F4_CLEAR_CURRENCY_LIST = 'F4_CLEAR_CURRENCY_LIST';

export const F4_FETCH_BONUSTYPE_LIST = 'F4_FETCH_BONUSTYPE_LIST';
export const F4_CLEAR_BONUSTYPE_LIST = 'F4_CLEAR_BONUSTYPE_LIST';

export const F4_FETCH_COUNTRY_LIST = 'F4_FETCH_COUNTRY_LIST';
export const F4_CLEAR_COUNTRY_LIST = 'F4_CLEAR_COUNTRY_LIST';
// Районы в городе
export const F4_FETCH_CITYREG_LIST = 'F4_FETCH_CITYREG_LIST';
export const F4_CLEAR_CITYREG_LIST = 'F4_CLEAR_CITYREG_LIST';
// Область
export const F4_FETCH_STATE_LIST = 'F4_FETCH_STATE_LIST';
export const F4_CLEAR_STATE_LIST = 'F4_CLEAR_STATE_LIST';
// Города
export const F4_FETCH_CITY_LIST = 'F4_FETCH_CITY_LIST';
export const F4_CLEAR_CITY_LIST = 'F4_CLEAR_CITY_LIST';
//
export const F4_FETCH_BUSINESS_AREA_LIST = 'F4_FETCH_BUSINESS_AREA_LIST';
export const F4_CLEAR_BUSINESS_AREA_LIST = 'F4_CLEAR_BUSINESS_AREA_LIST';
//
export const F4_FETCH_EXCHANGERATE_NATIONAL = 'F4_FETCH_EXCHANGERATE_NATIONAL';
export const F4_CLEAR_EXCHANGERATE_NATIONAL = 'F4_CLEAR_EXCHANGERATE_NATIONAL';

export const F4_FETCH_DEPARTMENT_LIST = 'F4_FETCH_DEPARTMENT_LIST';
export const F4_CLEAR_DEPARTMENT_LIST = 'F4_CLEAR_DEPARTMENT_LIST';

export const F4_FETCH_EXPENSE_TYPES = 'F4_FETCH_EXPENSE_TYPES';
export const F4_CLEAR_EXPENSE_TYPES = 'F4_CLEAR_EXPENSE_TYPES';

export const F4_FETCH_SUB_COMPANIES = 'F4_FETCH_SUB_COMPANIES';
export const F4_CLEAR_SUB_COMPANIES = 'F4_CLEAR_SUB_COMPANIES';

export const F4_FETCH_WERKSBRANCH_LIST = 'F4_FETCH_WERKSBRANCH_LIST';
export const F4_CLEAR_WERKSBRANCH_LIST = 'F4_CLEAR_WERKSBRANCH_LIST';

export const F4_FETCH_STAFF_LIST = 'F4_FETCH_STAFF_LIST';
export const F4_CLEAR_STAFF_LIST = 'F4_CLEAR_STAFF_LIST';

export const F4_FETCH_BUKRS_BRANCHES = 'F4_FETCH_BUKRS_BRANCHES';
export const F4_CLEAR_BUKRS_BRANCHES = 'F4_CLEAR_BUKRS_BRANCHES';

export const F4_FETCH_CASHBANK_BALANCE_LIST = 'F4_FETCH_CASHBANK_BALANCE_LIST';
export const F4_CLEAR_CASHBANK_BALANCE_LIST = 'F4_CLEAR_CASHBANK_BALANCE_LIST';

export function f4ClearAnyObject(a_const) {
  const obj = {
    type: a_const,
  };
  return obj;
}

export function f4FetchBranchesByBukrs(bukrs) {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/api/reference/branches/` + bukrs, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        dispatch({
          type: F4_FETCH_BUKRS_BRANCHES,
          payload: data,
        });
      })

      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function f4ClearBranchesByBukrs() {
  return {
    type: F4_CLEAR_BUKRS_BRANCHES,
    payload: [],
  };
}

export function f4FetchDepartmentList() {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/api/reference/departments`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        dispatch({
          type: F4_FETCH_DEPARTMENT_LIST,
          departmentList: data,
        });
      })

      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function f4FetchCountryList() {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/api/reference/countries`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        dispatch({
          type: F4_FETCH_COUNTRY_LIST,
          countryList: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function f4FetchStateList() {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/api/reference/states`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        dispatch({
          type: F4_FETCH_STATE_LIST,
          stateList: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function f4FetchCityList() {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/api/reference/cities`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        dispatch({
          type: F4_FETCH_CITY_LIST,
          cityList: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function f4FetchCityregList() {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/api/reference/regions`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        dispatch({
          type: F4_FETCH_CITYREG_LIST,
          cityregList: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function f4FetchMatnrList(trans) {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/api/reference/matnrList`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
        params: {
          trans,
        },
      })
      .then(({ data }) => {
        dispatch({
          type: F4_FETCH_MATNR_LIST,
          matnrList: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function f4ClearMatnrList() {
  const obj = {
    type: F4_CLEAR_MATNR_LIST,
  };
  return obj;
}

export function f4FetchPriceList(trans, bukrs, waers) {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/api/reference/priceList`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
        params: {
          trans,
          bukrs,
          waers,
        },
      })
      .then(({ data }) => {
        dispatch({
          type: F4_FETCH_MATNR_LIST,
          matnrList: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function f4FetchPositionList(trans) {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/api/reference/positionList`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
        params: {
          trans,
        },
      })
      .then(({ data }) => {
        dispatch({
          type: F4_FETCH_POSITION_LIST,
          positionList: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function f4ClearPositionList() {
  const obj = {
    type: F4_CLEAR_POSITION_LIST,
  };
  return obj;
}

export function f4FetchCurrencyList(trans) {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/api/reference/currencyList`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
        params: {
          trans,
        },
      })
      .then(({ data }) => {
        dispatch({
          type: F4_FETCH_CURRENCY_LIST,
          currencyList: data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function f4ClearCurrencyList() {
  const obj = {
    type: F4_CLEAR_CURRENCY_LIST,
  };
  return obj;
}

export function f4FetchWerksBranchList() {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/api/reference/werksBranchList`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        dispatch({
          type: F4_FETCH_WERKSBRANCH_LIST,
          werksBranchList: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function f4ClearWerksBranchList() {
  const obj = {
    type: F4_CLEAR_WERKSBRANCH_LIST,
  };
  return obj;
}

export function f4FetchBonusTypeList(trans) {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/api/reference/bonusTypeList`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
        params: {
          trans,
        },
      })
      .then(({ data }) => {
        dispatch({
          type: F4_FETCH_BONUSTYPE_LIST,
          bonusTypeList: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function f4ClearBonusTypeList() {
  const obj = {
    type: F4_CLEAR_BONUSTYPE_LIST,
  };
  return obj;
}

export function f4FetchBusinessAreaList() {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/api/reference/business-areas`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        dispatch({
          type: F4_FETCH_BUSINESS_AREA_LIST,
          businessAreaList: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function f4FetchBusinessAreaList2() {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/api/reference/businessAreas`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        dispatch({
          type: F4_FETCH_BUSINESS_AREA_LIST,
          businessAreaList: data.ba,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}
export function f4FetchExchangeRateNational() {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/api/reference/exchangeRateNational`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        dispatch({
          type: F4_FETCH_EXCHANGERATE_NATIONAL,
          exRateNational: data.exRateNational,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}
export function f4FetchExpenceTypes() {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/api/reference/expence-types`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        dispatch({
          type: F4_FETCH_EXPENSE_TYPES,
          payload: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function f4FetchSubCompanies() {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/api/reference/sub-companies`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        dispatch({
          type: F4_FETCH_SUB_COMPANIES,
          payload: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function f4FetchStaffList(
  trans,
  bukrs,
  brnch,
  fio,
  iinBin,
  unemployed,
  stopLoading,
) {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/api/reference/staffList`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
        params: {
          trans,
          bukrs,
          brnch,
          fio,
          iinBin,
          unemployed,
        },
      })
      .then(({ data }) => {
        dispatch({
          type: F4_FETCH_STAFF_LIST,
          staffList: data,
        });
        stopLoading(false);
      })
      .catch(error => {
        handleError(error, dispatch);
        stopLoading(false);
      });
  };
}

export function f4ClearStaffList() {
  const obj = {
    type: F4_CLEAR_STAFF_LIST,
  };
  return obj;
}

///////////////////////////////////////////////////////////////////////
export function f4FetchCashBankBalanceList(a_bukrs, a_branch, a_callBackFun) {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/api/reference/cashBankBalance`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
        params: {
          bukrs: a_bukrs,
          branch: a_branch,
        },
      })
      .then(({ data }) => {
        a_callBackFun();
        dispatch({
          type: F4_FETCH_CASHBANK_BALANCE_LIST,
          data: data.cashBankBalanceList,
        });
      });
  };
}

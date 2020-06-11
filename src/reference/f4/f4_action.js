import { doGet, doPost, doPut, doDelete } from '../../utils/apiActions';
import {
  handleError,
  notify,
} from '../../general/notification/notification_action';
import { modifyLoader } from '../../general/loader/loader_action';
import { errorTableText } from '../../utils/helpers';

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

export const F4_FETCH_SUB_COMPANY_TYPES = 'F4_FETCH_SUB_COMPANY_TYPES';
export const F4_CLEAR_SUB_COMPANY_TYPES = 'F4_CLEAR_SUB_COMPANY_TYPES';

export const F4_FETCH_HKONT_LIST = 'F4_FETCH_HKONT_LIST';
export const F4_CLEAR_HKONT_LIST = 'F4_CLEAR_HKONT_LIST';

export const F4_FETCH_CONTYPE_LIST = 'F4_FETCH_CONTYPE_LIST';
export const F4_CLEAR_CONTYPE_LIST = 'F4_CLEAR_CONTYPE_LIST';

export const F4_FETCH_CONSTATUS_LIST = 'F4_FETCH_CONSTATUS_LIST';
export const F4_CLEAR_CONSTATUS_LIST = 'F4_CLEAR_CONSTATUS_LIST';

export const F4_FETCH_BRANCHES = 'F4_FETCH_BRANCHES';
export const F4_CLEAR_BRANCHES = 'F4_CLEAR_BRANCHES';

export const F4_FETCH_CUSTOMERS = 'F4_FETCH_CUSTOMERS';
export const F4_CLEAR_CUSTOMERS = 'F4_CLEAR_CUSTOMERS';

export const F4_FETCH_ADDRESSES = 'F4_FETCH_ADDRESSES';
export const F4_CLEAR_ADDRESSES = 'F4_CLEAR_ADDRESSES';

export const POST_NEW_ADDRESS = 'POST_NEW_ADDRESS';
export const UPDATE_ADDRESS = 'UPDATE_ADDRESS';

export const F4_FETCH_COMPANY_OPTIONS = 'F4_FETCH_COMPANY_OPTIONS';
export const F4_FETCH_BRANCH_OPTIONS = 'F4_FETCH_BRANCH_OPTIONS';

export const F4_FETCH_LEAVE_REASON_OPTIONS = 'F4_FETCH_LEAVE_REASON_OPTIONS';

export const F4_FETCH_NATIONALITIES = 'F4_FETCH_NATIONALITIES';
export const F4_CLEAR_NATIONALITIES = 'F4_CLEAR_NATIONALITIES';

export const F4_FETCH_NATIONALITY_OPTIONS = 'F4_FETCH_NATIONALITY_OPTIONS';

export const F4_FETCH_ADDR_TYPE_OPTIONS = 'F4_FETCH_ADDR_TYPE_OPTIONS';

export const F4_FETCH_PHONE = 'F4_FETCH_PHONE';
export const F4_CLEAR_PHONE = 'F4_CLEAR_PHONE';

export const F4_FETCH_PHONE_TYPE = 'F4_FETCH_PHONE_TYPE';
export const F4_CLEAR_PHONE_TYPE = 'F4_CLEAR_PHONE_TYPE';

export const F4_POST_PHONE = 'F4_POST_PHONE';
export const F4_CLEAR_POST_PHONE = 'F4_CLEAR_POST_PHONE';

export const F4_UPDATE_PHONE = 'F4_UPDATE_PHONE';
export const F4_CLEAR_UPDATE_PHONE = 'F4_CLEAR_UPDATE_PHONE';

export const F4_FETCH_PHONE_HISTORY = 'F4_FETCH_PHONE_HISTORY';
export const F4_CLEAR_PHONE_HISTORY = 'F4_CLEAR_PHONE_HISTORY';

export const F4_DELETE_PHONE = 'F4_DELETE_PHONE';

export const F4_FETCH_MONTH_TERMS = 'F4_FETCH_MONTH_TERMS';
export const F4_CLEAR_MONTH_TERMS = 'F4_CLEAR_MONTH_TERMS';

export const F4_FETCH_MATNR_LIST_VIEW = 'F4_FETCH_MATNR_LIST_VIEW';
export const F4_CLEAR_MATNR_LIST_VIEW = 'F4_CLEAR_MATNR_LIST_VIEW';

export const F4_POST_SERV_CONTRACT = 'F4_POST_SERV_CONTRACT';
export const F4_CLEAR_SERV_CONTRACT = 'F4_CLEAR_SERV_CONTRACT';

export const F4_FETCH_CATEGORY = 'F4_FETCH_CATEGORY';
export const F4_CLEAR_FETCH_CATEGORY = 'F4_CLEAR_FETCH_CATEGORY';

export const F4_FETCH_CUSTOMERS_BY_ID = 'F4_FETCH_CUSTOMERS_BY_ID';

export const F4_FETCH_SERVICE_STATUS_LIST = 'F4_FETCH_SERVICE_STATUS_LIST';

export const F4_FETCH_OPERATORS_BY_BRANCH_ID =
  'F4_FETCH_OPERATORS_BY_BRANCH_ID';
export const F4_FETCH_SERVICE_APP_STATUS = 'F4_FETCH_SERVICE_APP_STATUS';
export const F4_FETCH_SERVICE_APP_TYPE = 'F4_FETCH_SERVICE_APP_TYPE';
export const F4_FETCH_TOVAR_CATEGORYS = 'F4_FETCH_TOVAR_CATEGORYS';
export const F4_FETCH_MATNR_PRICELIST = 'F4_FETCH_MATNR_PRICELIST';

export const F4_FETCH_SERVICE_TYPE = 'F4_FETCH_SERVICE_TYPE';

export const F4_FETCH_FILTER_PLAN_STATUS = 'F4_FETCH_FILTER_PLAN_STATUS';
export const F4_CLEAR_FILTER_PLAN_STATUS = 'F4_CLEAR_FILTER_PLAN_STATUS';
export const F4_FETCH_PHYS_STATUS = 'F4_FETCH_PHYS_STATUS';

export const F4_FETCH_CRM_CATEGORY = 'F4_FETCH_CRM_CATEGORY';
export const F4_CLEAR_CRM_CATEGORY = 'F4_CLEAR_CRM_CATEGORY';

const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
const language = localStorage.getItem('language');

export function f4ClearAnyObject(a_const) {
  const obj = {
    type: a_const,
  };
  return obj;
}

export function f4FetchTovarCategorys() {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet('smcs/getCategoryList')
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: F4_FETCH_TOVAR_CATEGORYS,
          data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function f4FetchCompanyOptions() {
  return function(dispatch) {
    doGet('reference/companies/all?dto-type=options')
      .then(({ data }) => {
        dispatch({
          type: F4_FETCH_COMPANY_OPTIONS,
          payload: data,
        });
      })

      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function f4FetchBranchOptions(params = {}) {
  return function(dispatch) {
    doGet('reference/branches/all?dto-type=options')
      .then(({ data }) => {
        dispatch({
          type: F4_FETCH_BRANCH_OPTIONS,
          payload: data,
        });
      })

      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function f4FetchBranchesByBukrs(bukrs) {
  return function(dispatch) {
    doGet(`reference/branches/` + bukrs)
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
    doGet('reference/departments')
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
    doGet('reference/countries')
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
    doGet('reference/states')
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
    doGet('reference/cities')
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
    doGet('reference/regions')
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
    doGet('reference/matnrList', { trans })
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
    doGet('reference/priceList', { trans, bukrs, waers })
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
    doGet('reference/positionList', { trans })
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
    doGet('reference/currencyList', { trans })
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
    doGet('reference/werksBranchList')
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
    doGet('reference/bonusTypeList', { trans })
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
    doGet('reference/business-areas')
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
    doGet('reference/businessAreas')
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
    doGet('reference/exchangeRateNational')
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
    doGet('reference/expence-types')
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
    doGet('reference/sub-companies')
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

export function f4FetchNationalities() {
  return function(dispatch) {
    doGet('reference/nationalities')
      .then(({ data }) => {
        dispatch({
          type: F4_FETCH_NATIONALITIES,
          payload: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function f4FetchNationalityOptions() {
  return function(dispatch) {
    doGet('reference/nationalities?dto-type=options')
      .then(({ data }) => {
        dispatch({
          type: F4_FETCH_NATIONALITY_OPTIONS,
          payload: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

//Address Types
export function f4FetchAddrTypeOptions() {
  return function(dispatch) {
    doGet('reference/address-types?dto-type=options')
      .then(({ data }) => {
        dispatch({
          type: F4_FETCH_ADDR_TYPE_OPTIONS,
          payload: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function f4FetchSubCompanyTypes() {
  return function(dispatch) {
    doGet('reference/sub-company-types')
      .then(({ data }) => {
        dispatch({
          type: F4_FETCH_SUB_COMPANY_TYPES,
          payload: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function f4FetchLeaveReasonOptions() {
  return function(dispatch) {
    doGet('reference/leave-reasons?mode=options')
      .then(({ data }) => {
        dispatch({
          type: F4_FETCH_LEAVE_REASON_OPTIONS,
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
    doGet('reference/staffList', {
      trans,
      bukrs,
      brnch,
      fio,
      iinBin,
      unemployed,
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
    doGet('finance/mainoperation/cashBankBalance', {
      bukrs: a_bukrs,
      branch: a_branch,
    }).then(({ data }) => {
      a_callBackFun();
      dispatch({
        type: F4_FETCH_CASHBANK_BALANCE_LIST,
        data: data.cashBankBalanceList,
      });
    });
  };
}

///////////////////////////////////////////////////////////////////////
export function f4FetchHkontList(a_bukrs, a_tcode, a_branch) {
  return function(dispatch) {
    doGet('reference/fetchHkontList', {
      bukrs: a_bukrs,
      branch: a_branch,
      tcode: a_tcode,
    }).then(({ data }) => {
      dispatch({
        type: F4_FETCH_HKONT_LIST,
        data: data.hkontOptions,
      });
    });
  };
}

export function f4ClearBranchOptions() {
  return {
    type: F4_FETCH_BRANCH_OPTIONS,
    payload: [],
  };
}

export function f4FetchConTypeList() {
  return function(dispatch) {
    doGet('reference/fetchContractTypeList')
      .then(({ data }) => {
        dispatch({
          type: F4_FETCH_CONTYPE_LIST,
          data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function f4FetchConStatusList() {
  return function(dispatch) {
    doGet('reference/fetchContractStatusList')
      .then(({ data }) => {
        dispatch({
          type: F4_FETCH_CONSTATUS_LIST,
          data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function f4FetchBranches(params = {}) {
  return function(dispatch) {
    doGet('reference/branches/all')
      .then(({ data }) => {
        dispatch({
          type: F4_FETCH_BRANCHES,
          data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function f4FetchCustomers(params = {}, setIsLoading) {
  return function(dispatch) {
    doGet('reference/FETCH_CUSTOMERS', params)
      .then(({ data }) => {
        setIsLoading(false);
        dispatch({
          type: F4_FETCH_CUSTOMERS,
          data,
        });
      })
      .catch(error => {
        setIsLoading(false);
        handleError(error, dispatch);
      });
  };
}

export function f4FetchCustomersById(params = {}) {
  return function(dispatch) {
    doGet('smcs/getCustomer', params)
      .then(({ data }) => {
        // setIsLoading(false);
        dispatch({
          type: F4_FETCH_CUSTOMERS_BY_ID,
          data,
        });
      })
      .catch(error => {
        // setIsLoading(false);
        handleError(error, dispatch);
      });
  };
}

export function f4FetchAddresses(params = {}, setIsLoading) {
  setIsLoading(true);
  return function(dispatch) {
    doGet('reference/address/FETCH_ADDRESSES', params)
      .then(({ data }) => {
        setIsLoading(false);
        dispatch({
          type: F4_FETCH_ADDRESSES,
          data,
        });
      })
      .catch(error => {
        setIsLoading(false);
        handleError(error, dispatch);
      });
  };
}

export function saveRfadd01(url, body, params, setIsLoading, clearAddress) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost(url, body, { ...params })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        setIsLoading(false);
        clearAddress();
        dispatch({
          type: POST_NEW_ADDRESS,
          data,
        });
        dispatch(
          notify(
            'success',
            errorTable[`104${language}`],
            errorTable[`101${language}`],
          ),
        );
      })
      .catch(error => {
        handleError(error, dispatch);
        dispatch(modifyLoader(false));
        setIsLoading(false);
      });
  };
}

export function saveRfadd02(url, body, params, setIsLoading) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost(url, body, { ...params })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        setIsLoading(false);
        dispatch({
          type: UPDATE_ADDRESS,
          data,
        });
        dispatch(
          notify(
            'success',
            errorTable[`104${language}`],
            errorTable[`101${language}`],
          ),
        );
      })
      .catch(error => {
        handleError(error, dispatch);
        dispatch(modifyLoader(false));
        setIsLoading(false);
      });
  };
}

export function f4FetchPhone() {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`phone?direction=DESC&orderBy=id`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: F4_FETCH_PHONE,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function f4FetchPhoneType() {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet('phone_type')
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: F4_FETCH_PHONE_TYPE,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function f4PostPhone(getData, countryId, fetchPhone) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPost(`phone/create?countryId=${countryId}`, getData)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: F4_POST_PHONE,
          payload: data,
        });
        dispatch(notify('success', errorTableText(101), errorTableText(104)));
        fetchPhone();
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function f4UpdatePhone(data, fetchPhone) {
  return function(dispatch) {
    doPut('phone/update', data)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: F4_UPDATE_PHONE,
          payload: data,
        });
        dispatch(notify('success', errorTableText(101), errorTableText(104)));
        fetchPhone();
        f4FetchPhoneHistory();
      })
      .catch(e => {
        dispatch(modifyLoader(false));
        handleError(e, dispatch);
      });
  };
}
export function f4DeletePhone(data, fetchPhone) {
  return function(dispatch) {
    doDelete('phone/delete', { data })
      .then(data => {
        dispatch(modifyLoader(false));
        dispatch({
          type: F4_DELETE_PHONE,
        });
        dispatch(notify('success', errorTableText(101), errorTableText(104)));
        fetchPhone();
        f4FetchPhoneHistory();
      })
      .catch(e => {
        dispatch(modifyLoader(false));
        handleError(e, dispatch);
      });
  };
}

export function f4FetchPhoneHistory() {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet('phone/audit?direction=DESC&orderBy=id')
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: F4_FETCH_PHONE_HISTORY,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function f4FetchMonthTerms(data) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet('smcc/branchMonthTerms', data)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: F4_FETCH_MONTH_TERMS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function f4FetchMatnrListView(data) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet('smcc/matnrListView', data)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: F4_FETCH_MATNR_LIST_VIEW,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function f4CreateServContract(contract) {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    console.log(contract);
    doPost('smcc/createServContract', contract)
      .then(({ data }) => {
        console.log(data);

        dispatch(modifyLoader(false));
        dispatch({
          type: F4_POST_SERV_CONTRACT,
          payload: data,
        });
        dispatch(
          notify(
            'success',
            errorTable[`101${language}`],
            errorTable[`104${language}`],
          ),
        );
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

//Категория
export function f4fetchCategory(data) {
  return function(dispatch) {
    dispatch(modifyLoader(true));

    doGet('service_category/view', data)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: F4_FETCH_CATEGORY,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function f4FetchServiceStatusList() {
  return function(dispatch) {
    doGet('service_status')
      .then(({ data }) => {
        dispatch({
          type: F4_FETCH_SERVICE_STATUS_LIST,
          data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}
export function f4FetchOperatorsByBranchId(param) {
  return function(dispatch) {
    doGet('smrd/operatorsByBranchId', param)
      .then(({ data }) => {
        dispatch({
          type: F4_FETCH_OPERATORS_BY_BRANCH_ID,
          data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

//Статус заявки
export function f4FetchServiceAppStatus() {
  return function(dispatch) {
    doGet('service/reference/serv_app_status')
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: F4_FETCH_SERVICE_APP_STATUS,
          data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function f4FetchServiceAppType() {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet('service/reference/serv_app_type')
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: F4_FETCH_SERVICE_APP_TYPE,
          data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function f4FetchServicType() {
  return function(dispatch) {
    doGet('smcs/getServiceTypeList')
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: F4_FETCH_SERVICE_TYPE,
          data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export const f4FetchMatnrPriceList = param => {
  return function(dispatch) {
    doGet(`smcs/matnr_pricelist`, param)
      .then(({ data }) => {
        //console.log(data, 'ACTION');
        dispatch(modifyLoader(false));
        dispatch({
          type: F4_FETCH_MATNR_PRICELIST,
          data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};
export const f4FetchFilterPlanStatus = param => {
  return function(dispatch) {
    doGet(`filterPlan_status/view?direction=ASC`, param)
      .then(({ data }) => {
        //console.log(data, 'ACTION');
        dispatch(modifyLoader(false));
        dispatch({
          type: F4_FETCH_FILTER_PLAN_STATUS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

export function f4FetchPhysStatus() {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`ContractLastState/view`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: F4_FETCH_PHYS_STATUS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function f4FetchCrmCategory() {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`crm_category/view`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: F4_FETCH_CRM_CATEGORY,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

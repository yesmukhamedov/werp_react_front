import {
  F4_FETCH_MATNR_LIST,
  F4_CLEAR_MATNR_LIST,
  F4_FETCH_POSITION_LIST,
  F4_CLEAR_POSITION_LIST,
  F4_FETCH_CURRENCY_LIST,
  F4_CLEAR_CURRENCY_LIST,
  F4_FETCH_BONUSTYPE_LIST,
  F4_CLEAR_BONUSTYPE_LIST,
  F4_FETCH_COUNTRY_LIST,
  F4_CLEAR_COUNTRY_LIST,
  F4_FETCH_STATE_LIST,
  F4_CLEAR_STATE_LIST,
  F4_FETCH_CITY_LIST,
  F4_CLEAR_CITY_LIST,
  F4_FETCH_CITYREG_LIST,
  F4_CLEAR_CITYREG_LIST,
  F4_FETCH_BUSINESS_AREA_LIST,
  F4_CLEAR_BUSINESS_AREA_LIST,
  F4_FETCH_DEPARTMENT_LIST,
  F4_CLEAR_DEPARTMENT_LIST,
  F4_FETCH_EXPENSE_TYPES,
  F4_CLEAR_EXPENSE_TYPES,
  F4_FETCH_SUB_COMPANIES,
  F4_CLEAR_SUB_COMPANIES,
  F4_FETCH_EXCHANGERATE_NATIONAL,
  F4_CLEAR_EXCHANGERATE_NATIONAL,
  F4_FETCH_WERKSBRANCH_LIST,
  F4_CLEAR_WERKSBRANCH_LIST,
  F4_FETCH_STAFF_LIST,
  F4_CLEAR_STAFF_LIST,
  F4_FETCH_BUKRS_BRANCHES,
  F4_CLEAR_BUKRS_BRANCHES,
  F4_FETCH_CASHBANK_BALANCE_LIST,
  F4_CLEAR_CASHBANK_BALANCE_LIST,
  F4_FETCH_SUB_COMPANY_TYPES,
  F4_FETCH_HKONT_LIST,
  F4_CLEAR_HKONT_LIST,
  F4_FETCH_LEAVE_REASON_OPTIONS,
  F4_FETCH_COMPANY_OPTIONS,
  F4_FETCH_BRANCH_OPTIONS,
  F4_FETCH_NATIONALITIES,
  F4_FETCH_NATIONALITY_OPTIONS,
  F4_FETCH_ADDR_TYPE_OPTIONS,
  F4_FETCH_BANK_PARTNER_OPTIONS,
  F4_FETCH_CONTYPE_LIST,
  F4_CLEAR_CONTYPE_LIST,
  F4_FETCH_BRANCHES,
  F4_CLEAR_BRANCHES,
  F4_FETCH_CUSTOMERS,
  F4_CLEAR_CUSTOMERS,
  F4_FETCH_ADDRESSES,
  F4_CLEAR_ADDRESSES,
  F4_FETCH_CONSTATUS_LIST,
  F4_CLEAR_CONSTATUS_LIST,
  F4_FETCH_PHONE,
  F4_CLEAR_PHONE,
  F4_FETCH_PHONE_TYPE,
  F4_CLEAR_PHONE_TYPE,
  F4_POST_PHONE,
  F4_CLEAR_POST_PHONE,
  F4_UPDATE_PHONE,
  F4_CLEAR_UPDATE_PHONE,
  F4_FETCH_PHONE_HISTORY,
  F4_CLEAR_PHONE_HISTORY,
  F4_FETCH_MONTH_TERMS,
  F4_CLEAR_MONTH_TERMS,
  F4_FETCH_MATNR_LIST_VIEW,
  F4_CLEAR_MATNR_LIST_VIEW,
  F4_POST_SERV_CONTRACT,
  F4_CLEAR_SERV_CONTRACT,
  F4_FETCH_CATEGORY,
  F4_FETCH_CUSTOMERS_BY_ID,
  F4_FETCH_SERVICE_STATUS_LIST,
  F4_FETCH_OPERATORS_BY_BRANCH_ID,
  F4_FETCH_SERVICE_APP_STATUS,
  F4_FETCH_SERVICE_APP_TYPE,
  F4_FETCH_TOVAR_CATEGORYS,
  F4_FETCH_SERVICE_TYPE,
  F4_FETCH_MATNR_PRICELIST,
  F4_FETCH_FILTER_PLAN_STATUS,
  F4_CLEAR_FILTER_PLAN_STATUS,
  F4_FETCH_PHYS_STATUS,
  F4_FETCH_CRM_CATEGORY,
  F4_CLEAR_CRM_CATEGORY,
  F4_FETCH_AVAILABLED_TRANSACTION_BY_USER,
  F4_FETCH_CURRENT_STAFF,
  F4_CLEAR_CURRENT_STAFF,
  F4_GET_LOCATION_ADDRESS_YANDEX,
} from './f4_action';

const INITIAL_STATE = {
  matnrList: [],
  positionList: [],
  currencyList: [],
  bonusTypeList: [],
  countryList: [],
  stateList: [],
  cityList: [],
  cityregList: [],
  businessAreaList: [],
  departmentList: [],
  departmentOptions: [],
  expenceTypes: [],
  subCompanies: [],
  nationalities: [],
  nationalityOptions: [],
  werksBranchList: [],
  staffList: [],
  bukrsBranches: [],
  cashBankBalanceList: [],
  subCompanyTypes: [],
  hkontList: [],
  leaveReasonOptions: [],
  companyOptions: [],
  branchOptions: [],
  addressTypeOptions: [],
  bankPartnerOptions: [],
  contractTypeList: [],
  branches: [],
  addresses: [],
  contractStatusList: [],
  phoneList: [],
  phoneType: [],
  phonePost: [],
  phoneHistory: [],
  monthTerms: [],
  matnrListView: [],
  servContract: [],
  category: [],
  customersById: {},
  filterPlanStatus: [],
  crmCategory: [],
  staffInfo: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case F4_FETCH_BUKRS_BRANCHES:
      return { ...state, bukrsBranches: action.payload };
    case F4_CLEAR_BUKRS_BRANCHES:
      return { ...state, bukrsBranches: [] };

    case F4_FETCH_MATNR_LIST:
      return { ...state, matnrList: action.matnrList };
    case F4_CLEAR_MATNR_LIST:
      return { ...state, matnrList: [] };
    case F4_FETCH_POSITION_LIST:
      return { ...state, positionList: action.positionList };
    case F4_CLEAR_POSITION_LIST:
      return { ...state, positionList: [] };
    case F4_FETCH_CURRENCY_LIST:
      let currencyOptions = action.currencyList.map(item => {
        return {
          key: item.id,
          value: item.currency,
          text: item.currency,
        };
      });
      return { ...state, currencyList: action.currencyList, currencyOptions };
    case F4_CLEAR_CURRENCY_LIST:
      return { ...state, currencyList: [], currencyOptions: [] };
    case F4_FETCH_BONUSTYPE_LIST:
      return { ...state, bonusTypeList: action.bonusTypeList };
    case F4_CLEAR_BONUSTYPE_LIST:
      return { ...state, bonusTypeList: [] };
    case F4_FETCH_COUNTRY_LIST:
      return { ...state, countryList: action.countryList };
    case F4_CLEAR_COUNTRY_LIST:
      return { ...state, countryList: [] };
    case F4_FETCH_STATE_LIST:
      return { ...state, stateList: action.stateList };
    case F4_CLEAR_STATE_LIST:
      return { ...state, stateList: [] };
    case F4_FETCH_CITY_LIST:
      return { ...state, cityList: action.cityList };
    case F4_CLEAR_CITY_LIST:
      return { ...state, cityList: [] };
    case F4_FETCH_CITYREG_LIST:
      return { ...state, cityregList: action.cityregList };
    case F4_CLEAR_CITYREG_LIST:
      return { ...state, cityregList: [] };

    case F4_FETCH_BUSINESS_AREA_LIST:
      return { ...state, businessAreaList: action.businessAreaList };
    case F4_CLEAR_BUSINESS_AREA_LIST:
      return { ...state, bussinessAreaList: [] };

    case F4_FETCH_EXCHANGERATE_NATIONAL:
      return { ...state, exRateNational: action.exRateNational };
    case F4_CLEAR_EXCHANGERATE_NATIONAL:
      return { ...state, exRateNational: [] };

    case F4_FETCH_DEPARTMENT_LIST:
      const language = localStorage.getItem('language');
      const departmentOptions = action.departmentList.map(item => ({
        key: item.id,
        value: item.id,
        text: item[`name_${language}`],
      }));
      return {
        ...state,
        departmentList: action.departmentList,
        departmentOptions,
      };
    case F4_CLEAR_DEPARTMENT_LIST:
      return { ...state, departmentList: [], departmentOptions: [] };

    case F4_FETCH_EXPENSE_TYPES:
      return { ...state, expenceTypes: action.payload };

    case F4_CLEAR_EXPENSE_TYPES:
      return { ...state, expenceTypes: [] };

    case F4_FETCH_SUB_COMPANIES:
      return { ...state, subCompanies: action.payload };

    case F4_CLEAR_SUB_COMPANIES:
      return { ...state, subCompanies: [] };

    case F4_FETCH_WERKSBRANCH_LIST:
      return { ...state, werksBranchList: action.werksBranchList };

    case F4_CLEAR_WERKSBRANCH_LIST:
      return { ...state, werksBranchList: [] };

    case F4_FETCH_STAFF_LIST:
      return { ...state, staffList: action.staffList };

    case F4_CLEAR_STAFF_LIST:
      return { ...state, staffList: [] };

    case F4_FETCH_CASHBANK_BALANCE_LIST:
      return { ...state, cashBankBalanceList: action.data };

    case F4_CLEAR_CASHBANK_BALANCE_LIST:
      return { ...state, cashBankBalanceList: [] };

    case F4_FETCH_SUB_COMPANY_TYPES:
      return { ...state, subCompanyTypes: action.payload };

    case F4_FETCH_HKONT_LIST:
      return { ...state, hkontList: action.data };

    case F4_CLEAR_HKONT_LIST:
      return { ...state, hkontList: [] };

    case F4_FETCH_LEAVE_REASON_OPTIONS:
      return { ...state, leaveReasonOptions: action.payload };

    case F4_FETCH_COMPANY_OPTIONS:
      return { ...state, companyOptions: action.payload };

    case F4_FETCH_BRANCH_OPTIONS:
      return { ...state, branchOptions: action.payload };

    case F4_FETCH_NATIONALITIES:
      return { ...state, nationalities: action.payload };

    case F4_FETCH_NATIONALITY_OPTIONS:
      return { ...state, nationalityOptions: action.payload };

    case F4_FETCH_ADDR_TYPE_OPTIONS:
      return { ...state, addressTypeOptions: action.payload };

    case F4_FETCH_BANK_PARTNER_OPTIONS:
      return { ...state, bankPartnerOptions: action.payload };

    case F4_FETCH_CONTYPE_LIST:
      return { ...state, contractTypeList: action.data };

    case F4_CLEAR_CONTYPE_LIST:
      return { ...state, contractTypeList: [] };

    case F4_FETCH_BRANCHES:
      return { ...state, branches: action.data };

    case F4_CLEAR_BRANCHES:
      return { ...state, branches: [] };

    case F4_FETCH_CUSTOMERS:
      return { ...state, customers: action.data };

    case F4_CLEAR_CUSTOMERS:
      return { ...state, customers: [] };

    case F4_FETCH_ADDRESSES:
      return { ...state, addresses: action.data };

    case F4_CLEAR_ADDRESSES:
      return { ...state, addresses: [] };

    case F4_FETCH_CONSTATUS_LIST:
      return { ...state, contractStatusList: action.data };

    case F4_CLEAR_CONSTATUS_LIST:
      return { ...state, contractStatusList: [] };

    case F4_FETCH_PHONE:
      return { ...state, phoneList: action.payload };

    case F4_CLEAR_PHONE:
      return { ...state, phoneList: [] };

    case F4_FETCH_PHONE_TYPE:
      return { ...state, phoneType: action.payload };

    case F4_CLEAR_PHONE_TYPE:
      return { ...state, phoneType: [] };

    case F4_POST_PHONE:
      return { ...state, phonePost: action.payload };

    case F4_CLEAR_POST_PHONE:
      return { ...state, phonePost: [] };

    case F4_UPDATE_PHONE:
      return { ...state, phoneUpdate: action.payload };

    case F4_CLEAR_UPDATE_PHONE:
      return { ...state, phoneUpdate: [] };

    case F4_FETCH_PHONE_HISTORY:
      return { ...state, phoneHistory: action.payload };

    case F4_CLEAR_PHONE_HISTORY:
      return { ...state, phoneHistory: [] };

    case F4_FETCH_MONTH_TERMS:
      return { ...state, monthTerms: action.payload };

    case F4_CLEAR_MONTH_TERMS:
      return { ...state, monthTerms: [] };

    case F4_FETCH_MATNR_LIST_VIEW:
      return { ...state, matnrListView: action.payload };

    case F4_CLEAR_MATNR_LIST_VIEW:
      return { ...state, matnrListView: [] };

    case F4_POST_SERV_CONTRACT:
      return { ...state, servContract: action.payload };

    case F4_CLEAR_SERV_CONTRACT:
      return { ...state, servContract: [] };

    case F4_FETCH_CATEGORY:
      return { ...state, category: action.payload.data };

    case F4_FETCH_CUSTOMERS_BY_ID:
      return { ...state, customersById: action.data.data };

    case F4_FETCH_SERVICE_STATUS_LIST:
      return { ...state, serviceStatusList: action.data.data };

    case F4_FETCH_OPERATORS_BY_BRANCH_ID:
      return { operatorsByBranchId: action.data.data };

    case F4_FETCH_SERVICE_APP_STATUS:
      return { ...state, serviceAppStatus: [...action.data.data] };

    case F4_FETCH_SERVICE_APP_TYPE:
      return { serviceAppType: action.data.data };

    case F4_FETCH_TOVAR_CATEGORYS:
      return { ...state, tovarCategory: [...action.data.data] };

    case F4_FETCH_SERVICE_TYPE:
      return { ...state, serviceType: [...action.data.data] };

    case F4_FETCH_MATNR_PRICELIST:
      return { ...state, matnrPriceList: [...action.data.data] };

    case F4_FETCH_FILTER_PLAN_STATUS:
      return { ...state, filterPlanStatus: action.payload.data };

    case F4_CLEAR_FILTER_PLAN_STATUS:
      return { ...state, filterPlanStatus: [] };

    case F4_FETCH_PHYS_STATUS:
      return { ...state, physStatus: action.payload.data };

    case F4_FETCH_CRM_CATEGORY:
      return { ...state, crmCategory: action.payload.data };

    case F4_CLEAR_CRM_CATEGORY:
      return { ...state, filterPlanStatus: [] };

    case F4_FETCH_AVAILABLED_TRANSACTION_BY_USER:
      return { ...state, availabledTransaction: [...action.payload.data] };

    case F4_FETCH_CURRENT_STAFF:
      return { ...state, staffInfo: action.payload.data };

    case F4_CLEAR_CURRENT_STAFF:
      return { ...state, staffInfo: [] };

    case F4_GET_LOCATION_ADDRESS_YANDEX:
      return {
        ...state,
        yandexData:
          action.data.data.response.GeoObjectCollection.featureMember[0]
            .GeoObject.metaDataProperty.GeocoderMetaData.Address.formatted,
      };
    default:
      return state;
  }
}

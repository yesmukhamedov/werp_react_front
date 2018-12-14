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
  F4_CLEAR_BUKRS_BRANCHES
} from './f4_action';

const INITIAL_STATE={
                    matnrList:[],
                    positionList:[],
                    currencyList:[],
                    bonusTypeList:[],
                    countryList:[],
                    stateList:[],
                    cityList:[],
                    cityregList:[],
                    businessAreaList:[],
                    departmentList:[],
                    departmentOptions:[],
                    expenceTypes:[],
                    subCompanies:[],
                    werksBranchList:[],
                    staffList:[],
                    bukrsBranches:[]
    };

export default function (state=INITIAL_STATE, action)
{

    switch(action.type)
    {
        case F4_FETCH_BUKRS_BRANCHES:
            return {...state, bukrsBranches:action.payload};
        case F4_CLEAR_BUKRS_BRANCHES:
            return {...state, bukrsBranches:[]};

        case F4_FETCH_MATNR_LIST:
            return {...state,matnrList:action.matnrList};
        case F4_CLEAR_MATNR_LIST:
            return {...state,matnrList:[]};
        case F4_FETCH_POSITION_LIST:
            return {...state,positionList:action.positionList};
        case F4_CLEAR_POSITION_LIST:
            return {...state,positionList:[]};
        case F4_FETCH_CURRENCY_LIST:
            let currencyOptions = action.currencyList.map(item => {
                return {
                    key: item.id,
                    value: item.currency,
                    text: item.currency
                }
            });
            return {...state,currencyList:action.currencyList, currencyOptions};
        case F4_CLEAR_CURRENCY_LIST:
            return {...state,currencyList:[],currencyOptions:[]};
        case F4_FETCH_BONUSTYPE_LIST:
            return {...state,bonusTypeList:action.bonusTypeList};
        case F4_CLEAR_BONUSTYPE_LIST:
            return {...state,bonusTypeList:[]};
        case F4_FETCH_COUNTRY_LIST:
            return {...state,countryList:action.countryList};
        case F4_CLEAR_COUNTRY_LIST:
            return {...state,countryList:[]}
        case F4_FETCH_STATE_LIST:
            return {...state,stateList:action.stateList};
        case F4_CLEAR_STATE_LIST:
            return {...state,stateList:[]}
        case F4_FETCH_CITY_LIST:
            return {...state,cityList:action.cityList};
        case F4_CLEAR_CITY_LIST:
            return {...state,cityList:[]}
        case F4_FETCH_CITYREG_LIST:
            return {...state,cityregList:action.cityregList};
        case F4_CLEAR_CITYREG_LIST:
            return {...state,cityregList:[]}

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

    default:
      return state;
  }
}

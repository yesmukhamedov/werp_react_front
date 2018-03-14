import { 
        F4_FETCH_MATNR_LIST, F4_CLEAR_MATNR_LIST
        ,F4_FETCH_POSITION_LIST, F4_CLEAR_POSITION_LIST
        ,F4_FETCH_CURRENCY_LIST, F4_CLEAR_CURRENCY_LIST
        ,F4_FETCH_BONUSTYPE_LIST, F4_CLEAR_BONUSTYPE_LIST,
        F4_FETCH_COUNTRY_LIST,F4_CLEAR_COUNTRY_LIST,
        F4_FETCH_STATE_LIST,F4_CLEAR_STATE_LIST,
        F4_FETCH_CITY_LIST,F4_CLEAR_CITY_LIST,
        F4_FETCH_CITYREG_LIST,F4_CLEAR_CITYREG_LIST
} from './f4_action';

const INITIAL_STATE={
                    matnrList:[],
                    positionList:[],
                    currencyList:[],
                    bonusTypeList:[],
                    countryList:[],
                    stateList:[],
                    cityList:[],
                    cityregList:[]
    };

export default function (state=INITIAL_STATE, action)
{

    switch(action.type)
    {
        case F4_FETCH_MATNR_LIST:
            return {...state,matnrList:action.matnrList};
        case F4_CLEAR_MATNR_LIST:
            return {...state,matnrList:[]};
        case F4_FETCH_POSITION_LIST:
            return {...state,positionList:action.positionList};
        case F4_CLEAR_POSITION_LIST:
            return {...state,positionList:[]};
        case F4_FETCH_CURRENCY_LIST:
            return {...state,currencyList:action.currencyList};
        case F4_CLEAR_CURRENCY_LIST:
            return {...state,currencyList:[]};
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

        default:
            return state;
    }
}


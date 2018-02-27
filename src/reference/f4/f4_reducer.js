import { 
        F4_FETCH_MATNR_LIST, F4_CLEAR_MATNR_LIST
        ,F4_FETCH_POSITION_LIST, F4_CLEAR_POSITION_LIST
        ,F4_FETCH_CURRENCY_LIST, F4_CLEAR_CURRENCY_LIST
        ,F4_FETCH_BONUSTYPE_LIST, F4_CLEAR_BONUSTYPE_LIST  } from './f4_action';

const INITIAL_STATE={ matnrList:[], positionList:[], currencyList:[], bonusTypeList:[] };

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
        default:
            return state;
    }
}


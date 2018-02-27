import { F4_FETCH_MATNR_LIST, F4_CLEAR_MATNR_LIST, F4_FETCH_POSITION_LIST, F4_CLEAR_POSITION_LIST  } from './f4_action';

const INITIAL_STATE={ matnrList:[], positionList:[] };

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
        default:
            return state;
    }
}


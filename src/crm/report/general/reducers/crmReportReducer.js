
import {CRM_REP_FETCH_META,CRM_REP_FETCH_ITEMS} from '../actions/crmReportAction'

const INITIAL_STATE = {
    meta: {},
    items: []
};

export default function (state = INITIAL_STATE, action){
    switch (action.type){
        case CRM_REP_FETCH_META:
            return {...state,meta: action.payload}

        case CRM_REP_FETCH_ITEMS:
            return {...state,items: action.payload}

        default:
            return state
    }
}
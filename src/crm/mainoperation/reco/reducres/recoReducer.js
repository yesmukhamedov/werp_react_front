import {
        CRM_RECO_FETCH_CURRENT_DEMO_DONE,
        CRM_RECO_FETCH_CURRENT_MOVED,
        CRM_RECO_FETCH_CURRENT_NEW,
        CRM_RECO_FETCH_CURRENT_USED,
        CRM_RECO_CLEAR_STATE,
        CRM_FETCH_REASONS,
        CRM_CALL_FETCH_RESULTS,
        CRM_RECO_FETCH_ARCHIVE,
    CRM_RECO_FETCH_STATUSES,
    CRM_RECO_FETCH_SINGLE,
    CRM_RECO_UPDATE_MODAL_TOGGLE,
    CRM_RECO_UPDATE,
    CRM_FETCH_PHONE_NUMBER_HISTORY
} from '../actions/recoAction';

const INITIAL_STATE={
                    doneItems:[],
                    movedItems:[],
                    newItems:[],
                    usedItems:[],
                    callResultOptions:[],
                    callRefuseOptions:[],
                    items:[],
                    statuses:[],
                    meta:{
                        totalRows:0,
                        perPage:0,
                        page:0
                    },
                    reco:{},
                    updateModalOpened:false,
                    phoneNumberHistory:[]

};

export default function (state=INITIAL_STATE, action)
{
    switch(action.type)
    {
        case CRM_FETCH_PHONE_NUMBER_HISTORY:
            return {...state,phoneNumberHistory:action.payload};
        case CRM_RECO_FETCH_CURRENT_DEMO_DONE:
            return {...state,doneItems:action.items};

        case CRM_RECO_FETCH_CURRENT_MOVED:
            return {...state,movedItems:action.items};

        case CRM_RECO_FETCH_CURRENT_NEW:
            return {...state,newItems:action.items};

        case CRM_RECO_FETCH_CURRENT_USED:
            return {...state,usedItems:action.items};

        case CRM_CALL_FETCH_RESULTS:
            return {...state,callResultOptions:action.payload};

        case CRM_FETCH_REASONS:
            return {...state,reasons:action.items};

        case CRM_RECO_FETCH_ARCHIVE:
            return {
                    ...state,
                    items: action.items,
                    meta:action.meta
            };

        case CRM_RECO_FETCH_SINGLE:
            return {
                ...state,
                reco: action.payload
            };

        case CRM_RECO_FETCH_STATUSES:
            return {
                ...state,
                statuses: action.statuses
            };

        case CRM_RECO_UPDATE_MODAL_TOGGLE:
            return {...state,updateModalOpened:action.payload}

        case CRM_RECO_UPDATE:
            return {...state,reco:action.payload,updateModalOpened:false}

        case CRM_RECO_CLEAR_STATE:
            return {...state,doneItems:[],movedItems:[],newItems:[],usedItems:[] };

        default:
            return state;
    }
}


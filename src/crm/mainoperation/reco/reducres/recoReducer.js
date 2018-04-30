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
    CRM_FETCH_PHONE_NUMBER_HISTORY,
    CRM_RECO_CHECKED_PHONE_NUMBER,
    CRM_RECO_CHECKING_PHONE_NUMBER,
    CRM_RECO_ITEM_BLANKED,
    CRM_RECO_BAD_REQUEST
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
                    phoneNumberHistory:[],
                    recoHeader:{},
                    recoCards:[],
                    //Мгновенная проверка тел номера
                    loadingPhones:{},
                    phoneErrors:{},
                    recoBlankedItem:{},
                    recoErrors:{}

};

export default function (state=INITIAL_STATE, action)
{
    //state.recoBlankedItem = {}
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

        case CRM_RECO_CHECKING_PHONE_NUMBER:
            let loadingPhones = Object.assign({}, state.loadingPhones)
            loadingPhones[action.payload] = true

            return {...state,loadingPhones:loadingPhones};

        case CRM_RECO_CHECKED_PHONE_NUMBER:
            let phoneErrors = Object.assign({}, state.phoneErrors)
            let loadedPhones = Object.assign({}, state.loadingPhones)
            for(let key in action.payload){
                phoneErrors[key] = parseInt(action.payload[key],10)
                loadedPhones[key] = false
            }

            return {...state,phoneErrors:phoneErrors,loadingPhones:loadedPhones};

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

        case CRM_RECO_ITEM_BLANKED:
            return {...state,recoBlankedItem:action.payload };

        case CRM_RECO_BAD_REQUEST:
            return {...state,recoErrors:action.payload };

        default:
            return state;
    }
}


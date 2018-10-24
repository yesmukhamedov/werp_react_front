import {
    CRM_VISIT_FETCH_SINGLE,
    CRM_VISIT_CLEAR_STATE,
    CRM_VISIT_FETCH_ARCHIVE,
    CRM_VISIT_MODAL_TOGGLE,
    CRM_VISIT_SET_FOR_UPDATE,
    CRM_VISIT_UPDATE,
    CRM_VISIT_SET_FOR_CREATE,
    CRM_VISIT_CREATE,
    CRM_VISIT_MODAL_CLEAR
} from '../actions/visitAction';

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
                    visit:{},
                    visits:[],
                    updateModalOpened:false,
                    phoneNumberHistory:[],
                    modalOpened: false

};

export default function (state=INITIAL_STATE, action)
{
    switch(action.type)
    {
        case CRM_VISIT_FETCH_SINGLE:
        case CRM_VISIT_UPDATE:
            return {
                ...state,
                visit: action.payload,
                modalOpened: false
            };

        case CRM_VISIT_CREATE:
            return {...state, modalOpened: false};

        case CRM_VISIT_FETCH_ARCHIVE:
            return {...state,visits: action.payload,modalOpened: false};

        case CRM_VISIT_MODAL_TOGGLE:
            return {...state,modalOpened: action.payload};

        case CRM_VISIT_SET_FOR_UPDATE:
            return {...state,visit: action.payload}

        case CRM_VISIT_SET_FOR_CREATE:
            return {...state,visit: action.payload}


        case CRM_VISIT_CLEAR_STATE:
            return {...state,doneItems:[],movedItems:[],newItems:[],usedItems:[] };

        case CRM_VISIT_MODAL_CLEAR:
            return {...state,modalOpened: false, visit:{}}

        default:
            return state;
    }
}


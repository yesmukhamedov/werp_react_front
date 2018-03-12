import {
    CRM_VISIT_FETCH_SINGLE,
    CRM_VISIT_CLEAR_STATE
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
                    updateModalOpened:false,
                    phoneNumberHistory:[]

};

export default function (state=INITIAL_STATE, action)
{
    switch(action.type)
    {
        case CRM_VISIT_FETCH_SINGLE:
            return {
                ...state,
                visit: action.payload
            };

        case CRM_VISIT_CLEAR_STATE:
            return {...state,doneItems:[],movedItems:[],newItems:[],usedItems:[] };

        default:
            return state;
    }
}


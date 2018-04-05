import {
        CRM_KPI_FETCH_ITEMS,
    CRM_KPI_FETCH_INDICATORS,
    CRM_KPI_BLANK_ITEM,
    CRM_KPI_CLEAR_STATE,
    CRM_KPI_FORM_MODAL_TOGGLE
} from '../actions/kpiSettingAction';

const INITIAL_STATE={
                    items:[],
                    indicators:[],
                    indicatorOptions:[],
                    item:{},
                    meta:{
                        totalRows:0,
                        perPage:0,
                        page:0
                    },
                    openKpiFormModal:false

};

export default function (state=INITIAL_STATE, action)
{
    switch(action.type)
    {
        case CRM_KPI_FETCH_ITEMS:
            return {...state,items:action.items,meta:action.meta}

        case CRM_KPI_FORM_MODAL_TOGGLE:
            return {...state,openKpiFormModal:action.payload}

        case CRM_KPI_BLANK_ITEM:
            return {...state,item:action.payload}

        case CRM_KPI_FETCH_INDICATORS:
            let indicatorOptions = []
            for(let k in action.payload){
                indicatorOptions.push({
                    key:k,
                    text:action.payload[k],
                    value:k
                })
            }
            return {...state,indicators:action.payload,indicatorOptions:indicatorOptions}

        case CRM_KPI_CLEAR_STATE:
            return {...state,INITIAL_STATE }

        default:
            return state;
    }
}


import {
        CRM_KPI_FETCH_ITEMS,
    CRM_KPI_FETCH_INDICATORS,
    CRM_KPI_BLANK_ITEM,
    CRM_KPI_CLEAR_STATE,
    CRM_KPI_FORM_MODAL_TOGGLE,
    CRM_KPI_SET_FOR_UPDATE,
    CRM_KPI_ITEM_CREATED,
    CRM_KPI_ITEM_UPDATED,
    CRM_KPI_ITEM_DELETED
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
        case CRM_KPI_SET_FOR_UPDATE:
            return {...state,item:action.payload}

        case CRM_KPI_FETCH_INDICATORS:
            let indicatorOptions = []
            for(let k in action.payload){
                indicatorOptions.push({
                    key: parseInt(k,10),
                    text: action.payload[k],
                    value: parseInt(k,10)
                })
            }
            return {...state,indicators:action.payload,indicatorOptions:indicatorOptions}

        case CRM_KPI_CLEAR_STATE:
            return {...state,INITIAL_STATE }

        case CRM_KPI_ITEM_CREATED:
        case CRM_KPI_ITEM_UPDATED:
        case CRM_KPI_ITEM_DELETED:
            let newItems = []
            for(let key in state.items){
                if(state.items[key]['id'] === action.item.id){
                    if(action.type !== CRM_KPI_ITEM_DELETED){
                        newItems[key] = action.item
                    }
                }else {
                    newItems[key] = state.items[key]
                }
            }

            if(action.type === CRM_KPI_ITEM_CREATED){
                newItems.push(action.item)
            }

            return {...state,openKpiFormModal: false, items: newItems,item:{}}

        default:
            return state;
    }
}


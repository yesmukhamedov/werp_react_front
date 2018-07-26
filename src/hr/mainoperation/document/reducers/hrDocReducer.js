import {HR_DOC_ITEMS_LOADED,HR_DOC_SINGLE_ITEM_LOADED} from '../actions/hrDocAction'
const INITIAL_STATE={
    items: [],
    item:{},
    actions:[]
}

export default function (state = INITIAL_STATE, action) {

    switch (action.type){
        case HR_DOC_ITEMS_LOADED:
            return {...state, items: action.payload}

        case HR_DOC_SINGLE_ITEM_LOADED:
            const {item,actions} = action.payload
            return {...state, item: item, actions: actions}

        default:
            return state
    }
}
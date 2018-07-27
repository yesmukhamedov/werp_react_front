import {HR_DOC_ITEMS_LOADED,HR_DOC_SINGLE_ITEM_LOADED} from '../actions/hrDocAction'
const INITIAL_STATE={
    items: [],
    document:{},
    actions:[]
}

export default function (state = INITIAL_STATE, action) {

    switch (action.type){
        case HR_DOC_ITEMS_LOADED:
            return {...state, items: action.payload}

        case HR_DOC_SINGLE_ITEM_LOADED:
            const {document,actions} = action.payload
            return {...state, document: document, actions: actions}

        default:
            return state
    }
}
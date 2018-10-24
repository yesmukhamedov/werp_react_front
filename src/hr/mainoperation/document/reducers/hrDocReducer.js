import {
    HR_DOC_ITEMS_LOADED,HR_DOC_SINGLE_ITEM_LOADED,HR_DOC_PAGE_LOADING,
    HR_DOC_SINGLE_ITEM_BLANKED,HR_DOC_LOCAL_UPDATE_DOC_ITEMS,HR_DOC_TOGGLE_ITEM_AMOUNT_EDIT_MODE
} from '../actions/hrDocAction'
const INITIAL_STATE={
    items: [],
    document:{},
    actions:[],
    approvers: [],
    actionLogs: [],
    pageLoading: false,
    itemAmountEditMode: false
}

export default function (state = INITIAL_STATE, action) {

    switch (action.type){
        case HR_DOC_PAGE_LOADING:
            return {...state, pageLoading: action.payload}
        case HR_DOC_ITEMS_LOADED:
            return {...state, items: action.payload}

        case HR_DOC_SINGLE_ITEM_LOADED:
        case HR_DOC_SINGLE_ITEM_BLANKED:
            const {document,actions,approvers,actionLogs} = action.payload
            return {...state, document: document, actions: actions, approvers: approvers, actionLogs: actionLogs}

        case HR_DOC_LOCAL_UPDATE_DOC_ITEMS:
            let doc = Object.assign({},state.document)
            doc.items = action.payload
            return {...state,document: doc}

        case HR_DOC_TOGGLE_ITEM_AMOUNT_EDIT_MODE:
            return {...state, itemAmountEditMode: action.payload}

        default:
            return state
    }
}
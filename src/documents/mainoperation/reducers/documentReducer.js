import {
    DOC_MYDOCS_LOADED,
    DOC_MYDOCS_PAGE_LOADING
} from '../actions/documentAction'
const INITIAL_STATE={
    mydocs: [],
    pageLoading: false
}

export default function (state = INITIAL_STATE, action) {

    switch (action.type){
        case DOC_MYDOCS_LOADED:
            return {...state, mydocs: action.payload}

        case DOC_MYDOCS_PAGE_LOADING:
            return {...state, pageLoading: action.payload}

        default:
            return state
    }
}
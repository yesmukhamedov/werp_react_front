import {
    FETCH_COMPANY_LIST,
    CLEAR_COMPANY_LIST,
    FETCH_CATEGORY_LIST,
    CLEAR_CATEGORY_LIST,
} from './werpreferenceActions';

const INITIAL_STATE = {
    companyList: [],
    categoryList: [],
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_COMPANY_LIST:
            return {
                ...state,
                companyList: [...action.data],
            };

        case CLEAR_COMPANY_LIST:
            return {
                ...state,
                companyList: [],
            };

        case FETCH_CATEGORY_LIST:
            return {
                ...state,
                categoryList: [...action.data],
            };

        case CLEAR_CATEGORY_LIST:
            return {
                ...state,
                categoryList: [],
            };

        default:
            return state;
    }
}

import {
    FETCH_COMPANY_LIST,
    UPDATE_COMPANY,
    CLEAR_TEST,
    //
    FETCH_CATEGORY_LIST,
    CLEAR_CATEGORY_LIST,
} from './werpreferenceActions';

const INITIAL_STATE = {
    testList: [],
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_COMPANY_LIST:
            return {
                ...state,
                companyList: [...action.data],
            };
        case UPDATE_COMPANY:
            return {
                ...state,
                companyList: [...action.data],
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

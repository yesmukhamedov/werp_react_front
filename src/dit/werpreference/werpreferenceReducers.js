import {
    FETCH_COMPANY_LIST,
    CLEAR_COMPANY_LIST,
    //
    GET_BRANCH_LIST,
    CLEAR_BRANCH_LIST,
    //
    FETCH_COUNTRY_LIST,
    CLEAR_COUNTRY_LIST,
    //
    FETCH_CATEGORY_LIST,
    CLEAR_CATEGORY_LIST,
    //
    FETCH_DEPARTMENT_LIST,
    CLEAR_DEPARTMENT_LIST,
} from './werpreferenceActions';

const INITIAL_STATE = {
    companyList: [],
    branchList: [],
    countryList: [],
    categoryList: [],
    departmentList: [],
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

        case GET_BRANCH_LIST:
            return {
                ...state,
                branchList: [...action.data],
            };
        case CLEAR_BRANCH_LIST:
            return {
                ...state,
                branchList: [],
            };

        case FETCH_COUNTRY_LIST:
            return {
                ...state,
                countryList: [...action.data],
            };

        case CLEAR_COUNTRY_LIST:
            return {
                ...state,
                countryList: [],
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
        case FETCH_DEPARTMENT_LIST:
            return {
                ...state,
                departmentList: [...action.data],
            };
        case CLEAR_DEPARTMENT_LIST:
            return {
                ...state,
                departmentList: [],
            };

        default:
            return state;
    }
}

import {
    FETCH_COMPANY_LIST,
    UPDATE_COMPANY,
    CLEAR_TEST,
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
        case CLEAR_TEST:
            return {
                ...state,
                testData: {},
            };
        default:
            return state;
    }
}

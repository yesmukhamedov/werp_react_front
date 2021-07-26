import { FETCH_TEST, CLEAR_TEST } from './werpreferenceActions';

const INITIAL_STATE = {
    testList: [],
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_TEST:
            return {
                ...state,
                testData: { ...action.data },
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

import { FETCH_RESULT } from './faglb03Action';

const INITIAL_STATE = {
    faglb03ResultList: [],
};

export default function(state = INITIAL_STATE, action) {
    if (action.type == FETCH_RESULT) {
        return {
            ...state,
            faglb03ResultList: [...action.data],
        };
    } else {
        return state;
    }
}

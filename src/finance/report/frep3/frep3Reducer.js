import { FETCH_RESULT, FETCH_DETAIL } from './frep3Actions';

const INITIAL_STATE = {
    frep3ResultList: [],
    frep3DetailList: [],
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_RESULT:
            return {
                ...state,
                frep3ResultList: [...action.data],
            };
        case FETCH_DETAIL:
            return {
                ...state,
                frep3DetailList: [...action.payload],
            };
        default:
            return state;
    }
}

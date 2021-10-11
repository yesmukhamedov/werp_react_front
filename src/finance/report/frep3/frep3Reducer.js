import { FETCH_RESULT, FETCH_DETAIL } from './frep3Actions';

const INITIAL_STATE = {
    frep3ResultList: [],
    frep3DetailList: [],
    searchParam: {
        bukrs: '',
        branchIdList: '',
        bldatTo: '',
        bldatFrom: '',
    },
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_RESULT:
            return {
                ...state,
                frep3ResultList: [...action.payload.data],
                searchParam: action.payload.param,
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

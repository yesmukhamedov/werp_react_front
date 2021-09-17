import {
    FETCH_COLLECT_MONIES,
    POST_APPROVE_COLLECT_MONEY,
    POST_REJECT_COLLECT_MONEY,
    FETCH_COLLECTOR_LIST,
    CLEAR_COLLECTOR_LIST,
} from './foacAction';

const INITIAL_STATE = {
    collectMoniesList: [],
    collectMoneyApprove: {},
    collectMoneyReject: {},
    collectorList: [],
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_COLLECT_MONIES:
            return {
                ...state,
                collectMoniesList: action.data.data,
            };
        case POST_APPROVE_COLLECT_MONEY:
            return {
                ...state,
                collectMoneyApprove: action.data,
            };
        case POST_REJECT_COLLECT_MONEY:
            return {
                ...state,
                collectMoneyReject: action.data,
            };
        case FETCH_COLLECTOR_LIST:
            return {
                ...state,
                collectorList: action.payload,
            };
        case CLEAR_COLLECTOR_LIST:
            return {
                ...state,
                collectorList: [],
            };
        default:
            return state;
    }
}

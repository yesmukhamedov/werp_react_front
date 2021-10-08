import { CLEAR_ALL, FETCH_BUSINESS_AREAS, FETCH_SALES_DETAILS } from './action';

let INITIAL_STATE = {
    salesDetails: [],
    businessAreas: [],
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CLEAR_ALL:
            return {
                businessAreas: [],
            };
        case FETCH_BUSINESS_AREAS:
            return {
                ...state,
                businessAreas: action.payload,
            };
        case FETCH_SALES_DETAILS:
            return {
                ...state,
                salesDetails: action.payload,
            };
        default:
            return state;
    }
}

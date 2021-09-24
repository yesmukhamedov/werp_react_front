import {
    CLEAR_ALL,
    FETCH_BUSINESS_AREAS,
    FETCH_HIGHEST_DEMO_ACHIEVERS,
    FETCH_HIGHEST_DEMO_PRODUCERS,
    FETCH_HIGHEST_SALES_ACHIEVERS,
    FETCH_SALES_MANAGER,
    FETCH_SALES_OFFICES,
} from './action';

let INITIAL_STATE = {
    highestDemoAchievers: [],
    highestDemoProducers: [],
    highestSalesAchievers: [],
    salesOffices: [],
    salesManager: [],
    businessAreas: [],
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CLEAR_ALL:
            return {
                highestDemoAchievers: [],
                highestDemoProducers: [],
                highestSalesAchievers: [],
                salesOffices: [],
                salesManager: [],
                businessAreas: [],
            };
        case FETCH_HIGHEST_DEMO_ACHIEVERS:
            return {
                ...state,
                highestDemoAchievers: action.payload,
            };
        case FETCH_HIGHEST_DEMO_PRODUCERS:
            return {
                ...state,
                highestDemoProducers: action.payload,
            };
        case FETCH_HIGHEST_SALES_ACHIEVERS:
            return {
                ...state,
                highestSalesAchievers: action.payload,
            };
        case FETCH_SALES_OFFICES:
            return {
                ...state,
                salesOffices: action.payload,
            };
        case FETCH_SALES_MANAGER:
            return {
                ...state,
                salesManager: action.payload,
            };
        case FETCH_BUSINESS_AREAS:
            return {
                ...state,
                businessAreas: action.payload,
            };
        default:
            return state;
    }
}

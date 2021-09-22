import {
    FETCH_KASPI_PRODUCTS,
    CLEAR_KASPI_PRODUCTS,
    FETCH_STORE_LIST,
    CLEAR_STORE_LIST,
} from './mrkaspiAction';

const INITIAL_STATE = {
    kaspiProducts: [],
    storeList: [],
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_KASPI_PRODUCTS:
            return {
                ...state,
                kaspiProducts: [...state.kaspiProducts, ...action.data],
            };

        case CLEAR_KASPI_PRODUCTS:
            return {
                ...state,
                kaspiProducts: [],
            };

        case FETCH_STORE_LIST:
            return {
                ...state,
                storeList: [...state.storeList, ...action.data],
            };

        case CLEAR_STORE_LIST:
            return {
                ...state,
                storeList: [],
            };

        default:
            return state;
    }
}

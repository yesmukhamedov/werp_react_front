import {
    FETCH_KASPI_PRODUCTS,
    CLEAR_KASPI_PRODUCTS,
    FETCH_STORE_LIST,
    CLEAR_STORE_LIST,
    FETCH_KASPI_BRANDS,
    FETCH_KASPI_COMPANIES,
} from './mrkaspiAction';

const INITIAL_STATE = {
    kaspiProducts: [],
    storeList: [],
    brandList: {},
    companyList: {},
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

        case FETCH_KASPI_BRANDS:
            return {
                ...state,
                brandList: { ...state.brandList, ...action.data },
            };
        case FETCH_KASPI_COMPANIES:
            return {
                ...state,
                companyList: { ...state.companyList, ...action.data },
            };
        default:
            return state;
    }
}

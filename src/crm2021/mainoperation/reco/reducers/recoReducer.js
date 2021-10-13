import {
    CRM_RECO_FETCH_CURRENT_POSITIVE_PHONED,
    CRM_RECO_FETCH_CURRENT_RECALL,
    CRM_RECO_FETCH_CURRENT_NEW,
    CRM_RECO_FETCH_CURRENT_DEMO_APPOINTED,
    CRM_RECO_CLEAR_STATE,
    CRM_FETCH_REASONS,
    CRM_CALL_FETCH_RESULTS,
    CRM_RECO_FETCH_STATUSES,
    CRM_RECO_FETCH_SINGLE,
    CRM_RECO_UPDATE_MODAL_TOGGLE,
    CRM_RECO_UPDATE,
    CRM_FETCH_PHONE_NUMBER_HISTORY,
    CRM_RECO_CHECKED_PHONE_NUMBER,
    CRM_RECO_CHECKING_PHONE_NUMBER,
    CRM_RECO_ITEM_BLANKED,
    CRM_RECO_BAD_REQUEST,
    CRM_FETCH_PHONE_META,
    NEW_CRM_SAVE_RECO,
    CRM_RECO_FETCH_CALL_DETAILS,
    CRM_RECO_FETCH_DEMO_DETAILS,
    CRM_RECO_FETCH_ARCHIVE_2021,
    CRM_RECO_CATEGORIES_FETCHED,
} from '../actions/recoAction';

const INITIAL_STATE = {
    doneItems: [],
    movedItems: [],
    newItems: [],
    usedItems: [],
    callResultOptions: [],
    callRefuseOptions: [],
    items: [],
    statuses: [],
    meta: {
        totalRows: 0,
        perPage: 0,
        page: 0,
        totalElements: 0,
        number: 0,
        size: 0,
    },
    reco: {},
    updateModalOpened: false,
    phoneNumberHistory: [],
    recoHeader: {},
    recoCards: [],
    // Мгновенная проверка тел номера
    loadingPhones: {},
    phoneErrors: {},
    recoBlankedItem: {},
    recoErrors: {},
    phoneMeta: {},
    callDetails: [],
    demoDetails: [],
    recoCategories: {},
};

export default function(state = INITIAL_STATE, action) {
    // state.recoBlankedItem = {}
    switch (action.type) {
        case CRM_RECO_CATEGORIES_FETCHED:
            return { ...state, recoCategories: action.payload };

        case CRM_FETCH_PHONE_META:
            return { ...state, phoneMeta: action.payload };

        case CRM_FETCH_PHONE_NUMBER_HISTORY:
            return { ...state, phoneNumberHistory: action.payload };
        case CRM_RECO_FETCH_CURRENT_POSITIVE_PHONED:
            return { ...state, positivePhonedItems: action.items };

        case CRM_RECO_FETCH_CURRENT_RECALL:
            return { ...state, recalledItems: action.items };

        case CRM_RECO_FETCH_CURRENT_NEW:
            return { ...state, newItems: action.items };

        case CRM_RECO_FETCH_CURRENT_DEMO_APPOINTED:
            return { ...state, appointedItems: action.items };

        case CRM_CALL_FETCH_RESULTS:
            return { ...state, callResultOptions: action.payload };

        case CRM_FETCH_REASONS:
            return { ...state, reasons: action.items };

        case CRM_RECO_CHECKING_PHONE_NUMBER:
            const loadingPhones = Object.assign({}, state.loadingPhones);
            loadingPhones[action.payload] = true;

            return { ...state, loadingPhones };

        case CRM_RECO_CHECKED_PHONE_NUMBER:
            const phoneErrors = Object.assign({}, state.phoneErrors);
            const loadedPhones = Object.assign({}, state.loadingPhones);
            for (const key in action.payload) {
                phoneErrors[key] = parseInt(action.payload[key], 10);
                loadedPhones[key] = false;
            }

            return { ...state, phoneErrors, loadingPhones: loadedPhones };

        case CRM_RECO_FETCH_ARCHIVE_2021:
            return {
                ...state,
                items: action.items,
                meta: action.meta,
            };

        case CRM_RECO_FETCH_SINGLE:
            return {
                ...state,
                reco: action.payload,
            };

        case CRM_RECO_FETCH_STATUSES:
            return {
                ...state,
                statuses: action.statuses,
            };

        case CRM_RECO_UPDATE_MODAL_TOGGLE:
            return { ...state, updateModalOpened: action.payload };

        case CRM_RECO_UPDATE:
            return { ...state, reco: action.payload, updateModalOpened: false };

        case CRM_RECO_CLEAR_STATE:
            return {
                ...state,
                doneItems: [],
                movedItems: [],
                newItems: [],
                usedItems: [],
            };

        case CRM_RECO_ITEM_BLANKED:
            return { ...state, recoBlankedItem: action.payload };

        case CRM_RECO_BAD_REQUEST:
            return { ...state, recoErrors: action.payload };

        case NEW_CRM_SAVE_RECO:
            return { ...state, saveCrmResponse: action.payload };

        case CRM_RECO_FETCH_CALL_DETAILS:
            return { ...state, callDetails: action.payload };

        case CRM_RECO_FETCH_DEMO_DETAILS:
            return { ...state, demoDetails: action.payload };

        default:
            return state;
    }
}

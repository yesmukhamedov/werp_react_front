import {
    CLEAR_ALL,
    COEFFICIENT_TYPE_CHIEF_DEPARTMENT_BONUS,
    COEFFICIENT_TYPE_LOGISTICS_RATE,
    COEFFICIENT_TYPE_MANAGER_BONUS,
    COEFFICIENT_TYPE_MONEY_RATE,
    COEFFICIENT_TYPE_VC_OPERATOR_BONUS,
    FETCH_CALCULATION_OF_OPERATORS_BONUS,
    FETCH_CALCULATION_OF_MANAGERS_BONUS,
    FETCH_REPORT_BY_BRANCHES,
    FETCH_REPORT_BY_CATEGORIES,
} from './srgfrAction';

const INITIAL_STATE = {
    reportByCategories: [],
    reportByBranches: [],
    exchangeRate: [],
    operatorByHarvestingSystem: [],
    logisticsRate: [],
    bonusOfManager: [],
    bonusOfHeadOfDepartment: [],
    calculationOfManagersBonus: [],
    calculationOfOperatorsBonus: {},
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_REPORT_BY_CATEGORIES:
            return {
                ...state,
                reportByCategories: [...action.payload],
            };
        case FETCH_REPORT_BY_BRANCHES:
            return {
                ...state,
                reportByBranches: [...action.payload],
            };
        case COEFFICIENT_TYPE_MONEY_RATE:
            return {
                ...state,
                exchangeRate: [...action.payload],
            };
        case COEFFICIENT_TYPE_VC_OPERATOR_BONUS:
            return {
                ...state,
                operatorByHarvestingSystem: [...action.payload],
            };
        case COEFFICIENT_TYPE_LOGISTICS_RATE:
            return {
                ...state,
                logisticsRate: [...action.payload],
            };
        case COEFFICIENT_TYPE_MANAGER_BONUS:
            return {
                ...state,
                bonusOfManager: [...action.payload],
            };
        case COEFFICIENT_TYPE_CHIEF_DEPARTMENT_BONUS:
            return {
                ...state,
                bonusOfHeadOfDepartment: [...action.payload],
            };
        case FETCH_CALCULATION_OF_MANAGERS_BONUS:
            return {
                ...state,
                calculationOfManagersBonus: { ...action.payload },
            };
        case FETCH_CALCULATION_OF_OPERATORS_BONUS:
            return {
                ...state,
                calculationOfOperatorsBonus: { ...action.payload },
            };
        case CLEAR_ALL:
            return {
                reportByCategories: [],
                reportByBranches: [],
            };

        default:
            return state;
    }
}

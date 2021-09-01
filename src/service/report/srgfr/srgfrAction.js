import { doGet, doPost } from '../../../utils/apiActions';
import { handleError } from '../../../general/notification/notification_action';
import { modifyLoader } from '../../../general/loader/loader_action';

export const FETCH_REPORT_BY_CATEGORIES = 'FETCH_REPORT_BY_CATEGORIES';
export const FETCH_REPORT_BY_BRANCHES = 'FETCH_REPORT_BY_BRANCHES';
export const FETCH_CALCULATION_OF_MANAGERS_BONUS =
    'FETCH_CALCULATION_OF_MANAGERS_BONUS';
export const FETCH_CALCULATION_OF_OPERATORS_BONUS =
    'FETCH_CALCULATION_OF_OPERATORS_BONUS';
export const CLEAR_ALL = 'CLEAR_ALL';

// Types of coefficients
export const COEFFICIENT_TYPE_MONEY_RATE = 'MONEY_RATE';
export const COEFFICIENT_TYPE_VC_OPERATOR_BONUS = 'VC_OPERATOR_BONUS';
export const COEFFICIENT_TYPE_LOGISTICS_RATE = 'LOGISTICS_RATE';
export const COEFFICIENT_TYPE_MANAGER_BONUS = 'MANAGER_BONUS';
export const COEFFICIENT_TYPE_CHIEF_DEPARTMENT_BONUS = 'CHIEF_DEPARTMENT_BONUS';

export const fetchReportByCategories = params => {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doGet(`service/srgfr/part1`, params)
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                dispatch({
                    type: FETCH_REPORT_BY_CATEGORIES,
                    payload: data.data,
                });
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
};

export const fetchReportByBranches = params => {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doGet(`service/srgfr/part2`, params)
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                dispatch({
                    type: FETCH_REPORT_BY_BRANCHES,
                    payload: data.data,
                });
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
};

export const fetchExchangeRate = () => {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doGet(`service/report/coefficients/coefficients`, {
            type: COEFFICIENT_TYPE_MONEY_RATE,
        })
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                dispatch({
                    type: COEFFICIENT_TYPE_MONEY_RATE,
                    payload: data.data,
                });
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
};

export const fetchOperatorByHarvestingSystem = () => {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doGet(`service/report/coefficients/coefficients`, {
            type: COEFFICIENT_TYPE_VC_OPERATOR_BONUS,
        })
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                dispatch({
                    type: COEFFICIENT_TYPE_VC_OPERATOR_BONUS,
                    payload: data.data,
                });
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
};

export const fetchLogisticsRate = () => {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doGet(`service/report/coefficients/coefficients`, {
            type: COEFFICIENT_TYPE_LOGISTICS_RATE,
        })
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                dispatch({
                    type: COEFFICIENT_TYPE_LOGISTICS_RATE,
                    payload: data.data,
                });
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
};

export const fetchBonusOfManager = () => {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doGet(`service/report/coefficients/coefficients`, {
            type: COEFFICIENT_TYPE_MANAGER_BONUS,
        })
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                dispatch({
                    type: COEFFICIENT_TYPE_MANAGER_BONUS,
                    payload: data.data,
                });
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
};

export const fetchBonusOfHeadOfDepartment = () => {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doGet(`service/report/coefficients/coefficients`, {
            type: COEFFICIENT_TYPE_CHIEF_DEPARTMENT_BONUS,
        })
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                dispatch({
                    type: COEFFICIENT_TYPE_CHIEF_DEPARTMENT_BONUS,
                    payload: data.data,
                });
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
};

export const modifyBonusCoefficient = (params, callback) => {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doPost(
            `service/report/coefficients/add_update_bonus_coefficient`,
            null,
            params,
        )
            .then(() => {
                dispatch(modifyLoader(false));
                callback();
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
                callback();
            });
    };
};

export const modifyExchangeRateCoefficient = (params, callback) => {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doPost(
            `service/report/coefficients/add_update_money_rate_coefficient`,
            null,
            params,
        )
            .then(() => {
                dispatch(modifyLoader(false));
                callback();
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
                callback();
            });
    };
};

export const modifyLogisticsRateCoefficient = (params, callback) => {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doPost(
            `service/report/coefficients/add_update_logistics_coefficient`,
            null,
            params,
        )
            .then(() => {
                dispatch(modifyLoader(false));
                callback();
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
                callback();
            });
    };
};

export const fetchCalculationOfManagersBonus = params => {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doGet(`service/srgfr/manager_bonuses`, params)
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                dispatch({
                    type: FETCH_CALCULATION_OF_MANAGERS_BONUS,
                    payload: data.data.managerList,
                });
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
};

export const fetchCalculationOfOperatorsBonus = params => {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doGet(`service/srgfr/senior_operator_bonuses`, params)
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                dispatch({
                    type: FETCH_CALCULATION_OF_OPERATORS_BONUS,
                    payload: data.data.seniorOperatorBonus,
                });
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
};

export function clearAll() {
    return function(dispatch) {
        dispatch({
            type: CLEAR_ALL,
        });
    };
}

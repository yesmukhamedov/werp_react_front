import { doGet, doPut, doPost } from '../../utils/apiActions';
import { handleError } from '../../general/notification/notification_action';
import { modifyLoader } from '../../general/loader/loader_action';
//Company
export const FETCH_COMPANY_LIST = 'FETCH_COMPANY_LIST';
export const UPDATE_COMPANY = 'UPDATE_COMPANY';
export const CLEAR_COMPANY_LIST = 'CLEAR_COMPANY_LIST';
//Category
export const FETCH_CATEGORY_LIST = 'FETCH_CATEGORY_LIST';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const CLEAR_CATEGORY_LIST = 'CLEAR_CATEGORY_LIST';

// const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
// const language = localStorage.getItem('language');

// Добавить компанию
export const createCompany = (body, getList) => {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doPost(`core/reference/company`, body)
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                getList();
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
};

// список компании
export const fetchCompanyList = () => {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doGet(`core/reference/company/list`)
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                dispatch({
                    type: FETCH_COMPANY_LIST,
                    data,
                });
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
};

// редактировать компанию
export const updateCompany = (body, getList) => {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doPut(`core/reference/company`, body)
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                getList();
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
};

// очистить список компании
export const clearCompanyList = () => {
    return function(dispatch) {
        dispatch({
            type: CLEAR_COMPANY_LIST,
        });
    };
};

// Добавить категорию
export const createCategory = (body, getList) => {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doPost(`core/reference/service-category`, body)
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                getList();
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
};

// Список категории
export const fetchCategoryList = () => {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doGet(`core/reference/service-category/list`)
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                dispatch({
                    type: FETCH_CATEGORY_LIST,
                    data,
                });
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
};

// редактировать категорию
export const updateCategory = (body, getList) => {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doPut(`core/reference/service-category`, body)
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                getList();
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
};

export const clearCategoryList = () => {
    return function(dispatch) {
        dispatch({
            type: CLEAR_CATEGORY_LIST,
        });
    };
};

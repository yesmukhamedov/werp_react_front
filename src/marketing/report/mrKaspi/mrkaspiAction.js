import { modifyLoader } from '../../../general/loader/loader_action';
import {
    handleError,
    notify,
} from '../../../general/notification/notification_action';

import { doGet, doPost, doPut, doDelete } from '../../../utils/apiActions';

export const FETCH_KASPI_PRODUCTS = 'FETCH_KASPI_PRODUCTS';
export const CLEAR_KASPI_PRODUCTS = 'CLEAR_KASPI_PRODUCTS';
export const FETCH_STORE_LIST = 'FETCH_STORE_LIST';
export const CLEAR_STORE_LIST = 'CLEAR_STORE_LIST';
export const FETCH_KASPI_BRANDS = 'FETCH_KASPI_BRANDS';
export const FETCH_KASPI_COMPANIES = 'FETCH_KASPI_COMPANIES';

/****************** Товары в каспи *********************/

// Получит список товаров в Каспи
export const fetchKaspiProducts = () => {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doGet(`core/marketing/kaspi/listall`)
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                dispatch({
                    type: FETCH_KASPI_PRODUCTS,
                    data,
                });
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
};

// Добавить товар в Каспи
export const createKaspiProduct = (body, getList) => {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doPost(`core/marketing/kaspi`, body)
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

// Изменить товар в Каспи
export const updateKaspiProduct = (body, getList) => {
    return function(dispatch) {
        console.log('OOOK');
        dispatch(modifyLoader(true));
        doPut(`core/marketing/kaspi`, body)
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

// Очистить список товаров из рекдакс
export const clearKaspiProducts = () => {
    return function(dispatch) {
        dispatch({
            type: CLEAR_KASPI_PRODUCTS,
        });
    };
};

// Удалить товар в Каспи
export const deleteProduct = (id, cbFun) => {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doDelete(`core/marketing/kaspi/?sku=${id}`)
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                cbFun();
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
};

/*************** Пункт выдачи *************/

// Получит список пунктов выдачи
export const fetchStoreList = () => {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doGet(`core/marketing/kaspi/store/list`)
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                dispatch({
                    type: FETCH_STORE_LIST,
                    data,
                });
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
};

// Добавить пункт выдачи
export const creatStore = (body, getList) => {
    return function(dispatch) {
        console.log('creatStore ACTION2');
        dispatch(modifyLoader(true));
        doPost(`core/marketing/kaspi/store`, body)
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

// Измнить пункт выдачи
export const updateStore = (body, getList) => {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doPut(`core/marketing/kaspi/store`, body)
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

// Удалить пункт выдачи
export const deleteStore = (storeId, cbFun) => {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doDelete(`core/marketing/kaspi/store?id=${storeId}`)
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                cbFun();
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
};

// Очистить пунктов выдачи
export const clearStoreList = () => {
    return function(dispatch) {
        dispatch({
            type: CLEAR_STORE_LIST,
        });
    };
};

// Получит список брендов в каспи
export const fetchKaspiBrands = () => {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doGet(`core/marketing/kaspi/brands`)
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                dispatch({
                    type: FETCH_KASPI_BRANDS,
                    data,
                });
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
};

// Получит список компании в каспи
export const fetchKaspiCompanies = () => {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doGet(`core/marketing/kaspi/companies`)
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                dispatch({
                    type: FETCH_KASPI_COMPANIES,
                    data,
                });
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
};

import { modifyLoader } from '../../../../general/loader/loader_action';
import { handleError } from '../../../../general/notification/notification_action';
import { doGet, doPut, doDelete, doPost } from '../../../../utils/apiActions';

export const CRM_KPI_FETCH_ITEMS = 'CRM_KPI_FETCH_ITEMS';
export const CRM_KPI_FETCH_INDICATORS = 'CRM_KPI_FETCH_INDICATORS';
export const CRM_KPI_BLANK_ITEM = 'CRM_KPI_BLANK_ITEM';
export const CRM_KPI_ITEM_UPDATED = 'CRM_KPI_ITEM_UPDATED';
export const CRM_KPI_ITEM_CREATED = 'CRM_KPI_ITEM_CREATED';
export const CRM_KPI_ITEM_DELETED = 'CRM_KPI_ITEM_DELETED';
export const CRM_KPI_SET_FOR_UPDATE = 'CRM_KPI_SET_FOR_UPDATE';

export const CRM_KPI_FORM_MODAL_TOGGLE = 'CRM_KPI_FORM_MODAL_TOGGLE';

export const CRM_KPI_CLEAR_STATE = 'CRM_KPI_CLEAR_STATE';

export function fetchItems(params) {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doGet(`core/crm/kpi/setting`, params)
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                dispatch({
                    type: CRM_KPI_FETCH_ITEMS,
                    items: data.items,
                    meta: data.meta,
                });
            })
            .catch(e => {
                dispatch(modifyLoader(false));
                handleError(e, dispatch);
            });
    };
}

export function fetchIndicators() {
    return function(dispatch) {
        doGet(`core/crm/kpi/setting/indicators`)
            .then(({ data }) => {
                dispatch({
                    type: CRM_KPI_FETCH_INDICATORS,
                    payload: data,
                });
            })
            .catch(e => {
                handleError(e, dispatch);
            });
    };
}

export function blankItem() {
    return function(dispatch) {
        doGet(`core/crm/kpi/setting/blank`)
            .then(({ data }) => {
                dispatch({
                    type: CRM_KPI_BLANK_ITEM,
                    payload: data,
                });
            })
            .catch(e => {
                handleError(e, dispatch);
            });
    };
}

export function createItem(item) {
    return function(dispatch) {
        doPost(`core/crm/kpi/setting`, { ...item })
            .then(({ data }) => {
                dispatch({
                    type: CRM_KPI_ITEM_CREATED,
                    item: data,
                });
            })
            .catch(error => {
                handleError(error, dispatch);
            });
    };
}

export function deleteItem(id) {
    return function(dispatch) {
        doDelete(`core/crm/kpi/setting/${id}`)
            .then(({ data }) => {
                dispatch({
                    type: CRM_KPI_ITEM_DELETED,
                    item: data,
                });
            })
            .catch(error => {
                handleError(error, dispatch);
            });
    };
}

export function updateItem(item) {
    return function(dispatch) {
        doPut(`core/crm/kpi/setting`, { ...item })
            .then(({ data }) => {
                dispatch({
                    type: CRM_KPI_ITEM_UPDATED,
                    item: data,
                });
            })
            .catch(error => {
                handleError(error, dispatch);
            });
    };
}

export function toggleKpiSettingFormModal(flag) {
    return function(dispatch) {
        dispatch({
            type: CRM_KPI_FORM_MODAL_TOGGLE,
            payload: flag,
        });
    };
}

export function setForUpdate(item) {
    return function(dispatch) {
        dispatch({
            type: CRM_KPI_SET_FOR_UPDATE,
            payload: item,
        });
    };
}

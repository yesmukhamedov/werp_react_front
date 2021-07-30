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

export const fetchItems = params => {
  return dispatch => {
    dispatch(modifyLoader(true));
    doGet(`crm2/kpi-setting`, params)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: CRM_KPI_FETCH_ITEMS,
          payload: data,
        });
      })
      .catch(e => {
        dispatch(modifyLoader(false));
        handleError(e, dispatch);
      });
  };
};

export const fetchIndicators = () => {
  return dispatch => {
    doGet(`crm/kpi/setting/indicators`)
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
};

export const blankItem = () => {
  return dispatch => {
    doGet(`crm/kpi/setting/blank`)
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
};

export const createItem = (item, refresh) => {
  return dispatch => {
    doPost(`crm2/kpi-setting`, { ...item })
      .then(({ data }) => {
        dispatch({
          type: CRM_KPI_ITEM_CREATED,
          item: data,
        });
        refresh();
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
};

export const deleteItem = (id, refresh) => {
  return dispatch => {
    doDelete(`crm2/kpi-setting/${id}`)
      .then(({ data }) => {
        dispatch({
          type: CRM_KPI_ITEM_DELETED,
          item: data,
        });
        refresh();
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
};

export const updateItem = item => {
  return dispatch => {
    doPut(`crm2/kpi-setting`, { ...item })
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
};

export const toggleKpiSettingFormModal = flag => {
  return dispatch => {
    dispatch({
      type: CRM_KPI_FORM_MODAL_TOGGLE,
      payload: flag,
    });
  };
};

export const setForUpdate = item => {
  return dispatch => {
    dispatch({
      type: CRM_KPI_SET_FOR_UPDATE,
      payload: item,
    });
  };
};

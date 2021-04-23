import { modifyLoader } from '../../../../general/loader/loader_action';
import { handleError } from '../../../../general/notification/notification_action';
import browserHistory from '../../../../utils/history';
import { doGet, doPut, doDelete } from '../../../../utils/apiActions';

export const CRM_DEMO_FETCH_CURRENT = 'CRM_DEMO_FETCH_CURRENT';
export const CRM_DEMO_FETCH_ARCHIVE = 'CRM_DEMO_FETCH_ARCHIVE';

// Load Single Demo By Id
export const CRM_DEMO_FETCH_SINGLE = 'CRM_DEMO_FETCH_SINGLE';
export const CRM_DEMO_UPDATE = 'CRM_DEMO_UPDATE';

export const CRM_DEMO_FETCH_CHILD_RECOS = 'CRM_DEMO_FETCH_CHILD_RECOS';
/**
 *
 */
export const CRM_DEMO_FETCH_RESULTS = 'CRM_DEMO_FETCH_RESULTS';
export const CRM_DEMO_FETCH_REASONS = 'CRM_DEMO_FETCH_REASONS';
export const CRM_DEMO_FETCH_GROUP_DEALERS = 'CRM_DEMO_FETCH_GROUP_DEALERS';

export const CRM_DEMO_CLEAR_STATE = 'CRM_DEMO_CLEAR_STATE';

export const CRM_DEMO_UPDATE_MODAL_TOGGLE = 'CRM_DEMO_UPDATE_MODAL_TOGGLE';
export const CRM_DEMO_CREATE_MODAL_TOGGLE = 'CRM_DEMO_CREATE_MODAL_TOGGLE';

export const updateDemo = demo => {
  return dispatch => {
    doPut(`crm/demo/${demo.id}`, { ...demo })
      .then(({}) => {
        dispatch({
          type: CRM_DEMO_UPDATE,
          item: demo,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
};

export const fetchDemo = id => {
  return dispatch => {
    dispatch(modifyLoader(true));
    doGet(`crm/demo/${id}`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: CRM_DEMO_FETCH_SINGLE,
          demo: data.demo,
          recommender: data.recommender,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
};

export const fetchDemoChildRecos = id => {
  return dispatch => {
    dispatch(modifyLoader(true));
    doGet(`crm/demo/${id}/child-recos`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: CRM_DEMO_FETCH_CHILD_RECOS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

export const fetchDemoCurrentData = () => {
  return dispatch => {
    dispatch(modifyLoader(true));
    doGet(`crm/demo/current`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: CRM_DEMO_FETCH_CURRENT,
          items: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
};

export const fetchDemoArchive = q => {
  return dispatch => {
    dispatch(modifyLoader(true));
    doGet(`crm/demo/archive?${q}`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: CRM_DEMO_FETCH_ARCHIVE,
          items: data.items,
          meta: data.meta,
        });
      })
      .catch(e => {
        handleError(e, dispatch);
      });
  };
};

export const fetchSoldDemos = params => {
  return dispatch => {
    dispatch(modifyLoader(true));
    doGet('crm/demo/sold-demos', params)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: CRM_DEMO_FETCH_ARCHIVE,
          items: data.items,
          meta: data.meta,
        });
      })
      .catch(e => {
        handleError(e, dispatch);
      });
  };
};

export const fetchDemoResults = () => {
  return dispatch => {
    doGet(`crm/demo/results`)
      .then(({ data }) => {
        dispatch({
          type: CRM_DEMO_FETCH_RESULTS,
          items: data,
        });
      })
      .catch(e => {
        handleError(e, dispatch);
      });
  };
};

export const fetchGroupDealers = () => {
  return dispatch => {
    dispatch(modifyLoader(true));
    doGet(`hr/pyramid/crm/group-dealers`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        const loaded = data.map(item => ({
          key: item.staffId,
          text: `${item.lastname} ${item.firstname}`,
          value: item.staffId,
        }));
        loaded.unshift({
          key: 0,
          text: '',
          value: 0,
        });
        dispatch({
          type: CRM_DEMO_FETCH_GROUP_DEALERS,
          items: loaded,
        });
      })
      .catch(e => {
        handleError(e, dispatch);
      });
  };
};

export const fetchReasons = () => {
  return dispatch => {
    doGet(`reference/reasons/0`)
      .then(({ data }) => {
        dispatch({
          type: CRM_DEMO_FETCH_REASONS,
          items: data,
        });
      })
      .catch(e => {
        handleError(e, dispatch);
      });
  };
};

export const deleteDemo = demoId => {
  return dispatch => {
    doDelete(`crm/demo/${demoId}`)
      .then(response => {
        browserHistory.push('/crm/demo/current');
      })
      .catch(e => {
        handleError(e, dispatch);
      });
  };
};

export const toggleDemoUpdateModal = flag => {
  return {
    type: CRM_DEMO_UPDATE_MODAL_TOGGLE,
    payload: flag,
  };
};

export const toggleDemoCreateModal = flag => {
  return dispatch => {
    dispatch({
      type: CRM_DEMO_CREATE_MODAL_TOGGLE,
      payload: flag,
    });
  };
};

export const clearState = () => {
  return {
    type: CRM_DEMO_CLEAR_STATE,
  };
};

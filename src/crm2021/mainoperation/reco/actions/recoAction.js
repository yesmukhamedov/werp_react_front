import {
  handleError,
  notify,
} from '../../../../general/notification/notification_action';
import { modifyLoader } from '../../../../general/loader/loader_action';
import browserHistory from '../../../../utils/history';
import {
  doGet,
  doGet2,
  doPut2,
  doPut,
  doDelete,
  doPost2,
  doPost,
  doDelete2,
} from '../../../../utils/apiActions';

/**
 * Страница Текущие рекомендации
 */
export const CRM_RECO_FETCH_CURRENT_USED = 'CRM_RECO_FETCH_CURRENT_USED';
export const CRM_RECO_FETCH_CURRENT_NEW = 'CRM_RECO_FETCH_CURRENT_NEW';
export const CRM_RECO_FETCH_CURRENT_DEMO_DONE =
  'CRM_RECO_FETCH_CURRENT_DEMO_DONE';
export const CRM_RECO_FETCH_CURRENT_MOVED = 'CRM_RECO_FETCH_CURRENT_MOVED';

// After checked
export const CRM_RECO_CHECKED_PHONE_NUMBER = 'CRM_RECO_CHECKED_PHONE_NUMBER';
// Before check
export const CRM_RECO_CHECKING_PHONE_NUMBER = 'CRM_RECO_CHECKING_PHONE_NUMBER';

/**
 *
 */
export const CRM_RECO_FETCH_ARCHIVE = 'CRM_RECO_FETCH_ARCHIVE';

export const CRM_RECO_FETCH_STATUSES = 'CRM_RECO_FETCH_STATUSES';

export const CRM_CALL_FETCH_RESULTS = 'CRM_CALL_FETCH_RESULTS';
export const CRM_FETCH_REASONS = 'CRM_FETCH_REASONS';

export const CRM_RECO_CLEAR_STATE = 'CRM_RECO_CLEAR_STATE';

export const CRM_RECO_FETCH_SINGLE = 'CRM_RECO_FETCH_SINGLE';
export const CRM_RECO_UPDATE_MODAL_TOGGLE = 'CRM_RECO_UPDATE_MODAL_TOGGLE';

export const CRM_RECO_UPDATE = 'CRM_RECO_UPDATE';
export const CRM_FETCH_PHONE_NUMBER_HISTORY = 'CRM_FETCH_PHONE_NUMBER_HISTORY';

export const CRM_RECO_ITEM_BLANKED = 'CRM_RECO_ITEM_BLANKED';
export const CRM_RECO_BAD_REQUEST = 'CRM_RECO_BAD_REQUEST';

export const CRM_FETCH_PHONE_META = 'CRM_FETCH_PHONE_META';

export const NEW_CRM_SAVE_RECO = 'NEW_CRM_SAVE_RECO';

export const CRM_RECO_FETCH_CALL_DETAILS = 'CRM_RECO_FETCH_CALL_DETAILS';

export const fetchPhoneNumberHistory = phoneId => {
  return dispatch => {
    doGet(`crm/call/number-history/${phoneId}`)
      .then(({ data }) => {
        dispatch({
          type: CRM_FETCH_PHONE_NUMBER_HISTORY,
          payload: data,
        });
      })
      .catch(e => {
        handleError(e, dispatch);
      });
  };
};

export const updateReco = reco => {
  return dispatch => {
    doPut(`crm/reco/${reco.id}`, { ...reco })
      .then(({ data }) => {
        dispatch({
          type: CRM_RECO_UPDATE,
          payload: reco,
        });
      })
      .catch(e => {
        handleError(e, dispatch);
      });
  };
};

export const fetchSingleReco = id => {
  return dispatch => {
    dispatch(modifyLoader(true));
    doGet2(`reco/${id}`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: CRM_RECO_FETCH_SINGLE,
          payload: data,
        });
      })
      .catch(e => {
        handleError(e, dispatch);
      });
  };
};

export const fetchCallDetails = id => {
  return dispatch => {
    dispatch(modifyLoader(true));
    doGet2(`call/by-reco/${id}`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: CRM_RECO_FETCH_CALL_DETAILS,
          payload: data,
        });
      })
      .catch(e => {
        handleError(e, dispatch);
      });
  };
};

export const fetchRecoCurrentData = type => {
  return dispatch => {
    dispatch(modifyLoader(true));
    doGet2(`reco/current/${type}`)
      .then(({ data }) => {
        let actionType;
        switch (type) {
          case 'new':
            actionType = CRM_RECO_FETCH_CURRENT_NEW;
            break;

          case 'demo-done':
            actionType = CRM_RECO_FETCH_CURRENT_DEMO_DONE;
            break;

          case 'moved':
            actionType = CRM_RECO_FETCH_CURRENT_MOVED;
            break;

          default:
            actionType = CRM_RECO_FETCH_CURRENT_USED;
            break;
        }
        dispatch(modifyLoader(false));
        dispatch({
          type: actionType,
          items: data,
        });
      })
      .catch(e => {
        handleError(e, dispatch);
      });
  };
};

export const fetchCallResults = () => {
  return dispatch => {
    doGet(`crm/call/results`)
      .then(({ data }) => {
        const loaded = Object.keys(data).map(k => ({
          key: k,
          text: data[k],
          value: k,
        }));

        dispatch({
          type: CRM_CALL_FETCH_RESULTS,
          payload: loaded,
        });
      })
      .catch(e => {
        handleError(e, dispatch);
      });
  };
};

export const fetchRecoArchive = params => {
  return dispatch => {
    dispatch(modifyLoader(true));
    doGet2(`crm/reco/archive`, params)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: CRM_RECO_FETCH_ARCHIVE,
          items: data.items,
          meta: data.meta,
        });
      })
      .catch(e => {
        handleError(e, dispatch);
      });
  };
};

export const checkPhoneNumber = (staffId, phoneNumber) => {
  return dispatch => {
    dispatch({
      type: CRM_RECO_CHECKING_PHONE_NUMBER,
      payload: phoneNumber,
    });
    doGet(`crm/phone/check/${staffId}/${phoneNumber}`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: CRM_RECO_CHECKED_PHONE_NUMBER,
          payload: data,
        });
      })
      .catch(e => {
        // handleError(e,dispatch)
      });
  };
};

export const fetchRecoStatuses = () => {
  return dispatch => {
    doGet2(`reco/statuses`)
      .then(res => {
        const loaded = Object.keys(res.data).map(k => ({
          key: k,
          text: res.data[k],
          value: k,
        }));
        dispatch({
          type: CRM_RECO_FETCH_STATUSES,
          statuses: loaded,
        });
      })
      .catch(e => {
        handleError(e, dispatch);
      });
  };
};

export const fetchReasons = typeId => {
  return dispatch => {
    doGet(`reference/reasons/${typeId}`)
      .then(({ data }) => {
        const loaded = data.map(item => ({
          key: item.id,
          text: item.name,
          value: item.id,
        }));

        dispatch({
          type: CRM_FETCH_REASONS,
          items: loaded,
        });
      })
      .catch(e => {
        handleError(e, dispatch);
      });
  };
};

export const toggleRecoUpdateModal = flag => {
  return {
    type: CRM_RECO_UPDATE_MODAL_TOGGLE,
    payload: flag,
  };
};

export const deleteReco = recoId => {
  return dispatch => {
    doDelete2(`crm/reco/${recoId}`)
      .then(response => {
        browserHistory.push('/crm/reco/current');
      })
      .catch(e => {
        handleError(e, dispatch);
      });
  };
};

export const createRecoListNew = o => {
  return dispatch => doPost2(`crm/reco`, o);
};

export const blankReco = (context, contextId) => {
  return dispatch =>
    doGet(`crm/reco/create?context=${context}&contextId=${contextId}`);
};

// export const saveReco  =(body)=>{
//   return dispatch => {
//     console.log('NEW RECO ACTION')
//     dispatch(modifyLoader(true));
//     doPost(`reco`, body)
//     .then(({data}) => {
//       dispatch(modifyLoader(false));
//       dispatch({
//         type: NEW_CRM_SAVE_RECO,
//         payload: data,
//       });
//     })
//     .catch(e => {
//       dispatch(modifyLoader(false));
//       handleError(e, dispatch);
//     });
//   }

// }

export const createRecoList = (o, callBackOnError) => {
  return dispatch => {
    dispatch(modifyLoader(true));
    doPost(`crm/reco`, o)
      .then(() => {
        browserHistory.push('/crm/reco/current');
      })
      .catch(e => {
        if (callBackOnError) {
          callBackOnError();
        }
        dispatch(modifyLoader(false));
        if (e.response.status && e.response.status === 400) {
          const data = e.response.data;
          const errors = {};
          const errorsArr = [];
          for (const k in data) {
            const temp = data[k].split(':');
            if (temp[1] && temp[0] && typeof temp[1] !== 'undefined') {
              errors[temp[0]] = temp[1];
              errorsArr.push(temp[1]);
            } else {
              errors.common = temp[0];
              errorsArr.push(temp[0]);
            }
          }
          dispatch({
            payload: errors,
            type: CRM_RECO_BAD_REQUEST,
          });

          dispatch(notify('error', errorsArr.join(', '), 'Ошибка'));
        } else {
          handleError(e, dispatch);
        }

        // handleError(e,dispatch)
      });
  };
};

export const blankRecoItem = () => {
  return dispatch => {
    dispatch(modifyLoader(true));
    doGet(`crm/reco/blank-reco-item`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          payload: data,
          type: CRM_RECO_ITEM_BLANKED,
        });
      })
      .catch(e => {
        dispatch(modifyLoader(false));
        dispatch(notify('error', e.response.data.message, 'Ошибка'));
      });
  };
};

export const fetchPhoneMeta = () => {
  return dispatch => {
    doGet(`crm/phone/meta`)
      .then(({ data }) => {
        dispatch({
          type: CRM_FETCH_PHONE_META,
          payload: data,
        });
      })
      .catch(e => {
        handleError(e, dispatch);
      });
  };
};

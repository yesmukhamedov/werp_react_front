import { doGet, doPut } from '../../../utils/apiActions';
import {
  handleError,
  notify,
} from '../../../general/notification/notification_action';
import { errorTableText } from '../../../utils/helpers';
import { modifyLoader } from '../../../general/loader/loader_action';

export const FETCH_SMES_LIST = 'FETCH_SMES_LIST';
export const FETCH_PAYMENT_OPTIONS = 'FETCH_PAYMENT_OPTIONS';
export const ACCEPT_PAYMENT = 'ACCEPT_PAYMENT';
export const CANCEL_PAYMENT = 'CANCEL_PAYMENT';

// const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
// const language = localStorage.getItem('language');

//SRLS список сервисов
export const fetchSmesList = id => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`service/smvs/${id}`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SMES_LIST,
          data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

export const fetchPaymentOptions = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`finance/mainoperation/fetchCashBankHkontsByBranch`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_PAYMENT_OPTIONS,
          data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};
export const acceptPayment = (param, successPayment) => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPut(`service/smes/acceptPayment?hkontS=${param.hkontS}&id=${param.id}`)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: ACCEPT_PAYMENT,
          data,
        });
        dispatch(notify('success', errorTableText(101)));
        successPayment();
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

export const cancelPayment = (id, toSmvs) => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doPut(`service/smes/cancel?id=${id}`)
      .then(({ data }) => {
        console.log('ACTION DATA', data);

        dispatch(modifyLoader(false));
        dispatch({
          type: CANCEL_PAYMENT,
          data,
        });
        toSmvs();
        dispatch(notify('success', errorTableText(101)));
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
        //dispatch(notify('error', errorTableText(133), errorTableText(132)));
      });
  };
};

import axios from 'axios';
import { ROOT_URL } from '../../utils/constants';
import { modifyLoader } from '../../general/loader/loader_action';
import {
  handleError,
  notify,
} from '../../general/notification/notification_action';

export const REF_CURRENT_TRANSACTIONS = 'REF_CURRENT_TRANSACTIONS';
export const TRANSACTION_UPDATE = 'TRANSACTION_UPDATE';
export const NEW_TRANSACTION = 'NEW_TRANSACTION';

export function fetchCurrentTransactions() {
  return function(dispatch) {
    dispatch(modifyLoader(false));
    axios
      .get(`${ROOT_URL}/api/dit/transactions/list`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        modifyLoader(false);
        dispatch({
          type: REF_CURRENT_TRANSACTIONS,
          items: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function newTransaction(newTr) {
  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const language = localStorage.getItem('language');
  return function(dispatch) {
    dispatch(modifyLoader(false));
    axios
      .post(`${ROOT_URL}/api/dit/transactions/list`, newTr, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data) {
          dispatch(
            notify(
              'success',
              errorTable[`104${language}`],
              errorTable[`101${language}`],
            ),
          );
          dispatch({
            type: NEW_TRANSACTION,
            payload: newTr,
          });
        } else {
          dispatch(
            notify(
              'info',
              errorTable[`133${language}`],
              errorTable[`132${language}`],
            ),
          );
        }
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

export function updateTransaction(transaction) {
  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const language = localStorage.getItem('language');
  return function(dispatch) {
    axios
      .put(
        `${ROOT_URL}/api/dit/transactions/list/update/${
          transaction.transaction_id
        }`,
        { ...transaction },
        {
          headers: {
            authorization: localStorage.getItem('token'),
          },
        },
      )
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        if (data) {
          dispatch(
            notify(
              'success',
              errorTable[`104${language}`],
              errorTable[`101${language}`],
            ),
          );
          dispatch({
            type: TRANSACTION_UPDATE,
            payload: transaction,
          });
        } else {
          dispatch(
            notify(
              'info',
              errorTable[`133${language}`],
              errorTable[`132${language}`],
            ),
          );
        }
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
}

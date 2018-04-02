/* jshint esversion: 6 */
import axios from 'axios';
import { ROOT_URL } from '../../../../utils/constants';
import { notify } from '../../../../general/notification/notification_action';

export const CONTRACT_LIST_DIRECTORIES = 'contract_list_directories';
export const CLEAR_CONSTRACT_LIST_STORE = 'clear_contract_list_store';
export const FOUND_CONTRACTS = 'found_contracts';
export const EDIT_CONTRACT_OPERATOR = 'edit_contract_operator';


function getOperators() {
  return axios.get(`${ROOT_URL}/api/reference/staff/operators`, {
    headers: { authorization: localStorage.getItem('token') },
  });
}

function getStates() {
  return axios.get(`${ROOT_URL}/api/call-center/out-calls/status`, {
    headers: { authorization: localStorage.getItem('token') },
  });
}

export function getDirectories(lang) {
  return (dispatch) => {
    axios.all([getOperators(), getStates()])
      .then(axios.spread(({ data: operatorList }, { data: stateList }) => {
        const operatorOpts = operatorList.map(item => ({
          key: item.id,
          value: item.id,
          text: `${item.lastName} ${item.firstName} ${item.patronymic}`,
        }));
        const stateOpts = stateList.map(item => ({
          key: item.id,
          value: item.id,
          text: item[lang],
        }));
        const directories = {
          operatorOptions: operatorOpts,
          stateOptions: stateOpts,
        };
        dispatch({
          type: CONTRACT_LIST_DIRECTORIES,
          payload: directories,
        });
      }))
      .catch((error) => {
        console.log('Error in ContractListPage', error);
        if (error.response) {
          dispatch(notify('error', error.response.data.message, 'Ошибка'));
        } else {
          Promise.resolve({ error }).then(response => dispatch(notify('error', error.response.data.message, 'Ошибка')));
        }
      });
  };
}

export function clearContractListStore() {
  return (dispatch) => {
    dispatch({ type: CLEAR_CONSTRACT_LIST_STORE });
  };
}

export function searchContracts(params) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/api/call-center/out-calls?${params}`, {
      headers: { authorization: localStorage.getItem('token') },
    })
      .then(({ data }) => {
        dispatch({
          type: FOUND_CONTRACTS,
          payload: data,
        });
      })
      .catch((error) => {
        console.log('ERROR in contract list search', error);
        if (error.response) {
          dispatch(notify('error', error.response.data.message, 'Ошибка'));
        } else {
          Promise.resolve({ error }).then(response => dispatch(notify('error', error.response.data.message, 'Ошибка')));
        }
      });
  };
}

export function editOperator(contractNumber, operatorId) {
  const o = {
    id: operatorId,
  };
  return (dispatch) => {
    axios.put(
      `${ROOT_URL}/api/call-center/out-calls/operator/${contractNumber}`,
      { operator: o },
      { headers: { authorization: localStorage.getItem('token') } },
    ).then(({ data }) => {
      dispatch({
        type: EDIT_CONTRACT_OPERATOR,
        payload: data,
      });
    })
      .catch((error) => {
        console.log('ERROR in operator edit', error);
        if (error.response) {
          dispatch(notify('error', error.response.data.message, 'Ошибка'));
        } else {
          Promise.resolve({ error }).then(response => dispatch(notify('error', error.response.data.message, 'Ошибка')));
        }
      });
  };
}

import axios from 'axios';
import {ROOT_URL} from '../../../utils/constants';
import { modifyLoader } from '../../../general/loader/loader_action';
import {handleError} from '../../../general/notification/notification_action';
import browserHistory from '../../../utils/history';

export const REF_CURRENT_TRANSACTIONS = 'REF_CURRENT_TRANSACTIONS';
export const TRANSACTION_UPDATE = 'TRANSACTION_UPDATE';
export const CREATE_TRANSACTION = 'CREATE_TRANSACTION';



export function fetchCurrentTransactions(){
    return function(dispatch){
        dispatch(modifyLoader(false));
        axios.get(`${ROOT_URL}/api/dit/transactions/list`,{
            headers: {
                authorization: localStorage.getItem('token')
            },
         })
            .then(({data}) => {
                (modifyLoader(false));
                dispatch({ 
                    type: REF_CURRENT_TRANSACTIONS,
                    items:data,
                })
            }).catch((error) => {
            handleError(error,dispatch)
        })
    }
}

export function createTransaction(newTr){
    return function (dispatch){
        axios.post(`${ROOT_URL}/api/dit/transactions/list`, newTr,{
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
        .then(({data}) => {
            dispatch(modifyLoader(false))
            dispatch({
                type: CREATE_TRANSACTION,
                payload: newTr
            })
        }).catch((error) => {
        dispatch(modifyLoader(false))
        handleError(error,dispatch)
    })
    }
}


export function updateTransaction(transaction) {
    return function (dispatch){
        axios.put(`${ROOT_URL}/api/dit/transactions/list/update/` + transaction.transaction_id, { ...transaction }, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then((response) => {
           dispatch({
                type: TRANSACTION_UPDATE,
                payload: transaction
            })
        }).catch(e => {
            handleError(e,dispatch)
        })
    }
}
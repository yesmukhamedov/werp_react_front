import axios from 'axios';
import {ROOT_URL} from '../../../utils/constants';
import { modifyLoader } from '../../../general/loader/loader_action';
import {handleError} from '../../../general/notification/notification_action'

import {LOG_WERKS_REQUEST_LIST_FETCHED,LOG_WERKS_REQUEST_BLANKED} from './logisticsActionTypes'

export function fetchWerksRequestsByStatus(status){
    return function(dispatch){
        axios.get(`${ROOT_URL}/api/logistics/werks-request/by-status/` + status, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then(({data}) => {
                dispatch({
                    type: LOG_WERKS_REQUEST_LIST_FETCHED,
                    payload: data
                });
            }).catch((error) => {
            handleError(error,dispatch)
        })
    }
}

export function blankWerksRequest(){
    return function(dispatch){
        axios.get(`${ROOT_URL}/api/logistics/werks-request/blank`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then(({data}) => {
                dispatch({
                    type: LOG_WERKS_REQUEST_BLANKED,
                    payload: data
                });
            }).catch((error) => {
            handleError(error,dispatch)
        })
    }
}


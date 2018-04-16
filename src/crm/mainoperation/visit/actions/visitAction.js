import axios from 'axios';
import {ROOT_URL} from '../../../../utils/constants';
import { handleError } from '../../../../general/notification/notification_action';
import { modifyLoader } from '../../../../general/loader/loader_action';
import browserHistory from '../../../../utils/history';

/**
 *
 */
export const CRM_VISIT_FETCH_ARCHIVE = 'CRM_VISIT_FETCH_ARCHIVE';
export const CRM_VISIT_CLEAR_STATE = 'CRM_VISIT_CLEAR_STATE';

export const CRM_VISIT_FETCH_SINGLE = 'CRM_VISIT_FETCH_SINGLE'
export const CRM_VISIT_DELETE = 'CRM_VISIT_DELETE'

export function fetchSingleVisit(id){
    return function (dispatch) {
        dispatch(modifyLoader(true))
        axios.get(`${ROOT_URL}/api/crm/visit/` + id, {
            headers: {
                authorization: localStorage.getItem('token')}
        }).then(({data}) => {
            dispatch(modifyLoader(false))
            dispatch({
                type:CRM_VISIT_FETCH_SINGLE,
                payload:data
            })
        }).catch(function (e) {
            handleError(e,dispatch)
        })
    }
}

export function deleteVisit(id){
    return function (dispatch) {
        dispatch(modifyLoader(true))
        axios.delete(`${ROOT_URL}/api/crm/visit/` + id, {
            headers: {
                authorization: localStorage.getItem('token')}
        }).then(({data}) => {
            dispatch(modifyLoader(false))
            browserHistory.push('/crm/visit/archive')
        }).catch(function (e) {
            dispatch(modifyLoader(false))
            handleError(e,dispatch)
        })
    }
}
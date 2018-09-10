import axios from 'axios';
import {ROOT_URL} from '../../../../utils/constants';
import { handleError } from '../../../../general/notification/notification_action'
import browserHistory from '../../../../utils/history';

export const HR_DOC_ITEMS_LOADED = 'HR_DOC_ITEMS_LOADED'
export const HR_DOC_SINGLE_ITEM_LOADED = 'HR_DOC_SINGLE_ITEM_LOADED'
export const HR_DOC_PAGE_LOADING = 'HR_DOC_PAGE_LOADING'
export const HR_DOC_SINGLE_ITEM_BLANKED = 'HR_DOC_SINGLE_ITEM_BLANKED'
export const HR_DOC_CREATED = 'HR_DOC_CREATED'
export const HR_DOC_ACTION_HANDLED = 'HR_DOC_ACTION_HANDLED'

export function fetchRecruitmentItems (statusId){
    return function (dispatch) {
        dispatch(setLoading(true))
        axios.get(`${ROOT_URL}/api/hr/document/recruitment/mydocs/` + statusId, {
            headers: {
                authorization: localStorage.getItem('token')}
        }).then(({data}) => {
            dispatch(setLoading(false))
            dispatch({
                type:HR_DOC_ITEMS_LOADED,
                payload:data
            })
        }).catch((e) => {
            dispatch(setLoading(false))
            handleError(e,dispatch)
        })
    }
}

export function fetchDocument (id){
    return function (dispatch) {
        dispatch(setLoading(true))
        axios.get(`${ROOT_URL}/api/hr/document/` + id, {
            headers: {
                authorization: localStorage.getItem('token')}
        }).then(({data}) => {
            dispatch(setLoading(false))
            dispatch({
                type:HR_DOC_SINGLE_ITEM_LOADED,
                payload: data
            })
        }).catch((e) => {
            dispatch(setLoading(false))
            handleError(e,dispatch)
        })
    }
}

export function blankDocument (type){
    return function (dispatch) {
        dispatch(setLoading(true))
        axios.get(`${ROOT_URL}/api/hr/document/blank/` + type, {
            headers: {
                authorization: localStorage.getItem('token')}
        }).then(({data}) => {
            dispatch(setLoading(false))
            dispatch({
                type:HR_DOC_SINGLE_ITEM_BLANKED,
                payload: data
            })
        }).catch((e) => {
            dispatch(setLoading(false))
            handleError(e,dispatch)
        })
    }
}

export function createDocument (document){
    return function (dispatch) {
        dispatch(setLoading(true))
        axios.post(`${ROOT_URL}/api/hr/document`, { ...document }, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(({data}) => {
            dispatch(setLoading(false))
            browserHistory.push('/hr/doc/view/' + data.id)
            // dispatch({
            //     type:HR_DOC_CREATED,
            //     payload: data
            // })
        }).catch((e) => {
            dispatch(setLoading(false))
            handleError(e,dispatch)
        })
    }
}

export function handleAction (document,actionType){
    return function (dispatch) {
        dispatch(setLoading(true))
        axios.put(`${ROOT_URL}/api/hr/document/handle-action/` + actionType,{...document}, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(({data}) => {
            dispatch(setLoading(false))
            window.document.location.reload(true);
        }).catch((e) => {
            dispatch(setLoading(false))
            handleError(e,dispatch)
        })
    }
}

export function setLoading(flag){
    return {
        type: HR_DOC_PAGE_LOADING,
        payload: flag
    }
}
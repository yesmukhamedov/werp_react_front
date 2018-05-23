import axios from 'axios';
import {ROOT_URL} from '../../../../utils/constants';
import { handleError} from '../../../../general/notification/notification_action';
import { modifyLoader } from '../../../../general/loader/loader_action';

export const CRM_REP_FETCH_ITEMS = 'CRM_REP_FETCH_ITEMS';
export const CRM_REP_FETCH_META = 'CRM_REP_FETCH_META';
export const CRM_REP_MODAL_TOGGLE = 'CRM_REP_MODAL_TOGGLE'
export const CRM_REP_UPDATE_DIRECTOR_NOTE = 'CRM_REP_UPDATE_DIRECTOR_NOTE'

export function fetchItems(id,params){
    return function (dispatch){
        dispatch(modifyLoader(true));
        axios.get(`${ROOT_URL}/api/crm/report/` + id,{
            headers: {
                authorization: localStorage.getItem('token')
            },
            params:params
        }).then(({data}) => {
            dispatch(modifyLoader(false));
            dispatch({
                type:CRM_REP_FETCH_ITEMS,
                payload:data
            })
        }).catch((e) => {
            dispatch(modifyLoader(false));
            handleError(e,dispatch)
        })
    }
}

export function fetchMeta(id){
    return function (dispatch){
        dispatch(modifyLoader(true));
        axios.get(`${ROOT_URL}/api/crm/report/meta/` + id,{
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(({data}) => {
            dispatch(modifyLoader(false));
            dispatch({
                type:CRM_REP_FETCH_META,
                payload:data
            })
        }).catch((e) => {
            dispatch(modifyLoader(false));
            handleError(e,dispatch)
        })
    }
}

export function updateDirectorNote(demoId,note){
    return function (dispatch){
        dispatch(modifyLoader(true));
        axios.put(`${ROOT_URL}/api/crm/report/note/` + demoId,{note:note},{
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(({data}) => {
            dispatch(modifyLoader(false));
            dispatch(toggleRepModal(false))
            dispatch({
                type:CRM_REP_UPDATE_DIRECTOR_NOTE,
                note: note,
                id: demoId
            })
        }).catch((e) => {
            dispatch(modifyLoader(false));
            handleError(e,dispatch)
        })
    }
}

export function toggleRepModal(flag){
    return {
        type: CRM_REP_MODAL_TOGGLE,
        payload: flag
    }
}
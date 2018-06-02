import axios from 'axios';
import {ROOT_URL} from '../../../../utils/constants';
import { handleError} from '../../../../general/notification/notification_action';
import { modifyLoader } from '../../../../general/loader/loader_action';

export const HR_REP_FETCH_ITEMS = 'HR_REP_FETCH_ITEMS';
export const HR_REP_FETCH_META = 'HR_REP_FETCH_META';
export const HR_REP_MODAL_TOGGLE = 'HR_REP_MODAL_TOGGLE'
export const HR_REP_UPDATE_DIRECTOR_NOTE = 'HR_REP_UPDATE_DIRECTOR_NOTE'

export const HR_REP_CLEAR_STATE = 'HR_REP_CLEAR_STATE'

export function fetchItems(id,params){
    return function (dispatch){
        dispatch(modifyLoader(true));
        axios.get(`${ROOT_URL}/api/hr/report/` + id,{
            headers: {
                authorization: localStorage.getItem('token')
            },
            params:params
        }).then(({data}) => {
            dispatch(modifyLoader(false));
            dispatch({
                type:HR_REP_FETCH_ITEMS,
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
        axios.get(`${ROOT_URL}/api/hr/report/meta/` + id,{
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(({data}) => {
            dispatch(modifyLoader(false));
            dispatch({
                type:HR_REP_FETCH_META,
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
        axios.put(`${ROOT_URL}/api/hr/report/note/` + demoId,{note:note},{
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(({data}) => {
            dispatch(modifyLoader(false));
            dispatch(toggleRepModal(false))
            dispatch({
                type:HR_REP_UPDATE_DIRECTOR_NOTE,
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
        type: HR_REP_MODAL_TOGGLE,
        payload: flag
    }
}

export function clearState(){
    return {
        type: HR_REP_CLEAR_STATE
    }
}
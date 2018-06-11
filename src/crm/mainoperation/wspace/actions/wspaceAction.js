import axios from 'axios';
import {ROOT_URL} from '../../../../utils/constants';
import { handleError } from '../../../../general/notification/notification_action';
import {MENU_BY_RECO,MENU_BY_DATE,MENU_MOVED,RECO_MODAL_ITEMS} from '../wspaceUtil'

export const WSP_RECO_LIST_MODAL_OPENED = 'WSP_RECO_LIST_MODAL_OPENED'
export const WSP_SET_CURRENT_RECOMMENDER = 'WSP_SET_CURRENT_RECOMMENDER'
export const WSP_FETCH_RECOS_BY_RECO = 'WSP_FETCH_RECOS_BY_RECO'
export const WSP_FETCH_RECOS_BY_DATE = 'WSP_FETCH_RECOS_BY_DATE'
export const WSP_FETCH_RECOS_MOVED = 'WSP_FETCH_RECOS_MOVED'
export const WSP_FETCH_DEMO_RECOS = 'WSP_FETCH_DEMO_RECOS'
export const WSP_FETCH_TODAY_CALLS = 'WSP_FETCH_TODAY_CALLS'
export const WSP_FETCH_TODAY_DEMOS = 'WSP_FETCH_TODAY_DEMOS'
export const WSP_LOADER_CHANGED = 'WSP_LOADER_CHANGED'

export function toggleRecoListModal (flag){
    return {
        type: WSP_RECO_LIST_MODAL_OPENED,
        payload: flag
    }
}

export function setCurrentRecommender(recommender){

    return {
        type: WSP_SET_CURRENT_RECOMMENDER,
        payload: recommender
    }
}

export function fetchRecosByReco(staffId){
    return function (dispatch){
        dispatch(modifyLoader(MENU_BY_RECO,true));
        axios.get(`${ROOT_URL}/api/crm/wspace/by-reco/` + staffId,{
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(({data}) => {
            dispatch(modifyLoader(MENU_BY_RECO,false));
            dispatch({
                key: MENU_BY_RECO,
                type: WSP_FETCH_RECOS_BY_RECO,
                payload: data
            })
        }).catch((e) => {
            dispatch(modifyLoader(MENU_BY_RECO,false));
            handleError(e,dispatch)
        })
    }
}

export function fetchRecosByDate(staffId){
    return function (dispatch){
        dispatch(modifyLoader(MENU_BY_DATE,true));
        axios.get(`${ROOT_URL}/api/crm/wspace/by-date/` + staffId,{
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(({data}) => {
            dispatch(modifyLoader(MENU_BY_DATE,false));
            dispatch({
                key: MENU_BY_DATE,
                type: WSP_FETCH_RECOS_BY_DATE,
                payload: data
            })
        }).catch((e) => {
            dispatch(modifyLoader(MENU_BY_DATE,false));
            handleError(e,dispatch)
        })
    }
}

export function fetchMovedRecos(staffId){
    return function (dispatch){
        dispatch(modifyLoader(MENU_MOVED,true));
        axios.get(`${ROOT_URL}/api/crm/wspace/moved/` + staffId,{
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(({data}) => {
            dispatch(modifyLoader(MENU_MOVED,false));
            dispatch({
                key: MENU_MOVED,
                type: WSP_FETCH_RECOS_MOVED,
                payload: data
            })
        }).catch((e) => {
            dispatch(modifyLoader(MENU_MOVED,false));
            handleError(e,dispatch)
        })
    }
}

export function fetchDemoRecos(demoId){
    return function (dispatch){
        dispatch(modifyLoader(RECO_MODAL_ITEMS,true));
        axios.get(`${ROOT_URL}/api/crm/wspace/demo-recommends/` + demoId,{
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(({data}) => {
            dispatch(modifyLoader(RECO_MODAL_ITEMS,false));
            dispatch({
                type: WSP_FETCH_DEMO_RECOS,
                payload: data
            })
        }).catch((e) => {
            dispatch(modifyLoader(RECO_MODAL_ITEMS,false));
            handleError(e,dispatch)
        })
    }
}

export function fetchTodayCalls(){
    return function (dispatch){
        //dispatch(modifyLoader(RECO_MODAL_ITEMS,true));
        axios.get(`${ROOT_URL}/api/crm/wspace/today-calls`,{
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(({data}) => {
            //dispatch(modifyLoader(RECO_MODAL_ITEMS,false));
            dispatch({
                type: WSP_FETCH_TODAY_CALLS,
                payload: data
            })
        }).catch((e) => {
            //dispatch(modifyLoader(RECO_MODAL_ITEMS,false));
            handleError(e,dispatch)
        })
    }
}

export function fetchTodayDemos(){
    return function (dispatch){
        //dispatch(modifyLoader(RECO_MODAL_ITEMS,true));
        axios.get(`${ROOT_URL}/api/crm/wspace/today-demos`,{
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(({data}) => {
            //dispatch(modifyLoader(RECO_MODAL_ITEMS,false));
            dispatch({
                type: WSP_FETCH_TODAY_DEMOS,
                payload: data
            })
        }).catch((e) => {
            //dispatch(modifyLoader(RECO_MODAL_ITEMS,false));
            handleError(e,dispatch)
        })
    }
}

export function archiveReco(recoId){
    return function (dispatch){
        dispatch(modifyLoader(true));
        axios.put(`${ROOT_URL}/api/crm/wspace/archive/reco/` + recoId,{},{
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(({data}) => {
            dispatch(modifyLoader(false));
        }).catch((e) => {
            dispatch(modifyLoader(false));
            handleError(e,dispatch)
        })
    }
}

function modifyLoader(key,payload) {
    return {
        type: WSP_LOADER_CHANGED,
        key: key,
        payload: payload
    }
}
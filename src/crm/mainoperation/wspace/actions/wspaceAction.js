import axios from 'axios';
import {ROOT_URL} from '../../../../utils/constants';
import { handleError } from '../../../../general/notification/notification_action';
import {MENU_BY_RECO,MENU_BY_DATE,MENU_MOVED,RECO_MODAL_ITEMS,MENU_CURRENT_DEMO,MENU_CURRENT_VISIT} from '../wspaceUtil'

export const WSP_RECO_LIST_MODAL_OPENED = 'WSP_RECO_LIST_MODAL_OPENED'
export const WSP_SET_CURRENT_RECOMMENDER = 'WSP_SET_CURRENT_RECOMMENDER'
export const WSP_FETCH_RECOS_BY_RECO = 'WSP_FETCH_RECOS_BY_RECO'
export const WSP_FETCH_RECOS_BY_DATE = 'WSP_FETCH_RECOS_BY_DATE'
export const WSP_FETCH_RECOS_MOVED = 'WSP_FETCH_RECOS_MOVED'
export const WSP_FETCH_DEMO_RECOS = 'WSP_FETCH_DEMO_RECOS'
export const WSP_FETCH_VISIT_RECOS = 'WSP_FETCH_VISIT_RECOS'
export const WSP_FETCH_TODAY_CALLS = 'WSP_FETCH_TODAY_CALLS'
export const WSP_FETCH_TODAY_DEMOS = 'WSP_FETCH_TODAY_DEMOS'
export const WSP_LOADER_CHANGED = 'WSP_LOADER_CHANGED'
export const WSP_FETCH_PHONE_NUMBER_HISTORY = 'WSP_FETCH_PHONE_NUMBER_HISTORY'
export const WSP_TOGGLE_PHONE_MODAL = 'WSP_TOGGLE_PHONE_MODAL'
export const WSP_SET_CURRENT_PHONE = 'WSP_SET_CURRENT_PHONE'
export const WSP_SAVED_CALL = 'WSP_SAVED_CALL'
export const WSP_FETCH_CURRENT_DEMOS = 'WSP_FETCH_CURRENT_DEMOS'
export const WSP_FETCH_CURRENT_VISITS = 'WSP_FETCH_CURRENT_VISITS'
export const WSP_HANDLE_FILTER = 'WSP_HANDLE_FILTER'
export const WSP_FETCH_KPI = 'WSP_FETCH_KPI'

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

export function fetchVisitRecos(visitId){
    return function (dispatch){
        dispatch(modifyLoader(RECO_MODAL_ITEMS,true));
        axios.get(`${ROOT_URL}/api/crm/wspace/visit-recommends/` + visitId,{
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(({data}) => {
            dispatch(modifyLoader(RECO_MODAL_ITEMS,false));
            dispatch({
                type: WSP_FETCH_VISIT_RECOS,
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
        dispatch(modifyLoader(WSP_FETCH_TODAY_CALLS,true));
        axios.get(`${ROOT_URL}/api/crm/wspace/today-calls`,{
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(({data}) => {
            dispatch(modifyLoader(WSP_FETCH_TODAY_CALLS,false));
            dispatch({
                type: WSP_FETCH_TODAY_CALLS,
                payload: data
            })
        }).catch((e) => {
            dispatch(modifyLoader(WSP_FETCH_TODAY_CALLS,false));
            handleError(e,dispatch)
        })
    }
}

export function fetchTodayDemos(){
    return function (dispatch){
        dispatch(modifyLoader(WSP_FETCH_TODAY_DEMOS,true));
        axios.get(`${ROOT_URL}/api/crm/wspace/today-demos`,{
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(({data}) => {
            dispatch(modifyLoader(WSP_FETCH_TODAY_DEMOS,false));
            dispatch({
                type: WSP_FETCH_TODAY_DEMOS,
                payload: data
            })
        }).catch((e) => {
            dispatch(modifyLoader(WSP_FETCH_TODAY_DEMOS,false));
            handleError(e,dispatch)
        })
    }
}

export function fetchKpi(year, month){
    return function (dispatch){
        dispatch(modifyLoader(WSP_FETCH_KPI,true));
        axios.get(`${ROOT_URL}/api/crm/wspace/kpi`,{
            headers: {
                authorization: localStorage.getItem('token')
            },
            params:{year: year, month: month}
        }).then(({data}) => {
            dispatch(modifyLoader(WSP_FETCH_KPI,false));
            dispatch({
                type: WSP_FETCH_KPI,
                payload: data
            })
        }).catch((e) => {
            dispatch(modifyLoader(WSP_FETCH_KPI,false));
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

export function fetchPhoneNumberHistory(phoneId){
    return function (dispatch) {
        dispatch(modifyLoader('PHONE_' + phoneId,true));
        axios.get(`${ROOT_URL}/api/crm/wspace/phone-info/` + phoneId, {
            headers: {
                authorization: localStorage.getItem('token')}
        }).then(({data}) => {
            dispatch(modifyLoader('PHONE_' + phoneId,false));
            dispatch({
                type:WSP_FETCH_PHONE_NUMBER_HISTORY,
                payload:data
            })
        }).catch((e) => {
            dispatch(modifyLoader('PHONE_' + phoneId,false));
            handleError(e,dispatch)
        })
    }
}

export function fetchCurrentDemos(staffId){
    return function (dispatch) {
        dispatch(modifyLoader(MENU_CURRENT_DEMO,true));
        axios.get(`${ROOT_URL}/api/crm/wspace/current-demos/` + staffId, {
            headers: {
                authorization: localStorage.getItem('token')}
        }).then(({data}) => {
            dispatch(modifyLoader(MENU_CURRENT_DEMO,false));
            dispatch({
                key: MENU_CURRENT_DEMO,
                type:WSP_FETCH_CURRENT_DEMOS,
                payload:data
            })
        }).catch((e) => {
            dispatch(modifyLoader(MENU_CURRENT_DEMO,false));
            handleError(e,dispatch)
        })
    }
}

export function fetchCurrentVisits(staffId){
    return function (dispatch) {
        dispatch(modifyLoader(MENU_CURRENT_VISIT,true));
        axios.get(`${ROOT_URL}/api/crm/wspace/current-visits/` + staffId, {
            headers: {
                authorization: localStorage.getItem('token')}
        }).then(({data}) => {
            dispatch(modifyLoader(MENU_CURRENT_VISIT,false));
            dispatch({
                key: MENU_CURRENT_VISIT,
                type:WSP_FETCH_CURRENT_VISITS,
                payload:data
            })
        }).catch((e) => {
            dispatch(modifyLoader(MENU_CURRENT_VISIT,false));
            handleError(e,dispatch)
        })
    }
}

export function saveCall(callForm){
    return function (dispatch) {
        dispatch(modifyLoader(WSP_SAVED_CALL,true));
        axios.post(`${ROOT_URL}/api/crm/wspace/save-call`, { ...callForm }, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(({data}) => {
                dispatch(modifyLoader(WSP_SAVED_CALL,false));
                dispatch({
                    type: WSP_SAVED_CALL,
                    payload: data
                })
            }).catch((e) => {
                dispatch(modifyLoader(WSP_SAVED_CALL,false));
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

export function togglePhoneModal(flag){
    return {
        type: WSP_TOGGLE_PHONE_MODAL,
        payload: flag
    }
}

export function setCurrentPhone(phone){
    return {
        type: WSP_SET_CURRENT_PHONE,
        payload: phone
    }
}

export function handleFilter(name,key,value){
    return {
        key: key,
        type: WSP_HANDLE_FILTER,
        name: name,
        value: value
    }
}
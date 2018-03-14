import axios from 'axios';
import {ROOT_URL} from '../../../../utils/constants';
import { modifyLoader } from '../../../../general/loader/loader_action';
import {handleError} from '../../../../general/notification/notification_action'
import browserHistory from '../../../../utils/history';

export const CRM_DEMO_FETCH_CURRENT = 'CRM_DEMO_FETCH_CURRENT';
export const CRM_DEMO_FETCH_ARCHIVE = 'CRM_DEMO_FETCH_ARCHIVE';

//Load Single Demo By Id
export const CRM_DEMO_FETCH_SINGLE = 'CRM_DEMO_FETCH_SINGLE';
export const CRM_DEMO_UPDATE = 'CRM_DEMO_UPDATE';
/**
 *
 */
export const CRM_DEMO_FETCH_RESULTS = 'CRM_DEMO_FETCH_RESULTS';
export const CRM_DEMO_FETCH_REASONS = 'CRM_DEMO_FETCH_REASONS';
export const CRM_DEMO_FETCH_GROUP_DEALERS = 'CRM_DEMO_FETCH_GROUP_DEALERS';

export const CRM_DEMO_CLEAR_STATE = 'CRM_DEMO_CLEAR_STATE';

export const CRM_DEMO_UPDATE_MODAL_TOGGLE = 'CRM_DEMO_UPDATE_MODAL_TOGGLE'
export const CRM_DEMO_CREATE_MODAL_TOGGLE = 'CRM_DEMO_CREATE_MODAL_TOGGLE'

export function updateDemo(demo){
    return function(dispatch){
        axios.put(`${ROOT_URL}/api/crm/demo/` + demo.id, { ...demo }, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then(({data}) => {
                dispatch({
                    type: CRM_DEMO_UPDATE,
                    item:demo
                });
            }).catch((error) => {
            handleError(error,dispatch)
        })
    }
}

export function fetchDemo(id){
    return function (dispatch){
        dispatch(modifyLoader(true));
        axios.get(`${ROOT_URL}/api/crm/demo/` + id, {
            headers: {
                authorization: localStorage.getItem('token')}
        }).then(({data}) => {
            dispatch(modifyLoader(false));
            dispatch({
                type: CRM_DEMO_FETCH_SINGLE,
                item:data['demo']
            });

        })
            .catch(error => {
                handleError(error,dispatch)
            });
    }
}


export function fetchDemoCurrentData(){

    return function (dispatch){
        dispatch(modifyLoader(true));
        axios.get(`${ROOT_URL}/api/crm/demo/current`, {
            headers: {
                authorization: localStorage.getItem('token')}
        }).then(({data}) => {
            dispatch(modifyLoader(false));
            dispatch({
                type: CRM_DEMO_FETCH_CURRENT,
                items:data
            });

        })
        .catch(error => {
            handleError(error,dispatch)
        });
    }
}

export function fetchDemoArchive(q){

    return function (dispatch){
        dispatch(modifyLoader(true));
        axios.get(`${ROOT_URL}/api/crm/demo/archive?` + q,{
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(({data}) => {
            dispatch(modifyLoader(false));
            dispatch({
                type:CRM_DEMO_FETCH_ARCHIVE,
                items:data['items'],
                meta:data['meta']
            })
        }).catch((e) => {
            handleError(e,dispatch)
        })
    }
}

export function fetchDemoResults(){

    return function (dispatch){
        axios.get(`${ROOT_URL}/api/crm/demo/results`,{
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(({data}) => {
            dispatch({
                type:CRM_DEMO_FETCH_RESULTS,
                items:data
            })
        }).catch((e) => {
            handleError(e,dispatch)
        })
    }
}

export function fetchGroupDealers(){

    return function (dispatch){
        dispatch(modifyLoader(true));
        axios.get(`${ROOT_URL}/api/hr/pyramid/crm/group-dealers`,{
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(({data}) => {
            dispatch(modifyLoader(false));
            let loaded = data.map((item) => {
                return {
                    key:item.staffId,
                    text:item.lastname + ' ' + item.firstname,
                    value:item.staffId
                }
            });
            loaded.unshift({
                key:0,
                text:'Не выбрано',
                value:0
            });
            dispatch({
                type:CRM_DEMO_FETCH_GROUP_DEALERS,
                items:loaded
            })
        }).catch((e) => {
            handleError(e,dispatch)
        })
    }
}

export function fetchReasons(){

    return function (dispatch){
        axios.get(`${ROOT_URL}/api/reference/reasons/0`,{
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(({data}) => {
            dispatch({
                type:CRM_DEMO_FETCH_REASONS,
                items:data
            })
        }).catch((e) => {
            handleError(e,dispatch)
        })
    }
}

export function deleteDemo(demoId){
    return function (dispatch) {
        axios.delete(`${ROOT_URL}/api/crm/demo/` + demoId,{
            headers: {
                authorization: localStorage.getItem('token')}
        }).then((response) => {
            browserHistory.push('/crm/demo/current')
        }).catch(e => {
            handleError(e,dispatch)
        })
    }
}

export function toggleDemoUpdateModal(flag){
    return {
        type: CRM_DEMO_UPDATE_MODAL_TOGGLE,
        payload: flag
    }
}

export function toggleDemoCreateModal(flag){
    return function (dispatch) {
        dispatch({
            type: CRM_DEMO_CREATE_MODAL_TOGGLE,
            payload: flag
        })
    }
}
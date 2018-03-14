import axios from 'axios';
import {ROOT_URL} from '../../../../utils/constants';
import { modifyLoader } from '../../../../general/loader/loader_action';
import {handleError} from '../../../../general/notification/notification_action'
import browserHistory from '../../../../utils/history';

export const HR_STAFF_CURRENT_STAFFS = 'HR_STAFF_CURRENT_STAFFS';
export const HR_STAFF_SINGLE_STAFF = 'HR_STAFF_SINGLE_STAFF';

export const HR_STAFF_FETCH_STAFF_SALARIES = 'HR_STAFF_FETCH_STAFF_SALARIES'
export const HR_STAFF_FETCH_STAFF_EXPENCES = 'HR_STAFF_FETCH_STAFF_EXPENCES'
export const HR_STAFF_FETCH_STAFF_OFF_DATA = 'HR_STAFF_FETCH_STAFF_OFF_DATA'

export const HR_STAFF_CLEAR_STATE = 'HR_STAFF_CLEAR_STATE';

export function fetchCurrentStaffs(params){
    return function(dispatch){
        dispatch(modifyLoader(true));
        axios.get(`${ROOT_URL}/api/hr/staff`,{
            headers: {
                authorization: localStorage.getItem('token')
            },
            params:params
        })
            .then(({data}) => {
                dispatch(modifyLoader(false));
                dispatch({
                    type:HR_STAFF_CURRENT_STAFFS,
                    items:data['items'],
                    meta:data['meta']
                })
            }).catch((error) => {
            handleError(error,dispatch)
        })
    }
}

export function createStaff(staff){
    return function (dispatch){
        dispatch(modifyLoader(true))
        axios.post(`${ROOT_URL}/api/hr/staff`, staff,{
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then(({data}) => {
                dispatch(modifyLoader(false))
                browserHistory.push('/hr/staff/view/' + data['staffId'])
            }).catch((error) => {
            dispatch(modifyLoader(false))
            handleError(error,dispatch)
        })
    }
}

export function fetchSingleStaff(staffId){
    return function(dispatch){
        dispatch(modifyLoader(true));
        axios.get(`${ROOT_URL}/api/hr/staff/` + staffId,{
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then(({data}) => {
                dispatch(modifyLoader(false));
                dispatch({
                    type:HR_STAFF_SINGLE_STAFF,
                    payload:data
                })
            }).catch((error) => {
            handleError(error,dispatch)
        })
    }
}

export function fetchStaffSalaries(staffId){
    return function(dispatch){
        axios.get(`${ROOT_URL}/api/hr/staff/` + staffId + `/salaries`, {
            headers: {
                authorization: localStorage.getItem('token')}
        }).then(({data}) => {
            dispatch({
                type:HR_STAFF_FETCH_STAFF_SALARIES,
                payload:data
            })
        }).catch((error) => {
            handleError(error,dispatch)
        })
    }
}

export function fetchStaffExpences(staffId){
    return function(dispatch){
        axios.get(`${ROOT_URL}/api/hr/staff/` + staffId + `/expenses`,{
            headers: {
                authorization: localStorage.getItem('token')}
        }).then(({data}) => {
            dispatch({
                type:HR_STAFF_FETCH_STAFF_EXPENCES,
                payload:data
            })
        }).catch((error) => {
            handleError(error,dispatch)
        })
    }
}

export function fetchStaffOffData(staffId){
    return function(dispatch){
        axios.get(`${ROOT_URL}/api/hr/staff/` + staffId + `/official-data`,{
            headers: {
                authorization: localStorage.getItem('token')}
        }).then(({data}) => {
            dispatch({
                type:HR_STAFF_FETCH_STAFF_OFF_DATA,
                payload:data
            })
        }).catch((error) => {
            handleError(error,dispatch)
        })
    }
}
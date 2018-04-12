import axios from 'axios';
import {ROOT_URL} from '../../../../utils/constants';
import { modifyLoader } from '../../../../general/loader/loader_action';
import {handleError} from '../../../../general/notification/notification_action'
import browserHistory from '../../../../utils/history';

export const HR_STAFF_CURRENT_STAFFS = 'HR_STAFF_CURRENT_STAFFS';
export const HR_STAFF_SINGLE_STAFF = 'HR_STAFF_SINGLE_STAFF';
export const HR_STAFF_ALL_STAFFS = 'HR_STAFF_ALL_STAFFS';

export const HR_STAFF_FETCH_STAFF_SALARIES = 'HR_STAFF_FETCH_STAFF_SALARIES'
export const HR_STAFF_FETCH_STAFF_EXPENCES = 'HR_STAFF_FETCH_STAFF_EXPENCES'
export const HR_STAFF_FETCH_STAFF_OFF_DATA = 'HR_STAFF_FETCH_STAFF_OFF_DATA'

export const HR_STAFF_LIST_MODAL_OPENED = 'HR_STAFF_LIST_MODAL_OPENED'

export const HR_STAFF_CLEAR_STATE = 'HR_STAFF_CLEAR_STATE';

export const HR_SALARY_FORM_MODAL_OPENED = 'HR_SALARY_FORM_MODAL_OPENED'
export const HR_SALARY_CREATED = 'HR_SALARY_CREATED'

export const HR_PYRAMID_FETCH_BRANCH_PYRAMIDS = 'HR_PYRAMID_FETCH_BRANCH_PYRAMIDS'

export const HR_PYRAMID_FETCH_PYRAMIDS = 'HR_PYRAMID_FETCH_PYRAMIDS'

export const HR_SET_SALARY_FOR_UPDATE = 'HR_SET_SALARY_FOR_UPDATE'

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

export function fetchAllStaffs(params){
    return function(dispatch){
        dispatch(modifyLoader(true));
        axios.get(`${ROOT_URL}/api/hr/staff/current-all`,{
            headers: {
                authorization: localStorage.getItem('token')
            },
            params:params
        })
            .then(({data}) => {
                dispatch(modifyLoader(false));
                dispatch({
                    type:HR_STAFF_ALL_STAFFS,
                    payload:data
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

export function createSalary(staffId,salary){
    return function (dispatch){
        dispatch(modifyLoader(true))
        axios.post(`${ROOT_URL}/api/hr/salary/` + staffId, salary,{
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then(({data}) => {
                dispatch(modifyLoader(false))
                dispatch({
                    type:HR_SALARY_CREATED,
                    payload:data
                })
            }).catch((error) => {
            dispatch(modifyLoader(false))
            //handleError(error,dispatch)
            console.log(error)
        })
    }
}

export function setSalaryForUpdate(salary){
    return {
        type:HR_SET_SALARY_FOR_UPDATE,
        payload:salary
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

export function fetchBlankSalary(staffId){
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

export function fetchBranchPyramids(branchId){
    return function(dispatch){
        axios.get(`${ROOT_URL}/api/hr/pyramid/tree/by-branch/` + branchId,{
            headers: {
                authorization: localStorage.getItem('token')}
        }).then(({data}) => {
            dispatch({
                type:HR_PYRAMID_FETCH_BRANCH_PYRAMIDS,
                payload:data
            })
        }).catch((error) => {
            handleError(error,dispatch)
        })
    }
}

export function fetchPyramids(){
    return function(dispatch){
        axios.get(`${ROOT_URL}/api/hr/pyramid/tree/by-branch/`,{
            headers: {
                authorization: localStorage.getItem('token')}
        }).then(({data}) => {
            dispatch({
                type:HR_PYRAMID_FETCH_PYRAMIDS,
                payload:data
            })
        }).catch((error) => {
            handleError(error,dispatch)
        })
    }
}



export function toggleStaffListModal(flag){
    return {
        type: HR_STAFF_LIST_MODAL_OPENED,
        payload: flag
    }
}

export function toggleSalaryFormModal(flag){
    return {
        type: HR_SALARY_FORM_MODAL_OPENED,
        payload: flag
    }
}
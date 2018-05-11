import axios from 'axios';
import {ROOT_URL} from '../../../../utils/constants';
import { modifyLoader } from '../../../../general/loader/loader_action';
import {handleError,notify} from '../../../../general/notification/notification_action'
import browserHistory from '../../../../utils/history';
import {getStaffDataPostUri,getStaffDataFetchUri,getStaffDataBlankUri} from '../../../hrUtil'

export const HR_STAFF_CURRENT_STAFFS = 'HR_STAFF_CURRENT_STAFFS';
export const HR_STAFF_SINGLE_STAFF = 'HR_STAFF_SINGLE_STAFF';
export const HR_STAFF_ALL_STAFFS = 'HR_STAFF_ALL_STAFFS';
export const HR_STAFF_FETCH_BLANK = 'HR_STAFF_FETCH_BLANK';

export const HR_STAFF_FETCH_STAFF_SALARIES = 'HR_STAFF_FETCH_STAFF_SALARIES'
export const HR_STAFF_FETCH_STAFF_EXPENCES = 'HR_STAFF_FETCH_STAFF_EXPENCES'
export const HR_STAFF_FETCH_STAFF_OFF_DATA = 'HR_STAFF_FETCH_STAFF_OFF_DATA'

export const HR_STAFF_LIST_MODAL_OPENED = 'HR_STAFF_LIST_MODAL_OPENED'

export const HR_STAFF_CLEAR_STATE = 'HR_STAFF_CLEAR_STATE';

export const HR_SALARY_FORM_MODAL_OPENED = 'HR_SALARY_FORM_MODAL_OPENED'
export const HR_SALARY_CREATED = 'HR_SALARY_CREATED'
export const HR_SALARY_UPDATED = 'HR_SALARY_UPDATED'

export const HR_PYRAMID_FETCH_BRANCH_PYRAMIDS = 'HR_PYRAMID_FETCH_BRANCH_PYRAMIDS'

export const HR_PYRAMID_FETCH_PYRAMIDS = 'HR_PYRAMID_FETCH_PYRAMIDS'

export const HR_SET_SALARY_FOR_UPDATE = 'HR_SET_SALARY_FOR_UPDATE'

export const HR_STAFF_DATA_BLANKED = 'HR_STAFF_DATA_BLANKED'
export const HR_STAFF_DATA_CREATED = 'HR_STAFF_DATA_CREATED'
export const HR_STAFF_DATA_FETCHED_LIST = 'HR_STAFF_DATA_FETCHED_LIST'

export const HR_STAFF_DATA_FORM_MODAL_FLAG = 'HR_STAFF_DATA_FORM_MODAL_FLAG'

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
                browserHistory.push('/hr/staff/view/' + data['id'])
            }).catch((error) => {
            dispatch(modifyLoader(false))
            dispatch(notify('error',error.response.data.message,'Ошибка'));
        })
    }
}

export function updateStaff(staff){
    return function (dispatch){
        dispatch(modifyLoader(true))
        axios.put(`${ROOT_URL}/api/hr/staff/` + staff.id, staff,{
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then(() => {
                dispatch(modifyLoader(false))
                browserHistory.push('/hr/staff/view/' + staff['id'])
            }).catch((error) => {
            dispatch(modifyLoader(false))
            dispatch(notify('error',error.response.data.message,'Ошибка'));
        })
    }
}

// export function updateExpence(exp){
//     return function (dispatch){
//         dispatch(modifyLoader(true))
//         axios.put(`${ROOT_URL}/api/hr/expence`, exp,{
//             headers: {
//                 authorization: localStorage.getItem('token')
//             }
//         })
//             .then(({data}) => {
//                 dispatch(modifyLoader(false))
//                 dispatch({
//                     type:HR_EXPENCE_UPDATED,
//                     payload:data
//                 })
//             }).catch((error) => {
//             dispatch(modifyLoader(false))
//             handleError(error,dispatch)
//         })
//     }
// }

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

export function fetchBlankStaff(){
    return function(dispatch){
        axios.get(`${ROOT_URL}/api/hr/staff/blank`,{
            headers: {
                authorization: localStorage.getItem('token')}
        }).then(({data}) => {
            dispatch({
                type:HR_STAFF_FETCH_BLANK,
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

export function toggleStaffDataFormModal(flag){
    return {
        type: HR_STAFF_DATA_FORM_MODAL_FLAG,
        payload: flag
    }
}

export function blankStaffData(staffId,activeData){
    let uri = `${ROOT_URL}/` + getStaffDataBlankUri(activeData) + staffId

    return function(dispatch){
        axios.get(uri,{
            headers: {
                authorization: localStorage.getItem('token')}
        }).then(({data}) => {
            dispatch({
                type:HR_STAFF_DATA_BLANKED,
                payload:data
            })
        }).catch((error) => {
            handleError(error,dispatch)
        })
    }
}

export function createStaffData(postData,activeData){
    let uri = `${ROOT_URL}` + getStaffDataPostUri(activeData)
    return function (dispatch){
        dispatch(modifyLoader(true))
        axios.post(uri, postData,{
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then(({data}) => {
                dispatch(modifyLoader(false))
                dispatch({
                    type:HR_STAFF_DATA_CREATED,
                    payload:data,
                    activeData: activeData
                })
            }).catch((error) => {
                dispatch(modifyLoader(false))
                handleError(error,dispatch)
        })
    }
}

export function fetchStaffData(staffId,activeData){
    let uri = `${ROOT_URL}` + getStaffDataFetchUri(activeData,staffId)
    return function(dispatch){
        axios.get(uri,{
            headers: {
                authorization: localStorage.getItem('token')}
        }).then(({data}) => {
            dispatch({
                type:HR_STAFF_DATA_FETCHED_LIST,
                payload:data,
                activeData: activeData
            })
        }).catch((error) => {
            handleError(error,dispatch)
        })
    }
}
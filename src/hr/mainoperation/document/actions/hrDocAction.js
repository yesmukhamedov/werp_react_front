import axios from 'axios';
import {ROOT_URL} from '../../../../utils/constants';
import { handleError } from '../../../../general/notification/notification_action'
import browserHistory from '../../../../utils/history';
import {DOC_ACTION_SEND,DOC_ACTION_APPROVE,DOC_ACTION_REJECT,DOC_ACTION_CANCEL,DOC_ACTION_ADD_SALARY,DOC_ACTION_SAVE,DOC_ACTION_ADD_APPROVER,DOC_ACTION_UPDATE} from '../../../hrUtil'

export const HR_DOC_ITEMS_LOADED = 'HR_DOC_ITEMS_LOADED'
export const HR_DOC_SINGLE_ITEM_LOADED = 'HR_DOC_SINGLE_ITEM_LOADED'
export const HR_DOC_PAGE_LOADING = 'HR_DOC_PAGE_LOADING'
export const HR_DOC_SINGLE_ITEM_BLANKED = 'HR_DOC_SINGLE_ITEM_BLANKED'
export const HR_DOC_CREATED = 'HR_DOC_CREATED'
export const HR_DOC_ACTION_HANDLED = 'HR_DOC_ACTION_HANDLED'
export const HR_DOC_LOCAL_UPDATE_DOC_ITEMS = 'HR_DOC_LOCAL_UPDATE_DOC_ITEMS'
export const HR_DOC_TOGGLE_ITEM_AMOUNT_EDIT_MODE = 'HR_DOC_TOGGLE_ITEM_AMOUNT_EDIT_MODE'
export const HR_DOC_SAVE_DOC_ITEMS = 'HR_DOC_SAVE_DOC_ITEMS'

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

export function handleAction (document,actionType, additionalData){
    switch (actionType){
        case DOC_ACTION_SEND:
            return sendDocument(document);

        case DOC_ACTION_APPROVE:
            return approveDocument(document);

        case DOC_ACTION_CANCEL:
            return cancelDocument(document);

        case DOC_ACTION_REJECT:
            return rejectDocument(document,additionalData);

        case DOC_ACTION_ADD_SALARY:
            return addSalary(document,additionalData);

        case DOC_ACTION_SAVE:
            if(document.id && parseInt(document.id,10) > 0){
                return updateDocument(document);
            }

            alert("Unkown Save");

        case DOC_ACTION_ADD_APPROVER:
            return addApprover(document,additionalData)

        case DOC_ACTION_UPDATE:
            window.location = '/hr/doc/update/' + document.id
            break

        default:
            alert('Unknown Action! ' + actionType)
    }
    return
    // return function (dispatch) {
    //     dispatch(setLoading(true))
    //     axios.put(`${ROOT_URL}/api/hr/document/handle-action/` + actionType,{...document}, {
    //         headers: {
    //             authorization: localStorage.getItem('token')
    //         }
    //     }).then(({data}) => {
    //         dispatch(setLoading(false))
    //         window.document.location.reload(true);
    //     }).catch((e) => {
    //         dispatch(setLoading(false))
    //         handleError(e,dispatch)
    //     })
    // }
}

/****DOCUMENT ACTIONS ***/
//Action Update
const updateDocument = (document) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        axios.put(`${ROOT_URL}/api/hr/document`, { ...document }, {
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
//Action Send
const sendDocument = (document) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        axios.put(`${ROOT_URL}/api/hr/document/action-send/` + document.id,{}, {
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

//Action Approve
const approveDocument = (document) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        axios.put(`${ROOT_URL}/api/hr/document/action-approve/` + document.id,{}, {
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

//Action Cancel
const cancelDocument = (document) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        axios.put(`${ROOT_URL}/api/hr/document/action-cancel/` + document.id,{}, {
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

//Action Refuse
const rejectDocument = (document, note) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        axios.put(`${ROOT_URL}/api/hr/document/action-reject/` + document.id,{...{note:note}}, {
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

//Action Add Salary
const addSalary = (document) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        axios.put(`${ROOT_URL}/api/hr/document/action-add-salary/` + document.id,{}, {
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

//Action Add Salary
const addApprover = (document, staff) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        axios.put(`${ROOT_URL}/api/hr/document/action-add-approver/` + document.id,{salaryId: staff.salaryId}, {
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

export function addAmount(document,items) {
    return function (dispatch) {
        dispatch(setLoading(true))
        axios.put(`${ROOT_URL}/api/hr/document/action-add-amount/` + document.id,items, {
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

/***END DOCUMENT ACTIONS*****/


export function setLoading(flag){
    return {
        type: HR_DOC_PAGE_LOADING,
        payload: flag
    }
}

export function toggleItemAmountEditMode(flag){
    return {
        type: HR_DOC_TOGGLE_ITEM_AMOUNT_EDIT_MODE,
        payload: flag
    }
}

export function localUpdateDocItems(items){
    return {
        type: HR_DOC_LOCAL_UPDATE_DOC_ITEMS,
        payload: items
    }
}
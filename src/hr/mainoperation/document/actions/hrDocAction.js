import axios from 'axios';
import {ROOT_URL} from '../../../../utils/constants';
import { handleError } from '../../../../general/notification/notification_action'

export const HR_DOC_ITEMS_LOADED = 'HR_DOC_ITEMS_LOADED'
export const HR_DOC_SINGLE_ITEM_LOADED = 'HR_DOC_SINGLE_ITEM_LOADED'

export function fetchRecruitmentItems (statusId){
    return function (dispatch) {
        axios.get(`${ROOT_URL}/api/hr/document/recruitment/mydocs/` + statusId, {
            headers: {
                authorization: localStorage.getItem('token')}
        }).then(({data}) => {
            dispatch({
                type:HR_DOC_ITEMS_LOADED,
                payload:data
            })
        }).catch((e) => {
            handleError(e,dispatch)
        })
    }
}

export function fetchDocument (id){
    return function (dispatch) {
        axios.get(`${ROOT_URL}/api/hr/document/` + id, {
            headers: {
                authorization: localStorage.getItem('token')}
        }).then(({data}) => {
            dispatch({
                type:HR_DOC_SINGLE_ITEM_LOADED,
                payload: data
            })
        }).catch((e) => {
            handleError(e,dispatch)
        })
    }
}
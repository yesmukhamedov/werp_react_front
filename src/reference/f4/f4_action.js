import axios from 'axios';
import {ROOT_URL} from '../../utils/constants';
import { notify } from '../../general/notification/notification_action';
import { modifyLoader } from '../../general/loader/loader_action';

export const F4_FETCH_MATNR_LIST = 'F4_FETCH_MATNR_LIST';
export const F4_CLEAR_MATNR_LIST = 'F4_CLEAR_MATNR_LIST';

export const F4_FETCH_POSITION_LIST = 'F4_FETCH_POSITION_LIST';
export const F4_CLEAR_POSITION_LIST = 'F4_CLEAR_POSITION_LIST';




export function f4FetchMatnrList(trans) {

    return function(dispatch) {

        axios.get(`${ROOT_URL}/api/reference/matnrList`, {
            headers: {
                authorization: localStorage.getItem('token')
            },
            params:{
                trans:trans
            }

            
        })
        .then(({data}) => {
            dispatch({
                type: F4_FETCH_MATNR_LIST,
                matnrList:data
            });
    
        })
        .catch(error => {
            console.log(error);              
                 
        });
    }    
}

export function f4ClearMatnrList() {
    const obj = {
        type: F4_CLEAR_MATNR_LIST
    };
    return obj;
}



export function f4FetchPositionList(trans) {

    return function(dispatch) {

        axios.get(`${ROOT_URL}/api/reference/positionList`, {
            headers: {
                authorization: localStorage.getItem('token')
            },
            params:{
                trans:trans
            }

            
        })
        .then(({data}) => {
            dispatch({
                type: F4_FETCH_POSITION_LIST,
                positionList:data
            });
    
        })
        .catch(error => {
            console.log(error);              
                 
        });
    }    
}


export function f4ClearPositionList() {
    const obj = {
        type: F4_CLEAR_POSITION_LIST
    };
    return obj;
}
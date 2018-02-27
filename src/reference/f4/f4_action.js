import axios from 'axios';
import {ROOT_URL} from '../../utils/constants';

export const F4_FETCH_MATNR_LIST = 'F4_FETCH_MATNR_LIST';
export const F4_CLEAR_MATNR_LIST = 'F4_CLEAR_MATNR_LIST';
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




export const F4_FETCH_POSITION_LIST = 'F4_FETCH_POSITION_LIST';
export const F4_CLEAR_POSITION_LIST = 'F4_CLEAR_POSITION_LIST';
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


export const F4_FETCH_CURRENCY_LIST = 'F4_FETCH_CURRENCY_LIST';
export const F4_CLEAR_CURRENCY_LIST = 'F4_CLEAR_CURRENCY_LIST';
export function f4FetchCurrencyList(trans) {

    return function(dispatch) {

        axios.get(`${ROOT_URL}/api/reference/currencyList`, {
            headers: {
                authorization: localStorage.getItem('token')
            },
            params:{
                trans:trans
            }

            
        })
        .then(({data}) => {
            dispatch({
                type: F4_FETCH_CURRENCY_LIST,
                currencyList:data
            });
    
        })
        .catch(error => {
            console.log(error);              
                 
        });
    }    
}


export function f4ClearCurrencyList() {
    const obj = {
        type: F4_CLEAR_CURRENCY_LIST
    };
    return obj;
}



export const F4_FETCH_BONUSTYPE_LIST = 'F4_FETCH_BONUSTYPE_LIST';
export const F4_CLEAR_BONUSTYPE_LIST = 'F4_CLEAR_BONUSTYPE_LIST';
export function f4FetchBonusTypeList(trans) {

    return function(dispatch) {

        axios.get(`${ROOT_URL}/api/reference/bonusTypeList`, {
            headers: {
                authorization: localStorage.getItem('token')
            },
            params:{
                trans:trans
            }

            
        })
        .then(({data}) => {
            dispatch({
                type: F4_FETCH_BONUSTYPE_LIST,
                bonusTypeList:data
            });
    
        })
        .catch(error => {
            console.log(error);              
                 
        });
    }    
}


export function f4ClearBonusTypeList() {
    const obj = {
        type: F4_CLEAR_BONUSTYPE_LIST
    };
    return obj;
}


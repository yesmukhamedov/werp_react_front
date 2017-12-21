/*jshint esversion: 6 */ 
import axios from 'axios';
import {browserHistory} from 'react-router';
import {ROOT_URL} from '../../utils/constants';
import {resetLocalStorage} from '../../utils/helpers';
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_USERS,
    USERS_ERROR
} from '../types';

export function signinUser({username, password}, language) {    
    return function(dispatch) {
        // Submit username/password to the server
        axios.post(`${ROOT_URL}/signin`, {username, password, language})
            .then(response => {
                // If request is good...                
                // - save the JWT token
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', username);
                // - update state to indicate user is authenticated
                dispatch(authUser(username));
                // - redirect to the route '/'
                browserHistory.push('/');
            })
            .catch(error => {
                // If request is bad...
                // - Show an error to the user
                if(error.response) {
                    dispatch(authError(error.response.data.message));
                } else if(error.stack) {
                    Promise.resolve({ error }).then(response => dispatch(authError(response.error.message)));                    
                } 
            });
    };
}

export function signoutUser() {
    return function(dispatch) {
        resetLocalStorage();
        dispatch({type: UNAUTH_USER});
        browserHistory.push('/');
    };
}

export function fetchUsers() {    
    return function(dispatch) {
        axios.get(`${ROOT_URL}/users`)
            .then(response =>{                            
                dispatch({
                    type: FETCH_USERS,
                    payload: response 
                });
            })
            .catch(error => {
                const msg = "Can't fetch all users. ";
                if(error.response) {
                    dispatch(usersError(msg + error.response.data.message));
                } else {
                    Promise.resolve({ error }).then(response => dispatch(usersError(msg + response.error.message)));  
                }    
                     
            });
    };        
}

export function usersError(error) {
    return {
        type: USERS_ERROR,
        payload: error
    };
}

export function authUser(username) {
    return {
        type: AUTH_USER,
        payload: username
    };
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}
import axios from 'axios';
import {browserHistory} from 'react-router';
import {ROOT_URL} from '../utils/constants';
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_USERS,
    USERS_ERROR,
    NEW_USER,
    DELETE_USER,
    UPDATE_USER,
    CHANGE_LANGUAGE
} from './types';

export function signinUser1({username, password}) {    
    return function(dispatch) {
        // Submit username/password to the server
        axios.post(`${ROOT_URL}/signin`, {username, password})
            .then(response => {
                // If request is good...
                // - update state to indicate user is authenticated
                dispatch(authUser(username));
                // - save the JWT token
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', username);
                // - redirect to the route './feature'
                browserHistory.push('/');
            })
            .catch(error => {
                // If request is bad...
                // - Show an error to the user
                if(error.response) {
                    dispatch(authError(error.response.data.message))
                } else if(error.stack) {
                    Promise.resolve({ error }).then(response => dispatch(authError(response.error.message)))                    
                } 
            });
    }
}

export function signinUser({username, password}) {  
    return function(dispatch) {
        // If request is good...
        // - update state to indicate user is authenticated
        dispatch(authUser(username));
        // - save the JWT token
        const token = "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MDQ3MDQ4NTMsInN1YiI6IjEyMyJ9.2pU_cZNy0dCsIoB0n-csDdoRNwcU8YxrWZZVg8s9lVg";
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        // - redirect to the route './feature'
        browserHistory.push('/');
    }
}

export function signupUser({username, password, firstName, lastName, profile}) {
    return function(dispatch) {
        const user = {username, password, profileId: profile};
        const contact = {firstName, lastName};
        axios.post(`${ROOT_URL}/signup`, {user, contact})
            .then(response =>{
                // - update state to indicate user is authenticated
                dispatch(authUser(username));
                // - save the JWT token
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', username);
                // - redirect to the route './'
                browserHistory.push('/');
            })
            .catch(error => {
                if(error.response) {
                    dispatch(authError(error.response.data.message))
                } else {
                    Promise.resolve({ error }).then(response => dispatch(authError(response.error.message)))  
                }                
            });
    }    
}

export function updateUser({username, password, firstName, lastName, profile}, id, contactId) {
    return function(dispatch) {
        const user = {userID: id, username, password, contactId, profileId: profile};
        const contact = {firstName, lastName, contactID: contactId};
        axios.put(`${ROOT_URL}/users/${id}`, {user, contact})
            .then(response =>{
                dispatch({
                    type: UPDATE_USER,
                    payload: "Successfully updated user: " + username                    
                });
            })
            .catch(error => {
                const msg = "Update user error. ";
                if(error.response) {
                    dispatch(usersError(msg + error.response.data.message))
                } else {
                    Promise.resolve({ error }).then(response => dispatch(usersError(msg + response.error.message)))  
                }                
            });
    }    
}

export function addUser({username, password, firstName, lastName, profile}) {
    return function(dispatch) {
        const user = {username, password, profileId: profile};
        const contact = {firstName, lastName};
        axios.post(`${ROOT_URL}/signup`, {user, contact})
            .then(response =>{
                dispatch({
                    type: NEW_USER,
                    payload: "Successfully added new user: " + username
                });
            })
            .catch(error => {
                const msg = "Add user error. ";
                if(error.response) {
                    dispatch(usersError(msg + error.response.data.message))
                } else {
                    Promise.resolve({ error }).then(response => dispatch(usersError(msg + response.error.message)))  
                }                
            });
    }    
}

export function signoutUser() {
    return function(dispatch) {
        dispatch({type: UNAUTH_USER});
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        browserHistory.push('/');
    }
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
                const msg = "Can't fetch all users. "
                if(error.response) {
                    dispatch(usersError(msg + error.response.data.message))
                } else {
                    Promise.resolve({ error }).then(response => dispatch(usersError(msg + response.error.message)))  
                }    
                     
            });
    }        
}

export function deleteUser(id) {
    return function(dispatch) {
        axios.delete(`${ROOT_URL}/users/${id}`)
            .then(response =>{
                const msg = "Successfully deleted user: " + response.data.username;
                dispatch({
                    type: DELETE_USER,
                    payload: msg
                });
            })
            .catch(error => {
                const msg = "User delete error. "
                if(error.response) {
                    dispatch(usersError(msg + error.response.data.message))
                } else {
                    Promise.resolve({ error }).then(response => dispatch(usersError(msg + response.error.message)))  
                }    
                    
            });
    }
    
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

export function changeLanguage(lang) {
    return function(dispatch) {
        dispatch({
            type: CHANGE_LANGUAGE,
            payload: lang
        });
    }
}
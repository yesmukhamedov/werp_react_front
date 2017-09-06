import {
    FETCH_USERS,
    USERS_ERROR,
    NEW_USER
} from '../actions/types'; 

export default function(state={}, action) {
    switch (action.type) {
        case FETCH_USERS:
            return {...state, newUserAdded: false, userList: [...action.payload.data]};
        case USERS_ERROR:
            return {...state, newUserAdded: false, error: action.payload}; 
        case NEW_USER:
            return {...state, username: action.payload, newUserAdded: true}; 
    }

    return state;
}
import {
    FETCH_USERS,
    USERS_ERROR,
    NEW_USER,
    DELETE_USER,
    UPDATE_USER
} from '../actions/types'; 

const INITIAL_STATE = { newUserAdded: false, deleteUser: false, updateUser: false, message: '', userList:[], showMsg: false, msgType: false };

export default function(state=INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_USERS:
            return {...state, newUserAdded: false, deleteUser: false, updateUser: false, userList: [...action.payload.data]};
        case USERS_ERROR:
            return {...state, newUserAdded: false, deleteUser: false, updateUser: false, showMsg: true,  message: action.payload, msgType: false}; 
        case NEW_USER:
            return {...state, newUserAdded: true,  deleteUser: false, updateUser: false, showMsg: true,  message: action.payload, msgType: true }; 
        case DELETE_USER:
            return {...state, newUserAdded: false, deleteUser: true,  updateUser: false, showMsg: true,  message: action.payload, msgType: true};
        case UPDATE_USER:
            return {...state, newUserAdded: false, deleteUser: false, updateUser: true,  showMsg: true,  message: action.payload, msgType: true};            
    }

    return state;
}
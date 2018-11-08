import {
    MGRU_FETCH_MESSAGE_GROUP_USERS,
  } from '../actions/MessageGroupUserAction';
  
  const messageGroupReducer = (prevState = {}, action) => {
    switch (action.type) {
      case MGRU_FETCH_MESSAGE_GROUP_USERS:
        return { ...prevState, messageGroupUserList: action.payload };
      default:
        break;
    }
    return prevState;
  };
  
  export default messageGroupReducer;
  
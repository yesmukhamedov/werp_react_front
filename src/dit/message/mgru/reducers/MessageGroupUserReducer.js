import {
  MGRU_FETCH_MESSAGE_GROUP_USERS,
  MGRU_FETCH_REFERENCES,
} from '../actions/MessageGroupUserAction';

const messageGroupUserReducer = (prevState = {}, action) => {
  switch (action.type) {
    case MGRU_FETCH_MESSAGE_GROUP_USERS:
      return { ...prevState, messageGroupUserList: action.payload };
    case MGRU_FETCH_REFERENCES:
      return {
        ...prevState,
        reference: { ...action.payload },
      };
    default:
      break;
  }
  return prevState;
};

export default messageGroupUserReducer;

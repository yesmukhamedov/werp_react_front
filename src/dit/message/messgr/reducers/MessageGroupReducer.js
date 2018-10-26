import {
  MESSGR_FETCH_MESSAGE_GROUPS,
} from '../actions/MessageGroupAction';

const messageGroupReducer = (prevState = {}, action) => {
  switch (action.type) {
    case MESSGR_FETCH_MESSAGE_GROUPS:
      return { ...prevState, messageGroupList: action.payload };
    default:
      break;
  }
  return prevState;
};

export default messageGroupReducer;

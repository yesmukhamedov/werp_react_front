import { combineReducers } from 'redux';
import messageGroupReducer from './MessageGroupReducer';

const messgrTransactionReducer = combineReducers({
  messgr: messageGroupReducer,
});

export default messgrTransactionReducer;

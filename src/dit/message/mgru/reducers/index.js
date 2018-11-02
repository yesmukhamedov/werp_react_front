import { combineReducers } from 'redux';
import messageGroupUserReducer from './MessageGroupUserReducer';

const mgruTransactionReducer = combineReducers({
  mgru: messageGroupUserReducer,
});

export default mgruTransactionReducer;

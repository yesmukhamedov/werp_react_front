import { combineReducers } from 'redux';
import DtskcReducer from './DtskcReducer';

const dtskcTransactionReducer = combineReducers({
  dtskc: DtskcReducer,
});

export default dtskcTransactionReducer;


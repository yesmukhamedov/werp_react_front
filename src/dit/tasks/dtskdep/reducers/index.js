import { combineReducers } from 'redux';
import dtskdepReducer from './dtskdepReducer';

const dtskdepTransactionReducer = combineReducers({
  dtskdep: dtskdepReducer,
});

export default dtskdepTransactionReducer;

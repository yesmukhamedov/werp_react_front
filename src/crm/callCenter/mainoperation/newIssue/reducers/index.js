import { combineReducers } from 'redux';
import newIssuePageReducer from './newIssuePageReducer';

const outCallsTransactionReducer = combineReducers({
  newIssuePage: newIssuePageReducer,
});

export default outCallsTransactionReducer;


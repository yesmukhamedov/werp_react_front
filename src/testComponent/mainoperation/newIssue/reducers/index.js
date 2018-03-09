import { combineReducers } from 'redux';
import newIssuePageReducer from './newIssuePageReducer';
import outCallDetailsPanelReducer from './outCallDetailsPanelReducer';

const outCallsTransactionReducer = combineReducers({
  newIssuePage: newIssuePageReducer,
  outCallDetailsPanel: outCallDetailsPanelReducer,
});

export default outCallsTransactionReducer;


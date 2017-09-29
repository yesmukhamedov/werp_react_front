import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import usersReducer from './users';
import langReducer from './lang_reducer';
import inboxReducer from './inbox';
import ditUserBranchReducer from './dit/userBranch_reducer';
import {
  UNAUTH_USER
} from '../actions/types';

const appReducer = combineReducers({
  form,
  auth: authReducer,
  users: usersReducer,
  locales: langReducer,
  ditUserBranch: ditUserBranchReducer,  
  inbox: inboxReducer
});

const rootReducer = (state, action) => {
  if (action.type === UNAUTH_USER) {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer;
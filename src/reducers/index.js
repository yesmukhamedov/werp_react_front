import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import usersReducer from './users';
import langReducer from './lang_reducer';
import inboxReducer from './inbox';
import ditUserBranchReducer from '../dit/userBranch/reducers/userBranch_reducer';
import treeMenuReducer from './tree_menu';
import notificationReducer from '../general/notification/notification_reducer';
import contractListReducer from '../testComponent/mainoperation/contractList/reducers/ContractListReducer';

import userInfoReducer from '../general/userInfo/userInfo_reducer';
import frcolnReducer from '../finance/report/frcoln/frcoln_reducer';
import loaderReducer from '../general/loader/loader_reducer';
import recoReducer from '../crm/mainoperation/reco/reducres/recoReducer';
import {
  UNAUTH_USER
} from '../actions/types';
import f4_reducer from '../reference/f4/f4_reducer';

const appReducer = combineReducers({
  form,
  auth: authReducer,
  users: usersReducer,
  locales: langReducer,
  ditUserBranch: ditUserBranchReducer,
  inbox: inboxReducer,
  menu: treeMenuReducer,
  notification: notificationReducer,
  contractList: contractListReducer,
  userInfo:userInfoReducer,
  frcoln:frcolnReducer,
  loader:loaderReducer,
  f4:f4_reducer,
  crmReco:recoReducer
});

const rootReducer = (state, action) => {
  if (action.type === UNAUTH_USER) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;

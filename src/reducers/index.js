import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import usersReducer from './users';
import langReducer from './lang_reducer';
import inboxReducer from './inbox';
import ditUserBranchReducer from '../dit/userBranch/reducers/userBranch_reducer';
import treeMenuReducer from './tree_menu';
import notificationReducer from '../general/notification/notification_reducer';
import contractListReducer from '../crm/callCenter/mainoperation/contractList/reducers/ContractListReducer';
import taskListReducer from '../crm/callCenter/mainoperation/taskList/reducers/TaskListReducer';
import taskReducer from '../crm/callCenter/mainoperation/task/reducers/TaskReducer';
import taskMonitorReducer from '../dit/tasks/dtskrep/reducers/TaskMonitorReducer';
import deptTaskListReducer from '../dit/tasks/dtskl/reducers/DeptTaskListReducer';

import outCallsTransactionReducer from '../crm/callCenter/mainoperation/newIssue/reducers';
import userInfoReducer from '../general/userInfo/userInfo_reducer';
import frcolnReducer from '../finance/report/frcoln/frcoln_reducer';
import loaderReducer from '../general/loader/loader_reducer';
import recoReducer from '../crm/mainoperation/reco/reducres/recoReducer';
import demoReducer from '../crm/mainoperation/demo/reducres/demoReducer';
import visitReducer from '../crm/mainoperation/visit/reducres/visitReducer';
import { UNAUTH_USER } from '../actions/types';
import f4_reducer from '../reference/f4/f4_reducer';
import hrStaffReducer from '../hr/mainoperation/staff/reducers/hrStaffReducer';
import hrPyramidReducer from '../hr/mainoperation/pyramid/reducers/hrPyramidReducer';
import hrb02Reducer from '../hr/mainoperation/hrb02/hrb02_reducer';
import kpiSettingReducer from '../crm/mainoperation/kpi/reducers/kpiSettingReducer';
import hrTimesheetReducer from '../hr/mainoperation/timesheet/reducers/hrTimesheetReducer';
import crmReportReducer from '../crm/report/general/reducers/crmReportReducer';
import hrReportReducer from '../hr/report/general/reducers/hrReportReducer';
import crmWspaceReducer from '../crm/mainoperation/wspace/reducers/wspaceReducer';
import faReducer from '../finance/fa_reducer';
import accountingReducer from '../accounting/accounting_reducer';
import dtskcTransactionReducer from '../general/dtskc/reducers';
import dtskdeoTranscationReducer from '../general/dtskdep/reducers';
import messgrTransactionReducer from '../dit/message/messgr/reducers';
import mgruTransactionReducer from '../dit/message/mgru/reducers';
import hrDocReducer from '../hr/mainoperation/document/reducers/hrDocReducer';
import documentReducer from '../documents/mainoperation/reducers/documentReducer'
import hrSalaryReducer from '../hr/mainoperation/salary/reducers/hrSalaryReducer'
import transactionReducer from '../dit/transactions/reducers/transactionReducer';

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
  taskList: taskListReducer,
  gtskeditTransaction: taskReducer,
  taskMonitor: taskMonitorReducer,
  deptTaskList: deptTaskListReducer,
  userInfo: userInfoReducer,
  frcoln: frcolnReducer,
  loader: loaderReducer,
  f4: f4_reducer,
  crmReco: recoReducer,
  crmDemo: demoReducer,
  crmVisit: visitReducer,
  outCalls: outCallsTransactionReducer,
  hrStaff: hrStaffReducer,
  hrb02: hrb02Reducer,
  fa: faReducer,
  crmKpiSetting: kpiSettingReducer,
  hrPyramid: hrPyramidReducer,
  hrTimesheet: hrTimesheetReducer,
  crmReportReducer: crmReportReducer,
  hrReportReducer: hrReportReducer,
  crmWspaceReducer: crmWspaceReducer,
  accounting: accountingReducer,
  dtskcTransaction: dtskcTransactionReducer,
  dtskdepTransaction: dtskdeoTranscationReducer,
  messgrTransaction: messgrTransactionReducer,
  mgruTransaction: mgruTransactionReducer,
  hrDocReducer: hrDocReducer,
  documentReducer: documentReducer,
  hrSalaryReducer: hrSalaryReducer,
  transactionReducer: transactionReducer
});

const rootReducer = (state, action) => {
  if (action.type === UNAUTH_USER) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;

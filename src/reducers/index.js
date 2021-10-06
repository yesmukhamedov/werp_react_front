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
import taskReducer from '../dit/tasks/dtskedit/reducers/TaskReducer';
import taskMonitorReducer from '../dit/tasks/dtskrep/reducers/TaskMonitorReducer';
import deptTaskListReducer from '../dit/tasks/dtskl/reducers/DeptTaskListReducer';
import outCallsTransactionReducer from '../crm/callCenter/mainoperation/newIssue/reducers';
import userInfoReducer from '../general/userInfo/userInfo_reducer';
import frcolnReducer from '../finance/report/frcoln/frcoln_reducer';
import loaderReducer from '../general/loader/loader_reducer';
import recoReducer from '../crm/mainoperation/reco/reducres/recoReducer';
import demoReducer from '../crm/mainoperation/demo/reducres/demoReducer';
import visitReducer from '../crm/mainoperation/visit/reducres/visitReducer';
import visitReducer2021 from '../crm2021/mainoperation/visit/reducers/visitReducer';
//import { UNAUTH_USER } from '../actions/types';
import f4_reducer from '../reference/f4/f4_reducer';

import hrStaffReducer from '../hr/mainoperation/staff/reducers/hrStaffReducer';
import hrPyramidReducer from '../hr/mainoperation/pyramid/reducers/hrPyramidReducer';
import hrb02Reducer from '../hr/mainoperation/hrb02/hrb02_reducer';
import kpiSettingReducer from '../crm/mainoperation/kpi/reducers/kpiSettingReducer';
import kpiSettingReducer2021 from '../crm2021/mainoperation/kpi/reducers/kpiSettingReducer';
import hrTimesheetReducer from '../hr/mainoperation/timesheet/reducers/hrTimesheetReducer';
import crmReportReducer from '../crm/report/general/reducers/crmReportReducer';
import hrReportReducer from '../hr/report/general/reducers/hrReportReducer';
import crmWspaceReducer from '../crm/mainoperation/wspace/reducers/wspaceReducer';
import crmWspaceReducer2021 from '../crm2021/mainoperation/wspace/reducers/wspaceReducer';
import faReducer from '../finance/fa_reducer';
import accountingReducer from '../accounting/accounting_reducer';
import dtskcTransactionReducer from '../dit/tasks/dtskc/reducers';
import dtskdepTranscationReducer from '../dit/tasks/dtskdep/reducers';
import messgrTransactionReducer from '../dit/message/messgr/reducers';
import mgruTransactionReducer from '../dit/message/mgru/reducers';
import hrDocReducer from '../hr/mainoperation/document/reducers/hrDocReducer';
import documentReducer from '../documents/mainoperation/reducers/documentReducer';
import hrSalaryReducer from '../hr/mainoperation/salary/reducers/hrSalaryReducer';
import ditReducer from '../dit/ditReducer';
import logisticsReducer from '../logistics/mainoperation/reducers/logisticsReducer';
import aesReducer from '../aes/aesReducer';
import hrPosReducer from '../hr/reference/position/positionReducer';
import marketingReducer from '../marketing/marketingReducer';
import hrReducer from '../hr/hr_reducer';
import callReducer from '../crm/mainoperation/call/reducers/callReducer';
import serviceReducer from '../service/serviceReducer';
import smcsReducer from '../service/mainoperation/smcs/smcsReducer';
import srefReducer from '../service/reference/srefReducer';
import serviceReportReducer from '../service/report/serviceReportReducer';
import smopccocReducer from '../service/mainoperation/smopccoc/smopccocReducer';
import smopccicReducer from '../service/mainoperation/smopccic/smopccicReducer';
import smopspReducer from '../service/mainoperation/smopsp/smopspReducer';
import smdisReducer from '../service/mainoperation/smdis/smdisReducer';
import srkpisoReducer from '../service/report/srkpiso/srkpisoReducer';
import srlsReducer from '../service/report/srls/srlsReducer';
import srlsmReducer from '../service/report/srlsm/srlsmReducer';
import smvsReducer from '../service/mainoperation/smvs/smvsReducer';
import smsrcusReducer from '../service/mainoperation/smsrcus/smsrcusReducer';
import smccaldReducer from '../service/mainoperation/smccald/smccaldReducer';
import smsetctReducer from '../service/mainoperation/smsetct/smsetctReducer';
import smecamReducer from '../service/mainoperation/smecam/smecamReducer';
import smvcaReducer from '../service/mainoperation/smvca/smvcaReducer';
import smecaReducer from '../service/mainoperation/smeca/smecaReducer';
import smesReducer from '../service/mainoperation/smes/smesReducer';
import smsetplpReducer from '../service/mainoperation/smsetplp/smsetplpReducer';
import smapplReducer from '../service/mainoperation/smappl/smapplReducer';
import hrslcReducer from '../hr/report/hrslc/hrslcReducer';
import srtbbReducer from '../service/report/srtbb/srtbbReducer';
import srqpwgsReducer from '../service/report/srqpwgs/srqpwgsReducer';
import foacReducer from '../finance/other/foac/foacReducer';
import srgfr from '../service/report/srgfr/srgfrReducer';
import exampleReducer from '../crm2021/example/exampleReducer';
import recoReducer2021 from '../crm2021/mainoperation/reco/reducers/recoReducer';
import demoReducer2021 from '../crm2021/mainoperation/demo/reducers/demoReducer';
import ccrefReducer from '../callcenter/reference/ccrefReducer';
import werpreferenceReducer from '../dit/werpreference/werpreferenceReducers';
import crmMpr2021Reducer from '../crm2021/report/mpr/reducer';
import mrkaspiReducer from '../marketing/report/mrKaspi/mrkaspiReducer';
import crmReleaseLog2021Reducer from '../crm2021/mainoperation/release/reducer';
import ccvrlReducer from '../callcenter/mainoperation/ccvrl/reducer';
import frep3Reducer from '../finance/report/frep3/frep3Reducer';

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
    crmReportReducer,
    hrReportReducer,
    crmWspaceReducer,
    crmWspaceReducer2021,
    accounting: accountingReducer,
    dtskcTransaction: dtskcTransactionReducer,
    dtskdepTransaction: dtskdepTranscationReducer,
    messgrTransaction: messgrTransactionReducer,
    mgruTransaction: mgruTransactionReducer,
    hrDocReducer,
    documentReducer,
    hrSalaryReducer,
    ditReducer,
    logisticsReducer,
    aesReducer,
    hrPosReducer,
    marketing: marketingReducer,
    hr: hrReducer,
    callReducer,
    serviceReducer,
    smcsReducer,
    srefReducer,
    serviceReportReducer,
    smopccocReducer,
    smopccicReducer,
    smopspReducer,
    smdisReducer,
    srkpisoReducer,
    srlsReducer,
    srlsmReducer,
    smvsReducer,
    smsrcusReducer,
    smccaldReducer,
    smsetctReducer,
    smecamReducer,
    smvcaReducer,
    smecaReducer,
    smesReducer,
    smsetplpReducer,
    smapplReducer,
    hrslcReducer,
    srtbbReducer,
    srqpwgsReducer,
    foacReducer,
    srgfrReducer: srgfr,
    exampleReducer,
    crmReco2021: recoReducer2021,
    crmDemo2021: demoReducer2021,
    crmVisit2021: visitReducer2021,
    crmKpiSetting2021: kpiSettingReducer2021,
    ccrefReducer,
    werpreferenceReducer,
    crmMpr2021Reducer,
    crmReleaseLog2021Reducer,
    ccvrlReducer,
    frep3Reducer,
});

const rootReducer = (state, action) => {
    // if (action.type === UNAUTH_USER) {
    //   state = undefined;
    // }

    return appReducer(state, action);
};

export default rootReducer;

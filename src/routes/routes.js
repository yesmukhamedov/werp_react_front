import React from 'react';
import { Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import RequireAuth from '../components/Auth/require_auth';
import MainPanel from '../components/MainPanel/MainPanel';
import Signin from '../components/Auth/Signin';
import Signout from '../components/Auth/Signout';
import persistPath from './PersistPath';

import ForbiddenPage from '../general/forbidden';
import LoadingPage from '../general/LoadingPage';
import { AsyncHrDocAllDocsPage } from '../hr/hrLoader';

const AsyncSettings = Loadable({
  loader: () =>
    import(
      '../components/UserSettings/Settings' /* webpackChunkName: "Settings" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncSerrep1 = Loadable({
  loader: () =>
    import(
      '../service/report/serrep1/serrep1' /* webpackChunkName: "serrep1" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncSerrep2 = Loadable({
  loader: () =>
    import(
      '../service/report/serrep2/serrep2' /* webpackChunkName: "serrep2" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncSerrep3 = Loadable({
  loader: () =>
    import(
      '../service/report/serrep3/serrep3' /* webpackChunkName: "serrep3" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncSerrep4 = Loadable({
  loader: () =>
    import(
      '../service/report/serrep4/serrep4' /* webpackChunkName: "serrep4" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncKpiReportPage = Loadable({
  loader: () =>
    import(
      '../crm/report/kpi/components/KpiReportPage' /* webpackChunkName: "KpiReportPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncKpiRatingReportPage = Loadable({
  loader: () =>
    import(
      '../crm/report/kpi/components/KpiRatingReportPage' /* webpackChunkName: "KpiRatingReportPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncPrcltgs = Loadable({
  loader: () =>
    import(
      '../marketing/mainoperation/prcltgs/prcltgs' /* webpackChunkName: "prcltgs" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncAccountabilityStaffDetailPage = Loadable({
  loader: () =>
    import(
      '../logistics/report/accountabilityStaff/AccountabilityStaffDetailPage' /* webpackChunkName: "AccountabilityStaffDetailPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncAccountabilityStaffListPage = Loadable({
  loader: () =>
    import(
      '../logistics/report/accountabilityStaff/AccountabilityStaffListPage' /* webpackChunkName: "AccountabilityStaffListPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncSpNewPage = Loadable({
  loader: () =>
    import(
      '../service/mainoperation/spNew/components/spNewPage' /* webpackChunkName: "spNewPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncSpViewPage = Loadable({
  loader: () =>
    import(
      '../service/mainoperation/spView/components/spViewPage' /* webpackChunkName: "spViewPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncSpListPage = Loadable({
  loader: () =>
    import(
      '../service/mainoperation/spList/components/spListPage' /* webpackChunkName: "spListPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncContractListPage = Loadable({
  loader: () =>
    import(
      '../crm/callCenter/mainoperation/contractList/components/ContractListPage' /* webpackChunkName: "ContractListPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncSOContractListPage = Loadable({
  loader: () =>
    import(
      '../crm/callCenter/mainoperation/contractList/components/SeniorOperatorPage/ContractListPage' /* webpackChunkName: "SOContractListPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncTaskListPage = Loadable({
  loader: () =>
    import(
      '../crm/callCenter/mainoperation/taskList/components/TaskListPage' /* webpackChunkName: "TaskListPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncTaskPage = Loadable({
  loader: () =>
    import(
      '../dit/tasks/dtskedit/components/TaskPageContainer' /* webpackChunkName: "TaskPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncOutCallTaskPage = Loadable({
  loader: () =>
    import(
      '../crm/callCenter/mainoperation/newIssue/components/TaskPanel/TaskView/TaskViewContainer' /* webpackChunkName: "OutCallTaskPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncTaskMonitorPage = Loadable({
  loader: () =>
    import(
      '../dit/tasks/dtskrep/components/TaskMonitorContainer' /* webpackChunkName: "TaskMonitorPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncDeptTaskListPage = Loadable({
  loader: () =>
    import(
      '../dit/tasks/dtskl/components/DeptTaskListContainer' /* webpackChunkName: "DepTaskListPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncTaskRecEditPage = Loadable({
  loader: () =>
    import(
      '../dit/tasks/dtskl/components/DeptTaskListTable/RecipientEdit/RecipientEditContainer' /* webpackChunkName: "RecipientEditPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncMessageGroupPage = Loadable({
  loader: () =>
    import(
      '../dit/message/messgr/components/MessageGroupContainer' /* webpackChunkName: "MessageGroupPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncMessageGroupUserPage = Loadable({
  loader: () =>
    import(
      '../dit/message/mgru/components/MessageGroupUserContainer' /* webpackChunkName: "MessageGroupUserPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncRecoCurrentPage = Loadable({
  loader: () =>
    import(
      '../crm/mainoperation/reco/components/RecoCurrentPage' /* webpackChunkName: "RecoCurrentPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncRecoArchivePage = Loadable({
  loader: () =>
    import(
      '../crm/mainoperation/reco/components/RecoArchivePage' /* webpackChunkName: "RecoArchivePage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncDemoCurrentPage = Loadable({
  loader: () =>
    import(
      '../crm/mainoperation/demo/components/DemoCurrentPage' /* webpackChunkName: "DemoCurrentPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncDemoArchivePage = Loadable({
  loader: () =>
    import(
      '../crm/mainoperation/demo/components/DemoArchivePage' /* webpackChunkName: "DemoArchivePage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncVisitArchivePage = Loadable({
  loader: () =>
    import(
      '../crm/mainoperation/visit/components/VisitArchivePage' /* webpackChunkName: "VisitArchivePage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncRecoViewPage = Loadable({
  loader: () =>
    import(
      '../crm/mainoperation/reco/components/RecoViewPage' /* webpackChunkName: "RecoViewPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncRecoCreatePage = Loadable({
  loader: () =>
    import(
      '../crm/mainoperation/reco/components/RecoCreatePage' /* webpackChunkName: "RecoCreatePage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncDemoViewPage = Loadable({
  loader: () =>
    import(
      '../crm/mainoperation/demo/components/DemoViewPage' /* webpackChunkName: "DemoViewPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncVisitViewPage = Loadable({
  loader: () =>
    import(
      '../crm/mainoperation/visit/components/VisitViewPage' /* webpackChunkName: "VisitViewPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncKpiSettingPage = Loadable({
  loader: () =>
    import(
      '../crm/mainoperation/kpi/components/KpiSettingPage' /* webpackChunkName: "KpiSettingPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncNewIssuePageContainer = Loadable({
  loader: () =>
    import(
      '../crm/callCenter/mainoperation/newIssue/components/NewIssuePageContainer' /* webpackChunkName: "NewIssuePageTest" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncStaffListPage = Loadable({
  loader: () =>
    import(
      '../hr/mainoperation/staff/components/StaffListPage' /* webpackChunkName: "StaffListPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncStaffUpdatePage = Loadable({
  loader: () =>
    import(
      '../hr/mainoperation/staff/components/StaffUpdatePage' /* webpackChunkName: "StaffUpdatePage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncStaffViewPage = Loadable({
  loader: () =>
    import(
      '../hr/mainoperation/staff/components/StaffViewPage' /* webpackChunkName: "StaffViewPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncHrb02 = Loadable({
  loader: () =>
    import('../hr/mainoperation/hrb02/hrb02' /* webpackChunkName: "hrb02" */),
  loading: () => <LoadingPage />,
});

const AsyncFrcoln = Loadable({
  loader: () =>
    import('../finance/report/frcoln/frcoln' /* webpackChunkName: "frcoln" */),
  loading: () => <LoadingPage />,
});

const AsyncAssignUserBranch = Loadable({
  loader: () =>
    import(
      '../dit/userBranch/components/assign_user_branch' /* webpackChunkName: "ditaub" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncPyramidTreePage = Loadable({
  loader: () =>
    import(
      '../hr/mainoperation/pyramid/components/PyramidTreePage' /* webpackChunkName: "ditaub" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncCrmWspacePage = Loadable({
  loader: () =>
    import(
      '../crm/mainoperation/wspace/components/WspaceMainPage' /* webpackChunkName: "WspaceMainPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncHrTimesheetPage = Loadable({
  loader: () =>
    import(
      '../hr/mainoperation/timesheet/components/TimesheetPage' /* webpackChunkName: "TimesheetPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncCrmReportPage = Loadable({
  loader: () =>
    import(
      '../crm/report/general/components/CrmReportPage' /* webpackChunkName: "CrmReportPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncHrReportPage = Loadable({
  loader: () =>
    import(
      '../hr/report/general/components/HrReportPage' /* webpackChunkName: "HrReportPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncAmsg = Loadable({
  loader: () =>
    import(
      '../accounting/mainoperation/amsg/amsg' /* webpackChunkName: "amsg" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncAmcdd = Loadable({
  loader: () =>
    import(
      '../accounting/mainoperation/amcdd/amcdd' /* webpackChunkName: "amcdd" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncAmpi = Loadable({
  loader: () =>
    import(
      '../accounting/mainoperation/ampi/ampi' /* webpackChunkName: "ampi" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncAmri = Loadable({
  loader: () =>
    import(
      '../accounting/mainoperation/amri/amri' /* webpackChunkName: "amri" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncArli = Loadable({
  loader: () =>
    import('../accounting/report/arli/arli' /* webpackChunkName: "arli" */),
  loading: () => <LoadingPage />,
});

const AsyncArep1 = Loadable({
  loader: () =>
    import('../accounting/report/arep1/arep1' /* webpackChunkName: "arep1" */),
  loading: () => <LoadingPage />,
});

const AsyncFmcp = Loadable({
  loader: () =>
    import('../finance/mainoperation/fmcp/fmcp' /* webpackChunkName: "fmcp" */),
  loading: () => <LoadingPage />,
});

const AsyncFcis = Loadable({
  loader: () =>
    import('../finance/mainoperation/fcis/fcis' /* webpackChunkName: "fcis" */),
  loading: () => <LoadingPage />,
});

const AsyncFaci01 = Loadable({
  loader: () =>
    import(
      '../finance/mainoperation/faci01/faci01' /* webpackChunkName: "faci01" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncFaco01 = Loadable({
  loader: () =>
    import(
      '../finance/mainoperation/faco01/faco01' /* webpackChunkName: "faco01" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncFaia = Loadable({
  loader: () =>
    import('../finance/mainoperation/faia/faia' /* webpackChunkName: "faia" */),
  loading: () => <LoadingPage />,
});

const AsyncFaicfp = Loadable({
  loader: () =>
    import(
      '../finance/mainoperation/faicfp/faicfp' /* webpackChunkName: "faicfp" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncFaicfp2 = Loadable({
  loader: () =>
    import(
      '../finance/mainoperation/faicfp2/faicfp2' /* webpackChunkName: "faicfp2" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncFrep1 = Loadable({
  loader: () =>
    import('../finance/report/frep1/frep1' /* webpackChunkName: "frep1" */),
  loading: () => <LoadingPage />,
});

const AsyncFrep4 = Loadable({
  loader: () =>
    import('../finance/report/frep4/frep4' /* webpackChunkName: "frep4" */),
  loading: () => <LoadingPage />,
});

const AsyncFrep5 = Loadable({
  loader: () =>
    import('../finance/report/frep5/frep5' /* webpackChunkName: "frep5" */),
  loading: () => <LoadingPage />,
});

const AsyncFrep6 = Loadable({
  loader: () =>
    import('../finance/report/frep6/frep6' /* webpackChunkName: "frep6" */),
  loading: () => <LoadingPage />,
});

const AsyncFrep7 = Loadable({
  loader: () =>
    import('../finance/report/frep7/frep7' /* webpackChunkName: "frep7" */),
  loading: () => <LoadingPage />,
});

const AsyncFahrb = Loadable({
  loader: () =>
    import(
      '../finance/mainoperation/fahrb/fahrb' /* webpackChunkName: "fahrb" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncRfcoj = Loadable({
  loader: () =>
    import('../finance/report/rfcoj/rfcoj' /* webpackChunkName: "rfcoj" */),
  loading: () => <LoadingPage />,
});

const AsyncHrrsb = Loadable({
  loader: () =>
    import('../hr/report/hrrsb/hrrsb' /* webpackChunkName: "hrrsb" */),
  loading: () => <LoadingPage />,
});

const AsyncHrc01 = Loadable({
  loader: () =>
    import(
      '../hr/mainoperation/customer/hrc01' /* webpackChunkName: "hrc01" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncHrc02 = Loadable({
  loader: () =>
    import(
      '../hr/mainoperation/customer/hrc02' /* webpackChunkName: "hrc02" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncHrc03 = Loadable({
  loader: () =>
    import(
      '../hr/mainoperation/customer/hrc03' /* webpackChunkName: "hrc03" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncMmcc01 = Loadable({
  loader: () =>
    import(
      '../marketing/mainoperation/contract/mmcc01/mmcc01' /* webpackChunkName: "mmcc01" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncRfadd01 = Loadable({
  loader: () =>
    import('../reference/f4/address/rfadd01' /* webpackChunkName: "rfadd01" */),
  loading: () => <LoadingPage />,
});

const AsyncRfadd02 = Loadable({
  loader: () =>
    import('../reference/f4/address/rfadd02' /* webpackChunkName: "rfadd02" */),
  loading: () => <LoadingPage />,
});

const AsyncHrRecruitmentPage = Loadable({
  loader: () =>
    import(
      '../hr/mainoperation/document/components/HrRecruitmentPage' /* webpackChunkName: "HrRecruitmentPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncHrDocViewPage = Loadable({
  loader: () =>
    import(
      '../hr/mainoperation/document/components/HrDocViewPage' /* webpackChunkName: "HrDocViewPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncHrDocFormPage = Loadable({
  loader: () =>
    import(
      '../hr/mainoperation/document/components/HrDocFormPage' /* webpackChunkName: "HrDocFormPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncMyDocsListPage = Loadable({
  loader: () =>
    import(
      '../documents/mainoperation/components/MyDocsListPage' /* webpackChunkName: "MyDocsListPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncFa02 = Loadable({
  loader: () =>
    import('../finance/mainoperation/fa02/fa02' /* webpackChunkName: "fa02" */),
  loading: () => <LoadingPage />,
});

const AsyncFa03 = Loadable({
  loader: () =>
    import('../finance/mainoperation/fa03/fa03' /* webpackChunkName: "fa03" */),
  loading: () => <LoadingPage />,
});

const AsyncTransaction = Loadable({
  loader: () => import('../dit/transaction/' /* webpackChunkName: "trlist" */),
  loading: () => <LoadingPage />,
});

// import { DtskcContainer, DtskcSummaryDisplay } from '../general/dtskc/pages';
// import { DtskdepContainer } from '../general/dtskdep/pages';

const AsyncDtskc = Loadable({
  loader: () =>
    import(
      '../dit/tasks/dtskc/pages/DtskcContainer' /* webpackChunkName: "Dtskc" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncDtskcSummary = Loadable({
  loader: () =>
    import(
      '../dit/tasks/dtskc/pages/DtskcSummaryDisplay' /* webpackChunkName: "DtskcSummary" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncDtskdep = Loadable({
  loader: () =>
    import(
      '../dit/tasks/dtskdep/pages/DtskdepContainer' /* webpackChunkName: "Dtskdep" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncLogWerksRequestList = Loadable({
  loader: () =>
    import(
      '../logistics/mainoperation/components/WerksRequestListPage' /* webpackChunkName: "WerksRequestListPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncLogWerksRequestForm = Loadable({
  loader: () =>
    import(
      '../logistics/mainoperation/components/WerksRequestFormPage' /* webpackChunkName: "WerksRequestFormPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncLogInvoicesList = Loadable({
  loader: () =>
    import(
      '../logistics/mainoperation/components/InvoiceListPage' /* webpackChunkName: "InvoiceListPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncLogWerksRequestView = Loadable({
  loader: () =>
    import(
      '../logistics/mainoperation/components/WerksRequestViewPage' /* webpackChunkName: "WerksRequestViewPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncRefSubCompanyListPage = Loadable({
  loader: () =>
    import(
      '../reference/mainoperation/components/SubCompanyListPage' /* webpackChunkName: "SubCompanyListPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncRefNationalityListPage = Loadable({
  loader: () =>
    import(
      '../reference/mainoperation/components/NationalityListPage' /* webpackChunkName: "NationalityListPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncRefLeaveReasonListPage = Loadable({
  loader: () =>
    import(
      '../reference/mainoperation/components/LeaveReasonListPage' /* webpackChunkName: "LeaveReasonListPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncRefDemoPriceListPage = Loadable({
  loader: () =>
    import(
      '../reference/mainoperation/components/DemoPriceListPage' /* webpackChunkName: "DemoPriceListPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncRefStaffProblemListPage = Loadable({
  loader: () =>
    import(
      '../reference/mainoperation/components/StaffProblemListPage' /* webpackChunkName: "StaffProblemListPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncHrDocSalaryCreatePage = Loadable({
  loader: () =>
    import(
      '../hr/mainoperation/document/components/SalaryCreatePage' /* webpackChunkName: "SalaryCreatePage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncAssetmod = Loadable({
  loader: () =>
    import('../aes/mainoperation/assetMod' /* webpackChunkName: "aes" */),
  loading: () => <LoadingPage />,
});
const AsyncAssetapr = Loadable({
  loader: () =>
    import('../aes/mainoperation/assetapr' /* webpackChunkName: "aes" */),
  loading: () => <LoadingPage />,
});
const AsyncAssetref = Loadable({
  loader: () =>
    import('../aes/mainoperation/assetRef' /* webpackChunkName: "aes" */),
  loading: () => <LoadingPage />,
});
const AsyncAesreport1 = Loadable({
  loader: () => import('../aes/report/aesReport' /* webpackChunkName: "aes" */),
  loading: () => <LoadingPage />,
});

const AsyncPositionList = Loadable({
  loader: () =>
    import('../hr/reference/position' /* webpackChunkName: "position" */),
  loading: () => <LoadingPage />,
});

const AsyncMenu = Loadable({
  loader: () => import('../dit/menu/' /* webpackChunkName: "menu" */),
  loading: () => <LoadingPage />,
});

const AsyncUsers = Loadable({
  loader: () => import('../dit/duserlist' /* webpackChunkName: sysUsers */),
  loading: () => <LoadingPage />,
});

const AsyncRoles = Loadable({
  loader: () => import('../dit/role/drole' /* webpackChunkName: roles */),
  loading: () => <LoadingPage />,
});

const AsyncEventLog = Loadable({
  loader: () => import('../dit/eventlog/' /* webpackChunkName: roles */),
  loading: () => <LoadingPage />,
});

const AsyncPriceList = Loadable({
  loader: () =>
    import(
      '../marketing/otheroperation/pricelist' /* webpackChunkName: pricelist */
    ),
  loading: () => <LoadingPage />,
});

const AsyncExitInterviewListPage = Loadable({
  loader: () =>
    import(
      '../hr/mainoperation/staff/components/ExitInterviewListPage' /* webpackChunkName: "ExitInterviewListPage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncExitInterviewCreatePage = Loadable({
  loader: () =>
    import(
      '../hr/mainoperation/staff/components/ExitInterviewCreatePage' /* webpackChunkName: "ExitInterviewCreatePage" */
    ),
  loading: () => <LoadingPage />,
});

const AsyncContract = Loadable({
  loader: () =>
    import(
      '../marketing/report/contract' /* webpackChunkName: "ExitInterviewCreatePage" */
    ),
  loading: () => <LoadingPage />,
});

const getComponent = {
  Dtrlist: AsyncTransaction,
  Ditaub: AsyncAssignUserBranch,
  Hrb02: AsyncHrb02,

  Amsg: AsyncAmsg,
  Amcdd: AsyncAmcdd,
  Ampi: AsyncAmpi,
  Amri: AsyncAmri,
  Arli: AsyncArli,
  Arep1: AsyncArep1,

  Frcoln: AsyncFrcoln,
  Fmcp: AsyncFmcp,
  Faci01: AsyncFaci01,
  Faco01: AsyncFaco01,
  Fcis: AsyncFcis,
  Fa03: AsyncFa03,
  Fa02: AsyncFa02,
  Faia: AsyncFaia,
  Faicfp: AsyncFaicfp,
  Faicfp2: AsyncFaicfp2,
  Fahrb: AsyncFahrb,
  Frep1: AsyncFrep1,
  Frep4: AsyncFrep4,
  Frep5: AsyncFrep5,
  Frep6: AsyncFrep6,
  Frep7: AsyncFrep7,
  Rfcoj: AsyncRfcoj,
  Hrrsb: AsyncHrrsb,
  Mmcc01: AsyncMmcc01,

  SpNew: AsyncSpNewPage,
  SpView: AsyncSpViewPage,
  SpList: AsyncSpListPage,
  LogRepAccStaff: AsyncAccountabilityStaffListPage,
  LogRepAccStaffDetail: AsyncAccountabilityStaffDetailPage,
  Serrep1: AsyncSerrep1,
  Serrep2: AsyncSerrep2,
  Serrep4: AsyncSerrep4,
  Serrep3: AsyncSerrep3,
  CrmRepKpi: AsyncKpiReportPage,
  CrmRepKpiRtg: AsyncKpiRatingReportPage,
  Prcltgs: AsyncPrcltgs,
  CrmRecoCurrent: AsyncRecoCurrentPage,
  CrmRecoArchive: AsyncRecoArchivePage,
  CrmRecoCreate: AsyncRecoCreatePage,
  CrmDemoCurrent: AsyncDemoCurrentPage,
  CrmDemoArchive: AsyncDemoArchivePage,
  CrmVisitArchive: AsyncVisitArchivePage,
  CrmRecoView: AsyncRecoViewPage,
  CrmDemoView: AsyncDemoViewPage,
  CrmVisitView: AsyncVisitViewPage,
  CrmKpiSetting: AsyncKpiSettingPage,
  OutCallTaskPage: AsyncOutCallTaskPage,
  HrStaffList: AsyncStaffListPage,
  HrStaffUpdate: AsyncStaffUpdatePage,
  HrStaffView: AsyncStaffViewPage,
  HrTimesheetPage: AsyncHrTimesheetPage,
  CrmReportPage: AsyncCrmReportPage,
  HrReportPage: AsyncHrReportPage,
  Ccaslt: AsyncContractListPage,
  Ccasao: AsyncSOContractListPage,
  Ccasoc: AsyncNewIssuePageContainer,
  Ccastskl: AsyncTaskListPage,
  Ccastskedit: AsyncOutCallTaskPage,
  Dtskedit: AsyncTaskPage,
  Dtskredit: AsyncTaskRecEditPage,
  DtskcSummary: AsyncDtskcSummary,
  Dtskrep: AsyncTaskMonitorPage,
  Dtskdep: AsyncDtskdep,
  Dtskl: AsyncDeptTaskListPage,
  Dtskc: AsyncDtskc,
  Messgr: AsyncMessageGroupPage,
  Mgru: AsyncMessageGroupUserPage,
  MyDocs: AsyncMyDocsListPage,
  PyramidTreePage: AsyncPyramidTreePage,
  RefLeaveReason: AsyncRefLeaveReasonListPage,
  RefStaffProblem: AsyncRefStaffProblemListPage,
  RefSubCompany: AsyncRefSubCompanyListPage,
  HrDocAllDocsPage: AsyncHrDocAllDocsPage,
  Assetref: AsyncAssetref,
  Assetmod: AsyncAssetmod,
  Assetapr: AsyncAssetapr,
  Aesreport1: AsyncAesreport1,
  Dmulist: AsyncMenu,
  Poslt: AsyncPositionList,
  Duserlist: AsyncUsers,
  Drlist: AsyncRoles,
  RefDemoPriceList: AsyncRefDemoPriceListPage,
  Eventlog: AsyncEventLog,
  Lplist: AsyncPriceList,
  Dmsclist: AsyncContract,
};

const generateRoutes = transactionRoutes => {
  return (
    <div>
      <Route exact path="/" component={MainPanel} />
      <Route path="/settings" component={AsyncSettings} />
      <Route path="/signin" component={Signin} />
      <Route path="/signout" component={Signout} />
      <Route path="forbidden" component={ForbiddenPage} />

      <Route path="/hr/staff/list" component={AsyncStaffListPage} />
      <Route path="/newIssue/:id" component={AsyncNewIssuePageContainer} />
      <Route path="/hr/staff/update/:id?" component={AsyncStaffUpdatePage} />
      <Route path="/hr/staff/view/:id" component={AsyncStaffViewPage} />
      {/*<Route path="/hr/pyramid/tree" component={AsyncPyramidTreePage} />*/}
      <Route path="/crm/wspace" component={AsyncCrmWspacePage} />
      {/* <Route path="/hr/pyramid/tree" component={AsyncPyramidTreePage} /> */}
      {/*<Route path="/crm/wspace" component={AsyncCrmWspacePage} />*/}
      <Route path="/crm/report/view/:id" component={AsyncCrmReportPage} />
      <Route path="/hr/report/view/:id" component={AsyncHrReportPage} />
      <Route path="/hr/doc/recruitment" component={AsyncHrRecruitmentPage} />
      <Route path="/hr/report/hrrsb" component={AsyncHrrsb} />
      <Route path="/hr/mainoperation/customer/hrc01" component={AsyncHrc01} />
      <Route path="/hr/mainoperation/customer/hrc02" component={AsyncHrc02} />
      <Route path="/hr/mainoperation/customer/hrc03" component={AsyncHrc03} />
      <Route path="/reference/f4/address/rfadd01" component={AsyncRfadd01} />
      <Route path="/reference/f4/address/rfadd02" component={AsyncRfadd02} />
      <Route
        path="/marketing/mainoperation/contract/mmcc01"
        component={AsyncMmcc01}
      />

      <Route
        path="/hr/exitinterviews"
        exact={true}
        component={AsyncExitInterviewListPage}
      />

      <Route
        path="/hr/exitinterviews/create"
        exact={true}
        component={AsyncExitInterviewCreatePage}
      />

      <Route
        path="/reference/nationalities"
        component={AsyncRefNationalityListPage}
      />

      <Route
        path="/hr/doc/:action(create)/:type"
        exact={true}
        component={AsyncHrDocFormPage}
      />
      <Route
        path="/hr/doc/:action(update)/:id"
        exact={true}
        component={AsyncHrDocFormPage}
      />
      <Route path="/hr/doc/view/:id" component={AsyncHrDocViewPage} />
      <Route
        path="/hr/doc/salary-create/:id"
        exact={true}
        component={AsyncHrDocSalaryCreatePage}
      />
      <Route path="/general/summary" component={AsyncDtskcSummary} />

      <Route
        path="/logistics/werks/requests/:type(in|out|all)"
        exact={true}
        component={AsyncLogWerksRequestList}
      />
      <Route
        path="/logistics/werks/requests/create"
        exact={true}
        component={AsyncLogWerksRequestForm}
      />
      <Route
        path="/logistics/werks/requests/update/:id"
        exact={true}
        component={AsyncLogWerksRequestForm}
      />

      <Route
        path="/logistics/werks/requests/view/:id"
        exact={true}
        component={AsyncLogWerksRequestView}
      />

      <Route
        path="/logistics/invoices/:doctype(postings-trade-in|postings)"
        exact={true}
        component={AsyncLogInvoicesList}
      />

      {/* dynamically generated URLs  */}
      {transactionRoutes.map(route => {
        return (
          <Route
            path={`${route.url}`}
            component={persistPath(getComponent[route.component])}
            key={route.transactionCode}
          />
        );
      })}
    </div>
  );
};

export default generateRoutes;

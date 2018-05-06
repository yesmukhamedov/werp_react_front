import React from 'react';
import { Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import RequireAuth from '../components/Auth/require_auth';
import MainPanel from '../components/MainPanel/MainPanel';
import Signin from '../components/Auth/Signin';
import Signout from '../components/Auth/Signout';


import ForbiddenPage from '../general/forbidden';
import LoadingPage from '../general/LoadingPage';

const AsyncSettings = Loadable({
  loader: () =>
    import('../components/UserSettings/Settings' /* webpackChunkName: "Settings" */),
  loading: () => <LoadingPage />,
});

const AsyncSerrep1 = Loadable({
  loader: () =>
    import('../service/report/serrep1/serrep1' /* webpackChunkName: "serrep1" */),
  loading: () => <LoadingPage />,
});

const AsyncSerrep2 = Loadable({
  loader: () =>
    import('../service/report/serrep2/serrep2' /* webpackChunkName: "serrep2" */),
  loading: () => <LoadingPage />,
});

const AsyncSerrep3 = Loadable({
  loader: () =>
    import('../service/report/serrep3/serrep3' /* webpackChunkName: "serrep3" */),
  loading: () => <LoadingPage />,
});

const AsyncSerrep4 = Loadable({
  loader: () =>
    import('../service/report/serrep4/serrep4' /* webpackChunkName: "serrep4" */),
  loading: () => <LoadingPage />,
});

const AsyncKpiReportPage = Loadable({
  loader: () =>
    import('../crm/report/kpi/components/KpiReportPage' /* webpackChunkName: "KpiReportPage" */),
  loading: () => <LoadingPage />,
});

const AsyncKpiRatingReportPage = Loadable({
  loader: () =>
    import('../crm/report/kpi/components/KpiRatingReportPage' /* webpackChunkName: "KpiRatingReportPage" */),
  loading: () => <LoadingPage />,
});

const AsyncPrcltgs = Loadable({
  loader: () =>
    import('../marketing/mainoperation/prcltgs/prcltgs' /* webpackChunkName: "prcltgs" */),
  loading: () => <LoadingPage />,
});

const AsyncAccountabilityStaffDetailPage = Loadable({
  loader: () =>
    import('../logistics/report/accountabilityStaff/AccountabilityStaffDetailPage' /* webpackChunkName: "AccountabilityStaffDetailPage" */),
  loading: () => <LoadingPage />,
});

const AsyncAccountabilityStaffListPage = Loadable({
  loader: () =>
    import('../logistics/report/accountabilityStaff/AccountabilityStaffListPage' /* webpackChunkName: "AccountabilityStaffListPage" */),
  loading: () => <LoadingPage />,
});

const AsyncSpNewPage = Loadable({
  loader: () =>
    import('../service/mainoperation/spNew/components/spNewPage' /* webpackChunkName: "spNewPage" */),
  loading: () => <LoadingPage />,
});

const AsyncSpViewPage = Loadable({
  loader: () =>
    import('../service/mainoperation/spView/components/spViewPage' /* webpackChunkName: "spViewPage" */),
  loading: () => <LoadingPage />,
});

const AsyncSpListPage = Loadable({
  loader: () =>
    import('../service/mainoperation/spList/components/spListPage' /* webpackChunkName: "spListPage" */),
  loading: () => <LoadingPage />,
});

const AsyncContractListPage = Loadable({
  loader: () =>
    import('../crm/callCenter/mainoperation/contractList/components/ContractListPage' /* webpackChunkName: "ContractListPage" */),
  loading: () => <LoadingPage />,
});

const AsyncSOContractListPage = Loadable({
  loader: () =>
    import('../crm/callCenter/mainoperation/contractList/components/SeniorOperatorPage/ContractListPage' /* webpackChunkName: "SOContractListPage" */),
  loading: () => <LoadingPage />,
});

const AsyncTaskListPage = Loadable({
  loader: () =>
    import('../crm/callCenter/mainoperation/taskList/components/TaskListPage' /* webpackChunkName: "TaskListPage" */),
  loading: () => <LoadingPage />,
});

const AsyncTaskPage = Loadable({
  loader: () =>
    import('../crm/callCenter/mainoperation/task/components/TaskPageContainer' /* webpackChunkName: "TaskPage" */),
  loading: () => <LoadingPage />,
});

const AsyncOutCallTaskPage = Loadable({
  loader: () =>
    import('../crm/callCenter/mainoperation/newIssue/components/TaskPanel/TaskView/TaskViewContainer' /* webpackChunkName: "OutCallTaskPage" */),
  loading: () => <LoadingPage />,
});

const AsyncRecoCurrentPage = Loadable({
        loader: () => import('../crm/mainoperation/reco/components/RecoCurrentPage' /* webpackChunkName: "RecoCurrentPage" */),
    loading: () => <LoadingPage />
});

const AsyncRecoArchivePage = Loadable({
        loader: () => import('../crm/mainoperation/reco/components/RecoArchivePage' /* webpackChunkName: "RecoArchivePage" */),
    loading: () => <LoadingPage />
});

const AsyncDemoCurrentPage = Loadable({
        loader: () => import('../crm/mainoperation/demo/components/DemoCurrentPage' /* webpackChunkName: "DemoCurrentPage" */),
    loading: () => <LoadingPage />
});

const AsyncDemoArchivePage = Loadable({
        loader: () => import('../crm/mainoperation/demo/components/DemoArchivePage' /* webpackChunkName: "DemoArchivePage" */),
    loading: () => <LoadingPage />
});

const AsyncVisitArchivePage = Loadable({
        loader: () => import('../crm/mainoperation/visit/components/VisitArchivePage' /* webpackChunkName: "VisitArchivePage" */),
    loading: () => <LoadingPage />
});

const AsyncRecoViewPage = Loadable({
        loader: () => import('../crm/mainoperation/reco/components/RecoViewPage' /* webpackChunkName: "RecoViewPage" */),
        loading: () => <LoadingPage />
});

const AsyncRecoCreatePage = Loadable({
        loader: () => import('../crm/mainoperation/reco/components/RecoCreatePage' /* webpackChunkName: "RecoCreatePage" */),
        loading: () => <LoadingPage />
});

const AsyncDemoViewPage = Loadable({
        loader: () => import('../crm/mainoperation/demo/components/DemoViewPage' /* webpackChunkName: "DemoViewPage" */),
    loading: () => <LoadingPage />
});

const AsyncVisitViewPage = Loadable({
        loader: () => import('../crm/mainoperation/visit/components/VisitViewPage' /* webpackChunkName: "VisitViewPage" */),
    loading: () => <LoadingPage />
});

const AsyncKpiSettingPage = Loadable({
        loader: () => import('../crm/mainoperation/kpi/components/KpiSettingPage' /* webpackChunkName: "KpiSettingPage" */),
    loading: () => <LoadingPage />
});


const AsyncNewIssuePageContainer = Loadable({
  loader: () =>
    import('../crm/callCenter/mainoperation/newIssue/components/NewIssuePageContainer' /* webpackChunkName: "NewIssuePageTest" */),
  loading: () => <LoadingPage />,
});

const AsyncStaffListPage = Loadable({
        loader: () => import('../hr/mainoperation/staff/components/StaffListPage' /* webpackChunkName: "StaffListPage" */),
    loading: () => <LoadingPage />
});

const AsyncStaffUpdatePage = Loadable({
        loader: () => import('../hr/mainoperation/staff/components/StaffUpdatePage' /* webpackChunkName: "StaffUpdatePage" */),
    loading: () => <LoadingPage />
});

const AsyncStaffViewPage = Loadable({
        loader: () => import('../hr/mainoperation/staff/components/StaffViewPage' /* webpackChunkName: "StaffViewPage" */),
    loading: () => <LoadingPage />
});

const AsyncHrb02 = Loadable({
  loader: () => import('../hr/mainoperation/hrb02/hrb02' /* webpackChunkName: "hrb02" */),
loading: () => <LoadingPage />
});

const AsyncFrcoln = Loadable({
  loader: () => import('../finance/report/frcoln/frcoln' /* webpackChunkName: "frcoln" */),
loading: () => <LoadingPage />
});

const AsyncAssignUserBranch = Loadable({
  loader: () => import('../dit/userBranch/components/assign_user_branch' /* webpackChunkName: "ditaub" */),
loading: () => <LoadingPage />
});

const AsyncPyramidTreePage = Loadable({
        loader: () => import('../hr/mainoperation/pyramid/components/PyramidTreePage' /* webpackChunkName: "ditaub" */),
    loading: () => <LoadingPage />
});

const AsyncCrmWspacePage = Loadable({
    loader: () => import('../crm/mainoperation/wspace/components/WspaceMainPage' /* webpackChunkName: "WspaceMainPage" */),
    loading: () => <LoadingPage />
});

const AsyncFsis = Loadable({
  loader: () => import('../finance/mainoperation/fcis/fcis' /* webpackChunkName: "fcis" */),
  loading: () => <LoadingPage />
});


const getComponent = {
    Ditaub:AsyncAssignUserBranch,
    Hrb02:AsyncHrb02,
    
    Frcoln:AsyncFrcoln,
    // Fsis:AsyncFsis,

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
    Prcltgs:AsyncPrcltgs,
    CrmRecoCurrent:AsyncRecoCurrentPage,
    CrmRecoArchive:AsyncRecoArchivePage,
    CrmRecoCreate: AsyncRecoCreatePage,
    CrmDemoCurrent:AsyncDemoCurrentPage,
    CrmDemoArchive:AsyncDemoArchivePage,
    CrmVisitArchive : AsyncVisitArchivePage,
    CrmRecoView:AsyncRecoViewPage,
    CrmDemoView:AsyncDemoViewPage,
    CrmVisitView:AsyncVisitViewPage,
    OutCallTaskPage: AsyncOutCallTaskPage,
    HrStaffList:AsyncStaffListPage,
    HrStaffUpdate:AsyncStaffUpdatePage,
    HrStaffView:AsyncStaffViewPage,

    Ccaslt: AsyncContractListPage,
    Ccasao: AsyncSOContractListPage,
    Ccasoc: AsyncNewIssuePageContainer,
    Ccastskl: AsyncTaskListPage,
    Ccastskedit: AsyncOutCallTaskPage,
    Gtskedit: AsyncTaskPage,
}

function persistPath(nextState, replace) {
  console.log("Persist path: ", nextState.location.path)
  try {
    localStorage.setItem('currentPathName', nextState.location.pathname);
  } catch (error) {
    // Ignore write errors.
  }
}

const generateRoutes = (transactionRoutes) => {
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
      <Route path="/crm/kpi/setting" component={AsyncKpiSettingPage} />
      <Route path="/hr/pyramid/tree" component={AsyncPyramidTreePage} />
      <Route path="/crm/wspace" component={AsyncCrmWspacePage} />

      <Route path="/finance/mainoperation/fcis" component={AsyncFsis} />
      
      {/* dynamically generated URLs  */}
      {transactionRoutes.map(route => {
        return (
          <Route
            path={`${route.url}`}
            component={getComponent[route.component]}
            key={route.transactionCode}
            onEnter={persistPath}
          />
        );
      })}
    </div>
  );
};

export default generateRoutes;

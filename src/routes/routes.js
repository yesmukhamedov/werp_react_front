import React from 'react';
import { Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import RequireAuth from '../components/Auth/require_auth';
import MainPanel from '../components/MainPanel/MainPanel';
import Signin from '../components/Auth/Signin';
import Signout from '../components/Auth/Signout';

import AssignUserBranch from '../dit/userBranch/components/assign_user_branch';
import CreateStaff from '../hr/mainoperation/staff/components/CreateStaff';
import ViewStaff from '../hr/mainoperation/staff/components/ViewStaff';
import RecoCurrentPage from '../crm/mainoperation/reco/components/RecoCurrentPage';
import RecoCreatePage from '../crm/mainoperation/reco/components/RecoCreatePage';
import RecoArchivePage from '../crm/mainoperation/reco/components/RecoArchivePage';
import RecoViewPage from '../crm/mainoperation/reco/components/RecoViewPage';
import DemoListPage from '../crm/mainoperation/demo/components/DemoListPage';
import VisitArchivePage from '../crm/mainoperation/visit/components/VisitArchivePage';
import VisitViewPage from '../crm/mainoperation/visit/components/VisitViewPage';
import DemoCurrentPage from '../crm/mainoperation/demo/components/DemoCurrentPage';
import DemoArchivePage from '../crm/mainoperation/demo/components/DemoArchivePage';
import DemoViewPage from '../crm/mainoperation/demo/components/DemoViewPage';
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
    import('../testComponent/mainoperation/contractList/components/ContractListPage' /* webpackChunkName: "ContractListPage" */),
  loading: () => <LoadingPage />,
});

const getComponent = {
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
  ContractListPage: AsyncContractListPage,
};

function persistPath(nextState, replace) {
  try {
    localStorage.setItem('currentPathName', nextState.location.pathname);
  } catch (error) {
    // Ignore write errors.
  }
}

const generateRoutes = transactionRoutes => {
  return (
    <div>
      <Route exact path="/" component={RequireAuth(MainPanel)} />
      <Route path="/settings" component={RequireAuth(AsyncSettings)} />
      <Route path="/signin" component={Signin} />
      <Route path="/signout" component={Signout} />

      <Route path="dit/userBranch" component={AssignUserBranch} />
      <Route path="hr/staff/create" component={CreateStaff} />
      <Route path="hr/staff/view/:id" component={ViewStaff} />
      <Route path="crm/reco/current" component={RecoCurrentPage} />
      <Route path="crm/reco/archive" component={RecoArchivePage} />
      <Route
        path="crm/reco/create(/:context/:contextId)"
        component={RecoCreatePage}
      />
      <Route path="crm/demo/current" component={DemoCurrentPage} />
      <Route path="crm/demo/view/:id" component={DemoViewPage} />
      <Route path="crm/reco/view/:id" component={RecoViewPage} />
      <Route path="crm/demo/list" component={DemoListPage} />
      <Route path="crm/visit/archive" component={VisitArchivePage} />
      <Route path="crm/visit/view/:id" component={VisitViewPage} />
      <Route path="crm/demo/archive" component={DemoArchivePage} />
      <Route path="forbidden" component={ForbiddenPage} />
      <Route path="/contractListPage" component={AsyncContractListPage} />

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

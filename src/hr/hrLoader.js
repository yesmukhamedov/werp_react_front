import React from 'react';
import Loadable from 'react-loadable';
import LoadingPage from '../general/LoadingPage';

export const AsyncHrDocAllDocsPage = Loadable({
  loader: () =>
    import('./mainoperation/document/components/HrAllDocsListPage' /* webpackChunkName: "HrAllDocsListPage" */),
  loading: () => <LoadingPage />,
});

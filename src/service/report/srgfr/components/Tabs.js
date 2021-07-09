import React from 'react';
import { Tab } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import ReportByBranches from './reportByBranches/ReportByBranches';
import ReportByCategories from './reportByCategories/ReportByCategories';
import Configuration from './configuration/Configuration';

const Tabs = ({ intl: { messages } }) => {
  const panes = [
    {
      menuItem: messages['report_by_categories'],
      render: () => (
        <Tab.Pane attached={false}>
          <ReportByCategories />
        </Tab.Pane>
      ),
    },
    {
      menuItem: messages['report_by_branches'],
      render: () => (
        <Tab.Pane attached={false}>
          <ReportByBranches />
        </Tab.Pane>
      ),
    },
    {
      menuItem: messages['configuration'],
      render: () => (
        <Tab.Pane attached={false}>
          <Configuration />
        </Tab.Pane>
      ),
    },
  ];
  return <Tab menu={{ pointing: true }} panes={panes} />;
};

export default injectIntl(Tabs);

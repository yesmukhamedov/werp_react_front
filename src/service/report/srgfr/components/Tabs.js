import React from 'react';
import { Tab } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import ReportByBranches from './reportByBranches/ReportByBranches';
import ReportByCategories from './reportByCategories/ReportByCategories';
import Configuration from './configuration/Configuration';

const Tabs = props => {
  const {
    intl: { messages },
    countries = [],
    companies = [],
    branches = [],
    categories = [],
    reportByCategories = [],
    reportByBranches = [],
    exchangeRate = [],
    operatorByHarvestingSystem = [],
    logisticsRate = [],
    bonusOfManager = [],
    bonusOfHeadOfDepartment = [],
  } = props;

  const panes = [
    {
      menuItem: messages['report_by_categories'],
      render: () => (
        <Tab.Pane attached={false}>
          <ReportByCategories
            countries={countries}
            companies={companies}
            branches={branches}
            categories={categories}
            reportByCategories={reportByCategories}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: messages['report_by_branches'],
      render: () => (
        <Tab.Pane attached={false}>
          <ReportByBranches
            countries={countries}
            companies={companies}
            branches={branches}
            reportByBranches={reportByBranches}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: messages['configuration'],
      render: () => (
        <Tab.Pane attached={false}>
          <Configuration
            exchangeRate={exchangeRate}
            operatorByHarvestingSystem={operatorByHarvestingSystem}
            logisticsRate={logisticsRate}
            bonusOfManager={bonusOfManager}
            bonusOfHeadOfDepartment={bonusOfHeadOfDepartment}
          />
        </Tab.Pane>
      ),
    },
  ];
  return <Tab menu={{ pointing: true }} panes={panes} />;
};

export default injectIntl(Tabs);

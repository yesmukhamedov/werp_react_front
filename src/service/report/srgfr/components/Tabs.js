import React from 'react';
import { Tab } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import ReportByBranches from './reportByBranches/ReportByBranches';
import ReportByCategories from './reportByCategories/ReportByCategories';
import Configuration from './configuration/Configuration';
import CalculationOfManagersBonus from './calculationOfManagersBonus/CalculationOfManagersBonus';
import CalculationOfOperatorsBonus from './calculationOfOperatorsBonus/CalculationOfOperatorsBonus';

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
        calculationOfManagersBonus = [],
        calculationOfOperatorsBonus = [],
    } = props;

    const panes = [
        {
            menuItem: messages['report_by_categories'],
            pane: (
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
            pane: (
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
            menuItem: messages['calculation_of_managers_bonus'],
            pane: (
                <Tab.Pane attached={false}>
                    <CalculationOfManagersBonus
                        countries={countries}
                        companies={companies}
                        branches={branches}
                        calculationOfManagersBonus={calculationOfManagersBonus}
                    />
                </Tab.Pane>
            ),
        },
        {
            menuItem: messages['calculation_of_operators_bonus'],
            pane: (
                <Tab.Pane attached={false}>
                    <CalculationOfOperatorsBonus
                        countries={countries}
                        companies={companies}
                        branches={branches}
                        calculationOfOperatorsBonus={
                            calculationOfOperatorsBonus
                        }
                    />
                </Tab.Pane>
            ),
        },
        {
            menuItem: messages['configuration'],
            pane: (
                <Tab.Pane attached={false}>
                    <Configuration
                        exchangeRate={exchangeRate}
                        operatorByHarvestingSystem={operatorByHarvestingSystem}
                        logisticsRate={logisticsRate}
                        bonusOfManager={bonusOfManager}
                        bonusOfHeadOfDepartment={bonusOfHeadOfDepartment}
                        currencies={countries.map(country => {
                            return {
                                key: country.currency.id,
                                text: country.currency,
                                value: country.currency,
                            };
                        })}
                    />
                </Tab.Pane>
            ),
        },
    ];
    return (
        <Tab menu={{ pointing: true }} panes={panes} renderActiveOnly={false} />
    );
};

export default injectIntl(Tabs);

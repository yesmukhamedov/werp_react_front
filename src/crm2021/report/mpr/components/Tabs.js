import React from 'react';
import { Tab } from 'semantic-ui-react';
import HighestDemoAchievers from './highestDemoAchievers/HighestDemoAchievers';
import HighestDemoProducers from './highestDemoProducers/HighestDemoProducers';
import HighestSalesAchievers from './highestSalesAchievers/HighestSalesAchievers';
import OverOffices from './overOffices/OverOffices';
import SalesManager from './salesManager/SalesManager';

const Tabs = props => {
    const {
        language,
        messages,
        countriesOptions = [],
        companies = [],
        branches = [],
    } = props;

    const panes = [
        {
            menuItem: 'Highest sales achievers',
            pane: (
                <Tab.Pane attached={false}>
                    <HighestSalesAchievers
                        language={language}
                        messages={messages}
                        countriesOptions={countriesOptions}
                        companies={companies}
                        branches={branches}
                    />
                </Tab.Pane>
            ),
        },
        {
            menuItem: 'Highest demo achievers',
            pane: (
                <Tab.Pane attached={false}>
                    <HighestDemoAchievers
                        language={language}
                        messages={messages}
                        countriesOptions={countriesOptions}
                        companies={companies}
                        branches={branches}
                    />
                </Tab.Pane>
            ),
        },
        {
            menuItem: 'Highest demo producers',
            pane: (
                <Tab.Pane attached={false}>
                    <HighestDemoProducers
                        language={language}
                        messages={messages}
                        countriesOptions={countriesOptions}
                        companies={companies}
                        branches={branches}
                    />
                </Tab.Pane>
            ),
        },
        {
            menuItem: 'Sales manager',
            pane: (
                <Tab.Pane attached={false}>
                    <SalesManager
                        language={language}
                        messages={messages}
                        countriesOptions={countriesOptions}
                        companies={companies}
                        branches={branches}
                    />
                </Tab.Pane>
            ),
        },
        {
            menuItem: 'Over offices',
            pane: (
                <Tab.Pane attached={false}>
                    <OverOffices
                        language={language}
                        messages={messages}
                        countriesOptions={countriesOptions}
                        companies={companies}
                        branches={branches}
                    />
                </Tab.Pane>
            ),
        },
    ];
    return (
        <Tab
            menu={{ secondary: true, pointing: true }}
            panes={panes}
            renderActiveOnly={false}
        />
    );
};

export default Tabs;

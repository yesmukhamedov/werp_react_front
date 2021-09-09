import React from 'react';
import { Tab } from 'semantic-ui-react';
import HighestDemoAchievers from './highestDemoAchievers/HighestDemoAchievers';
import HighestDemoProducers from './highestDemoProducers/HighestDemoProducers';
import HighestSalesAchievers from './highestSalesAchievers/HighestSalesAchievers';
import OverOffices from './overOffices/OverOffices';
import SalesManager from './salesManager/SalesManager';

const Tabs = props => {
    const {
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

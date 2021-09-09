import React from 'react';
import { Tab } from 'semantic-ui-react';
import HighestSalesAchievers from './highestSalesAchievers/HighestSalesAchievers';

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

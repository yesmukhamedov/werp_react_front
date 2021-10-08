import React from 'react';
import { Tab } from 'semantic-ui-react';
import SalesDetails from './salesDetails/SalesDetails';

const Tabs = props => {
    const {
        language,
        messages,
        countriesOptions = [],
        companies = [],
        branches = [],
        businessAreasOptions = [],
        salesDetails = [],
    } = props;

    const panes = [
        {
            menuItem: 'Sales Details',
            pane: (
                <Tab.Pane attached={false}>
                    <SalesDetails
                        language={language}
                        messages={messages}
                        countriesOptions={countriesOptions}
                        companies={companies}
                        branches={branches}
                        businessAreasOptions={businessAreasOptions}
                        salesDetails={salesDetails}
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

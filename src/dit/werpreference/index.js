import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { fetchTest, clearTest } from './werpreferenceActions';
import { Tab } from 'semantic-ui-react';
import TabCompany from './components/TabCompany';

const WerpReference = props => {
    const {
        testDataProps,
        intl: { messages },
    } = props;

    const panes = [
        {
            menuItem: messages['L__COMPANY'],
            render: () => (
                <Tab.Pane>
                    <TabCompany messages={messages} />
                </Tab.Pane>
            ),
        },

        { menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },

        {
            menuItem: messages['product_category'],
            render: () => (
                <Tab.Pane>
                    <TabCompany messages={messages} />
                </Tab.Pane>
            ),
        },
    ];

    useEffect(() => {
        props.fetchTest();
    }, []);

    return (
        <div>
            <Tab
                menu={{ fluid: true, vertical: true, tabular: true }}
                panes={panes}
            />
        </div>
    );
};

function mapStateToProps(state) {
    return {
        testDataProps: state.werpreferenceReducer.testData,
    };
}

export default connect(mapStateToProps, {
    fetchTest,
    clearTest,
})(injectIntl(WerpReference));

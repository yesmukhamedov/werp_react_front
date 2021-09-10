import React, { useEffect } from 'react';
import { Container, Divider } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import Tabs from './components/Tabs';
import { clearAll } from './action';

const Msr = props => {
    const {
        intl: { messages },
        language,
        countries = [],
        companies = [],
        branches = [],
    } = props;

    const countriesOptions = countries.map(item => {
        return {
            key: item.countryId,
            text: item.country,
            value: item.countryId,
        };
    });

    useEffect(() => {
        return () => {
            props.clearAll();
        };
    }, []);

    return (
        <Container
            fluid
            style={{
                marginTop: '2em',
                marginBottom: '2em',
                paddingLeft: '2em',
                paddingRight: '2em',
            }}
        >
            <h3>
                {messages['detailing_sales_by_customers_for_certain_period']}
            </h3>
            <Divider style={{ marginTop: 20, marginBottom: 20 }} />
            <Tabs
                language={language}
                messages={messages}
                countriesOptions={countriesOptions}
                companies={companies}
                branches={branches}
            />
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        language: state.locales.lang,
        countries: state.f4.countryList,
        companies: state.userInfo.companyOptions,
        branches: state.userInfo.branchOptionsService,
    };
};

export default connect(mapStateToProps, {
    clearAll,
})(injectIntl(Msr));

import React, { useEffect } from 'react';
import { Container, Divider } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import Tabs from './components/Tabs';
import { clearAll, fetchBusinessAreas } from './action';
import { f4FetchCountryList } from '../../../reference/f4/f4_action';

const Msr = props => {
    const {
        intl: { messages },
        language,
        countries = [],
        companies = [],
        branches = [],
        businessAreas = [],
        salesDetails = [],
    } = props;

    const countriesOptions = countries.map(item => {
        return {
            key: item.countryId,
            text: item.country,
            value: item.countryId,
        };
    });

    const businessAreasOptions = businessAreas.map(item => ({
        key: item.business_area_id,
        text: item.name,
        value: item.business_area_id,
        bukrs: item.bukrs,
    }));

    useEffect(() => {
        props.f4FetchCountryList();
        props.fetchBusinessAreas();
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
                businessAreasOptions={businessAreasOptions}
                salesDetails={salesDetails}
            />
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        language: state.locales.lang,
        countries: state.f4.countryList,
        companies: state.userInfo.companyOptions,
        branches: state.userInfo.branchOptionsAll,
        businessAreas: state.msrReducer.businessAreas,
        salesDetails: state.msrReducer.salesDetails,
    };
};

export default connect(mapStateToProps, {
    clearAll,
    fetchBusinessAreas,
    f4FetchCountryList,
})(injectIntl(Msr));

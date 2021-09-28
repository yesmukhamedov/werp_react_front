import React, { useEffect } from 'react';
import { Container, Divider } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import Tabs from './components/Tabs';
import { clearAll, fetchBusinessAreas } from './action';
import { f4FetchCountryList } from '../../../reference/f4/f4_action';

const Mpr = props => {
    const {
        intl: { messages },
        language,
        countries = [],
        companies = [],
        branches = [],
        highestDemoAchievers = [],
        highestDemoProducers = [],
        highestSalesAchievers = [],
        salesOffices = [],
        salesManager = [],
        businessAreas = [],
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
            <h3>{messages['sales_and_demonstrations_indicators']}</h3>
            <Divider style={{ marginTop: 20, marginBottom: 20 }} />
            <Tabs
                language={language}
                messages={messages}
                countriesOptions={countriesOptions}
                companies={companies}
                branches={branches}
                highestDemoAchievers={highestDemoAchievers}
                highestDemoProducers={highestDemoProducers}
                highestSalesAchievers={highestSalesAchievers}
                salesOffices={salesOffices}
                salesManager={salesManager}
                businessAreasOptions={businessAreasOptions}
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
        highestDemoAchievers: state.crmMpr2021Reducer.highestDemoAchievers,
        highestDemoProducers: state.crmMpr2021Reducer.highestDemoProducers,
        highestSalesAchievers: state.crmMpr2021Reducer.highestSalesAchievers,
        salesOffices: state.crmMpr2021Reducer.salesOffices,
        salesManager: state.crmMpr2021Reducer.salesManager,
        businessAreas: state.crmMpr2021Reducer.businessAreas,
    };
};

export default connect(mapStateToProps, {
    f4FetchCountryList,
    fetchBusinessAreas,
    clearAll,
})(injectIntl(Mpr));

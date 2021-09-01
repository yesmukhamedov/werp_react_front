import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Container, Divider } from 'semantic-ui-react';
import Tabs from './components/Tabs';
import '../../service.css';
import { clearAll } from './srgfrAction';

const Srgfr = props => {
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
            <h3>{messages['general_financial_report']}</h3>
            <Divider style={{ marginTop: 20, marginBottom: 20 }} />
            <Tabs
                countries={countries}
                companies={companies}
                branches={branches}
                categories={categories}
                reportByCategories={reportByCategories}
                reportByBranches={reportByBranches}
                exchangeRate={exchangeRate}
                operatorByHarvestingSystem={operatorByHarvestingSystem}
                logisticsRate={logisticsRate}
                bonusOfManager={bonusOfManager}
                bonusOfHeadOfDepartment={bonusOfHeadOfDepartment}
                calculationOfManagersBonus={calculationOfManagersBonus}
                calculationOfOperatorsBonus={calculationOfOperatorsBonus}
            />
        </Container>
    );
};

function mapStateToProps(state) {
    return {
        language: state.locales.lang,
        countries: state.f4.countryList,
        companies: state.userInfo.companyOptions,
        branches: state.userInfo.branchOptionsService,
        categories: state.f4.category,
        reportByCategories: state.srgfrReducer.reportByCategories,
        reportByBranches: state.srgfrReducer.reportByBranches,
        exchangeRate: state.srgfrReducer.exchangeRate,
        operatorByHarvestingSystem:
            state.srgfrReducer.operatorByHarvestingSystem,
        logisticsRate: state.srgfrReducer.logisticsRate,
        bonusOfManager: state.srgfrReducer.bonusOfManager,
        bonusOfHeadOfDepartment: state.srgfrReducer.bonusOfHeadOfDepartment,
        calculationOfManagersBonus:
            state.srgfrReducer.calculationOfManagersBonus,
        calculationOfOperatorsBonus:
            state.srgfrReducer.calculationOfOperatorsBonus,
    };
}

export default connect(mapStateToProps, {
    clearAll,
})(injectIntl(Srgfr));

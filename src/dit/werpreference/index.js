import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import './style.css';
import {
    //COMPANY
    createCompany,
    fetchCompanyList,
    updateCompany,
    clearCompanyList,
    //BRANCH
    fetchBranchList,
    createBranch,
    updateBranch,
    clearBranchList,
    //COUNTRY
    createCountry,
    fetchCountryList,
    clearCountryList,
    updateCountry,
    //CATEGORY
    createCategory,
    fetchCategoryList,
    updateCategory,
    clearCategoryList,
} from './werpreferenceActions';

import {
    f4FetchCurrencyList,
    f4FetchCompanyOptions,
    f4FetchCountryList,
    f4FetchBusinessAreaList,
    f4FetchBranchOptions,
    f4FetchStateList,
    f4FetchSubCompanies,
} from '../../reference/f4/f4_action';
import TabCompany from './components/company/TabCompany';
import TabCountry from './components/country/TabCountry';
import TabBranch from './components/branch/TabBranch';
import ProductCategory from './components/productCategory/ProductCategory';

const WerpReference = props => {
    const {
        intl: { messages },
        fetchCompanyList,
        companyList = [],
        clearCompanyList,
        fetchCountryList,
        countryList = [],
        clearCountryList,
        fetchCategoryList,
        categoryList = [],
        updateCategory,
        clearCategoryList,
        updateCountry,
        currencyOptions = [],
        companyOptions = [],
    } = props;

    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        props.f4FetchCurrencyList('werpreference');
        props.f4FetchCompanyOptions('werpreference');
        props.f4FetchCountryList('werpreference');
        props.f4FetchBusinessAreaList('werpreference');
        props.f4FetchBranchOptions('werpreference');
        props.f4FetchStateList('werpreference');
    }, []);

    const panes = [
        {
            menuItem: messages['brnch'],
            render: () => (
                <Tab.Pane>
                    <TabBranch
                        getBranchList={props.fetchBranchList}
                        branchList={props.branchList}
                        clearBranchList={props.clearBranchList}
                        createBranch={props.createBranch}
                        updateBranch={props.updateBranch}
                        companyOptions={props.companyOptions}
                        countryOptions={props.countryOptions}
                        businessAreaList={props.businessAreaList}
                        stateList={props.stateList}
                        getCategoryList={fetchCategoryList}
                        categoryList={categoryList}
                        messages={messages}
                    />
                </Tab.Pane>
            ),
        },

        {
            menuItem: messages['country'],
            render: () => (
                <Tab.Pane>
                    <TabCountry
                        create={props.createCountry}
                        getCountryList={fetchCountryList}
                        countryList={countryList}
                        clearCountryList={clearCountryList}
                        currencyOptions={currencyOptions}
                        updateCountry={updateCountry}
                        messages={messages}
                    />
                </Tab.Pane>
            ),
        },

        {
            menuItem: messages['product_category'],
            render: () => (
                <Tab.Pane>
                    <ProductCategory
                        create={props.createCategory}
                        categoryList={categoryList}
                        getCategoryList={fetchCategoryList}
                        update={updateCategory}
                        clear={clearCategoryList}
                        messages={messages}
                    />
                </Tab.Pane>
            ),
        },

        {
            menuItem: messages['L__COMPANY'],
            render: () => (
                <Tab.Pane>
                    <TabCompany
                        companyList={companyList}
                        getList={fetchCompanyList}
                        update={props.updateCompany}
                        clear={clearCompanyList}
                        create={props.createCompany}
                        messages={messages}
                    />
                </Tab.Pane>
            ),
        },
    ];

    return (
        <div>
            <Tab
                menu={{ fluid: true, vertical: true, tabular: true }}
                panes={panes}
                menuposition="right"
                panes={panes}
                onTabChange={(event, { activeIndex }) => {
                    setActiveTab(activeIndex);
                }}
            />
        </div>
    );
};

function mapStateToProps(state) {
    return {
        companyList: state.werpreferenceReducer.companyList,
        branchList: state.werpreferenceReducer.branchList,
        countryList: state.werpreferenceReducer.countryList,
        categoryList: state.werpreferenceReducer.categoryList,

        currencyOptions: state.f4.currencyOptions,
        companyOptions: state.f4.companyOptions,
        countryOptions: state.f4.countryList,
        businessAreaList: state.f4.businessAreaList,
        stateList: state.f4.stateList,
    };
}

export default connect(mapStateToProps, {
    //reference
    f4FetchCurrencyList,
    f4FetchCompanyOptions,
    f4FetchCountryList,
    f4FetchBusinessAreaList,
    f4FetchBranchOptions,
    f4FetchStateList,
    f4FetchSubCompanies,

    //COMPANY
    fetchCompanyList,
    updateCompany,
    clearCompanyList,
    createCompany,

    //BRANCH
    fetchBranchList,
    createBranch,
    updateBranch,
    clearBranchList,

    //COUNTRY
    createCountry,
    fetchCountryList,
    clearCountryList,
    updateCountry,

    //CATEGORY
    createCategory,
    fetchCategoryList,
    updateCategory,
    clearCategoryList,
})(injectIntl(WerpReference));

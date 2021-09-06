import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import './style.css';
import {
    //Company
    createCompany,
    fetchCompanyList,
    updateCompany,
    clearCompanyList,
    //Branch
    //fetchBranchList,
    //clearBranchList,
    //Country
    createCountry,
    fetchCountryList,
    clearCountryList,
    updateCountry,
    //Category
    createCategory,
    fetchCategoryList,
    updateCategory,
    clearCategoryList,
} from './werpreferenceActions';

import { f4FetchCurrencyList } from '../../reference/f4/f4_action';
import TabCompany from './components/company/TabCompany';
import TabCountry from './components/country/TabCountry';
//import TabBranch from './components/country/TabBranch';
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
        currencyList = [],
        currencyOptions = [],
    } = props;

    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        props.f4FetchCurrencyList('werpreference');
    }, []);

    const panes = [
        // {
        //     menuItem: "Филиалы",
        //     render: () => (
        //         <Tab.Pane>
        //             <TabBranch
        //                 getBranchList={fetchBranchList}
        //             />
        //         </Tab.Pane>
        //     ),
        // },

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

        {
            menuItem: messages['country'],
            render: () => (
                <Tab.Pane>
                    <TabCountry
                        create={props.createCountry}
                        getCountryList={fetchCountryList}
                        countryList={countryList}
                        currencyList={currencyList}
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
        countryList: state.werpreferenceReducer.countryList,
        categoryList: state.werpreferenceReducer.categoryList,
        currencyList: state.f4.currencyList,
        currencyOptions: state.f4.currencyOptions,
    };
}

export default connect(mapStateToProps, {
    //reference
    f4FetchCurrencyList,

    //Company
    fetchCompanyList,
    updateCompany,
    clearCompanyList,
    createCompany,

    //Branch
    // fetchBranchList,
    // clearBranchList,

    //Country
    createCountry,
    fetchCountryList,
    clearCountryList,
    updateCountry,

    //Category
    createCategory,
    fetchCategoryList,
    updateCategory,
    clearCategoryList,
})(injectIntl(WerpReference));

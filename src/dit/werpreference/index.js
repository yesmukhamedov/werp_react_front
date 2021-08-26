import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';

import {
    createCompany,
    fetchCompanyList,
    updateCompany,
    clearCompanyList,
    createCategory,
    fetchCategoryList,
    updateCategory,
    clearCategoryList,
} from './werpreferenceActions';
import TabCompany from './components/company/TabCompany';
import ProductCategory from './components/productCategory/ProductCategory';

const WerpReference = props => {
    const {
        intl: { messages },
        fetchCompanyList,
        companyList = [],
        clearCompanyList,
        fetchCategoryList,
        categoryList = [],
        updateCategory,
        clearCategoryList,
    } = props;

    const [activeTab, setActiveTab] = useState(0);

    const panes = [
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

        { menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },

        {
            menuItem: messages['product_category'],
            render: () => (
                <Tab.Pane>
                    <ProductCategory
                        create={props.createCategory}
                        categoryList={categoryList}
                        getList={fetchCategoryList}
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
        categoryList: state.werpreferenceReducer.categoryList,
    };
}

export default connect(mapStateToProps, {
    //Company
    fetchCompanyList,
    updateCompany,
    clearCompanyList,
    createCompany,

    //Category
    createCategory,
    fetchCategoryList,
    updateCategory,
    clearCategoryList,
})(injectIntl(WerpReference));

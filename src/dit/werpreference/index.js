import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';

import {
    fetchCompanyList,
    updateCompany,
    fetchCategoryList,
    updateCategory,
    clearCategoryList,
    createCompany,
} from './werpreferenceActions';
import TabCompany from './components/company/TabCompany';
import { ProductCategory } from './components/productCategory/ProductCategory';

const WerpReference = props => {
    const {
        intl: { messages },
        fetchCompanyList,
        companyList = [],
        categoryList = [],
    } = props;

    useEffect(() => {
        fetchCompanyList();
    }, []);

    const panes = [
        {
            menuItem: messages['L__COMPANY'],
            render: () => (
                <Tab.Pane>
                    <TabCompany
                        messages={messages}
                        companyList={companyList}
                        create={createCompany}
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
                        messages={messages}
                        data={categoryList}
                        getList={props.fetchCategoryList}
                        update={props.updateCategory}
                        clear={props.clearCategoryList}
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
                defaultActiveIndex={2}
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
    //Category
    fetchCategoryList,
    updateCategory,
    clearCategoryList,
    createCompany,
})(injectIntl(WerpReference));

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';

import {
    fetchKaspiProducts,
    createKaspiProduct,
    updateKaspiProduct,
    clearKaspiProducts,
    creatStore,
    updateStore,
    deleteStore,
    fetchStoreList,
    clearStoreList,
    fetchKaspiBrands,
    fetchKaspiCompanies,
    deleteProduct,
} from './mrkaspiAction';
import KaspiProducts from './components/kaspiProducts/KaspiProducts';
import KaspiStore from './components/kaspiStore/KaspiStore';
import './style.css';

const Mrkaspi = props => {
    const {
        brandList = [],
        storeList = [],
        companyList = [],
        kaspiProducts = [],
    } = props;
    const panes = [
        {
            menuItem: 'Список товаров в Каспи',
            render: () => (
                <Tab.Pane>
                    <KaspiProducts
                        fetchKaspiProducts={props.fetchKaspiProducts}
                        createKaspiProduct={props.createKaspiProduct}
                        updateKaspiProduct={props.updateKaspiProduct}
                        kaspiProducts={kaspiProducts}
                        clearKaspiProducts={props.clearKaspiProducts}
                        fetchStoreList={props.fetchStoreList}
                        storeList={storeList}
                        clearStoreList={props.clearStoreList}
                        fetchKaspiBrands={props.fetchKaspiBrands}
                        brandList={brandList}
                        fetchKaspiCompanies={props.fetchKaspiCompanies}
                        companyList={companyList}
                        deleteProduct={props.deleteProduct}
                    />
                </Tab.Pane>
            ),
        },
        {
            menuItem: 'Список пунктов выдачи',
            render: () => (
                <Tab.Pane>
                    <KaspiStore
                        fetchStoreList={props.fetchStoreList}
                        clearStoreList={props.clearStoreList}
                        storeList={props.storeList}
                        creatStore={props.creatStore}
                        updateStore={props.updateStore}
                        deleteStore={props.deleteStore}
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
                grid={{ paneWidth: 14, tabWidth: 2 }}
            />
        </div>
    );
};

function mapStateToProps(state) {
    return {
        kaspiProducts: state.mrkaspiReducer.kaspiProducts,
        storeList: state.mrkaspiReducer.storeList,
        brandList: state.mrkaspiReducer.brandList,
        companyList: state.mrkaspiReducer.companyList,
    };
}

export default connect(mapStateToProps, {
    fetchKaspiProducts,
    createKaspiProduct,
    updateKaspiProduct,
    clearKaspiProducts,
    fetchStoreList,
    creatStore,
    updateStore,
    deleteStore,
    clearStoreList,
    fetchKaspiBrands,
    fetchKaspiCompanies,
    deleteProduct,
})(Mrkaspi);

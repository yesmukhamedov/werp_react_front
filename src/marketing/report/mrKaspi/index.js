import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';
import {
    fetchKaspiProducts,
    clearKaspiProducts,
    creatStore,
    updateStore,
    deleteStore,
    fetchStoreList,
    clearStoreList,
} from './mrkaspiAction';
import KaspiProducts from './components/kaspiProducts/KaspiProducts';
import KaspiStore from './components/kaspiStore/KaspiStore';
import './style.css';

const Mrkaspi = props => {
    const panes = [
        {
            menuItem: 'Список товаров в Каспи',
            render: () => (
                <Tab.Pane>
                    <KaspiProducts
                        fetchKaspiProducts={props.fetchKaspiProducts}
                        kaspiProducts={props.kaspiProducts}
                        clearKaspiProducts={props.clearKaspiProducts}
                        fetchStoreList={props.fetchStoreList}
                        storeList={props.storeList}
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
            />
        </div>
    );
};

function mapStateToProps(state) {
    return {
        kaspiProducts: state.marketing.kaspiProducts,
        storeList: state.marketing.storeList,
    };
}

export default connect(mapStateToProps, {
    fetchKaspiProducts,
    clearKaspiProducts,
    fetchStoreList,
    creatStore,
    updateStore,
    deleteStore,
    clearStoreList,
})(Mrkaspi);

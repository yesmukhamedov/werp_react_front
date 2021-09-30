import React, { useState, useEffect } from 'react';
// import { useState, useEffect } from 'react';
import {
    Container,
    Segment,
    Form,
    Dropdown,
    Table,
    Grid,
    Button,
    Icon,
    Menu,
    Header,
    Tab,
} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import { fetchDynamicFAGM, clearDynObj } from '../../fa_action';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import DropdownClearable from '../../../utils/DropdownClearable';
import FindParams from './tabs/FindParams';
import Total from './tabs/Total';
import Detail from './tabs/Detail';
import { f4FetchCountryList } from '../../../reference/f4/f4_action';

const Frep3 = props => {
    const {
        intl: { messages },
        language,
        countryList = [],
        companyOptions = [],
        branchOptionsService,
        smsetplpList = [],
        updateSmsetplpData = {},
    } = props;
    console.log('kerek:  ', companyOptions);
    const [defaultPane, setDefaultPane] = useState(0);
    //Вкладк

    const panes = [
        {
            menuItem: (
                <Menu.Item key={0} onClick={() => setDefaultPane(0)}>
                    {'Параметры поиска'}
                </Menu.Item>
            ),
            pane: (
                <Tab.Pane key={0}>
                    <FindParams />
                </Tab.Pane>
            ),
        },
        {
            menuItem: (
                <Menu.Item key={1} onClick={() => setDefaultPane(1)}>
                    Результаты
                </Menu.Item>
            ),
            pane: (
                <Tab.Pane key={1}>
                    <Total />
                </Tab.Pane>
            ),
        },
        {
            menuItem: (
                <Menu.Item key={2} onClick={() => setDefaultPane(2)}>
                    Подробные
                </Menu.Item>
            ),
            pane: (
                <Tab.Pane key={2}>
                    <Detail />
                </Tab.Pane>
            ),
        },
    ];

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
            <Segment>
                <h3>Расходы Касса/Банк</h3>
            </Segment>
            <Tab
                activeIndex={defaultPane}
                menu={{ attached: true, tabular: false, pointing: true }}
                panes={panes}
                renderActiveOnly={false}
            />
        </Container>
    );
};
function mapStateToProps(state) {
    console.log('ertyuio', state.userInfo);
    return {
        companyOptions: state.userInfo.companyOptions,
    };
}

export default connect(mapStateToProps, {
    fetchDynamicFAGM,
})(injectIntl(Frep3));

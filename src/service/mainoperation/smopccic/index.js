import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import SearchCustomer from './tabs/SearchCustomer';
import MyApplication from './tabs/MyApplication';
import TransferApplicationEntry from './tabs/TransferApplicationEntry';
import {
  Container,
  Tab,
  Segment,
  Menu,
  Label,
  Button,
} from 'semantic-ui-react';
import {
  f4fetchCategory,
  f4FetchCountryList,
  f4FetchConStatusList,
  f4FetchBranches,
  f4FetchServiceAppStatus,
} from '../../../reference/f4/f4_action';
import { fetchBukrsOptions } from '../../../reference/f4/bukrs/BukrsOptions';
import '../../service.css';

const Smopccic = props => {
  const {
    intl: { messages },
    language,
    contractStatusList = [],
    category = [],
    companyOptions = [],
    countryList = [],
    branches = [],
    serviceAppStatus = [],
  } = props;

  console.log('PROPS SMOPCCIC', props);

  useEffect(() => {
    props.f4FetchCountryList();
    props.f4FetchBranches();
    props.f4fetchCategory();
    props.f4FetchConStatusList();
    props.f4FetchServiceAppStatus();
  }, []);

  const tovarCategoryOptions = category.map(item => {
    return {
      key: item.id,
      text: item.name,
      value: item.id,
    };
  });

  const countryOptions = countryList.map(item => {
    return {
      key: item.countryId,
      text: item.country,
      value: item.countryId,
    };
  });

  const finStatusOptions = contractStatusList.map(item => {
    return {
      key: item.contract_status_id,
      text: item.name,
      value: item.contract_status_id,
    };
  });

  const serviceAppStatusOptions = serviceAppStatus.map(item => {
    return {
      key: item.id,
      text: item.name,
      value: item.id,
    };
  });

  //Вкладки
  const panes = [
    {
      menuItem: (
        <Menu.Item key={1}>
          Поиск клиентов<Label color="teal">15</Label>
        </Menu.Item>
      ),
      pane: (
        <Tab.Pane key={1}>
          <SearchCustomer
            companyOptions={companyOptions}
            countryOptions={countryOptions}
            tovarCategoryOptions={tovarCategoryOptions}
            branches={branches}
            finStatusOptions={finStatusOptions}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: (
        <Menu.Item key={2}>
          Перенос<Label color="teal">15</Label>
        </Menu.Item>
      ),
      pane: (
        <Tab.Pane key={2}>
          <TransferApplicationEntry />
        </Tab.Pane>
      ),
    },
    {
      menuItem: (
        <Menu.Item key={3}>
          Мои заявки<Label color="teal">15</Label>
        </Menu.Item>
      ),
      pane: (
        <Tab.Pane key={3}>
          <MyApplication
            companyOptions={companyOptions}
            countryOptions={countryOptions}
            branches={branches}
            tovarCategoryOptions={tovarCategoryOptions}
            serviceAppStatusOptions={serviceAppStatusOptions}
          />
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
      <Segment className="spaceBetween alignItemsCenter">
        <h3 className="alignItemsCenter marginBottom-0">
          Оператор call center по входящим звонкам
        </h3>
        <a href="/service/mainoperation/smccald" target="_blank">
          <Button color="teal">Создать заявку без данных</Button>
        </a>
      </Segment>

      <Tab
        menu={{ attached: true, tabular: false, pointing: true }}
        panes={panes}
        renderActiveOnly={false}
      />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    companyOptions: state.userInfo.companyOptions,
    countryList: state.f4.countryList,
    category: state.f4.category,
    branches: state.f4.branches,
    serviceAppStatus: state.f4.serviceAppStatus,
    contractStatusList: state.f4.contractStatusList,
  };
}

export default connect(mapStateToProps, {
  f4fetchCategory,
  f4FetchCountryList,
  f4FetchConStatusList,
  f4FetchBranches,
  f4FetchServiceAppStatus,
})(injectIntl(Smopccic));

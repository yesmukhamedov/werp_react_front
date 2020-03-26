import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import AssignedCalls from './tabs/AssignedCalls';
import MyApplication from './tabs/MyApplication';
import ServiceFilterVC from './tabs/ServiceFilterVC';
import TransferApplication from './tabs/TransferApplication';
import { Container, Tab, Segment, Menu, Label } from 'semantic-ui-react';
import {
  f4fetchCategory,
  f4FetchStaffList,
  f4FetchServiceStatusList,
  f4FetchCountryList,
  f4FetchConStatusList,
  f4FetchBranches,
} from '../../../reference/f4/f4_action';
import { fetchServiceTypeId } from '../../mainoperation/smcs/smcsAction';
import { fetchServiceListManager } from '../../report/serviceReportAction';
import '../../service.css';
import './style.css';

const Smopccoc = props => {
  const {
    // intl: { messages },
    // language,
  } = props;

  const {
    f4fetchCategory,
    f4FetchServiceStatusList,
    f4FetchCountryList,
    f4FetchConStatusList,
    f4FetchBranches,
  } = props;

  const {
    // serviceTypeId,
    // srlsmList,
    // serviceStatusList,
    companyOptions,
    countryList,
    category,

    contractStatusList,
    branches,
  } = props;

  useEffect(() => {
    f4fetchCategory();
    fetchServiceTypeId();
    f4FetchServiceStatusList();
    f4FetchCountryList();
    f4FetchConStatusList();
    f4FetchBranches();
  }, []);

  const categoryOptions = category.map(item => {
    return {
      key: item.id,
      text: item.name,
      value: item.id,
    };
  });

  const serviceDateTypeOptions = [
    {
      key: 1,
      text: 'Текущий',
      value: 1,
    },
    {
      key: 2,
      text: 'Просроченный',
      value: 2,
    },
    {
      key: 3,
      text: 'Тек. Просроченный',
      value: 3,
    },
  ];

  const warrantyOptions = [
    {
      key: 1,
      text: 'Отмена',
      value: 1,
    },
    {
      key: 2,
      text: 'Перенос',
      value: 2,
    },
    {
      key: 3,
      text: 'Выполнен',
      value: 3,
    },
  ];

  const countryOptions = countryList.map(item => {
    return {
      key: parseInt(item.countryId, 10),
      text: `${item.country}`,
      value: parseInt(item.countryId, 10),
    };
  });

  const finStatusOption = contractStatusList.map(item => {
    return {
      key: parseInt(item.contract_status_id, 10),
      text: `${item.name}`,
      value: parseInt(item.contract_status_id, 10),
    };
  });

  //Вкладки
  const panes = [
    {
      menuItem: (
        <Menu.Item key={1}>
          План по сервис пакетам<Label color="teal">15</Label>
        </Menu.Item>
      ),
      pane: (
        <Tab.Pane key={1}>
          <ServiceFilterVC
            companyOptions={companyOptions}
            branches={branches}
            countryOptions={countryOptions}
            finStatusOption={finStatusOption}
            serviceDateTypeOptions={serviceDateTypeOptions}
            categoryOptions={categoryOptions}
            warrantyOptions={warrantyOptions}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: (
        <Menu.Item key={2}>
          Перенесенные заявки<Label color="teal">15</Label>
        </Menu.Item>
      ),
      pane: (
        <Tab.Pane key={2}>
          <TransferApplication
            companyOptions={companyOptions}
            branches={branches}
            countryOptions={countryOptions}
            finStatusOption={finStatusOption}
            serviceDateTypeOptions={serviceDateTypeOptions}
            categoryOptions={categoryOptions}
            warrantyOptions={warrantyOptions}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: (
        <Menu.Item key={3}>
          Назначенные звонки<Label color="teal">15</Label>
        </Menu.Item>
      ),
      pane: (
        <Tab.Pane key={3}>
          <AssignedCalls
            companyOptions={companyOptions}
            branches={branches}
            countryOptions={countryOptions}
            finStatusOption={finStatusOption}
            serviceDateTypeOptions={serviceDateTypeOptions}
            categoryOptions={categoryOptions}
            warrantyOptions={warrantyOptions}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: (
        <Menu.Item key={4}>
          Мои заявки<Label color="teal">15</Label>
        </Menu.Item>
      ),
      pane: (
        <Tab.Pane key={4}>
          <MyApplication
            companyOptions={companyOptions}
            branches={branches}
            countryOptions={countryOptions}
            finStatusOption={finStatusOption}
            serviceDateTypeOptions={serviceDateTypeOptions}
            categoryOptions={categoryOptions}
            warrantyOptions={warrantyOptions}
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
      <Segment as="h2">План по профилактики</Segment>

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
    serviceTypeId: state.smcsReducer.serviceTypeId,
    srlsmList: state.serviceReportReducer.srlsmList,
    companyOptions: state.userInfo.companyOptions,
    countryList: state.f4.countryList,
    category: state.f4.category,
    serviceStatusList: state.f4.serviceStatusList,
    contractStatusList: state.f4.contractStatusList,
    branches: state.f4.branches,
  };
}

export default connect(mapStateToProps, {
  fetchServiceListManager,
  f4fetchCategory,
  f4FetchStaffList,
  f4FetchServiceStatusList,
  f4FetchCountryList,
  f4FetchConStatusList,
  f4FetchBranches,
})(injectIntl(Smopccoc));

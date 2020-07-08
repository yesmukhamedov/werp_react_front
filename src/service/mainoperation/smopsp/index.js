import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import AssignedCalls from './tabs/AssignedCalls';
import MyApplication from './tabs/MyApplication';
import ServiceFilterVC from './tabs/ServiceFilterVC';
import TransferApplication from './tabs/TransferApplication';
import { Container, Tab, Segment, Menu, Button } from 'semantic-ui-react';
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

const Smopccoc = props => {
  const {
    intl: { messages },
  } = props;

  const {
    f4fetchCategory,
    f4FetchServiceStatusList,
    f4FetchCountryList,
    f4FetchConStatusList,
    f4FetchBranches,
  } = props;

  const {
    companyOptions,
    countryList,
    category,
    contractStatusList,
    branches,
    branchOptions,
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
  ];

  const warrantyOptions = [
    {
      key: 1,
      text: 'С гарантией',
      value: 1,
    },
    {
      key: 2,
      text: 'Без гарантии',
      value: 2,
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
        <Menu.Item key={1}>{messages['service_packet_plan']}</Menu.Item>
      ),
      pane: (
        <Tab.Pane key={1}>
          <ServiceFilterVC
            companyOptions={companyOptions}
            branchOptions={branchOptions}
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
        <Menu.Item key={2}>{messages['rescheduled_applications']}</Menu.Item>
      ),
      pane: (
        <Tab.Pane key={2}>
          <TransferApplication
            companyOptions={companyOptions}
            branchOptions={branchOptions}
            countryOptions={countryOptions}
            finStatusOption={finStatusOption}
            categoryOptions={categoryOptions}
            warrantyOptions={warrantyOptions}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: <Menu.Item key={3}>{messages['assigned_calls']}</Menu.Item>,
      pane: (
        <Tab.Pane key={3}>
          <AssignedCalls
            companyOptions={companyOptions}
            branchOptions={branchOptions}
            countryOptions={countryOptions}
            finStatusOption={finStatusOption}
            categoryOptions={categoryOptions}
            warrantyOptions={warrantyOptions}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: <Menu.Item key={4}>{messages['my_applications']}</Menu.Item>,
      pane: (
        <Tab.Pane key={4}>
          <MyApplication
            companyOptions={companyOptions}
            branchOptions={branchOptions}
            countryOptions={countryOptions}
            finStatusOption={finStatusOption}
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
      <Segment className="spaceBetween alignItemsCenter">
        <h3 className="alignItemsCenter marginBottom-0">
          {messages['cleaning_system_operator']}
        </h3>
        <a href="/service/mainoperation/smccald" target="_blank">
          <Button color="teal">
            {messages['create_request_without_data']}
          </Button>
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
    serviceTypeId: state.smcsReducer.serviceTypeId,
    srlsmList: state.serviceReportReducer.srlsmList,
    companyOptions: state.userInfo.companyOptions,
    countryList: state.f4.countryList,
    category: state.f4.category,
    serviceStatusList: state.f4.serviceStatusList,
    contractStatusList: state.f4.contractStatusList,
    branches: state.f4.branches,
    branchOptions: state.userInfo.branchOptionsService,
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

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl, defineMessages } from 'react-intl';
import AssignedCalls from './tabs/AssignedCalls';
import MyApplicationExodus from './tabs/MyApplicationExodus';
import ServiceFilterPlan from './tabs/ServiceFilterPlan';
import TransferApplicationExodus from './tabs/TransferApplicationExodus';
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
    serviceTypeId,
    srlsmList,
    companyOptions,
    countryList,
    serviceStatusList = [],
    contractStatusList,
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

  const countryOptions = countryList.map(item => {
    return {
      key: parseInt(item.countryId, 10),
      text: `${item.country}`,
      value: parseInt(item.countryId, 10),
    };
  });

  const serviceStatusOptions = serviceStatusList.map(item => {
    return {
      key: item.id,
      text: item.nameRu,
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

  const crmCategoryOptions = [
    { key: 1, text: 'Зеленый', value: 1 },
    { key: 2, text: 'Желтый', value: 2 },
    { key: 3, text: 'Красный', value: 3 },
    { key: 4, text: 'Черный', value: 4 },
  ];

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
        <Menu.Item key={1}>{messages['cartrige_change_plan']}</Menu.Item>
      ),
      pane: (
        <Tab.Pane key={1}>
          <ServiceFilterPlan
            serviceTypeId={serviceTypeId}
            srlsmList={srlsmList}
            companyOptions={companyOptions}
            countryOptions={countryOptions}
            finStatusOption={finStatusOption}
            crmCategoryOptions={crmCategoryOptions}
            serviceDateTypeOptions={serviceDateTypeOptions}
            serviceStatusList={serviceStatusList}
            contractStatusList={contractStatusList}
            branchOptions={branchOptions}
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
          <TransferApplicationExodus
            serviceTypeId={serviceTypeId}
            srlsmList={srlsmList}
            companyOptions={companyOptions}
            countryOptions={countryOptions}
            finStatusOption={finStatusOption}
            crmCategoryOptions={crmCategoryOptions}
            serviceStatusOptions={serviceStatusOptions}
            contractStatusList={contractStatusList}
            branchOptions={branchOptions}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: <Menu.Item key={3}>{messages['assigned_calls']}</Menu.Item>,
      pane: (
        <Tab.Pane key={3}>
          <AssignedCalls
            serviceTypeId={serviceTypeId}
            srlsmList={srlsmList}
            companyOptions={companyOptions}
            countryOptions={countryOptions}
            finStatusOption={finStatusOption}
            crmCategoryOptions={crmCategoryOptions}
            serviceStatusList={serviceStatusList}
            contractStatusList={contractStatusList}
            branchOptions={branchOptions}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: <Menu.Item key={4}>{messages['my_outgoing_app']}</Menu.Item>,
      pane: (
        <Tab.Pane key={4}>
          <MyApplicationExodus
            serviceTypeId={serviceTypeId}
            srlsmList={srlsmList}
            companyOptions={companyOptions}
            countryOptions={countryOptions}
            crmCategoryOptions={crmCategoryOptions}
            serviceStatusOptions={serviceStatusOptions}
            contractStatusList={contractStatusList}
            branchOptions={branchOptions}
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
          {messages['filter_change_operator']}
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
  fetchServiceTypeId,
})(injectIntl(Smopccoc));

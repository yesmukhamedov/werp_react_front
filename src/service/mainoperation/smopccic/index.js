import React, { useEffect } from 'react';
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
  f4FetchStaffList,
  f4FetchServiceStatusList,
  f4FetchCountryList,
  f4FetchConStatusList,
  f4FetchBranches,
} from '../../../reference/f4/f4_action';

import { fetchServiceTypeId } from '../../mainoperation/smcs/smcsAction';
import { fetchServiceListManager } from '../../report/serviceReportAction';
import '../../service.css';
import { classNames } from 'classnames';

const Smopccic = props => {
  const {
    intl: { messages },
    language,
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
    category,
    serviceStatusList,
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

  const countryOptions = countryList.map(item => {
    return {
      key: parseInt(item.countryId, 10),
      text: `${item.country}`,
      value: parseInt(item.countryId, 10),
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
            serviceTypeId={serviceTypeId}
            srlsmList={srlsmList}
            companyOptions={companyOptions}
            countryOptions={countryOptions}
            category={category}
            serviceStatusList={serviceStatusList}
            contractStatusList={contractStatusList}
            branches={branches}
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
          <TransferApplicationEntry
            serviceTypeId={serviceTypeId}
            srlsmList={srlsmList}
            companyOptions={companyOptions}
            countryOptions={countryOptions}
            category={category}
            serviceStatusList={serviceStatusList}
            contractStatusList={contractStatusList}
            branches={branches}
          />
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
            serviceTypeId={serviceTypeId}
            srlsmList={srlsmList}
            companyOptions={companyOptions}
            countryOptions={countryOptions}
            category={category}
            serviceStatusList={serviceStatusList}
            contractStatusList={contractStatusList}
            branches={branches}
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
  fetchServiceTypeId,
})(injectIntl(Smopccic));

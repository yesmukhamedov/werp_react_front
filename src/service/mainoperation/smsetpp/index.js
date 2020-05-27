import React, { useState, useEffect } from 'react';
import { Segment, Dropdown, Button, Icon, Divider } from 'semantic-ui-react';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';
import './index.css';
import { connect } from 'react-redux';
import 'react-table/react-table.css';
import AddPrice from './AddPrice';
import format from 'string-format';
import { injectIntl } from 'react-intl';
import { f4FetchCountryList } from '../../../reference/f4/f4_action';
import EditModal from './editPrice';
import {
  fetchSmsetpp,
  fetchSmsetppPremiumPriceType,
  fetchSmsetppType,
  clearDynObjService,
  fetchSmsetppHistory,
  fetchSmsetppServiceTypeId,
} from '../../serviceAction';
import OutputErrors from '../../../general/error/outputErrors';
import { errorTableText } from '../../../utils/helpers';

const Smsetpp = props => {
  const {
    data,
    intl: { messages },
    countryList = [],
    companyOptions = [],
    f4FetchCountryList,
    fetchSmsetpp,
    fetchSmsetppHistory,
    fetchSmsetppPremiumPriceType,
    serviceType = [],
    fetchSmsetppType,
    clearDynObjService,
    smsetppHistory = [],
    smsetppServiceType = [],
    premium,
  } = props;

  const [error, setError] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(false);
  const [typeOfService, setTypeOfService] = useState([]);
  const [secondActive, setSecondActive] = useState(false);
  const [serviceOptionPriceList, setServiceOptionPriceList] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);

  const [search, setSearch] = useState({
    bukrs: 0,
    countryId: 0,
    serviceTypeId: null,
    fc: null,
    mc: null,
  });

  console.log('SEARCH', search);

  const serviceTypeOptions = smsetppServiceType
    .filter(
      el =>
        el.id === '1' ||
        el.id === '2' ||
        el.id === '5' ||
        el.id === '6' ||
        el.id === '7',
    )
    .map(item => {
      return {
        key: parseInt(item.id),
        text: item.name,
        value: parseInt(item.id),
      };
    });

  useEffect(() => {
    // clearDynObjService();
    f4FetchCountryList();
    //fetchSmsetpp();
    fetchSmsetppPremiumPriceType();
    fetchSmsetppType();
    props.fetchSmsetppServiceTypeId();
  }, []);

  useEffect(() => {
    let country = countryList.map(item => {
      return {
        key: item.countryId,
        text: item.country,
        value: item.countryId,
        currencyid: item.currencyId,
        currency: item.currency,
      };
    });
    setCountryOptions(country);
  }, [countryList]);

  const fcOptions = [
    { key: 1, text: '1', value: 1 },
    { key: 2, text: '2', value: 2 },
    { key: 3, text: '3', value: 3 },
    { key: 4, text: '4', value: 4 },
  ];
  const mcOptions = [
    { key: 0, text: '0', value: 0 },
    { key: 1, text: '1', value: 1 },
  ];

  useEffect(() => {
    if (data.service !== undefined) {
      setServiceOptionPriceList(data.service);
    }
  }, [data]);

  useEffect(() => {
    let service = serviceType.map(item => {
      return { key: item.id, text: item.name, value: item.id };
    });
    setTypeOfService(service);
  }, [serviceType]);

  const onChange = (text, value) => {
    if (text === 'companyOptions') {
      setSearch({ ...search, bukrs: value });
      setActiveDropdown(true);
    }
    if (text === 'countries') {
      setSearch({ ...search, countryId: value });
      setSecondActive(true);
    }
    if (text === 'serviceType') {
      setSearch({ ...search, serviceTypeId: value });
      setSecondActive(true);
    }
    if (text === 'fc') {
      setSearch({ ...search, fc: value });
      setSecondActive(true);
    }
    if (text === 'mc') {
      setSearch({ ...search, mc: value });
      setSecondActive(true);
    }
  };

  const onClickButton = () => {
    const errors = [];
    if (!activeDropdown) {
      errors.push(errorTableText(5));
    }
    if (!secondActive) {
      errors.push(errorTableText(147));
    }
    if (errors.length === 0) {
      fetchSmsetpp(search);
      fetchSmsetppHistory(search);
    }
    setError(errors);
  };

  let historyColumns = [
    {
      Header: () => <div style={{ textAlign: 'center' }}>id</div>,
      accessor: 'id',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: () => (
        <div style={{ textAlign: 'center' }}>{messages['bukrs']}</div>
      ),
      accessor: 'bukrs',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: () => (
        <div style={{ textAlign: 'center' }}>{messages['Task.StartDate']}</div>
      ),
      accessor: 'dateStart',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: () => <div style={{ textAlign: 'center' }}>FC</div>,
      accessor: 'fc',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: () => <div style={{ textAlign: 'center' }}>MC</div>,
      accessor: 'mc',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: () => (
        <div style={{ textAlign: 'center' }}>{messages['office']}</div>
      ),
      accessor: 'office',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: () => (
        <div style={{ textAlign: 'center' }}>{messages['master']}</div>
      ),
      accessor: 'master',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: () => (
        <div style={{ textAlign: 'center' }}>{messages['Operator']}</div>
      ),
      accessor: 'operator',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: () => (
        <div style={{ textAlign: 'center' }}>{messages['discount']}</div>
      ),
      accessor: 'discount',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: () => (
        <div style={{ textAlign: 'center' }}>{messages['totalAmount']}</div>
      ),
      accessor: 'total',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: () => (
        <div style={{ textAlign: 'center' }}>{messages['country']}</div>
      ),
      accessor: 'countryId',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: () => (
        <div style={{ textAlign: 'center' }}>{messages['waers']}</div>
      ),
      accessor: 'waersId',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: () => (
        <div style={{ textAlign: 'center' }}>{messages['typeOfService']}</div>
      ),
      accessor: 'serviceTypeId',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: () => (
        <div style={{ textAlign: 'center' }}>{messages['typeOfAmount']}</div>
      ),
      accessor: 'premiumPriceTypeId',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: () => <div style={{ textAlign: 'center' }}>Тип операции</div>,
      accessor: 'revType',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: () => <div style={{ textAlign: 'center' }}>Автор</div>,
      accessor: 'fullname',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
  ];

  return (
    <Segment>
      <div className="setting">
        <div className="flex-container">
          <h1>{messages['setting_prices_and_premium_services']}</h1>
          <AddPrice
            param={search.bukrs !== 0 && search.countryId !== 0 ? search : null}
            serviceTypeOptions={serviceTypeOptions}
          />
        </div>

        <Dropdown
          clearable="true"
          selection
          options={companyOptions}
          placeholder={messages['bukrs']}
          onChange={(e, { value }) => onChange('companyOptions', value)}
        />

        <Dropdown
          clearable="true"
          selection
          options={activeDropdown ? countryOptions : []}
          placeholder={messages['country']}
          id="secondDropdown"
          onChange={(e, { value }) => onChange('countries', value)}
        />

        <Dropdown
          clearable="true"
          selection
          options={serviceTypeOptions}
          placeholder="Вид сервиса"
          id="secondDropdown"
          onChange={(e, { value }) => onChange('serviceType', value)}
        />

        <Dropdown
          clearable="true"
          selection
          options={fcOptions}
          placeholder="FC"
          id="secondDropdown"
          onChange={(e, { value }) => onChange('fc', value)}
        />
        <Dropdown
          clearable="true"
          selection
          options={mcOptions}
          placeholder="MC"
          id="secondDropdown"
          onChange={(e, { value }) => onChange('mc', value)}
        />
        <button
          className="ui blue inverted button"
          onClick={onClickButton}
          style={{ marginLeft: 30 }}
        >
          <i aria-hidden="true" className="search icon"></i>{' '}
          {messages['search']}
        </button>
        <OutputErrors errors={error} />
        <br></br>
        <br></br>

        <ReactTableWrapper
          data={serviceOptionPriceList}
          columns={[
            {
              Header: () => <div style={{ textAlign: 'center' }}>id</div>,
              accessor: 'id',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>{messages['bukrs']}</div>
              ),
              accessor: 'bukrs',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>
                  {messages['Task.StartDate']}
                </div>
              ),
              accessor: 'dateStart',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => <div style={{ textAlign: 'center' }}>FC</div>,
              accessor: 'fc',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => <div style={{ textAlign: 'center' }}>MC</div>,
              accessor: 'mc',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>{messages['office']}</div>
              ),
              accessor: 'office',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>{messages['master']}</div>
              ),
              accessor: 'master',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>
                  {messages['Operator']}
                </div>
              ),
              accessor: 'operator',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>
                  {messages['discount']}
                </div>
              ),
              accessor: 'discount',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>
                  {messages['totalAmount']}
                </div>
              ),
              accessor: 'total',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>{messages['country']}</div>
              ),
              accessor: 'countryId',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>{messages['waers']}</div>
              ),
              accessor: 'waers',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>
                  {messages['typeOfService']}
                </div>
              ),
              accessor: 'serviceTypeId',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>
                  {messages['typeOfAmount']}
                </div>
              ),
              accessor: 'premiumPriceTypeId',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>{messages['toEdit']}</div>
              ),
              filterable: false,
              Cell: ({ row }) => (
                <div style={{ textAlign: 'center' }}>
                  <EditModal
                    param={
                      search.bukrs !== 0 && search.countryId !== 0
                        ? search
                        : null
                    }
                    row={row}
                    serviceTypeOptions={serviceTypeOptions}
                  />
                </div>
              ),
            },
          ]}
          defaultPageSize={10}
          showPagination={true}
          pageSizeOptions={[10, 20, 30, 40]}
        />
        <Divider />
        <Segment>
          <h1>История редактирования</h1>
        </Segment>
        <ReactTableWrapper
          data={smsetppHistory}
          columns={historyColumns}
          pageSize={smsetppHistory.length < 10 ? smsetppHistory.length : 10}
          showPagination={true}
          pageSizeOptions={[10, 20, 30, 40]}
        />
      </div>
    </Segment>
  );
};

const mapStateToProps = state => {
  return {
    premium: state.serviceReducer.dynamicObject.premiumPriceTypeId,
    data: state.serviceReducer.dynamicObject,
    countryList: state.f4.countryList,
    companyOptions: state.userInfo.companyOptions,
    serviceType: state.serviceReducer.dynamicObject.type,
    smsetppHistory: state.serviceReducer.dynamicObject.smsetppHistory,
    smsetppServiceType: state.serviceReducer.dynamicObject.smsetppServiceType,
  };
};

export default connect(mapStateToProps, {
  f4FetchCountryList,
  fetchSmsetpp,
  fetchSmsetppPremiumPriceType,
  fetchSmsetppType,
  clearDynObjService,
  fetchSmsetppHistory,
  fetchSmsetppServiceTypeId,
})(injectIntl(Smsetpp));

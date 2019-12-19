import React, { useState, useEffect, Fragment } from 'react';
import {
  Segment,
  Dropdown,
  Icon,
  Button,
  Label,
  Message,
} from 'semantic-ui-react';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';
import './index.css';
import { connect } from 'react-redux';
import 'react-table/react-table.css';
import MoDal from './modal';
import { injectIntl } from 'react-intl';
import { f4FetchCountryList } from '../../../reference/f4/f4_action';
import EditModal from './editModal';
import { fetchSmsetpp, clearDynObjService } from './../../serviceAction';
import OutputErrors from '../../../general/error/outputErrors';

const Page = props => {
  const {
    data,
    intl: { messages },
    countryList = [],
    companyOptions = [],
    f4FetchCountryList,
    fetchSmsetpp,
  } = props;
  const [error, setError] = useState([]);
  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const language = localStorage.getItem('language');
  const [activeDropdown, setActiveDropdown] = useState(false);
  const [secondActive, setSecondActive] = useState(false);
  const [allDropdownActive, setAllDropdownActive] = useState(false);
  const [countries, setCountries] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [test, setTest] = useState([]);
  const [searchCompany, setSearchCompany] = useState('');
  const [searchCountry, setSearchCountry] = useState('');
  const [searchCopyCompany, setSearchCopyCompany] = useState('');
  const [searchCopyCountry, setSearchCopyCountry] = useState('');

  useEffect(() => {
    fetchSmsetpp();
    f4FetchCountryList();
  }, []);

  useEffect(() => {
    let service = data.service.map(item => {
      return {
        bukrs: item.bukrs,
        country: countryList[item.countryId].country,
        dateStart: item.dateStart,
        discount: item.discount,
        fc: item.fc,
        id: item.id,
        master: item.master,
        mc: item.mc,
        office: item.office,
        operator: item.operator,
        serviceTypeId: item.serviceTypeId,
        total: item.total,
        waers: item.waers,
      };
    });
    setTest(service);
  }, [data]);

  useEffect(() => {
    let country = countryList.map(item => {
      return { key: item.countryId, text: item.country, value: item.country };
    });
    setCountries(country);
    let company = companyOptions.map(item => {
      return { key: item.key, text: item.text, value: item.text };
    });
    setCompanies(company);
  }, [countryList, data]);

  const onChange = (text, value) => {
    if (text === 'companies') {
      setSearchCopyCompany(value);
      setActiveDropdown(true);
    }
    if (text === 'countries') {
      setSearchCopyCountry(value);
      setSecondActive(true);
    }
  };

  const dropdownCountry = () => {
    setAllDropdownActive(true);
  };

  const onClickButton = () => {
    if (allDropdownActive && secondActive) {
      setSearchCompany(searchCopyCompany);
      setSearchCountry(searchCopyCountry);
    } else {
      save();
    }
  };
  console.log(countryList, 'couyntry');
  const validate = () => {
    const errors = [];
    if (!activeDropdown) {
      errors.push(errorTable[`5${language}`]);
    }
    if (!secondActive) {
      errors.push(errorTable[`147${language}`]);
    }

    return errors;
  };

  const save = () => {
    let errors = [];
    errors = validate();
    if (errors === null || errors === undefined || errors.length === 0) {
    }
    setError(() => errors);
  };

  let filter1 = test.filter(test => {
    return (
      test.bukrs
        .toLowerCase()
        .toUpperCase()
        .indexOf(searchCompany.toLowerCase().toUpperCase()) !== -1
    );
  });

  let filter2 = filter1.filter(test => {
    return (
      test.country
        .toLowerCase()
        .toUpperCase()
        .indexOf(searchCountry.toLowerCase().toUpperCase()) !== -1
    );
  });

  return (
    <Segment>
      <div className="setting">
        <div className="flex-container">
          <h1>{messages['setting_prices_and_premium_services']}</h1>
          <MoDal />
        </div>

        <Dropdown
          clearable="true"
          selection
          options={companies}
          placeholder={messages['bukrs']}
          onClick={() => setAllDropdownActive(true)}
          onChange={(e, { value }) => onChange('companies', value)}
        />

        <Dropdown
          clearable="true"
          selection
          options={activeDropdown ? countries : []}
          placeholder={messages['country']}
          id="secondDropdown"
          onClick={dropdownCountry}
          onChange={(e, { value }) => onChange('countries', value)}
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
          data={filter2}
          columns={[
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
              accessor: 'country',
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
              accessor: 'typeOfService',
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
              accessor: 'typeOfSum',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>{messages['toEdit']}</div>
              ),
              accessor: 'age',
              filterable: false,
              Cell: () => (
                <div style={{ textAlign: 'center' }}>
                  <EditModal />
                </div>
              ),
            },
          ]}
          defaultPageSize={15}
          pages={2}
          previousText={messages['Table.Previous']}
          nextText={messages['Table.Next']}
          showPagination={true}
          className="-striped -highlight"
          pageSizeOptions={[20, 30, 40]}
          loadingText={messages['Table.Next']}
          noDataText={messages['Table.NoData']}
          rowsText={messages['Table.Rows']}
          pageText={messages['Table.Page']}
          ofText={messages['Table.Of']}
        />
      </div>
    </Segment>
  );
};

const mapStateToProps = state => {
  return {
    data: state.serviceReducer.data,
    countryList: state.f4.countryList,
    companyOptions: state.userInfo.companyOptions,
    informations: state.serviceReducer.data,
  };
};

export default connect(mapStateToProps, {
  f4FetchCountryList,
  fetchSmsetpp,
})(injectIntl(Page));

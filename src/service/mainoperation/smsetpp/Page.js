import React, { useState, useEffect, Fragment } from 'react';
import { Segment, Dropdown, Icon, Button } from 'semantic-ui-react';
import './index.css';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
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
    informations,
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
  console.log(data);
  useEffect(() => {
    setTest(data.service);
  }, [data]);

  useEffect(() => {
    let country = countryList.map(item => {
      return { key: item.countryId, text: item.country, value: item.countryId };
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

  const validate = () => {
    const errors = [];
    if (!activeDropdown) {
      errors.push(errorTable[`5${language}`]);
    }
    if (!secondActive) {
      errors.push(errorTable[`147${language}`]);
    }
    console.log(errors);
    return errors;
  };

  const save = () => {
    let errors = [];
    errors = validate();
    if (errors === null || errors === undefined || errors.length === 0) {
    }
    setError(() => errors);
  };

  let f = test.filter(test => {
    return (
      test.bukrs
        .toLowerCase()
        .toUpperCase()
        .indexOf(searchCompany.toLowerCase().toUpperCase()) !== -1
    );
  });
  return (
    <Segment>
      <div className="setting">
        <div className="flex-container">
          <h1>Настройка цен и премии сервис услуг</h1>
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
          id="addPrice2"
          className="ui blue inverted button"
          onClick={onClickButton}
          style={{ marginLeft: 30 }}
        >
          <i aria-hidden="true" className="search icon"></i> Поиск
        </button>
        <OutputErrors errors={error} />
        <br></br>
        <br></br>
        <ReactTable
          data={f}
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
              Header: () => <div style={{ textAlign: 'center' }}>Офис</div>,
              accessor: 'office',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => <div style={{ textAlign: 'center' }}>Мастер</div>,
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
                <div style={{ textAlign: 'center' }}>Общая сумма</div>
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
                <div style={{ textAlign: 'center' }}>Вид сервиса</div>
              ),
              accessor: 'typeOfService',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>Вид суммы</div>
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
          previousText="Предыдущий"
          nextText="Следующий"
          showPagination={true}
          className="-striped -highlight"
          pageSizeOptions={[20, 30, 40]}
          loadingText="Loading..."
          noDataText="Нет записей"
          rowsText="строк"
          pageText="Страница"
          ofText="из"
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

import React, { useState, useEffect, Fragment } from 'react';
import { Segment, Dropdown, Icon, Button } from 'semantic-ui-react';
import './index.css';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import MoDal from './modal';
import { f4FetchCountryList } from '../../../reference/f4/f4_action';
import EditModal from './editModal';
const Page = props => {
  const {
    countryList = [],
    companyOptions = [],
    f4FetchCountryList,
    informations,
  } = props;
  const [activeDropdown, setActiveDropdown] = useState(false);
  const [secondActive, setSecondActive] = useState(false);
  const [allDropdownActive, setAllDropdownActive] = useState(false);
  const [countries, setCountries] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [test, setTest] = useState([
    { company: 'Aura', country: 'Kazakhstan' },
    { company: 'Greenlight', country: 'China' },
    { company: 'construction', country: 'Turkey' },
  ]);
  const [searchCompany, setSearchCompany] = useState('');
  const [searchCountry, setSearchCountry] = useState('');
  const [searchCopyCompany, setSearchCopyCompany] = useState('');
  const [searchCopyCountry, setSearchCopyCountry] = useState('');
  useEffect(() => {
    f4FetchCountryList();
  }, []);

  useEffect(() => {
    let country = countryList.map(item => {
      return { key: item.countryId, text: item.country, value: item.country };
    });
    setCountries(country);
    let company = companyOptions.map(item => {
      return { key: item.key, text: item.text, value: item.text };
    });
    setCompanies(company);
  }, [countryList]);

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
    setSearchCompany(searchCopyCompany);
    setSearchCountry(searchCopyCountry);
  };

  let f = test.filter(test => {
    return (
      test.company
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
          placeholder="Компания"
          onClick={() => setAllDropdownActive(true)}
          onChange={(e, { value }) => onChange('companies', value)}
        />
        <Dropdown
          clearable="true"
          selection
          options={activeDropdown ? countries : []}
          placeholder="Страна"
          id="secondDropdown"
          onClick={dropdownCountry}
          onChange={(e, { value }) => onChange('countries', value)}
        />
        <button
          id="addPrice2"
          className="ui blue inverted button"
          onClick={allDropdownActive && secondActive ? onClickButton : null}
          style={{ marginLeft: 30 }}
        >
          <i aria-hidden="true" className="search icon"></i> Поиск
        </button>
        <br></br>
        <br></br>
        <br></br>
        <ReactTable
          data={f.filter(test => {
            return (
              test.country
                .toLowerCase()
                .toUpperCase()
                .indexOf(searchCountry.toLowerCase().toUpperCase()) !== -1
            );
          })}
          columns={[
            {
              Header: () => <div style={{ textAlign: 'center' }}>Kомпания</div>,
              accessor: 'company',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>Дата начало</div>
              ),
              accessor: 'startDate',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => <div style={{ textAlign: 'center' }}>FC</div>,
              accessor: 'FC',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => <div style={{ textAlign: 'center' }}>MC</div>,
              accessor: 'MC',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => <div style={{ textAlign: 'center' }}>Офис</div>,
              accessor: 'Office',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => <div style={{ textAlign: 'center' }}>Мастер</div>,
              accessor: 'Master',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => <div style={{ textAlign: 'center' }}>Оператор</div>,
              accessor: 'Operator',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => <div style={{ textAlign: 'center' }}>Скидка</div>,
              accessor: 'Sale',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>Общая сумма</div>
              ),
              accessor: 'TotalNum',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => <div style={{ textAlign: 'center' }}>Страна</div>,
              accessor: 'country',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => <div style={{ textAlign: 'center' }}>Валюта</div>,
              accessor: 'Currency',
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
                <div style={{ textAlign: 'center' }}>Редактирование</div>
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
    countryList: state.f4.countryList,
    companyOptions: state.userInfo.companyOptions,
    informations: state.serviceReducer.data,
  };
};

export default connect(mapStateToProps, {
  f4FetchCountryList,
})(Page);

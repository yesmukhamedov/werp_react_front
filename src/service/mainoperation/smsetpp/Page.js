import React, { useState, useEffect } from 'react';
import { Segment, Dropdown } from 'semantic-ui-react';
import { Icon, Button } from 'semantic-ui-react';
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
          onClick={() => (setActiveDropdown(true), setAllDropdownActive(true))}
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
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>Дата начало</div>
              ),
              accessor: 'startDate',
            },
            {
              Header: () => <div style={{ textAlign: 'center' }}>FC</div>,
              accessor: 'FC',
            },
            {
              Header: () => <div style={{ textAlign: 'center' }}>MC</div>,
              accessor: 'MC',
            },
            {
              Header: () => <div style={{ textAlign: 'center' }}>Офис</div>,
              accessor: 'Office',
            },
            {
              Header: () => <div style={{ textAlign: 'center' }}>Мастер</div>,
              accessor: 'Master',
            },
            {
              Header: () => <div style={{ textAlign: 'center' }}>Оператор</div>,
              accessor: 'Operator',
            },
            {
              Header: () => <div style={{ textAlign: 'center' }}>Скидка</div>,
              accessor: 'Sale',
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>Общая сумма</div>
              ),
              accessor: 'TotalNum',
            },
            {
              Header: () => <div style={{ textAlign: 'center' }}>Страна</div>,
              accessor: 'country',
            },
            {
              Header: () => <div style={{ textAlign: 'center' }}>Валюта</div>,
              accessor: 'Currency',
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>Вид сервиса</div>
              ),
              accessor: 'typeOfService',
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>Вид суммы</div>
              ),
              accessor: 'typeOfSum',
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>Редактирование</div>
              ),
              accessor: 'age',
              filterable: false,
              Cell: () => <EditModal />,
            },
          ]}
          defaultPageSize={15}
          pages={2}
          previousText={'Предыдущий'}
          nextText={'Следующий'}
          showPagination={true}
          className="-striped -highlight"
          pageSizeOptions={[20, 30, 40]}
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

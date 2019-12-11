import React, { useState, useEffect } from 'react';
import { Segment, Dropdown } from 'semantic-ui-react';
import { Icon, Button } from 'semantic-ui-react';
import './index.css';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import MoDal from './modal';
import { f4FetchCountryList } from '../../../reference/f4/f4_action';

const Page = props => {
  const {
    countryList = [],
    companyOptions = [],
    f4FetchCountryList,
    informations,
  } = props;
  const [countries, setCountries] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [test, setTest] = useState([
    { name: 'kazakhstan', username: 'Aura SE ' },
    { name: 'turkey', username: 'aura' },
    { name: 'china', username: 'greenlight' },
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
    }
  };

  const onClickButton = () => {
    setSearchCompany(searchCopyCompany);
    setSearchCountry(searchCopyCountry);
  };

  let f = test.filter(test => {
    return (
      test.username
        .toLowerCase()
        .toUpperCase()
        .indexOf(searchCompany.toLowerCase().toUpperCase()) !== -1
    );
  });
  console.log('informations ', informations);
  return (
    <Segment>
      <div className="setting">
        <div className="flex-container">
          <h1>Настройка цен и премии сервис услуг</h1>
          <MoDal />
        </div>
        <Dropdown
          clearable="true"
          search
          selection
          options={companies}
          placeholder="Компания"
          onChange={(e, { value }) => onChange('companies', value)}
        />
        <Dropdown
          clearable="true"
          search
          selection
          options={countries}
          placeholder="Страна"
          id="secondDropdown"
          onChange={(e, { value }) => onChange('countries', value)}
        />
        <button
          className="ui blue tiny button"
          id="addPrice2"
          onClick={onClickButton}
        >
          Поиск
        </button>
        <br></br>
        <br></br>
        <br></br>
        <ReactTable
          data={f.filter(test => {
            return (
              test.name
                .toLowerCase()
                .toUpperCase()
                .indexOf(searchCountry.toLowerCase().toUpperCase()) !== -1
            );
          })}
          columns={[
            {
              Header: 'компания',
              accessor: 'name',
            },
            {
              Header: 'дата начало',
              accessor: 'name',
            },
            {
              Header: 'FC',
              accessor: 'username',
            },
            {
              Header: 'MC',
              accessor: 'website',
            },
            {
              Header: 'Офис',
              accessor: 'phone',
            },
            {
              Header: 'Мастер',
              accessor: 'address.city',
            },
            {
              Header: 'Оператор',
              accessor: 'company.name',
            },
            {
              Header: 'Скидка',
              accessor: 'age',
            },
            {
              Header: 'Общая сумма',
              accessor: 'age',
            },
            {
              Header: 'Страна',
              accessor: 'age',
            },
            {
              Header: 'Валюта',
              accessor: 'age',
            },
            {
              Header: 'Редактирование',
              accessor: 'age',
              filterable: false,
              Cell: () => (
                <Button icon>
                  <Icon name={'pencil'} />
                </Button>
              ),
            },
          ]}
          defaultPageSize={15}
          pages={2}
          showPagination={true}
          pageSizeOptions={[20, 30, 40]}
        />
      </div>
    </Segment>
  );
};

const mapStateToProps = state => {
  console.log('stateRed ', state.serviceReducer);
  return {
    countryList: state.f4.countryList,
    companyOptions: state.userInfo.companyOptions,
    informations: state.serviceReducer.data,
  };
};

export default connect(mapStateToProps, {
  f4FetchCountryList,
})(Page);

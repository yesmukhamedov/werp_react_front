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
  const { countryList = [], companyOptions = [], f4FetchCountryList } = props;
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    f4FetchCountryList();
  }, []);

  useEffect(() => {
    let country = countryList.map(item => {
      return { key: item.countryId, text: item.country, value: item.country };
    });
    setCountries(country);
  }, [countryList]);
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
          options={companyOptions}
          placeholder="Компания"
          //onChange={onChange}
        />
        <Dropdown
          clearable="true"
          search
          selection
          options={countries}
          placeholder="Страна"
          id="secondDropdown"
          // onChange={handleClick}
        />
        <button
          className="ui blue tiny button"
          id="addPrice2"
          // onClick={() => setSearch(searchCopy)}
        >
          Поиск
        </button>
        <br></br>
        <br></br>
        <br></br>
        <ReactTable
          //data={f}
          columns={[
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
  console.log(state);
  return {
    countryList: state.f4.countryList,
    companyOptions: state.userInfo.companyOptions,
  };
};

export default connect(mapStateToProps, {
  f4FetchCountryList,
})(Page);

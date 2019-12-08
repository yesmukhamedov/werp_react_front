import React, { useState, useEffect } from 'react';
import { Segment, Dropdown } from 'semantic-ui-react';
import {
  Header,
  Container,
  Icon,
  Button,
  Modal,
  Form,
  Input,
} from 'semantic-ui-react';
import './index.css';
import ModalPrice from './modal';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from './smsetppAction';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const Page = ({ state, infos }) => {
  const [names, setNames] = useState([]);
  const [userNames, setUserNames] = useState([]);
  const [search, setSearch] = useState('');
  const [search2, setSearch2] = useState('');
  const [searchCopy, setSearchCopy] = useState('');
  const { persons } = state;

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users').then(res => {
      const data = res.data;
      infos(data);

      let arr = data.map((item, id) => {
        return { key: id, value: item.name, text: item.name };
      });
      setNames(arr);
    });

    let f2 = persons.filter(persons => {
      return (
        persons.name
          .toLowerCase()
          .toUpperCase()
          .indexOf(search2.toLowerCase().toUpperCase()) !== -1
      );
    });

    let arr2 = f2.map((item, id) => {
      return { key: id, value: item.username, text: item.username };
    });
    setUserNames(arr2);
  }, [search2]);

  const onChange = (e, { value }) => {
    setSearch2(value);
  };

  const handleClick = (e, { value }) => {
    setSearchCopy(value);
  };

  let f = persons.filter(persons => {
    return (
      persons.username
        .toLowerCase()
        .toUpperCase()
        .indexOf(search.toLowerCase().toUpperCase()) !== -1
    );
  });
  return (
    <Segment>
      <div className="setting">
        <div className="flex-container">
          <h1>Настройка цен и премии сервис услуг</h1>

          <ModalPrice />
        </div>
        <Dropdown
          clearable="true"
          search
          selection
          options={names}
          placeholder="Компания"
          onChange={onChange}
        />
        <Dropdown
          clearable="true"
          search
          selection
          options={userNames}
          placeholder="Страна"
          id="secondDropdown"
          onChange={handleClick}
        />
        <button
          className="ui blue tiny button"
          id="addPrice2"
          onClick={() => setSearch(searchCopy)}
        >
          Поиск
        </button>
        <br></br>
        <br></br>
        <ReactTable
          data={f}
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
  return {
    state,
  };
};

export default connect(mapStateToProps, actions)(Page);

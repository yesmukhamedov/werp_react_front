import React from 'react';
import { Container, Segment, Header } from 'semantic-ui-react';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';
import 'react-table/react-table.css';

const ListHistory = () => {
  let historyDynamicObject = [];
  let columns = [
    {
      Header: 'Дата',
      accessor: 'date',
      Cell: row => <div style={{ textAlign: 'сenter' }}> {row.value} </div>,
      filterAll: true,
      width: 350,
    },
    {
      Header: 'Старый',
      accessor: 'date',
      Cell: row => <div style={{ textAlign: 'сenter' }}> {row.value} </div>,
      filterAll: true,
      width: 350,
    },
    {
      Header: 'Новый',
      accessor: 'date',
      Cell: row => <div style={{ textAlign: 'сenter' }}> {row.value} </div>,
      filterAll: true,
      width: 350,
    },
    {
      Header: 'Описание',
      accessor: 'date',
      Cell: row => <div style={{ textAlign: 'сenter' }}> {row.value} </div>,
      filterAll: true,
      width: 350,
    },
    {
      Header: 'Изменен сотрудником',
      accessor: 'date',
      Cell: row => <div style={{ textAlign: 'сenter' }}> {row.value} </div>,
      filterAll: true,
      width: 350,
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
      <Segment tertiary>
        {' '}
        <Header as="h2"> История редактирований договора </Header>{' '}
      </Segment>
      <ReactTableWrapper
        data={historyDynamicObject}
        columns={columns}
        defaultPageSize={20}
        showPagination={true}
      />
    </Container>
  );
};

export default ListHistory;

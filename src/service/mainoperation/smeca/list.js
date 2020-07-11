import React from 'react';
import { Container, Segment, Header } from 'semantic-ui-react';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';
import 'react-table/react-table.css';
import moment from 'moment';

const ListHistory = props => {
  const { historyDynamicObject, messages } = props;

  let columns = [
    {
      Header: messages['Form.Date'],
      accessor: 'revsttmp',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: messages['old'],
      accessor: 'date',
      Cell: row => (
        <div style={{ textAlign: 'center' }}>
          {row.value ? moment(row.value).format('DD-MM-YYYY') : ''}
        </div>
      ),
    },
    {
      Header: messages['new'],
      accessor: 'date',
      Cell: row => (
        <div style={{ textAlign: 'center' }}>
          {row.value ? moment(row.value).format('DD-MM-YYYY') : ''}
        </div>
      ),
    },
    {
      Header: messages['L__DESCRIPTION'],
      accessor: 'revType',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: messages['changed_by_employee'],
      accessor: 'username',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
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
        <Header as="h2"> {messages['application_editing_history']}</Header>
      </Segment>
      <ReactTableWrapper
        data={
          Object.keys(historyDynamicObject).length === 0
            ? []
            : historyDynamicObject
        }
        columns={columns}
        defaultPageSize={20}
        showPagination={true}
        className="-striped -highlight"
      />
    </Container>
  );
};

export default ListHistory;

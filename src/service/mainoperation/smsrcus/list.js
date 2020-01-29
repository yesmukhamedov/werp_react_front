import React from 'react';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';
import 'react-table/react-table.css';
import { Container, Segment, Icon, Button } from 'semantic-ui-react';
const List = props => {
  const { messages } = props;
  let dynamicObject = [
    {
      id: 1,
      bukrs: 'AURA',
      branch: 'ALM-CEB',
      CN: 1,
      factoryNumber: 159,
      date: '11.11.11',
      telephone: '87075790515',
      address: 'mkd.Mamyr - 4 №71',
      INN: '000604501282',
      name: 'Aura@Aura',
      finNumber: '007-001',
    },
  ];
  let columns = [
    {
      Header: 'ID',
      accessor: 'id',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 150,
      filterAll: true,
      width: 200,
      maxWidth: 150,
      minWidth: 100,
    },
    {
      Header: messages['bukrs'],
      accessor: 'bukrs', //Name Ф
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 150,
      filterAll: true,
      width: 150,
      maxWidth: 150,
      minWidth: 100,
    },
    {
      Header: messages['brnch'],
      accessor: 'branch', //Name
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 150,
      filterAll: true,
      width: 150,
      maxWidth: 150,
      minWidth: 100,
    },
    {
      Header: 'CN',
      accessor: 'CN', //Name
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 150,
      filterAll: true,
      width: 150,
      maxWidth: 150,
      minWidth: 100,
    },
    {
      Header: messages['factory_number'],
      accessor: 'factoryNumber',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 150,
      filterAll: true,
      width: 150,
      maxWidth: 150,
      minWidth: 100,
    },
    {
      Header: messages['Table.Date'],
      accessor: 'date',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 150,
      filterAll: true,
      width: 150,
      maxWidth: 150,
      minWidth: 100,
    },
    {
      Header: messages['financial_status'],
      accessor: 'finNumber',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 150,
      filterAll: true,
      width: 150,
      maxWidth: 150,
      minWidth: 100,
    },
    {
      Header: messages['full_name_of_client'],
      accessor: 'name',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 150,
      filterAll: true,
      width: 150,
      maxWidth: 150,
      minWidth: 100,
    },
    {
      Header: messages['customer_key'],
      accessor: 'INN',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 150,
      filterAll: true,
      width: 150,
      maxWidth: 150,
      minWidth: 100,
    },
    {
      Header: messages['address'],
      accessor: 'address',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 150,
      filterAll: true,
      width: 150,
      maxWidth: 150,
      minWidth: 100,
    },
    {
      Header: messages['telephone'],
      accessor: 'telephone',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 150,
      filterAll: true,
      width: 150,
      maxWidth: 150,
      minWidth: 100,
    },
    {
      Header: messages['customer_story'],
      Cell: () => (
        <div style={{ textAlign: 'center' }}>
          <Button size="mini" icon>
            {' '}
            <Icon
              name="address card"
              size="large"
              color="black"
              onClick={() => {
                console.log('Next Page');
              }}
            />
          </Button>
        </div>
      ),
      width: 150,
      filterAll: true,
      width: 150,
      maxWidth: 150,
      minWidth: 100,
    },
  ];
  return (
    <div>
      <Container fluid style={{ marginTop: '2em' }}>
        <ReactTableWrapper
          filterable
          data={dynamicObject}
          columns={columns}
          defaultPageSize={20}
          showPagination={true}
          className="-striped -highlight"
        />
      </Container>
    </div>
  );
};

export default List;

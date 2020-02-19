import React, { useState, useEffect } from 'react';
import ReactTableServerSideWrapper from '../../../utils/ReactTableServerSideWrapper';
import 'react-table/react-table.css';
import { injectIntl } from 'react-intl';
import { Button, Icon } from 'semantic-ui-react';

const Table = props => {
  const {
    intl: { messages },
    columnsName,
  } = props;

  console.log(columnsName);
  const serviceColumns = [
    {
      Header: 'id',
      accessor: 'id',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: () => (
        <div style={{ textAlign: 'center' }}>{messages['Task.Branch']} CN</div>
      ),
      accessor: 'bukrs',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: () => (
        <div style={{ textAlign: 'center' }}>
          {messages['productSerialNumber']}
        </div>
      ),
      accessor: 'Position',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: () => (
        <div style={{ textAlign: 'center' }}>{messages['TBL_H__PRODUCT']}</div>
      ),
      accessor: 'fc',
      Cell: row => <div style={{ textAlign: 'center' }}></div>,
    },
    {
      Header: () => (
        <div style={{ textAlign: 'center' }}>
          {messages['Application_Date']}
        </div>
      ),
      accessor: 'Position',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: () => (
        <div style={{ textAlign: 'center' }}>
          {messages['Form.Reco.RecoName']}
        </div>
      ),
      accessor: 'Position',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: () => (
        <div style={{ textAlign: 'center' }}>{messages['Table.Address']}</div>
      ),
      accessor: 'Position',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: () => (
        <div style={{ textAlign: 'center' }}>{messages['Phone']}</div>
      ),
      accessor: 'Position',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: () => (
        <div style={{ textAlign: 'center' }}>{messages['Masters']}</div>
      ),
      accessor: 'Position',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: () => (
        <div style={{ textAlign: 'center' }}>{messages['L__ORDER_STATUS']}</div>
      ),
      accessor: 'Position',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: () => (
        <div style={{ textAlign: 'center' }}>{messages['Operator']}</div>
      ),
      accessor: 'Position',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: () => (
        <div style={{ textAlign: 'center' }}>
          {messages['type_of_application']}
        </div>
      ),
      accessor: 'Position',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: () => (
        <div style={{ textAlign: 'center' }}>№ {messages['Applications']}</div>
      ),
      accessor: 'Position',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: () => (
        <div style={{ textAlign: 'center' }}>{messages['service']} №</div>
      ),
      accessor: 'Position',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: () => (
        <div style={{ textAlign: 'center' }}>{messages['customer_story']}</div>
      ),
      accessor: 'fc',
      filterable: false,
      Cell: ({ row }) => (
        <div style={{ textAlign: 'center' }}>
          <Button icon color="instagram">
            <Icon name="id card outline"></Icon>
          </Button>
        </div>
      ),
    },
  ];
  const [tableColumns, setTableColumns] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (localStorage.getItem(username)) {
      setTableColumns([]);
    } else {
      setTableColumns(serviceColumns);
    }
  }, []);

  return (
    <ReactTableServerSideWrapper
      columns={tableColumns}
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
  );
};

export default injectIntl(Table);

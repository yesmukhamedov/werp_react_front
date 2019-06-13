import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import matchSorter from 'match-sorter';

export default function TransactionSelect(props) {
  const selectedRow = tr => {
    props.selectedTrId(tr);
  };

  const { openTr, currTrans, messages } = props;
  const columns = [
    {
      Header: 'ID',
      id: 'transaction_id',
      accessor: d => d.transaction_id,
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: messages['L__TITLE'] + ' (ru)',
      accessor: 'name_ru',
      Cell: props => {
        return (
          <Button
            style={{ backgroundColor: 'white', color: '#2D2727' }}
            onClick={selectedRow.bind(this, props.original)}
          >
            {props.value}
          </Button>
        );
      },
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['name_ru'] }),
      filterAll: true,
    },
    {
      Header: messages['L__TITLE'] + ' (en)',
      accessor: 'name_en',
      Cell: props => {
        return (
          <Button
            style={{ backgroundColor: 'white', color: '#2D2727' }}
            onClick={selectedRow.bind(this, props.original)}
          >
            {props.value}
          </Button>
        );
      },
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['name_en'] }),
      filterAll: true,
    },
    {
      Header: messages['L__TITLE'] + ' (tr)',
      accessor: 'name_tr',
      Cell: props => {
        return (
          <Button
            style={{ backgroundColor: 'white', color: '#2D2727' }}
            onClick={selectedRow.bind(this, props.original)}
          >
            {props.value}
          </Button>
        );
      },
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['name_tr'] }),
      filterAll: true,
    },
  ];
  return (
    <Modal
      size="large"
      open={openTr}
      onClose={() => props.transactionModal(false)}
    >
      <Modal.Header>{messages['trList']}</Modal.Header>
      <Modal.Content>
        <ReactTable
          columns={columns}
          data={currTrans}
          resolveData={data => data.map(row => row)}
          filterable
          rowsText={messages['rowsText']}
          pageText={messages['pageText']}
          ofText={messages['ofText']}
          previousText={messages['previousText']}
          nextText={messages['nextText']}
          noDataText={messages['loadingText']}
          defaultPageSize={5}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => props.transactionModal(false)}>
          {messages['cancel']}
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import matchSorter from 'match-sorter';

export default function Matrn(props) {
  const { messages, matrn, showMatnrModal } = props;

  const selectedRow = row => {
    props.selRow(row);
  };

  const columns = [
    {
      Header: 'ID',
      id: 'matnr',
      accessor: d => d.matnr,
      Cell: props => {
        return (
          <Button
            style={{
              backgroundColor:
                props.original.active === false ? '#ff4d4d' : 'white',
              color: props.original.active === false ? 'white' : 'black',
            }}
            onClick={selectedRow.bind(this, props.original)}
          >
            {props.value}
          </Button>
        );
      },
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: messages['code'],
      accessor: 'code',
      Cell: props => {
        return (
          <Button
            style={{
              backgroundColor:
                props.original.active === false ? '#ff4d4d' : 'white',
              color: props.original.active === false ? 'white' : 'black',
            }}
            onClick={selectedRow.bind(this, props.original)}
          >
            {props.value}
          </Button>
        );
      },
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['code'] }),
      filterAll: true,
      width: 100,
      maxWidth: 250,
      minWidth: 100,
    },
    {
      Header: messages['nomination'],
      accessor: 'text45',
      Cell: props => {
        return (
          <Button
            style={{
              backgroundColor:
                props.original.active === false ? '#ff4d4d' : 'white',
              color: props.original.active === false ? 'white' : 'black',
            }}
            onClick={selectedRow.bind(this, props.original)}
          >
            {props.value}
          </Button>
        );
      },
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['text45'] }),
      filterAll: true,
    },
  ];

  return (
    <Modal size={'small'} open={showMatnrModal}>
      <Modal.Header>{'Новый прайс товара'}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <div
            style={{
              backgroundColor: 'white',
              color: 'black',
            }}
          >
            <ReactTable
              columns={columns}
              data={matrn}
              resolveData={data => data.map(row => row)}
              filterable
              rowsText={messages['rowsText']}
              pageText={messages['pageText']}
              ofText={messages['ofText']}
              previousText={messages['previousText']}
              nextText={messages['nextText']}
              noDataText={messages['loadingText']}
              defaultPageSize={30}
              /*  getTrProps={(state, rowInfo, column) => {
                            return {
                            style:{
                                backgroundColor:
                                rowInfo.original.active === false ? '#ff4d4d' : 'white',
                            }
                            }
                        }}*/
            />
          </div>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={props.closeMatnrModal.bind(this)}>
          {messages['BTN__NO']}
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

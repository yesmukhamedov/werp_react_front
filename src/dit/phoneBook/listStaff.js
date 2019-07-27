import React from 'react';
import {
  Header,
  Grid,
  Segment,
  Button,
  Container,
  Dropdown,
  Form,
} from 'semantic-ui-react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import matchSorter from 'match-sorter';

export default function ListStaf(props) {
  const { messages, dynObjTrLst } = props;
  const columns = [
    {
      Header: 'ID',
      id: 'staffId',
      accessor: d => d.staffId,
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: messages['fio'],
      accessor: 'fio',
    },
    {
      Header: messages['position'],
      accessor: 'depName',
      Cell: props => {
        return props.value.map((val, i) => {
          return (
            <span key={i}>
              {val}
              <br />
            </span>
          );
        });
      },
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['depName'] }),
      filterAll: true,
    },
    {
      Header: messages['Table.PhoneNumber'],
      accessor: 'phone',

      Cell: props => {
        return Object.keys(props.value).map(key => {
          if (key === '3') {
            return (
              <span key={key}>
                {messages['telDom']}: {props.value[key]}
                <br />
              </span>
            );
          } else if (key === '4') {
            return (
              <span key={key}>
                {messages['telMob1']}: {props.value[key]}
                <br />
              </span>
            );
          } else if (key === '5') {
            return (
              <span key={key}>
                {messages['telMob2']}: {props.value[key]}
                <br />
              </span>
            );
          } else if (key === '6') {
            return (
              <span key={key}>
                {messages['telMob2']}: {props.value[key]}
                <br />
              </span>
            );
          } else {
            return (
              <span key={key}>
                {messages['telDom']}: {props.value[key]}
              </span>
            );
          }
        });
      },
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['phone'] }),
      filterAll: true,
    },
    {
      Header: messages['internal_number'],
      accessor: 'internalNumber',
      Cell: ({ value }) => (value === 'null' ? '' : value),
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['internalNumber'] }),
      filterAll: true,
      width: 200,
      maxWidth: 200,
      minWidth: 200,
    },
  ];
  return (
    <Segment>
      {dynObjTrLst === undefined || dynObjTrLst.length == 0 ? (
        ''
      ) : (
        <ReactTable
          data={dynObjTrLst}
          columns={columns}
          defaultPageSize={30}
          showPagination
          // style={{ height: '400px' }}
          className="-striped -highlight"
          loadingText={messages['loadingText']}
          noDataText={messages['noDataText']}
          previousText={messages['previousText']}
          nextText={messages['nextText']}
          rowsText={messages['rowsText']}
          pageText={messages['pageText']}
          ofText={messages['ofText']}
        />
      )}
    </Segment>
  );
}

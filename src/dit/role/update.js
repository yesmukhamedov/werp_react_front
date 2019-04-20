import React from 'react';
import { Checkbox } from 'semantic-ui-react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import matchSorter from 'match-sorter';

export default function Update(props) {
  const { messages, accessTypes } = props;
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
      Header: messages['role'],
      accessor: 'tr_type',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['tr_type'] }),
      filterAll: true,
    },
    {
      Header: 'Menu Info',
      accessor: 'menuInfo',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['menuInfo'] }),
      filterAll: true,
    },
    {
      Header: messages['role'],
      accessor: 'acces',
      Cell: pr => {
        return (
          <div>
            <Checkbox
              radio
              label="read"
              name="checkboxRadioGroup"
              value="read"
              checked={pr.value === 'read'}
              onChange={(e, o) => props.handleCheckBox('read', pr.original)}
            />
            <br />
            <Checkbox
              radio
              label="write"
              name="checkboxRadioGroup"
              value="write"
              checked={pr.value === 'write'}
              onChange={(e, o) => {
                props.handleCheckBox('write', pr.original);
              }}
            />
            <br />
            <Checkbox
              radio
              label="all"
              name="checkboxRadioGroup"
              value="all"
              checked={pr.value === 'all'}
              onChange={(e, o) => {
                props.handleCheckBox('all', pr.original);
              }}
            />
          </div>
        );
      },
      width: 100,
      maxWidth: 200,
      minWidth: 100,
      filterAll: false,
    },
  ];
  return (
    <ReactTable
      columns={columns}
      data={accessTypes}
      resolveData={data => data.map(row => row)}
      filterable
      rowsText={messages['rowsText']}
      pageText={messages['pageText']}
      ofText={messages['ofText']}
      previousText={messages['previousText']}
      nextText={messages['nextText']}
      noDataText={messages['loadingText']}
      defaultPageSize={10}
    />
  );
}

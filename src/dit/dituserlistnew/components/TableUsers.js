import React from 'react';
import { Button } from 'semantic-ui-react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import matchSorter from 'match-sorter';

const TableUsers = props => {
  const { messages, allUsers = [], updateRow = () => {} } = props;
  const columns = [
    {
      Header: 'ID',
      id: 'id',
      accessor: d => d.id,
      Cell: ({ original, value }) => {
        return (
          <Button
            style={{
              backgroundColor: original.active === false ? '#ff4d4d' : 'white',
              color: original.active === false ? 'white' : 'black',
            }}
            onClick={() => updateRow(original)}
          >
            {value}
          </Button>
        );
      },
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: messages['L__USER'],
      accessor: 'username',
      Cell: ({ original, value }) => {
        return (
          <Button
            style={{
              backgroundColor: original.active === false ? '#ff4d4d' : 'white',
              color: original.active === false ? 'white' : 'black',
            }}
            onClick={() => updateRow(original)}
          >
            {value}
          </Button>
        );
      },
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['username'] }),
      filterAll: true,
    },
    {
      Header: messages['internal_number'],
      accessor: 'internal_number',
      /* Cell: ({ value }) => (value === "null" ? "" : value), */
      Cell: ({ original, value }) => {
        return (
          <Button
            style={{
              visibility: original.internal_number != 0 ? 'visible' : 'hidden',
              backgroundColor: original.active === false ? '#ff4d4d' : 'white',
              color: original.active === false ? 'white' : 'black',
            }}
            onClick={() => updateRow(original)}
          >
            {value}
          </Button>
        );
      },
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['internal_number'] }),
      filterAll: true,
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: messages['L__COMPANY'],
      accessor: 'bukrsname',
      Cell: ({ original, value }) => {
        return (
          <Button
            style={{
              backgroundColor: original.active === false ? '#ff4d4d' : 'white',
              color: original.active === false ? 'white' : 'black',
            }}
            onClick={() => updateRow(original)}
          >
            {value}
          </Button>
        );
      },
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['bukrsname'] }),
      filterAll: true,
    },
    {
      Header: messages['L__BRANCH'],
      accessor: 'branchname',
      Cell: ({ original, value }) => {
        return (
          <Button
            style={{
              backgroundColor: original.active === false ? '#ff4d4d' : 'white',
              color: original.active === false ? 'white' : 'black',
            }}
            onClick={() => updateRow(original)}
          >
            {value}
          </Button>
        );
      },
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['branchname'] }),
      filterAll: true,
    },
    {
      Header: messages['role'],
      accessor: 'rname',
      /* Cell: ({ value }) => (value === "null" ? "" : value), */
      Cell: ({ original, value }) => {
        return (
          <Button
            style={{
              visibility: original.role_id != 0 ? 'visible' : 'hidden',
              backgroundColor: original.active === false ? '#ff4d4d' : 'white',
              color: original.active === false ? 'white' : 'black',
            }}
            onClick={() => updateRow(original)}
          >
            {value.map((val, i) => {
              return (
                <span key={i}>
                  {val}
                  <br />
                </span>
              );
            })}
          </Button>
        );
      },
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['rolename'] }),
      filterAll: true,
      width: 400,
      maxWidth: 500,
      minWidth: 400,
    },
    {
      Header: messages['L__STATUS'],
      accessor: 'active',
      // Cell: ({ value }) => String(value),
      Cell: ({ original, value }) => {
        return (
          <Button
            style={{
              backgroundColor: original.active === false ? '#ff4d4d' : 'white',
              color: original.active === false ? 'white' : 'black',
            }}
            onClick={() => updateRow(original)}
          >
            {String(value)}
          </Button>
        );
      },
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['active'] }),
      filterAll: true,
    },
  ];
  return (
    <div>
      <ReactTable
        columns={columns}
        data={allUsers}
        // resolveData={data => data.map(row => row)}
        filterable
        rowsText={messages['rowsText']}
        pageText={messages['pageText']}
        ofText={messages['ofText']}
        previousText={messages['previousText']}
        nextText={messages['nextText']}
        noDataText={messages['loadingText']}
      />
    </div>
  );
};

export default TableUsers;

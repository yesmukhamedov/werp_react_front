import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import matchSorter from 'match-sorter';

export default function List(props) {
  const { dynDmsplst, messages } = props;
  const columns = [
    {
      Header: 'ID',
      id: 'id',
      accessor: d => d.id,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['id'] }),
      filterAll: true,
      width: 50,
      minWidth: 90,
      maxWidth: 90,
    },
    {
      Header: messages['code'],
      accessor: 'pmNumber',
      width: 70,
      minWidth: 70,
      maxWidth: 90,
    },
    {
      Header: 'сфера действий',
      accessor: 'pmScope',
      minWidth: 90,
      maxWidth: 100,
    },
    {
      Header: 'from dealer',
      accessor: 'fromDealer',
      style: { textAlign: 'right' },
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['fromDealer'] }),
      filterAll: true,
      minWidth: 90,
      maxWidth: 100,
    },
    {
      Header: messages['wears'],
      accessor: 'fdCurrency',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['fdCurrency'] }),
      filterAll: true,
      minWidth: 90,
      maxWidth: 100,
    },
    {
      Header: messages['country'],
      accessor: 'countryName',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['countryName'] }),
      filterAll: true,
    },
    {
      Header: messages['region'],
      accessor: 'regionName',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['regionName'] }),
      filterAll: true,
    },
    {
      Header: messages['brnch'],
      accessor: 'branchName',
      width: 100,
      minWidth: 100,
      maxWidth: 130,
    },
    {
      Header: 'Название промо-акций',
      accessor: 'pmName',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['pmName'] }),
      filterAll: true,
      minWidth: 70,
      maxWidth: 100,
    },
    {
      Header: messages['dateStart'],
      accessor: 'pmDateStart',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['pmDateStart'] }),
      filterAll: true,
      minWidth: 70,
      maxWidth: 100,
    },
    {
      Header: messages['dateEnd'],
      accessor: 'pmDateEnd',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['pmDateEnd'] }),
      filterAll: true,
    },
    {
      Header: messages['kind'],
      accessor: 'pmType',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['pmType'] }),
      filterAll: true,
    },
    {
      Header: messages['kind'],
      accessor: 'mName',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['mName'] }),
      filterAll: true,
    },
    {
      Header: messages['discount'],
      accessor: 'pmDiscount',
      width: 70,
      minWidth: 70,
      maxWidth: 90,
    },
    {
      Header: messages['bonus'],
      accessor: 'pmBonus',
      width: 50,
      minWidth: 50,
      maxWidth: 70,
    },
    {
      Header: messages['bonus'],
      accessor: 'rest',
      width: 70,
      minWidth: 70,
      maxWidth: 90,
    },
    {
      Header: messages['extraInfo'],
      accessor: 'pmInfo',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['pmInfo'] }),
      filterAll: true,
      minWidth: 90,
      maxWidth: 150,
    },
    {
      Header: 'Aктивна',
      accessor: 'isActive',
      width: 100,
      minWidth: 100,
      maxWidth: 130,
    },
  ];
  return (
    <div>
      {dynDmsplst.promolst === undefined || dynDmsplst.promolst.length == 0 ? (
        ''
      ) : (
        <ReactTable
          filterable
          columns={columns}
          data={dynDmsplst.promolst}
          resolveData={data => data.map(row => row)}
          rowsText={messages['rowsText']}
          pageText={messages['pageText']}
          ofText={messages['ofText']}
          previousText={messages['previousText']}
          nextText={messages['nextText']}
          noDataText={messages['loadingText']}
        />
      )}
    </div>
  );
}

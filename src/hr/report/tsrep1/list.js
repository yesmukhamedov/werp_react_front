import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import matchSorter from 'match-sorter';
import { Segment } from 'semantic-ui-react';

export default function List(props) {
  const { dynamicObject, messages } = props;

  let columns = [
    {
      Header: 'ID',
      accessor: 'recommenderId',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['recommenderId'] }),
      filterAll: true,
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: messages['country'],
      accessor: 'country',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['country'] }),
      filterAll: true,
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: messages['bukrs'],
      accessor: 'bukrs',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['bukrs'] }),
      filterAll: true,
      width: 150,
      maxWidth: 150,
      minWidth: 100,
    },
    {
      Header: messages['brnch'],
      accessor: 'recommenderBranchName',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['recommenderBranchName'] }),
      filterAll: true,
      width: 180,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: messages['recommender'],
      accessor: 'recommenderName',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['recommenderName'] }),
      filterAll: true,
      width: 300,
      maxWidth: 300,
      minWidth: 100,
    },
    {
      Header: messages['recommenderPositionName'],
      accessor: 'recommenderPositionName',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['recommenderPositionName'] }),
      filterAll: true,
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: messages['applicantName'],
      accessor: 'applicantName',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['applicantName'] }),
      filterAll: true,
      width: 300,
      maxWidth: 300,
      minWidth: 100,
    },
    {
      Header: messages['applicantPositionName'],
      accessor: 'applicantPositionName',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['applicantPositionName'] }),
      filterAll: true,
      width: 150,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: messages['applicantBeginDate'],
      accessor: 'tsDate',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['tsDate'] }),
      filterAll: true,
      width: 150,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: messages['saleCount'],
      accessor: 'saleCount',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['saleCount'] }),
      filterAll: true,
      width: 150,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: messages['recomenderBonus'],
      accessor: 'recomenderBonus',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['recomenderBonus'] }),
      filterAll: true,
      width: 150,
      maxWidth: 200,
      minWidth: 100,
    },
  ];

  return (
    <div>
      {Object.keys(dynamicObject).length === 0 ? (
        <Segment textAlign="center">Нет данных</Segment>
      ) : (
        <ReactTable
          filterable
          columns={columns}
          data={dynamicObject}
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

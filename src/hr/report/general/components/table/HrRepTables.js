import React from 'react';
import _ from 'lodash';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import '../../css/hrRepStyle.css';

export function RepTable954(props) {
  let { items } = props;
  if (!items) {
    items = [];
  }

  const renderPositions = positions => (
    <ul>
      {positions.map(pos => (
        <li key={pos.salaryId}>
          {pos.positionName} ({pos.branchName})
        </li>
      ))}
    </ul>
  );

  const columns = [
    {
      Header: '#',
      accessor: 'timestamp',
      Cell: props => {
        const { index } = props;
        return <div>{index + 1}</div>;
      },
      maxWidth: 50,
    },
    {
      Header: 'Фамилия',
      accessor: 'lastname',
    },
    {
      Header: 'Имя',
      accessor: 'firstname',
    },
    {
      Header: 'Отчество',
      accessor: 'middlename',
    },
    {
      Header: 'Должности',
      id: 'positions',
      accessor: row => renderPositions(row.positions || []),
      Footer: (
        <span>
          <strong>Всего:</strong> {_.size(items)}
        </span>
      ),
    },
  ];
  return (
    <ReactTable
      data={items}
      columns={columns}
      pageSizeOptions={[10, 20, 30, 50]}
      defaultPageSize={50}
      previousText="Предыдущий"
      nextText="Следующий"
      loadingText="Загружается..."
      noDataText="Нет записей"
      pageText="Страница"
      ofText="из"
      rowsText="записей"
      className="-highlight"
    />
  );
}

export const RepTable1256 = props => {
  let { items } = props;
  if (!items) {
    items = [];
  }

  const columns = [
    {
      Header: 'ФИО рекомендателя',
      accessor: 'recommenderName',
    },
    {
      Header: 'Филиал рекомендателя',
      accessor: 'recommenderBranchName',
      maxWidth: 150,
    },
    {
      Header: 'Должность рекомендателя',
      accessor: 'recommenderPositionName',
    },
    {
      Header: 'ФИО претендента',
      accessor: 'applicantName',
    },
    {
      Header: 'Филиал претендента',
      accessor: 'applicantBranchName',
      maxWidth: 150,
    },
    {
      Header: 'Претендуемая должность',
      accessor: 'applicantPositionName',
    },
    {
      Header: 'TS дата',
      accessor: 'tsDate',
      maxWidth: 100,
    },
    {
      Header: 'Количество продаж',
      accessor: 'saleCount',
      maxWidth: 70,
    },
  ];
  return (
    <div style={{ marginTop: '10px' }}>
      <div>Количество: {items ? items.length : 0}</div>
      <ReactTable
        data={items}
        columns={columns}
        pageSizeOptions={[10, 20, 30, 50]}
        defaultPageSize={50}
        previousText="Предыдущий"
        nextText="Следующий"
        loadingText="Загружается..."
        noDataText="Нет записей"
        pageText="Страница"
        ofText="из"
        rowsText="записей"
        className="-highlight"
      />
    </div>
  );
};

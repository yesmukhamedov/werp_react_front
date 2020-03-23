import React, { useMemo } from 'react';
import ReactTableWrapper from '../../../../../utils/ReactTableWrapper';
import { Dropdown } from 'semantic-ui-react';

const TableReDistribution1 = props => {
  const { data } = props;

  const columns = [
    {
      columns: [
        {
          Header: 'Id',
          accessor: 'operatorId',
        },
        {
          Header: 'Страна',
          accessor: 'countryName',
        },
        {
          Header: 'Компания',
          accessor: 'bukrsName',
        },
        {
          Header: 'Филиал',
          accessor: 'branchName',
        },
        {
          Header: 'Оператор',
          accessor: 'operatorName',
          width: 250,
        },
      ],
    },
    {
      // Текущий group
      Header: 'Текущий',
      headerStyle: { background: 'teal', color: '#fff' },
      // Текущий columns
      columns: [
        {
          Header: 'F1',
          accessor: 'currentF1',
          width: 70,
        },
        {
          Header: 'F1+M1',
          accessor: 'currentF1M1',
          width: 70,
        },
        {
          Header: 'F2',
          accessor: 'currentF2',
          width: 70,
        },
        {
          Header: 'F2+M1',
          accessor: 'currentF2M1',
          width: 70,
        },
        {
          Header: 'F3',
          accessor: 'currentF3',
          width: 70,
        },
        {
          Header: 'F3+M1',
          accessor: 'currentF3M1',
          width: 70,
        },
        {
          Header: 'F4',
          accessor: 'currentF4',
          width: 70,
        },
        {
          Header: 'F4+M1',
          accessor: 'currentF4M1',
          width: 70,
        },
        {
          Header: 'M1',
          accessor: 'currentM1',
          width: 70,
        },
        {
          Header: 'Итог',
          accessor: 'currentSum',
        },
      ],
    },
    {
      // Просроченный group
      Header: 'Просроченный',
      headerStyle: {
        background: 'red',
        color: '#fff',
        height: '2rem',
      },
      // Просроченный columns
      columns: [
        {
          Header: 'F1',
          accessor: 'overDueF1',
          width: 70,
        },
        {
          Header: 'F1+M1',
          accessor: 'overDueF1M1',
          width: 70,
        },
        {
          Header: 'F2',
          accessor: 'overDueF2',
          width: 70,
        },
        {
          Header: 'F2+M1',
          accessor: 'overDueF2M1',
          width: 70,
        },
        {
          Header: 'F3',
          accessor: 'overDueF3',
          width: 70,
        },
        {
          Header: 'F3+M1',
          accessor: 'overDueF3M1',
          width: 70,
        },
        {
          Header: 'F4',
          accessor: 'overDueF4',
          width: 70,
        },
        {
          Header: 'F4+M1',
          accessor: 'overDueF4M1',
          width: 70,
        },
        {
          Header: 'M1',
          accessor: 'overDueM1',
          width: 70,
        },
        {
          Header: 'Итог',
          accessor: 'overDueSum',
          width: 70,
        },
      ],
    },
    {
      // Общий
      Header: 'Общий',
      // Second group columns
      columns: [
        {
          Header: 'Итог',
          accessor: 'totalSum',
        },
      ],
    },
  ];

  return (
    <ReactTableWrapper data={data} columns={columns} defaultPageSize={2} />
  );
};
export default TableReDistribution1;

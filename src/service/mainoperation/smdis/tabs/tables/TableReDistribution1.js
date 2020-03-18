import React, { useMemo } from 'react';
import ReactTableWrapper from '../../../../../utils/ReactTableWrapper';
import { Dropdown } from 'semantic-ui-react';

const TableReDistribution1 = props => {
  const { options = [] } = props;

  const columns = useMemo(
    () => [
      {
        columns: [
          {
            Header: 'Id',
            accessor: '1',
          },
          {
            Header: 'Страна',
            accessor: '2',
          },
          {
            Header: 'Компания',
            accessor: '3',
          },
          {
            Header: 'Филиал',
            accessor: '4',
          },
          {
            Header: 'Оператор',
            accessor: '5',
            Cell: ({ original }) => <Dropdown selection options={options} />,
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
            accessor: '6',
            width: 70,
          },
          {
            Header: 'F1+M1',
            accessor: '7',
            width: 70,
          },
          {
            Header: 'F2',
            accessor: '8',
            width: 70,
          },
          {
            Header: 'F2+M1',
            accessor: '9',
            width: 70,
          },
          {
            Header: 'F3',
            accessor: '10',
            width: 70,
          },
          {
            Header: 'F3+M1',
            accessor: '11',
            width: 70,
          },
          {
            Header: 'F4',
            accessor: '12',
            width: 70,
          },
          {
            Header: 'F4+M1',
            accessor: '13',
            width: 70,
          },
          {
            Header: 'M1',
            accessor: '14',
            width: 70,
          },
          {
            Header: 'Итог',
            accessor: '15',
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
            accessor: '16',
            width: 70,
          },
          {
            Header: 'F1+M1',
            accessor: '17',
            width: 70,
          },
          {
            Header: 'F2',
            accessor: '18',
            width: 70,
          },
          {
            Header: 'F2+M1',
            accessor: '19',
            width: 70,
          },
          {
            Header: 'F3',
            accessor: '20',
            width: 70,
          },
          {
            Header: 'F3+M1',
            accessor: '21',
            width: 70,
          },
          {
            Header: 'F4',
            accessor: '22',
            width: 70,
          },
          {
            Header: 'F4+M1',
            accessor: '23',
            width: 70,
          },
          {
            Header: 'M1',
            accessor: '24',
            width: 70,
          },
          {
            Header: 'Итог',
            accessor: '25',
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
          },
        ],
      },
    ],
    [],
  );
  return (
    <ReactTableWrapper
      columns={columns}
      defaultPageSize={10}
      showPagination
      previousText
    />
  );
};
export default TableReDistribution1;

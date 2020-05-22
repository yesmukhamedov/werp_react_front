import React, { useMemo } from 'react';
import ReactTableWrapper from '../../../../../utils/ReactTableWrapper';
import { Icon } from 'semantic-ui-react';

const TableSmvod = props => {
  const { options = [], data, footerData = {}, clickSmvodRow } = props;

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
          Footer: 'Итого:',
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
          Footer: <span>{footerData.currentF1}</span>,
          accessor: 'currentF1',
          width: 70,
        },
        {
          Header: 'F1+M1',
          Footer: <span>{footerData.currentF1M1}</span>,
          accessor: 'currentF1M1',
          width: 70,
        },
        {
          Header: 'F2',
          Footer: <span>{footerData.currentF2}</span>,
          accessor: 'currentF2',
          width: 70,
        },
        {
          Header: 'F2+M1',
          Footer: <span>{footerData.currentF2M1}</span>,
          accessor: 'currentF2M1',
          width: 70,
        },
        {
          Header: 'F3',
          Footer: <span>{footerData.currentF3}</span>,
          accessor: 'currentF3',
          width: 70,
        },
        {
          Header: 'F3+M1',
          Footer: <span>{footerData.currentF3M1}</span>,
          accessor: 'currentF3M1',
          width: 70,
        },
        {
          Header: 'F4',
          Footer: <span>{footerData.currentF4}</span>,
          accessor: 'currentF4',
          width: 70,
        },
        {
          Header: 'F4+M1',
          Footer: <span>{footerData.currentF4M1}</span>,
          accessor: 'currentF4M1',
          width: 70,
        },
        {
          Header: 'M1',
          Footer: <span>{footerData.currentM1}</span>,
          accessor: 'currentM1',
          width: 70,
        },
        {
          Header: 'Итог',
          Footer: <span>{footerData.currentSum}</span>,
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
          Footer: <span>{footerData.overDueF1}</span>,
          accessor: 'overDueF1',
          width: 70,
        },
        {
          Header: 'F1+M1',
          Footer: <span>{footerData.overDueF1M1}</span>,
          accessor: 'overDueF1M1',
          width: 70,
        },
        {
          Header: 'F2',
          Footer: <span>{footerData.overDueF2}</span>,
          accessor: 'overDueF2',
          width: 70,
        },
        {
          Header: 'F2+M1',
          Footer: <span>{footerData.overDueF2M1}</span>,
          accessor: 'overDueF2M1',
          width: 70,
        },
        {
          Header: 'F3',
          Footer: <span>{footerData.overDueF3}</span>,
          accessor: 'overDueF3',
          width: 70,
        },
        {
          Header: 'F3+M1',
          Footer: <span>{footerData.overDueF3M1}</span>,
          accessor: 'overDueF3M1',
          width: 70,
        },
        {
          Header: 'F4',
          Footer: <span>{footerData.overDueF4}</span>,
          accessor: 'overDueF4',
          width: 70,
        },
        {
          Header: 'F4+M1',
          Footer: <span>{footerData.overDueF4M1}</span>,
          accessor: 'overDueF4M1',
          width: 70,
        },
        {
          Header: 'M1',
          Footer: <span>{footerData.overDueM1}</span>,
          accessor: 'overDueM1',
          width: 70,
        },
        {
          Header: 'Итог',
          Footer: <span>{footerData.overDueSum}</span>,
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
          Footer: <span>{footerData.totalSum}</span>,
          accessor: 'totalSum',
        },
      ],
    },
    {
      Header: 'Просмотр',
      Cell: original => (
        <div style={{ textAlign: 'center' }}>
          <Icon
            color="teal"
            link
            name="search"
            onClick={() => clickSmvodRow(original.row._original)}
          />
        </div>
      ),
    },
  ];
  return (
    <ReactTableWrapper
      data={data}
      columns={columns}
      defaultPageSize={10}
      showPagination
    />
  );
};
export default TableSmvod;

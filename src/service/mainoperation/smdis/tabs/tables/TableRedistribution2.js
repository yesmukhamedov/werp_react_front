import React, { useMemo } from 'react';
import ReactTableWrapper from '../../../../../utils/ReactTableWrapper';
import { Dropdown, Input, Button } from 'semantic-ui-react';
import './table.css';
const TableRedistribution2 = props => {
  const {
    pageSize,
    data = [],
    operatorOptions = [],
    changePercent,
    removeOperator,
    onOperatorSelect = [],
    filterStatus = [],
    onStatusSelect = [],
    toOperators = [],
  } = props;

  const renderEditable = row => {
    return (
      <Input
        type="number"
        placeholder="Percent"
        fluid
        value={row.amountPercent}
        onChange={e => {
          changePercent(e, row);
        }}
      />
    );
  };

  const columns = [
    {
      columns: [
        {
          Header: 'Id',
          accessor: 'id',
          Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
        },
        {
          Header: 'Operator',
          accessor: 'toOperatorId',
          Cell: ({ row }) => (
            <Dropdown
              selection
              search
              options={operatorOptions}
              className="tableDropDown"
              value={row.toOperatorId}
              onChange={(e, o) => onOperatorSelect(o.value, row.id)}
            />
          ),
          width: 300,
        },
        {
          Header: 'Status',
          accessor: 'planStatusId',
          Cell: ({ row }) => (
            <Dropdown
              // search
              multiple
              selection
              options={filterStatus}
              className="tableDropDown"
              value={row.planStatusId}
              onChange={(e, o) => onStatusSelect(o.value, row.id)}
            />
          ),
          width: 300,
        },
        {
          Header: '%',
          accessor: 'amountPercent',
          Cell: ({ row }) => renderEditable(row),
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

    toOperators.length === 0
      ? {
          Header: 'Delete',
          accessor: '0',
          Cell: ({ row }) => (
            <div style={{ textAlign: 'center' }}>
              <Button
                icon={'delete'}
                size="mini"
                color="red"
                onClick={() => {
                  removeOperator(row);
                }}
              />
            </div>
          ),
        }
      : {},
  ];

  return (
    <ReactTableWrapper columns={columns} pageSize={pageSize} data={data} />
  );
};
export default TableRedistribution2;

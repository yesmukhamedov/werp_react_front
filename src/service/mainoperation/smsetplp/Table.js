import React, { useState, useEffectб, createRef } from 'react';
import ReactTableWrapperFixedColumns from '../../../utils/ReactTableWrapperFixedColumns';
import { Popup, Button, Input } from 'semantic-ui-react';
import '../../service.css';
import { moneyFormat } from '../../../utils/helpers';

const Table = props => {
  const { data = [], messages = {}, editStatus, onChangeTable } = props;

  const totalFilterCurrentDatabasePlanCount = data.reduce(
    (total, item) => total + item.filterCurrentDatabasePlanCount,
    0,
  );

  const totalFilterCurrentDatabasePlanSum = data.reduce(
    (total, item) => total + item.filterCurrentDatabasePlanSum,
    0,
  );
  const totalFilterCurrentPlanSum = data.reduce(
    (total, item) => total + item.filterCurrentPlanSum,
    0,
  );
  const totalFilterDonePlanSum = data.reduce(
    (total, item) => total + item.filterDonePlanSum,
    0,
  );
  const totalFilterOverDueDatabasePlanCount = data.reduce(
    (total, item) => total + item.filterOverDueDatabasePlanCount,
    0,
  );
  const totalFilterOverDueDatabasePlanSum = data.reduce(
    (total, item) => total + item.filterOverDueDatabasePlanSum,
    0,
  );
  const totalFilterOverDuePlanSum = data.reduce(
    (total, item) => total + item.filterOverDuePlanSum,
    0,
  );
  const totalFilterPartsDonePlanSum = data.reduce(
    (total, item) => total + item.filterPartsDonePlanSum,
    0,
  );
  const totalFilterPartsPlanSum = data.reduce(
    (total, item) => total + item.filterPartsPlanSum,
    0,
  );
  const totalFilterServicePacketDonePlanSum = data.reduce(
    (total, item) => total + item.filterServicePacketDonePlanSum,
    0,
  );
  const totalFilterServicePacketPlanSum = data.reduce(
    (total, item) => total + item.filterServicePacketPlanSum,
    0,
  );
  const totalFilterTotalPlanSum = data.reduce(
    (total, item) => total + item.filterTotalPlanSum,
    0,
  );
  const totalFilterVCPartsDonePlanSum = data.reduce(
    (total, item) => total + item.filterVCPartsDonePlanSum,
    0,
  );
  const totalFilterVCPartsPlanSum = data.reduce(
    (total, item) => total + item.filterVCPartsPlanSum,
    0,
  );
  const totalFilterVCServicePacketCurrentDatabasePlanCount = data.reduce(
    (total, item) => total + item.filterVCServicePacketCurrentDatabasePlanCount,
    0,
  );
  const totalFilterVCServicePacketCurrentDatabasePlanSum = data.reduce(
    (total, item) => total + item.filterVCServicePacketCurrentDatabasePlanSum,
    0,
  );
  const totalFilterVCServicePacketDonePlanSum = data.reduce(
    (total, item) => total + item.filterVCServicePacketDonePlanSum,
    0,
  );
  const totalFilterVCServicePacketOverDueDatabasePlanCount = data.reduce(
    (total, item) => total + item.filterVCServicePacketOverDueDatabasePlanCount,
    0,
  );
  const totalFilterVCServicePacketOverDueDatabasePlanSum = data.reduce(
    (total, item) => total + item.filterVCServicePacketOverDueDatabasePlanSum,
    0,
  );
  const totalFilterVCServicePacketPlanSum = data.reduce(
    (total, item) => total + item.filterVCServicePacketPlanSum,
    0,
  );
  const totalTotalDonePlanSum = data.reduce(
    (total, item) => total + item.totalDonePlanSum,
    0,
  );
  const totalTotalPlanSum = data.reduce(
    (total, item) => total + item.totalPlanSum,
    0,
  );

  const totalDonePlanPercent =
    totalTotalDonePlanSum == 0 || totalTotalPlanSum == 0
      ? 0
      : Math.round((totalTotalDonePlanSum / totalTotalPlanSum) * 10000) / 100;

  const headerStyleGreen = {
    whiteSpace: 'pre-wrap',
    background: '#16ab39',
    border: '1px solid #fff',
    color: '#fff',
  };

  const headerStyleBlue = {
    whiteSpace: 'pre-wrap',
    background: '#2185d0',
    border: '1px solid #fff',
    color: '#fff',
  };
  const mainHeaderStyle = {
    whiteSpace: 'pre-wrap',
    background: '#fff',
    border: '1px solid #fff',
    color: '#2185d0',
  };

  const cellStyleGreen = {
    background: 'rgb(14, 230, 65)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };
  const cellStylePinkSiren = {
    background: 'rgb(239 142 142)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  const mainCellStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  //Колоны ReactTable
  const initialColumns = [
    {
      fixed: 'left',
      headerStyle: mainHeaderStyle,
      columns: [
        {
          Header: '#',
          accessor: 'id',
          headerStyle: mainHeaderStyle,
          width: 50,
          getProps: (state, rowInfo, column) => {
            return {
              style: mainCellStyle,
            };
          },
          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {row.value}
            </div>
          ),
        },
        {
          Header: 'Компания',
          accessor: 'bukrsName',
          headerStyle: mainHeaderStyle,
          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {row.value}
            </div>
          ),
          getProps: (state, rowInfo, column) => {
            return {
              style: mainCellStyle,
            };
          },
        },
        {
          Header: 'Филиал',
          Footer: 'Общий:',
          accessor: 'branchName',
          headerStyle: mainHeaderStyle,
          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {row.value}
            </div>
          ),
          getProps: (state, rowInfo, column) => {
            return {
              style: mainCellStyle,
            };
          },
        },
      ],
    },

    {
      Header: 'Замена картриджей(Система по очистке воды)',
      headerStyle: headerStyleGreen,
      columns: [
        {
          Header: 'Текущий план база по количеству',
          accessor: 'filterCurrentDatabasePlanCount',
          Footer: () => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {`${moneyFormat(totalFilterCurrentDatabasePlanCount)}`}
            </div>
          ),
          headerStyle: headerStyleGreen,
          getProps: (state, rowInfo, column) => {
            return {
              style: mainCellStyle,
            };
          },
          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {moneyFormat(row.value)}
            </div>
          ),
        },
        {
          Header: 'Текущий план база',
          accessor: 'filterCurrentDatabasePlanSum',
          headerStyle: headerStyleGreen,
          Footer: () => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {`${moneyFormat(totalFilterCurrentDatabasePlanSum)}`}
            </div>
          ),
          getProps: (state, rowInfo, column) => {
            return {
              style: mainCellStyle,
            };
          },
          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {moneyFormat(row.value)}
            </div>
          ),
        },
        {
          Header: 'Текущий план',
          accessor: 'filterCurrentPlanSum',
          headerStyle: headerStyleGreen,
          Footer: () => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {`${moneyFormat(totalFilterCurrentPlanSum)}`}
            </div>
          ),
          getProps: (state, rowInfo, column) => {
            return {
              style: cellStyleGreen,
            };
          },

          Cell: ({ original }) => (
            <div>
              <div className="text-wrap" style={{ textAlign: 'center' }}>
                {moneyFormat(original.filterCurrentPlanSum)}
              </div>
            </div>
          ),
        },
        {
          Header: 'Просроченный план по количеству',
          accessor: 'filterOverDueDatabasePlanCount',
          headerStyle: headerStyleGreen,
          Footer: () => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {`${moneyFormat(totalFilterOverDueDatabasePlanCount)}`}
            </div>
          ),
          getProps: (state, rowInfo, column) => {
            return {
              style: mainCellStyle,
            };
          },
          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {moneyFormat(row.value)}
            </div>
          ),
        },
        {
          Header: 'Просроченный план база',
          accessor: 'filterOverDueDatabasePlanSum',
          headerStyle: headerStyleGreen,
          Footer: () => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {`${moneyFormat(totalFilterOverDueDatabasePlanSum)}`}
            </div>
          ),
          getProps: (state, rowInfo, column) => {
            return {
              style: mainCellStyle,
            };
          },
          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {moneyFormat(row.value)}
            </div>
          ),
        },
        {
          Header: 'Просроченный план',
          accessor: 'filterOverDuePlanSum',
          headerStyle: headerStyleGreen,
          Footer: () => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {`${moneyFormat(totalFilterOverDuePlanSum)}`}
            </div>
          ),
          getProps: (state, rowInfo, column) => {
            return {
              style: cellStyleGreen,
            };
          },
          Cell: ({ original }) => (
            <div>
              <div className="text-wrap" style={{ textAlign: 'center' }}>
                {moneyFormat(original.filterOverDuePlanSum)}
              </div>
            </div>
          ),
        },
        {
          Header: 'Общий план',
          accessor: 'filterTotalPlanSum',
          headerStyle: headerStyleGreen,
          Footer: () => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {`${moneyFormat(totalFilterTotalPlanSum)}`}
            </div>
          ),
          getProps: (state, rowInfo, column) => {
            return {
              style: mainCellStyle,
            };
          },
          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {moneyFormat(row.value)}
            </div>
          ),
        },
        {
          Header: 'Выполненный план',
          accessor: 'filterDonePlanSum',
          headerStyle: headerStyleGreen,
          Footer: () => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {`${moneyFormat(totalFilterDonePlanSum)}`}
            </div>
          ),
          getProps: (state, rowInfo, column) => {
            return {
              style: cellStylePinkSiren,
            };
          },
          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {moneyFormat(row.value)}
            </div>
          ),
        },
      ],
    },
    {
      Header: 'Сервис пакет(Система по очистке воды)',
      headerStyle: headerStyleGreen,
      columns: [
        {
          Header: 'План',
          accessor: 'filterServicePacketPlanSum',
          headerStyle: headerStyleGreen,
          Footer: () => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {`${moneyFormat(totalFilterServicePacketPlanSum)}`}
            </div>
          ),
          getProps: (state, rowInfo, column) => {
            return {
              style: cellStyleGreen,
            };
          },
          Cell: ({ original }) => (
            <div>
              <div className="text-wrap" style={{ textAlign: 'center' }}>
                {moneyFormat(original.filterServicePacketPlanSum)}
              </div>
            </div>
          ),
        },
        {
          Header: 'Выполненный план',
          headerStyle: headerStyleGreen,
          accessor: 'filterServicePacketDonePlanSum',
          Footer: () => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {`${moneyFormat(totalFilterServicePacketDonePlanSum)}`}
            </div>
          ),
          getProps: (state, rowInfo, column) => {
            return {
              style: cellStylePinkSiren,
            };
          },
          Cell: ({ original }) => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {moneyFormat(original.filterServicePacketDonePlanSum)}
            </div>
          ),
        },
      ],
    },
    {
      Header: 'Продажа запчастей(Система по очистке воды)',
      headerStyle: headerStyleGreen,
      columns: [
        {
          Header: 'План',
          accessor: 'filterPartsPlanSum',
          headerStyle: headerStyleGreen,
          Footer: () => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {`${moneyFormat(totalFilterPartsPlanSum)}`}
            </div>
          ),
          getProps: (state, rowInfo, column) => {
            return {
              style: cellStyleGreen,
            };
          },
          Cell: ({ original }) => (
            <div>
              <div className="text-wrap" style={{ textAlign: 'center' }}>
                {moneyFormat(original.filterPartsPlanSum)}
              </div>
            </div>
          ),
        },
        {
          Header: 'Выполненный план',
          accessor: 'filterPartsDonePlanSum',
          headerStyle: headerStyleGreen,
          Footer: () => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {`${moneyFormat(totalFilterPartsDonePlanSum)}`}
            </div>
          ),
          getProps: (state, rowInfo, column) => {
            return {
              style: cellStylePinkSiren,
            };
          },
          Cell: ({ original }) => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {moneyFormat(original.filterPartsDonePlanSum)}
            </div>
          ),
        },
      ],
    },

    {
      Header: 'Сервис пакет(Уборочная система)',
      headerStyle: headerStyleBlue,
      columns: [
        {
          Header: 'Текущий план база по количеству',
          accessor: 'filterVCServicePacketCurrentDatabasePlanCount',
          headerStyle: headerStyleBlue,
          Footer: () => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {`${moneyFormat(
                totalFilterVCServicePacketCurrentDatabasePlanCount,
              )}`}
            </div>
          ),
          getProps: (state, rowInfo, column) => {
            return {
              style: mainCellStyle,
            };
          },
          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {moneyFormat(row.value)}
            </div>
          ),
        },
        {
          Header: 'Текущий план база',
          accessor: 'filterVCServicePacketCurrentDatabasePlanSum',
          headerStyle: headerStyleBlue,
          Footer: () => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {`${moneyFormat(
                totalFilterVCServicePacketCurrentDatabasePlanSum,
              )}`}
            </div>
          ),
          getProps: (state, rowInfo, column) => {
            return {
              style: mainCellStyle,
            };
          },
          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {moneyFormat(row.value)}
            </div>
          ),
        },
        {
          Header: 'Просроченный план база по количеству',
          accessor: 'filterVCServicePacketOverDueDatabasePlanCount',
          headerStyle: headerStyleBlue,
          Footer: () => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {`${moneyFormat(
                totalFilterVCServicePacketOverDueDatabasePlanCount,
              )}`}
            </div>
          ),
          getProps: (state, rowInfo, column) => {
            return {
              style: mainCellStyle,
            };
          },
          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {moneyFormat(row.value)}
            </div>
          ),
        },
        {
          Header: 'Просроченный план база',
          accessor: 'filterVCServicePacketOverDueDatabasePlanSum;',
          headerStyle: headerStyleBlue,
          Footer: () => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {`${moneyFormat(
                totalFilterVCServicePacketOverDueDatabasePlanSum,
              )}`}
            </div>
          ),
          getProps: (state, rowInfo, column) => {
            return {
              style: mainCellStyle,
            };
          },
          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {moneyFormat(row.value)}
            </div>
          ),
        },
        {
          Header: 'План',
          accessor: 'filterVCServicePacketPlanSum',
          headerStyle: headerStyleBlue,
          Footer: () => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {`${moneyFormat(totalFilterVCServicePacketPlanSum)}`}
            </div>
          ),
          getProps: (state, rowInfo, column) => {
            return {
              style: cellStyleGreen,
            };
          },
          Cell: ({ original }) => (
            <div>
              <div className="text-wrap" style={{ textAlign: 'center' }}>
                {moneyFormat(original.filterVCServicePacketPlanSum)}
              </div>
            </div>
          ),
        },
        {
          Header: 'Выполненный план',
          accessor: 'filterVCServicePacketDonePlanSum',
          headerStyle: headerStyleBlue,
          Footer: () => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {`${moneyFormat(totalFilterVCServicePacketDonePlanSum)}`}
            </div>
          ),
          getProps: (state, rowInfo, column) => {
            return {
              style: cellStylePinkSiren,
            };
          },
          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {moneyFormat(row.value)}
            </div>
          ),
        },
      ],
    },
    {
      Header: 'Продажа запчастей(Уборочная система)',
      headerStyle: headerStyleBlue,
      columns: [
        {
          Header: 'План',
          accessor: 'filterVCPartsPlanSum',
          headerStyle: headerStyleBlue,
          Footer: () => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {`${moneyFormat(totalFilterVCPartsPlanSum)}`}
            </div>
          ),
          getProps: (state, rowInfo, column) => {
            return {
              style: cellStyleGreen,
            };
          },
          Cell: ({ original }) => (
            <div>
              <div className="text-wrap" style={{ textAlign: 'center' }}>
                {moneyFormat(original.filterVCPartsPlanSum)}
              </div>
            </div>
          ),
        },
        {
          Header: 'Выполненный план',
          accessor: 'filterVCPartsDonePlanSum',
          headerStyle: headerStyleBlue,
          Footer: () => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {`${moneyFormat(totalFilterVCPartsDonePlanSum)}`}
            </div>
          ),
          getProps: (state, rowInfo, column) => {
            return {
              style: cellStylePinkSiren,
            };
          },
          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {moneyFormat(row.value)}
            </div>
          ),
        },
      ],
    },
    {
      Header: '',
      fixed: 'right',
      headerStyle: mainHeaderStyle,
      columns: [
        {
          Header: 'Общая сумма плана',
          accessor: 'totalPlanSum',
          headerStyle: mainHeaderStyle,
          width: 120,
          minWidth: 120,
          maxWidth: 120,
          fixed: 'right',
          Footer: () => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {`${moneyFormat(totalTotalPlanSum)}`}
            </div>
          ),

          Cell: ({ value }) => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {moneyFormat(value)}
            </div>
          ),
        },
        {
          Header: 'Выполненный план',
          accessor: 'totalDonePlanSum',
          headerStyle: mainHeaderStyle,
          width: 120,
          minWidth: 120,
          maxWidth: 120,
          fixed: 'right',
          Footer: () => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {`${moneyFormat(totalTotalDonePlanSum)}`}
            </div>
          ),
          getProps: (state, rowInfo, column) => {
            return {
              style: cellStylePinkSiren,
            };
          },
          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {moneyFormat(row.value)}
            </div>
          ),
        },
        {
          Header: '%',
          accessor: 'donePlanPercent',
          headerStyle: mainHeaderStyle,
          width: 120,
          minWidth: 120,
          maxWidth: 120,
          fixed: 'right',
          Footer: () => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {`${moneyFormat(totalDonePlanPercent)} %`}
            </div>
          ),
          getProps: (state, rowInfo, column) => {
            return {
              style: mainCellStyle,
            };
          },

          Cell: row => (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
              {`${moneyFormat(row.value)} %`}
            </div>
          ),
        },
        {
          Header: 'Действие',
          headerStyle: mainHeaderStyle,
          width: 120,
          minWidth: 120,
          maxWidth: 120,
          fixed: 'right',
          getProps: (state, rowInfo, column) => {
            return {
              style: mainCellStyle,
            };
          },
          Cell: ({ original }) => {
            return (
              <div className="text-wrap" style={{ textAlign: 'center' }}>
                <Popup
                  content="Редактировать"
                  trigger={
                    <Button
                      circular
                      icon="pencil"
                      color="green"
                      onClick={() => onChangeTable('editRowTable', original)}
                    />
                  }
                />
              </div>
            );
          },
        },
      ],
    },
  ];

  return (
    <ReactTableWrapperFixedColumns
      data={data ? data : []}
      columns={initialColumns}
      previousText={messages['Table.Previous']}
      nextText={messages['Table.Next']}
      showPagination={true}
      className="-striped -highlight"
      defaultPageSize={10}
      pageSizeOptions={[10, 20, 30, 40]}
      loadingText={messages['Table.Next']}
      noDataText={messages['Table.NoData']}
      rowsText={messages['Table.Rows']}
      pageText={messages['Table.Page']}
      ofText={messages['Table.Of']}
    />
  );
};

export default Table;

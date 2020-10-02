import React, { useState, useEffectб, createRef } from 'react';
import ReactTableWrapperFixedColumns from '../../../utils/ReactTableWrapperFixedColumns';
import { Popup, Button, Input } from 'semantic-ui-react';
import '../../service.css';
import { moneyFormat } from '../../../utils/helpers';

const Table = props => {
  const { data = [], messages = {}, editStatus, onChangeTable } = props;

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
      Header: 'Продажа запчастей(Система по очистке воды)',
      headerStyle: headerStyleGreen,
      columns: [
        {
          Header: 'План',
          accessor: 'filterPartsPlanSum',
          headerStyle: headerStyleGreen,
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
      Header: 'Сервис пакет(Уборочная система)',
      headerStyle: headerStyleBlue,
      columns: [
        {
          Header: 'Текущий план база по количеству',
          accessor: 'filterVCServicePacketCurrentDatabasePlanCount',
          headerStyle: headerStyleBlue,
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
          Footer: 'Общий:',
          getProps: (state, rowInfo, column) => {
            return {
              style: cellStyleGreen,
            };
          },

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

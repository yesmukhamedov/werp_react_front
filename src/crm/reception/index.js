import React, { useState, useEffect } from 'react';
import {
  Segment,
  Dropdown,
  Button,
  Icon,
  Divider,
  Form,
  Container,
  Input,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import ReactTableWrapperFixedColumns from '../../utils/ReactTableWrapperFixedColumns';
import './index.css';

const Reception = props => {
  const {
    data,
    intl: { messages },
    //reducer methods
  } = props;

  const moneyStatusesList = ['не выдан', 'выдан', 'возврат'];

  console.log(data);
  let dataTest = data.allDemo;

  return (
    <Container
      fluid
      style={{
        marginTop: '2em',
        marginBottom: '2em',
        paddingLeft: '2em',
        paddingRight: '2em',
      }}
    >
      <Segment className="flex-container">
        <h2> CRM ресепшн </h2>
      </Segment>

      <ReactTableWrapperFixedColumns
        data={dataTest}
        filterable={true}
        columns={[
          {
            Header: () => (
              <div style={{ textAlign: 'center' }}>
                № {messages['Crm.Demo']}
              </div>
            ),
            accessor: 'demoId',
            Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
          },

          {
            Header: () => (
              <div style={{ textAlign: 'center' }}>{messages['dealer']}</div>
            ),
            accessor: 'dealerName',
            filterable: false,
            Cell: row => (
              <div style={{ textAlign: 'center' }}> {row.value} </div>
            ),
          },
          {
            Header: () => (
              <div style={{ textAlign: 'center' }}>Сумма проезда</div>
            ),
            accessor: 'taxiExpense',
            filterable: false,
            Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
          },
          {
            Header: () => (
              <div style={{ textAlign: 'center' }}>
                {' '}
                {messages['Table.Address']}{' '}
              </div>
            ),
            accessor: 'address',
            filterable: false,
            Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
          },
          {
            Header: () => (
              <div style={{ textAlign: 'center' }}>
                {messages['moneyStatuses']}
              </div>
            ),
            accessor: 'statusName',
            filterable: false,
            Cell: row => (
              <div style={{ textAlign: 'center' }}>
                <select className="moneyStatusesSelect">
                  <option value="0">Не выдан</option>
                  <option value="1">Выдан</option>
                  <option value="2">Возврат</option>
                </select>
              </div>
            ),
          },
        ]}
        defaultPageSize={20}
        showPagination={true}
        pageSizeOptions={[10, 20, 30, 40]}
      />
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    data: {
      allDemo: [
        {
          dealerName: 'KYDYRBEKOV AIBEK',
          demoId: 670876,
          address: 'Almaty, Mamyr-4',
          taxiExpense: 500,
          statusName: 'не выдан',
          taxiExpenseCurrency: 'kzt',
          statusId: '1',
        },
        {
          dealerName: 'KYDYRBEKOV AIBEK',
          demoId: 670876,
          address: 'Almaty, Mamyr-4',
          taxiExpense: 500,
          statusName: 'не выдан',
          taxiExpenseCurrency: 'kzt',
          statusId: '1',
        },
        {
          dealerName: 'KYDYRBEKOV AIBEK',
          demoId: 670876,
          address: 'Almaty, Mamyr-4',
          taxiExpense: 500,
          statusName: 'не выдан',
          taxiExpenseCurrency: 'kzt',
          statusId: '1',
        },
        {
          dealerName: 'KYDYRBEKOV AIBEK',
          demoId: 670876,
          address: 'Almaty, Mamyr-4',
          taxiExpense: 500,
          statusName: 'не выдан',
          taxiExpenseCurrency: 'kzt',
          statusId: '1',
        },
        {
          dealerName: 'KYDYRBEKOV AIBEK',
          demoId: 670876,
          address: 'Almaty, Mamyr-4',
          taxiExpense: 500,
          statusName: 'не выдан',
          taxiExpenseCurrency: 'kzt',
          statusId: '1',
        },
        {
          dealerName: 'KYDYRBEKOV AIBEK',
          demoId: 670876,
          address: 'Almaty, Mamyr-4',
          taxiExpense: 500,
          statusName: 'не выдан',
          taxiExpenseCurrency: 'kzt',
          statusId: '1',
        },
      ],
      status: 200,
    },
  };
};

export default connect(mapStateToProps, {})(injectIntl(Reception));

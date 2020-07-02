import React from 'react';
import { Table } from 'semantic-ui-react';
import { moneyFormat } from '../../../../utils/helpers';
const ReportService = props => {
  const { data = {} } = props;

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Наименование</Table.HeaderCell>
          <Table.HeaderCell>Сумма</Table.HeaderCell>
          <Table.HeaderCell>Валюта</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Общая Сумма</Table.Cell>
          <Table.Cell>
            {data.sumTotal === null || data.sumTotal === undefined
              ? ''
              : moneyFormat(data.sumTotal)}
          </Table.Cell>
          <Table.Cell>
            {data.currencyName === null || data.currencyName === undefined
              ? ''
              : data.currencyName}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Скидка</Table.Cell>
          <Table.Cell>
            {data.discount === null || data.discount === undefined
              ? ''
              : moneyFormat(data.discount)}
          </Table.Cell>
          <Table.Cell>
            {data.currencyName === null || data.currencyName === undefined
              ? ''
              : data.currencyName}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Сумма к оплате</Table.Cell>
          <Table.Cell>
            {data.sumForPay === null || data.sumForPay === undefined
              ? ''
              : moneyFormat(data.sumForPay)}
          </Table.Cell>
          <Table.Cell>
            {data.currencyName === null || data.currencyName === undefined
              ? ''
              : data.currencyName}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Оплачено</Table.Cell>
          <Table.Cell>
            {data.paid === null || data.paid === undefined
              ? ''
              : moneyFormat(data.paid)}
          </Table.Cell>
          <Table.Cell>
            {data.currencyName === null || data.currencyName === undefined
              ? ''
              : data.currencyName}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Премия мастера</Table.Cell>
          <Table.Cell>
            {data.masterPremium === null || data.masterPremium === undefined
              ? ''
              : moneyFormat(data.masterPremium)}
          </Table.Cell>
          <Table.Cell>
            {data.currencyName === null || data.currencyName === undefined
              ? ''
              : data.currencyName}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell width={6}>Премия оператора</Table.Cell>
          <Table.Cell width={10}>
            {data.operatorPremium === null || data.operatorPremium === undefined
              ? ''
              : moneyFormat(data.operatorPremium)}
          </Table.Cell>
          <Table.Cell>
            {data.currencyName === null || data.currencyName === undefined
              ? ''
              : data.currencyName}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default ReportService;

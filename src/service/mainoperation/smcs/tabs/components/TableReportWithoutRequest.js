import React from 'react';
import { Table } from 'semantic-ui-react';
import { moneyFormat } from '../../../../../utils/helpers';

const TableReportWithoutRequest = props => {
  const { data = {}, currency } = props;

  return (
    <Table celled>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Общая Сумма</Table.Cell>
          <Table.Cell>
            {moneyFormat(data.sumTotal)} {currency}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Скидка</Table.Cell>
          <Table.Cell>
            {moneyFormat(data.discount)} {currency}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Сумма к оплате</Table.Cell>
          <Table.Cell>
            {moneyFormat(data.sumForPay)} {currency}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Оплачено</Table.Cell>
          <Table.Cell>
            {moneyFormat(data.paid)} {currency}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Премия мастера</Table.Cell>
          <Table.Cell>
            {moneyFormat(data.masterPremium)} {currency}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Премия оператора</Table.Cell>
          <Table.Cell>
            {moneyFormat(data.operatorPremium)} {currency}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default TableReportWithoutRequest;

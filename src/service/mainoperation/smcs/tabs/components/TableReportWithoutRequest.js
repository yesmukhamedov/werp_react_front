import React from 'react';
import { Table } from 'semantic-ui-react';

const TableReportWithoutRequest = props => {
  const { data = {} } = props;

  return (
    <Table celled>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Общая Сумма</Table.Cell>
          <Table.Cell>{data.sumTotal}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Скидка</Table.Cell>
          <Table.Cell>{data.discount}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Сумма к оплате</Table.Cell>
          <Table.Cell>{data.sumForPay}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Оплачено</Table.Cell>
          <Table.Cell>{data.paid}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Премия мастера</Table.Cell>
          <Table.Cell>{data.masterPremium}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Премия оператора</Table.Cell>
          <Table.Cell>{data.operatorPremium}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default TableReportWithoutRequest;

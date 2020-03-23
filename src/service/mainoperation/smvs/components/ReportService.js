import React from 'react';
import { Table } from 'semantic-ui-react';
const ReportService = props => {
  return (
    <Table>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Общая Сумма</Table.Cell>
          <Table.Cell>0</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Скидка</Table.Cell>
          <Table.Cell>0</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Сумма к оплате</Table.Cell>
          <Table.Cell>0</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Оплачено</Table.Cell>
          <Table.Cell>0</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Премия мастера</Table.Cell>
          <Table.Cell>0</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell width={6}>Премия оператора</Table.Cell>
          <Table.Cell width={10}>0</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default ReportService;

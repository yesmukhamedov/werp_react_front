import React from 'react';
import { Table, Header } from 'semantic-ui-react';
import faker from 'faker';

const PaymentBreakdownTableDisplay = props => (
  <div>
    <Header as="h3" dividing>
      График ежемесячного взноса
    </Header>
    <Table structured celled fixed>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width="1">#</Table.HeaderCell>
          <Table.HeaderCell>Дата</Table.HeaderCell>
          <Table.HeaderCell>Сумма</Table.HeaderCell>
          <Table.HeaderCell>Выплачено</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {[...Array(10).keys()].map(item => (
          <Table.Row key={item}>
            <Table.Cell>{item}</Table.Cell>
            <Table.Cell>{faker.date.month()}</Table.Cell>
            <Table.Cell>{faker.finance.amount()}</Table.Cell>
            <Table.Cell>{faker.finance.amount()}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </div>
);

export default PaymentBreakdownTableDisplay;

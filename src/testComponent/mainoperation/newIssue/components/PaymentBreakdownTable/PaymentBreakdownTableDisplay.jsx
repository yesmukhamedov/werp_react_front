import React from 'react';
import { Table, Header } from 'semantic-ui-react';

const PaymentBreakdownTableDisplay = (props) => {
  const { monthlyPayments } = props;
  return (
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
          {monthlyPayments &&
            monthlyPayments.map((item, idx) => (
              <Table.Row key={item.date}>
                <Table.Cell>{idx + 1}</Table.Cell>
                <Table.Cell>{item.date}</Table.Cell>
                <Table.Cell>{item.amount}</Table.Cell>
                <Table.Cell>{item.paid}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default PaymentBreakdownTableDisplay;

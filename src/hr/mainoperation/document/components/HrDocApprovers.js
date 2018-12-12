import React from 'react';
import { Segment, Label, Table } from 'semantic-ui-react';

export default function HrDocApprovers(props) {
  const { items } = props;
  if (!items) {
    return null;
  }
  return (
    <Segment raised>
      <Label color="blue" ribbon>
        Согласующие
      </Label>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>№</Table.HeaderCell>
            <Table.HeaderCell>ФИО</Table.HeaderCell>
            <Table.HeaderCell>Должность</Table.HeaderCell>
            <Table.HeaderCell>Действие</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.map((item, idx) => (
            <Table.Row key={item.id}>
              <Table.Cell>{idx + 1}</Table.Cell>
              <Table.Cell>{item.title}</Table.Cell>
              <Table.Cell>{item.positionName}</Table.Cell>
              <Table.Cell>{item.statusName}</Table.Cell>
              <Table.Cell />
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Segment>
  );
}

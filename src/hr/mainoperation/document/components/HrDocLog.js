import React from 'react';
import { Segment, Label, Table } from 'semantic-ui-react';
import { formatDMYMS } from '../../../../utils/helpers';

export default function HrDocLog(props) {
  const { items } = props;
  if (!items) {
    return null;
  }
  return (
    <Segment raised>
      <Label color="blue" ribbon>
        Журнал действии
      </Label>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ФИО</Table.HeaderCell>
            <Table.HeaderCell>Дата/время</Table.HeaderCell>
            <Table.HeaderCell>Действие</Table.HeaderCell>
            <Table.HeaderCell>Коментарии</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.map(item => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.creatorName}</Table.Cell>
              <Table.Cell>{formatDMYMS(item.createdAt)}</Table.Cell>
              <Table.Cell>{item.actionName}</Table.Cell>
              <Table.Cell>{item.note}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Segment>
  );
}

import React from 'react';
import { Table } from 'semantic-ui-react';

/**
 * Список Education
 */

export default function StaffEducationTable(props) {
  const { items } = props;

  const tempContent = items.map(item => (
    <Table.Row key={item.id}>
      <Table.Cell>{item.id}</Table.Cell>
      <Table.Cell>{item.institutionName}</Table.Cell>
      <Table.Cell>{item.levelName}</Table.Cell>
      <Table.Cell>{item.faculty}</Table.Cell>
      <Table.Cell>{item.specialization}</Table.Cell>
      <Table.Cell>{item.beginYear}</Table.Cell>
      <Table.Cell>{item.endYear}</Table.Cell>
      <Table.Cell />
    </Table.Row>
  ));
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Учебное заведение</Table.HeaderCell>
          <Table.HeaderCell>Уровень</Table.HeaderCell>
          <Table.HeaderCell>Факультет</Table.HeaderCell>
          <Table.HeaderCell>Спец.</Table.HeaderCell>
          <Table.HeaderCell>Год начало</Table.HeaderCell>
          <Table.HeaderCell>Год окончания</Table.HeaderCell>
          <Table.HeaderCell>Действия</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>{tempContent}</Table.Body>
    </Table>
  );
}

import React from 'react';
import { Table } from 'semantic-ui-react';

/**
 * Список Matnrs
 */

export default function StaffMatnrsTable(props) {
  const { items } = props;

  const tempContent = items.map(item => (
    <Table.Row key={item.code}>
      <Table.Cell>{item.werksName}</Table.Cell>
      <Table.Cell>{item.matnrName}</Table.Cell>
      <Table.Cell>{item.code}</Table.Cell>
      <Table.Cell>
        {!item.barcode || item.barcode === 'null' ? '' : item.barcode}
      </Table.Cell>
      <Table.Cell>{item.qty}</Table.Cell>
      <Table.Cell>{item.statusName}</Table.Cell>
    </Table.Row>
  ));
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Склад</Table.HeaderCell>
          <Table.HeaderCell>Материал</Table.HeaderCell>
          <Table.HeaderCell>Код</Table.HeaderCell>
          <Table.HeaderCell>Зав. номер</Table.HeaderCell>
          <Table.HeaderCell>Количество</Table.HeaderCell>
          <Table.HeaderCell>Статус</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>{tempContent}</Table.Body>
    </Table>
  );
}

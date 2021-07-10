import React from 'react';
import { Table } from 'semantic-ui-react';

export default function WspaceKpiTable(props) {
  const { kpiData, messages } = props;
  if (!kpiData) {
    return <h3>Нет данныхs!</h3>;
  }

  const items = Object.assign([], kpiData.items);

  return (
    <Table celled padded>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell singleLine>{messages.fio}</Table.HeaderCell>
          <Table.HeaderCell>{messages['Table.Category']}</Table.HeaderCell>
          <Table.HeaderCell>{messages['Crm.PointPerCall']}</Table.HeaderCell>
          <Table.HeaderCell>{messages['Crm.CallCount']}</Table.HeaderCell>
          <Table.HeaderCell>
            {messages['Crm.Score']} ({kpiData.totalScore})
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {items.map(item => (
          <Table.Row key={item.indicatorId}>
            <Table.Cell>{kpiData.staffName}</Table.Cell>
            <Table.Cell>{item.indicatorName}</Table.Cell>
            <Table.Cell>{item.point}</Table.Cell>
            <Table.Cell>{item.doneValue}</Table.Cell>
            <Table.Cell>{item.score}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

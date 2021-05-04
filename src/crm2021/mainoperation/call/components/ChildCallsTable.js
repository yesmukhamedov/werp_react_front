import React from 'react';
import { Table, Card } from 'semantic-ui-react';
import { renderCallResultLabel } from '../../../CrmHelper';
import moment from 'moment';

/**
 * Компонент для рендеринга звонки
 */

const ChildCallsTable = props => {
  // Список звонков
  const initialState = [
    {
      id: 0,
      companyId: '0',
      companyName: '0',
      branchId: 0,
      branchName: '0',
      dateTime: '0',
      callerId: 0,
      callerName: '0',
      note: '0',
      result: '0',
      resultName: '0',
    },
  ];
  const { messages } = props;
  const items =
    Object.keys(props.items).length === 0 ? initialState : props.items;
  console.log('items', items);
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{messages['Crm.Calls']}</Card.Header>
      </Card.Content>
      <Card.Content>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>#</Table.HeaderCell>
              <Table.HeaderCell>{messages.brnch}</Table.HeaderCell>
              <Table.HeaderCell>
                {messages['Crm.CallDateTime']}
              </Table.HeaderCell>
              <Table.HeaderCell>{messages['Crm.Caller']}</Table.HeaderCell>
              <Table.HeaderCell>
                {messages['Form.PhoneNumber']}
              </Table.HeaderCell>
              <Table.HeaderCell>
                {messages['Crm.ResultOfCall']}
              </Table.HeaderCell>
              <Table.HeaderCell>{messages['Table.Note']}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {items.map((item, idx) => (
              <Table.Row key={idx}>
                <Table.Cell>{idx + 1}</Table.Cell>
                <Table.Cell>{item.branchName}</Table.Cell>
                <Table.Cell>
                  {item.dateTime
                    ? moment(item.dateTime).format('DD.MM.YYYY HH:mm')
                    : ''}
                </Table.Cell>
                <Table.Cell>{item.callerName}</Table.Cell>
                <Table.Cell>{item.phoneNumber}</Table.Cell>
                <Table.Cell>
                  {renderCallResultLabel(item.resultId, item.resultName)}
                </Table.Cell>
                <Table.Cell>{item.note}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card.Content>
    </Card>
  );
};

export default ChildCallsTable;

import React from 'react';
import { Table, Card, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

/**
 * Компонент для рендеринга дочерние демо
 */

const ChildDemosTable = props => {
  // Список демо
  const { items, messages } = props;

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{messages['Crm.Demonstrations']}</Card.Header>
      </Card.Content>
      <Card.Content>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>#</Table.HeaderCell>
              <Table.HeaderCell>{messages.brnch}</Table.HeaderCell>
              <Table.HeaderCell>{messages.fioClient}</Table.HeaderCell>
              <Table.HeaderCell>
                {messages['Crm.DemoDateTime']}
              </Table.HeaderCell>
              <Table.HeaderCell>
                {messages['Table.AppointerStaff']}
              </Table.HeaderCell>
              <Table.HeaderCell>{messages['Table.Result']}</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {items.map((item, idx) => (
              <Table.Row key={idx}>
                <Table.Cell>{idx + 1}</Table.Cell>
                <Table.Cell>{item.branchName}</Table.Cell>
                <Table.Cell>{item.clientName}</Table.Cell>
                <Table.Cell>
                  {item.dateTime
                    ? moment(item.dateTime).format('DD.MM.YYYY HH:mm')
                    : ''}
                </Table.Cell>
                <Table.Cell>{item.appointer}</Table.Cell>
                <Table.Cell>{item.resultName}</Table.Cell>
                <Table.Cell>
                  <Link
                    className="ui icon button"
                    to={`/crm/demo/view/${item.id}`}
                  >
                    <Icon name="eye" />
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card.Content>
    </Card>
  );
};

export default ChildDemosTable;

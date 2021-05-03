import React from 'react';
import { Table, Card, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

/**
 * Компонент для рендеринга дочерние рекомендации
 */

export default function ChildRecosTable(props) {
  // Список рекомендации
  const { items, messages } = props;

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{messages['Crm.ListOfRecommendations']}</Card.Header>
      </Card.Content>
      <Card.Content>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>#</Table.HeaderCell>
              <Table.HeaderCell>{messages.fioClient}</Table.HeaderCell>
              <Table.HeaderCell>{messages['Table.Status']}</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {items.map((item, idx) => (
              <Table.Row key={item.id}>
                <Table.Cell>{idx + 1}</Table.Cell>
                <Table.Cell>{item.clientName}</Table.Cell>
                <Table.Cell>{item.statusName}</Table.Cell>
                <Table.Cell>
                  <Link
                    className="ui icon button"
                    to={`/crm2021/reco/view/${item.id}`}
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
}

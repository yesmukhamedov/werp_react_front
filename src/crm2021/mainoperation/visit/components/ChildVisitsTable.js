import React from 'react';
import { Table, Card, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

/**
 * Компонент для рендеринга дочерних визитов
 */

export default function ChildVisitsTable(props) {
  // Visits List
  const { items, messages } = props;
  console.log('childvisit table', props);
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{messages['Crm.Visits']}</Card.Header>
      </Card.Content>
      <Card.Content>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>#</Table.HeaderCell>
              <Table.HeaderCell>{messages.brnch}</Table.HeaderCell>
              <Table.HeaderCell>{messages['Table.Visitor']}</Table.HeaderCell>
              <Table.HeaderCell>{messages['Table.Date']}</Table.HeaderCell>
              <Table.HeaderCell>{messages['Table.Note']}</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {items.map((item, idx) => (
              <Table.Row key={idx}>
                <Table.Cell>{idx + 1}</Table.Cell>
                <Table.Cell>{item.branchName}</Table.Cell>
                <Table.Cell>{item.visitorName}</Table.Cell>
                <Table.Cell>
                  {item.docDate
                    ? moment(item.docDate).format('DD.MM.YYYY')
                    : ''}
                </Table.Cell>
                <Table.Cell>{item.note}</Table.Cell>
                <Table.Cell>
                  <Link
                    className="ui icon button"
                    to={`/crm/visit/view/${item.id}`}
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

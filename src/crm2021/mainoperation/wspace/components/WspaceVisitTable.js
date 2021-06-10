import React from 'react';
import { Table, Label, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { formatDMYMS } from '../../../../utils/helpers';

export default function WspaceVisitTable(props) {
  const { items, messages } = props;
  if (!items) {
    return <h3>Нет данных!</h3>;
  }

  return (
    <Table celled padded>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell singleLine>
            {messages['Table.Client']}
          </Table.HeaderCell>
          <Table.HeaderCell>{messages['Table.Address']}</Table.HeaderCell>
          <Table.HeaderCell>{messages['Table.VisitDate']}</Table.HeaderCell>
          <Table.HeaderCell>{messages['Table.Visitor']}</Table.HeaderCell>
          <Table.HeaderCell>{messages['Table.Note']}</Table.HeaderCell>
          <Table.HeaderCell>{messages['Table.Actions']}</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {items.map(item => (
          <Table.Row key={item.id}>
            <Table.Cell>{item.clientName}</Table.Cell>
            <Table.Cell>{item.address}</Table.Cell>
            <Table.Cell>{item.docDate}</Table.Cell>
            <Table.Cell>{item.visitorName}</Table.Cell>
            <Table.Cell>{item.note}</Table.Cell>
            <Table.Cell>
              <Link
                target="_blank"
                className="ui icon button mini"
                to={`/crm/visit/view/${item.id}`}
              >
                {messages['Table.View']}
              </Link>

              <Label
                as="a"
                onClick={() => props.openRecoListModal(item, 'visit')}
              >
                <Icon name="unhide" /> {messages['Table.RingUp']}
              </Label>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

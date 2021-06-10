import React from 'react';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import DemoResultLabel from '../../demo/components/DemoResultLabel';
import { renderRecoCategoryBtn } from '../../../CrmHelper';

export default function WspaceDemoTable(props) {
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
          <Table.HeaderCell>{messages['Table.DateTime']}</Table.HeaderCell>
          <Table.HeaderCell>{messages['Table.Dealer']}</Table.HeaderCell>
          <Table.HeaderCell>{messages['Table.Category']}</Table.HeaderCell>
          <Table.HeaderCell>{messages['Table.Note']}</Table.HeaderCell>
          <Table.HeaderCell>{messages['Table.Result']}</Table.HeaderCell>
          <Table.HeaderCell />
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {items.map(item => (
          <Table.Row key={item.id}>
            <Table.Cell>{item.clientName}</Table.Cell>
            <Table.Cell>{item.address}</Table.Cell>
            <Table.Cell>{item.dateTimeStr}</Table.Cell>
            <Table.Cell>{item.dealerName}</Table.Cell>
            <Table.Cell>
              {item.parentReco
                ? renderRecoCategoryBtn(
                    item.parentReco.categoryId,
                    item.parentReco.categoryName,
                  )
                : 'Неизвестно'}
            </Table.Cell>
            <Table.Cell>{item.note}</Table.Cell>
            <Table.Cell>
              <DemoResultLabel
                resultId={item.resultId}
                resultName={item.resultName}
              />
            </Table.Cell>
            <Table.Cell>
              <Link
                target="_blank"
                className="ui icon button mini"
                to={`/crm/demo/view/${item.id}`}
              >
                {messages['Table.View']}
              </Link>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

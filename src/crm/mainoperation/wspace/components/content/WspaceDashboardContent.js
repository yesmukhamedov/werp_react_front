import React from 'react';
import _ from 'lodash';
import { Table } from 'semantic-ui-react';
// import {formatDMYMS} from '../../../../../utils/helpers'
import WspaceDemoTable from '../WspaceDemoTable';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default function WspaceDashboardContent(props) {
  const { items, contentName, messages } = props;
  if (!items) {
    return null;
  }

  if (contentName === 'calls') {
    return renderCallsTable(items, messages);
  } else if (contentName === 'demos') {
    return <WspaceDemoTable messages={messages} items={items} />;
  }

  return null;
}

function renderCallsTable(items, messages) {
  const columns = [
    {
      Header: messages['Table.DateTime'],
      accessor: 'dateTimeStr',
      maxWidth: 150,
    },
    {
      Header: messages['Table.PhoneNumber'],
      accessor: 'phoneNumber',
    },
    {
      Header: messages['Table.Result'],
      accessor: 'resultName',
    },
    {
      Header: messages['Table.Note'],
      accessor: 'note',
    },
    {
      Header: messages['Table.Link'],
      id: 'recoId',
      accessor: row => (
        <Link
          target="_blank"
          className="ui icon button mini"
          to={`/crm/reco/view/${row.contextId}`}
        >
          {messages['Table.ViewReco']}
        </Link>
      ),
      Footer: (
        <span>
          <strong>{messages.overallSum}:</strong> {_.size(items)}
        </span>
      ),
    },
  ];
  return (
    <div style={{ backgroundColor: 'white' }}>
      <ReactTable
        data={items}
        columns={columns}
        pageSizeOptions={[10, 20, 30, 50]}
        defaultPageSize={10}
        previousText={messages.previousText}
        nextText={messages.nextText}
        loadingText={messages.loadingText}
        noDataText={messages.noDataText}
        pageText={messages.pageText}
        ofText={messages.ofText}
        rowsText={messages.rowsText}
        className="-striped -highlight"
      />
    </div>
  );
}

function renderCallsTable1(items) {
  console.log(items);
  return (
    <Table celled padded>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell singleLine>Дата-время звонка</Table.HeaderCell>
          <Table.HeaderCell>Номер</Table.HeaderCell>
          <Table.HeaderCell>Результат</Table.HeaderCell>
          <Table.HeaderCell>Примечание</Table.HeaderCell>
          <Table.HeaderCell />
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {items.map(item => (
          <Table.Row key={item.id}>
            <Table.Cell>{item.dateTime}</Table.Cell>
            <Table.Cell singleLine>{item.phoneNumber}</Table.Cell>
            <Table.Cell>{item.resultName}</Table.Cell>
            <Table.Cell textAlign="right">{item.note}</Table.Cell>
            <Table.Cell>
              <Link
                target="_blank"
                className="ui icon button mini"
                to={`/crm/reco/view/${item.recoId}`}
              >
                Просмотр рек.
              </Link>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

import React from 'react';
import { Table, Card, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

/**
 * Компонент для рендеринга Таблицу одного демо
 */

export default function DemoViewTable(props) {
  // Single Demo
  const { demo, messages } = props;
  const call = Object.assign({}, demo.call);

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{messages['Crm.BasicInfo']}</Card.Header>
      </Card.Content>
      <Card.Content>
        <Table celled striped>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Header as="h4">{messages.bukrs}</Header>
              </Table.Cell>
              <Table.Cell>{demo.bukrsName}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as="h4">{messages.brnch}</Header>
              </Table.Cell>
              <Table.Cell>{demo.branchName}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as="h4">{messages.dealer}</Header>
              </Table.Cell>
              <Table.Cell>{demo.dealerName}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as="h4">{messages['Table.AppointerStaff']}</Header>
              </Table.Cell>
              <Table.Cell>{demo.appointerName}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as="h4">{messages['Table.PhoneNumber']}</Header>
              </Table.Cell>
              <Table.Cell>{call.phoneNumber}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as="h4">{messages['Crm.Source']}</Header>
              </Table.Cell>
              <Table.Cell>{getSourceLink(demo, messages)}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as="h4">{messages['Crm.DemoDateTime']}</Header>
              </Table.Cell>
              <Table.Cell>{demo.dateTime}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as="h4">{messages['Table.Client']}</Header>
              </Table.Cell>
              <Table.Cell>{demo.clientName}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as="h4">{messages['Table.Address']}</Header>
              </Table.Cell>
              <Table.Cell>{demo.address}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as="h4">{messages['Table.Result']}</Header>
              </Table.Cell>
              <Table.Cell>{demo.resultName}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as="h4">{messages['Crm.Reason']}</Header>
              </Table.Cell>
              <Table.Cell>{demo.reasonName}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as="h4">{messages['Table.Note']}</Header>
              </Table.Cell>
              <Table.Cell>{demo.note}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as="h4">№ {messages.contract_number}</Header>
              </Table.Cell>
              <Table.Cell>{demo.contractNumber}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as="h4">{messages['Crm.DateOfSale']}</Header>
              </Table.Cell>
              <Table.Cell>
                {demo.saleDate
                  ? moment(demo.saleDate).format('DD.MM.YYYY')
                  : ''}
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as="h4">{'Район и сумма'}</Header>
              </Table.Cell>
              <Table.Cell>
                {demo.priceDistrictName
                  ? demo.priceDistrictName + '; ' + demo.price
                  : ''}
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as="h4">{messages['Table.createdAt']}</Header>
              </Table.Cell>
              <Table.Cell>
                {moment(demo.createdAt).format('DD.MM.YYYY H:mm')}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Card.Content>
    </Card>
  );
}

function getSourceLink(demo, messages) {
  const call = Object.assign({}, demo.call);
  if (demo.context === 'visit') {
    return (
      <Link className="button" to={`/crm/visit/view/${demo.visitId}`}>
        {messages['Crm.Visit']} № {call.contextId}
      </Link>
    );
  } else if (call.context === 'reco') {
    return (
      <Link className="button" to={`/crm/reco/view/${call.contextId}`}>
        {messages['Crm.Recommendation']} № {call.contextId}
      </Link>
    );
  } else if (call.context === 'demo') {
    return (
      <Link to={`/crm/demo/view/${call.contextId}`}>
        {messages['Crm.Demo']} № {call.contextId}
      </Link>
    );
  }
}

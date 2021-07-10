import React from 'react';
import { Card, Header, Table } from 'semantic-ui-react';
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
              <Table.Cell>{demo.phoneNumber}</Table.Cell>
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
              <Table.Cell>{demo.dateTimeView}</Table.Cell>
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
              <Table.Cell>{demo.saleDateView}</Table.Cell>
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
              <Table.Cell>{demo.createdAt}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Card.Content>
    </Card>
  );
}

function getSourceLink(demo, messages) {
  if (demo.visitId) {
    return (
      <Link className="button" to={`/crm2021/visit/view/${demo.visitId}`}>
        {messages['Crm.Visit']} № {demo.visitId}
      </Link>
    );
  } else if (demo.recoId) {
    return (
      <Link className="button" to={`/crm2021/reco/view/${demo.recoId}`}>
        {messages['Crm.Recommendation']} № {demo.recoId}
      </Link>
    );
  } else if (demo.parentId) {
    return (
      <Link to={`/crm2021/demo/view/${demo.parentId}`}>
        {messages['Crm.Demo']} № {demo.parentId}
      </Link>
    );
  }

  return '';
}

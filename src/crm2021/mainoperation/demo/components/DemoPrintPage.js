import React, { Component } from 'react';
import { Header, Table, Image, Card } from 'semantic-ui-react';
import moment from 'moment';

class DemoPrintPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: props.messages,
    };
  }

  render() {
    const { demo } = this.props;
    if (!demo.id) {
      return null;
    }
    const { messages } = this.state;
    return (
      <Card fluid>
        <Card.Content>
          <Image src="/assets/img/demo-card-logo-aura.png" />
        </Card.Content>
        <Card.Content>
          {this.renderTable(demo, this.props.recommender, messages)}
          <br />
          {this.renderTable(demo, this.props.recommender, messages)}
        </Card.Content>
      </Card>
    );
  }

  renderTable(demo, recommender, messages) {
    const parentReco = Object.assign({}, demo.parentReco);
    const phones = Object.assign([], parentReco.phones);
    let recomName = '';
    console.log('parent reco: ', demo);
    if (recommender.id) {
      recomName = recommender.clientName;
    } else {
      recomName = parentReco.recommenderName;
    }
    return (
      <Table celled striped className="printTable">
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <h3>
                {messages['Crm.Democard']} №{demo.id}
              </h3>
            </Table.Cell>
            <Table.Cell>
              <h4>
                <i>{messages.dealer}:</i> {demo.dealerName}
              </h4>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Header style={{ marginLeft: 20 }} as="h4">
                {messages['Crm.DemoDateTime']}
              </Header>
            </Table.Cell>
            <Table.Cell>{demo.dateTime}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell style={{ textAlign: 'right' }}>
              <Header style={{ marginLeft: 20 }} as="h4">
                {messages['Crm.DemoSecretary']}
              </Header>
            </Table.Cell>
            <Table.Cell>{demo.appointerName}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Header style={{ marginLeft: 20 }} as="h4">
                {messages['Form.RecommenderFullName']}
              </Header>
            </Table.Cell>
            <Table.Cell>
              {recomName},
              {recommender.phones
                ? recommender.phones.map(p => (
                    <span key={p.id} style={{ marginLeft: '5px' }}>
                      {p.phoneNumber}
                    </span>
                  ))
                : ''}
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Header style={{ marginLeft: 20 }} as="h4">
                {messages['Form.Reco.Relative']}
              </Header>
            </Table.Cell>
            <Table.Cell>{recommender.relative}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell style={{ textAlign: 'right' }}>
              <Header style={{ marginLeft: 20 }} as="h4">
                {messages['Table.ClientFullName']}
              </Header>
            </Table.Cell>
            <Table.Cell>{recommender.clientName}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Header style={{ marginLeft: 20 }} as="h4">
                {messages['Table.PhoneNumber']}
              </Header>
            </Table.Cell>
            <Table.Cell>
              {phones.map(p => (
                <span key={p.id}>{p.phoneNumber} &nbsp;</span>
              ))}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell style={{ textAlign: 'right' }}>
              <Header style={{ marginLeft: 20 }} as="h4">
                {messages['Table.Note']}
              </Header>
            </Table.Cell>
            <Table.Cell>{demo.note}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Header style={{ marginLeft: 20 }} as="h4">
                {messages['Table.Address']}
              </Header>
            </Table.Cell>
            <Table.Cell>{demo.address}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Header style={{ marginLeft: 20 }} as="h4">
                Район и сумма
              </Header>
            </Table.Cell>
            <Table.Cell>
              {demo.priceDistrictName
                ? demo.priceDistrictName + '; ' + demo.price
                : ''}
            </Table.Cell>
          </Table.Row>

          <Table.Row />
        </Table.Body>
      </Table>
    );
  }
}
export default DemoPrintPage;

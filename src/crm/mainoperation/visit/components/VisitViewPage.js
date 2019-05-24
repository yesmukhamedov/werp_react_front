import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Header,
  Container,
  Button,
  Segment,
  Grid,
  Table,
  Divider,
  Card,
} from 'semantic-ui-react';
import moment from 'moment';
import DemoCreateModal from '../../demo/components/DemoCreateModal';
import {
  fetchSingleVisit,
  deleteVisit,
  modalToggle,
  setVisitForUpdate,
} from '../actions/visitAction';
import { connect } from 'react-redux';
import {
  toggleDemoCreateModal,
  fetchGroupDealers,
  fetchDemoResults,
  fetchReasons,
} from '../../demo/actions/demoAction';
import ChildDemosTable from '../../demo/components/ChildDemosTable';
import ChildRecosTable from '../../reco/components/ChildRecosTable';
import VisitCreateModal from './VisitCreateModal';
import { injectIntl } from 'react-intl';

class VisitViewPage extends Component {
  constructor(props) {
    super(props);
    this.loadedSuccess = true;
    this.state = {
      updateModalOpened: false,
      demoCreateModalOpened: false,
      showDeleteModal: false,
    };

    this.renderActions = this.renderActions.bind(this);
    this.onCloseDemoCreateModal = this.onCloseDemoCreateModal.bind(this);
    this.deleteVisit = this.deleteVisit.bind(this);
    this.toUpdate = this.toUpdate.bind(this);
  }

  componentWillMount() {
    const id = parseInt(this.props.match.params.id, 10);
    this.props.fetchSingleVisit(id);
    // Для создания демо
    this.props.fetchGroupDealers();
    // this.props.fetchDemoResults()
    // this.props.fetchReasons()
  }

  toUpdate() {
    this.props.modalToggle(true);
    this.props.setVisitForUpdate(this.props.visit);
  }
  renderActions(messages) {
    return (
      <div>
        <Link className="ui icon button" to="/crm/visit/archive">
          {messages['Crm.ToList']}
        </Link>
        {/* <Button onClick={this.openUpdateModal}>Редактировать</Button> */}
        <Link
          className="ui icon button"
          to={`/crm/reco/create/visit/${this.props.visit.id}`}
        >
          {messages['Crm.ToAddReco']}
        </Link>

        <Button onClick={this.toUpdate}>{messages['Crm.ToEdit']}</Button>
        <Button color="red" onClick={() => this.deleteVisit(messages)}>
          {messages['Crm.ToDelete']}
        </Button>
      </div>
    );
  }

  deleteVisit(messages) {
    if (!window.confirm(messages['Crm.ConfirmDelete'])) {
      return;
    }

    this.props.deleteVisit(this.props.visit.id);
  }

  renderPhones(phones) {
    if (!phones) {
      return;
    }

    return (
      <div>
        {phones.map(p => (
          <div key={p.id}>{` ${p.phoneNumber}`}</div>
        ))}
      </div>
    );
  }

  renderVisitTable(messages) {
    const { visit } = this.props;
    const parentReco = Object.assign({}, visit.parentReco);
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>{messages['Crm.VisitInfo']}</Card.Header>
        </Card.Content>
        <Card.Content>
          <Table celled striped>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Header as="h4">{messages.bukrs}</Header>
                </Table.Cell>
                <Table.Cell>{visit.bukrsName}</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as="h4">{messages.brnch}</Header>
                </Table.Cell>
                <Table.Cell>{visit.branchName}</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as="h4">{messages['Table.Visitor']}</Header>
                </Table.Cell>
                <Table.Cell>{visit.visitorName}</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as="h4">{messages['Table.VisitDate']}</Header>
                </Table.Cell>
                <Table.Cell>
                  {moment(visit.docDate).format('DD.MM.YYYY')}
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as="h4">{messages['Table.Address']}</Header>
                </Table.Cell>
                <Table.Cell>{visit.address}</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as="h4">{messages.fioClient}</Header>
                </Table.Cell>
                <Table.Cell>{visit.clientName}</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as="h4">{messages['Table.PhoneNumber']}</Header>
                </Table.Cell>
                <Table.Cell>
                  {visit.client && visit.client.phones
                    ? this.renderPhones(visit.client.phones)
                    : ''}
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as="h4">{messages['Table.Link']}</Header>
                </Table.Cell>
                <Table.Cell>
                  {parentReco.id ? (
                    <Link to={`/crm/reco/view/${parentReco.id}`}>
                      {messages['Crm.Recommendation']} №{parentReco.id}
                    </Link>
                  ) : (
                    ''
                  )}
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as="h4">{messages['Table.Note']}</Header>
                </Table.Cell>
                <Table.Cell>{visit.note}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Card.Content>
      </Card>
    );
  }

  onCloseDemoCreateModal() {
    this.setState({
      ...this.state,
      demoCreateModalOpened: false,
    });
    this.loadItem(this.state.visit.id);
  }

  render() {
    const { visit } = this.props;
    const { messages } = this.props.intl;
    return (
      <Container
        fluid
        style={{
          marginTop: '2em',
          marginBottom: '2em',
          paddingLeft: '2em',
          paddingRight: '2em',
        }}
      >
        <Segment clearing>
          <Header as="h2" floated="left">
            {messages['Crm.Visit']} № {this.props.visit.id}
          </Header>
        </Segment>
        {this.renderActions(messages)}
        <VisitCreateModal fromComponent="view" />
        <DemoCreateModal
          parentId={0}
          visitId={this.props.visit.id}
          recoId={0}
          dealerId={this.props.visit.visitorId}
          onClose={this.onCloseDemoCreateModal}
        />
        <Divider />
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              {this.renderVisitTable(messages)}
            </Grid.Column>

            <Grid.Column width={8}>
              {
                <ChildRecosTable
                  messages={messages}
                  items={visit.recos || []}
                />
              }
              {
                <ChildDemosTable
                  messages={messages}
                  items={visit.childDemos || []}
                />
              }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}
function mapStateToProps(state) {
  return {
    visit: state.crmVisit.visit,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchSingleVisit,
    toggleDemoCreateModal,
    fetchGroupDealers,
    fetchDemoResults,
    fetchReasons,
    deleteVisit,
    modalToggle,
    setVisitForUpdate,
  },
)(injectIntl(VisitViewPage));

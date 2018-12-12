import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Header,
  Container,
  Button,
  Segment,
  Grid,
  Divider,
  Modal,
} from 'semantic-ui-react';
import ReactToPrint from 'react-to-print';
import DemoUpdateModal from './DemoUpdateModal';
import DemoCreateModal from './DemoCreateModal';
import {
  fetchDemo,
  toggleDemoUpdateModal,
  toggleDemoCreateModal,
  deleteDemo,
  clearState,
  fetchDemoChildRecos,
} from '../actions/demoAction';
import { connect } from 'react-redux';
import ChildDemosTable from './ChildDemosTable';
import ChildRecosTable from '../../reco/components/ChildRecosTable';
import DemoViewTable from './DemoViewTable';
import DemoPrintPage from './DemoPrintPage';
import { injectIntl } from 'react-intl';

class DemoViewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      callResultOptions: [],
      callRefuseOptions: [],
      items: [],
      createModalOpened: false,
      showDeleteModal: false,
      showPrintPage: false,
    };

    this.renderActions = this.renderActions.bind(this);
    this.openUpdateModal = this.openUpdateModal.bind(this);
    this.openCreateModal = this.openCreateModal.bind(this);
    this.onCloseCreateModal = this.onCloseCreateModal.bind(this);
    this.onBeforePrint = this.onBeforePrint.bind(this);
    this.onAfterPrint = this.onAfterPrint.bind(this);
  }

  componentWillMount() {
    const id = parseInt(this.props.match.params.id, 10);
    this.props.fetchDemo(id);
    this.props.fetchDemoChildRecos(id);
  }

  getSourceLink(demo) {
    if (demo.visitId > 0) {
      return (
        <Link className="button" to={`/crm/visit/view/${demo.visitId}`}>
          Визит № {demo.visitId}
        </Link>
      );
    } else if (demo.recoId > 0) {
      return (
        <Link className="button" to={`/crm/reco/view/${demo.recoId}`}>
          Рекомендация № {demo.recoId}
        </Link>
      );
    } else if (demo.parentId > 0) {
      return (
        <Link className="button" to={`/crm/demo/view/${demo.recoId}`}>
          Демо № {demo.parentId}
        </Link>
      );
    }
  }

  renderActions(messages) {
    const { demo } = this.props;
    const notDemoDone = demo.resultId === 0 || demo.resultId === 7;
    return (
      <div>
        <Link className="ui icon button" to="/crm/demo/current">
          {messages['Crm.ToCurrentList']}
        </Link>

        <Link className="ui icon button" to="/crm/demo/archive">
          {messages['Crm.ToArchiveList']}
        </Link>
        <ReactToPrint
          trigger={() => <Button>{messages['Crm.ToPrint']}</Button>}
          content={() => this.componentRef}
        />
        <Button onClick={this.openUpdateModal}>{messages['Crm.ToEdit']}</Button>
        {notDemoDone ? (
          ''
        ) : (
          <Link
            className="ui icon button"
            to={`/crm/reco/create/demo/${demo.id}`}
          >
            {messages['Crm.ToAddReco']}
          </Link>
        )}
        {notDemoDone ? (
          ''
        ) : (
          <Button onClick={this.openCreateModal}>
            {messages['Crm.ToAddDemo']}
          </Button>
        )}
        <Button color="red" onClick={() => this.deleteModalTrigger(true)}>
          {messages['Crm.ToDelete']}
        </Button>
      </div>
    );
  }

  onBeforePrint() {
    this.setState({
      ...this.state,
      showPrintPage: true,
    });
  }

  onAfterPrint() {
    this.setState({
      ...this.state,
      showPrintPage: false,
    });
  }

  deleteModalTrigger(showDeleteModal) {
    this.setState({
      ...this.state,
      showDeleteModal,
    });
  }

  renderDeleteConfirmModal() {
    const { messages } = this.props.intl;
    return (
      <Modal open={this.state.showDeleteModal}>
        <Modal.Header>{messages['Crm.DeleteWarningHeader']}!</Modal.Header>
        <Modal.Content>
          <p>{messages['Crm.Demo.DeleteWarningTxt1']}!</p>
          <p>{messages['Crm.Demo.DeleteWarningTxt2']}!</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => this.deleteModalTrigger(false)} negative>
            {messages.cancel}
          </Button>
          <Button
            onClick={() => this.props.deleteDemo(this.props.demo.id)}
            positive
            icon="checkmark"
            labelPosition="right"
            content={messages['Crm.ToDelete']}
          />
        </Modal.Actions>
      </Modal>
    );
  }

  openUpdateModal() {
    this.props.toggleDemoUpdateModal(true);
  }

  openCreateModal() {
    this.props.toggleDemoCreateModal(true);
  }

  onCloseCreateModal() {
    this.setState({
      ...this.state,
      createModalOpened: false,
    });
  }

  render() {
    const { demo } = this.props;
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
            {messages['Crm.Democard']} № {this.props.demo.id}
          </Header>
        </Segment>
        {this.renderActions(messages)}
        {this.renderDeleteConfirmModal()}
        <DemoUpdateModal />
        <DemoCreateModal
          parentId={this.props.demo.id}
          visitId={0}
          recoId={0}
          dealerId={this.props.demo.dealerId}
          onClose={this.onCloseCreateModal}
        />
        <Divider />
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              {<DemoViewTable messages={messages} demo={demo} />}
            </Grid.Column>

            <Grid.Column width={8}>
              {
                <ChildRecosTable
                  messages={messages}
                  items={this.props.childRecos || []}
                />
              }
              {
                <ChildDemosTable
                  messages={messages}
                  items={demo.childDemos || []}
                />
              }
            </Grid.Column>
          </Grid.Row>

          <Grid.Column width={8}>
            <h3>{messages['Crm.VersionForPrint']}</h3>
            <DemoPrintPage
              messages={messages}
              demo={demo}
              recommender={this.props.recommender}
              ref={el => (this.componentRef = el)}
            />
          </Grid.Column>
          <Grid.Column width={8} />
        </Grid>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    dealers: state.crmDemo.dealers,
    loader: state.loader,
    demo: state.crmDemo.demo,
    recommender: state.crmDemo.recommender,
    childRecos: state.crmDemo.childRecos,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchDemo,
    toggleDemoUpdateModal,
    toggleDemoCreateModal,
    deleteDemo,
    clearState,
    fetchDemoChildRecos,
  },
)(injectIntl(DemoViewPage));

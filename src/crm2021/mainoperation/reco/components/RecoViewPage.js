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
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import RecoUpdateModal from './RecoUpdateModal';
import {
  fetchSingleReco,
  toggleRecoUpdateModal,
  fetchCallResults,
  deleteReco,
  fetchCallDetails,
  fetchDemoDetails,
} from '../actions/recoAction';
import { blankForCreate, modalToggle } from '../../visit/actions/visitAction';
import { fetchReasons } from '../../demo/actions/demoAction';
import { connect } from 'react-redux';
import ChildDemosTable from '../../demo/components/ChildDemosTable';
import ChildCallsTable from '../../call/components/ChildCallsTable';
import ChildVisitsTable from '../../visit/components/ChildVisitsTable';
import RecoViewTable from './RecoViewTable';
import VisitCreateModal from '../../visit/components/VisitCreateModal';
import { injectIntl } from 'react-intl';
import { fetchDemoPrices } from '../../../../reference/mainoperation/actions/referenceAction';

class RecoViewPage extends Component {
  constructor(props) {
    super(props);
    this.loadedSuccess = true;
    this.state = {
      calls: [],
      demos: [],
      callResultOptions: [],
      callRefuseOptions: [],
      items: [],
      loading: false,
      updateModalOpened: false,
      showDeleteModal: false,
      showPhoneUpdateModal: false,
      demoPriceOptions: [],
    };

    this.renderActions = this.renderActions.bind(this);
    this.deleteModalTrigger = this.deleteModalTrigger.bind(this);
  }

  componentWillMount() {
    const id = parseInt(this.props.match.params.id, 10);
    this.props.fetchSingleReco(id);
    this.props.fetchCallResults();
    this.props.fetchReasons();
    this.props.fetchCallDetails(this.props.match.params.id);
    this.props.fetchDemoDetails(id);
  }

  componentDidMount() {
    this.props.fetchDemoPrices({ 'dto-type': 'options' }).then(({ data }) => {
      this.setState({
        ...this.state,
        demoPriceOptions: data,
      });
    });
  }

  deleteModalTrigger(showDeleteModal) {
    this.setState({
      ...this.state,
      showDeleteModal: showDeleteModal,
    });
  }

  prepareForVisitCreate = () => {
    let client = Object.assign({}, this.props.reco.client);
    this.props.blankForCreate(client.id, this.props.reco.responsibleId || 0);
    this.props.modalToggle(true);
  };

  renderDeleteConfirmModal() {
    const { messages } = this.props.intl;
    return (
      <Modal open={this.state.showDeleteModal}>
        <Modal.Header>{messages['Crm.DeleteWarningHeader']}!</Modal.Header>
        <Modal.Content>
          <p>{messages['Crm.Reco.DeleteWarningTxt1']}!</p>
          <p>{messages['Crm.Reco.DeleteWarningTxt2']}!</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => this.deleteModalTrigger(false)} negative>
            {messages['cancel']}
          </Button>
          <Button
            onClick={() => this.props.deleteReco(this.props.reco.id)}
            positive
            icon="checkmark"
            labelPosition="right"
            content={messages['Crm.ToDelete']}
          />
        </Modal.Actions>
      </Modal>
    );
  }

  renderActions(messages) {
    return (
      <div>
        <Link className={'ui icon button'} to={`/crm2021/reco/current`}>
          {messages['Crm.ToCurrentList']}
        </Link>

        <Link className={'ui icon button'} to={`/crm2021/reco/archive`}>
          {messages['Crm.ToArchiveList']}
        </Link>
        {/*<Button onClick={this.prepareForVisitCreate}>Добавить визит</Button>*/}

        <Button
          loading={this.props.activeLoader}
          disabled={this.props.activeLoader}
          onClick={() => this.props.toggleRecoUpdateModal(true)}
        >
          {messages['Crm.ToEdit']}
        </Button>
        <Button
          loading={this.props.activeLoader}
          disabled={this.props.activeLoader}
          color={'red'}
          onClick={() => this.deleteModalTrigger(true)}
        >
          {messages['Crm.ToDelete']}
        </Button>
      </div>
    );
  }

  render() {
    const { reco } = this.props;
    const { messages } = this.props.intl;
    const callDetails =
      this.props.callDetails != undefined ? this.props.callDetails : [];
    const demoDetails =
      this.props.demoDetails != undefined ? this.props.demoDetails : [];

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
            {messages['Crm.Recommendation']} № {this.props.reco.id}
          </Header>
        </Segment>
        {this.renderActions(messages)}
        <RecoUpdateModal id={parseInt(this.props.match.params.id, 10)} />
        <Divider />
        <VisitCreateModal />
        <Grid>
          <Grid.Row>
            <Grid.Column width={6}>
              <RecoViewTable
                demoPriceOptions={this.state.demoPriceOptions}
                reco={reco}
                messages={messages}
              />
            </Grid.Column>

            <Grid.Column width={10}>
              <ChildCallsTable messages={messages} items={callDetails || []} />
              <ChildDemosTable messages={messages} items={demoDetails || []} />
              {/* <ChildVisitsTable messages={messages} items={reco.visits || []} /> */}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {this.renderDeleteConfirmModal()}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    reco: state.crmReco2021.reco,
    loader: state.loader,
    callDetails: state.crmReco2021.callDetails,
    demoDetails: state.crmReco2021.demoDetails,
    activeLoader: state.loader.active,
  };
}

export default connect(mapStateToProps, {
  fetchSingleReco,
  toggleRecoUpdateModal,
  fetchCallResults,
  fetchReasons,
  deleteReco,
  blankForCreate,
  modalToggle,
  fetchDemoPrices,
  fetchCallDetails,
  fetchDemoDetails,
})(injectIntl(RecoViewPage));

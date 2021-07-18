import React, { useEffect, useState, useRef } from 'react';
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
  fetchDemoChildDemos,
  fetchDemoChildRecos,
} from '../actions/demoAction';
import { connect } from 'react-redux';
import ChildDemosTable from './ChildDemosTable';
import ChildRecosTable from '../../reco/components/ChildRecosTable';
import DemoViewTable from './DemoViewTable';
import DemoPrintPage from './DemoPrintPage';
import { injectIntl } from 'react-intl';

const DemoViewPage = props => {
  const {
    intl: { messages },
    demo,
  } = props;
  const componentRef = useRef();
  const [state, setState] = useState({
    callResultOptions: [],
    callRefuseOptions: [],
    items: [],
    createModalOpened: false,
    showDeleteModal: false,
    showPrintPage: false,
    pageRefresh: 0,
  });

  useEffect(() => {
    const id = parseInt(props.match.params.id, 10);
    props.fetchDemo(id);
    props.fetchDemoChildDemos(id);
    props.fetchDemoChildRecos(id);
  }, []);

  const getSourceLink = demo => {
    if (demo.visitId > 0) {
      return (
        <Link className="button" to={`/crm2021/visit/view/${demo.visitId}`}>
          Визит № {demo.visitId}
        </Link>
      );
    } else if (demo.recoId > 0) {
      return (
        <Link className="button" to={`/crm2021/reco/view/${demo.recoId}`}>
          Рекомендация № {demo.recoId}
        </Link>
      );
    } else if (demo.parentId > 0) {
      return (
        <Link className="button" to={`/crm2021/demo/view/${demo.recoId}`}>
          Демо № {demo.parentId}
        </Link>
      );
    }
  };

  const renderActions = messages => {
    const { demo } = props;
    const notDemoDone =
      demo.result === 'UNKNOWN' ||
      demo.result === 7 ||
      demo.result === 'MOVED' ||
      demo.result === 'CANCELLED' ||
      demo.result === 'OLD';
    return (
      <div>
        <Link className="ui icon button" to="/crm2021/demo/current">
          {messages['Crm.ToCurrentList']}
        </Link>

        <Link className="ui icon button" to="/crm2021/demo/archive">
          {messages['Crm.ToArchiveList']}
        </Link>
        <ReactToPrint
          trigger={() => <Button>{messages['Crm.ToPrint']}</Button>}
          //content={() => componentRef}
          content={() => componentRef.current}
        />
        <Button
          disabled={props.activeloader}
          loading={props.activeloader}
          onClick={openUpdateModal}
        >
          {messages['Crm.ToEdit']}
        </Button>
        {notDemoDone ? (
          ''
        ) : (
          <Link
            className="ui icon button"
            to={`/crm2021/reco/create/demo/${demo.id}`}
          >
            {messages['Crm.ToAddReco']}
          </Link>
        )}
        {notDemoDone ? (
          ''
        ) : (
          <Button onClick={openCreateModal}>{messages['Crm.ToAddDemo']}</Button>
        )}
        <Button color="red" onClick={() => deleteModalTrigger(true)}>
          {messages['Crm.ToDelete']}
        </Button>
      </div>
    );
  };

  const onBeforePrint = () => {
    setState({
      ...state,
      showPrintPage: true,
    });
  };

  const onAfterPrint = () => {
    setState({
      ...state,
      showPrintPage: false,
    });
  };

  const deleteModalTrigger = showDeleteModal => {
    setState({
      ...state,
      showDeleteModal,
    });
  };

  const renderDeleteConfirmModal = () => {
    const { messages } = props.intl;
    return (
      <Modal open={state.showDeleteModal}>
        <Modal.Header>{messages['Crm.DeleteWarningHeader']}!</Modal.Header>
        <Modal.Content>
          <p>{messages['Crm.Demo.DeleteWarningTxt1']}!</p>
          <p>{messages['Crm.Demo.DeleteWarningTxt2']}!</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => deleteModalTrigger(false)} negative>
            {messages.cancel}
          </Button>
          <Button
            onClick={() => props.deleteDemo(demo.id)}
            positive
            icon="checkmark"
            labelPosition="right"
            content={messages['Crm.ToDelete']}
          />
        </Modal.Actions>
      </Modal>
    );
  };

  const openUpdateModal = () => {
    props.toggleDemoUpdateModal(true);
  };

  const openCreateModal = () => {
    props.toggleDemoCreateModal(true);
  };

  const onCloseCreateModal = () => {
    setState({
      ...state,
      createModalOpened: false,
    });
  };
  const refreshPage = () => {
    const id = parseInt(props.match.params.id, 10);
    props.fetchDemo(id);
    props.fetchDemoChildDemos(id);
    props.fetchDemoChildRecos(id);
  };

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
          {messages['Crm.Democard']} № {demo.id}
        </Header>
      </Segment>
      {renderActions(messages)}
      {renderDeleteConfirmModal()}
      <DemoUpdateModal id={parseInt(props.match.params.id, 10)} />
      <DemoCreateModal
        parentId={demo.id}
        visitId={null}
        recoId={null}
        dealerId={demo.dealerId}
        onClose={onCloseCreateModal}
        refresh={refreshPage}
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
                items={props.childRecos || []}
              />
            }
            {
              <ChildDemosTable
                messages={messages}
                items={props.childDemos || []}
              />
            }
          </Grid.Column>
        </Grid.Row>

        <Grid.Column width={8}>
          <h3>{messages['Crm.VersionForPrint']}</h3>
          <DemoPrintPage
            messages={messages}
            demo={demo}
            recommender={props.recommender}
            ref={componentRef}
          />
        </Grid.Column>
        <Grid.Column width={8} />
      </Grid>
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    dealers: state.crmDemo2021.dealers,
    loader: state.loader,
    demo: state.crmDemo2021.demo,
    recommender: state.crmDemo2021.recommender,
    childRecos: state.crmDemo2021.childRecos,
    childDemos: state.crmDemo2021.childDemos,
    activeloader: state.loader.active,
  };
}

export default connect(mapStateToProps, {
  fetchDemo,
  toggleDemoUpdateModal,
  toggleDemoCreateModal,
  deleteDemo,
  clearState,
  fetchDemoChildDemos,
  fetchDemoChildRecos,
})(injectIntl(DemoViewPage));

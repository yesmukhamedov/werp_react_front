import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Header,
  Icon,
  Segment,
  Button,
  Container,
  Modal,
} from 'semantic-ui-react';
import {
  fetchAllRoles,
  getRoleAccesses,
  saveRoles,
  updRNomination,
  newRole,
} from '../transactionAction';
import ListRole from './listRole';
import AddRole from './addrole';
import { injectIntl } from 'react-intl';

class Roles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRole: false,
      showAdd: false,
      searchSt: {},
    };
  }

  componentWillMount() {
    this.props.fetchAllRoles();
  }

  handleOpen() {
    this.setState({ showRole: true });
  }
  handleClose() {
    this.setState({ showRole: false });
  }

  saveRoles(roles) {
    this.props.saveRoles(roles);
  }

  updRNomination(role) {
    this.props.updRNomination(role);
  }

  newRole(role) {
    this.props.newRole(role);
  }

  render() {
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
            {messages['lst_roles']}
          </Header>
          <Modal
            trigger={
              <Button
                floated="right"
                onClick={this.handleOpen.bind(this)}
                color="teal"
              >
                <Icon name="plus" />
                {messages['BTN__ADD']}
              </Button>
            }
            open={this.state.showRole}
            onClose={this.handleClose.bind(this)}
          >
            <Modal.Header>{'Новый роль'}</Modal.Header>
            <Modal.Content>
              <AddRole
                messages={messages}
                newRole={this.newRole.bind(this)}
                handleClose={this.handleClose.bind(this)}
              />
            </Modal.Content>
          </Modal>
        </Segment>

        <div style={{ paddingLeft: '4em', paddingRight: '4em' }}>
          <ListRole
            messages={messages}
            getRoleAccesses={this.props.getRoleAccesses}
            roles={this.props.allRole}
            listRoles={this.props.listRoles}
            accessTypes={this.props.accessTypes}
            saveRoles={this.saveRoles.bind(this)}
            updRNomination={this.updRNomination.bind(this)}
          />
        </div>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    listRoles: state.transactionReducer.listRoles,
    accessTypes: state.transactionReducer.accessTypes,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchAllRoles,
    getRoleAccesses,
    saveRoles,
    updRNomination,
    newRole,
  },
)(injectIntl(Roles));

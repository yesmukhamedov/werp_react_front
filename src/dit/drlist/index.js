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
  fetchDrlstAll,
  getDrlstAccesses,
  saveDrLst,
  updDrlstNomin,
  newDrole,
} from '../ditAction';
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
    this.props.fetchDrlstAll();
  }

  handleOpen() {
    this.setState({ showRole: true });
  }
  handleClose() {
    this.setState({ showRole: false });
  }

  saveDrLst(roles) {
    this.props.saveDrLst(roles);
  }

  updDrNomin(role) {
    this.props.updDrlstNomin(role);
  }

  newRole(role) {
    this.props.newDrole(role);
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
            getDrAccesses={this.props.getDrlstAccesses}
            roles={this.props.allRole}
            listRoles={this.props.listRoles}
            accessTypes={this.props.accessTypes}
            saveDrLst={this.saveDrLst.bind(this)}
            updDrNomin={this.updDrNomin.bind(this)}
          />
        </div>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    listRoles: state.ditReducer.listRoles,
    accessTypes: state.ditReducer.accessTypes,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchDrlstAll,
    getDrlstAccesses,
    saveDrLst,
    updDrlstNomin,
    newDrole,
  },
)(injectIntl(Roles));

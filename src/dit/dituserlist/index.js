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
import { f4FetchCompanyOptions } from '../../reference/f4/f4_action';
import {
  fetchSUserAll,
  saveNewSUser,
  updateSUserRow,
  searchStaffforSUser,
  getBrByBukrSysUser,
  showAddModal,
  showUpdateModal,
} from '../transactionAction';
import { injectIntl } from 'react-intl';
import List from './list';
import SearchSt from './searchSrtaff';
import AddUser from './addUser';

class SystemUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showStaff: false,
      searchSt: {
        firstname: '',
        lastname: '',
        middlename: '',
      },
      selStaff: '',
      username: '',
      rids: '',
    };
  }

  componentWillMount() {
    this.props.fetchSUserAll();
  }

  handleOpen() {
    this.setState({ showStaff: true });
  }
  handleClose() {
    this.setState({ showStaff: false });
  }

  submitUpdate(row) {
    this.props.updateSUserRow(row);
  }

  submitSearch() {
    this.props.searchStaffforSUser(this.state.searchSt);
  }

  selectedStaff(staff) {
    let usname =
      staff.firstname.toLowerCase() +
      '.' +
      staff.lastname.toLowerCase().substring(0, 2);
    this.setState({
      ...this.state,
      selStaff: staff,
      showStaff: false,
      username: usname,
    });
    this.props.showAddModal(true);
  }

  close = () => this.props.showAddModal(false);
  openShowModal = () => this.props.showModal(true);

  handleChange(fieldName, o) {
    let searchSt = Object.assign({}, this.state.searchSt);
    if (o) {
      searchSt[fieldName] = o.value;
    } else {
      searchSt[fieldName] = null;
    }
    this.setState({
      ...this.state,
      searchSt: searchSt,
    });
  }

  newUser(sysUser) {
    this.props.saveNewSUser(sysUser);
  }

  render() {
    const { messages } = this.props.intl;
    const { staffs } = this.props;
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
            {messages['sys_users']}
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
            open={this.state.showStaff}
            onClose={this.handleClose.bind(this)}
          >
            <Modal.Header>{messages['addNewTr']}</Modal.Header>
            <Modal.Content>
              <SearchSt
                size={'medium'}
                handleChange={this.handleChange.bind(this)}
                submitSearch={this.submitSearch.bind(this)}
                handleClose={this.handleClose.bind(this)}
                messages={messages}
                staffs={staffs}
                selectedStaff={this.selectedStaff.bind(this)}
                searchSt={this.state.searchSt}
              />
            </Modal.Content>
          </Modal>
        </Segment>

        <div style={{ paddingLeft: '4em', paddingRight: '4em' }}>
          <List
            messages={messages}
            users={this.getUsers()}
            roles={this.getRoles()}
            updTransaction={this.updTransaction}
            submitUpdate={this.submitUpdate.bind(this)}
            companyOpts={this.getCompanyOptions()}
            branchOptions={this.getBranchOptions()}
            getBrByBukrSysUser={this.props.getBrByBukrSysUser}
            showUpdateModal={this.props.showUpdateModal}
            close={this.close.bind(this)}
            updateModalOpened={this.props.updateModalOpened}
          />

          <AddUser
            selStaff={this.state.selStaff}
            roles={this.getRoles()}
            close={this.close.bind(this)}
            showAdd={this.props.addModalOpened}
            companyOpts={this.getCompanyOptions()}
            branchOptions={this.getBranchOptions()}
            messages={messages}
            username={this.state.username}
            newUser={this.newUser.bind(this)}
            getBrByBukrSysUser={this.props.getBrByBukrSysUser}
          />
        </div>
      </Container>
    );
  }
  getUsers() {
    if (!this.props.lSUsers.users) {
      return [];
    }
    const { users } = this.props.lSUsers;
    return users;
  }
  getRoles() {
    if (!this.props.lSUsers.roles) {
      return [];
    }
    const { roles } = this.props.lSUsers;
    let out = roles.map(c => {
      return {
        key: parseInt(c.role_id, 10),
        text: `${c.text45}`,
        value: parseInt(c.role_id, 10),
      };
    });
    return out;
  }
  getCompanyOptions() {
    if (!this.props.companyOptions) {
      return [];
    }
    const { companyOptions } = this.props;
    let out = companyOptions.map(c => {
      return {
        key: parseInt(c.key, 10),
        text: `${c.text}`,
        value: parseInt(c.value, 10),
      };
    });
    return out;
  }
  getBranchOptions() {
    const { branchOptions } = this.props;
    if (!branchOptions) {
      return [];
    }
    let out = branchOptions.map(c => {
      return {
        key: parseInt(c.branch_id, 10),
        text: `${c.text45}`,
        value: parseInt(c.branch_id, 10),
      };
    });
    return out;
  }
}

function mapStateToProps(state) {
  return {
    lSUsers: state.transactionReducer.lSUsers,
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.transactionReducer.bukrsBranches,
    staffs: state.transactionReducer.staffs,
    addModalOpened: state.transactionReducer.addModalOpened,
    updateModalOpened: state.transactionReducer.updateModalOpened,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchSUserAll,
    f4FetchCompanyOptions,
    updateSUserRow,
    searchStaffforSUser,
    saveNewSUser,
    getBrByBukrSysUser,
    showAddModal,
    showUpdateModal,
  },
)(injectIntl(SystemUsers));

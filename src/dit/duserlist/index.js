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
  f4FetchCompanyOptions,
  f4FetchBranchesByBukrs,
} from '../../reference/f4/f4_action';
import {
  fetchAll,
  saveNewUser,
  updateRow,
  searchStaff,
} from './systemUserAction';
import { injectIntl } from 'react-intl';
import List from './list';
import SearchSt from './searchSrtaff';
import AddUser from './addUser';

class SystemUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showStaff: false,
      showAdd: false,
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
    this.props.fetchAll();
  }

  handleOpen() {
    this.setState({ showStaff: true });
  }
  handleClose() {
    this.setState({ showStaff: false });
  }

  submitUpdate(row) {
    this.props.updateRow(row);
  }

  submitSearch() {
    this.props.searchStaff(this.state.searchSt);
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
      showAdd: true,
      username: usname,
    });
  }

  close = () =>
    this.setState({
      ...this.state,
      showNewUser: false,
      showAdd: false,
    });

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
    this.props.saveNewUser(sysUser);
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
            f4FetchBranchesByBukrs={this.props.f4FetchBranchesByBukrs}
          />

          <AddUser
            selStaff={this.state.selStaff}
            roles={this.getRoles()}
            close={this.close.bind(this)}
            companyOpts={this.getCompanyOptions()}
            branchOptions={this.getBranchOptions()}
            showAdd={this.state.showAdd}
            messages={messages}
            username={this.state.username}
            newUser={this.newUser.bind(this)}
            f4FetchBranchesByBukrs={this.props.f4FetchBranchesByBukrs}
          />
        </div>
      </Container>
    );
  }
  getUsers() {
    if (!this.props.listAll.users) {
      return [];
    }
    const { users } = this.props.listAll;
    return users;
  }
  getRoles() {
    if (!this.props.listAll.roles) {
      return [];
    }
    const { roles } = this.props.listAll;
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
    let out = [];
    const { branchOptions } = this.props;
    if (!branchOptions) {
      return [];
    }
    for (let k in branchOptions) {
      out.push({
        key: branchOptions[k]['branch_id'],
        text: branchOptions[k]['text45'],
        value: branchOptions[k]['branch_id'],
      });
    }
    return out;
  }
}

function mapStateToProps(state) {
  return {
    listAll: state.sysUsrReducer.listAll,
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.f4.bukrsBranches,
    staffs: state.sysUsrReducer.staffs,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchAll,
    f4FetchCompanyOptions,
    f4FetchBranchesByBukrs,
    updateRow,
    searchStaff,
    saveNewUser,
  },
)(injectIntl(SystemUsers));

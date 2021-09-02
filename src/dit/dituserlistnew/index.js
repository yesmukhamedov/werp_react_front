import React, { useState, useEffect } from 'react';
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
  f4FetchCountryList,
} from '../../reference/f4/f4_action';
import {
  fetchDSUserAll,
  saveNewDSUser,
  updateDSUserRow,
  searchStafforDSUser,
  getBrByBukrDSysUser,
  showAddModal,
  showUpdateModal,
} from '../ditAction';
import { injectIntl } from 'react-intl';
import TableUsers from './components/TableUsers';
import SearchStaff from './components/SearchStaff';
import AddUser from './components/AddUser';
import UpdateRowModal from './components/UpdateRowModal';

const DitUserListNew = props => {
  const {
    intl: { messages },
    staffs,
    countryList = [],
    allUsers = [],
    allRoles = [],
    branchOptionsAll,
  } = props;

  const [state, setState] = useState({
    showStaff: false,
    searchSt: {
      firstname: '',
      lastname: '',
      middlename: '',
    },
    selStaff: '',
    username: '',
    rids: '',
  });

  const [stateRowUpdate, setStateRowUpdate] = useState({
    modalOpen: false,
    tempData: {},
  });

  const updateRow = data => {
    console.log('click updateRow', data);
    setStateRowUpdate({ ...stateRowUpdate, modalOpen: true, tempData: data });
  };

  const countryCodeOptions = countryList.map(item => {
    return {
      key: item.countryId,
      text: item.code,
      value: item.code,
    };
  });

  useEffect(() => {
    props.fetchDSUserAll();
  }, []);

  const handleOpen = () => {
    setState({ ...state, showStaff: true });
  };
  const handleClose = () => {
    setState({ ...state, showStaff: false });
  };

  const close = () => props.showAddModal(false);

  const handleChange = (fieldName, o) => {
    let searchSt = Object.assign({}, state.searchSt);
    if (o) {
      searchSt[fieldName] = o.value;
    } else {
      searchSt[fieldName] = null;
    }
    setState({
      ...state,
      searchSt: searchSt,
    });
  };

  const submitSearch = () => {
    props.searchStafforDSUser(state.searchSt);
  };

  const selectedStaff = staff => {
    let usname =
      staff.firstname.toLowerCase() +
      '.' +
      staff.lastname.toLowerCase().substring(0, 2);
    setState({
      ...state,
      selStaff: staff,
      showStaff: false,
      username: usname,
    });
    props.showAddModal(true);
  };

  const roleOptions = allRoles.map(item => {
    return {
      key: parseInt(item.role_id, 10),
      text: `${item.text45}`,
      value: parseInt(item.role_id, 10),
    };
  });

  const changeModalUpdate = (fieldName, value) => {
    switch (fieldName) {
      case 'bukrs':
        setStateRowUpdate({
          ...stateRowUpdate,
          tempData: { ...stateRowUpdate.tempData, bukrs: value },
        });
        break;
      case 'password':
        setStateRowUpdate({
          ...stateRowUpdate,
          tempData: { ...stateRowUpdate.tempData, password: value },
        });
        break;

      case 'active':
        setStateRowUpdate({
          ...stateRowUpdate,
          tempData: { ...stateRowUpdate.tempData, active: value.checked },
        });
        break;

      case 'is_root':
        if (value.checked === true) {
          setStateRowUpdate({
            ...stateRowUpdate,
            tempData: {
              ...stateRowUpdate.tempData,
              is_root: 1,
              rootChecked: true,
            },
          });
        } else {
          setStateRowUpdate({
            ...stateRowUpdate,
            tempData: {
              ...stateRowUpdate.tempData,
              is_root: 0,
              rootChecked: false,
            },
          });
        }
        break;
      case 'branchId':
        setStateRowUpdate({
          ...stateRowUpdate,
          tempData: {
            ...stateRowUpdate.tempData,
            branchId: value,
            branchName: '',
          },
        });

        break;
    }
  };

  const submitUpdate = () => {
    console.log('SUBMIT UPDATE');
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
          {messages['sys_users']}
        </Header>
        <Modal
          trigger={
            <Button floated="right" onClick={handleOpen} color="teal">
              <Icon name="plus" />
              {messages['BTN__ADD']}
            </Button>
          }
          open={state.showStaff}
          onClose={handleClose}
        >
          <Modal.Header>{messages['addNewTr']}</Modal.Header>
          <Modal.Content>
            <SearchStaff
              size={'medium'}
              handleChange={handleChange}
              submitSearch={submitSearch}
              handleClose={handleClose}
              messages={messages}
              staffs={staffs}
              selectedStaff={selectedStaff}
              searchSt={state.searchSt}
            />
          </Modal.Content>
        </Modal>
      </Segment>

      <UpdateRowModal
        messages={messages}
        open={stateRowUpdate.modalOpen}
        onClose={() =>
          setStateRowUpdate({ ...stateRowUpdate, modalOpen: false })
        }
        changeModalUpdate={changeModalUpdate}
        data={stateRowUpdate.tempData}
        companyOptions={props.companyOptions}
        branchOptions={
          stateRowUpdate.tempData.bukrs
            ? props.branchOptionsAll[stateRowUpdate.tempData.bukrs]
            : []
        }
        roleOptions={roleOptions}
        submitUpdate={submitUpdate}
      />

      {/* <List
          messages={messages}
          users={this.getUsers()}
          roles={this.getRoles()}
          updTransaction={this.updTransaction}
          submitUpdate={this.submitUpdate.bind(this)}
          companyOpts={this.getCompanyOptions()}
          branchOptions={this.getBranchOptions()}
          getBrByBukrSysUser={this.props.getBrByBukrDSysUser}
          showUpdateModal={this.props.showUpdateModal}
          close={this.close.bind(this)}
          updateModalOpened={this.props.updateModalOpened}
        /> */}

      {/* <AddUser
          messages={messages}
          selStaff={state.selStaff}
          //roles={getRoles()}
          close={close}
          showAdd={props.addModalOpened}
          //companyOpts={this.getCompanyOptions()}
          //branchOptions={this.getBranchOptions()}

          username={state.username}
          newUser={() => saveNewDSUser}
          getBrByBukrSysUser={props.getBrByBukrDSysUser}
          countryCodeOptions={countryCodeOptions}
          countryList={props.countryList}
        /> */}

      <TableUsers
        messages={messages}
        allUsers={allUsers}
        updateRow={updateRow}
      />
    </Container>
  );
};
function mapStateToProps(state) {
  return {
    allUsers: state.ditReducer.allUsers,
    allRoles: state.ditReducer.allRoles,
    companyOptions: state.userInfo.companyOptions,
    branchOptionsAll: state.userInfo.branchOptionsAll,
    staffs: state.ditReducer.staffs,
    addModalOpened: state.ditReducer.addModalOpened,
    updateModalOpened: state.ditReducer.updateModalOpened,
    countryList: state.f4.countryList,
  };
}

export default connect(mapStateToProps, {
  fetchDSUserAll,
  f4FetchCompanyOptions,
  f4FetchCountryList,
  updateDSUserRow,
  searchStafforDSUser,
  saveNewDSUser,
  getBrByBukrDSysUser,
  showAddModal,
  showUpdateModal,
})(injectIntl(DitUserListNew));

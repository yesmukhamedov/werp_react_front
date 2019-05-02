import React, { Component } from 'react';
import { Button, Modal, Icon, Header, Input, Form } from 'semantic-ui-react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import matchSorter from 'match-sorter';
import Update from './update';

class ListRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      row: '',
      roleNameShow: false,
      roleName: '',
      accessTypes: [],
    };
    this.handleClose = this.handleClose.bind(this);
    this.openInNewTab = this.openInNewTab.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let accessTypes = Object.assign([], this.state.accessTypes);
    if (this.props.accessTypes !== nextProps.accessTypes) {
      accessTypes = nextProps.accessTypes;
      this.setState({
        ...this.state,
        accessTypes: accessTypes,
      });
    }
  }

  handleCheckBox(fieldName, o) {
    const accessTypes = Object.assign([], this.state.accessTypes);
    const row = Object.assign({}, this.state.row);
    switch (fieldName) {
      case 'read':
        accessTypes.some(c => {
          if (c.transaction_id === o.transaction_id) {
            c.acces == 'read' ? (c.acces = '') : (c.acces = 'read');
            c.role_id = row.role_id;
            return true;
          } else {
            return false;
          }
        });
        break;
      case 'write':
        accessTypes.some(c => {
          if (c.transaction_id === o.transaction_id) {
            c.acces == 'write' ? (c.acces = '') : (c.acces = 'write');
            c.role_id = row.role_id;
            return true;
          } else {
            return false;
          }
        });
        break;
      case 'all':
        accessTypes.some(c => {
          if (c.transaction_id === o.transaction_id) {
            c.acces == 'all' ? (c.acces = '') : (c.acces = 'all');
            c.role_id = row.role_id;
            return true;
          } else {
            return false;
          }
        });
        break;
      default:
    }

    this.setState({
      ...this.state,
      accessTypes,
    });
  }

  saveRoles() {
    this.props.saveRoles(this.state.accessTypes);
    this.setState({ modalOpen: false });
  }

  handleClose() {
    this.setState({ modalOpen: false });
  }

  updateRow(role) {
    this.props.getRoleAccesses(role.role_id);
    this.setState({ modalOpen: true, row: role });
  }

  openInNewTab = url => {
    let win = window.open(url, '_blank');
    win.focus();
  };

  render() {
    const { listAll, messages } = this.props;
    const columns = [
      {
        Header: 'ID',
        id: 'role_id',
        accessor: d => d.role_id,
        Cell: props => {
          return (
            <Button
              style={{ backgroundColor: 'white', color: 'black' }}
              onClick={this.updateRow.bind(this, props.original)}
            >
              {props.value}
            </Button>
          );
        },
        width: 100,
        maxWidth: 200,
        minWidth: 100,
      },
      {
        Header: messages['role'],
        accessor: 'text45',
        Cell: props => {
          return (
            <Button
              style={{ backgroundColor: 'white', color: 'black' }}
              onClick={this.updateRow.bind(this, props.original)}
            >
              {props.value}
            </Button>
          );
        },
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['text45'] }),
        filterAll: true,
      },
      {
        Cell: props => (
          <Button
            floated="left"
            onClick={this.changeRoleName.bind(this, props.original)}
          >
            <Icon name="pencil" />
          </Button>
        ),
        width: 100,
        maxWidth: 150,
        minWidth: 100,
        sortable: false,
        filterable: false,
      },
      {
        Cell: props => (
          <Button
            icon="external"
            floated="left"
            onClick={this.updateRow.bind(this, props.original)}
          />
        ),
        width: 100,
        maxWidth: 150,
        minWidth: 100,
        sortable: false,
        filterable: false,
      },
    ];
    return (
      <div>
        <ReactTable
          columns={columns}
          data={listAll.roles}
          resolveData={data => data.map(row => row)}
          filterable
          rowsText={messages['rowsText']}
          pageText={messages['pageText']}
          ofText={messages['ofText']}
          previousText={messages['previousText']}
          nextText={messages['nextText']}
          noDataText={messages['loadingText']}
        />
        {
          <Modal
            size="fullscreen"
            open={this.state.modalOpen}
            onClose={this.handleClose.bind(this)}
          >
            <Modal.Header>
              {'Права'} "{this.state.row.text45}"{' '}
            </Modal.Header>
            <Modal.Content>
              <Update
                messages={messages}
                accessTypes={this.state.accessTypes}
                handleCheckBox={this.handleCheckBox.bind(this)}
              />
            </Modal.Content>
            <Modal.Actions>
              <Button negative onClick={this.handleClose.bind(this)}>
                {messages['BTN__CANCEL']}{' '}
              </Button>
              <Button
                icon="checkmark"
                content={messages['save']}
                onClick={this.saveRoles.bind(this)}
                color="teal"
              />
            </Modal.Actions>
          </Modal>
        }
        {this.renderName()}
      </div>
    );
  }

  renderName() {
    const { messages } = this.props;
    return (
      <Modal open={this.state.roleNameShow} size={'small'}>
        <Header>{'Измененить наименование роля'} !</Header>
        <Modal.Content>
          <Form>
            <Form.Field
              required
              onChange={(e, o) => this.handleChange('text45', o)}
              defaultValue={this.state.roleName.text45}
              control={Input}
              label={messages['L__TITLE']}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.resetroleNameShow.bind(this)}>
            {messages['BTN__NO']}
          </Button>
          <Button color="red" onClick={this.updRNomination.bind(this)}>
            {messages['BTN__YES']}
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

  handleChange(fieldName, o) {
    let roleName = Object.assign({}, this.state.roleName);
    if (o) {
      roleName[fieldName] = o.value;
    } else {
      roleName[fieldName] = null;
    }

    this.setState({
      ...this.state,
      roleName: roleName,
    });
  }

  updRNomination() {
    this.props.updRNomination(this.state.roleName);
    this.setState({
      ...this.state,
      roleNameShow: false,
    });
  }

  resetroleNameShow(role) {
    this.setState({ roleNameShow: false });
  }

  changeRoleName(role) {
    this.setState({ roleNameShow: true, roleName: role });
  }
}

export default ListRole;

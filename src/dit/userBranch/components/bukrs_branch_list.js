import React, { Component } from 'react'
import { connect } from 'react-redux'
import { markBranch, editUserBranches, fethcUserBranchCustomers } from '../actions/userBranch_action'
import { Table } from 'semantic-ui-react'
import { Button, Icon, Label } from 'semantic-ui-react'
// const arrayList= ;
class BukrsBranchList extends Component {
  handleChangeCheckbox (event, idx) {
    this.props.markBranch(idx)
  }
  onRowSelect (a_ubObject) {
    this.props.fethcUserBranchCustomers(a_ubObject.userBranchId)
    this.props.onUserBranchSelect(a_ubObject)
  }
  renderEditCustomer (a_ubObject) {
    if (a_ubObject.userBranchId) {
      return (
        <Icon name='clone' size='large' className='clickableIcon' onClick={() => this.onRowSelect(a_ubObject)} />
      )
    }
  }
  renderBukrsBranchList () {
    if (this.props.userBranchList) {
      return this.props.userBranchList.map((ub, idx) => {
        return (
          <Table.Row key={ub.branchId}>
            <Table.Cell>{ub.bukrsName}</Table.Cell>
            <Table.Cell>{ub.branchName}</Table.Cell>
            <Table.Cell><input type='checkbox' checked={ub.flagExists} name={idx} className='checkBox' onChange={(event) => this.handleChangeCheckbox(event, idx)} /></Table.Cell>
            <Table.Cell>{this.renderEditCustomer(ub)}</Table.Cell>
          </Table.Row>
        )
      })
    }
  }

  renderSelectedUserLabel () {
    if (this.props.selectdeUser) {
      return (
        <div>
          <br />
          <Label as='a' color='teal' image>
            {this.props.selectdeUser.fio}
          </Label>
        </div>
      )
    }
  }
  //
  render () {
    return (
      <div id='bukrsBranchDiv'>
        <div>
          <Button icon labelPosition='left' primary size='small' onClick={() => this.props.editUserBranches(this.props.selectdeUser.userId, this.props.userBranchList)} >
            <Icon name='save' size='large' />Сохранить
          </Button>
        </div>
        {this.renderSelectedUserLabel(this.bind)}

        <Table striped compact collapsing id='bukrsBranchTable'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Компания</Table.HeaderCell>
              <Table.HeaderCell>Филиал</Table.HeaderCell>
              <Table.HeaderCell />
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>{this.renderBukrsBranchList()}
          </Table.Body>
        </Table>
      </div>

    )
  }
};

function mapStateToProps (state) {
  return { userBranchList: state.ditUserBranch.userBranchList}
}
export default connect(mapStateToProps, { markBranch, editUserBranches, fethcUserBranchCustomers })(BukrsBranchList)

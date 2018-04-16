import React, {Component} from 'react'
import {Modal, Form, Input, Button } from 'semantic-ui-react'
import {toggleFormModal} from '../actions/hrPyramidAction'
import { connect } from 'react-redux'
import PositionF4 from '../../../../reference/f4/position/PositionF4'
import BranchF4 from '../../../../reference/f4/branch/BranchF4'
import StaffListModal from '../../staff/components/StaffListModal'

class PyramidFormModal extends Component {
  constructor (props) {
    super(props)

    this.state = {
        localItem:{},
        staffListModalOpened: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.renderForm = this.renderForm.bind(this)
    this.saveData = this.saveData.bind(this)
      this.onStaffSelect = this.onStaffSelect.bind(this)
      this.removeStaff = this.removeStaff.bind(this)
  }

  componentWillMount () {

  }

  handleDate (p1, p2, p3) {
    console.log(p1, p2, p3)
  }

  positionOptions = () => {
      if(!this.props.positionList){
          return []
      }

      let out = []
      for(let k in this.props.positionList){
          out.push({
              key: this.props.positionList[k]['position_id'],
              value: this.props.positionList[k]['position_id'],
              text: this.props.positionList[k]['text']
          })
      }

      return out
  }

  renderForm () {
      const {localItem} = this.state
    return <Form>
      <Form.Group widths='equal'>
          <div className="field">
              <label>Сотрудник</label>
              <div className="ui action left icon input">
                  <Button onClick={() => this.setState({...this.state,staffListModalOpened:true})} icon={'user'}/>
                  <input readOnly placeholder="Сотрудник..." type="text" value={localItem.staffName || ''} />
                  <Button onClick={() => this.removeStaff()} icon={'trash'}/>
              </div>
          </div>

          <Form.Select
              value={localItem.positionId}
              name='position'
              search={true}
              selection
              label='Должность'
              selectOnBlur={false}
              options={this.positionOptions()}
              placeholder='Должность'
              onChange={this.handleChange} />
      </Form.Group>

        <Form.Group widths='equal'>
            <Form.Field value={localItem.bukrsName || ''}
                        control={Input} readOnly required label='Компания' placeholder='Компания' />

            <BranchF4 search={true} handleChange={this.handleChange} bukrs={localItem.bukrs} />
        </Form.Group>
    </Form>
  }

  handleChange (e, o) {
      console.log(e,o)
      let localItem = Object.assign({}, this.state.localItem);

  }

  componentWillReceiveProps (nextProps) {
      if(nextProps.item.id !== this.state.localItem.id){
          let localItem = Object.assign({}, nextProps.item);
          this.setState({
              ...this.state,
              localItem: localItem
          })
      }
  }

  saveData () {

  }

    onStaffSelect(staff){
        let localItem = Object.assign({}, this.state.localItem);
        localItem['staffId'] = staff.staffId
        localItem['staffName'] = staff.lastname + ' ' + staff.firstname
        if(staff.positions && staff.positions.length > 0){
            localItem['positionId'] = staff.positions[0]['positionId']
            localItem['branchId'] = staff.positions[0]['branchId']
        }
        this.setState({
            ...this.state,
            localItem: localItem,
            staffListModalOpened: false
        })
    }

    removeStaff(){
        let localItem = Object.assign({}, this.state.localItem);
        localItem['staffId'] = null
        localItem['staffName'] = null

        this.setState({
            ...this.state,
            localItem: localItem
        })
    }

  render () {
    return (
        <div>

              <Modal size={'small'} open={this.props.formModalOpened}>
                <Modal.Header>Добавление сотрудника в иерархию</Modal.Header>
                <Modal.Content>
                  {this.renderForm()}
                </Modal.Content>
                <Modal.Actions>
                  <Button negative onClick={() => this.props.toggleFormModal(false)}>Отмена</Button>
                  <Button positive icon='checkmark' onClick={() => this.props.updateReco(this.state.localReco)} labelPosition='right' content='Сохранить' />
                </Modal.Actions>
              </Modal>

            <StaffListModal staffs={this.props.allStaffs} onSelect={this.onStaffSelect} opened={this.state.staffListModalOpened} />
        </div>
    )
  }
}

function mapStateToProps (state) {
    return {
        formModalOpened:state.hrPyramid.formModalOpened,
        positionList:state.f4.positionList,
        item:state.hrPyramid.item,
        allStaffs:state.hrStaff.allStaffs
    }
}

export default connect(mapStateToProps, {toggleFormModal})(PyramidFormModal)
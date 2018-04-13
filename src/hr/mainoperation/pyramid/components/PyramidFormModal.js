import React, {Component} from 'react'
import {Modal, Form, Input, TextArea, Button } from 'semantic-ui-react'
import {toggleFormModal} from '../actions/hrPyramidAction'
import { connect } from 'react-redux'
import PositionF4 from '../../../../reference/f4/position/PositionF4'


class PyramidFormModal extends Component {
  constructor (props) {
    super(props)

    this.state = {
        localItem:{}
    }

    this.handleChange = this.handleChange.bind(this)
    this.renderForm = this.renderForm.bind(this)
    this.saveData = this.saveData.bind(this)
  }

  componentWillMount () {

  }

  handleDate (p1, p2, p3) {
    console.log(p1, p2, p3)
  }

  renderForm () {
    return <Form>
      <Form.Group widths='equal'>
        <Form.Field onChange={(e, o) => this.handleChange('clientName', o)}
          value={this.state.localItem.clientName}
          control={Input} required label='ФИО клиента' placeholder='ФИО клиента' />

          <PositionF4 handleChange={this.handleChange} search={true}/>

      </Form.Group>
    </Form>
  }

  handleChange (e, o) {
      console.log(e,o)
      let localItem = Object.assign({}, this.state.localItem);

  }

  componentWillReceiveProps (nextProps) {
      // if(nextProps.reco !== this.state.reco){
      //     let localReco = Object.assign({}, this.props.reco);
      //     this.setState({
      //         ...this.state,
      //         localReco: localReco
      //     })
      // }
  }

  saveData () {

  }

  render () {
    return (
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
    )
  }
}

function mapStateToProps (state) {
    return {
        formModalOpened:state.hrPyramid.formModalOpened,
        positionList:state.f4.positionList
    }
}

export default connect(mapStateToProps, {toggleFormModal})(PyramidFormModal)
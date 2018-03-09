import React, {Component} from 'react'
import {Modal, Form, Input, TextArea, Button} from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import axios from 'axios'
import {ROOT_URL} from '../../../../utils/constants'
import {toggleDemoCreateModal} from '../actions/demoAction'
import { connect } from 'react-redux'
import {DEMO_RESULT_CANCELLED,DEMO_RESULT_DONE,DEMO_RESULT_MOVED,getReasonsByResultId,LOCATION_OPTIONS} from '../../../crmUtil'



class DemoCreateModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      demo: {
        parentId: props.parentId,
        recoId: props.recoId,
        visitId: props.visitId,
        callId: 0,
        clientName: '',
        contractNumber: 0,
        dateTime: null,
        dealerId: props.dealerId,
        locationId: 0,
        resultId: 0,
        reasonId: 0,
        saleDate: null
      },
      errors: {
        dealerId: false,
        resultId: false,
        reasonId: false,
        dateTime: false,
        clientName: false,
        address: false,
        locationId: false
      }
    }

    this.close = this.close.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.validateForm = this.validateForm.bind(this)
    this.renderUpdateForm = this.renderUpdateForm.bind(this)
    this.saveDemo = this.saveDemo.bind(this)
  }

  componentWillMount () {

  }

  renderReasonRow () {
    let resultId = this.state.demo.resultId
      if(resultId){
        resultId = parseInt(resultId,10)
      }
    if (resultId === DEMO_RESULT_CANCELLED || resultId === DEMO_RESULT_DONE || resultId === DEMO_RESULT_MOVED) {
      return <Form.Select error={this.state.errors.reasonId}
        value={this.state.demo.reasonId}
        required fluid selection
        label='Причина' options={getReasonsByResultId(resultId,this.props.reasons)}
        onChange={(e, v) => this.handleChange('reasonId', v)} />
    }

    return <Form.Field />
  }

  renderUpdateForm () {
    return <Form>
      <Form.Group widths='equal'>
        <Form.Field error={this.state.errors.clientName} onChange={(e, o) => this.handleChange('clientName', o)}
          value={this.state.demo.clientName}
          control={Input} required label='ФИО клиента' placeholder='ФИО клиента' />
        <Form.Field error={this.state.errors.dateTime} required>
          <label>Дата-время демонстрации</label>
          <DatePicker
            label=''
            placeholderText={'Дата-время демонстрации'}
            showMonthDropdown showYearDropdown showTimeSelect dropdownMode='select'
            dateFormat='DD.MM.YYYY HH:mm' selected={this.state.demo.dateTime ? moment(this.state.demo.dateTime) : null}
            onChange={(v) => this.handleChange('dateTime', v)} />
        </Form.Field>
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Select error={this.state.errors.resultId}
          value={this.state.demo.resultId}
          required fluid selection
          label='Результат' options={this.resultsOptions()}
          onChange={(e, v) => this.handleChange('resultId', v)} />
        {this.renderReasonRow()}
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Field error={this.state.errors.address}
          required control={TextArea}
          onChange={(e, o) => this.handleChange('address', o)}
          label='Адрес' placeholder='Адрес'
          value={this.state.demo.address}
        />
        <Form.Select error={this.state.errors.locationId}
          value={this.state.demo.locationId}
          required fluid selection
          label='Местоположение' options={LOCATION_OPTIONS}
          onChange={(e, v) => this.handleChange('locationId', v)} />
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Select error={this.state.errors.dealerId}
          value={this.state.demo.dealerId}
          required fluid selection
          label='Дилер' options={this.props.dealers}
          onChange={(e, v) => this.handleChange('dealerId', v)} />

        <Form.Field control={TextArea}
          onChange={(e, o) => this.handleChange('note', o)}
          label='Примечание для демо'
          placeholder='Примечание для демо'
          value={this.state.demo.note || ''}
        />
      </Form.Group>
    </Form>
  }

  handleChange (fieldName, o) {
      let demo = Object.assign({}, this.state.demo);

    switch (fieldName) {
      case 'dateTime':
        if (o) {
          demo[fieldName] = o.valueOf()
        } else {
          demo[fieldName] = null
        }

        break
      case 'locationId':
      case 'clientName':
      case 'address':
      case 'resultId':
      case 'reasonId':
      case 'dealerId':
      case 'note':
        demo[fieldName] = o.value
        if (fieldName === 'resultId') {
          demo['reasonId'] = 0
        }
        break
        default:{}
    }

    this.setState({
      ...this.state,
      demo: demo
    })
  }

  validateForm () {
    let {demo, errors} = this.state
      for(let k in errors){
          if (errors.hasOwnProperty(k)) {
              errors[k] = false
          }
      }

    if (demo.resultId === DEMO_RESULT_MOVED || demo.resultId === DEMO_RESULT_CANCELLED || demo.resultId === DEMO_RESULT_DONE) {
      if (demo.reasonId === 0) {
        errors['reasonId'] = true
      }
    }

    if (!demo.dealerId || demo.dealerId === 0) {
      errors['dealerId'] = true
    }

    if (!demo.clientName || demo.clientName.length === 0) {
      errors['clientName'] = true
    }

    if (!demo.dateTime || demo.dateTime.length === 0) {
      errors['dateTime'] = true
    }

    if (!demo.address || demo.address.length === 0) {
      errors['address'] = true
    }

    this.setState({
      ...this.state,
      errors: errors
    })
  }

  componentWillReceiveProps (props) {
    let {parentId, recoId, visitId, dealerId} = props
    let {demo} = this.state
    demo['parentId'] = parentId
    demo['visitId'] = visitId
    demo['recoId'] = recoId
    demo['dealerId'] = dealerId
    this.setState({
      ...this.state,
      demo: demo
    })
  }

  saveDemo () {
    this.validateForm()
    let isValid = true
      for(let k in this.state.errors){
          if (this.state.errors[k]) {
              isValid = false
              break
          }
      }

    if (!isValid) {
      return
    }
    axios.post(`${ROOT_URL}/api/crm/demo`, { ...this.state.demo }, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
      .then((response) => {
        this.close()
      }).catch((error) => {
        console.log(error)
      })
  }

  close () {
    this.props.toggleDemoCreateModal(false)
  }

    resultsOptions(){
        if(!this.props.demoResults){
            return []
        }
        let out = Object.keys(this.props.demoResults).map((k) => {
            return {
                key:k,
                text:this.props.demoResults[k],
                value:k
            }
        });

        return out;
    }

  render () {
    const {openDemoCreateModal} = this.props
    return (
      <Modal size={'small'} open={openDemoCreateModal}>
        <Modal.Header>Добавление демо от демо</Modal.Header>
        <Modal.Content>
          {this.renderUpdateForm()}
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={this.close}>Отмена</Button>
          <Button positive icon='checkmark' onClick={this.saveDemo} labelPosition='right' content='Сохранить' />
        </Modal.Actions>
      </Modal>
    )
  }
}

function mapStateToProps (state) {
    return {
        dealers:state.crmDemo.dealers,
        loader:state.loader,
        demoResults:state.crmDemo.demoResults,
        reasons:state.crmDemo.reasons,
        openDemoCreateModal:state.crmDemo.openDemoCreateModal
    }
}

export default connect(mapStateToProps, {toggleDemoCreateModal})(DemoCreateModal)

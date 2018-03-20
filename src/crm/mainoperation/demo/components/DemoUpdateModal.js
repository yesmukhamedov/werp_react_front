import React, {Component} from 'react'
import {Modal, Form, Input, TextArea, Button } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import moment from 'moment'
import {fetchGroupDealers,fetchDemoResults,fetchReasons,updateDemo,toggleDemoUpdateModal} from '../actions/demoAction'
import { connect } from 'react-redux'
import {DEMO_RESULT_CANCELLED,DEMO_RESULT_DONE,DEMO_RESULT_MOVED,getReasonsByResultId,LOCATION_OPTIONS,DEMO_RESULT_SOLD,demoResultOptions} from '../../../crmUtil'

class DemoUpdateModal extends Component {
  constructor (props) {
    super(props)

    this.state = {
        localDemo:{},
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
    this.props.fetchGroupDealers()
    this.props.fetchDemoResults()
    this.props.fetchReasons()
  }

  renderReasonRow () {
    let resultId = this.state.localDemo.resultId
    if(resultId){
        resultId = parseInt(resultId,10);
    }
    if (resultId === DEMO_RESULT_CANCELLED || resultId === DEMO_RESULT_DONE || resultId === DEMO_RESULT_MOVED) {
      return <Form.Select error={this.state.errors.reasonId}
       name="reasonId"
        value={this.state.localDemo.reasonId}
        required fluid selection
        label='Причина' options={getReasonsByResultId(resultId,this.props.reasons)}
        onChange={(e, v) => this.handleChange('reasonId', v)} />
    }

    return <Form.Field />
  }

  renderSaleDateRow(){
      let resultId = parseInt(this.state.localDemo.resultId,10);
      if (resultId === DEMO_RESULT_SOLD) {
          return <Form.Field error={this.state.errors.saleDate} required>
                  <label>Дата продажи</label>
                  <DatePicker
                      label=''
                      placeholderText={'Дата продажи'}
                      showMonthDropdown showYearDropdown dropdownMode='select'
                      dateFormat='DD.MM.YYYY' selected={this.state.localDemo.saleDate?moment(this.state.localDemo.saleDate):null}
                      onChange={(v) => this.handleChange('saleDate', v)} />
            </Form.Field>
      }

      return null
  }

  renderUpdateForm () {
      let {localDemo} = this.state
    return <Form>
      <Form.Group widths='equal'>
        <Form.Field error={this.state.errors.clientName} onChange={(e, o) => this.handleChange('clientName', o)}
          value={localDemo.clientName}
          control={Input} required label='ФИО клиента' placeholder='ФИО клиента' />
        <Form.Field error={this.state.errors.dateTime} required>
          <label>Дата-время демонстрации</label>
          <DatePicker
            label=''
            placeholderText={'Дата-время демонстрации'}
            showMonthDropdown showYearDropdown showTimeSelect dropdownMode='select'
            dateFormat='DD.MM.YYYY HH:mm' selected={moment(localDemo.dateTime)}
            onChange={(v) => this.handleChange('dateTime', v)} />
        </Form.Field>
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Select error={this.state.errors.resultId}
          value={localDemo.resultId}
          required fluid selection
          label='Результат' options={demoResultOptions(this.props.demoResults)}
          onChange={(e, v) => this.handleChange('resultId', v)} />
        {this.renderReasonRow()}
        {this.renderSaleDateRow()}
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Field error={this.state.errors.address}
          required control={TextArea}
          onChange={(e, o) => this.handleChange('address', o)}
          label='Адрес' placeholder='Адрес'
          value={localDemo.address}
        />
        <Form.Select error={this.state.errors.locationId}
          value={localDemo.locationId}
          required fluid selection
          label='Местоположение' options={LOCATION_OPTIONS}
          onChange={(e, v) => this.handleChange('locationId', v)} />
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Select error={this.state.errors.dealerId}
          value={localDemo.dealerId}
          required fluid selection
          label='Дилер' options={this.props.dealers}
          onChange={(e, v) => this.handleChange('dealerId', v)} />

        <Form.Field control={TextArea}
          onChange={(e, o) => this.handleChange('note', o)}
          label='Примечание для демо'
          placeholder='Примечание для демо'
          value={localDemo.note || ''}
        />
      </Form.Group>
    </Form>
  }

  getOptionTextValue(o){
      if(o.options){
          for(let k in o.options){
              if(o.options[k]['key'] === o.value){
                  return o.options[k]['text']
              }
          }
      }

      return ''
  }

  handleChange (fieldName, o) {
      let localDemo = Object.assign({}, this.state.localDemo);
        switch (fieldName){
            case 'dateTime':
            case 'saleDate':
                if(o){
                    localDemo[fieldName] = o.valueOf();
                }else{
                    localDemo[fieldName] = null;
                }
        break

            case 'reasonId':
                localDemo[fieldName] = o.value
                localDemo['reasonName'] = this.getOptionTextValue(o)
            break

            case 'resultId':
                localDemo[fieldName] = o.value
                localDemo['resultName'] = this.getOptionTextValue(o)
                localDemo['reasonName'] = ''
                localDemo['reasonId'] = 0
                break

            case 'dealerId':
                localDemo[fieldName] = o.value
                localDemo['dealerName'] = this.getOptionTextValue(o)
                break

      case 'locationId':
      case 'clientName':
      case 'address':
      case 'note':
          localDemo[fieldName] = o.value
        break

      default:{}
    }

    this.setState({
        ...this.state,
        localDemo: localDemo
    })
  }

  validateForm () {
    let {localDemo, errors} = this.state
      for(let k in errors){
          if (errors.hasOwnProperty(k)) {
              errors[k] = false
          }
      }
     let resId = parseInt(localDemo.resultId,10);
      let reasonId = parseInt(localDemo.reasonId,10);

    if (resId === DEMO_RESULT_MOVED || resId === DEMO_RESULT_CANCELLED || resId === DEMO_RESULT_DONE) {
      if (reasonId === 0) {
        errors['reasonId'] = true
      }
    }else if(resId === DEMO_RESULT_SOLD){
          if(!localDemo.saleDate || localDemo.saleDate.length === 0){
              errors['saleDate'] = true;
          }
    }

    if (!localDemo.clientName || localDemo.clientName.length === 0) {
      errors['clientName'] = true
    }

    if (!localDemo.dateTime || localDemo.dateTime.length === 0) {
      errors['dateTime'] = true
    }

    if (!localDemo.address || localDemo.address.length === 0) {
      errors['address'] = true
    }

    this.setState({
      ...this.state,
      errors: errors
    })
  }

  componentWillReceiveProps (props) {
      if(props.demo !== this.state.localDemo){
          let localDemo = Object.assign({}, this.props.demo);
          this.setState({
              ...this.state,
              localDemo: localDemo
          })
      }
  }

  saveDemo () {
    this.validateForm()
    let isValid = true
      for(let k in this.state.errors){
          if (this.state.errors[k]) {
              isValid = false
          }
      }

    if (!isValid) {
      return
    }

    this.props.updateDemo(this.state.localDemo)
  }

  close () {
    this.props.toggleDemoUpdateModal(false)
  }

  render () {
    const {openDemoUpdateModal, demo} = this.props
    demo['recos'] = []
    return (
      <Modal size={'small'} open={openDemoUpdateModal}>
        <Modal.Header>Редактирование демонстрации</Modal.Header>
        <Modal.Content>
          {this.renderUpdateForm()}
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => this.props.toggleDemoUpdateModal(false)}>Отмена</Button>
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
        demo:state.crmDemo.demo,
        openDemoUpdateModal:state.crmDemo.openDemoUpdateModal
    }
}

export default connect(mapStateToProps, {fetchGroupDealers,fetchDemoResults,fetchReasons,updateDemo,toggleDemoUpdateModal})(DemoUpdateModal)

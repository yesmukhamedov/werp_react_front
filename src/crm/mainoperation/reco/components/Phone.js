import React, {Component} from 'react'
import {Label, Icon, Modal, Tab, Table, Button, Form, Input, TextArea, Divider, Header } from 'semantic-ui-react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import {ROOT_URL} from '../../../../utils/constants'
import moment from 'moment'
import {LOCATION_OPTIONS,CALL_RESULT_DEMO,CALL_RESULT_REFUSE,CALL_RESULT_RECALL} from '../../../crmUtil'
import { connect } from 'react-redux'
import {fetchPhoneNumberHistory,fetchCallResults,fetchSingleReco} from '../actions/recoAction'
require('moment/locale/ru');

class Phone extends Component {
  constructor (props) {
    super(props)

    this.state = {
      callModalOpen: false,
      recommender: {},
      opened: false,
      buttonLoading: false,
      call: {},
      errors: {
        callResultId: false,
        callReasonId: false,
        callDate: false,
        callRecallDate: false,
        demoClientName: false,
        demoDate: false,
        demoAddress: false,
        demoLocationId: false
      }
    }
    this.handlePhoneClick = this.handlePhoneClick.bind(this)
    this.handleModalClose = this.handleModalClose.bind(this)
    // this.onCloseCallModal = this.onCloseCallModal.bind(this);
    this.renderNumberHistory = this.renderNumberHistory.bind(this)
    this.renderCallForm = this.renderCallForm.bind(this)
    this.saveCall = this.saveCall.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.renderRecommenderInfo = this.renderRecommenderInfo.bind(this)
  }

  componentWillMount(){
      //this.props.fetchCallResults()
  }

  handlePhoneClick () {
    this.setState({
      ...this.state,
      buttonLoading: true,
        opened:true
    })

      this.props.fetchPhoneNumberHistory(this.props.phoneId)

    axios.get(`${ROOT_URL}/api/crm/call/create/` + this.props.phoneId, {
      headers: {
        authorization: localStorage.getItem('token')}
    }).then((res) => {
      res.data.call['callDate'] = moment()
      this.setState({
        ...this.state,
        call: res.data.call,
        recommender: res.data.recommender
      })
    }).catch((e) => {
      console.log(e)
    })
  }

  handleModalClose () {
    this.setState({
      ...this.state,
      opened: false,
        buttonLoading: false
    })
  }

  renderCallModal () {
    const panes = [
      { menuItem: 'История номера', render: this.renderNumberHistory },
      { menuItem: 'Добавление звонка', render: this.renderCallForm},
      { menuItem: 'Данные рекомендателя', render: this.renderRecommenderInfo }
    ]
    return (
      <Modal size={'large'}
             open={this.state.opened} onClose={this.handleModalClose}>
        <Modal.Header>Звонок по номеру: {this.props.phoneNumber} / Клиент: {this.props.clientName}</Modal.Header>
        <Modal.Content>
          <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        </Modal.Content>
      </Modal>
    )
  }

  renderDemoForm () {
    let callResultId = parseInt(this.state.call.callResultId,10);
    if (!this.state.call.callResultId || callResultId !== CALL_RESULT_DEMO) {
      return null
    }
    return (
      <div>
        <Form.Group widths='equal'>
          <Form.Field error={this.state.errors.demoClientName} onChange={(e, o) => this.handleChange('demoClientName', o)}
            value={this.state.call.demoClientName || ''}
            control={Input} required label='ФИО клиента' placeholder='ФИО клиента' />
          <Form.Field error={this.state.errors.demoDate} required>
            <label>Дата-время демонстрации</label>
            <DatePicker
              autoComplete="off"
              locale="ru"
              label=''
              placeholderText={'Дата-время демонстрации'}
              showMonthDropdown showYearDropdown showTimeSelect dropdownMode='select'
              dateFormat='DD.MM.YYYY HH:mm' selected={this.state.call.demoDate}
              onChange={(v) => this.handleChange('demoDate', v)}/>
          </Form.Field>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Field error={this.state.errors.demoAddress} required control={TextArea} onChange={(e, o) => this.handleChange('demoAddress', o)} label='Адрес' placeholder='Адрес' />
          <Form.Select error={this.state.errors.demoLocationId} required fluid selection label='Местоположение' options={LOCATION_OPTIONS}
            onChange={(e, v) => this.handleChange('demoLocationId', v)} />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Field control={TextArea} onChange={(e, o) => this.handleChange('demoNote', o)} label='Примечание для демо' placeholder='Примечание для демо' />
          <Form.Field />
        </Form.Group>
      </div>
    )
  }

  renderRecommenderInfo () {
    let {recommender} = this.state
    return <Table celled striped>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Header as={'h4'}>ФИО</Header>
          </Table.Cell>
          <Table.Cell>
            {recommender.clientName}
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>
            <Header as={'h4'}>Род. отношение</Header>
          </Table.Cell>
          <Table.Cell>
            {recommender.relationName}
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>
            <Header as={'h4'}>Тел. номера</Header>
          </Table.Cell>
          <Table.Cell>
            {recommender.phoneNumbers.map((item) => {
              return item + ', '
            })}
          </Table.Cell>
        </Table.Row>

      </Table.Body>
    </Table>
  }

  renderCallForm () {
    return <Form>
      <Form.Group widths='equal'>
        <Form.Input fluid label='Тел. номер' placeholder={this.state.call.phoneNumber} readOnly />
        <Form.Field required error={this.state.errors.callDate}>
          <label>Дата-время звонка</label>
          <DatePicker
            autoComplete="off"
            label=''
            placeholderText={'Дата-время звонка'}
            showMonthDropdown showYearDropdown showTimeSelect dropdownMode='select'
            dateFormat='DD.MM.YYYY HH:mm' selected={this.state.call.callDate}
            onChange={(v) => this.handleChange('callDate', v)} />
        </Form.Field>
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Select error={this.state.errors.callResultId} required name='resultId' fluid selection label='Результат звонка' options={this.props.callResultOptions}
          onChange={(e, v) => this.handleChange('callResultId', v)} />

        {this.renderCallResultDependentField()}
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Field control={TextArea} onChange={(e, o) => this.handleChange('callNote', o)} label='Примечание звонка' placeholder='Примечание звонка' />
        <Form.Field />
      </Form.Group>
      <Divider />
      {this.renderDemoForm()}
      <Form.Field control={Button} content='Сохранить' onClick={this.saveCall} />
    </Form>
  }

  validateForm () {
    let {call, errors} = this.state
      for(let k in errors){
          if (errors.hasOwnProperty(k)) {
              errors[k] = false
          }
      }

    if (!call.callDate || call.callDate.length === 0) {
      errors.callDate = true
    }

    if (!call.callResultId || call.callResultId === 0) {
      errors.callResultId = true
    } else if (call.callResultId === CALL_RESULT_REFUSE) {
      if (!call.callReasonId || call.callReasonId === 0) {
        errors.callReasonId = true
      }
    } else if (call.callResultId === CALL_RESULT_RECALL) {
      if (!call.callRecallDate || call.callRecallDate.length === 0) {
        errors.callRecallDate = true
      }
    } else if (call.callResultId === CALL_RESULT_DEMO) {
      if (!call.demoAddress || call.demoAddress.length === 0) {
        errors.demoAddress = true
      }

      if (!call.demoLocationId || call.demoLocationId === 0) {
        errors.demoLocationId = true
      }

      if (!call.demoClientName || call.demoClientName.length === 0) {
        errors.demoClientName = true
      }

      if (!call.demoDate || call.demoDate.length === 0) {
        errors.demoDate = true
      }
    }

    this.setState({
      ...this.state,
      errors: errors
    })
  }

  saveCall () {
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
    axios.post(`${ROOT_URL}/api/crm/call/` + this.props.phoneId, { ...this.state.call }, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
      .then((response) => {
          if(this.props.recoId){
              this.props.fetchSingleReco(this.props.recoId)
          }
        this.closeModal()
      }).catch((error) => {
        console.log(error)
      })
  }

  closeModal () {
    this.setState({
      ...this.state,
      opened: false,
        buttonLoading:false
    })

    if (this.props.onCloseModal) {
      this.props.onCloseModal()
    }
  }

  renderNumberHistory () {
    return <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>#</Table.HeaderCell>
          <Table.HeaderCell>Компания</Table.HeaderCell>
          <Table.HeaderCell>Филиал</Table.HeaderCell>
          <Table.HeaderCell>Дата-время звонка</Table.HeaderCell>
          <Table.HeaderCell>Звонил</Table.HeaderCell>
          <Table.HeaderCell>Примечание</Table.HeaderCell>
          <Table.HeaderCell>Результат</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {this.props.historyItems.map((item, idx) => {
          return (
            <Table.Row key={item.id}>
              <Table.Cell>{idx + 1}</Table.Cell>
              <Table.Cell>{item.bukrsName}</Table.Cell>
              <Table.Cell>{item.branchName}</Table.Cell>
              <Table.Cell>{item.dateTimeStr}</Table.Cell>
              <Table.Cell>{item.callerName}</Table.Cell>
              <Table.Cell>{item.note}</Table.Cell>
              <Table.Cell>{item.resultName}</Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  }

  handleChange (fieldName, o) {
    let {call, showDemoForm, errors} = this.state

    switch (fieldName) {
      case 'callDate':
      case 'callRecallDate':
      case 'demoDate':
        call[fieldName] = o
        break
      case 'demoLocationId':
      case 'demoClientName':
      case 'demoAddress':

      case 'callNote':
      case 'demoNote':
        call[fieldName] = o.value
        break

        case 'callReasonId':
            call[fieldName] = parseInt(o.value,10)
            break

      case 'callResultId':
        call[fieldName] = parseInt(o.value,10)
        if (call[fieldName] > 0) {
          errors[fieldName] = false
        }
        if (call[fieldName] === CALL_RESULT_DEMO) {
          showDemoForm = true
        } else {
          showDemoForm = false
        }
        break

        default:{}
    }

    this.setState({
      ...this.state,
      call: call,
      showDemoForm: showDemoForm,
      errors: errors
    })
  }

  renderCallResultDependentField () {
    if (this.state.call.callResultId === CALL_RESULT_REFUSE) {
      let reasonOptions = []
        if(this.props.reasons){
            for (let k in this.props.reasons) {
                if (this.props.reasons[k]['typeId'] === 1) {
                    reasonOptions.push({
                        key: this.props.reasons[k]['id'],
                        text: this.props.reasons[k]['name'],
                        value: this.props.reasons[k]['id']
                    })
                }
            }
        }

      // Otkaz
      return (
        <Form.Select error={this.state.errors.callReasonId} required fluid label='Причина отказа' options={reasonOptions}
          onChange={(e, v) => this.handleChange('callReasonId', v)} />
      )
    } else if (this.state.call.callResultId === CALL_RESULT_RECALL) {
      // Perzvonit'
      return (
        <Form.Field error={this.state.errors.callRecallDate} required>
          <label>Дата-время перезвона</label>
          <DatePicker
            autoComplete="off"
            label=''
            placeholderText={'Дата-время перезвона'}
            showMonthDropdown showYearDropdown showTimeSelect dropdownMode='select'
            dateFormat='DD.MM.YYYY HH:mm' selected={this.state.call.callRecallDate}
            onChange={(v) => this.handleChange('callRecallDate', v)} />
        </Form.Field>
      )
    }

    return <Form.Field />
  }

  render () {
    const {phoneNumber} = this.props
    return (
      <p>
        {this.state.buttonLoading ? <Button loading>Loading</Button> : <Label as='button' horizontal onClick={this.handlePhoneClick}>
          <Icon disabled name='phone' />
          {phoneNumber}
        </Label>}

        {this.renderCallModal()}
      </p>
    )
  }
}

function mapStateToProps (state) {
    return {
        historyItems:state.crmReco.phoneNumberHistory,
        callResultOptions:state.crmReco.callResultOptions,
        reasons:state.crmDemo.reasons
    }
}

export default connect(mapStateToProps, {fetchPhoneNumberHistory,fetchCallResults,fetchSingleReco})(Phone)

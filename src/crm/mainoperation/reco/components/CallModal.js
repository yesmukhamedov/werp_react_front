import React, {Component} from 'react'
import {Label, Icon, Modal, Tab, Table, Form, Input, TextArea, Button, Container, Divider, Message } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import axios from 'axios'
import {ROOT_URL, MONTH_OPTIONS} from '../../../../utils/constants'

const locationOptions = [
  {
    key: 1,
    text: 'Город',
    value: 1
  },
  {
    key: 2,
    text: 'ЗАгород',
    value: 2
  }
]

const CALL_RESULT_DEMO = 1
const CALL_RESULT_REFUSE = 2
const CALL_RESULT_RECALL = 3
const CALL_RESULT_NOT_AVAILABLE = 4

class CallModal extends Component {
  constructor (props) {
    super(props)

    this.state = {
      opened: false,
      showDemoForm: false,
      historyItems: [],
      callResultOptions: [],
      call: {
        context: this.props.context,
        contextId: this.props.contextId,
        bukrs: '',
        branchId: 0,
        phoneNumber: this.props.phoneNumber,
        callDate: moment(),
        callResultId: 0,
        callReasonId: 0,
        callRecallDate: '',
        callNote: '',
        demoClientName: '',
        demoDate: '',
        demoAddress: '',
        demoLocationId: 0,
        demoNote: ''
      },
      errors: {
        callResultId: false,
        callReasonId: false,
        callDate: false,
        callRecallDate: false,
        demoClientName: false,
        demoDate: false,
        demoAddress: false,
        demoLocationId: false
      },
      months: MONTH_OPTIONS
    }
    this.handlePhoneClick = this.handlePhoneClick.bind(this)
    this.handleModalClose = this.handleModalClose.bind(this)
    this.renderNumberHistory = this.renderNumberHistory.bind(this)
    this.close = this.close.bind(this)
    this.renderCallForm = this.renderCallForm.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.saveCall = this.saveCall.bind(this)
    this.validateForm = this.validateForm.bind(this)
    this.renderDemoForm = this.renderDemoForm.bind(this)
    this.renderRecommenderInfo = this.renderRecommenderInfo.bind(this)
  }

  componentWillMount () {

  }

  componentWillReceiveProps (props) {
    console.log(props)
  }

  handlePhoneClick () {
    axios.get(`${ROOT_URL}/api/crm/call/number-history/` + this.props.id, {
      headers: {
        authorization: localStorage.getItem('token')}
    }).then((res) => {
      this.setState({
        ...this.state,
        historyItems: res.data,
        opened: true
      })
      this.renderCallModal()
    }).catch((e) => {
      console.log(e)
    })
  }

  handleDate (p1, p2, p3) {
    console.log(p1, p2, p3)
  }

  renderDemoForm () {
    if (this.state.showDemoForm) {
      return (
        <div>
          <Form.Group widths='equal'>
            <Form.Field error={this.state.errors.demoClientName} onChange={(e, o) => this.handleChange('demoClientName', o)}
              value={this.state.call.demoClientName}
              control={Input} required label='ФИО клиента' placeholder='ФИО клиента' />
            <Form.Field error={this.state.errors.demoDate} required>
              <label>Дата-время демонстрации</label>
              <DatePicker
                label=''
                placeholderText={'Дата-время демонстрации'}
                showMonthDropdown showYearDropdown showTimeSelect dropdownMode='select'
                dateFormat='DD.MM.YYYY HH:mm' selected={this.state.call.demoDate}
                onChange={(v) => this.handleChange('demoDate', v)} />
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field error={this.state.errors.demoAddress} required control={TextArea} onChange={(e, o) => this.handleChange('demoAddress', o)} label='Адрес' placeholder='Адрес' />
            <Form.Select error={this.state.errors.demoLocationId} required fluid selection label='Местоположение' options={locationOptions}
              onChange={(e, v) => this.handleChange('demoLocationId', v)} />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field control={TextArea} onChange={(e, o) => this.handleChange('demoNote', o)} label='Примечание для демо' placeholder='Примечание для демо' />
            <Form.Field />
          </Form.Group>
        </div>
      )
    }

    return null
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
              <Table.Cell>{item.callDate}</Table.Cell>
              <Table.Cell>{item.callerName}</Table.Cell>
              <Table.Cell>{item.note}</Table.Cell>
              <Table.Cell>{item.resultName}</Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  }

  handleDropdownChange (e, result) {
    const {name, value} = result
  }

  handleChange (fieldName, o) {
    console.log(this.state.call.bukrs)
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
      case 'callReasonId':
        call[fieldName] = o.value
        break

      case 'callResultId':
        call[fieldName] = o.value
        if (call[fieldName] > 0) {
          errors[fieldName] = false
        }
        if (call[fieldName] == CALL_RESULT_DEMO) {
          showDemoForm = true
        } else {
          showDemoForm = false
        }
        break
    }

    this.setState({
      ...this.state,
      call: call,
      showDemoForm: showDemoForm,
      errors: errors
    })
  }

  renderCallResultDependentField () {
    if (this.state.call.callResultId == CALL_RESULT_REFUSE) {
      // Otkaz
      return (
        <Form.Select error={this.state.errors.callReasonId} required fluid label='Причина отказа' options={this.props.callRefuseOptions}
          onChange={(e, v) => this.handleChange('callReasonId', v)} />
      )
    } else if (this.state.call.callResultId == CALL_RESULT_RECALL) {
      // Perzvonit'
      return (
        <Form.Field error={this.state.errors.callRecallDate} required>
          <label>Дата-время перезвона</label>
          <DatePicker
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

  validateForm () {
    let {call, errors} = this.state
    Object.keys(errors).map((k) => {
      if (errors.hasOwnProperty(k)) {
        errors[k] = false
      }
    })
    if (!call.callDate || call.callDate.length == 0) {
      errors.callDate = true
    }

    if (call.callResultId == 0) {
      errors.callResultId = true
    } else if (call.callResultId == CALL_RESULT_REFUSE) {
      console.log(call.callReasonId)
      if (call.callReasonId == 0) {
        errors.callReasonId = true
      }
    } else if (call.callResultId == CALL_RESULT_RECALL) {
      if (!call.callRecallDate || call.callRecallDate.length == 0) {
        errors.callRecallDate = true
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
    Object.keys(this.state.errors).map((k) => {
      if (this.state.errors[k]) {
        isValid = false
      }
    })
    if (!isValid) {
      return
    }
    axios.post(`${ROOT_URL}/api/crm/call/` + this.props.phoneId, { ...this.state.call }, {
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

  renderCallForm () {
    return <Form>
      <Form.Group widths='equal'>
        <Form.Field value={this.state.call.phoneNumber} readOnly control={Input} label='Тел. номер' placeholder='Тел. номер' />
        <Form.Field required error={this.state.errors.callDate}>
          <label>Дата-время звонка</label>
          <DatePicker
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

  renderRecommenderInfo () {
    return <Table celled>
      <Table.Body>
        <Table.Row>
          <Table.HeaderCell>ФИО</Table.HeaderCell>
          <Table.Cell>{this.props.recommender.clientName}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.HeaderCell>Род. отношение</Table.HeaderCell>
          <Table.Cell />
        </Table.Row>

        <Table.Row>
          <Table.HeaderCell>Тел. номера</Table.HeaderCell>
          <Table.Cell>{
            this.props.recommender.phoneNumbers.map((p) => {
              return <p>{p}</p>
            })
          }</Table.Cell>

        </Table.Row>
      </Table.Body>
    </Table>
  }

  handleModalClose () {
    this.setState({
      ...this.state,
      opened: false
    })
  }

  close () {
    this.props.onClose(false)
  }

  render () {
    const {open, onOpen} = this.props
    const panes = [
      { menuItem: 'История номера', render: this.renderNumberHistory },
      { menuItem: 'Добавление звонка', render: this.renderCallForm},
      { menuItem: 'Данные рекомендателя', render: this.renderRecommenderInfo }
    ]
    return (
      <Modal size={'large'} open={open} onClose={this.close} onOpen={onOpen}>
        <Modal.Header>Звонок по номеру: {this.props.phoneNumber}</Modal.Header>
        <Modal.Content>
          <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        </Modal.Content>
      </Modal>
    )
  }
}

export default CallModal

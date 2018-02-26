import React, {Component} from 'react'
import {Modal,Form, Input, TextArea, Button } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import axios from 'axios'
import {ROOT_URL} from '../../../../utils/constants'

class VisitCreateModal extends Component {
  constructor (props) {
    super(props)

    this.state = {
      opened: false,
      visit: {
        clientName: '',
        visitorId: 0,
        address: '',
        docDate: null,
        note: ''
      },
      loaded: false,
      dealers: [],
      errors: {
        visitorId: false,
        clientName: false,
        docDate: false
      }
    }

    this.close = this.close.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onOpen = this.onOpen.bind(this)
    this.saveData = this.saveData.bind(this)
    this.renderForm = this.renderForm.bind(this)
    this.validateForm = this.validateForm.bind(this)
  }

  componentWillMount () {
    axios.get(`${ROOT_URL}/api/hr/pyramid/crm/group-dealers`, {
      headers: {
        authorization: localStorage.getItem('token')}
    }).then((res) => {
      let loaded = res.data.map((item) => {
        return {
          key: item.staffId,
          text: item.lastname + ' ' + item.firstname,
          value: item.staffId
        }
      })
      loaded.unshift({
        key: 0,
        text: 'Не выбрано',
        value: 0
      })
      this.setState({
        ...this.state,
        dealers: loaded
      })
    }).catch((e) => {
      console.log(e)
    })
  }

  handleDate (p1, p2, p3) {
    console.log(p1, p2, p3)
  }

  renderForm () {
    return <Form>
      <Form.Group widths='equal'>
        <Form.Select error={this.state.errors.visitorId}
          value={this.state.visit.visitorId}
          required fluid selection
          label='Посетитель' options={this.state.dealers}
          onChange={(e, v) => this.handleChange('visitorId', v)} />

        <Form.Field error={this.state.errors.clientName} onChange={(e, o) => this.handleChange('clientName', o)}
          value={this.state.visit.clientName}
          control={Input} required label='ФИО клиента' placeholder='ФИО клиента' />
      </Form.Group>

      <Form.Group widths='equal'>
        <Form.Field control={TextArea}
          onChange={(e, o) => this.handleChange('address', o)}
          label='Адрес' placeholder='Адрес'
          value={this.state.visit.address}
        />

        <Form.Field error={this.state.errors.docDate} required>
          <label>Дата визита</label>
          <DatePicker
            label=''
            placeholderText={'Дата-время демонстрации'}
            showMonthDropdown showYearDropdown dropdownMode='select'
            dateFormat='DD.MM.YYYY' selected={this.state.visit.docDate ? moment(this.state.visit.docDate) : null}
            onChange={(v) => this.handleChange('docDate', v)} />
        </Form.Field>
      </Form.Group>

      <Form.Group widths='equal'>
        <Form.Field control={TextArea}
          onChange={(e, o) => this.handleChange('note', o)}
          label='Примечание' placeholder='Примечание'
          value={this.state.visit.note}
        />
        <Form.Field />
      </Form.Group>
    </Form>
  }

  handleChange (fieldName, o) {
    let {visit, errors} = this.state
    // console.log(o);
    switch (fieldName) {
      case 'docDate':
        if (o) {
          visit[fieldName] = o.valueOf()
        } else {
          visit[fieldName] = null
        }
        break
      case 'clientName':
      case 'note':
      case 'address':
        visit[fieldName] = o.value
        break

      case 'visitorId':
        visit[fieldName] = o.value
        break

        default:{}
    }

    this.setState({
      ...this.state,
      visit: visit,
      errors: errors
    })
  }

  validateForm () {
    let {visit, errors} = this.state
      for(let k in errors){
          if (errors.hasOwnProperty(k)) {
              errors[k] = false
          }
      }

    if (!visit.clientName || visit.clientName.length === 0) {
      errors['clientName'] = true
    }

    if (!visit.docDate || visit.docDate.length === 0) {
      errors['docDate'] = true
    }

    if (!visit.visitorId || visit.visitorId === 0) {
      errors['visitorId'] = true
    }

    this.setState({
      ...this.state,
      errors: errors
    })
  }

  saveData () {
    this.validateForm()
    let isValid = true
    const {errors} = this.state;
    for(let k in errors){
        if (errors[k]) {
            isValid = false
        }
    }

    if (!isValid) {
      return
    }
    axios.post(`${ROOT_URL}/api/crm/visit/`, { ...this.state.visit }, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
      .then((response) => {
        this.afterSave()
      }).catch((error) => {
        console.log(error)
      })
  }

  afterSave () {
    this.props.afterSave()
    this.close()
  }

  close () {
    this.props.onClose(false)
  }

  onOpen (e, data) {
    console.log('OPENED')
  }

  render () {
    const {modalOpened} = this.props
    return (
      <Modal size={'small'} open={modalOpened} onOpen={this.onOpen}>
        <Modal.Header>Добавление визита</Modal.Header>
        <Modal.Content>
          {this.renderForm()}
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={this.close}>Отмена</Button>
          <Button positive icon='checkmark' onClick={this.saveData} labelPosition='right' content='Сохранить' />
        </Modal.Actions>
      </Modal>
    )
  }
}

export default VisitCreateModal

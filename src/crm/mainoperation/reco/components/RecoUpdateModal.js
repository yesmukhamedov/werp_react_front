import React, {Component} from 'react'
import {Label, Icon, Modal, Tab, Table, Form, Input, TextArea, Button, Container, Divider, Checkbox } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import axios from 'axios'
import {ROOT_URL, MONTH_OPTIONS} from '../../../../utils/constants'

const categories = [
  {
    key: 1,
    text: '1-я категория',
    value: 1
  },
  {
    key: 2,
    text: '2-я категория',
    value: 2
  },
  {
    key: 3,
    text: '3-я категория',
    value: 3
  }
]

const callerIsDealer = [
  {
    key: 0,
    text: 'СЕКРЕТАРЬ',
    value: 0
  },
  {
    key: 1,
    text: 'ДИЛЕР',
    value: 1
  }
]

const RESULT_UNKNOWN = 0
const RESULT_DONE = 1
const RESULT_MOVED = 2
const RESULT_CANCELLED = 3
const RESULT_SOLD = 4
const RESULT_MINI_CONTRACT = 5
const RESULT_SOLD_CANCELLED = 6

let allReasons = []

class RecoUpdateModal extends Component {
  constructor (props) {
    super(props)

    this.state = {
      opened: false,
      reco: {},
      loaded: false,
      dealers: [],
      results: [],
      categories: [],
      reasons: [],
      errors: {
        responsibleId: false,
        clientName: false,
        callerIsDealer: false
      }
    }

    this.close = this.close.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.renderUpdateForm = this.renderUpdateForm.bind(this)
    this.onOpen = this.onOpen.bind(this)
    this.saveData = this.saveData.bind(this)
  }

  loadReasons () {
    axios.get(`${ROOT_URL}/api/reference/reasons/0`, {
      headers: {
        authorization: localStorage.getItem('token')}
    }).then((res) => {
      allReasons = res.data
    }).catch((e) => {
      console.log(e)
    })
  }

  componentWillMount () {
    axios.get(`${ROOT_URL}/api/crm/demo/results`, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    }).then((res) => {
      let results = Object.keys(res.data).map((k) => {
        return {
          key: k,
          text: res.data[k],
          value: k
        }
      })

      this.setState({
        ...this.state,
        results: results
      })
    }).catch((e) => {
      console.log(e)
    })

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

    this.loadReasons()
  }

  handleDate (p1, p2, p3) {
    console.log(p1, p2, p3)
  }

  getReasonsByResultId (resultId) {
    let reasonTypeId = 0
    if (resultId == RESULT_DONE) {
      reasonTypeId = 2
    } else if (resultId == RESULT_CANCELLED) {
      reasonTypeId = 3
    } else if (resultId == RESULT_MOVED) {
      reasonTypeId = 4
    }

    let out = []
    for (let k in allReasons) {
      if (allReasons[k]['typeId'] === reasonTypeId) {
        out.push({
          key: allReasons[k]['id'],
          text: allReasons[k]['name'],
          value: allReasons[k]['id']
        })
      }
    }

    return out
  }

  renderUpdateForm () {
    return <Form>
      <Form.Group widths='equal'>
        <Form.Field error={this.state.errors.clientName} onChange={(e, o) => this.handleChange('clientName', o)}
          value={this.state.reco.clientName}
          control={Input} required label='ФИО клиента' placeholder='ФИО клиента' />
        <Form.Field onChange={(e, o) => this.handleChange('districtName', o)}
          value={this.state.reco.districtName || ''}
          control={Input} label='Район' placeholder='Район' />

      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Select error={this.state.errors.categoryId}
          value={this.state.reco.categoryId}
          required fluid selection
          label='Категория' options={categories}
          onChange={(e, v) => this.handleChange('categoryId', v)} />
        <Form.Select error={this.state.errors.callerIsDealer}
          value={this.state.reco.callerIsDealer}
          required fluid selection
          label='Звонить будет' options={callerIsDealer}
          onChange={(e, v) => this.handleChange('callerIsDealer', v)} />
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Select error={this.state.errors.responsibleId}
          value={this.state.reco.responsibleId}
          required fluid selection
          label='Дилер' options={this.state.dealers}
          onChange={(e, v) => this.handleChange('responsibleId', v)} />

        <Form.Field control={TextArea}
          onChange={(e, o) => this.handleChange('note', o)}
          label='Примечание для демо'
          placeholder='Примечание для демо'
          value={this.state.reco.note || ''}
        />
      </Form.Group>
    </Form>
  }

  handleChange (fieldName, o) {
    let {reco, errors} = this.state
    // console.log(o);
    switch (fieldName) {
      case 'clientName':
      case 'districtName':
      case 'note':
        if (o.required && !o.value || o.value.trim().length === 0) {
          errors[fieldName] = true
        } else {
          errors[fieldName] = false
        }
        reco[fieldName] = o.value
        break

      case 'categoryId':
      case 'callerIsDealer':
      case 'responsibleId':
        reco[fieldName] = o.value
        if (o.required) {
          if (fieldName === 'callerIsDealer') {
            if (o.value != 0 && o.value != 1) {
              errors[fieldName] = true
            } else {
              errors[fieldName] = false
            }
          } else {
            if (o.value === 0) {
              errors[fieldName] = true
            } else {
              errors[fieldName] = false
            }
          }
        }
        break
    }

    this.setState({
      ...this.state,
      reco: reco,
      errors: errors
    })
  }

  componentWillReceiveProps (props) {
    this.setState({
      ...this.state,
      reco: props.reco
    })
  }

  saveData () {
    let isValid = true
    Object.keys(this.state.errors).map((k) => {
      if (this.state.errors[k]) {
        isValid = false
      }
    })
    if (!isValid) {
      return
    }
    axios.put(`${ROOT_URL}/api/crm/reco/` + this.state.reco.id, { ...this.state.reco }, {
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
    this.props.onClose(false)
  }

  onOpen (e, data) {
    console.log('OPENED')
  }

  render () {
    const {modalOpened, reco} = this.props
    return (
      <Modal size={'small'} open={modalOpened} onOpen={this.onOpen}>
        <Modal.Header>Редактирование рекомендации</Modal.Header>
        <Modal.Content>
          {this.renderUpdateForm()}
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={this.close}>Отмена</Button>
          <Button positive icon='checkmark' onClick={this.saveData} labelPosition='right' content='Сохранить' />
        </Modal.Actions>
      </Modal>
    )
  }
}

export default RecoUpdateModal

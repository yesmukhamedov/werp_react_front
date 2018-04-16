import React, {Component} from 'react'
import {Modal,Form, Input, TextArea, Button } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment'
import axios from 'axios'
import {ROOT_URL} from '../../../../utils/constants'
import {fetchSingleVisit,createVisit,modalToggle,updateVisit} from '../actions/visitAction'
import { connect } from 'react-redux'

class VisitCreateModal extends Component {
  constructor (props) {
    super(props)

    this.state = {
        localVisit:{id:null},
        dealers: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.renderForm = this.renderForm.bind(this)
      this.saveVisit = this.saveVisit.bind(this)
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
      let {localVisit} = this.state
    return <Form>
      <Form.Group widths='equal'>
        <Form.Select
          value={localVisit.visitorId}
          required fluid selection
          label='Посетитель' options={this.state.dealers}
          onChange={(e, v) => this.handleChange('visitorId', v)} />

        <Form.Field onChange={(e, o) => this.handleChange('clientName', o)}
          value={localVisit.clientName || ''}
          control={Input} required label='ФИО клиента' placeholder='ФИО клиента' />
      </Form.Group>

      <Form.Group widths='equal'>
        <Form.Field control={TextArea}
          onChange={(e, o) => this.handleChange('address', o)}
          label='Адрес' placeholder='Адрес'
          value={localVisit.address || ''}
        />

        <Form.Field required>
          <label>Дата визита</label>
          <DatePicker
            label=''
            placeholderText={'Дата-время демонстрации'}
            showMonthDropdown showYearDropdown dropdownMode='select'
            dateFormat='DD.MM.YYYY' selected={localVisit.docDate ? moment(localVisit.docDate) : null}
            onChange={(v) => this.handleChange('docDate', v)} />
        </Form.Field>
      </Form.Group>

      <Form.Group widths='equal'>
        <Form.Field control={TextArea}
          onChange={(e, o) => this.handleChange('note', o)}
          label='Примечание' placeholder='Примечание'
          value={localVisit.note || ''}
        />
        <Form.Field />
      </Form.Group>
    </Form>
  }

  handleChange (fieldName, o) {
    let localVisit = Object.assign({}, this.state.localVisit)
    // console.log(o);
    switch (fieldName) {
      case 'docDate':
          console.log(o.valueOf())
        if (o) {
            localVisit[fieldName] = o.valueOf()
        } else {
            localVisit[fieldName] = null
        }
        break
      case 'clientName':
      case 'note':
      case 'address':
          localVisit[fieldName] = o.value
        break

      case 'visitorId':
          localVisit[fieldName] = o.value
        break

        default:{}
    }

    this.setState({
      ...this.state,
        localVisit: localVisit
    })
  }

    componentWillReceiveProps (nextProps) {
        if(nextProps.visit.id !== this.state.localVisit.id){
            let localVisit = Object.assign({}, nextProps.visit);
            this.setState({
                ...this.state,
                localVisit: localVisit
            })
        }
    }

    saveVisit(){
        const {localVisit} = this.state
        if(localVisit.id && typeof localVisit.id !== 'undefined'){
            this.props.updateVisit(localVisit,this.props.fromComponent)
        }else{
            this.props.createVisit(localVisit,this.props.fromComponent)
        }
    }

  render () {
    const {modalOpened} = this.props
    return (
      <Modal size={'small'} open={modalOpened}>
        <Modal.Header>{this.state.localVisit.id && this.state.localVisit.id > 0 ?'Редактирование визита':'Добавление визита'}</Modal.Header>
        <Modal.Content>
          {this.renderForm()}
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => this.props.modalToggle(false)}>Отмена</Button>
          <Button positive icon='checkmark'
                  onClick={this.saveVisit}
                  labelPosition='right' content='Сохранить' />
        </Modal.Actions>
      </Modal>
    )
  }
}



function mapStateToProps (state) {
    return {
        modalOpened: state.crmVisit.modalOpened,
        visit: state.crmVisit.visit
    }
}

export default connect(mapStateToProps, {fetchSingleVisit,createVisit,modalToggle,updateVisit})(VisitCreateModal)

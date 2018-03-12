import React, {Component} from 'react'
import {Modal, Form, Input, TextArea, Button } from 'semantic-ui-react'
import {fetchSingleReco,toggleRecoUpdateModal,updateReco} from '../actions/recoAction'
import {fetchGroupDealers} from '../../demo/actions/demoAction'
import {RECO_CATEGORIES} from '../../../crmUtil'
import { connect } from 'react-redux'



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

class RecoUpdateModal extends Component {
  constructor (props) {
    super(props)

    this.state = {
        localReco:{},
      results: [],
      errors: {
        responsibleId: false,
        clientName: false,
        callerIsDealer: false
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.renderUpdateForm = this.renderUpdateForm.bind(this)
    this.saveData = this.saveData.bind(this)
      this.validateData = this.validateData.bind(this)
  }

  componentWillMount () {
      this.props.fetchGroupDealers()
  }

  handleDate (p1, p2, p3) {
    console.log(p1, p2, p3)
  }

  renderUpdateForm () {
    return <Form>
      <Form.Group widths='equal'>
        <Form.Field error={this.state.errors.clientName} onChange={(e, o) => this.handleChange('clientName', o)}
          value={this.state.localReco.clientName}
          control={Input} required label='ФИО клиента' placeholder='ФИО клиента' />
        <Form.Field onChange={(e, o) => this.handleChange('districtName', o)}
          value={this.state.localReco.districtName || ''}
          control={Input} label='Район' placeholder='Район' />

      </Form.Group>

        <Form.Group widths='equal'>
            <Form.Field required onChange={(e, o) => this.handleChange('relative', o)}
                        value={this.state.localReco.relative || ''}
                        control={Input} label='Род. отношения' placeholder='Род. отношения' />
            <Form.Field />

        </Form.Group>

      <Form.Group widths='equal'>
        <Form.Select error={this.state.errors.categoryId}
          value={this.state.localReco.categoryId}
          required fluid selection
          label='Категория' options={RECO_CATEGORIES}
          onChange={(e, v) => this.handleChange('categoryId', v)} />
        <Form.Select error={this.state.errors.callerIsDealer}
          value={this.state.localReco.callerIsDealer}
          required fluid selection
          label='Звонить будет' options={callerIsDealer}
          onChange={(e, v) => this.handleChange('callerIsDealer', v)} />
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Select error={this.state.errors.responsibleId}
          value={this.state.localReco.responsibleId}
          required fluid selection
          label='Дилер' options={this.props.dealers}
          onChange={(e, v) => this.handleChange('responsibleId', v)} />

        <Form.Field control={TextArea}
          onChange={(e, o) => this.handleChange('note', o)}
          label='Примечание для демо'
          placeholder='Примечание для демо'
          value={this.state.localReco.note || ''}
        />
      </Form.Group>
    </Form>
  }

  handleChange (fieldName, o) {
      let localReco = Object.assign({}, this.state.localReco);
      let errors = Object.assign({}, this.state.errors);
    // console.log(o);
    switch (fieldName) {
      case 'clientName':
      case 'districtName':
      case 'note':
        case 'relative':
        if (o.required && (!o.value || o.value.trim().length === 0)) {
          errors[fieldName] = true
        } else {
          errors[fieldName] = false
        }
          localReco[fieldName] = o.value
        break

      case 'categoryId':
      case 'callerIsDealer':
      case 'responsibleId':
          localReco[fieldName] = o.value
        if (o.required) {
          if (fieldName === 'callerIsDealer') {
            if (o.value !== 0 && o.value !== 1) {
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

        default:{}
    }

    this.setState({
      ...this.state,
        localReco: localReco,
        errors:errors
    })
  }

  componentWillReceiveProps (nextProps) {
      if(nextProps.reco !== this.state.reco){
          let localReco = Object.assign({}, this.props.reco);
          this.setState({
              ...this.state,
              localReco: localReco
          })
      }
  }

  validateData(){
      let {localReco,errors} = this.state
      if(!localReco.clientName || localReco.clientName.length === 0){
          errors['clientName'] = true
      }
  }

  saveData () {
      this.validateData()
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

  }

  render () {
    return (
      <Modal size={'small'} open={this.props.updateModalOpened}>
        <Modal.Header>Редактирование рекомендации</Modal.Header>
        <Modal.Content>
          {this.renderUpdateForm()}
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => this.props.toggleRecoUpdateModal(false)}>Отмена</Button>
          <Button positive icon='checkmark' onClick={() => this.props.updateReco(this.state.localReco)} labelPosition='right' content='Сохранить' />
        </Modal.Actions>
      </Modal>
    )
  }
}

function mapStateToProps (state) {
    return {
        reco:state.crmReco.reco,
        updateModalOpened:state.crmReco.updateModalOpened,
        dealers:state.crmDemo.dealers
    }
}

export default connect(mapStateToProps, {fetchSingleReco,toggleRecoUpdateModal,updateReco,fetchGroupDealers})(RecoUpdateModal)
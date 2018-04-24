import React, {Component} from 'react'
import {Modal, Form, Input, TextArea, Button } from 'semantic-ui-react'
import {toggleExpenceFormModal,createExpence,updateExpence} from '../../actions/hrStaffAction'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import moment from 'moment'



class ExpenceFormModal extends Component {
  constructor (props) {
    super(props)

    this.state = {
        localExpence:{}
    }

    this.handleChange = this.handleChange.bind(this)
    this.renderForm = this.renderForm.bind(this)
    this.saveData = this.saveData.bind(this)
      this.handleDate = this.handleDate.bind(this)
  }

  componentWillMount () {


  }

  handleDate (fieldName, o) {
      let localExpence = Object.assign({}, this.state.localExpence);
      if(fieldName === 'expenseDate'){
          if(o){
              localExpence[fieldName] = o.valueOf();
          }else{
              localExpence[fieldName] = null
          }
      }

      this.setState({
          ...this.state,
          localExpence:localExpence
      })
  }

  currencyOptions(){
      if(!this.props.currencyList){
          return []
      }

      const {currencyList} = this.props
      let out = []
      for(let k in currencyList){
          out.push({
              key:currencyList[k]['currency'],
              value:currencyList[k]['currency'],
              text:currencyList[k]['text20']
          })
      }

      return out
  }

    expenceTypeOptions = () => {
      if(!this.props.expenceTypes){
          return []
      }

        const {expenceTypes} = this.props
        let out = []
        for(let k in expenceTypes){
            out.push({
                key:expenceTypes[k]['et_id'],
                value:expenceTypes[k]['et_id'],
                text:expenceTypes[k]['name']
            })
        }

        return out

    }

  renderForm () {
      const {localExpence} = this.state
    return <Form>
        <Form.Group widths='equal'>
            <Form.Select value={localExpence.bukrs}
                         onChange={this.handleChange}
                         name="bukrs"
                         required fluid selection
                         label='Компания' options={this.props.companyOptions} />

            <Form.Field required>
                <label>Сумма</label>
                <Input value={localExpence.amount || 0} onChange={this.handleChange} type='number' name="amount" />
            </Form.Field>
        </Form.Group>

        <Form.Group widths='equal'>
            <Form.Field required>
                <label>Дата с</label>
                <DatePicker
                    label=''
                    placeholderText={'Дата с'}
                    showMonthDropdown showYearDropdown dropdownMode='select'
                    dateFormat='DD.MM.YYYY' selected={localExpence.expenseDate?moment(localExpence.expenseDate):null}
                    onChange={(v) => this.handleDate('expenseDate', v)} />
            </Form.Field>

            <Form.Select value={localExpence.type}
                         onChange={this.handleChange}
                         name="type"
                         search
                         required fluid selection
                         label='Тип расхода' options={this.expenceTypeOptions()} />
        </Form.Group>

        <Form.Group widths='equal'>

            <Form.Select value={localExpence.currency}
                         onChange={this.handleChange}
                         name="currency"
                         search
                         required fluid selection
                         label='Валюта' options={this.currencyOptions()} />

            <Form.Field
                control={TextArea} value={localExpence.description || ''}
                label='Примечание' onChange={this.handleChange} placeholder='Примечание' name="description" />

        </Form.Group>

    </Form>
  }

  handleChange (e, o) {
      const {name} = o
      let localExpence = Object.assign({}, this.state.localExpence);
    switch (name) {
        case 'description':
      case 'bukrs':
        case 'currency':
        case 'amount':
        case 'type':
            localExpence[name] = o.value
        break

        default:{}
    }

    this.setState({
      ...this.state,
        localExpence: localExpence
    })
  }

  componentWillReceiveProps (nextProps) {
      if(nextProps.expence.id !== this.state.localExpence.id){
          let localExpence = Object.assign({}, nextProps.expence);
          this.setState({
              ...this.state,
              localExpence: localExpence
          })
      }
  }
  saveData () {
        const {localExpence} = this.state
      if(!localExpence.id || typeof localExpence.id === 'undefined'){
          localExpence['staffId'] = this.props.staffId
          this.props.createExpence(localExpence)
      }else{
          this.props.updateExpence(localExpence)
      }
  }

  render () {
    return (
      <Modal size={'small'} open={this.props.expenceFormModalOpened}>
        <Modal.Header>Добавление расхода</Modal.Header>
        <Modal.Content>
          {this.renderForm()}
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => this.props.toggleExpenceFormModal(false)}>Отмена</Button>
          <Button positive
                  icon='checkmark'
                  onClick={this.saveData}
                  labelPosition='right' content='Сохранить' />
        </Modal.Actions>
      </Modal>
    )
  }
}

function mapStateToProps (state) {
    return {
        expence:state.hrStaff.expence,
        expenceFormModalOpened:state.hrStaff.expenceFormModalOpened,
        companyOptions:state.userInfo.companyOptions,
        currencyList:state.f4.currencyList,
        expenceTypes:state.f4.expenceTypes
    }
}

export default connect(mapStateToProps, {
    toggleExpenceFormModal,createExpence,updateExpence
})(ExpenceFormModal)
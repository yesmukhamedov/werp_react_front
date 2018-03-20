import React, {Component} from 'react'
import {Modal, Form, Input, TextArea, Button } from 'semantic-ui-react'
import {toggleSalaryFormtModal,createSalary,fetchBranchPyramids} from '../../actions/hrStaffAction'
import {f4FetchBusinessAreaList,f4FetchPositionList,f4FetchCurrencyList,f4FetchDepartmentList} from '../../../../../reference/f4/f4_action'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import moment from 'moment'


const SALARY_TYPES = [
    {
        key:'monthly',
        value:'monthly',
        text:'Помесячно'
    },
    {
        key:'daily',
        value:'daily',
        text:'Подням'
    },
    {
        key:'hourly',
        value:'hourly',
        text:'Почасовой'
    }
];

class SalaryFormModal extends Component {
  constructor (props) {
    super(props)

    this.state = {
        localSalary:{},
        branchOptions:[]
    }

    this.handleChange = this.handleChange.bind(this)
    this.renderForm = this.renderForm.bind(this)
    this.saveData = this.saveData.bind(this)
      this.validateData = this.validateData.bind(this)
      this.handleDate = this.handleDate.bind(this)
  }

  componentWillMount () {
      this.props.f4FetchBusinessAreaList()
      this.props.f4FetchPositionList('staff')
      this.props.f4FetchCurrencyList('staff')
      this.props.f4FetchDepartmentList()

  }

  handleDate (fieldName, o) {
      let localSalary = Object.assign({}, this.state.localSalary);
      if(fieldName === 'begDate'){
          if(o){
              localSalary[fieldName] = o.valueOf();
          }else{
              localSalary[fieldName] = null
          }
      }

      this.setState({
          ...this.state,
          localSalary:localSalary
      })
  }

  branchOptions(bukrs){

      const {branchOptionsAll} = this.props
      if(!branchOptionsAll){
          return []
      }

      return branchOptionsAll[bukrs] || []
  }

  businessAreaList(bukrs){
      if(!this.props.businessAreaList){
          return []
      }

      const {businessAreaList} = this.props

      let out = []
      for(let k in businessAreaList){
          if(businessAreaList[k]['bukrs'] === bukrs){
              out.push({
                  key: businessAreaList[k]['business_area_id'],
                  value: businessAreaList[k]['business_area_id'],
                  text: businessAreaList[k]['name']
              })
          }
      }

      return out
  }

  pyramidOptions(branchId){
      if(!this.props.branchPyramids){
          return []
      }

      const {branchPyramids} = this.props
      let out = []
      for(let k in branchPyramids){
          out.push({
              key: branchPyramids[k]['staffId'],
              value:branchPyramids[k]['staffId'],
              text: branchPyramids[k]['fullName'] + '(' + branchPyramids[k]['positionName'] + ')'
          })
      }

      return out
  }

  positionOptions(){
      if(!this.props.positionList){
          return []
      }

      const {positionList} = this.props
      let out = []
      for(let k in positionList){
          out.push({
              key:positionList[k]['position_id'],
              value:positionList[k]['position_id'],
              text:positionList[k]['text']
          })
      }

      return out
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

    departmentOptions(){
        if(!this.props.departmentList){
            return []
        }

        const {departmentList} = this.props
        let out = []
        for(let k in departmentList){
            out.push({
                key:departmentList[k]['id'],
                value:departmentList[k]['id'],
                text:departmentList[k]['name_ru']
            })
        }

        return out
    }

  renderForm () {
      const {localSalary} = this.state
    return <Form>
        <Form.Group widths='equal'>
            <Form.Select value={localSalary.bukrs}
                         onChange={this.handleChange}
                         name="bukrs"
                         required fluid selection
                         label='Компания' options={this.props.companyOptions} />

            <Form.Select value={localSalary.businessAreaId}
                         onChange={this.handleChange}
                         name="businessAreaId"
                         required fluid selection
                         label='Бизнес сфера' options={this.businessAreaList(localSalary.bukrs)} />
        </Form.Group>

        <Form.Group widths='equal'>
            <Form.Select value={localSalary.branchId}
                         onChange={this.handleChange}
                         name="branchId"
                         search
                         required fluid selection
                         label='Филиал' options={this.branchOptions(localSalary.bukrs)} />

            <Form.Select value={localSalary.parentPyramidId}
                         onChange={this.handleChange}
                         name="parentPyramidId"
                         search
                         required fluid selection
                         label='Иерархия (родитель)' options={this.pyramidOptions(localSalary.branchId)} />
        </Form.Group>

        <Form.Group widths='equal'>
            <Form.Select value={localSalary.positionId}
                         onChange={this.handleChange}
                         name="positionId"
                         search
                         required fluid selection
                         label='Должность' options={this.positionOptions()} />

            <Form.Select value={localSalary.waers}
                         onChange={this.handleChange}
                         name="waers"
                         required fluid selection
                         label='Валюта' options={this.currencyOptions()} />
        </Form.Group>

        <Form.Group widths='equal'>
            <Form.Field required>
                <label>Дата с</label>
                <DatePicker
                    label=''
                    placeholderText={'Дата с'}
                    showMonthDropdown showYearDropdown dropdownMode='select'
                    dateFormat='DD.MM.YYYY' selected={localSalary.begDate?moment(localSalary.begDate):null}
                    onChange={(v) => this.handleDate('begDate', v)} />
            </Form.Field>

            <Form.Select value={localSalary.departmentId}
                         onChange={this.handleChange}
                         name="departmentId"
                         search
                         required fluid selection
                         label='Отдел' options={this.departmentOptions()} />
        </Form.Group>

        <Form.Group widths='equal'>
            <Form.Field required>
                <label>Оклад</label>
                <Input value={localSalary.amount || 0} onChange={this.handleChange} type='number' name="amount" />
            </Form.Field>

            <Form.Select value={localSalary.salaryType}
                         onChange={this.handleChange}
                         name="salaryType"
                         required fluid selection
                         label='Тип зарплаты' options={SALARY_TYPES} />
        </Form.Group>

        <Form.Group widths='equal'>
            <Form.Field />

            <Form.Field
                control={TextArea} value={localSalary.note || ''}
                label='Примечание' onChange={this.handleChange} placeholder='Примечание' name="note" />
        </Form.Group>

    </Form>
  }

  handleChange (e, o) {
      const {name} = o
      let localSalary = Object.assign({}, this.state.localSalary);
    switch (name) {
      case 'clientName':
      case 'districtName':
      case 'note':
    case 'relative':
    case 'amount':
            localSalary[name] = o.value
        break

      case 'bukrs':
      case 'branchId':
      case 'businessAreaId':
        case 'parentPyramidId':
        case 'waers':
        case 'positionId':
        case 'departmentId':
        case 'salaryType':
          localSalary[name] = o.value
        break

        default:{}
    }

    if(name === 'branchId'){
          this.props.fetchBranchPyramids(o.value)
    }

    this.setState({
      ...this.state,
        localSalary: localSalary
    })
  }

  // componentWillReceiveProps (nextProps) {
  //     if(nextProps.salary !== this.state.localSalary){
  //         let localSalary = Object.assign({}, this.props.salary);
  //         this.setState({
  //             ...this.state,
  //             localSalary: localSalary
  //         })
  //     }
  // }

  validateData(){
  }

  saveData () {

  }

  render () {
    return (
      <Modal size={'small'} open={this.props.salaryFormModalOpened}>
        <Modal.Header>Добавление должности</Modal.Header>
        <Modal.Content>
          {this.renderForm()}
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => this.props.toggleSalaryFormtModal(false)}>Отмена</Button>
          <Button positive
                  icon='checkmark'
                  onClick={() => this.props.createSalary(this.state.localSalary)}
                  labelPosition='right' content='Сохранить' />
        </Modal.Actions>
      </Modal>
    )
  }
}

function mapStateToProps (state) {
    return {
        salary:state.hrStaff.salary,
        salaryFormModalOpened:state.hrStaff.salaryFormModalOpened,
        branchPyramids:state.hrStaff.branchPyramids,
        companyOptions:state.userInfo.companyOptions,
        branchOptionsAll:state.userInfo.branchOptionsAll,
        businessAreaList:state.f4.businessAreaList,
        positionList:state.f4.positionList,
        currencyList:state.f4.currencyList,
        departmentList:state.f4.departmentList
    }
}

export default connect(mapStateToProps, {
        toggleSalaryFormtModal,createSalary,f4FetchBusinessAreaList,fetchBranchPyramids,
        f4FetchPositionList,f4FetchCurrencyList,f4FetchDepartmentList
})(SalaryFormModal)
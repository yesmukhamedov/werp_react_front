import React, {Component} from 'react'
import { connect } from 'react-redux'
import {toggleStaffDataFormModal,createStaffData,fetchBranchPyramids} from '../actions/hrStaffAction'
import OffDataForm from './forms/OffDataForm'
import ExpenceForm from './forms/ExpenceForm'
import EducationForm from './forms/EducationForm'
import SalaryForm from './forms/SalaryForm'

import StaffDataFormModal from './StaffDataFormModal'
import {OFF_DATA,EXPENCE_DATA,EDU_DATA,SALARY_DATA,
        currencyOptions,subCompanyOptions,positionOptions,expenceTypeOptions,businessAreaOptions,
        pyramidOptions,departmentOptions} from '../../../hrUtil'

class StaffDataFormHandler extends Component {
  constructor (props) {
    super(props)
    this.state = {
        localItem: {
            id: -1
        },
        currentData: null
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.getForm = this.getForm.bind(this)
      this.handleDate = this.handleDate.bind(this)
      this.branchOptions = this.branchOptions.bind(this)
  }

    branchOptions(bukrs){
        const {branchOptionsAll} = this.props
        if(!branchOptionsAll){
            return []
        }

        return branchOptionsAll[bukrs] || []
    }

    componentWillReceiveProps (nextProps) {
        if(nextProps.staffData.id !== this.state.localItem.id){
            let localItem = Object.assign({}, nextProps.staffData);
            this.setState({
                ...this.state,
                localItem: localItem
            })
        }
    }

    handleDate (fieldName, o) {
        let localItem = Object.assign({}, this.state.localItem);
        if(o){
            localItem[fieldName] = o.valueOf();
        }else{
            localItem[fieldName] = null
        }

        this.setState({
            ...this.state,
            localItem:localItem
        })
    }

    handleChange(e,d){
      const {name,value} = d
       let localItem = Object.assign({},this.state.localItem);
      localItem[name] = value
        this.setState({
            ...this.state,
            localItem: localItem
        })

        if(name === 'branchId' && this.props.activeData === SALARY_DATA){
            this.props.fetchBranchPyramids(value)
        }
    }

    getForm(){
        switch (this.props.activeData){
            case OFF_DATA:
                return <OffDataForm
                    handleChange={this.handleChange}
                    companyOptions={this.props.companyOptions}
                    currencyOptions={currencyOptions(this.props.currencyList)}
                    subCompanyOptions={subCompanyOptions(this.props.subCompanies)}
                    model={this.state.localItem} />

            case EXPENCE_DATA:
                return <ExpenceForm
                    expenceTypeOptions={expenceTypeOptions(this.props.expenceTypes)}
                    handleDate={this.handleDate}
                    handleChange={this.handleChange}
                    companyOptions={this.props.companyOptions}
                    currencyOptions={currencyOptions(this.props.currencyList)}
                    model={this.state.localItem}/>

            case SALARY_DATA:
                const {localItem} = this.state
                return <SalaryForm
                    model={localItem}
                    handleChange={this.handleChange}
                    companyOptions={this.props.companyOptions}
                    branchOptions={this.branchOptions(localItem.bukrs)}
                    businessAreaOptions={businessAreaOptions(this.props.businessAreaList,localItem.bukrs)}
                    pyramidOptions={pyramidOptions(this.props.branchPyramids,localItem.branchId)}
                    positionOptions={positionOptions(this.props.positionList)}
                    currencyOptions={currencyOptions(this.props.currencyList)}
                    departmentOptions={departmentOptions(this.props.departmentList)}
                    handleDate={this.handleDate}
                />

            case EDU_DATA:
                return <EducationForm
                    handleChange={this.handleChange}
                    model={this.state.localItem}/>
            default:
                return null
        }
    }

    onSubmit(){
        if(!this.state.localItem.id || typeof this.state.localItem.id === 'undefined'){
            this.props.createStaffData(this.state.localItem,this.props.activeData)
        }else{

        }
    }

  render () {
    return (
        <StaffDataFormModal
            onCancel={() => this.props.toggleStaffDataFormModal(false)}
            opened={this.props.staffDataFormModalOpened}
            content={this.getForm()}
            onSubmit={this.onSubmit}
        />
    )
  }
}

function mapStateToProps (state) {
    return {
        expence:state.hrStaff.expence,
        expenceFormModalOpened:state.hrStaff.expenceFormModalOpened,
        branchPyramids:state.hrStaff.branchPyramids,
        companyOptions:state.userInfo.companyOptions,
        branchOptionsAll:state.userInfo.branchOptionsAll,
        currencyList:state.f4.currencyList,
        businessAreaList: state.f4.businessAreaList,
        expenceTypes:state.f4.expenceTypes,
        subCompanies:state.f4.subCompanies,
        positionList:state.f4.positionList,
        departmentList:state.f4.departmentList,
        staffDataFormModalOpened: state.hrStaff.staffDataFormModalOpened,
        staffData: state.hrStaff.staffData
    }
}

export default connect(mapStateToProps, {
    toggleStaffDataFormModal,createStaffData,fetchBranchPyramids
})(StaffDataFormHandler)

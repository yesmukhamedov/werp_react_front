import React, {Component} from 'react'
import {Container, Divider, Tab, Header,Button} from 'semantic-ui-react'
import { connect } from 'react-redux'
import {fetchSingleStaff,fetchStaffSalaries,fetchStaffExpences,fetchStaffOffData,toggleSalaryFormModal,setSalaryForUpdate,toggleExpenceFormModal} from '../actions/hrStaffAction'
import StaffSalariesTable from './view/StaffSalariesTable'
import StaffExpencesTable from './view/StaffExpencesTable'
import StaffOffDataTable from './view/StaffOffDataTable'
import StaffPassportTable from './view/StaffPassportTable'
import StaffMainDataTable from './view/StaffMainDataTable'
import StaffFilesTable from './view/StaffFilesTable'
import SalaryFormModal from './forms/SalaryFormModal'
import ExpenceFormModal from  './forms/ExpenceFormModal'
import {f4FetchBusinessAreaList,f4FetchPositionList,f4FetchCurrencyList,f4FetchDepartmentList,f4FetchExpenceTypes} from '../../../../reference/f4/f4_action'

class StaffViewPage extends Component{
    constructor(props) {
        super(props)
        this.renderMainData = this.renderMainData.bind(this);
        this.renderPassportData = this.renderPassportData.bind(this);
        this.renderSalaryData = this.renderSalaryData.bind(this);
        this.renderContactData = this.renderContactData.bind(this);
        this.renderExpensesData = this.renderExpensesData.bind(this);
        this.renderOfficialData = this.renderOfficialData.bind(this);
        this.handleSalaryUpdate = this.handleSalaryUpdate.bind(this)
        this.handleSalaryCreate = this.handleSalaryCreate.bind(this)
    }

  componentWillMount () {
      const id = parseInt(this.props.match.params.id, 10)
      this.props.fetchSingleStaff(id)
      this.props.fetchStaffSalaries(id)
      this.props.fetchStaffExpences(id)
      this.props.fetchStaffOffData(id)
      this.props.f4FetchBusinessAreaList()
      this.props.f4FetchPositionList('staff')
      this.props.f4FetchCurrencyList('staff')
      this.props.f4FetchDepartmentList()
      this.props.f4FetchExpenceTypes()
  }

  renderMainData () {
    return <StaffMainDataTable staff={this.props.staff} />
  }

  renderPassportData () {
    return <StaffPassportTable staff={this.props.staff}/>
  }

  renderContactData () {
    return (
      <h2>Contact</h2>
    )
  }

  renderFiles(){
        return <StaffFilesTable files={[]} />
  }

    renderExpensesData(staffId){
        return <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
            <Button onClick={() => this.props.toggleExpenceFormModal(true)} floated={'right'} primary>Добавить</Button>
            <ExpenceFormModal staffId={staffId}/>
            <StaffExpencesTable expences={this.props.staffExpences}/>
        </Container>
    }

    renderOfficialData(){
        return <StaffOffDataTable offData={this.props.staffOffData}/>
    }

    handleSalaryUpdate(salary){
        this.props.setSalaryForUpdate(salary)
        this.props.toggleSalaryFormModal(true)
    }

    handleSalaryCreate(){
        this.props.setSalaryForUpdate({})
        this.props.toggleSalaryFormModal(true)
    }

    renderSalaryData(staffId){
        return <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
                    <Button onClick={this.handleSalaryCreate} floated={'right'} primary>Добавить</Button>
                    <SalaryFormModal staffId={staffId}/>
                <StaffSalariesTable handleUpdate={this.handleSalaryUpdate} salaries={this.props.staffSalaries}/>
            </Container>
    }

    renderProfile(){
        const {staff} = this.props
        const panes = [
            {menuItem:'Основные данные',render:this.renderMainData},
            {menuItem:'Паспортные данные',render:this.renderPassportData},
            {menuItem:'Должности',render:() => this.renderSalaryData(staff.id)},
            {menuItem:'Контакты',render:this.renderContactData},
            {menuItem:'Расходы',render:() => this.renderExpensesData(staff.id)},
            {menuItem:'Оф. данные',render:this.renderOfficialData},
            {menuItem:'Файлы',render:this.renderMainData},
            {menuItem:'Доп. данные',render:this.renderMainData},
            {menuItem:'Баланс',render:this.renderMainData},
            {menuItem:'Склад',render:this.renderMainData}
        ]

        return (

            <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
                <Header as="h2" block>
                    Карточка сотрудника / {staff.lastname} {staff.firstname}
        </Header>
        <Divider />
        <Tab panes={panes} menu={{ secondary: true, pointing: true }} />
      </Container>
    )
  }

  render () {
      return this.renderProfile()
  }
}

function mapStateToProps (state) {
    return {
        staff:state.hrStaff.staff,
        staffSalaries:state.hrStaff.staffSalaries,
        staffExpences:state.hrStaff.staffExpences,
        staffOffData:state.hrStaff.staffOffData,
        salaryFormModalOpened:state.hrStaff.salaryFormModalOpened
    }
}

export default connect(mapStateToProps, {
    fetchSingleStaff,fetchStaffSalaries,fetchStaffExpences,fetchStaffOffData,
    f4FetchBusinessAreaList,f4FetchPositionList,f4FetchCurrencyList,f4FetchDepartmentList,toggleSalaryFormModal,setSalaryForUpdate,
    f4FetchExpenceTypes,toggleExpenceFormModal
})(StaffViewPage)

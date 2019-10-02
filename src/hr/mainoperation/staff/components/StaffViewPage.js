import React, {Component} from 'react'
import {Container, Divider, Tab, Header,Button} from 'semantic-ui-react'
import { connect } from 'react-redux'
import {fetchSingleStaff,toggleStaffDataFormModal,blankStaffData,
    fetchStaffData,setStaffDataForUpdate,deleteStaffData,downloadFile,addUploadedFile,
    deleteFile} from '../actions/hrStaffAction'
import StaffSalariesTable from './view/StaffSalariesTable'
import StaffExpencesTable from './view/StaffExpencesTable'
import StaffOffDataTable from './view/StaffOffDataTable'
import StaffPassportTable from './view/StaffPassportTable'
import StaffMainDataTable from './view/StaffMainDataTable'
import StaffFilesTable from './view/StaffFilesTable'
import StaffEducationTable from './view/StaffEducationTable'
import StaffMatnrsTable from './view/StaffMatnrsTable'
import StaffContactTable from './view/StaffContactTable'
import {f4FetchBusinessAreaList,f4FetchPositionList,f4FetchCurrencyList,f4FetchDepartmentList,f4FetchExpenceTypes,f4FetchSubCompanies} from '../../../../reference/f4/f4_action'
import {STAFF_DATA,OFF_DATA,EXPENCE_DATA,EDU_DATA,SALARY_DATA,MATNR_DATA,CONTACT_DATA,FILE_DATA} from '../../../hrUtil'
import StaffDataFormHandler from './StaffDataFormHandler'

class StaffViewPage extends Component{
    constructor(props) {
        super(props)
        this.state = {
            activeIndex:0,
            localOffData:{}
        }
        this.renderMainData = this.renderMainData.bind(this);
        this.renderPassportData = this.renderPassportData.bind(this);
        this.renderContactData = this.renderContactData.bind(this);
        this.renderExpensesData = this.renderExpensesData.bind(this);
        this.renderOfficialData = this.renderOfficialData.bind(this);
        this.handleSalaryUpdate = this.handleSalaryUpdate.bind(this)
        this.onTabChange = this.onTabChange.bind(this)
        this.prepareToCreate = this.prepareToCreate.bind(this)
        this.prepareForUpdate = this.prepareForUpdate.bind(this)
        this.prepareForDelete = this.prepareForDelete.bind(this)
    }

  componentWillMount () {
      const id = parseInt(this.props.match.params.id, 10)
      this.props.fetchSingleStaff(id)
      this.props.fetchStaffData(id,OFF_DATA)
      this.props.fetchStaffData(id,EXPENCE_DATA)
      this.props.fetchStaffData(id,EDU_DATA)
      this.props.fetchStaffData(id,SALARY_DATA)
      this.props.fetchStaffData(id,MATNR_DATA)
      this.props.fetchStaffData(id,CONTACT_DATA)
      this.props.fetchStaffData(id,FILE_DATA)
      this.props.f4FetchBusinessAreaList()
      this.props.f4FetchPositionList('staff')
      this.props.f4FetchCurrencyList('staff')
      this.props.f4FetchDepartmentList()
      this.props.f4FetchExpenceTypes()
      this.props.f4FetchSubCompanies()
  }

  renderMainData () {
    return <StaffMainDataTable staff={this.props.staff} />
  }

  renderPassportData () {
    return <StaffPassportTable staff={this.props.staff}/>
  }

  renderContactData () {
    return <StaffContactTable addresses={this.props.staffDataList[CONTACT_DATA] || []}/>
  }

  renderFiles(files){
        return <StaffFilesTable
                    staffId={this.props.staff.id}
                    onUploadSuccess={this.onUploadSuccess}
                    deleteFile={this.props.deleteFile}
                    downloadFile={this.props.downloadFile} files={files} />
  }

    onUploadSuccess = (response) => {
      this.props.addUploadedFile(response)
    }

  prepareToCreate(){
      const {staff} = this.props
      this.props.blankStaffData(staff.id,STAFF_DATA[this.state.activeIndex])
      this.props.toggleStaffDataFormModal(true)
  }

  prepareForUpdate(data){
      this.props.setStaffDataForUpdate(data)
      this.props.toggleStaffDataFormModal(true)
  }

  prepareForDelete (id){
      if(!window.confirm('Вы действительно хотите удалить элемент?')){
          return false
      }

      this.props.deleteStaffData(id,STAFF_DATA[this.state.activeIndex])
  }

    renderExpensesData(staffId){
        return <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
            <Button onClick={this.prepareToCreate} floated={'right'} primary>Добавить</Button>
            <StaffExpencesTable
                handleDelete={this.prepareForDelete}
                expences={this.props.staffDataList[EXPENCE_DATA] || []}/>
        </Container>
    }

    renderOfficialData(){
        return <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
                    <Button onClick={this.prepareToCreate} floated={'right'} primary>Добавить</Button>
                    <StaffOffDataTable offData={this.props.staffDataList[OFF_DATA] || []}/>
            </Container>
    }

    renderEduData(items){
        return <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
            <Button onClick={this.prepareToCreate} floated={'right'} primary>Добавить</Button>
            <StaffEducationTable items={items}/>
        </Container>
    }

    renderMatnrsData(items){
        return <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
            <StaffMatnrsTable items={items}/>
        </Container>
    }

    handleSalaryUpdate(salary){
        this.props.setSalaryForUpdate(salary)
        this.props.toggleSalaryFormModal(true)
    }

    renderSalaryData(items){
        return <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
                    <Button onClick={this.prepareToCreate} floated={'right'} primary>Добавить</Button>
                    <StaffSalariesTable
                        handleDelete={this.prepareForDelete}
                        handleUpdate={this.prepareForUpdate} items={items}/>
            </Container>
    }

    onTabChange(e,d){
        this.setState({
            ...this.state,
            activeIndex: d.activeIndex
        })
    }

    renderProfile(){
        const {staff,staffDataList} = this.props
        const panes = [
            {menuItem:'Основные данные',render:this.renderMainData},
            {menuItem:'Паспортные данные',render:this.renderPassportData},
            {menuItem:'Должности',render:() => this.renderSalaryData(staffDataList[SALARY_DATA])},
            {menuItem:'Контакты',render:this.renderContactData},
            {menuItem:'Расходы',render:() => this.renderExpensesData(staff.id)},
            {menuItem:'Оф. данные',render:this.renderOfficialData},
            {menuItem:'Образование',render:() => this.renderEduData(staffDataList[EDU_DATA] || [])},
            {menuItem:'Файлы',render:() => this.renderFiles(staffDataList[FILE_DATA] || [])},
            //{menuItem:'Доп. данные',render:this.renderMainData},
            {menuItem:'Баланс',render:this.renderMainData},
            {menuItem:'Склад',render:() => this.renderMatnrsData(staffDataList[MATNR_DATA] || [])}
        ]
        return (

            <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
                <Header as="h2" block>
                    Карточка сотрудника / {staff.lastname} {staff.firstname}
                </Header>
                <StaffDataFormHandler
                    activeData={STAFF_DATA[this.state.activeIndex]}/>
        <Divider />
        <Tab onTabChange={this.onTabChange} panes={panes} menu={{ secondary: true, pointing: true }} />
      </Container>
    )
  }

  render () {
      return this.renderProfile()
  }
}

function mapStateToProps (state) {
    return {
        staff: state.hrStaff.staff,
        staffSalaries: state.hrStaff.staffSalaries,
        staffExpences: state.hrStaff.staffExpences,
        staffOffData: state.hrStaff.staffOffData,
        salaryFormModalOpened: state.hrStaff.salaryFormModalOpened,
        staffDataFormModalOpened: state.hrStaff.staffDataFormModalOpened,
        staffData: state.hrStaff.staffData,
        staffDataList: state.hrStaff.staffDataList
    }
}

export default connect(mapStateToProps, {
    fetchSingleStaff,f4FetchBusinessAreaList,f4FetchPositionList,f4FetchCurrencyList,f4FetchDepartmentList,
    f4FetchExpenceTypes,toggleStaffDataFormModal,f4FetchSubCompanies,blankStaffData,fetchStaffData,
    setStaffDataForUpdate,deleteStaffData,downloadFile,addUploadedFile,deleteFile
})(StaffViewPage)

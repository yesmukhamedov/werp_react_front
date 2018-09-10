import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Header,Container,Segment,Divider,Loader } from 'semantic-ui-react'
import HrDocActions from './HrDocActions'

import {DOC_TYPE_RECRUITMENT,DOC_ACTION_SAVE} from '../../../hrUtil'
import RecruitmentForm from './forms/RecruitmentForm'
import {blankDocument,createDocument} from '../actions/hrDocAction'
import {fetchAllStaffs,toggleStaffListModal,fetchAllManagers,fetchAllDirectors} from '../../staff/actions/hrStaffAction'
import StaffListModal from '../../staff/components/StaffListModal'
import {f4FetchPositionList,f4FetchBusinessAreaList,f4FetchDepartmentList} from '../../../../reference/f4/f4_action'

class HrDocCreatePage extends Component{

    constructor(props){
        super(props)

        this.state = {
            localDocument: {}
        }
    }

    componentWillMount(){
        let docType = parseInt(this.props.match.params.type,10)
        this.props.blankDocument(docType)
        if(DOC_TYPE_RECRUITMENT === docType){
            this.props.fetchAllStaffs([])
            this.props.f4FetchPositionList('hr_document')
            this.props.f4FetchDepartmentList()
            this.props.fetchAllManagers()
            this.props.fetchAllDirectors()
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.document && nextProps.document.id !== this.state.localDocument.id){
            this.setState({
                localDocument: Object.assign({},nextProps.document)
            })
        }
    }

    getBranchOptions = (bukrs) => {
        let branchOptions = this.props.branchOptions
        if(!branchOptions || !branchOptions[bukrs]){
            return []
        }
        return branchOptions[bukrs]
    }

    getManagerOptions = (branchId) => {
        let managerOptions = this.props.managersByBranchOptions
        if(!managerOptions || !managerOptions[branchId]){
            return []
        }

        return managerOptions[branchId]
    }

    getDirectorOptions = (branchId) => {
        let directorOptions = this.props.directorsByBranchOptions
        return directorOptions ? (directorOptions[branchId] || []) : []
    }

    addItem = () => {
        let docType = parseInt(this.props.match.params.type,10)
        if(docType === DOC_TYPE_RECRUITMENT){
            this.props.toggleStaffListModal(true)
        }
    }

    removeItem = (index) => {
        let doc = Object.assign({},this.state.localDocument)
        let items = doc.items || []
        let newItems = []
        for(let k in items){
            if(k != index){
                newItems.push(items[k])
            }
        }
        doc['items'] = newItems

        this.setState({
            ...this.state,
            localDocument: doc
        })
    }

    handleStaffSelect = (staff) => {
        let docType = parseInt(this.props.match.params.type,10)
        if(docType === DOC_TYPE_RECRUITMENT){
            let document = Object.assign({},this.state.localDocument)
            let items = document.items || []
            items.push({
                staffId: staff.staffId,
                staffName: staff.lastname + ' ' + staff.firstname,
                amount: 0

            })

            this.setState({
                ...this.state,
                localDocument: document
            })

            this.props.toggleStaffListModal(false)
        }
    }

    handleDocumentChange = (fieldName,fieldValue) => {
        let doc = Object.assign({},this.state.localDocument)
        doc[fieldName] = fieldValue

        this.setState({
            ...this.state,
            localDocument: doc
        })
    }

    handleItemChange = (index,fieldName,fieldValue) => {
        let doc = Object.assign({},this.state.localDocument)
        let items = doc.items || []
        if(!items[index]){
            return
        }

        if(fieldName === 'beginDate'){
            if (fieldValue) {
                fieldValue = fieldValue.valueOf()
            } else {
                fieldValue = null
            }
        }

        items[index][fieldName] = fieldValue
        doc['items'] = items

        this.setState({
            ...this.state,
            localDocument: doc
        })
    }

    handleAction = (actionType) => {
        switch (actionType){
            case DOC_ACTION_SAVE:
                    this.props.createDocument(this.state.localDocument)
                break

            default:
                break
        }
    }

    render (){
        const currentType = parseInt(this.props.match.params.type,10)
        let form;
        let pageTitle = 'Создание документа ';
        switch (currentType){
            case DOC_TYPE_RECRUITMENT:
                form = <RecruitmentForm
                    handleItemChange={this.handleItemChange}
                    handleDocumentChange={this.handleDocumentChange}
                    addItem={this.addItem}
                    removeItem={this.removeItem}
                    positionList={this.props.positionList}
                    departmentList={this.props.departmentList}
                    branchOptions = {this.getBranchOptions(this.state.localDocument.bukrs)}
                    directorOptions={this.getDirectorOptions(this.state.localDocument.branchId)}
                    managerOptions = {this.getManagerOptions(this.state.localDocument.branchId)}
                    bukrsOptions={this.props.bukrsOptions} document={this.state.localDocument}/>
                pageTitle += 'Заявление о приеме на работу'

            default:{}
        }

        return <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
            <Segment clearing>
                <Header as='h2' floated='left'>
                    {pageTitle}
                </Header>
                <StaffListModal
                    onSelect={this.handleStaffSelect}
                    close={() => this.props.toggleStaffListModal(false)}
                    opened={this.props.staffListModalOpened}
                    staffs={this.props.allStaffs} />
                <HrDocActions isUpdate={true} handleAction={this.handleAction} items={this.props.actions} />
            </Segment>
            <Divider clearing />

            {form}
        </Container>
    }
}

function mapStateToProps (state) {
    return {
        document:state.hrDocReducer.document,
        actions: state.hrDocReducer.actions,
        bukrsOptions: state.userInfo.companyOptions,
        branchOptions: state.userInfo.branchOptionsAll,
        staffListModalOpened: state.hrStaff.staffListModalOpened,
        managersByBranchOptions: state.hrStaff.managersByBranchOptions,
        directorsByBranchOptions: state.hrStaff.directorsByBranchOptions,
        allStaffs:state.hrStaff.allStaffs,
        departmentList:state.f4.departmentList,
        positionList:state.f4.positionList
    }
}

export default connect(mapStateToProps, {
    blankDocument,fetchAllStaffs,toggleStaffListModal,createDocument,fetchAllDirectors,
    f4FetchPositionList,f4FetchBusinessAreaList,f4FetchDepartmentList,fetchAllManagers
})(HrDocCreatePage)
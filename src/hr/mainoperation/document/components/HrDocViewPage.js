import React, {Component} from 'react'
import { connect } from 'react-redux'

import { Header,Container,Segment,Divider,Loader } from 'semantic-ui-react'
import HrDocActions from './HrDocActions'
import HrDocMainData from './HrDocMainData'
import HrDocData from './HrDocData'
import HrDocApprovers from './HrDocApprovers'
import HrDocLog from './HrDocLog'
import {fetchDocument,handleAction} from '../actions/hrDocAction'
import {DOC_ACTION_GO_TO_LIST,DOC_ACTION_ADD_APPROVER} from '../../../hrUtil'
import browserHistory from '../../../../utils/history'
import StaffListModal from '../../staff/components/StaffListModal'
import {fetchAllCurrentStaffs,toggleStaffListModal} from '../../staff/actions/hrStaffAction'

let STAFF_MODAL_OPENED_ON_ACTION = -10

class HrDocViewPage extends Component{

    constructor(props){
        super(props)
        this.state = {
            //Модальное окно для добавление Согласующих
            approversModalOpened: false
        }
    }

    componentWillMount (){
        const id = parseInt(this.props.match.params.id,10)
        this.props.fetchDocument(id)
        this.props.fetchAllCurrentStaffs([])
    }

    handleAction = (actionType) => {

        switch (actionType){
            case DOC_ACTION_GO_TO_LIST:
                browserHistory.push('/hr/doc/recruitment')
                break

            case DOC_ACTION_ADD_APPROVER:
                STAFF_MODAL_OPENED_ON_ACTION = actionType
                this.props.toggleStaffListModal(true)
                break

            default:
                let document = Object.assign({},this.props.document)
                this.props.handleAction(document,actionType)
                break
        }
    }

    addApprover = (staff) => {
        let document = Object.assign({},this.props.document)
        let approvers = document.approvers || []
        let positions = staff.positions || []
        let pos = positions[0] || {}
        approvers.push({
            id: null,
            positionId: pos.positionId,
            positionName: pos.positionName,
            staffId:staff.staffId,
            staffName: staff.staffName,
            statusId: 0,
            statusName: "Не делал действии"
        })

        document['approvers'] = approvers

        console.log(document,staff)

        this.props.handleAction(document,DOC_ACTION_ADD_APPROVER);
    }

    handleStaffSelect = (staff) => {
        switch (STAFF_MODAL_OPENED_ON_ACTION){
            case DOC_ACTION_ADD_APPROVER:
                this.addApprover(staff)
                break

            default:
                console.log(staff)
                break
        }
    }

    render (){
        return <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
            <Segment clearing>
                <Header as='h2' floated='left'>
                    Просмотр документа Заявление о приеме на работу, №
                </Header>
                <HrDocActions handleAction={this.handleAction} items={this.props.actions} />
            </Segment>
            <Divider clearing />
            <StaffListModal
                onSelect={this.handleStaffSelect}
                close={() => this.props.toggleStaffListModal(false)}
                opened={this.props.staffListModalOpened}
                staffs={this.props.allCurrentStaffs} />
            {this.props.pageLoading?<Loader inline='centered' active/>:<div>
                    <HrDocMainData item={this.props.document}/>
                    <HrDocData typeId={this.props.document.typeId} items={this.props.document.items}/>
                    <HrDocApprovers items={this.props.document.approvers}/>
                    <HrDocLog items={this.props.document.actionLogs}/>
                </div>}

        </Container>
    }
}

function mapStateToProps (state) {
    return {
        document:state.hrDocReducer.document,
        actions: state.hrDocReducer.actions,
        pageLoading: state.hrDocReducer.pageLoading,
        staffListModalOpened: state.hrStaff.staffListModalOpened,
        allCurrentStaffs: state.hrStaff.allCurrentStaffs
    }
}

export default connect(mapStateToProps, {
    fetchDocument,handleAction,fetchAllCurrentStaffs,toggleStaffListModal
})(HrDocViewPage)
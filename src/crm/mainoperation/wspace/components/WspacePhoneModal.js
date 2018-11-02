import React,{Component} from 'react'
import _ from 'lodash'
import { Modal,Button,Table,Grid, Rail,Form,Input,TextArea,Divider,Tab, Segment } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {togglePhoneModal,saveCall} from '../actions/wspaceAction'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css"
import {CALL_RESULT_REFUSE,CALL_RESULT_RECALL,CALL_RESULT_DEMO,CALL_RESULT_NOT_AVAILABLE,CALL_RESULT_NO_ANSWER,getLocationOptionsByLanguage} from '../../../crmUtil'
import {renderCallResultLabel} from '../../../CrmHelper'
import { injectIntl } from 'react-intl'
require('moment/locale/ru');

class WspacePhoneModal extends Component{

    constructor(props){
        super(props)

        this.state = {
            callForm: {}
        }
    }

    handleChange = (name,data) => {
        let callForm = Object.assign({},this.state.callForm)
        let value = ''
        switch (name){
            case 'dateTime':
            case 'callRecallDateTime':
            case 'demoDateTime':
                value = data
                break
            case 'callResultId':
            case 'callReasonId':
            case 'demoLocationId':
            case 'demoDealerId':
                value = parseInt(data.value,10)
                break

            case 'demoAddress':
            case 'demoNote':
            case 'callNote':
            case 'demoClientName':
                value = _.trim(data.value)
                break
            default:
                break
        }

        if(name.substring(0,4) === 'demo'){
            let demoForm = Object.assign({},callForm.demo)
            let demoName = _.camelCase(name.substring(4))
            demoForm[demoName] = value
            callForm['demo'] = demoForm
        }else if(name.substring(0,4) === 'call') {
            let callName = _.camelCase(name.substring(4))
            callForm[callName] = value
        }else{
            callForm[name] = value
        }

        if(name === 'callResultId' && value !== CALL_RESULT_DEMO){
            callForm['demo'] = undefined
        }

        this.setState({
            ...this.state,
            callForm: callForm
        })
    }

    renderNumberHistory = () => {
        let {historyItems} = this.props
        if(!historyItems){
            historyItems = []
        }

        const {messages} = this.props.intl

        return <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>#</Table.HeaderCell>
                    <Table.HeaderCell>{messages['bukrs']}</Table.HeaderCell>
                    <Table.HeaderCell>{messages['brnch']}</Table.HeaderCell>
                    <Table.HeaderCell>{messages['Crm.CallDateTime']}</Table.HeaderCell>
                    <Table.HeaderCell>{messages['Crm.Called']}</Table.HeaderCell>
                    <Table.HeaderCell>{messages['Table.Note']}</Table.HeaderCell>
                    <Table.HeaderCell>{messages['Table.Result']}</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {historyItems.map((item, idx) => {
                    return (
                        <Table.Row key={item.id}>
                            <Table.Cell>{idx + 1}</Table.Cell>
                            <Table.Cell>{item.bukrsName}</Table.Cell>
                            <Table.Cell>{item.branchName}</Table.Cell>
                            <Table.Cell>{item.dateTimeStr}</Table.Cell>
                            <Table.Cell>{item.callerName}</Table.Cell>
                            <Table.Cell>{item.note}</Table.Cell>
                            <Table.Cell>{renderCallResultLabel(item.resultId,item.resultName)}</Table.Cell>
                        </Table.Row>
                    )
                })}
            </Table.Body>
        </Table>
    }

    renderCallResultDependentField = (messages) => {
        const {callForm} = this.state
        const {locale} = this.props.intl
        if (callForm.resultId === CALL_RESULT_REFUSE) {
            let reasonOptions = []
            if(this.props.reasons){
                for (let k in this.props.reasons) {
                    if (this.props.reasons[k]['typeId'] === 1) {
                        reasonOptions.push({
                            key: this.props.reasons[k]['id'],
                            text: this.props.reasons[k]['name'],
                            value: this.props.reasons[k]['id']
                        })
                    }
                }
            }

            // Otkaz
            return (
                <Form.Select required fluid label={messages['Crm.RejectionReason']} options={reasonOptions}
                             onChange={(e, v) => this.handleChange('callReasonId', v)} />
            )
        } else if (callForm.resultId === CALL_RESULT_RECALL || callForm.resultId === CALL_RESULT_NOT_AVAILABLE || callForm.resultId === CALL_RESULT_NO_ANSWER) {
            // Perzvonit'
            return (
                <Form.Field required>
                    <label>{messages['Crm.RecallDateTime']}</label>
                    <DatePicker
                        locale={locale}
                        autoComplete="off"
                        label=''
                        placeholderText={messages['Crm.RecallDateTime']}
                        showMonthDropdown showYearDropdown showTimeSelect dropdownMode='select'
                        dateFormat='DD.MM.YYYY HH:mm' selected={callForm.recallDateTime}
                        onChange={(v) => this.handleChange('callRecallDateTime', v)} />
                </Form.Field>
            )
        }

        return <Form.Field />
    }

    renderDemoForm = () => {
        let callForm = Object.assign({},this.state.callForm);
        const {messages,locale} = this.props.intl
        if (!callForm.resultId || callForm.resultId !== CALL_RESULT_DEMO) {
            return null
        }

        let demoForm = callForm['demo'] || {}

        return <div>
                <Form.Group widths='equal'>
                    <Form.Field onChange={(e, o) => this.handleChange('demoClientName', o)}
                                value={demoForm.clientName || ''}
                                control={Input} required label={messages['fioClient']} placeholder={messages['fioClient']} />

                    <Form.Field required>
                        <label>{messages['Crm.DemoDateTime']}</label>
                        <DatePicker
                            autoComplete="off"
                            locale={locale}
                            label=''
                            placeholderText={messages['Crm.DemoDateTime']}
                            showMonthDropdown showYearDropdown showTimeSelect dropdownMode='select'
                            dateFormat='DD.MM.YYYY HH:mm' selected={demoForm.dateTime || null}
                            onChange={(v) => this.handleChange('demoDateTime', v)}/>
                    </Form.Field>

                    <Form.Select required fluid selection label={messages['Crm.Location']} options={getLocationOptionsByLanguage(locale)}
                                 onChange={(e, v) => this.handleChange('demoLocationId', v)} />

                    <Form.Select
                        value={demoForm.dealerId}
                        required fluid selection
                                 label={messages['dealer']} options={this.props.dealers}

                                 onChange={(e, v) => this.handleChange('demoDealerId', v)} />
                </Form.Group>

                <Form.Group widths='equal'>
                    <Form.Field required control={TextArea} onChange={(e, o) => this.handleChange('demoAddress', o)} label={messages['Table.Address']} placeholder={messages['Table.Address']} />
                    <Form.Field control={TextArea} onChange={(e, o) => this.handleChange('demoNote', o)} label={messages['Crm.NoteForDemo']} placeholder={messages['Crm.NoteForDemo']} />
                </Form.Group>
            </div>
    }

    renderCallForm = () => {
        let callForm = Object.assign({},this.state.callForm)
        const {messages,locale} = this.props.intl
        return <Form>
                <Form.Group widths='equal'>
                    <Form.Field
                        value={this.props.currentPhone.phoneNumber}
                        readOnly control={Input}
                        label={messages['Table.PhoneNumber']} placeholder={messages['Table.PhoneNumber']} />

                    <Form.Field required>
                        <label>{messages['Crm.CallDateTime']}</label>
                        <DatePicker
                            locale={locale}
                            autoComplete="off"
                            label=''
                            placeholderText={messages['Crm.CallDateTime']}
                            showMonthDropdown showYearDropdown showTimeSelect dropdownMode='select'
                            dateFormat='DD.MM.YYYY HH:mm' selected={callForm.dateTime?moment(callForm.dateTime):null}
                            onChange={(v) => this.handleChange('dateTime', v)} />
                    </Form.Field>

                    <Form.Select
                        required
                        name='resultId'
                        fluid selection
                        label={messages['Crm.ResultOfCall']}
                        options={this.props.callResultOptions || []}
                        onChange={(e, v) => this.handleChange('callResultId', v)} />

                    {this.renderCallResultDependentField(messages)}
                </Form.Group>

                <Form.Group widths='equal'>
                    <Form.Field
                        control={TextArea}
                        onChange={(e, o) => this.handleChange('callNote', o)}
                        label={messages['Crm.NoteForCall']} placeholder={messages['Crm.NoteForCall']} />
                    <Form.Field />
                </Form.Group>
                <Divider />
                {this.renderDemoForm()}
                <Form.Field control={Button} color='blue' content='Сохранить' onClick={this.saveCall} />
            </Form>
    }

    saveCall = () => {
        let callForm = Object.assign({},this.state.callForm)
        const {currentPhone,reco} = this.props
        //callForm['phone'] = currentPhone
        callForm['phoneNumber'] = currentPhone.phoneNumber
        callForm['context'] = 'reco'
        callForm['contextId'] = reco.id
        this.props.saveCall(callForm)
    }

    onOpen(){
        console.log('onOpen')
    }

    onMount(){
        console.log('onMount')
    }

    onUnmount(){
        console.log('onUnmount')
    }

    handleClose = () => {
        this.props.togglePhoneModal(false)
        this.setState({
            callForm: {}
        })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.callForm){
            if(nextProps.callForm.id !== this.state.callForm){
                this.setState({
                    callForm: Object.assign({},nextProps.callForm)
                })
            }
        }
    }

    render (){
        const {messages} = this.props.intl
        const {reco, currentPhone,recommender} = this.props
        const panes = [
            { menuItem: messages['Crm.HistoryOfNumber'], render: this.renderNumberHistory },
            { menuItem: messages['Crm.AddingCall'], render: this.renderCallForm}
        ]
        return <Modal size={'fullscreen'} open={this.props.opened} closeOnDimmerClick={false} onClose={this.handleClose}>
                    <Modal.Header>
                        <Grid centered columns={2}>
                            <Grid.Column style={{fontSize:'12px'}}>
                                <Segment>
                                    {messages['Form.RecommenderFullName']}: <i style={{fontWeight:'normal'}}>{recommender.clientName}</i><br/>
                                    {messages['Table.PhoneNumber']}: {recommender.phones?recommender.phones.map(p => <span key={p.id} style={{marginRight:'5px'}}>{p.phoneNumber}</span>):''}<br/>
                                    {messages['Table.Address']}: <i style={{fontWeight:'normal'}}>{recommender.address}</i><br/>
                                    {messages['Table.Result']}: <i style={{fontWeight:'normal'}}>{recommender.demoResultName}</i><br/>
                                    {messages['Crm.AddInfo']}: <i style={{fontWeight:'normal'}}>{recommender.addInfo}</i><br/>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column style={{fontSize:'12px'}}>
                                <Segment>
                                    {messages['fioClient']}: <i style={{fontWeight:'normal'}}>{reco.clientName}</i><br/>
                                    {messages['Table.PhoneNumber']}: <i style={{fontWeight:'normal'}}>{currentPhone.phoneNumber}</i><br/>
                                    Prof: <i style={{fontWeight:'normal'}}>{reco.profession}</i>; {messages['Form.Reco.Relative']}: <i style={{fontWeight:'normal'}}>{reco.relativeName}</i>

                                </Segment>
                            </Grid.Column>
                        </Grid>
                    </Modal.Header>
                    <Modal.Content>
                        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.handleClose} negative>{messages['close']}</Button>
                    </Modal.Actions>
                </Modal>
    }
}

function mapStateToProps (state){
    return {
        opened: state.crmWspaceReducer.phoneModalOpened,
        historyItems: state.crmWspaceReducer.phoneNumberHistory,
        reco: state.crmWspaceReducer.phoneNumberReco,
        currentPhone: state.crmWspaceReducer.currentPhone,
        recommender: state.crmWspaceReducer.currentRecommender,
        callResultOptions:state.crmReco.callResultOptions,
        reasons:state.crmDemo.reasons,
        dealers: state.crmDemo.dealers,
        callForm: state.crmWspaceReducer.callForm
    }
}

export default connect(mapStateToProps,{
    togglePhoneModal,saveCall,getLocationOptionsByLanguage
})(injectIntl(WspacePhoneModal))
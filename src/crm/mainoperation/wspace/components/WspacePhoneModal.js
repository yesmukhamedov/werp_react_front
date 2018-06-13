import React,{Component} from 'react'
import { Modal,Button,Table,Grid, Rail,Form,Input,TextArea,Divider,Tab, Segment } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {togglePhoneModal} from '../actions/wspaceAction'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css"
require('moment/locale/ru');

class WspacePhoneModal extends Component{

    constructor(props){
        super(props)

        this.state = {
            callFrom: {},
            demoForm: {}
        }
    }

    handleChange = (name,data) => {
        console.log(name,data)
    }

    renderNumberHistory = () => {
        let {historyItems} = this.props
        if(!historyItems){
            historyItems = []
        }

        return <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>#</Table.HeaderCell>
                    <Table.HeaderCell>Компания</Table.HeaderCell>
                    <Table.HeaderCell>Филиал</Table.HeaderCell>
                    <Table.HeaderCell>Дата-время звонка</Table.HeaderCell>
                    <Table.HeaderCell>Звонил</Table.HeaderCell>
                    <Table.HeaderCell>Примечание</Table.HeaderCell>
                    <Table.HeaderCell>Результат</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {historyItems.map((item, idx) => {
                    return (
                        <Table.Row key={item.id}>
                            <Table.Cell>{idx + 1}</Table.Cell>
                            <Table.Cell>{item.bukrsName}</Table.Cell>
                            <Table.Cell>{item.branchName}</Table.Cell>
                            <Table.Cell>
                                {item.callDate?moment(item.callDate).format('DD.MM.YYYY HH:mm'):''}
                            </Table.Cell>
                            <Table.Cell>{item.callerName}</Table.Cell>
                            <Table.Cell>{item.note}</Table.Cell>
                            <Table.Cell>{item.resultName}</Table.Cell>
                        </Table.Row>
                    )
                })}
            </Table.Body>
        </Table>
    }

    renderCallResultDependentField = () => {
        return (null)
    }

    renderDemoForm = () => {
        return (null)
    }

    renderCallForm = () => {
        const {callFrom} = this.state

        return <Form>
                <Form.Group widths='equal'>
                    <Form.Field
                        value={this.props.currentPhone.phoneNumber}
                        readOnly control={Input}
                        label='Тел. номер' placeholder='Тел. номер' />

                    <Form.Field required>
                        <label>Дата-время звонка</label>
                        <DatePicker
                            label=''
                            placeholderText={'Дата-время звонка'}
                            showMonthDropdown showYearDropdown showTimeSelect dropdownMode='select'
                            dateFormat='DD.MM.YYYY HH:mm' selected={callFrom.callDate}
                            onChange={(v) => this.handleChange('callDate', v)} />
                    </Form.Field>

                    <Form.Select
                        required
                        name='resultId'
                        fluid selection
                        label='Результат звонка'
                        options={this.props.callResultOptions || []}
                        onChange={(e, v) => this.handleChange('callResultId', v)} />

                    {this.renderCallResultDependentField()}
                </Form.Group>

                <Form.Group widths='equal'>
                    <Form.Field
                        control={TextArea}
                        onChange={(e, o) => this.handleChange('callNote', o)}
                        label='Примечание звонка' placeholder='Примечание звонка' />
                    <Form.Field />
                </Form.Group>
                <Divider />
                {this.renderDemoForm()}
                <Form.Field control={Button} content='Сохранить' onClick={this.saveCall} />
            </Form>
    }

    render (){
        const {reco, currentPhone,recommender} = this.props
        const panes = [
            { menuItem: 'История номера', render: this.renderNumberHistory },
            { menuItem: 'Добавление звонка', render: this.renderCallForm}
        ]

        return <Modal size={'fullscreen'} open={this.props.opened}>
            <Modal.Header>
                <Grid centered columns={2}>
                    <Grid.Column style={{fontSize:'12px'}}>
                        <Segment>
                            Рекомендатель: <i style={{fontWeight:'normal'}}>{recommender.clientName}</i><br/>
                            Тел. ном: {recommender.phones?recommender.phones.map(p => <span key={p.id} style={{marginRight:'5px'}}>{p.phoneNumber}</span>):''}<br/>
                            Адр.: <i style={{fontWeight:'normal'}}>{recommender.address}</i><br/>
                            Результат: <i style={{fontWeight:'normal'}}>{recommender.demoResultName}</i><br/>
                            Доп. инфо: <i style={{fontWeight:'normal'}}>{recommender.addInfo}</i><br/>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column style={{fontSize:'12px'}}>
                        <Segment>
                            Клиент: <i style={{fontWeight:'normal'}}>{reco.clientName}</i><br/>
                            Тек. номер: <i style={{fontWeight:'normal'}}>{currentPhone.phoneNumber}</i><br/>
                            Проф: <i style={{fontWeight:'normal'}}>{reco.profession}</i>; Род: <i style={{fontWeight:'normal'}}>{reco.relativeName}</i>

                        </Segment>
                    </Grid.Column>
                </Grid>
            </Modal.Header>
            <Modal.Content>
                <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => this.props.togglePhoneModal(false)} negative>Закрыть</Button>
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
        reasons:state.crmDemo.reasons
    }
}

export default connect(mapStateToProps,{
    togglePhoneModal
})(WspacePhoneModal)
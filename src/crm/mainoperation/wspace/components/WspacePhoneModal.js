import React,{Component} from 'react'
import { Modal,Button,Table,Grid, Rail, Segment } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {togglePhoneModal} from '../actions/wspaceAction'
import {moment} from 'moment'

class WspacePhoneModal extends Component{

    renderNumberHistory = () => {
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
                {this.props.historyItems.map((item, idx) => {
                    return (
                        <Table.Row key={item.id}>
                            <Table.Cell>{idx + 1}</Table.Cell>
                            <Table.Cell>{item.bukrsName}</Table.Cell>
                            <Table.Cell>{item.branchName}</Table.Cell>
                            <Table.Cell>{item.callDate?moment(item.callDate).format('DD.MM.YYYY HH:mm'):''}</Table.Cell>
                            <Table.Cell>{item.callerName}</Table.Cell>
                            <Table.Cell>{item.note}</Table.Cell>
                            <Table.Cell>{item.resultName}</Table.Cell>
                        </Table.Row>
                    )
                })}
            </Table.Body>
        </Table>
    }

    render (){
        const {phone, reco, currentPhone,recommender} = this.props

        return <Modal size={'large'} open={this.props.opened}>
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
                {this.renderNumberHistory()}
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
        recommender: state.crmWspaceReducer.currentRecommender
    }
}

export default connect(mapStateToProps,{
    togglePhoneModal
})(WspacePhoneModal)
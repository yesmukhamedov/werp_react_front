import React, {Component} from 'react';
import {Link} from 'react-router'
import { Header,Container,Button,Segment,Grid,Table,Divider,Card,Modal,Form,Input } from 'semantic-ui-react'
import axios from 'axios';
import {ROOT_URL} from '../../../../utils/constants';
import RecoUpdateModal from './RecoUpdateModal';
import Phone from './Phone';

class RecoViewPage extends Component{

    constructor(props) {
        super(props)
        this.loadedSuccess = true;
        this.state = {
            reco:{},
            calls:[],
            demos:[],
            callResultOptions:[],
            callRefuseOptions:[],
            items:[],
            loading:false,
            updateModalOpened:false,
            showDeleteModal:false,
            showPhoneUpdateModal:false,
            formattedPhones:{}
        }

        this.renderActions = this.renderActions.bind(this);
        this.openUpdateModal = this.openUpdateModal.bind(this);
        this.onCloseUpdateModal = this.onCloseUpdateModal.bind(this);
        this.loadItem = this.loadItem.bind(this);
        this.loadCalls = this.loadCalls.bind(this);
        this.deleteModalTrigger = this.deleteModalTrigger.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.submitPhoneUpdate = this.submitPhoneUpdate.bind(this);
    }

    componentWillMount(){
        this.loadItem(this.props.params.id);
        this.loadCalls(this.props.params.id);

        axios.get(`${ROOT_URL}/api/reference/reasons/1`,{
            headers: {
                authorization: localStorage.getItem('token')}
        }).then((res) => {
            let loaded = res.data.map((item) => {
                return {
                    key:item.id,
                    text:item.name,
                    value:item.id
                }
            })

            this.setState({
                ...this.state,
                callRefuseOptions:loaded
            })
        }).catch((e) => {
            console.log(e);
        })

        axios.get(`${ROOT_URL}/api/crm/call/results`,{
            headers: {
                authorization: localStorage.getItem('token')}
        }).then((res) => {
            let loaded = Object.keys(res.data).map((k) => {
                return {
                    key:k,
                    text:res.data[k],
                    value:k
                }
            })

            this.setState({
                ...this.state,
                callResultOptions:loaded
            })
        }).catch((e) => {
            console.log(e);
        })
    }

    loadItem(id){
        axios.get(`${ROOT_URL}/api/crm/reco/` + id,{
            headers: {
                authorization: localStorage.getItem('token')}
        }).then((response) => {
            let formattedPhones = {};
            for(let i in response.data['phones']){
                formattedPhones['p_' + response.data['phones'][i]['id']] = this.formatPhoneNumber(response.data['phones'][i]['phoneNumber']);
            }
            this.setState({
                ...this.state,
                reco:response.data,
                formattedPhones:formattedPhones
            })
        }).catch(function(e){
            if(e.response && e.response.status && e.response.status === 404){
                //_this.loadedSuccess = false;
            }
            console.log(e);
        })
    }

    loadCalls(recoId){
        axios.get(`${ROOT_URL}/api/crm/call/by-context/reco/` + recoId,{
            headers: {
                authorization: localStorage.getItem('token')}
        }).then((response) => {
            this.setState({
                ...this.state,
                calls:response.data,
                demos:response.data.filter((item) => item.demoId && item.demoId > 0)
            });

        }).catch(function(e){
            if(e.response && e.response.status && e.response.status === 404){
                //_this.loadedSuccess = false;
            }
            console.log(e);
        })
    }

    deleteItem(){
        axios.delete(`${ROOT_URL}/api/crm/reco/` + this.state.reco.id,{
            headers: {
                authorization: localStorage.getItem('token')}
        }).then((response) => {
            window.location = '/crm/reco/current';
        }).catch(function(e){
            alert(e);
        })
    }

    deleteModalTrigger(showDeleteModal){
        this.setState({
            ...this.state,
            showDeleteModal:showDeleteModal
        })
    }

    renderDeleteConfirmModal(){
        return <Modal open={this.state.showDeleteModal}>
            <Modal.Header>ПРЕДУПРЕЖДЕНИЕ!</Modal.Header>
            <Modal.Content>
                <p>Удалятся все демонстрации, рекомендации и звонки связанные с данной рекомендацией!</p>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => this.deleteModalTrigger(false)} negative>
                    Отмена
                </Button>
                <Button onClick={this.deleteItem} positive icon='checkmark' labelPosition='right' content='Удалить' />
            </Modal.Actions>
        </Modal>
    }
    formatPhoneNumber(phoneNumber){
        if(!phoneNumber || phoneNumber.length === 0){
            return '';
        }

        let out = phoneNumber;
        if(phoneNumber.length > 8){
            out = phoneNumber.substring(0,3) + '-' + phoneNumber.substring(3,6) + '-' + phoneNumber.substring(6,8) + '-' + phoneNumber.substring(8,10);
        }else if(phoneNumber.length > 6){
            out = phoneNumber.substring(0,3) + '-' + phoneNumber.substring(3,6) + '-' + phoneNumber.substring(6,8);
        }else if(phoneNumber.length > 3){
            out = phoneNumber.substring(0,3) + '-' + phoneNumber.substring(3);
        }

        return out;
    }
    renderPhoneFormField(phone){
        return <Form.Field key={phone.id}>
            <label>Тел. номер</label>
            <Input label={{ basic:true,content:'+7'}} placeholder='705-224-26-45'
                   name={'p_' + phone.id} onChange={this.handlePhoneChange}
                   value={this.formatPhoneNumber(phone.phoneNumber)} />
        </Form.Field>
    }

    handlePhoneChange(a,b){
        let {reco} = this.state;
        let phones = reco.phones;
        let {name,value} = b;

        let existed = false;
        for(let k in  phones){
            if(name === 'p_' + phones[k]['id']){
                let v = value.replace(/[^0-9\.]+/g, '');
                phones[k]['phoneNumber'] = v.substring(0,10);
                existed = true;
                break;
            }
        }

        reco['phones'] = phones;

        this.setState({
            ...this.state,
            reco:reco
        });
    }

    submitPhoneUpdate(){
        const o = {"phones":this.state.reco.phones};
        axios.put(`${ROOT_URL}/api/crm/reco/update-phones/` + this.state.reco.id,
            { ...o },
            {
                headers: {
                    authorization: localStorage.getItem('token')
                }
        })
            .then((response) => {
                this.setState({
                    ...this.state,
                    showPhoneUpdateModal:false
                })
            }).catch((error) => {
            console.log(error);
        })
    }

    renderPhoneUpdateModal(){
        if(!this.state.reco.phones){
            return;
        }
        return <Modal open={this.state.showPhoneUpdateModal}>
            <Modal.Header>Редактирование тел. номеров</Modal.Header>
            <Modal.Content>
                <Form.Group widths='equal'>
                    {this.state.reco.phones.map((phone) => {
                        return this.renderPhoneFormField(phone);
                    })}
                </Form.Group>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => this.setState({...this.state,showPhoneUpdateModal:false})} negative>
                    Отмена
                </Button>
                <Button positive onClick={this.submitPhoneUpdate} icon='checkmark' labelPosition='right' content='Сохранить' />
            </Modal.Actions>
        </Modal>
    }

    renderActions(){
        return <div>
            <Link className={'ui icon button'} to={`/crm/reco/current`}>
                В список
            </Link>
            <Button onClick={this.openUpdateModal}>Редактировать</Button>
            <Button onClick={() => this.setState({...this.state,showPhoneUpdateModal:true})}>
                Редактировать тел. номера
            </Button>
            <Button color={'red'} onClick={() => this.deleteModalTrigger(true)}>Удалить</Button>
        </div>
    }

    openUpdateModal(){
        this.setState({
            ...this.state,
            updateModalOpened:true
        })
    }

    renderUpdateForm(){
        return '';
    }

    onOpenUpdateModal(){

    }

    renderPhones(phones){
        if(!phones){
            return;
        }

        return <div>
            {phones.map((p) => {
                return <Phone
                    callRefuseOptions={this.state.callRefuseOptions}
                    callResultOptions={this.state.callResultOptions}
                    key={p.id} phoneNumber={p.phoneNumber} phoneId={p.id}
                    onCallSaved={this.onCallSaved}
                />
            })}
        </div>;
    }

    renderRecoTable(){
        let {reco} = this.state;
        return <Card fluid>
            <Card.Content>
                <Card.Header>
                    Основная информация
                </Card.Header>
            </Card.Content>
            <Card.Content>
                <Table celled striped>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                <Header as={'H4'}>Компания</Header>
                            </Table.Cell>
                            <Table.Cell>
                                {reco.bukrsName}
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                <Header as={'H4'}>Филиал</Header>
                            </Table.Cell>
                            <Table.Cell>
                                {reco.branchName}
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                <Header as={'H4'}>Ответсвенный сотрудник</Header>
                            </Table.Cell>
                            <Table.Cell>
                                {reco.responsibleName}
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                <Header as={'H4'}>ФИО супруг</Header>
                            </Table.Cell>
                            <Table.Cell>
                                {reco.clientName}
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                <Header as={'H4'}>Район</Header>
                            </Table.Cell>
                            <Table.Cell>
                                {reco.districtName}
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                <Header as={'H4'}>Тел номера</Header>
                            </Table.Cell>
                            <Table.Cell>
                                {this.renderPhones(reco.phones)}
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                <Header as={'H4'}>Рекомендатель</Header>
                            </Table.Cell>
                            <Table.Cell>
                                {reco.recommenderName}
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                <Header as={'H4'}>Владелец</Header>
                            </Table.Cell>
                            <Table.Cell>
                                {reco.ownerName}
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                <Header as={'H4'}>Филиал владельца</Header>
                            </Table.Cell>
                            <Table.Cell>
                                {reco.ownerBranchName}
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                <Header as={'H4'}>Род. отношение</Header>
                            </Table.Cell>
                            <Table.Cell>
                                {reco.relative}
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                <Header as={'H4'}>Звонит будет</Header>
                            </Table.Cell>
                            <Table.Cell>
                                {reco.callerIsDealer == 1?'ДИЛЕР':'СЕКРЕТАРЬ'}
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                <Header as={'H4'}>Примечание</Header>
                            </Table.Cell>
                            <Table.Cell>
                                {reco.note}
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                <Header as={'H4'}>Доп. данные</Header>
                            </Table.Cell>
                            <Table.Cell>
                                {''}
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                <Header as={'H4'}>Категория</Header>
                            </Table.Cell>
                            <Table.Cell>
                                {reco.categoryName}
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                <Header as={'H4'}>Статус</Header>
                            </Table.Cell>
                            <Table.Cell>
                                {reco.statusName}
                            </Table.Cell>
                        </Table.Row>

                    </Table.Body>
                </Table>
            </Card.Content>
        </Card>
    }

    renderCallsTable(){
        let {calls} = this.state;

        return <Card fluid>
            <Card.Content>
                <Card.Header>
                    Звонки
                </Card.Header>
            </Card.Content>
            <Card.Content>
                <Table celled striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>#</Table.HeaderCell>
                            <Table.HeaderCell>Филиал</Table.HeaderCell>
                            <Table.HeaderCell>Дата-время звонка</Table.HeaderCell>
                            <Table.HeaderCell>Звонил(а)</Table.HeaderCell>
                            <Table.HeaderCell>Номер</Table.HeaderCell>
                            <Table.HeaderCell>Результат</Table.HeaderCell>
                            <Table.HeaderCell>Примечание</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {calls.map((item,idx) => {
                            return <Table.Row key={idx}>
                                    <Table.Cell>{idx+1}</Table.Cell>
                                    <Table.Cell>{item.branchName}</Table.Cell>
                                    <Table.Cell>{item.callDate}</Table.Cell>
                                    <Table.Cell>{item.callerName}</Table.Cell>
                                    <Table.Cell>{item.phoneNumber}</Table.Cell>
                                    <Table.Cell>{item.callResultName}</Table.Cell>
                                    <Table.Cell>{item.callNote}</Table.Cell>
                                </Table.Row>
                        })}
                    </Table.Body>
                </Table>
            </Card.Content>
        </Card>
    }

    renderDemosTable(){
        let {demos} = this.state;

        return <Card fluid>
            <Card.Content>
                <Card.Header>
                    Демонстрации
                </Card.Header>
            </Card.Content>
            <Card.Content>
                <Table celled striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>#</Table.HeaderCell>
                            <Table.HeaderCell>Филиал</Table.HeaderCell>
                            <Table.HeaderCell>Клиент</Table.HeaderCell>
                            <Table.HeaderCell>Дата-время</Table.HeaderCell>
                            <Table.HeaderCell>Звонил(а)</Table.HeaderCell>
                            <Table.HeaderCell>Результат</Table.HeaderCell>
                            <Table.HeaderCell>Примечание</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {demos.map((item,idx) => {
                            return <Table.Row key={idx}>
                                <Table.Cell>{idx+1}</Table.Cell>
                                <Table.Cell>{item.branchName}</Table.Cell>
                                <Table.Cell>{item.demoClientName}</Table.Cell>
                                <Table.Cell>{item.demoDate}</Table.Cell>
                                <Table.Cell>{item.callerName}</Table.Cell>
                                <Table.Cell>{item.demoResultName}</Table.Cell>
                                <Table.Cell>{item.demoNote}</Table.Cell>
                            </Table.Row>
                        })}
                    </Table.Body>
                </Table>
            </Card.Content>
        </Card>
    }

    onCloseUpdateModal(){
        this.setState({
            ...this.state,
            updateModalOpened:false
        });
        this.loadItem(this.state.reco.id);
    }

    render(){
        return (
            <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
                <Segment clearing>
                    <Header as='h2' floated='left'>
                        Рекомендация № {this.state.reco.id}
                    </Header>
                </Segment>
                {this.renderActions()}
                <RecoUpdateModal
                    modalOpened={this.state.updateModalOpened}
                    reco={this.state.reco}
                    onClose={this.onCloseUpdateModal}
                />
                {this.renderPhoneUpdateModal()}
                <Divider/>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={6}>
                            {this.renderRecoTable()}
                        </Grid.Column>

                        <Grid.Column width={10}>
                            {this.renderCallsTable()}
                            {this.renderDemosTable()}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                {this.renderDeleteConfirmModal()}
            </Container>
        )
    }
}

export default RecoViewPage;
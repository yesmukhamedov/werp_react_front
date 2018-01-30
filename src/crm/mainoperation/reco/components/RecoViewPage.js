import React, {Component} from 'react';
import {Link} from 'react-router'
import { Header,Container,Button,Segment,Grid,Table,Divider,Card } from 'semantic-ui-react'
import axios from 'axios';
import {ROOT_URL} from '../../../../utils/constants';
import RecoUpdateModal from './RecoUpdateModal';

class RecoViewPage extends Component{

    constructor(props) {
        super(props)
        this.loadedSuccess = true;
        this.state = {
            reco:{},
            calls:[],
            callResultOptions:[],
            callRefuseOptions:[],
            items:[],
            loading:false,
            updateModalOpened:false
        }

        this.renderActions = this.renderActions.bind(this);
        this.openUpdateModal = this.openUpdateModal.bind(this);
        this.onCloseUpdateModal = this.onCloseUpdateModal.bind(this);
        this.loadItem = this.loadItem.bind(this);
        this.loadCalls = this.loadCalls.bind(this);
    }

    componentWillMount(){
        this.loadItem(this.props.params.id);
        this.loadCalls(this.props.params.id);
    }

    loadItem(id){
        axios.get(`${ROOT_URL}/api/crm/reco/` + id,{
            headers: {
                authorization: localStorage.getItem('token')}
        }).then((response) => {
            this.setState({
                ...this.state,
                reco:response.data
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
                calls:response.data
            })
        }).catch(function(e){
            if(e.response && e.response.status && e.response.status === 404){
                //_this.loadedSuccess = false;
            }
            console.log(e);
        })
    }

    renderActions(){
        return <div>
            <Link className={'ui icon button'} to={`/crm/reco/current`}>
                В список
            </Link>
            <Button onClick={this.openUpdateModal}>Редактировать</Button>
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
                return <div key={p.id}>{' ' + p.phoneNumber}</div>
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

    renderDemoRecosTable(){
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
                            <Table.HeaderCell>Компания</Table.HeaderCell>
                            <Table.HeaderCell>Филиал</Table.HeaderCell>
                            <Table.HeaderCell>Дата-время звонка</Table.HeaderCell>
                            <Table.HeaderCell>Звонил</Table.HeaderCell>
                            <Table.HeaderCell>Номер</Table.HeaderCell>
                            <Table.HeaderCell>Результат</Table.HeaderCell>
                            <Table.HeaderCell>Примечание</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {calls.map((item,idx) => {
                            return <Table.Row key={item.id}>
                                    <Table.Cell>{idx+1}</Table.Cell>
                                    <Table.Cell>{item.clientName}</Table.Cell>
                                    <Table.Cell>{item.statusName}</Table.Cell>
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
                <Divider/>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            {this.renderRecoTable()}
                        </Grid.Column>

                        <Grid.Column width={8}>
                            {this.renderDemoRecosTable()}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}

export default RecoViewPage;
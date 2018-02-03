import React, {Component} from 'react';
import {Link} from 'react-router'
import ReactTable from 'react-table';
import { Tab,Header,Container,Label,Icon,Button,Segment,Grid,Table,Divider,Card,Modal } from 'semantic-ui-react'
import axios from 'axios';
import {ROOT_URL} from '../../../../utils/constants';
import moment from 'moment';
import DemoUpdateModal from './DemoUpdateModal';
import DemoCreateModal from './DemoCreateModal';

class DemoViewPage extends Component{

    constructor(props) {
        super(props)
        this.loadedSuccess = true;
        this.state = {
            demo:{},
            callResultOptions:[],
            callRefuseOptions:[],
            items:[],
            loading:false,
            updateModalOpened:false,
            createModalOpened:false
        }

        this.renderActions = this.renderActions.bind(this);
        this.renderUpdateModal = this.renderUpdateModal.bind(this);
        this.openUpdateModal = this.openUpdateModal.bind(this);
        this.onCloseUpdateModal = this.onCloseUpdateModal.bind(this);
        this.loadItem = this.loadItem.bind(this);
        this.openCreateModal = this.openCreateModal.bind(this);
        this.onCloseCreateModal = this.onCloseCreateModal.bind(this);
    }

    componentWillMount(){
        this.loadItem(this.props.params.id);
    }

    loadItem(id){
        axios.get(`${ROOT_URL}/api/crm/demo/` + id,{
            headers: {
                authorization: localStorage.getItem('token')}
        }).then((response) => {
            this.setState({
                ...this.state,
                demo:response.data['demo']
            })
        }).catch(function(e){
            if(e.response && e.response.status && e.response.status === 404){
                //_this.loadedSuccess = false;
            }
            console.log(e);
        })
    }

    getSourceLink(demo){
        if(demo.visitId > 0){
            return <Link className={'button'} to={`/crm/visit/view/` + demo.visitId}>
                    Визит № {demo.visitId}
                </Link>
        }else if(demo.recoId > 0){
            return <Link className={'button'} to={`/crm/reco/view/` + demo.recoId}>
                Рекомендация № {demo.recoId}
            </Link>
        }else{
            return;
        }
    }

    renderActions(){
        return <div>
            <Link className={'ui icon button'} to={`/crm/demo/current`}>
                В список
            </Link>
            <Button>Печать</Button>
            <Button onClick={this.openUpdateModal}>Редактировать</Button>
            {this.state.demo.resultId === 0 ?'':<Link className={'ui icon button'} to={`/crm/reco/create/demo/` + this.state.demo.id}>
                    Добавить рекомендации
                </Link>}

            <Button onClick={this.openCreateModal}>Добавить демо</Button>
        </div>
    }

    openUpdateModal(){
        this.setState({
            ...this.state,
            updateModalOpened:true
        })
    }

    openCreateModal(){
        this.setState({
            ...this.state,
            createModalOpened:true
        })
    }

    renderUpdateForm(){
        return '';
    }

    onOpenUpdateModal(){

    }

    renderUpdateModal(){
        return (
            <Modal size={'small'} open={this.state.updateModalOpened} onClose={this.close} onOpen={this.onOpenUpdateModal()}>
                <Modal.Header>Редактирование демонстрации</Modal.Header>
                <Modal.Content>
                    {this.renderUpdateForm()}
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={this.closeUpdateModal}>Отмена</Button>
                    <Button positive icon='checkmark' labelPosition='right' content='Сохранить' />
                </Modal.Actions>
            </Modal>
        )
    }

    renderDemoTable(){
        let {demo} = this.state;
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
                                {demo.bukrsName}
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                <Header as={'H4'}>Филиал</Header>
                            </Table.Cell>
                            <Table.Cell>
                                {demo.branchName}
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                <Header as={'H4'}>Дилер</Header>
                            </Table.Cell>
                            <Table.Cell>
                                {demo.dealerName}
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                <Header as={'H4'}>Назначел(а)</Header>
                            </Table.Cell>
                            <Table.Cell>
                                {demo.appointerName}
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                <Header as={'H4'}>Номер телефона</Header>
                            </Table.Cell>
                            <Table.Cell>
                                {demo.phoneNumber}
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                <Header as={'H4'}>Источник</Header>
                            </Table.Cell>
                            <Table.Cell>
                                {this.getSourceLink(demo)}
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                <Header as={'H4'}>Дата-время проведения</Header>
                            </Table.Cell>
                            <Table.Cell>
                                {moment(demo.dateTime).format('DD.MM.YYYY H:mm')}
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                <Header as={'H4'}>Клиент</Header>
                            </Table.Cell>
                            <Table.Cell>
                                {demo.clientName}
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                <Header as={'H4'}>Адрес</Header>
                            </Table.Cell>
                            <Table.Cell>
                                {demo.address}
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                <Header as={'H4'}>Результат демо</Header>
                            </Table.Cell>
                            <Table.Cell>
                                {demo.resultName}
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                <Header as={'H4'}>Причина</Header>
                            </Table.Cell>
                            <Table.Cell>
                                {demo.reasonName}
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                <Header as={'H4'}>Примечание</Header>
                            </Table.Cell>
                            <Table.Cell>
                                {demo.note}
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                <Header as={'H4'}>№ договора</Header>
                            </Table.Cell>
                            <Table.Cell>
                                {demo.contractNumber}
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                <Header as={'H4'}>Дата продажи</Header>
                            </Table.Cell>
                            <Table.Cell>
                                {demo.saleDate?moment(demo.saleDate).format('DD.MM.YYYY'):''}
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                <Header as={'H4'}>Дата-время создания</Header>
                            </Table.Cell>
                            <Table.Cell>
                                {moment(demo.createdAt).format('DD.MM.YYYY H:mm')}
                            </Table.Cell>
                        </Table.Row>

                    </Table.Body>
                </Table>
            </Card.Content>
        </Card>
    }

    renderDemoRecosTable(){
        let {demo} = this.state;
        if(!demo.recos){
            return;
        }
        return <Card fluid>
            <Card.Content>
                <Card.Header>
                    Рекомендации
                </Card.Header>
            </Card.Content>
            <Card.Content>
                <Table celled striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>#</Table.HeaderCell>
                            <Table.HeaderCell>ФИО супруг</Table.HeaderCell>
                            <Table.HeaderCell>Статус</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {demo.recos.map((item,idx) => {
                            return <Table.Row key={item.id}>
                                    <Table.Cell>{idx+1}</Table.Cell>
                                    <Table.Cell>{item.clientName}</Table.Cell>
                                    <Table.Cell>{item.statusName}</Table.Cell>
                                <Table.Cell><Link className={'ui icon button mini'} to={`/crm/reco/view/` + item.id}>
                                    Просмотр
                                </Link></Table.Cell>
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
        this.loadItem(this.state.demo.id);
    }

    onCloseCreateModal(){
        this.setState({
            ...this.state,
            createModalOpened:false
        });
        this.loadItem(this.state.demo.id);
    }

    render(){
        return (
            <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
                <Segment clearing>
                    <Header as='h2' floated='left'>
                        Демокарта № {this.state.demo.id}
                    </Header>
                </Segment>
                {this.renderActions()}
                <DemoUpdateModal
                    modalOpened={this.state.updateModalOpened}
                    demo={this.state.demo}
                    onClose={this.onCloseUpdateModal}
                />
                <DemoCreateModal
                    modalOpened={this.state.createModalOpened}
                    parentId={this.state.demo.id}
                    visitId={0}
                    recoId={0}
                    dealerId={this.state.demo.dealerId}
                    onClose={this.onCloseCreateModal}
                />
                <Divider/>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            {this.renderDemoTable()}
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

export default DemoViewPage;
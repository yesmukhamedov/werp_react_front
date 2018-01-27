import React, {Component} from 'react';
import {Link} from 'react-router'
import ReactTable from 'react-table';
import { Tab,Header,Container,Label,Icon,Button,Segment,Grid,Table,Divider,Card,Modal } from 'semantic-ui-react'
import axios from 'axios';
import {ROOT_URL} from '../../../../utils/constants';
import moment from 'moment';
import RecoUpdateModal from './VisitUpdateModal';

class VisitViewPage extends Component{

    constructor(props) {
        super(props)
        this.loadedSuccess = true;
        this.state = {
            visit:{},
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
        axios.get(`${ROOT_URL}/api/crm/visit/` + id,{
            headers: {
                authorization: localStorage.getItem('token')}
        }).then((response) => {
            this.setState({
                ...this.state,
                visit:response.data
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
            <Link className={'ui icon button'} to={`/crm/visit/archive`}>
                В список
            </Link>
            {/*<Button onClick={this.openUpdateModal}>Редактировать</Button>*/}
            <Link className={'ui icon button'} to={`/crm/reco/create/visit/` + this.state.visit.id}>
                Добавить рекомендации
            </Link>
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
        let {visit} = this.state;
        return <Card fluid>
            <Card.Content>
                <Card.Header>
                    Данные по визиту
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
                                {visit.bukrsName}
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                <Header as={'H4'}>Филиал</Header>
                            </Table.Cell>
                            <Table.Cell>
                                {visit.branchName}
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                <Header as={'H4'}>Посетитель</Header>
                            </Table.Cell>
                            <Table.Cell>
                                {visit.visitorName}
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                <Header as={'H4'}>Дата посещения</Header>
                            </Table.Cell>
                            <Table.Cell>
                                {moment(visit.docDate).format('DD.MM.YYYY')}
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                <Header as={'H4'}>Адрес</Header>
                            </Table.Cell>
                            <Table.Cell>
                                {visit.address}
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                <Header as={'H4'}>ФИО супруг</Header>
                            </Table.Cell>
                            <Table.Cell>
                                {visit.clientName}
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                <Header as={'H4'}>Примечание</Header>
                            </Table.Cell>
                            <Table.Cell>
                                {visit.note}
                            </Table.Cell>
                        </Table.Row>

                    </Table.Body>
                </Table>
            </Card.Content>
        </Card>
    }

    renderVisitRecosTable(){
        let {visit} = this.state;
        if(!visit.recos){
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
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {visit.recos.map((item,idx) => {
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
        this.loadItem(this.state.visit.id);
    }

    render(){
        return (
            <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
                <Segment clearing>
                    <Header as='h2' floated='left'>
                        Визит № {this.state.visit.id}
                    </Header>
                </Segment>
                {this.renderActions()}
                <RecoUpdateModal
                    modalOpened={this.state.updateModalOpened}
                    reco={this.state.visit}
                    onClose={this.onCloseUpdateModal}
                />
                <Divider/>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            {this.renderRecoTable()}
                        </Grid.Column>

                        <Grid.Column width={8}>
                            {this.renderVisitRecosTable()}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}

export default VisitViewPage;
import React, {Component} from 'react';
import {Link} from 'react-router'
import ReactTable from 'react-table';
import { Tab,Header,Container,Label,Icon,Button,Segment,Table } from 'semantic-ui-react'
import axios from 'axios';
import {ROOT_URL} from '../../../../utils/constants';
import Phone from './Phone';
import moment from 'moment';

const categoryButtons = {
    1:'green',
    2:'olive',
    3:'grey'
};
class RecoArchivePage extends Component{

    constructor(props) {
        super(props)
        this.loadedSuccess = true;
        this.state = {
            callResultOptions:[],
            callRefuseOptions:[],
            items:[],
            loading:false
        }

        this.renderTable = this.renderTable.bind(this);
        this.renderTableHeader = this.renderTableHeader.bind(this);
        this.renderTableBody = this.renderTableBody.bind(this);
        this.renderItems = this.renderItems.bind(this);
    }

    componentWillMount(){
        this.setState({...this.state,loading:true})
        axios.get(`${ROOT_URL}/api/crm/reco/archive?page=1&sort=statusId`,{
            headers: {
                authorization: localStorage.getItem('token')}
        }).then((res) => {
            this.setState({
                ...this.state,
                items:res.data,
                loading:false
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
    }

    renderPhoneNumbers(recoId,phones){
        return <div>
            {phones.map((p) => {
                return <Phone
                    callRefuseOptions={this.state.callRefuseOptions}
                    callResultOptions={this.state.callResultOptions}
                    key={p.id} phoneNumber={p.phoneNumber} phoneId={p.id}
                    context="reco" contextId={recoId}
                />
            })}
        </div>;
    }

    renderTableHeader(){
        return (
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>№</Table.HeaderCell>
                    <Table.HeaderCell>ФИО супруг</Table.HeaderCell>
                    <Table.HeaderCell>Отв. сотрудник</Table.HeaderCell>
                    <Table.HeaderCell>Категория</Table.HeaderCell>
                    <Table.HeaderCell>Статус</Table.HeaderCell>
                    <Table.HeaderCell>Результат демо</Table.HeaderCell>
                    <Table.HeaderCell>Дата рекомендации</Table.HeaderCell>
                    <Table.HeaderCell>Действия</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
        )
    }

    renderTableRow(item){
        return <Table.Row key={item.id}>
            <Table.Cell>{item.id}</Table.Cell>
            <Table.Cell>{item.clientName}</Table.Cell>
            <Table.Cell>{item.responsibleName}</Table.Cell>
            <Table.Cell>{item.categoryName}</Table.Cell>
            <Table.Cell>{item.statusName}</Table.Cell>
            <Table.Cell negative>None</Table.Cell>
            <Table.Cell>{moment(item.docDate).format('DD.MM.YYYY')}</Table.Cell>
            <Table.Cell></Table.Cell>
        </Table.Row>
    }

    renderItems(){
        return (
            <div>
                <ReactTable
                    loading={this.state.loading}
                    data={this.state.items}
                    columns={[
                        {
                            Header:"Клиент",
                            accessor:"clientName"
                        },
                        {
                            Header:"Рекомендатель",
                            accessor: "recommenderName"
                        },
                        {
                            Header:"Дата рекомендации",
                            accessor: "docDate"
                        },
                        {
                            Header:"Тел. номера",
                            id:"phoneNumbers",
                            accessor: row=>this.renderPhoneNumbers(row.id,row.phones)
                        },
                        {
                            Header:"Отв. сотрудник",
                            accessor: "responsibleName"
                        },
                        {
                            Header:"Статус",
                            accessor: "statusName"
                        }
                    ]}
                    defaultPageSize={50}
                    filterable
                    className="-striped -highlight">

                </ReactTable>
            </div>
        )
    }

    renderTableBody(){
        return (
            <Table.Body>
                {this.state.items.map((item) => {
                    return this.renderTableRow(item);
                })}
            </Table.Body>
        )
    }

    renderTable(){
        return (
            <Table celled>
                {this.renderTableHeader()}
                {this.renderTableBody()}
            </Table>
        )
    }

    render(){
        return (
            <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
                <Segment clearing>
                    <Header as='h2' floated='left'>
                        Архив рекомендации
                    </Header>
                    <Link className={'ui icon button primary right floated'} to={`/crm/reco/create`}>
                        <Icon name='plus' /> Добавить
                    </Link>
                </Segment>
                {this.renderItems()}
            </Container>
        )
    }
}

export default RecoArchivePage;
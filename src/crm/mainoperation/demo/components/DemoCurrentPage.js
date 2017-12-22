import React, {Component} from 'react';
import {Link} from 'react-router'
import ReactTable from 'react-table';
import { Tab,Header,Container,Label,Icon,Button,Segment } from 'semantic-ui-react'
import axios from 'axios';
import {ROOT_URL} from '../../../../utils/constants';
import Phone from './Phone';

const categoryButtons = {
    1:'green',
    2:'olive',
    3:'grey'
};
class DemoCurrentPage extends Component{

    constructor(props) {
        super(props)
        this.loadedSuccess = true;
        this.state = {
            callResultOptions:[],
            callRefuseOptions:[],
            usedItems:[],
            newItems:[],
            doneItems:[]
        }

        this.renderTabUsed = this.renderTabUsed.bind(this);
        this.renderTabNew = this.renderTabNew.bind(this);
        this.renderTabDemoDone = this.renderTabDemoDone.bind(this);
    }

    componentWillMount(){
        axios.get(`${ROOT_URL}/api/crm/reco/current/used`,{
            headers: {
                authorization: localStorage.getItem('token')}
        }).then((res) => {
            this.setState({
                ...this.state,
                usedItems:res.data
            })
        }).catch((e) => {
            console.log(e);
        })

        axios.get(`${ROOT_URL}/api/crm/reco/current/new`,{
            headers: {
                authorization: localStorage.getItem('token')}
        }).then((res) => {
            this.setState({
                ...this.state,
                newItems:res.data
            })
        }).catch((e) => {
            console.log(e);
        })

        axios.get(`${ROOT_URL}/api/crm/reco/current/demo-done`,{
            headers: {
                authorization: localStorage.getItem('token')}
        }).then((res) => {
            this.setState({
                ...this.state,
                doneItems:res.data
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

    renderPhoneCall(e,d){
        console.log(e);
        console.log(d);
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

    renderTable(items){
        return (
            <div>
                <ReactTable
                    data={items}
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
                            Header:"Дата звонка",
                            accessor: "callDate"
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
                            Header:"Звонит",
                            accessor: "callerName"
                        },
                        {
                            Header:"Примечание",
                            accessor: "note"
                        },
                        {
                            Header:"Категория",
                            accessor: "categoryName",
                            //id:"categoryId",
                            //Cell:row => <Button color={categoryButtons[row.id]}>{row.id}</Button>
                        },
                        {
                            Header:"Статус",
                            accessor: "statusName"
                        }
                    ]}

                    filterable
                    className="-striped -highlight">

                </ReactTable>
            </div>
        )
    }

    renderTabDemoDone(){
        return this.renderTable(this.state.doneItems);
    }

    renderTabNew(){
        return this.renderTable(this.state.newItems);
    }

    renderTabUsed(){
        return this.renderTable(this.state.usedItems)
    }

    render(){
        const panes = [
            { menuItem: 'Использованные', render:this.renderTabUsed },
            { menuItem: 'Новые', render: this.renderTabNew },
            { menuItem: 'Пройденные (для перезвона)', render: this.renderTabDemoDone },
        ]
        return (
            <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
                <Segment clearing>
                    <Header as='h2' floated='left'>
                        Текущие рекомендации
                    </Header>
                    <Link className={'ui icon button primary right floated'} to={`/crm/reco/create`}>
                        <Icon name='plus' /> Добавить
                    </Link>
                </Segment>
                <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
            </Container>
        )
    }
}

export default RecoCurrentPage;
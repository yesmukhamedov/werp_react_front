import React, {Component} from 'react';
import styles from '../css/recoStyles.css';
import ReactTable from 'react-table';
import { Tab,Header,Container,Label,Icon } from 'semantic-ui-react'
import axios from 'axios';
import {ROOT_URL} from '../../../../utils/constants';
import Phone from './Phone';

const testData = [
    {
        id:'ID1',
        clientName:'Firstname1',
        recommenderName:'Lastname1',
        callDate:'',
        phoneNumbers:'',
        responsible:'',
        caller:'',
        note:'',
        category:'',
        status:''
    }
];

class RecoCurrentPage extends Component{

    constructor(props) {
        super(props)
        this.loadedSuccess = true;
        this.state = {
            callResultOptions:[],
            callRefuseOptions:[],
            usedItems:[]
        }

        this.renderTab1 = this.renderTab1.bind(this);
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

    renderTab1(){
        return (
            <div>
                <ReactTable
                    data={this.state.usedItems}
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
                            accessor: "categoryName"
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

    render(){
        const panes = [
            { menuItem: 'Использованные', render:this.renderTab1 },
            { menuItem: 'Новые', render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane> },
            { menuItem: 'Пройденные (для перезвона)', render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane> },
        ]
        return (
            <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
                <Header>Рекомендации</Header>
                <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
            </Container>
        )
    }
}

export default RecoCurrentPage;
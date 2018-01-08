import React, {Component} from 'react';
import {Link} from 'react-router'
import ReactTable from 'react-table';
import { Tab,Header,Container,Label,Icon,Button,Segment,Menu,Dropdown } from 'semantic-ui-react'
import axios from 'axios';
import {ROOT_URL} from '../../../../utils/constants';
import moment from 'moment';

const categoryButtons = {
    1:'green',
    2:'olive',
    3:'grey'
};
class DemoArchivePage extends Component{

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
    }

    componentWillMount(){
        this.setState({...this.state,loading:true})
        axios.get(`${ROOT_URL}/api/crm/demo/archive`,{
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

    renderPhoneCall(e,d){
        console.log(e);
        console.log(d);
    }

    renderTable(){
        return (
            <div>
                <ReactTable
                    loading={this.state.loading}
                    data={this.state.items}
                    columns={[
                        {
                            Header:"№",
                            accessor:"id",
                            maxWidth:100
                        },
                        {
                            Header:"Клиент",
                            accessor: "clientName"
                        },
                        {
                            Header:"Адрес",
                            accessor: "address"
                        },
                        {
                            Header:"Дата-время",
                            accessor: "dateTime",
                            Cell:row => moment(row.value).format('DD.MM.YYYY HH:mm')
                        },
                        {
                            Header:"Дилер",
                            accessor: "dealerName"
                        },
                        {
                            Header:"Категория",
                            accessor: "categoryName",
                            //id:"categoryId",
                            //Cell:row => <Button color={categoryButtons[row.id]}>{row.id}</Button>
                        },
                        {
                            Header:"Примечание",
                            accessor: "note"
                        },

                        {
                            Header:"Результат",
                            accessor: "resultName"
                        },
                        {
                            Header:"Действия",
                            accessor:"id",
                            Cell:row => (
                                <Link className={'ui icon button'} to={`/crm/demo/view/` + row.value}>
                                    Просмотр
                                </Link>
                            )
                        }
                    ]}

                    filterable
                    className="-striped -highlight">

                </ReactTable>
            </div>
        )
    }

    render(){
        return (
            <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
                <Segment clearing>
                    <Header as='h2' floated='left'>
                        Архив демонстрации группы
                    </Header>
                </Segment>
                {this.renderTable()}
            </Container>
        )
    }
}

export default DemoArchivePage;
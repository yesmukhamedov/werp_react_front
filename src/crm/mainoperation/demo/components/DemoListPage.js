import React, { Component } from 'react';
import {Link} from 'react-router'
import axios from 'axios';
import {Container,Divider,Menu,Table,Icon,Header,Button,Form,Input,Segment,Grid} from 'semantic-ui-react';
import DatePicker from "react-datepicker";
import ReactTable from 'react-table';
import {ROOT_URL} from '../../../../utils/constants';

const bukrsOptions = [
    {
        key:"1000",
        text:"Aura",
        value:"1000"
    },
    {
        key:"2000",
        text:"GreenLight",
        value:"2000"
    }
];

const yearOptions = [
    {
        key:2017,
        text:2017,
        value:2017
    },
    {
        key:2018,
        text:2018,
        value:2018
    },
    {
        key:2019,
        text:2019,
        value:2019
    }
];

const monthOptions = [
    {
        key:1,
        text:'Январь',
        value:1
    },
    {
        key:2,
        text:'Февраль',
        value:2
    },
    {
        key:3,
        text:'Март',
        value:3
    },
    {
        key:4,
        text:'Апрель',
        value:4
    },
    {
        key:5,
        text:'Май',
        value:5
    },
    {
        key:6,
        text:'Июнь',
        value:6
    },
    {
        key:7,
        text:'Июль',
        value:7
    },
    {
        key:8,
        text:'Август',
        value:8
    },
    {
        key:9,
        text:'Сентябрь',
        value:9
    },
    {
        key:10,
        text:'Октябрь',
        value:10
    },
    {
        key:11,
        text:'Ноябрь',
        value:11
    },
    {
        key:12,
        text:'Декабрь',
        value:12
    }
];
const currentDate = new Date();
class DemoListPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            items:[],
            branchOptions:[],
            managerOptions:[],
            dealerOptions:[],
            resultOptions:[],
            btnLoading:false,
            queryParams:{
                bukrs:'',
                branchIds:[],
                managerId:0,
                dealerId:0,
                resultIds:[],
                year:0,
                month:0
            }
        }

        this.handleDropdown = this.handleDropdown.bind(this);
        this.loadBranches = this.loadBranches.bind(this);
        this.loadItems = this.loadItems.bind(this);
        this.getLoadedManagers = this.getLoadedManagers.bind(this);
    }

    loadBranches(bukrs){
        axios.get(`${ROOT_URL}/api/reference/branches/` + bukrs,{
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then((response) => {
                let loaded = response.data.map((it) => {
                    return {
                        key:it.branch_id,
                        text:it.text45,
                        value:it.branch_id
                    }
                })
                this.setState({
                    ...this.state,
                    branchOptions:loaded
                })
            }).catch((error) => {
            console.log(error)
        })
    }

    getLoadedManagers(branchId){
        axios.get(`${ROOT_URL}/api/hr/pyramid/managers/by-branch/` + branchId,{
            headers: {
                authorization: localStorage.getItem('token')
            },
            params:{
                year:this.state.queryParams.year,
                month:this.state.queryParams.month
            }
        })
            .then((response) => {
                let result = Object.keys(response.data).map((key) => {
                    return {
                        key:key,
                        text:response.data[key],
                        value:key
                    }
                });

                this.setState({
                    ...this.state,
                    managerOptions:result
                })
            }).catch((error) => {
            console.log(error)
        })
    }

    handleDropdown(e,o){
        let {name,value} = o;
        let {queryParams,managerOptions} = this.state;
        switch (name){
            case 'bukrs':
                queryParams[name] = value;
                this.loadBranches(value);
                break;

            case 'branchIds':
                queryParams[name] = value;

                if(value.length == 1){
                    let r = this.getLoadedManagers(value);
                }else{
                    managerOptions = [];
                }
                break;

            case 'resultIds':
                queryParams[name] = value;
                break;

            case 'year':
            case 'month':
                queryParams[name] = value;
                if(!queryParams['branchIds'] || queryParams['branchIds'].length != 1){
                    managerOptions = [];
                }else{
                    let r = this.getLoadedManagers(queryParams['branchIds'][0]);
                }
                break

            default:
                queryParams[name] = value;
                break;
        }

        this.setState({
            ...this.state,
            queryParams:queryParams,
            managerOptions:managerOptions
        })
    }

    loadItems(){
        this.setState({
            ...this.state,
            btnLoading:true
        })
        let {queryParams} = this.state;
        let sendingParams = {};
        Object.keys(queryParams).map((key) => {
            let val = queryParams[key];
            switch (key){
                case 'branchIds':
                case 'resultIds':
                    sendingParams[key] = val.join(',')
                    break
                default:
                    sendingParams[key] = val;
            }
        })

        axios.get(`${ROOT_URL}/api/crm/demo`,{
            headers: {
                authorization: localStorage.getItem('token')
            },
            params:sendingParams
        })
            .then((response) => {
                this.setState({
                    ...this.state,
                    items:response.data,
                    btnLoading:false
                })
            }).catch((error) => {
            console.log(error)
            this.setState({
                ...this.state,
                btnLoading:false
            })
        })
    }

    componentWillMount(){
        axios.get(`${ROOT_URL}/api/crm/demo/results`,{
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then((response) => {
                let loaded = Object.keys(response.data).map((key) => {
                    return {
                        key:key,
                        text:response.data[key],
                        value:key
                    }
                })
                this.setState({
                    ...this.state,
                    resultOptions:loaded
                })
            }).catch((error) => {
            console.log(error)
        })
    }

    renderSearchPanel(){
        return <div>
                    <Header as='h4' attached='top'>
                        Расширенный поиск
                    </Header>
                    <Segment attached>
                        <Form>
                            <Form.Field>
                                <Form.Select name="bukrs" label='Компания' options={bukrsOptions} placeholder='Компания' onChange={this.handleDropdown} />
                            </Form.Field>
                            <Form.Field>
                                <Form.Select name="branchIds" label='Филиал' fluid multiple selection options={this.state.branchOptions} placeholder='Филиал' onChange={this.handleDropdown} />
                            </Form.Field>
                            <Form.Field>
                                <Form.Select name="managerId" label='Менеджер' options={this.state.managerOptions} placeholder='Менеджер' onChange={this.handleDropdown} />
                            </Form.Field>
                            <Form.Field>
                                <Form.Select name="dealerId" label='Дилер' fluid selection options={this.state.dealerOptions} placeholder='Дилер' onChange={this.handleDropdown} />
                            </Form.Field>
                            <Form.Field>
                                <Form.Select name="resultIds" label='Результат' fluid multiple selection options={this.state.resultOptions} placeholder='Результат' onChange={this.handleDropdown} />
                            </Form.Field>
                            <Form.Field>
                                <Form.Select name="year" defaultValue={currentDate.getFullYear()} label='Год' fluid selection
                                             options={yearOptions} placeholder='Год' onChange={this.handleDropdown} />
                            </Form.Field>

                            <Form.Field>
                                <Form.Select name="month" defaultValue={currentDate.getMonth()+1} label='Месяц'
                                             fluid selection options={monthOptions} placeholder='Месяц' onChange={this.handleDropdown} />
                            </Form.Field>

                            <Button loading={this.state.btnLoading} onClick={this.loadItems} type='submit'>Сформировать</Button>
                        </Form>
                    </Segment>
                </div>
    }

    renderDataTable(){
        return <ReactTable
            data={this.state.items}
            columns={[
                {
                    Header:"Номер №",
                    accessor:"id",
                    Footer:(
                        <span>
                            <strong>Количество: </strong>
                            {this.state.items.length}
                        </span>
                    )
                },
                {
                    Header:"Филиал",
                    accessor: "branchName"
                },
                {
                    Header:"Дилер",
                    accessor: "staffName"
                },
                {
                    Header:"Дата-время",
                    accessor: "dateTime"
                },
                {
                    Header:"Результат",
                    accessor: "resultName"
                }
            ]}
            className="-striped -highlight">

        </ReactTable>
    }

    render(){
        return (
            <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
                <Header as="h2" block>
                    Список демонстрации
                </Header>
                <Divider/>
                <Grid>
                    <Grid.Column floated='left' width={4}>
                        {this.renderSearchPanel()}
                    </Grid.Column>

                    <Grid.Column floated='left' width={12}>
                        {this.renderDataTable()}
                    </Grid.Column>
                </Grid>

            </Container>
        )
    }
}

export default DemoListPage;
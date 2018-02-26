import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import { Header,Container,Segment,Form,Table,Loader } from 'semantic-ui-react'
import LazyPagination from '../../../../general/pagination/LazyPagination'
import axios from 'axios';
import {ROOT_URL} from '../../../../utils/constants';
import DatePicker from "react-datepicker";
import moment from 'moment';
import DemoResultLabel from './DemoResultLabel';

class DemoArchivePage extends Component{

    constructor(props) {
        super(props)
        this.loadedSuccess = true;
        this.state = {
            callResultOptions:[],
            callRefuseOptions:[],
            items:[],
            page:0,
            perPage:30,
            totalRows:0,
            dealers:[],
            results:[],
            searchModel:{
                id:0,
                clientName:'',
                dealerId:0,
                appointedBy:0,
                resultId:'',
                dateFrom:null,
                dateTo:null
            },
            loading:false
        }

        this.renderTable = this.renderTable.bind(this);
        this.onPaginationItemClick = this.onPaginationItemClick.bind(this);
        this.loadItems = this.loadItems.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
    }

    loadItems(page){
        this.setState({...this.state,loading:true})
        let {searchModel} = this.state;
        let temp = [];
        temp.push('page=' + page);
        temp.push('perPage=' + this.state.perPage);
        for(let key in searchModel){
            if(searchModel.hasOwnProperty(key)){
                if(key == 'dateFrom' || key == 'dateTo'){
                    if(searchModel[key]){
                        temp.push(key + '=' + searchModel[key]);
                    }
                }else{
                    temp.push(key + '=' + encodeURIComponent(searchModel[key]));
                }

            }
        }
        let q = temp.join('&');
        axios.get(`${ROOT_URL}/api/crm/demo/archive?` + q,{
            headers:{
                authorization: localStorage.getItem('token')
            }
        })
            .then((res) => {
                this.setState({
                    ...this.state,
                    items:res.data['items'],
                    totalRows:res.data['meta']['totalRows'],
                    page:res.data['meta']['page'],
                    perPage:res.data['meta']['perPage'],
                    loading:false
                })
            }).catch((e) => {
            console.log(e);
        })
    }

    componentWillMount(){

        this.loadItems(0);

        axios.get(`${ROOT_URL}/api/hr/pyramid/crm/group-dealers`,{
            headers: {
                authorization: localStorage.getItem('token')}
        }).then((res) => {
            let loaded = res.data.map((item) => {
                return {
                    key:item.staffId,
                    text:item.lastname + ' ' + item.firstname,
                    value:item.staffId
                }
            });
            loaded.unshift({
                key:0,
                text:'Не выбрано',
                value:0
            });
            this.setState({
                ...this.state,
                dealers:loaded
            })
        }).catch((e) => {
            console.log(e);
        });

        axios.get(`${ROOT_URL}/api/crm/demo/results`,{
            headers: {
                authorization: localStorage.getItem('token')}
        }).then((res) => {
            let loaded = Object.keys(res.data).map((k) => {
                return {
                    key:k,
                    text:res.data[k],
                    value:k
                }
            });

            loaded.unshift({
                key:'',
                text:'Не выбрано',
                value:''
            });

            this.setState({
                ...this.state,
                results:loaded
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

    onPaginationItemClick(page){
        this.loadItems(page);
    }

    handleChange(fieldName,o){
        let {searchModel} = this.state;
        let {value} = o;
        searchModel[fieldName] = value;
        this.setState({...this.state,searchModel:searchModel});
    }

    handleChangeDate(field,m){
        let {searchModel} = this.state;
        if(m){
            searchModel[field] = m.format('YYYY-MM-DD');
        }else {
            searchModel[field] = null;
        }

        this.setState({...this.state,searchModel:searchModel});
    }

    renderSearchForm(){
        return <Form>
            <Form.Group widths='equal'>
                <Form.Select fluid label='Дилер' options={this.state.dealers} placeholder='Дилер' onChange={(e,v) => this.handleChange('dealerId',v)} />
                <Form.Select fluid label='Результат' options={this.state.results} placeholder='Результат' onChange={(e,v) => this.handleChange('resultId',v)} />
                <Form.Input fluid label='ФИО клиента' placeholder='ФИО клиента' onChange={(e,v) => this.handleChange('clientName',v)} />
                <Form.Field>
                    <label>Дата С</label>
                    <DatePicker
                        label=""
                        placeholderText={'Дата-время звонка'}
                        showMonthDropdown showYearDropdown dropdownMode="select"
                        dateFormat="DD.MM.YYYY"
                        selected={this.state.searchModel.dateFrom?moment(this.state.searchModel.dateFrom):null}
                        onChange={(v) => this.handleChangeDate('dateFrom',v)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Дата По</label>
                    <DatePicker
                        label=""
                        placeholderText={'Дата-время звонка'}
                        showMonthDropdown showYearDropdown dropdownMode="select"
                        dateFormat="DD.MM.YYYY"
                        selected={this.state.searchModel.dateTo?moment(this.state.searchModel.dateTo):null}
                        onChange={(v) => this.handleChangeDate('dateTo',v)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>&nbsp;</label>
                    <Form.Button onClick={() => this.loadItems(0)}>Сформировать</Form.Button>
                </Form.Field>
            </Form.Group>
        </Form>
    }

    renderTableBody(){
        if(this.state.items.length === 0){
            return <Table.Row>
                <Table.Cell colSpan={8}>Нет данных</Table.Cell>
            </Table.Row>
        }
        return this.state.items.map((item,idx) => {
            return <Table.Row key={idx}>
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell>{item.branchName}</Table.Cell>
                <Table.Cell>{item.clientName}</Table.Cell>
                <Table.Cell>{item.dealerName}</Table.Cell>
                <Table.Cell>{item.appointer}</Table.Cell>
                <Table.Cell>
                    <DemoResultLabel resultId={item.resultId} resultName={item.resultName}/>
                </Table.Cell>
                <Table.Cell>{item.dateTime?moment(item.dateTime).format('DD.MM.YYYY HH:mm'):''}</Table.Cell>
                <Table.Cell><Link className={'ui icon button mini'} to={`/crm/demo/view/` + item.id}>
                    Просмотр
                </Link></Table.Cell>
            </Table.Row>
        })
    }

    renderTable(){
        if(this.state.loading){
            return <Loader active={true} />
        }
        return <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>№</Table.HeaderCell>
                    <Table.HeaderCell>Филиал</Table.HeaderCell>
                    <Table.HeaderCell>Клиент</Table.HeaderCell>
                    <Table.HeaderCell>Отв. сотрудник</Table.HeaderCell>
                    <Table.HeaderCell>Назначел(а)</Table.HeaderCell>
                    <Table.HeaderCell>Результат</Table.HeaderCell>
                    <Table.HeaderCell>Дата-время демо</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {this.renderTableBody()}
            </Table.Body>
            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan='2'>
                        Количество: {this.state.totalRows}
                    </Table.HeaderCell>
                    <Table.HeaderCell colSpan='6'>
                        <LazyPagination
                            onItemClick={this.onPaginationItemClick}
                            totalRows={this.state.totalRows}
                            currentPage={this.state.page}
                            perPage={this.state.perPage}/>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    }

    render(){
        return (
            <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
                <Segment clearing>
                    <Header as='h2' floated='left'>
                        Архив демонстрации группы
                    </Header>
                </Segment>
                <Segment clearing>
                    {this.renderSearchForm()}
                </Segment>
                {this.renderTable()}
            </Container>
        )
    }
}

export default DemoArchivePage;
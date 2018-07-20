import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import { Header,Container,Segment,Form,Table,Loader } from 'semantic-ui-react'
import LazyPagination from '../../../../general/pagination/LazyPagination'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import moment from 'moment';
import DemoResultLabel from './DemoResultLabel';
import {fetchDemoArchive,fetchDemoResults,fetchGroupDealers} from '../actions/demoAction'
import { connect } from 'react-redux'
import {demoResultOptions} from '../../../crmUtil'

class DemoArchivePage extends Component{

    constructor(props) {
        super(props)
        this.loadedSuccess = true;
        this.state = {
            callResultOptions:[],
            callRefuseOptions:[],
            results:[],
            searchModel:{
                id:0,
                clientName:'',
                dealerId:0,
                appointedBy:0,
                resultId:'',
                dateFrom:null,
                dateTo:null,
                saleDateFr: null,
                saleDateTo: null,
                address: ''
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
        let {searchModel} = this.state;
        let temp = [];
        temp.push('page=' + page);
        temp.push('perPage=' + this.state.perPage);
        for(let key in searchModel){
            if(searchModel.hasOwnProperty(key)){
                if(key === 'dateFrom' || key === 'dateTo' || key === 'saleDateFr' || key === 'saleDateTo'){
                    if(searchModel[key]){
                        temp.push(key + '=' + searchModel[key]);
                    }
                }else{
                    temp.push(key + '=' + encodeURIComponent(searchModel[key]));
                }

            }
        }
        let q = temp.join('&');
        this.props.fetchDemoArchive(q)
    }

    componentWillMount(){
        this.loadItems(0);

        this.props.fetchDemoResults()
        this.props.fetchGroupDealers()
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
                <Form.Select fluid label='Дилер' options={this.props.dealers} placeholder='Дилер' onChange={(e,v) => this.handleChange('dealerId',v)} />
                <Form.Select fluid label='Результат' options={demoResultOptions(this.props.demoResults)} placeholder='Результат' onChange={(e,v) => this.handleChange('resultId',v)} />
                <Form.Input fluid label='ФИО клиента' placeholder='ФИО клиента' onChange={(e,v) => this.handleChange('clientName',v)} />
                <Form.Field>
                    <label>Дата С</label>
                    <DatePicker
                        label=""
                        placeholderText={'Дата-время демо'}
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
                        placeholderText={'Дата-время демо'}
                        showMonthDropdown showYearDropdown dropdownMode="select"
                        dateFormat="DD.MM.YYYY"
                        selected={this.state.searchModel.dateTo?moment(this.state.searchModel.dateTo):null}
                        onChange={(v) => this.handleChangeDate('dateTo',v)}
                    />
                </Form.Field>
            </Form.Group>

            <Form.Group widths='equal'>
                <Form.Field>
                    <label>Дата продажи С</label>
                    <DatePicker
                        label=""
                        placeholderText={'Дата продажи С'}
                        showMonthDropdown showYearDropdown dropdownMode="select"
                        dateFormat="DD.MM.YYYY"
                        selected={this.state.searchModel.saleDateFr?moment(this.state.searchModel.saleDateFr):null}
                        onChange={(v) => this.handleChangeDate('saleDateFr',v)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Дата продажи По</label>
                    <DatePicker
                        label=""
                        placeholderText={'Дата продажи По'}
                        showMonthDropdown showYearDropdown dropdownMode="select"
                        dateFormat="DD.MM.YYYY"
                        selected={this.state.searchModel.saleDateTo?moment(this.state.searchModel.saleDateTo):null}
                        onChange={(v) => this.handleChangeDate('saleDateTo',v)}
                    />
                </Form.Field>
                <Form.Input fluid label='Адрес' placeholder='Адрес' onChange={(e,v) => this.handleChange('address',v)} />
                <Form.Field>
                    <label>&nbsp;</label>
                    <Form.Button onClick={() => this.loadItems(0)}>Сформировать</Form.Button>
                </Form.Field>
            </Form.Group>
        </Form>
    }

    renderTableBody(){
        if(this.props.items.length === 0){
            return <Table.Row>
                <Table.Cell colSpan={8}>Нет данных</Table.Cell>
            </Table.Row>
        }
        return this.props.items.map((item,idx) => {
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
                <Table.Cell><Link target={'_blank'} className={'ui icon button mini'} to={`/crm/demo/view/` + item.id}>
                    Просмотр
                </Link></Table.Cell>
            </Table.Row>
        })
    }

    renderTable(){
        if(this.props.loader.active){
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
                        Количество: {this.props.meta.totalRows}
                    </Table.HeaderCell>
                    <Table.HeaderCell colSpan='6'>
                        <LazyPagination
                            onItemClick={this.onPaginationItemClick}
                            totalRows={this.props.meta.totalRows}
                            currentPage={this.props.meta.page}
                            perPage={this.props.meta.perPage}/>
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

function mapStateToProps (state) {
    return {
        items:state.crmDemo.items,
        loader:state.loader,
        meta:state.crmDemo.meta,
        dealers:state.crmDemo.dealers,
        demoResults:state.crmDemo.demoResults
    }
}

export default connect(mapStateToProps, {fetchDemoArchive,fetchDemoResults,fetchGroupDealers})(DemoArchivePage)
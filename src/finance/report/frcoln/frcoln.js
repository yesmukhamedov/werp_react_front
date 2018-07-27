import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Dropdown, Icon, Container, Header, Grid, Divider, Segment, Menu } from 'semantic-ui-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Link} from 'react-router-dom'
import moment from 'moment';
import { notify } from '../../../general/notification/notification_action';
import ReactTable from 'react-table';
import _ from "lodash";
import '../frcoln/frcoln.css';
import "react-table/react-table.css";
import {frcolnSearchData, frcolnFetchBranchData, changeTab, frcolnFetchCollectorData, clearState, frcolnSaveData} from './frcoln_action';
import {LEGACY_URL} from "../../../utils/constants"
require('moment/locale/ru');
const statusOptions = [
    { key: 0, text: 'Стандарт', value: 0 },
    { key: 1, text: 'Проблемный', value: 1 }
  ];

  const periodOptions = [
    { key: 0, text: 'На начало месяца', value: 'BEG' },
    { key: 1, text: 'На конец месяца', value: 'END' }
  ];
  

 
class Frcoln extends Component {


    constructor(props){

        super(props);
        this.onInputChange = this.onInputChange.bind(this);
        this.onSearchClick = this.onSearchClick.bind(this);
        this.searchBranchInfo = this.searchBranchInfo.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.searchCollectorInfo = this.searchCollectorInfo.bind(this);

        
        this.state={searchTerm:{bukrs:'',branchList:[],date:moment(),status:0, period:'END'}, companyOptions:[], branchOptions:[]};
        
        // ,tab2TableParams : {table:[], headers:headerObjectArray,columns:columnObjectArray, 
        //     pagination:true//,footers:footers//, paginationSize:5//,totalPages:undefined, currentPage:undefined//
        //   }
    
    }
    
    componentWillUnmount(){
        this.props.clearState();
    }
    // .filter((item) =>
    //         {item.businessAreaId==1})
    onInputChange(value,stateFieldName){
        // console.log(formatMoney(324234234.55));
        let waSearchTerm = Object.assign({}, this.state.searchTerm);
        
        this.props.clearState();
        if (stateFieldName==="bukrs")
        {               
            waSearchTerm.bukrs=value;
            let branchOptions = this.props.branchOptions[value];
            this.setState({searchTerm:waSearchTerm,branchOptions:branchOptions?branchOptions:[]});
            // if (branchOptions!==undefined && branchOptions.length>0){
            //     this.setState({searchTerm:waSearchTerm,branchOptions});
            // }
            // else
            // {
            //     this.setState({searchTerm:waSearchTerm,branchOptions:branchOptions?branchOptions:[]});
            // }
            
        }
        else if (stateFieldName==='branch') { 
            waSearchTerm.branchList=value;
            this.setState({searchTerm:waSearchTerm});
        }
        else if (stateFieldName==='date') { 
            waSearchTerm.date=value;
            this.setState({searchTerm:waSearchTerm});
        }
        else if (stateFieldName==='status') { 
            waSearchTerm.status=value;
            this.setState({searchTerm:waSearchTerm});
        } 
        else if (stateFieldName==='period') { 
            waSearchTerm.period=value;
            this.setState({searchTerm:waSearchTerm});
        } 
        
        // console.log(this.state);
    }

    onSearchClick(){
        this.props.frcolnSearchData(this.state.searchTerm.bukrs,this.state.searchTerm.branchList,this.state.searchTerm.status,this.state.searchTerm.date,this.state.searchTerm.period);
    }

    searchBranchInfo(branch_id,waers){
        this.props.frcolnFetchBranchData(this.state.searchTerm.bukrs,branch_id,this.state.searchTerm.status,this.state.searchTerm.date,waers,this.state.searchTerm.period);
    }

    searchCollectorInfo(bukrs,branch_id,waers,staff_id, ps){
        this.props.frcolnFetchCollectorData(bukrs,branch_id,this.state.searchTerm.status,this.state.searchTerm.date,waers,staff_id, ps,this.state.searchTerm.period);
    }

    onSaveClick(){
        if (this.props.tab2OutputTable!==null && this.props.tab2OutputTable.length>0 && this.state.searchTerm.period==='END')
        {
            this.props.frcolnSaveData(this.state.searchTerm.bukrs,this.state.searchTerm.date,this.state.searchTerm.period);
        }
        else if (this.props.tab2OutputTable===null || this.props.tab2OutputTable.length>0 || this.state.searchTerm.period==='BEG')
        {
            this.props.frcolnSaveData(this.state.searchTerm.bukrs,this.state.searchTerm.date,this.state.searchTerm.period);
        }
        else
        {
            this.props.notify('error','Нажмите на поиск.','Ошибка');
        }
        
        

    }


    renderTab1(){
        return (
        // <Tab.Pane>
            
            <Grid>
                    <Grid.Row  >
                        <Grid.Column mobile={16} tablet={16} computer={5}>
                        <Table  compact>
                                <Table.Body>
                                <Table.Row>
                                    <Table.Cell  collapsing>
                                        <Icon name='folder' />
                                        Компанияl
                                    </Table.Cell>
                                    <Table.Cell>
                                    <Dropdown fluid placeholder='Компания' selection options={this.props.companyOptions} value={this.state.searchTerm.bukrs} 
                                        onChange={(e, { value }) => this.onInputChange(value,'bukrs')} />
                                        {/* <BukrsF4n handleChange={(value, fieldname)=> this.onInputChange(value,fieldname)} fluid={true}/>                                         */}
                                    </Table.Cell>
                                    <Table.Cell></Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                    <Table.Cell>
                                        <Icon name='browser' />                                    
                                        Филиал
                                    </Table.Cell> 
                                    <Table.Cell>
                                    <Dropdown placeholder='Все' fluid multiple search selection options={this.state.branchOptions} value={this.state.searchTerm.branchList} 
                                            onChange={(e, { value }) => this.onInputChange(value,'branch')} />                                        
                                    </Table.Cell>
                                    <Table.Cell></Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>                                        
                                            <Icon name='calendar' />
                                            Дата
                                        </Table.Cell> 
                                        <Table.Cell>
                                            <DatePicker className='date-100-width'
                                            autoComplete="off"
                                            showMonthDropdown showYearDropdown dropdownMode="select" //timezone="UTC"
                                            selected={this.state.searchTerm.date} locale="ru"
                                            onChange={(event) => this.onInputChange(event,"date")}
                                            dateFormat="MM.YYYY" />
                                        </Table.Cell> 
                                        <Table.Cell>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>                                        
                                            <Icon name='options' />
                                            Статус
                                        </Table.Cell> 
                                        <Table.Cell>
                                            <Dropdown item options={statusOptions} value={this.state.searchTerm.status} 
                                            onChange={(e, { value }) => this.onInputChange(value,'status')} />
                                            
                                        </Table.Cell> 
                                        <Table.Cell>
                                        </Table.Cell>
                                    </Table.Row>
                                    
                                    <Table.Row>
                                        <Table.Cell>                                        
                                            <Icon name='calendar' />
                                            Период
                                        </Table.Cell> 
                                        <Table.Cell>
                                            <Dropdown item options={periodOptions} value={this.state.searchTerm.period} 
                                            onChange={(e, { value }) => this.onInputChange(value,'period')} />
                                            
                                        </Table.Cell> 
                                        <Table.Cell>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                    <Table.Cell>
                                    </Table.Cell> 
                                    <Table.Cell>
                                        <Button icon labelPosition='left' primary size='small' onClick={this.onSearchClick.bind(this)}>
                                            <Icon name='search' size='large' />
                                            Поиск
                                        </Button>
                                    </Table.Cell>
                                    <Table.Cell></Table.Cell>
                                </Table.Row>
                                </Table.Body>
                            </Table>
                        </Grid.Column>                        
                    </Grid.Row>
                </Grid> 

        )
        
        
    }
    

    
    

    
    handleTabChange(activeIndex){
        this.props.changeTab(activeIndex);
    }
    
    render(){
        //initialize columns
        //table 1

        // t2r2c3.className=('clickableItem');
        let t1columns = [];
        let t1r2c1 = {Header:({value}) => <b>Филиал</b>,accessor: "branch_name",className:'clickableItem'};
        let t1r2c2 = {Header:({value}) => <b>Кол. дог.</b>,accessor: "contract_amount",className:'clickableItem', Cell: ({value}) => (new Intl.NumberFormat('ru-RU').format(value))};
        let t1r2c3 = {Header:({value}) => <b>Валюта</b>,accessor: "waers",className:'clickableItem'};
        let t1r2c4 = {Header: "План",accessor: "ras_plan",className:'clickableItem',Cell: ({value}) => (new Intl.NumberFormat('ru-RU').format(value))};
        let t1r2c5 = {Header: "Получен",accessor: "ras_poluchen",className:'clickableItem',Cell: ({value}) => (new Intl.NumberFormat('ru-RU').format(value))};
        let t1r2c6 = {Header: "План",accessor: "one_month_plan",className:'clickableItem',Cell: ({value}) => (new Intl.NumberFormat('ru-RU').format(value))};
        let t1r2c7 = {Header: "Получен",accessor: "one_month_poluchen",className:'clickableItem',Cell: ({value}) => (new Intl.NumberFormat('ru-RU').format(value))};
        let t1r2c8 = {Header: "План",accessor: "ras_usd_plan",className:'clickableItem',Cell: ({value}) => (new Intl.NumberFormat('ru-RU').format(value))};
        let t1r2c9 = {Header: "Получен",accessor: "ras_usd_poluchen",className:'clickableItem',Cell: ({value}) => (new Intl.NumberFormat('ru-RU').format(value))};
        let t1r2c10 = {Header: "План",accessor: "one_month_usd_plan",className:'clickableItem',Cell: ({value}) => (new Intl.NumberFormat('ru-RU').format(value))};
        let t1r2c11 = {Header: "Получен",accessor: "one_month_usd_poluchen",className:'clickableItem',Cell: ({value}) => (new Intl.NumberFormat('ru-RU').format(value))};

        let t1r2c12 = {Header: "План",accessor: "total_usd_plan",className:'clickableItem',Cell: ({value}) => (new Intl.NumberFormat('ru-RU').format(value))};
        t1r2c12.Footer = (<span><strong>{new Intl.NumberFormat('ru-RU').format(_.sum(_.map(this.props.tab2OutputTable, d => d.total_usd_plan)))}</strong></span>);
        let t1r2c13 = {Header: "Получен",accessor: "total_usd_poluchen",className:'clickableItem',Cell: ({value}) => (new Intl.NumberFormat('ru-RU').format(value))};
        t1r2c13.Footer = (<span><strong>{new Intl.NumberFormat('ru-RU').format(_.sum(_.map(this.props.tab2OutputTable, d => d.total_usd_poluchen)))}</strong></span>);
        let t1r2c14 = {Header: "Процент",accessor: "total_usd_percentage",className:'clickableItem',Cell: ({value}) => <span>{new Intl.NumberFormat('ru-RU').format(value)} {'%'}</span>};
        t1r2c14.Footer = (<span><strong>{new Intl.NumberFormat('ru-RU').format(
            _.sum(_.map(this.props.tab2OutputTable, d => d.total_usd_poluchen))*100/_.sum(_.map(this.props.tab2OutputTable, d => d.total_usd_plan))
    
    )}  {'%'}</strong></span>);
        let t1r2c15 = {Header: "Город",accessor: "city_name",className:'clickableItem'};
        
        let t1r1c2={Header:({value}) => <b>В рассрочку</b>,columns:[]};
        let t1r1c3={Header:({value}) => <b>В течении 1 месяца</b>,columns:[]};
        let t1r1c4={Header:({value}) => <b>В рассрочку USD</b>,columns:[]};
        let t1r1c5={Header:({value}) => <b>В течении 1 месяца USD</b>,columns:[]};
        let t1r1c6={Header:({value}) => <b>Всего</b>,columns:[]};

        t1r1c2.columns.push(t1r2c4);
        t1r1c2.columns.push(t1r2c5);
        t1r1c3.columns.push(t1r2c6);
        t1r1c3.columns.push(t1r2c7);
        t1r1c4.columns.push(t1r2c8);
        t1r1c4.columns.push(t1r2c9);
        t1r1c5.columns.push(t1r2c10);
        t1r1c5.columns.push(t1r2c11);
        t1r1c6.columns.push(t1r2c12);
        t1r1c6.columns.push(t1r2c13);
        t1r1c6.columns.push(t1r2c14);
        t1r1c6.columns.push(t1r2c15);
        
        t1columns.push(t1r2c1);
        t1columns.push(t1r2c2);
        t1columns.push(t1r2c3);
        t1columns.push(t1r1c2);
        t1columns.push(t1r1c3);
        t1columns.push(t1r1c4);
        t1columns.push(t1r1c5);
        t1columns.push(t1r1c6);

        //table 2
        let t2columns = [];
        let t2r2c1 = {Header:({value}) => <b>Валюта</b>,accessor: "waers"};
        let t2r2c2 = {Header:({value}) => <b>Кол. дог.</b>,accessor: "contract_amount", Cell: ({value}) => (new Intl.NumberFormat('ru-RU').format(value))};
        let t2r2c3 = {Header: "План",accessor: "ras_plan",Cell: ({value}) => (new Intl.NumberFormat('ru-RU').format(value))};
        let t2r2c4 = {Header: "Получен",accessor: "ras_poluchen",Cell: ({value}) => (new Intl.NumberFormat('ru-RU').format(value))};
        let t2r2c5 = {Header: "План",accessor: "one_month_plan",Cell: ({value}) => (new Intl.NumberFormat('ru-RU').format(value))};
        let t2r2c6 = {Header: "Получен",accessor: "one_month_poluchen",Cell: ({value}) => (new Intl.NumberFormat('ru-RU').format(value))};
        let t2r2c7 = {Header: "План",accessor: "ras_usd_plan",Cell: ({value}) => (new Intl.NumberFormat('ru-RU').format(value))};
        let t2r2c8 = {Header: "Получен",accessor: "ras_usd_poluchen",Cell: ({value}) => (new Intl.NumberFormat('ru-RU').format(value))};
        let t2r2c9 = {Header: "План",accessor: "one_month_usd_plan",Cell: ({value}) => (new Intl.NumberFormat('ru-RU').format(value))};
        let t2r2c10 = {Header: "Получен",accessor: "one_month_usd_poluchen",Cell: ({value}) => (new Intl.NumberFormat('ru-RU').format(value))};

        

        let t2r2c11 = {Header: "План",id: "total_usd_plan",accessor:row=><span>{new Intl.NumberFormat('ru-RU').format(row.ras_usd_plan + row.one_month_usd_plan)}</span>};
        t2r2c11.Footer = (<span><strong>{new Intl.NumberFormat('ru-RU').format(_.sum(_.map(this.props.tab2TotalTable, d => d.ras_usd_plan+d.one_month_usd_plan)))}</strong></span>);
        let t2r2c12 = {Header: "Получен",id: "total_usd_poluchen",accessor: row=><span>{new Intl.NumberFormat('ru-RU').format(row.ras_usd_poluchen + row.one_month_usd_poluchen)}</span>};
        t2r2c12.Footer = (<span><strong>{new Intl.NumberFormat('ru-RU').format(_.sum(_.map(this.props.tab2TotalTable, d => d.ras_usd_poluchen+d.one_month_usd_poluchen)))}</strong></span>);

        let t2r1c2={Header:({value}) => <b>В рассрочку</b>,columns:[]};
        let t2r1c3={Header:({value}) => <b>В течении 1 месяца</b>,columns:[]};
        let t2r1c4={Header:({value}) => <b>В рассрочку USD</b>,columns:[]};
        let t2r1c5={Header:({value}) => <b>В течении 1 месяца USD</b>,columns:[]};
        let t2r1c6={Header:({value}) => <b>Всего</b>,columns:[]};


        t2r1c2.columns.push(t2r2c3);
        t2r1c2.columns.push(t2r2c4);
        t2r1c3.columns.push(t2r2c5);
        t2r1c3.columns.push(t2r2c6);
        t2r1c4.columns.push(t2r2c7);
        t2r1c4.columns.push(t2r2c8);
        t2r1c5.columns.push(t2r2c9);
        t2r1c5.columns.push(t2r2c10);
        t2r1c6.columns.push(t2r2c11);
        t2r1c6.columns.push(t2r2c12);
        
        t2columns.push(t2r2c1);
        t2columns.push(t2r2c2);
        t2columns.push(t2r1c2);
        t2columns.push(t2r1c3);
        t2columns.push(t2r1c4);
        t2columns.push(t2r1c5);
        t2columns.push(t2r1c6);
        
        
        //table 3
        let t3columns = [];
        let t3r2c1 = {Header:({value}) => <b>Филиал</b>,accessor: "branch_name"};
        let t3r2c2 = {Header:({value}) => <b>ФИО</b>,accessor: "collector_name"};
        let t3r2c3 = {Header:({value}) => <b>Кол. дог.</b>,accessor: "contract_amount", Cell: ({value}) => (new Intl.NumberFormat('ru-RU').format(value))};
        let t3r2c4 = {Header:({value}) => <b>Валюта</b>,accessor: "waers"};
        let t3r2c5 = {Header: "План",accessor: "ras_plan",Cell: ({value}) => (new Intl.NumberFormat('ru-RU').format(value))};
        let t3r2c6 = {Header: "Получен",accessor: "ras_poluchen",Cell: ({value}) => (new Intl.NumberFormat('ru-RU').format(value))};
        let t3r2c7 = {Header: "План",accessor: "one_month_plan",Cell: ({value}) => (new Intl.NumberFormat('ru-RU').format(value))};
        let t3r2c8 = {Header: "Получен",accessor: "one_month_poluchen",Cell: ({value}) => (new Intl.NumberFormat('ru-RU').format(value))};
        let t3r2c9 = {Header: "План",accessor: "ras_usd_plan",Cell: ({value}) => (new Intl.NumberFormat('ru-RU').format(value))};
        let t3r2c10 = {Header: "Получен",accessor: "ras_usd_poluchen",Cell: ({value}) => (new Intl.NumberFormat('ru-RU').format(value))};
        let t3r2c11 = {Header: "План",accessor: "one_month_usd_plan",Cell: ({value}) => (new Intl.NumberFormat('ru-RU').format(value))};
        let t3r2c12 = {Header: "Получен",accessor: "one_month_usd_poluchen",Cell: ({value}) => (new Intl.NumberFormat('ru-RU').format(value))};
        let t3r2c13 = {Header: "Детали",id: "rasPer",accessor:((row) =>  (        
                                                            <Button   primary size='small' 
                                                            onClick={()=>this.searchCollectorInfo(row.bukrs,row.branch_id,row.waers,row.staff_id, 2)}>
                                                                Показать
                                                            </Button>
                                                            ))};
        let t3r2c14 = {Header: "Процент",accessor: "ras_percentage",Cell: ({value}) => (<span>{new Intl.NumberFormat('ru-RU').format(value)} {'%'}</span>)};
        let t3r2c15 = {Header: "Детали",id: "onePer",accessor:((row) =>  (        
            <Button   primary size='small' 
            onClick={()=>this.searchCollectorInfo(row.bukrs,row.branch_id,row.waers,row.staff_id, 1)}>
                Показать
            </Button>
            ))};
        let t3r2c16 = {Header: "Процент",accessor: "one_month_percentage",Cell: ({value}) => (<span>{new Intl.NumberFormat('ru-RU').format(value)} {'%'}</span>)};

        
        
        let t3r1c2={Header:({value}) => <b>В рассрочку</b>,columns:[]};
        let t3r1c3={Header:({value}) => <b>В течении 1 месяца</b>,columns:[]};
        let t3r1c4={Header:({value}) => <b>В рассрочку USD</b>,columns:[]};
        let t3r1c5={Header:({value}) => <b>В течении 1 месяца USD</b>,columns:[]};

        t3r1c2.columns.push(t3r2c13);
        t3r1c2.columns.push(t3r2c5);
        t3r1c2.columns.push(t3r2c6);
        t3r1c2.columns.push(t3r2c14);
        // t3r1c3.columns.push(t3r2c13);
        t3r1c3.columns.push(t3r2c15);
        t3r1c3.columns.push(t3r2c7);
        t3r1c3.columns.push(t3r2c8);
        t3r1c3.columns.push(t3r2c16);
        
        t3r1c4.columns.push(t3r2c9);
        t3r1c4.columns.push(t3r2c10);
        t3r1c5.columns.push(t3r2c11);
        t3r1c5.columns.push(t3r2c12);
        
        t3columns.push(t3r2c1);
        t3columns.push(t3r2c2);
        t3columns.push(t3r2c3);
        t3columns.push(t3r2c4);
        t3columns.push(t3r1c2);
        t3columns.push(t3r1c3);
        t3columns.push(t3r1c4);
        t3columns.push(t3r1c5);

        //table 4
        let t4columns = [];
        let t4r2c1 = {Header:({value}) => <b>Валюта</b>,accessor: "waers"};
        let t4r2c2 = {Header:({value}) => <b>Кол. дог.</b>,accessor: "contract_amount", Cell: ({value}) => (new Intl.NumberFormat('ru-RU').format(value))};
        let t4r2c3 = {Header: "План",accessor: "ras_plan",Cell: ({value}) => (new Intl.NumberFormat('ru-RU').format(value))};
        let t4r2c4 = {Header: "Получен",accessor: "ras_poluchen",Cell: ({value}) => (new Intl.NumberFormat('ru-RU').format(value))};
        let t4r2c5 = {Header: "План",accessor: "one_month_plan",Cell: ({value}) => (new Intl.NumberFormat('ru-RU').format(value))};
        let t4r2c6 = {Header: "Получен",accessor: "one_month_poluchen",Cell: ({value}) => (new Intl.NumberFormat('ru-RU').format(value))};
        let t4r2c7 = {Header: "План",accessor: "ras_usd_plan",Cell: ({value}) => (new Intl.NumberFormat('ru-RU').format(value))};
        let t4r2c8 = {Header: "Получен",accessor: "ras_usd_poluchen",Cell: ({value}) => (new Intl.NumberFormat('ru-RU').format(value))};
        let t4r2c9 = {Header: "План",accessor: "one_month_usd_plan",Cell: ({value}) => (new Intl.NumberFormat('ru-RU').format(value))};
        let t4r2c10 = {Header: "Получен",accessor: "one_month_usd_poluchen",Cell: ({value}) => (new Intl.NumberFormat('ru-RU').format(value))};

        

        let t4r2c11 = {Header: "План",id: "total_usd_plan",accessor:row=><span>{new Intl.NumberFormat('ru-RU').format(row.ras_usd_plan + row.one_month_usd_plan)}</span>};
        t4r2c11.Footer = (<span><strong>{new Intl.NumberFormat('ru-RU').format(_.sum(_.map(this.props.tab2TotalTable, d => d.ras_usd_plan+d.one_month_usd_plan)))}</strong></span>);
        let t4r2c12 = {Header: "Получен",id: "total_usd_poluchen",accessor: row=><span>{new Intl.NumberFormat('ru-RU').format(row.ras_usd_poluchen + row.one_month_usd_poluchen)}</span>};
        t4r2c12.Footer = (<span><strong>{new Intl.NumberFormat('ru-RU').format(_.sum(_.map(this.props.tab2TotalTable, d => d.ras_usd_poluchen+d.one_month_usd_poluchen)))}</strong></span>);

        let t4r1c2={Header:({value}) => <b>В рассрочку</b>,columns:[]};
        let t4r1c3={Header:({value}) => <b>В течении 1 месяца</b>,columns:[]};
        let t4r1c4={Header:({value}) => <b>В рассрочку USD</b>,columns:[]};
        let t4r1c5={Header:({value}) => <b>В течении 1 месяца USD</b>,columns:[]};
        let t4r1c6={Header:({value}) => <b>Всего</b>,columns:[]};


        t4r1c2.columns.push(t4r2c3);
        t4r1c2.columns.push(t4r2c4);
        t4r1c3.columns.push(t4r2c5);
        t4r1c3.columns.push(t4r2c6);
        t4r1c4.columns.push(t4r2c7);
        t4r1c4.columns.push(t4r2c8);
        t4r1c5.columns.push(t4r2c9);
        t4r1c5.columns.push(t4r2c10);
        t4r1c6.columns.push(t4r2c11);
        t4r1c6.columns.push(t4r2c12);
        
        t4columns.push(t4r2c1);
        t4columns.push(t4r2c2);
        t4columns.push(t4r1c2);
        t4columns.push(t4r1c3);
        t4columns.push(t4r1c4);
        t4columns.push(t4r1c5);
        t4columns.push(t4r1c6);
            
        //table 5
        let t5columns = [];
        let t5r1c1 = {Header:({value}) => <b>SN номер</b>,accessor: "contract_number",
        Cell: ({value}) => <Link target='_blank' className={'ui icon button'} to={`${LEGACY_URL}/dms/contract/dmsc03.xhtml?contract_number=` + value}>
                                {value}
                            </Link>};
        t5r1c1.Footer = (<span><strong>Количество: {new Intl.NumberFormat('ru-RU').format(this.props.tab4OutputTable.length)}</strong></span>);
        let t5r1c2 = {Header:({value}) => <b>Дата договора</b>, accessor: "contract_date"
                                    ,Cell: ({value}) => {
                                        if(value){
                                            return moment(value).format('DD.MM.YYYY');
                                        }
                                        return '';
                                    }
                                    ,sortMethod: (a, b) => {
                                        if (a === b) {
                                          return a > b ? 1 : -1;
                                        }
                                        return a > b ? 1 : -1;
                                      }

                    };
        let t5r1c3 = {Header:({value}) => <b>ФИО</b>,accessor: "fio"};
        let t5r1c4 = {Header:({value}) => <b>Валюта</b>,accessor: "waers"};
        let t5r1c5 = {Header: "План",accessor: "plan",Cell: ({value}) => (new Intl.NumberFormat('ru-RU').format(value))};
        t5r1c5.Footer = (<span><strong>{new Intl.NumberFormat('ru-RU').format(_.sum(_.map(this.props.tab4OutputTable, d => d.plan)))}</strong></span>);

        let t5r1c6 = {Header: "Получен",accessor: "poluchen",Cell: ({value}) => (new Intl.NumberFormat('ru-RU').format(value))};
        t5r1c6.Footer = (<span><strong>{new Intl.NumberFormat('ru-RU').format(_.sum(_.map(this.props.tab4OutputTable, d => d.poluchen)))}</strong></span>);


        
        t5columns.push(t5r1c1);
        t5columns.push(t5r1c2);
        t5columns.push(t5r1c3);
        t5columns.push(t5r1c4);
        t5columns.push(t5r1c5);
        t5columns.push(t5r1c6);
        




        return (
            // <ExcelFile>
            //     <ExcelSheet data={dataSet1} name="Employees">
            //         <ExcelColumn label="Name" value="name" />
            //         <ExcelColumn label="Wallet Money" value="amount" />
            //         <ExcelColumn label="Gender" value="sex" />
            //         <ExcelColumn label="Marital Status" 
            //                     value={(col) => col.is_married ? "Married" : "Single"} />
            //     </ExcelSheet>
            // </ExcelFile>
            
            <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
                <Header as="h2" block>
                    Статистика взносщиков
                </Header>

                <Menu pointing stackable>
                    <Menu.Item name='Параметры поиска' active={this.props.activeIndex === 0}  onClick={()=>{this.handleTabChange(0)}} />
                    <Menu.Item name='Филиалы' active={this.props.activeIndex === 1} onClick={()=>{this.handleTabChange(1)}} />
                    <Menu.Item name='Коллекторы' active={this.props.activeIndex === 2} onClick={()=>{this.handleTabChange(2)}} />
                    <Menu.Item name='Договора' active={this.props.activeIndex === 3} onClick={()=>{this.handleTabChange(3)}} />
                    
                </Menu>
                
                <Segment className={this.props.activeIndex===0?'show':'hide'}>{this.renderTab1()}</Segment>
                <Segment.Group className={this.props.activeIndex===1?'show':'hide'}>
                    <Segment>
                        <Button icon labelPosition='left' primary size='small' onClick={()=> this.onSaveClick()}>
                            <Icon name='save' size='large' />Сохранить
                        </Button>
                    </Segment>
                    <Segment>                    
                        <ReactTable 
                            getTrProps={(state, rowInfo, column, instance) => {
                                return {

                                    onClick: (e) => {
                                        this.searchBranchInfo(rowInfo.original.branch_id,rowInfo.original.waers);
                                        // console.log(searchBranchInfo,"test2")
                                        // if (searchBranchInfo) {
                                            
                                        //     this.searchBranchInfo(rowInfo.original.branch_id,rowInfo.original.waers);
                                        // }
                                    }
                                }
                            }}
                            data={this.props.tab2OutputTable}
                            columns={t1columns}
                            pageSize={this.props.tab2OutputTable.length===0?5:this.props.tab2OutputTable.length}
                            showPagination={false}
                            loadingText= 'Loading...'
                            noDataText= 'Нет записей'
                            className="-striped -highlight">
                        </ReactTable>
                        <Divider horizontal>Общее количество</Divider>
                        <ReactTable
                            data={this.props.tab2TotalTable}
                            columns={t2columns}

                            pageSize={this.props.tab2TotalTable.length===0?5:this.props.tab2TotalTable.length}
                            showPagination={false}
                            loadingText= 'Loading...'
                            className="-striped -highlight">
                        </ReactTable>
                    </Segment>
                </Segment.Group>

                <Segment className={this.props.activeIndex===2?'show':'hide'}>
                    <ReactTable
                        data={this.props.tab3OutputTable}
                        columns={t3columns}
                        pageSize={this.props.tab3OutputTable.length===0?5:this.props.tab3OutputTable.length}
                        showPagination={false}
                        loadingText= 'Loading...'
                        noDataText= 'Нет записей'
                        className="-striped -highlight">
        
                    </ReactTable>
                    <Divider horizontal>Общее количество</Divider>
                    <ReactTable
                        data={this.props.tab3TotalTable}
                        columns={t4columns}

                        pageSize={this.props.tab3TotalTable.length===0?5:this.props.tab3TotalTable.length}
                        showPagination={false}
                        loadingText= 'Loading...'
                        className="-striped -highlight">
                    </ReactTable>
                </Segment>

                <Segment className={this.props.activeIndex===3?'show':'hide'}>
                    <ReactTable
                        data={this.props.tab4OutputTable}
                        columns={t5columns}
                        defaultPageSize={20}
                        showPagination={true}
                        loadingText= 'Loading...'
                        noDataText= 'Нет записей'
                        className="-striped -highlight"
                        previousText={'Пред.'}
                        nextText={'След.'}
                        rowsText={'строк'}
                        pageText={'Страница'}
                        ofText={'из'}
                        >
        
                    </ReactTable>
                </Segment>
                




       
        


        
                     
            </Container>

        );
        
        
    }
    
    // handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex })
    
};




function mapStateToProps(state)
{
    // console.log(state);
    return { companyOptions:state.userInfo.companyOptions,branchOptions:state.userInfo.branchOptionsMarketing
        
        ,tab2OutputTable:state.frcoln.tab2OutputTable
        ,tab3OutputTable:state.frcoln.tab3OutputTable
        ,tab4OutputTable:state.frcoln.tab4OutputTable
        ,tab2TotalTable:state.frcoln.tab2TotalTable
        ,tab3TotalTable:state.frcoln.tab3TotalTable 
        ,activeIndex:state.frcoln.activeIndex};
}

export default connect(mapStateToProps,{ notify, frcolnSearchData, frcolnFetchBranchData, changeTab, frcolnFetchCollectorData, frcolnSaveData, clearState }) (Frcoln);

import React,{ Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Modal, Dropdown, Icon, Container, Header, Grid, Tab, Label, Input } from 'semantic-ui-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import axios from 'axios';
import {ROOT_URL} from '../../../utils/constants';
import { notify } from '../../../general/notification/notification_action';
import NumberFormat from 'react-number-format';
import './serrep1.css';
require('moment/locale/ru');
// const arrayList= ;
class Serrep1 extends Component {

    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props){
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
        this.onSearchClick = this.onSearchClick.bind(this);
        this.onSelectTableType = this.onSelectTableType.bind(this);
        
        this.state={searchTerm:{bukrs:'',branchList:[],dateFrom:'',dateTo:''}, companyOptions:[], branchOptions:[],
        button1:true,button2:false,button3:false, pyl:[],filter:[],currentTable:[],pylTotal:[],filterTotal:[],currentTableTotal:[],resultDate:''};
    }

    componentWillMount() {
        

        axios.get(`${ROOT_URL}/api/reference/companies`, {
            headers: {
                authorization: localStorage.getItem('token')}
        })
        .then(({data}) => {
            const newCompanyOptions = data.map(item => {
                return {
                    key: item.id,
                    value: item.id,
                    text: item.name
                }
            })
            
            this.setState({
                ...this.state,
                companyOptions: newCompanyOptions
            })
        })
        .catch(err => console.log(err));


        if (this.state.companyOptions.size===1){
            this.onInputChange(this.state.companyOptions[0].value,'bukrs');
        }


        

    }
    onInputChange(value,stateFieldName){
        // console.log(formatMoney(324234234.55));
        let waSearchTerm = Object.assign({}, this.state.searchTerm);
        if (stateFieldName==="bukrs")
        {               
            waSearchTerm.bukrs=value;
            waSearchTerm.branchList=[];   
            this.fetchUserBranches(value);
        }
        else if (stateFieldName==='branch') { 
            waSearchTerm.branchList=value;            
        }
        else if (stateFieldName==='dateFrom') { 
            waSearchTerm.dateFrom=value; 
        }
        else if (stateFieldName==='dateTo') { 
            waSearchTerm.dateTo=value; 
        }
        this.setState({searchTerm:waSearchTerm});
        
        // console.log(this.state);
    }

    onSearchClick(){
        //do
        
        if (this.state.searchTerm.bukrs===null || this.state.searchTerm.bukrs.length===0)
        {
            this.props.notify('error','Выберите компанию','Ошибка');
            return;
        }

        if (this.state.branchOptions===null || this.state.branchOptions.length===0)
        {
            this.props.notify('error','Обратитесь к администратору, вам не присвоены филиалы','Ошибка');
            return;
        }
        
        if (this.state.searchTerm.dateFrom===null || this.state.searchTerm.dateFrom.length===0)
        {
            this.props.notify('error','Выберите период','Ошибка');
            return;
        }

        if (this.state.searchTerm.dateTo===null || this.state.searchTerm.dateTo.length===0)
        {
            this.props.notify('error','Выберите период','Ошибка');
            return;
        }
        let strVal = this.state.searchTerm.dateFrom.format('YYYY-MM-DD');
        let searchDateFrom = moment.utc(strVal).format();
        strVal = this.state.searchTerm.dateTo.format('YYYY-MM-DD');
        let searchDateTo = moment.utc(strVal).format();

        axios.get(`${ROOT_URL}/api/service/reports/serrep1/search`, {
            headers: {
                authorization: localStorage.getItem('token')
            },
            params:{
                bukrs:this.state.searchTerm.bukrs,
                branchIds:this.state.searchTerm.branchList.join(),
                dateFrom:searchDateFrom,
                dateTo:searchDateTo
            }
        })
        .then((response) => {
            this.setState({
                ...this.state,
                pyl:response.data.pyl,
                filter:response.data.filter,
                currentTable:response.data.pyl,
                pylTotal:response.data.pylTotal,
                filterTotal:response.data.filterTotal,
                currentTableTotal:response.data.pylTotal,
                button1:false,
                button2:true,
                button3:false,
                resultDate:response.data.resultDate

            });
        })
        .catch((error) => {
            if (error.response.status===403)
            {
                //blog post has been created, navigate the user to the index
                //We navigate by calling this.context.router.push with the new path to navigate to
                this.context.router.push('/forbidden');
            }
            else
            {
                this.props.notify('error',error.response.data.message,'Ошибка');
            }
            
            // this.setState({
            //     ...this.state,
            //     loading:false
            // })
        });

        // console.log(this.state);

    }

    

    fetchUserBranches(bukrs) {
        axios.get(`${ROOT_URL}/api/reference/branches/service/` + bukrs, {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })
            .then(({
                data
            }) => {
                const newBranchOptions = data.map(item => {
                    return {
                        key: item.branch_id,
                        text: item.text45,
                        value: item.branch_id
                    }
                })

                this.setState({
                    ...this.state,
                    branchOptions: newBranchOptions
                })
            })
            .catch(err => console.log(err));
    }

    onSelectTableType(index){

        if (index===1) {this.setState({...this.state,currentTable:this.state.pyl,button1:true,button2:false,
            button3:false,currentTableTotal:this.state.pylTotal,displayTable:"hide",displayColumn:"hide"});}
        else if (index===2) {this.setState({...this.state,currentTable:this.state.pyl,button1:false,button2:true,
            button3:false,currentTableTotal:this.state.pylTotal,displayTable:"show",displayColumn:"hide"});}
        else if (index===3) {this.setState({...this.state,currentTable:this.state.filter,button1:false,button2:false,
            button3:true,currentTableTotal:this.state.filterTotal,displayTable:"show",displayColumn:"show"});}
    }

    renderTable() {
        return this.state.currentTable.map((wa,idx)=>{
      
            return (
                
                  
               
                <Table.Row key={idx}>              
                         
                    <Table.Cell>{wa.branchName}</Table.Cell>
                    <Table.Cell>{wa.waers}</Table.Cell>
                    {this.state.button3 && <Table.Cell >{new Intl.NumberFormat('ru-RU').format(wa.kol1)}</Table.Cell>}
                    {this.state.button3 && <Table.Cell >{new Intl.NumberFormat('ru-RU').format(wa.summa1)}</Table.Cell>}                   
                    {this.state.button3 && <Table.Cell >{new Intl.NumberFormat('ru-RU').format(wa.kol2)}</Table.Cell>}
                    {this.state.button3 && <Table.Cell >{new Intl.NumberFormat('ru-RU').format(wa.summa2)}</Table.Cell>}                  
                    <Table.Cell>{new Intl.NumberFormat('ru-RU').format(wa.kol3)}</Table.Cell>
                    <Table.Cell>{new Intl.NumberFormat('ru-RU').format(wa.summa3)}</Table.Cell>       
                    <Table.Cell>{new Intl.NumberFormat('ru-RU').format(wa.kol4)}</Table.Cell>
                    <Table.Cell>{new Intl.NumberFormat('ru-RU').format(wa.summa4)}</Table.Cell>             
                </Table.Row> 
            );

        })
    }
    
    renderTableFooter() {
        
                return this.state.currentTableTotal.map((wa,idx)=>{
                    
                    return (
                        
                        <Table.Row key={idx}>    
                            <Table.HeaderCell><b>Всего</b></Table.HeaderCell>
                            <Table.HeaderCell><b>{wa.waers}</b></Table.HeaderCell>
                            {this.state.button3 && <Table.HeaderCell ><b>{new Intl.NumberFormat('ru-RU').format(wa.kol1)}</b></Table.HeaderCell>}
                            {this.state.button3 && <Table.HeaderCell ><b>{new Intl.NumberFormat('ru-RU').format(wa.summa1)}</b></Table.HeaderCell>}                  
                            {this.state.button3 && <Table.HeaderCell ><b>{new Intl.NumberFormat('ru-RU').format(wa.kol2)}</b></Table.HeaderCell>}
                            {this.state.button3 && <Table.HeaderCell ><b>{new Intl.NumberFormat('ru-RU').format(wa.summa2)}</b></Table.HeaderCell>}                  
                            <Table.HeaderCell><b>{new Intl.NumberFormat('ru-RU').format(wa.kol3)}</b></Table.HeaderCell>
                            <Table.HeaderCell><b>{new Intl.NumberFormat('ru-RU').format(wa.summa3)}</b></Table.HeaderCell>               
                            <Table.HeaderCell><b>{new Intl.NumberFormat('ru-RU').format(wa.kol4)}</b></Table.HeaderCell>
                            <Table.HeaderCell><b>{new Intl.NumberFormat('ru-RU').format(wa.summa4)}</b></Table.HeaderCell>
                            
                        </Table.Row> 
                    );
        
                })
            }

            
    render(){
        return (

            
            <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
                <Header as="h2" block>
                    Сервис за период в разрезе филиалов (Количество и сумма)
                </Header>
                
                

                <Grid>
                    <Grid.Row  >
                        <Grid.Column mobile={16} tablet={16} computer={16}>
                            <Table >      
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Button.Group>  
                                            <Button positive={this.state.button1} onClick={()=>this.onSelectTableType(1)} >
                                                Параметры поиска
                                            </Button>
                                            <Button.Or text=' | '/>
                                            <Button positive={this.state.button2} onClick={()=>this.onSelectTableType(2)} >
                                                Уборочная система
                                            </Button>
                                            <Button.Or text=' | '/>
                                            <Button positive={this.state.button3} onClick={()=>this.onSelectTableType(3)} >
                                                Система очистки воды
                                            </Button>
                                            </Button.Group>
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>        
                            </Table>
                        </Grid.Column>                        
                    </Grid.Row>
                    {this.state.button1 &&
                    <Grid.Row  >
                        <Grid.Column mobile={16} tablet={16} computer={8}>
                        <Table  compact>
                                <Table.Body>
                                <Table.Row>
                                    <Table.Cell  collapsing>
                                        <Icon name='folder' />
                                        Компания
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Dropdown placeholder='Компания' fluid selection options={this.state.companyOptions} value={this.state.searchTerm.bukrs} 
                                            onChange={(e, { value }) => this.onInputChange(value,'bukrs')} />
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
                                        С <DatePicker 
                                            showMonthDropdown showYearDropdown dropdownMode="select" //timezone="UTC"
                                            selected={this.state.searchTerm.dateFrom} locale="ru"
                                            onChange={(event) => this.onInputChange(event,"dateFrom")} 
                                            dateFormat="DD.MM.YYYY" />
                                            по <DatePicker 
                                            showMonthDropdown showYearDropdown dropdownMode="select" //timezone="UTC"
                                            selected={this.state.searchTerm.dateTo} locale="ru"
                                            onChange={(event) => this.onInputChange(event,"dateTo")} 
                                            dateFormat="DD.MM.YYYY" />
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
                    }
                    {((this.state.button2 && !this.state.button3) || (!this.state.button2 && this.state.button3)) &&
                    <Grid.Row>
                        <Grid.Column mobile={16} tablet={16} computer={16}>
                            <Header as="h3" block>
                                {this.state.resultDate}
                            </Header>
                            <Table  striped compact collapsing fixed celled   id="serrep1Table">
                                <Table.Header >
                                
                                    
                                    <Table.Row>
                                        <Table.HeaderCell rowSpan="2">Филиал</Table.HeaderCell>
                                        <Table.HeaderCell rowSpan="2">Валюта</Table.HeaderCell>
                                        
                                        {this.state.button3 &&
                                        <Table.HeaderCell colSpan='2' textAlign="center" >Замена фильтров</Table.HeaderCell>}
                                        {this.state.button3 &&
                                        <Table.HeaderCell colSpan='2' textAlign="center" >Установка</Table.HeaderCell>}
                                    
                                        <Table.HeaderCell colSpan='2' textAlign="center">Сервисное обслуживание</Table.HeaderCell>
                                        <Table.HeaderCell colSpan='2' textAlign="center">Сервис пакеты</Table.HeaderCell>
                                    </Table.Row>
                                    <Table.Row>        

                 {this.state.button3 && <Table.HeaderCell>Количество</Table.HeaderCell>}
                 {this.state.button3 && <Table.HeaderCell>Сумма</Table.HeaderCell>}
                 {this.state.button3 && <Table.HeaderCell>Количество</Table.HeaderCell>}
                 {this.state.button3 && <Table.HeaderCell>Сумма</Table.HeaderCell>}
                                        
                                    
                                        <Table.HeaderCell>Количество</Table.HeaderCell>
                                        <Table.HeaderCell>Сумма</Table.HeaderCell>
                                        <Table.HeaderCell>Количество</Table.HeaderCell>
                                        <Table.HeaderCell>Сумма</Table.HeaderCell>
                                    </Table.Row>
                                
                                </Table.Header>       
                                <Table.Body>
                                    {this.renderTable()}
                                </Table.Body>
                                <Table.Footer>
                                    {this.renderTableFooter()}
                                </Table.Footer>      
                            </Table>      
                            
                               
                             
                        </Grid.Column>
                        
                    </Grid.Row>
                    }
                </Grid>
                


                 
            </Container>

        );
        
        
    }

};

function mapStateToProps(state)
{
    return { };
}

export default connect(mapStateToProps,{ notify }) (Serrep1);

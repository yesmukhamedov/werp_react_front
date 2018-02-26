import React,{ Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Dropdown, Icon, Container, Header, Grid, Input, Checkbox} from 'semantic-ui-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import axios from 'axios';
import {ROOT_URL} from '../../../utils/constants';
import { notify } from '../../../general/notification/notification_action';
import '../serrep1/serrep1.css';
import SemanticPagination from '../../../general/pagination/semanticTableFooter/semanticPagination';
import { fetchBukrsOptions } from '../../../reference/f4/bukrs/BukrsOptions';
import { fetchBranchOptions } from '../../../reference/f4/branch/BranchOptions';
require('moment/locale/ru');
// const arrayList= ;
class Serrep4 extends Component {

    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props){
        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
        var firstDay = new Date(y, m, 1);
        var lastDay = new Date(y, m + 1, 0);
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
        this.onSearchClick = this.onSearchClick.bind(this);
        this.onSelectTableType = this.onSelectTableType.bind(this);
        
        this.state={searchTerm:{bukrs:'',branchList:[],dateFrom:moment(firstDay),dateTo:moment(lastDay),warranty:true}, companyOptions:[], branchOptions:[],
        button1:true,button2:false,button3:false, pyl:[],filter:[],currentTable:[],resultDate:'',pylSelectedPageNumber:1,filterSelectedPageNumber:1, currentSelectedPageNumber:1,
        pylRowNumbers:0,pylTotalPageNumbers:1,filterRowNumbers:0,filterTotalPageNumbers:1
        };
    }

    componentWillMount() {
        

        fetchBukrsOptions().then((returnValue)=>{
            this.setState({companyOptions:returnValue});

        });


        if (this.state.companyOptions.size===1){
            this.onInputChange(this.state.companyOptions[0].value,'bukrs');
        }


        

    }
    onInputChange(value,stateFieldName){
        let waSearchTerm = Object.assign({}, this.state.searchTerm);
        if (stateFieldName==="bukrs")
        {               
            waSearchTerm.bukrs=value;
            waSearchTerm.branchList=[];   
            fetchBranchOptions(value,'service').then((returnValue)=>{
                this.setState({branchOptions:returnValue});
    
            });
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
        else if (stateFieldName==='warranty') { 
            waSearchTerm.warranty=!waSearchTerm.warranty; 
        }
        this.setState({searchTerm:waSearchTerm});
        
        // console.log(this.state);
    }

    onSearchColumn(value,stateFieldName){
        // let waCurrentTable;
        // let waResultTable;
        // if (this.state.button2) waCurrentTable = Object.assign({}, this.state.pyl);
        // if (this.state.button3) waCurrentTable = Object.assign({}, this.state.filter);
        
        // if (stateFieldName==="code")
        // {               
        //     // waSearchTerm.bukrs=value;
        //     // waSearchTerm.branchList=[];   
        //     // this.fetchUserBranches(value);
        // }
        // else if (stateFieldName==='matnrName') { 
        //     // waSearchTerm.branchList=value;
        //     console.log(stateFieldName)         
        // }
        // this.setState({searchTerm:waSearchTerm});
        
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

        axios.get(`${ROOT_URL}/api/service/reports/serrep4/search`, {
            headers: {
                authorization: localStorage.getItem('token')
            },
            params:{
                bukrs:this.state.searchTerm.bukrs,
                branchIds:this.state.searchTerm.branchList.join(),
                dateFrom:searchDateFrom,
                dateTo:searchDateTo,
                warranty:this.state.searchTerm.warranty
            }
        })
        .then((response) => {
            this.setState({
                ...this.state,
                pyl:response.data.pyl,
                filter:response.data.filter,
                currentTable:response.data.pyl,
                pylRowNumbers:response.data.pylRowNumbers,
                pylTotalPageNumbers:response.data.pylTotalPageNumbers,
                filterRowNumbers:response.data.filterRowNumbers,
                filterTotalPageNumbers:response.data.filterTotalPageNumbers,
                pylSelectedPageNumber:1,filterSelectedPageNumber:1, currentSelectedPageNumber:1,
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

    

    

    onSelectTableType(index){

        if (index===1) {this.setState({...this.state,currentTable:this.state.pyl,button1:true,button2:false,
            button3:false, currentSelectedPageNumber:this.state.pylSelectedPageNumber});}
        else if (index===2) {this.setState({...this.state,currentTable:this.state.pyl,button1:false,button2:true,
            button3:false, currentSelectedPageNumber:this.state.pylSelectedPageNumber});}
        else if (index===3) {this.setState({...this.state,currentTable:this.state.filter,button1:false,button2:false,
            button3:true, currentSelectedPageNumber:this.state.filterSelectedPageNumber});}
    }

    renderTable() {
        if (this.state.currentTable[this.state.currentSelectedPageNumber-1]==null) return "";
        return this.state.currentTable[this.state.currentSelectedPageNumber-1].list.map((wa,idx)=>{
      
            return (
                
                  
               
                <Table.Row key={idx}>              
                         
                    <Table.Cell>{wa.branchName}</Table.Cell>
                    <Table.Cell>{wa.code}</Table.Cell>               
                    <Table.Cell>{wa.matnrName}</Table.Cell>
                    <Table.Cell>{new Intl.NumberFormat('ru-RU').format(wa.zavodCena)}</Table.Cell>       
                    <Table.Cell>{new Intl.NumberFormat('ru-RU').format(wa.kol)}</Table.Cell>         
                </Table.Row> 
            );

        })
    }
    

            
    render(){
        return (

            
            <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
                <Header as="h2" block>
                    Израсходованные материалы за период
                </Header>
                
                

                <Grid>
                    <Grid.Row  >
                        <Grid.Column mobile={16} tablet={16} computer={16}>
                            <Table>      
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
                                        Гарантия
                                    </Table.Cell> 
                                    <Table.Cell>                                    
                                        <Checkbox  checked={this.state.searchTerm.warranty} onChange={(event,{value})=>this.onInputChange(value, 'warranty')}/>
                                    </Table.Cell>
                                    <Table.Cell></Table.Cell>
                                    </Table.Row>
                                    
                                    {/*      */}
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
                                            dateFormat="DD.MM.YYYY"  />
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
                            <Table   striped celled  id="serrep4Table">
                                <Table.Header >
                                
                                    
                                    <Table.Row>
                                        <Table.HeaderCell>Филиал</Table.HeaderCell>
                                        <Table.HeaderCell>Код <div><Input icon='search' iconPosition='left' placeholder='Поиск' 
                                        onChange={(e, { value }) => this.onSearchColumn(value,'code')}
                                        /></div></Table.HeaderCell>
                                        <Table.HeaderCell>Название <div><Input icon='search' iconPosition='left' placeholder='Поиск' 
                                        onChange={(e, { value }) => this.onSearchColumn(value,'matnrName')}
                                        /></div></Table.HeaderCell>
                                        <Table.HeaderCell>Завод. цена</Table.HeaderCell>
                                        <Table.HeaderCell>Количество</Table.HeaderCell>
                                        
                                    </Table.Row>
                                
                                </Table.Header>       
                                <Table.Body>
                                    {this.renderTable()}
                                </Table.Body>
                                <Table.Footer>
                                    <Table.Row>
                                <Table.HeaderCell colSpan='5'>
                                {this.state.button2 && <SemanticPagination rowNumbers={this.state.pylRowNumbers} pageNumbers={this.state.pylTotalPageNumbers} 
                                selectedPageNumber={this.state.pylSelectedPageNumber} 
                                selectPageNumber={(selectedPageNumber)=>this.setState({pylSelectedPageNumber:selectedPageNumber, currentSelectedPageNumber:selectedPageNumber})}/>}

                                {this.state.button3 && <SemanticPagination rowNumbers={this.state.filterRowNumbers} pageNumbers={this.state.filterTotalPageNumbers} 
                                selectedPageNumber={this.state.filterSelectedPageNumber} 
                                selectPageNumber={(selectedPageNumber)=>this.setState({filterSelectedPageNumber:selectedPageNumber, currentSelectedPageNumber:selectedPageNumber})}/>}            
                                </Table.HeaderCell>
                                
                                    {/* {this.renderTableFooter()} */}
                                    </Table.Row>
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

export default connect(mapStateToProps,{ notify }) (Serrep4);

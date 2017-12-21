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
import '../serrep1/serrep1.css';
require('moment/locale/ru');
// const arrayList= ;
class Serrep3 extends Component {

    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props){
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
        this.onSearchClick = this.onSearchClick.bind(this);
        this.onSelectTableType = this.onSelectTableType.bind(this);
        
        this.state={searchTerm:{bukrs:'',branchList:[],date:''}, companyOptions:[], branchOptions:[],
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
        else if (stateFieldName==='date') { 
            waSearchTerm.date=value; 
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
        
        if (this.state.searchTerm.date===null || this.state.searchTerm.date.length===0)
        {
            this.props.notify('error','Выберите период','Ошибка');
            return;
        }

        let strVal = this.state.searchTerm.date.format('YYYY-MM-DD');
        let searchDate = moment.utc(strVal).format();

        axios.get(`${ROOT_URL}/api/service/reports/serrep3/search`, {
            headers: {
                authorization: localStorage.getItem('token')
            },
            params:{
                bukrs:this.state.searchTerm.bukrs,
                branchIds:this.state.searchTerm.branchList.join(),
                date:searchDate
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
                    <Table.Cell>{new Intl.NumberFormat('ru-RU').format(wa.total)}</Table.Cell>
                    <Table.Cell>{new Intl.NumberFormat('ru-RU').format(wa.war)}</Table.Cell>       
                    <Table.Cell>{new Intl.NumberFormat('ru-RU').format(wa.notWar)}</Table.Cell>          
                </Table.Row> 
            );

        })
    }
    
    renderTableFooter() {
        
                return this.state.currentTableTotal.map((wa,idx)=>{
                    
                    return (
                        
                        <Table.Row key={idx}>    
                            <Table.HeaderCell><b>Всего</b></Table.HeaderCell>               
                            <Table.HeaderCell><b>{new Intl.NumberFormat('ru-RU').format(wa.total)}</b></Table.HeaderCell>
                            <Table.HeaderCell><b>{new Intl.NumberFormat('ru-RU').format(wa.war)}</b></Table.HeaderCell>               
                            <Table.HeaderCell><b>{new Intl.NumberFormat('ru-RU').format(wa.notWar)}</b></Table.HeaderCell>                            
                        </Table.Row> 
                    );
        
                })
            }

            
    render(){
        return (

            
            <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
                <Header as="h2" block>
                    Количество договоров по гарантии в разрезе филиалов
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
                                        <DatePicker 
                                            showMonthDropdown showYearDropdown dropdownMode="select" //timezone="UTC"
                                            selected={this.state.searchTerm.date} locale="ru"
                                            onChange={(event) => this.onInputChange(event,"date")} 
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
                                <Table.Header>                                
                                    <Table.Row>                                               
                                        <Table.HeaderCell>Филиал</Table.HeaderCell>
                                        <Table.HeaderCell>Всего</Table.HeaderCell>
                                        <Table.HeaderCell>в гарантии</Table.HeaderCell>
                                        <Table.HeaderCell>не в гарантии</Table.HeaderCell>
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

export default connect(mapStateToProps,{ notify }) (Serrep3);

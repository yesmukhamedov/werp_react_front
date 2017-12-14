import React,{ Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Modal, Dropdown, Icon, Container, Header, Grid, Tab, Label, Input,Checkbox } from 'semantic-ui-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import axios from 'axios';
import {ROOT_URL} from '../../../utils/constants';
import { notify } from '../../../general/notification/notification_action';
import NumberFormat from 'react-number-format';



// const arrayList= ;
class Serrep2 extends Component {

    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props){
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
        this.onSearchClick = this.onSearchClick.bind(this);
        this.onSelectTableType = this.onSelectTableType.bind(this);
        
        
        this.state={searchTerm:{bukrs:'',branchList:[],date:'',today:true,archive:false}, companyOptions:[], branchOptions:[],
        button1:true,button2:false,button3:false, tek:[],pros:[],all:[],currentTable:[],tekTotal:[],prosTotal:[],allTotal:[],currentTableTotal:[],resultDate:''};
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
        }else if (stateFieldName==='today') { 
            waSearchTerm.today=!waSearchTerm.today; 
            waSearchTerm.archive=!waSearchTerm.archive; 
        }else if (stateFieldName==='archive') { 
            waSearchTerm.today=!waSearchTerm.today; 
            waSearchTerm.archive=!waSearchTerm.archive; 
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
        
        let strVal = '';
        let searchDate = '';
        if (this.state.searchTerm.archive && (this.state.searchTerm.date===null || this.state.searchTerm.date.length===0))
        {
            this.props.notify('error','Выберите месяц','Ошибка');
            return;
        }else if (this.state.searchTerm.archive){
            strVal = this.state.searchTerm.date.format('YYYY-MM')+'-01';
            searchDate = moment.utc(strVal).format();
        }
        

        axios.get(`${ROOT_URL}/api/service/reports/serrep2/search`, {
            headers: {
                authorization: localStorage.getItem('token')
            },
            params:{
                bukrs:this.state.searchTerm.bukrs,
                branchIds:this.state.searchTerm.branchList.join(),
                date:searchDate,
                archive:this.state.searchTerm.archive
            }
        })
        .then((response) => {
            this.setState({
                ...this.state,
                all:response.data.all,
                tek:response.data.tek,
                pros:response.data.pros,
                currentTable:response.data.tek,
                allTotal:response.data.allTotal,
                tekTotal:response.data.tekTotal,
                prosTotal:response.data.prosTotal,
                currentTableTotal:response.data.tekTotal,
                button1:true,
                button2:false,
                button3:false,
                resultDate:response.data.resultDate

            })
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
        })

    }

    onSaveClick(){
        axios.post(`${ROOT_URL}/api/service/reports/serrep2/save`, {
            a_all:this.state.all,
            a_tek:this.state.tek,
            a_pros:this.state.pros
            
        },
        
        {            
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
        .then((response) => {
            
            this.props.notify('success','Сохранен.','Успешно');
        })
        .catch((error) => {
            if (error.response.status===403)
            {
                this.context.router.push('/forbidden');
            }
            else
            {
                this.props.notify('error',error.response.data.message,'Ошибка');
            }
            
        })

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

        if (index===1) {this.setState({...this.state,currentTable:this.state.tek,button1:true,button2:false,button3:false,currentTableTotal:this.state.tekTotal}); }
        else if (index===2) this.setState({...this.state,currentTable:this.state.pros,button1:false,button2:true,button3:false,currentTableTotal:this.state.prosTotal});
        else if (index===3) this.setState({...this.state,currentTable:this.state.all,button1:false,button2:false,button3:true,currentTableTotal:this.state.allTotal});

    }

    renderTable() {
        let stripColor = 'orange';
        return this.state.currentTable.map((wa,idx)=>{
      
            return (
                
                  
               
                <Table.Row key={idx} >  
                       
                    <Table.Cell>{wa.bukrs}</Table.Cell>        
                    <Table.Cell>{wa.branchName}</Table.Cell>
                    <Table.Cell>{new Intl.NumberFormat('ru-RU').format(wa.f1)}</Table.Cell>
                    <Table.Cell>{new Intl.NumberFormat('ru-RU').format(wa.f2)}</Table.Cell>
                    <Table.Cell>{new Intl.NumberFormat('ru-RU').format(wa.f3)}</Table.Cell>
                    <Table.Cell>{new Intl.NumberFormat('ru-RU').format(wa.f4)}</Table.Cell>
                    <Table.Cell>{new Intl.NumberFormat('ru-RU').format(wa.f5)}</Table.Cell>
                    <Table.Cell><Label>{wa.waers}</Label>
                    {new Intl.NumberFormat('ru-RU').format(wa.dmbtr)}
                    {/* <NumberFormat thousandSeparator={' '}  value={wa.dmbtr} decimalScale={2} fixedDecimalScale/> */}
                    </Table.Cell>

                    
                </Table.Row> 
            );

        })
    }
    renderTableFooter() {
        
                return this.state.currentTableTotal.map((wa,idx)=>{
                    
                    return (
                        
                        <Table.Row key={idx}>            
                            <Table.HeaderCell></Table.HeaderCell>        
                            <Table.HeaderCell><b>Всего</b></Table.HeaderCell>
                            <Table.HeaderCell><b>{new Intl.NumberFormat('ru-RU').format(wa.f1)}</b></Table.HeaderCell>
                            <Table.HeaderCell><b>{new Intl.NumberFormat('ru-RU').format(wa.f2)}</b></Table.HeaderCell>
                            <Table.HeaderCell><b>{new Intl.NumberFormat('ru-RU').format(wa.f3)}</b></Table.HeaderCell>
                            <Table.HeaderCell><b>{new Intl.NumberFormat('ru-RU').format(wa.f4)}</b></Table.HeaderCell>
                            <Table.HeaderCell><b>{new Intl.NumberFormat('ru-RU').format(wa.f5)}</b></Table.HeaderCell>
                            <Table.HeaderCell><Label>{wa.waers}</Label><b>{new Intl.NumberFormat('ru-RU').format(wa.dmbtr)}</b>
                            {/* <NumberFormat thousandSeparator={' '}  value={wa.dmbtr} decimalScale={2} fixedDecimalScale/> */}
                            </Table.HeaderCell>
        
                            
                        </Table.Row> 
                    );
        
                })
            }
    render(){
        return (

            
            <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
                <Header as="h2" block>
                    Отчет по сумме и по колличестве фильтров и мембран
                </Header>



                <Grid>
                    <Grid.Row  columns={2}>
                        <Grid.Column mobile={16} tablet={16} computer={4}>

                <Grid verticalAlign='middle' textAlign='justified' >
                    <Grid.Row  columns={2}>
                        <Grid.Column mobile={16} tablet={8} computer={4}>
                            Компания
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={8} computer={12}>
                            <Dropdown placeholder='Компания' fluid selection options={this.state.companyOptions} value={this.state.searchTerm.bukrs} 
                                            onChange={(e, { value }) => this.onInputChange(value,'bukrs')} />
                        </Grid.Column>
                        
                    </Grid.Row>
                    <Grid.Row  columns={2}>
                        <Grid.Column mobile={16} tablet={8} computer={4}>
                        Филиал
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={8} computer={12}>
                        <Dropdown placeholder='Все' fluid multiple search selection options={this.state.branchOptions} value={this.state.searchTerm.branchList} 
                        onChange={(e, { value }) => this.onInputChange(value,'branch')} />
                        </Grid.Column>
                        
                    </Grid.Row>
                    
                    <Grid.Row  columns={2}>
                        <Grid.Column mobile={16} tablet={8} computer={4}>
                            На сегодня
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={8} computer={12}>
                            <Checkbox  checked={this.state.searchTerm.today} onChange={(event)=>this.onInputChange(event, 'today')}/>    
                        </Grid.Column>
                        
                    </Grid.Row>
                    <Grid.Row  columns={2}>
                        <Grid.Column mobile={16} tablet={8} computer={4}>
                            Из архива
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={8} computer={12}>
                            <Checkbox  checked={this.state.searchTerm.archive} onChange={(event)=>this.onInputChange(event, 'archive')}/>                        
                        </Grid.Column>
                        
                    </Grid.Row>
                    <Grid.Row  columns={2}>
                        <Grid.Column mobile={16} tablet={8} computer={4}>
                            Месяц
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={8} computer={12}>
                            <DatePicker 
                                            showMonthDropdown showYearDropdown dropdownMode="select" //timezone="UTC"
                                            selected={this.state.searchTerm.date} locale="en-gb"
                                            onChange={(event) => this.onInputChange(event,"date")} disabled={!this.state.searchTerm.archive}
                                            dateFormat="MM.YYYY" />

                        </Grid.Column>
                        
                    </Grid.Row>
                    <Grid.Row  columns={2}>
                        <Grid.Column mobile={16} tablet={8} computer={4}>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={8} computer={12}>
                            <Button icon labelPosition='left' primary size='small' onClick={this.onSearchClick.bind(this)}>
                                <Icon name='search' size='large' />
                                Поиск
                            </Button>

                        </Grid.Column>
                        
                    </Grid.Row>
                    
                </Grid>


                
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={16} computer={12}>
                            <Table  >      
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Button icon labelPosition='left' primary size='small' onClick={this.onSaveClick.bind(this)}>
                                                <Icon name='save' size='large' />Сохранить
                                            </Button>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Button.Group>  
                                            <Button positive={this.state.button1} onClick={()=>this.onSelectTableType(1)} >
                                                Текущие
                                            </Button>
                                            <Button.Or text=' | '/>
                                            <Button positive={this.state.button2} onClick={()=>this.onSelectTableType(2)} >
                                                Просрочные
                                            </Button><Button.Or text=' | '/>
                                            <Button positive={this.state.button3}  onClick={()=>this.onSelectTableType(3)} >
                                                Текущие + Просрочные
                                            </Button>
                                            </Button.Group>
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>        
                            </Table>
                            <Table compact striped celled id="zamenaFilterTable">
                                <Table.Header >
                                    <Table.Row>
                                        <Table.HeaderCell colSpan='8' textAlign="center">{this.state.resultDate}</Table.HeaderCell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.HeaderCell>Компания</Table.HeaderCell>
                                        <Table.HeaderCell>Филиал</Table.HeaderCell>
                                        <Table.HeaderCell>Фильтр 1</Table.HeaderCell>
                                        <Table.HeaderCell>Фильтр 2</Table.HeaderCell>
                                        <Table.HeaderCell>Фильтр 3</Table.HeaderCell>
                                        <Table.HeaderCell>Фильтр 4</Table.HeaderCell>
                                        <Table.HeaderCell>Фильтр 5</Table.HeaderCell>
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
                    
                </Grid>
                


                 
            </Container>

        );
        
        
    }

};

function mapStateToProps(state)
{
    return { };
}

export default connect(mapStateToProps,{ notify }) (Serrep2);

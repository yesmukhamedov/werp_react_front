import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Table   } from 'semantic-ui-react';
import { Button, Header, Image, Modal, Dropdown, Grid, Icon } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './customerF4.css';
import moment from 'moment';
import axios from 'axios';
import {ROOT_URL} from '../../../utils/constants';

const options = [
    { key: 1, text: 'Юр', value: 1 },
    { key: 2, text: 'Физ', value: 2 },
  ]
  var options2 = [
    { key: 1, text: 'Qazaqstan', value: 1 },
    { key: 2, text: 'Turkey', value: 2 },
  ]  

 
// const arrayList= ;
class CustomerF4 extends Component {
    componentWillMount(){


        this.fetchCountries().then(result => 
            {   
                // let data = result.data;
                const map = result.data;
                const data = Object.keys(map).map((key) => map[key]);
                // console.log(data);
                data.map((country)=>{
                    var newStateArray = this.state.countryList.slice();
                    newStateArray.push({key: country.country_id,text: country.country, value:country.country_id});
                    this.setState({countryList: newStateArray});

        
                })
            }
          )

        // this.fetchCustomers().then(result => 
        //     {   
        //         // let data = result.data;
        //         const map = result.data;
        //         console.log(map);
        //     }
        // )
        
    }

    fetchCountries() {
        // replace with whatever your api logic is.
        return axios.get(`${ROOT_URL}/reference/FETCH_COUNTRIES`);
    }
    fetchCustomers() {
        // replace with whatever your api logic is.
        console.log(333);
        let customer = Object.assign({}, this.state.customerSearchTerm);
        console.log(customer);
        if(!customer.country_id)
        {
            customer.country_id=0;
        }
        return axios.post(`${ROOT_URL}/general/FETCH_CUSTOMERS34`,{customer}).then(result=>{

            this.setState({customerList: result.data});
        });
        console.log(this.state);



    }

    constructor(props){
        super(props);
        this.state = {customerList:[],countryList:[],
            customerSearchTerm:{fiz_yur:"",iin_bin:"",name:"",firstname:"",lastname:"",middlename:"",birthday:"",passport_id:"",country_id:""},
            disableFiz:true,disableYur:true};


        
    }



    renderUsers() {


        return this.state.customerList.map((cus,idx)=>{
            console.log(cus);
            var wa_birthday;
            if (cus.birthday) {wa_birthday = moment(cus.birthday).format("DD.MM.YYYY")}
            return (
                
                <Table.Row key={idx}>
                    
                    <Table.Cell>{cus.fiz_yur}</Table.Cell>
                    <Table.Cell>{cus.iin_bin}</Table.Cell>
                    <Table.Cell>{cus.name}</Table.Cell>
                    <Table.Cell>{cus.fullFIO}</Table.Cell>
                    <Table.Cell>{wa_birthday}</Table.Cell>
                    <Table.Cell>{cus.passport_id}</Table.Cell>
                                    {/* <Table.HeaderCell>Физ/Юр</Table.HeaderCell>
                                    <Table.HeaderCell>ИИН/БИН</Table.HeaderCell>
                                    <Table.HeaderCell>Название</Table.HeaderCell>
                                    <Table.HeaderCell>ФИО</Table.HeaderCell>
                                    <Table.HeaderCell>День рождения</Table.HeaderCell>
                                    <Table.HeaderCell>Номер паспорта</Table.HeaderCell> */}
                </Table.Row> 
            );

        })
    }
    clearSelectedCountry () {
        let waCustomerSearchTerm = Object.assign({}, this.state.customerSearchTerm);
        waCustomerSearchTerm.country_id="";
        this.setState({customerSearchTerm:waCustomerSearchTerm});
    }   

    // onRowSelect(a_userId,a_userName,a_fio){
    //     this.props.fethcUserBranches(a_userId);
    //     this.props.onUserSelect(a_fio);
    // }
    onInputChange(value,stateFieldName){
        let waCustomerSearchTerm = Object.assign({}, this.state.customerSearchTerm);
        // console.log(waCustomerSearchTerm);
        // console.log(value);
        if (stateFieldName==="fiz_yur")
        {   
            waCustomerSearchTerm.fiz_yur=value;
            if (value===1){
                this.setState({disableFiz:true,disableYur:false});
                waCustomerSearchTerm.firstname="";
                waCustomerSearchTerm.lastname="";
                waCustomerSearchTerm.middlename="";
                waCustomerSearchTerm.passport_id="";
                waCustomerSearchTerm.birthday="";
            } 
            else{
                this.setState({disableFiz:false,disableYur:true});
                waCustomerSearchTerm.name="";
            } 
        }
        else if (stateFieldName==='birthday') waCustomerSearchTerm.birthday=value;
        else if (stateFieldName==='iin_bin') waCustomerSearchTerm.iin_bin=value;
        else if (stateFieldName==='name') waCustomerSearchTerm.name=value;
        else if (stateFieldName==='firstname') waCustomerSearchTerm.firstname=value;
        else if (stateFieldName==='lastname') waCustomerSearchTerm.lastname=value;
        else if (stateFieldName==='middlename') waCustomerSearchTerm.middlename=value;
        else if (stateFieldName==='passport_id') waCustomerSearchTerm.passport_id=value;
        else if (stateFieldName==='country_id') waCustomerSearchTerm.country_id=value;
        this.setState({customerSearchTerm:waCustomerSearchTerm});
        // console.log(this.state);
    }
    render(){
        
        // const renderDatePicker = ({input, placeholder, defaultValue,disabled, meta: {touched, error} }) => (
        // <div>
        //         <DatePicker {...input} isClearable="true"  onChange={value => input.onChange(value,"birthday")} 
        //         disabled={disabled}
        //         placeholderText={" "+placeholder} dateFormat=" DD.MM.YYYY" selected={input.value ? moment(input.value) : null} />
        //         {touched && error && <span>{error}</span>}
        // </div>
        // );

        
        return (
            

            <div id="">

                <Modal trigger={<Button>Show Modal</Button>}>
                    <Modal.Content>
                        <h3>Search for customer</h3>
                        
                        <Table compact collapsing sortable id="customerF4SearchForm">           
                            <Table.Body>
                                <Table.Row>                
                                    <Table.Cell>Физ/Юр</Table.Cell>                                    
                                    <Table.Cell><Dropdown fluid selection options={options} value={this.state.customerSearchTerm.fiz_yur} 
                                    onChange={(e, { value }) => this.onInputChange(value,"fiz_yur")}/></Table.Cell>
                                    <Table.Cell></Table.Cell>
                                    <Table.Cell>Имя</Table.Cell>
                                    <Table.Cell><input type="text" className="form-control" value={this.state.customerSearchTerm.firstname}  
                                    onChange={event => this.onInputChange(event.target.value,"firstname")}
                                    disabled={this.state.disableFiz} 
                                    /></Table.Cell>                    
                                </Table.Row>
                                <Table.Row>                
                                    <Table.Cell>ИИН/БИН</Table.Cell>
                                    <Table.Cell><input type="text" className="form-control"  value={this.state.customerSearchTerm.iin_bin}
                                    onChange={event => this.onInputChange(event.target.value,"iin_bin")}/></Table.Cell>
                                    <Table.Cell></Table.Cell>
                                    <Table.Cell>Фамилия</Table.Cell>
                                    <Table.Cell><input type="text" className="form-control"  value={this.state.customerSearchTerm.lastname} 
                                    onChange={event => this.onInputChange(event.target.value,"lastname")} disabled={this.state.disableFiz} /></Table.Cell>                    
                                </Table.Row>
                                <Table.Row>                
                                    <Table.Cell>Название</Table.Cell>
                                    <Table.Cell><input type="text" className="form-control" value={this.state.customerSearchTerm.name}
                                    onChange={event => this.onInputChange(event.target.value,"name")} disabled={this.state.disableYur}/></Table.Cell>
                                    <Table.Cell></Table.Cell>
                                    <Table.Cell>Отчество</Table.Cell>
                                    <Table.Cell><input type="text" className="form-control"  value={this.state.customerSearchTerm.middlename} 
                                    onChange={event => this.onInputChange(event.target.value,"middlename")} disabled={this.state.disableFiz} />
                                    </Table.Cell>                    
                                </Table.Row>
                                <Table.Row>                
                                    <Table.Cell>Страна</Table.Cell>
                                    <Table.Cell>                                        
                                        <Dropdown fluid selection options={this.state.countryList} value={this.state.customerSearchTerm.country_id} 
                                        onChange={(e, { value }) => this.onInputChange(value,"country_id")} /> 
                                    </Table.Cell>
                                    <Table.Cell><Icon name='window close' onClick={() => this.clearSelectedCountry()} size='large' inverted className="clickableIcon" color='red'/></Table.Cell>
                                    <Table.Cell>День рождения</Table.Cell>
                                    <Table.Cell>
                                        <DatePicker 
                                            showMonthDropdown showYearDropdown dropdownMode="select"
                                            selected={this.state.customerSearchTerm.birthday}
                                            onChange={(event) => this.onInputChange(event,"birthday")} isClearable={!this.state.disableFiz} 
                                            dateFormat=" DD.MM.YYYY" disabled={this.state.disableFiz} />
                                     </Table.Cell>                    
                                </Table.Row>
                                <Table.Row>                
                                    <Table.Cell></Table.Cell>
                                    <Table.Cell><Button icon labelPosition='left' primary size='small' onClick={() => this.fetchCustomers()} ><Icon name='search' 
                                    size='large' />Поиск</Button></Table.Cell>
                                    <Table.Cell></Table.Cell>
                                    <Table.Cell>Номер паспорта</Table.Cell>
                                    <Table.Cell><input type="text" className="form-control" value={this.state.customerSearchTerm.passport_id} 
                                    disabled={this.state.disableFiz} 
                                    onChange={event => this.onInputChange(event.target.value,"passport_id")}/></Table.Cell>                    
                                </Table.Row>
                            </Table.Body>        
                        </Table>
                    <Table striped compact collapsing selectable id="customerF4Table">
                            <Table.Header >
                                <Table.Row>
                                    <Table.HeaderCell>Физ/Юр</Table.HeaderCell>
                                    <Table.HeaderCell>ИИН/БИН</Table.HeaderCell>
                                    <Table.HeaderCell>Название</Table.HeaderCell>
                                    <Table.HeaderCell>ФИО</Table.HeaderCell>
                                    <Table.HeaderCell>День рождения</Table.HeaderCell>
                                    <Table.HeaderCell>Номер паспорта</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>            
                            <Table.Body>
                                {this.renderUsers()}
                            </Table.Body>        
                        </Table>
                    </Modal.Content>
                </Modal>
                
            </div>

        );
        
    }

};

function mapStateToProps(state)
{
    return { };
}

// function mapDispatchToProps(dispatch){
//     return bindActionCreators({ fetchUsers },dispatch);
// }
export default connect(mapStateToProps,{  }) (CustomerF4);

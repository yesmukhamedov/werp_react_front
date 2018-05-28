import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Dropdown, Icon, Container, Header, Grid,Segment, Form  } from 'semantic-ui-react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import {
  DropdownFormField,
  TextAreaFormField,
  TextInputFormField,
} from '../../../utils/formFields';
import moment from 'moment';
import FaHeader from '../../faHeader';
import FcisPosition from './fcisPosition';
import "react-table/react-table.css";
// import {fetchBonusData,clearRedStateHrb02} from './hrb02_action'
// import {f4FetchBonusTypeList,f4FetchCurrencyList,f4ClearBonusTypeList,f4ClearCurrencyList} from '../../../reference/f4/f4_action'
// import './hrb02.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {f4FetchDepartmentList, f4FetchCurrencyList, f4FetchBusinessAreaList2, f4FetchExchangeRateNational} from '../../../reference/f4/f4_action';
import {changefaBkpf, fetchCashBankHkontsByBranch} from '../../fa_action'


// import Hrb02EditBonus from './hrb02EditBonus';
require('moment/locale/ru');

const categoryOptions = [
    { key: 1, text: 'Уборочная система', value: 1 },
    { key: 2, text: 'Система очистки воды', value: 2 },
    { key: 5, text: 'Сервис', value: 5 }
  ];
  

 
class Fcis extends Component {


    // constructor(props){

    //     super(props);
    //     this.bonusEditModalOpenHandler=this.bonusEditModalOpenHandler.bind(this);
        

        
    //     this.state={searchTerm:{bukrs:'',selectedCategory:1,date:moment(),selectedBranchKey:null}, companyOptions:[], branchOptions:[]
    //     , bonusEditModalOpen:false, selectedBonus:null, selectedBonusIndex:null};
        
    // }

    componentWillMount() {
        // console.log(this.props)
        // this.props.f4FetchBonusTypeList('hrb02');
        this.props.f4FetchCurrencyList('fcis');
        this.props.f4FetchDepartmentList();
        this.props.f4FetchBusinessAreaList2();
        this.props.f4FetchExchangeRateNational();
        
    }
  
 
    
    onInputChange(value,stateFieldName){
        
        
        // console.log(this.state);
    }


    



    // bonusEditModalOpenHandler(index,row){
    //     this.setState({bonusEditModalOpen:true, selectedBonus:row, selectedBonusIndex:index});
    // }
    
    
    
    render(){
       
        
        let username = localStorage.getItem('username');

        return (
            
            <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
                <Header as="h2" block>
                    Personel nakit tahsilati
                </Header>
                
                <FaHeader {...this.props} />
                <FcisPosition brnch={this.props.bkpf.brnch} bukrs={this.props.bkpf.bukrs} waers = {this.props.bkpf.waers}
                
                hkontOptions={this.props.hkontOptions} fetchCashBankHkontsByBranch={(bukrs, brnch)=>this.props.fetchCashBankHkontsByBranch(bukrs, brnch)}/>
                {/* <form onSubmit={handleSubmit}> */}
                    {/* <FcisHeader {...this.props}/> */}
                    {/* <Field name="age" component="input" type="text" placeholder="Age" /> */}
                   
                {/* </form>  */}
              
       
        


        
                     
            </Container>

        );
        
        
    }
    
    // handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex })
    
};


     

  function mapStateToProps(state)
{
    console.log(state,'state');
    return { companyOptions:state.userInfo.companyOptions,
        branchOptions:state.userInfo.branchOptionsAll
        ,currencyOptions:state.f4.currencyOptions
        ,departmentOptions: state.f4.departmentOptions
        ,businessAreaOptions:state.f4.businessAreaList
        ,exRateNational:state.f4.exRateNational
        ,bkpf:state.fa.faForm.bkpf
        ,hkontOptions:state.fa.faForm.hkontOptions
    };
}





export default connect(mapStateToProps,{ f4FetchDepartmentList, f4FetchCurrencyList, 
  f4FetchBusinessAreaList2, f4FetchExchangeRateNational, changefaBkpf, fetchCashBankHkontsByBranch}) (Fcis);
const validate = values => {
    const errors = {}
    console.log(values)
    if (!values.username) {
      errors.username = 'Required'
    } else if (values.username.length > 15) {
      errors.username = 'Must be 15 characters or less'
    }
    if (!values.email) {
      errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }
    if (!values.age) {
      errors.age = 'Required'
    } else if (isNaN(Number(values.age))) {
      errors.age = 'Must be a number'
    } else if (Number(values.age) < 18) {
      errors.age = 'Sorry, you must be at least 18 years old'
    }
    return errors
  }
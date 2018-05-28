import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Dropdown, Icon, Container, Header, Grid,Segment, Input, Checkbox, TextArea, Label, List  } from 'semantic-ui-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
require('moment/locale/ru');

const hkont_hOptions = [
    { key: 1, text: 'Оплатить долг', value: '33500002' },
    { key: 2, text: 'Деньги на хранение', value: '33500001' }
  ];
  

class FcisPosition extends PureComponent{
    constructor(props){

        super(props);
        this.onInputChange = this.onInputChange.bind(this);
        
        this.state = 
        {
            lifnr:'',
            staffFio:'',
            hkont_s:'',
            hkont_h:'',
            summa:0
        };
        
    }

    onInputChange(value,stateFieldName){
      
        this.setState({[stateFieldName]:value});
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.brnch !== this.props.brnch) {
            this.props.fetchCashBankHkontsByBranch(nextProps.bukrs,nextProps.brnch);
          // nextProps.myProp has a different value than our current prop
          // so we can perform some calculations based on the new value
        //   this.props.getCashBankByBranch();
        }
      }
    
    render(){
        const {hkontOptions} = this.props;
        const hkontOptions2 = hkontOptions.filter(item=>
            (item.tovarcategory===this.state.searchTerm.selectedCategory)
            ||(item.businessareaid===this.state.searchTerm.selectedCategory) ).map(item => {
           return {
               key: item.key,
               text: item.text,
               value: item.value
           }
           
       });

        const {
            lifnr,
            staffFio,
            hkont_s,
            hkont_h,
            summa
        } = this.state;

        return(
            <Segment padded size="small">
                
                <Label color="red" ribbon>
                    Позиция
                </Label>
                            <Table  >
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Операция</Table.HeaderCell>
                                    <Table.HeaderCell>Касса</Table.HeaderCell>
                                    <Table.HeaderCell>Сотрудник</Table.HeaderCell>
                                    <Table.HeaderCell>Сумма</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Dropdown placeholder='Операция'   selection options={hkont_hOptions} 
                                            value={hkont_h}  onChange={(e, { value }) => this.onInputChange(value,'hkont_h')} />  
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Dropdown placeholder='Касса'   selection options={hkontOptions?hkontOptions:[]} 
                                            value={hkont_s}  onChange={(e, { value }) => this.onInputChange(value,'hkont_s')} /> 
                                        </Table.Cell>
                                        <Table.Cell>
                                            h
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Input                                            
                                            value={summa}
                                            placeholder={'Сумма'}
                                            onChange={(e, { value }) => this.onInputChange(value,'summa')}
                                            type='number'
                                            />
                                        </Table.Cell>
                                    </Table.Row>                                    
                                </Table.Body>                     
                            </Table>
                            
                                
               
            
           </Segment>
        )
    }
}


export default (FcisPosition)
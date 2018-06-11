import React, { PureComponent } from 'react';
import { Table, Icon, Segment, Label, Input } from 'semantic-ui-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import {moneyFormat,handleFocus} from '../../../utils/helpers';
import _ from "lodash";
require('moment/locale/ru');


class AmsgPaySchedule extends PureComponent{
    constructor(props){

        super(props);
        this.onInputChangePsRows = this.onInputChangePsRows.bind(this);
        this.addRowPS = this.addRowPS.bind(this);
        this.removeRowPs = this.removeRowPs.bind(this)
        this.renderRowsPS = this.renderRowsPS.bind(this);
        this.renderFooterPS = this.renderFooterPS.bind(this);
        this.addOneMonthToLastRowAndReturnDateString = this.addOneMonthToLastRowAndReturnDateString.bind(this);
        
    }
    componentWillMount() {
        
        // this.props.changePaymentSchedule('psRows',psRows);
        // this.setState({psRows});

    }
    componentWillReceiveProps(nextProps) {
        // if(nextProps.brnch !== this.props.brnch) {
            // this.props.fetchCashBankHkontsByBranch(nextProps.bukrs,nextProps.brnch);
          // nextProps.myProp has a different value than our current prop
          // so we can perform some calculations based on the new value
        //   this.props.getCashBankByBranch();
        // }
    }
    


    onInputChangePsRows(value,stateFieldName, idx){
        let psRows = JSON.parse(JSON.stringify(this.props.psRows));
        
        if (stateFieldName==='payment_date')
        {
            psRows[idx].payment_date = value.format( "DD.MM.YYYY");
            for(let i=idx+1;i<psRows.length;i++){
                psRows[i].payment_date = moment(psRows[i-1].payment_date, 'DD.MM.YYYY').add(1, 'M').format( "DD.MM.YYYY");
            }
            this.props.changePaymentSchedule('psRows',psRows); 
        }
        else if (stateFieldName==='sum2'){      
            if (value===''){
                value = '0';
            }
            value = value.replace(/\s+/g, '');
            
            if (value.charAt(value.length-1)==='.'){
                psRows[idx].sum2 = value;
                this.props.changePaymentSchedule('psRows',psRows);               
                // this.setState({psRows});  
            }else
            {
                value = parseFloat(value);
                const dec1 = /^\$?[0-9]+(\.[0-9][0-9])?$/; //^[0-9\b]+$/;
                const dec2 = /^\$?[0-9]+(\.[0-9])?$/; //^[0-9\b]+$/;
                if (value === '' || dec1.test(value) || dec2.test(value)) {
                    psRows[idx].sum2 = value;
                    this.props.changePaymentSchedule('psRows',psRows);
                    // this.setState({psRows});  
                }
            }
            
        }
    }
   
    addRowPS(){
        if (this.props.psRows.length===7) {
            return '';
        }
        let row = Object.assign({}, this.props.emptyPsRow);
        let psRows =  JSON.parse(JSON.stringify(this.props.psRows));
        row.payment_date = this.addOneMonthToLastRowAndReturnDateString(psRows);
        psRows.push(row);
        this.props.changePaymentSchedule('psRows',psRows);
        // this.setState({psRows});
    }
    removeRowPs(idx){        
        let psRows =  JSON.parse(JSON.stringify(this.props.psRows));
        let psRows2 =  [];
        for(let i = 0; i<psRows.length; i++){
            if (idx!==i){                
                let row = Object.assign({}, psRows[i]);
                if (i>1)
                {
                    row.payment_date = this.addOneMonthToLastRowAndReturnDateString(psRows2);
                }
                psRows2.push(row);
            }
        }
        this.props.changePaymentSchedule('psRows',psRows2);
        // this.setState({psRows:psRows2});
    }
    addOneMonthToLastRowAndReturnDateString(a_rows){
        let date = '';
        if (a_rows!==null && a_rows.length>0){
            date = moment(a_rows[a_rows.length-1].payment_date, 'DD.MM.YYYY').add(1, 'M').format( "DD.MM.YYYY");
        }
        return date;
    }
    renderRowsPS(){
        let psName = '';
        return this.props.psRows.map((item, idx) => {
            if (idx===0) { psName = "Первоначальный взнос" }
            else  { psName = "Ежемесячный взнос" }
            // if (idx>1){
                return (
                    <Table.Row key={idx}>              
                        <Table.Cell>
                            { psName }
                        </Table.Cell>
                        <Table.Cell>                    
                              <DatePicker className='date-auto-width'
                              showMonthDropdown showYearDropdown dropdownMode="select" //timezone="UTC"
                              selected={item.payment_date?moment(item.payment_date, 'DD.MM.YYYY'):''} 
                              onChange={(e, {value}) => this.onInputChangePsRows(e,'payment_date',idx)} 
                              locale="ru" disabled={idx!==1}                               
                              dateFormat="DD.MM.YYYY" />
                              </Table.Cell>
                        <Table.Cell><Input 
                                        value={moneyFormat(item.sum2)} 
                                        maxLength='18'  onChange={(e, {value}) => this.onInputChangePsRows(value,'sum2',idx)} 
                                        onFocus={handleFocus} /> 
                        </Table.Cell>
                        <Table.Cell>
                            {idx>1 &&
                                <Icon name='remove' onClick={() => this.removeRowPs(idx)} 
                                size='large'  className='clickableIcon' color='red' />
                            }
                            
                        </Table.Cell>
                    </Table.Row>
                  )
            // }
            
          })
    }
    renderFooterPS(){
        return (
            <Table.Row >        
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell>
                    <span><strong>{moneyFormat(_.sum(_.map(this.props.psRows, d => d.sum2)) )}   {this.props.waers} </strong></span>
                </Table.Cell>
                <Table.Cell>
                    <span>
                        <Icon name='add'  size='large'  className="clickableIcon" color="green" onClick={()=>this.addRowPS()}/>
                    </span>
                </Table.Cell>
            </Table.Row>
          )
    }
    
    render(){
        return(
            <Segment padded size="small">
                
                <Label color="green" ribbon>
                    График платежей
                </Label>
                    
                            
                            <Table>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell colSpan="4"></Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>                                    
                                    {this.renderRowsPS()}
                                    {this.renderFooterPS()}                                                                                            
                                </Table.Body>                     
                            </Table>     
               
            
           </Segment>
        )
    }
}


export default (AmsgPaySchedule)
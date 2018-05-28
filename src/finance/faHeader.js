import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Dropdown, Icon, Container, Header, Grid,Segment, Input, Checkbox, TextArea, Label, List  } from 'semantic-ui-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import './fa.css'
require('moment/locale/ru');

class FaHeader extends PureComponent{
    constructor(props){

        super(props);
        this.onInputChange = this.onInputChange.bind(this);
        
        let bkpf =
            {
                bukrs:'',
                brnch:'',
                business_area_id:'',
                dep:'',
                budat:moment(new Date()),
                bldat:moment(new Date()),
                blart:'ZH',
                waers:'',
                kursf:0,
                bktxt:'',
                official:false
            }
        this.props.changefaBkpf(bkpf);
        // changefaBkpf(bkpf);
        // this.state = 
        // {
            
        // };
        
    }

    onInputChange(value,stateFieldName){
        let wabkpf = Object.assign({}, this.props.bkpf);
        if (stateFieldName==='official')
        {
            wabkpf[stateFieldName] = !wabkpf[stateFieldName];
        }
        else if (stateFieldName==='waers')
        {
            let waRate = 0;
            waRate = this.props.exRateNational?this.props.exRateNational[value]?this.props.exRateNational[value]:0:0;
            if (value==='USD'){
              waRate = 1;
            }
            if (waRate===null || waRate===undefined){
                waRate = 0;
            }
            wabkpf['kursf'] = waRate;       
            wabkpf[stateFieldName] = value;
        }
        else
        {
            wabkpf[stateFieldName] = value;
        }

        this.props.changefaBkpf(wabkpf);
        
    }

    
    render(){
        // console.log(this.props)
        const {companyOptions, branchOptions, departmentOptions, businessAreaOptions, currencyOptions} = this.props;
        
        // let wabkpf = Object.assign({}, this.props.bkpf);

        const {bukrs,
            brnch,
            business_area_id,
            dep,
            budat,
            bldat,
            blart,
            waers,
            kursf,
            bktxt,
            official} = this.props.bkpf;

        return(
            <Segment padded size="small">
                
                <Label color="blue" ribbon>
                    Заголовок
                </Label>
                <Grid columns={3}  stackable>
                    <Grid.Row>
                        <Grid.Column mobile={16} tablet={16} computer={5}>
                            <Table collapsing className='borderLess'>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>                                            
                                            <Icon name='folder' /> Компания
                                        </Table.Cell>
                                        <Table.Cell>
                                            
                                            <Dropdown placeholder='Компания' selection options={companyOptions} value={bukrs} 
                                            onChange={(e, { value }) => this.onInputChange(value,'bukrs')} />
                                        </Table.Cell>                
                                    </Table.Row>
                                    
                                    <Table.Row>
                                        <Table.Cell>
                                            <Icon name='browser' />
                                            Филиал
                                        </Table.Cell>
                                        <Table.Cell>                                            
                                            <Dropdown placeholder='Филиал'  search selection options={branchOptions[bukrs]?branchOptions[bukrs]:[]} 
                                            value={brnch}  onChange={(e, { value }) => this.onInputChange(value,'brnch')} />
                                        </Table.Cell>                
                                    </Table.Row>
                                    
                                    <Table.Row>
                                        <Table.Cell>
                                            <Icon name='browser' />                            
                                            Бизнес сфера
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Dropdown placeholder='Бизнес сфера'  search selection options={bukrs ? businessAreaOptions[bukrs]? businessAreaOptions[bukrs]:[] :[]} 
                                            value={business_area_id}  onChange={(e, { value }) => this.onInputChange(value,'business_area_id')} /> 
                                        </Table.Cell>                
                                    </Table.Row>
                                    
                                    <Table.Row>
                                        <Table.Cell>
                                            Официально
                                        </Table.Cell>
                                        <Table.Cell>                                        
                                            <Checkbox
                                            checked={official}
                                            onChange={(e, { value }) => this.onInputChange(value,"official")}
                                            />
                                        </Table.Cell>                
                                    </Table.Row>
                                </Table.Body>                     
                            </Table>
                            
                                
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={16} computer={5}>
                            <Table collapsing className='borderLess'>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>                                            
                                            <Icon name='browser' /> Отдел
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Dropdown placeholder='Отдел'  search selection options={departmentOptions} 
                                            value={dep}  onChange={(e, { value }) => this.onInputChange(value,'dep')} />
                                        </Table.Cell>                
                                    </Table.Row>
                                    
                                    <Table.Row>
                                        <Table.Cell>
                                            <Icon name='dollar' />
                                            Валюта
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Dropdown placeholder='Валюта'  search selection options={this.props.currencyOptions?this.props.currencyOptions:[]} 
                                            value={waers}  onChange={(e, { value }) => this.onInputChange(value,'waers')} />  
                                        </Table.Cell>                
                                    </Table.Row>
                                    
                                    <Table.Row>
                                        <Table.Cell>
                                            <Icon name='exchange' />                            
                                            Курс   
                                        </Table.Cell>
                                        <Table.Cell>   
                                            <Input
                                            value={kursf}
                                            placeholder={'Курс'}     
                                            onChange={(e, { value }) => this.onInputChange(value,'kursf')}                                       
                                            />
                                        </Table.Cell>                
                                    </Table.Row>                                 
                                    
                                    <Table.Row>
                                        
                                        <Table.Cell>
                                            <Icon name='comments outline' />
                                            Примечание
                                        </Table.Cell>
                                        
                                        <Table.Cell>
                                            <TextArea style={{ maxHeight: 45,minHeight: 45, minWidth:180, maxWidth:180 }}
                                                value={bktxt}
                                                onChange={(e, { value }) => this.onInputChange(value,"bktxt")}
                                                placeholder={'Примечание'}
                                            />
                                        </Table.Cell>                
                                    </Table.Row>
                                </Table.Body>                     
                            </Table>
                            
                                
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={16} computer={5}>
                        <Table collapsing className='borderLess'>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Icon name='square outline' />
                                            Вид документа
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Input
                                            readOnly
                                            value={blart}
                                            placeholder={'Вид документа'}
                                            />
                                        </Table.Cell>                
                                    </Table.Row>
                                    
                                    <Table.Row>
                                        <Table.Cell>
                                            <Icon name='calendar' />    
                                            Дата проводки
                                        </Table.Cell>
                                        <Table.Cell>                                            
                                            <DatePicker 
                                            showMonthDropdown showYearDropdown dropdownMode="select" //timezone="UTC"
                                            selected={budat} locale="ru" disabled
                                            dateFormat="DD.MM.YYYY" />
                                        </Table.Cell>                
                                    </Table.Row>
                                    
                                    <Table.Row>
                                        <Table.Cell>
                                            <Icon name='calendar' />                           
                                            Дата документа
                                        </Table.Cell>
                                        <Table.Cell>
                                            <DatePicker 
                                            showMonthDropdown showYearDropdown dropdownMode="select" //timezone="UTC"
                                            selected={bldat} locale="ru"
                                            onChange={(event) => this.onInputChange(event,"bldat")}
                                            dateFormat="DD.MM.YYYY" />   
                                        </Table.Cell>                
                                    </Table.Row>   
                                </Table.Body>                     
                            </Table>
                            
                            
                                
                        </Grid.Column>
                    </Grid.Row>
                    
                </Grid>    
               
            
           </Segment>
        )
    }
}

export default FaHeader;
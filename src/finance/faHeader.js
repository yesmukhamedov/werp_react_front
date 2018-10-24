import React, { PureComponent } from 'react';
import { Table, Dropdown, Icon, Grid,Segment, Input, Checkbox, TextArea, Label,   } from 'semantic-ui-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import './fa.css'
require('moment/locale/ru');

class FaHeader extends PureComponent{
    constructor(props){

        super(props);
        this.onInputChange = this.onInputChange.bind(this);
        
        
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
        else if(stateFieldName==='budat' || stateFieldName==='bldat'){
            if (value!==null && value!==undefined){
                wabkpf[stateFieldName] = value.format( "DD.MM.YYYY");
            }
            else wabkpf[stateFieldName] = '';
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
            official, zreg} = this.props.bkpf;

            const {bukrsInfo,
                brnchInfo,
                business_area_idInfo,
                depInfo,
                budatInfo,
                bldatInfo,
                blartInfo,
                waersInfo,
                kursfInfo,
                bktxtInfo,
                officialInfo, zregInfo} = this.props.bkpfInfo;

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
                                            onChange={(e, { value }) => this.onInputChange(value,'bukrs')} 
                                            readOnly={bukrsInfo?bukrsInfo.readOnly?bukrsInfo.readOnly:false:false}
                                            disabled={bukrsInfo?bukrsInfo.disabled?bukrsInfo.disabled:false:false}
                                            />
                                        </Table.Cell>                
                                    </Table.Row>
                                    
                                    <Table.Row>
                                        <Table.Cell>
                                            <Icon name='browser' />
                                            Филиал
                                        </Table.Cell>
                                        <Table.Cell>                                            
                                            <Dropdown placeholder='Филиал'  search selection options={branchOptions[bukrs]?branchOptions[bukrs]:[]} 
                                            value={brnch}  onChange={(e, { value }) => this.onInputChange(value,'brnch')}
                                            disabled={brnchInfo?brnchInfo.disabled?brnchInfo.disabled:false:false} />
                                        </Table.Cell>                
                                    </Table.Row>
                                    
                                    <Table.Row>
                                        <Table.Cell>
                                            <Icon name='browser' />                            
                                            Бизнес сфера
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Dropdown placeholder='Бизнес сфера'  search selection options={bukrs ? businessAreaOptions[bukrs]? businessAreaOptions[bukrs]:[] :[]} 
                                            value={business_area_id}  onChange={(e, { value }) => this.onInputChange(value,'business_area_id')} 
                                            disabled={business_area_idInfo?business_area_idInfo.disabled?business_area_idInfo.disabled:false:false}/> 
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
                                            readOnly={officialInfo?officialInfo.readOnly?officialInfo.readOnly:false:false}
                                            disabled={officialInfo?officialInfo.disabled?officialInfo.disabled:false:false}
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
                                            value={dep}  onChange={(e, { value }) => this.onInputChange(value,'dep')} 
                                            disabled={depInfo?depInfo.disabled?depInfo.disabled:false:false}/>
                                        </Table.Cell>                
                                    </Table.Row>
                                    
                                    <Table.Row>
                                        <Table.Cell>
                                            <Icon name='dollar' />
                                            Валюта
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Dropdown placeholder='Валюта'  search selection options={currencyOptions?currencyOptions:[]} 
                                            value={waers}  onChange={(e, { value }) => this.onInputChange(value,'waers')} 
                                            disabled={waersInfo?waersInfo.disabled?waersInfo.disabled:false:false}/>  
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
                                            readOnly={kursfInfo?kursfInfo.readOnly?kursfInfo.readOnly:false:false}
                                            disabled={kursfInfo?kursfInfo.disabled?kursfInfo.disabled:false:false}                                
                                            />
                                        </Table.Cell>                
                                    </Table.Row>
                                    
                                    <Table.Row>
                                        <Table.Cell>
                                            <Icon name='wordpress forms' />                           
                                            Рег. номер
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Input
                                            value={zreg} maxLength='10'
                                            placeholder={'Рег. номер'}
                                            onChange={(e, { value }) => this.onInputChange(value,'zreg')}
                                            readOnly={zregInfo?zregInfo.readOnly?zregInfo.readOnly:false:false}
                                            disabled={zregInfo?zregInfo.disabled?zregInfo.disabled:false:false}
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
                                            value={blart}
                                            placeholder={'Вид документа'}
                                            readOnly={blartInfo?blartInfo.readOnly?blartInfo.readOnly:false:false}
                                            disabled={blartInfo?blartInfo.disabled?blartInfo.disabled:false:false}
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
                                              className='date-auto-width'
                                              autoComplete="off"
                                              showMonthDropdown showYearDropdown dropdownMode="select" //timezone="UTC"
                                              selected={budat?moment(budat,"DD.MM.YYYY"):''} locale="ru" 
                                              onChange={(event) => this.onInputChange(event,"budat")}
                                              dateFormat="DD.MM.YYYY" 
                                              readOnly={budatInfo?budatInfo.readOnly?budatInfo.readOnly:false:false}
                                              disabled={budatInfo?budatInfo.disabled?budatInfo.disabled:false:false}/>
                                        </Table.Cell>                
                                    </Table.Row>
                                    
                                    <Table.Row>
                                        <Table.Cell>
                                            <Icon name='calendar' />                           
                                            Дата документа
                                        </Table.Cell>
                                        <Table.Cell>
                                            <DatePicker className='date-auto-width'
                                            autoComplete="off"
                                            showMonthDropdown showYearDropdown dropdownMode="select" //timezone="UTC"
                                            selected={bldat?moment(bldat,"DD.MM.YYYY"):''} locale="ru"
                                            onChange={(event) => this.onInputChange(event,"bldat")}
                                            dateFormat="DD.MM.YYYY" 
                                            readOnly={bldatInfo?bldatInfo.readOnly?bldatInfo.readOnly:false:false}
                                            disabled={bldatInfo?bldatInfo.disabled?bldatInfo.disabled:false:false}/>   
                                        </Table.Cell>                
                                    </Table.Row>                                    
                                    
                                    <Table.Row>
                                        
                                        <Table.Cell>
                                            <Icon name='comments outline' />
                                            Примечание
                                        </Table.Cell>
                                        
                                        <Table.Cell>
                                            <TextArea style={{ maxHeight: 45,minHeight: 45, minWidth:180, maxWidth:180 }}
                                                value={bktxt} maxLength='255'
                                                onChange={(e, { value }) => this.onInputChange(value,"bktxt")}
                                                placeholder={'Примечание'}
                                                readOnly={bktxtInfo?bktxtInfo.readOnly?bktxtInfo.readOnly:false:false}
                                                disabled={bktxtInfo?bktxtInfo.disabled?bktxtInfo.disabled:false:false}
                                            />
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
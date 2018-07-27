import React, { PureComponent } from 'react';
import { Table, Dropdown, Segment, Input, Label  } from 'semantic-ui-react';
import {handleFocus, moneyFormat, isEmpty} from '../../../utils/helpers';
require('moment/locale/ru');


  

class FcisPosition extends PureComponent{
    constructor(props){

        super(props);
        
    }
    
    
    render(){
        const {hkontOptions_s,hkontOptions_h} = this.props;
        const { lifnr, staffFio, hkont_s, hkont_h, summa, waers } = this.props;

        if (summa===undefined)
        {
            return '';
        }

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
                                            <Dropdown placeholder='Операция'   selection options={hkontOptions_h?hkontOptions_h:[]} 
                                            value={hkont_h}  onChange={(e, { value }) => this.props.onInputChange(value,'hkont_h')} />  
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Dropdown placeholder='Касса'   selection options={hkontOptions_s?hkontOptions_s:[]} 
                                            value={hkont_s}  onChange={(e, { value }) => this.props.onInputChange(value,'hkont_s')} /> 
                                        </Table.Cell>
                                        <Table.Cell>
                                            h
                                        </Table.Cell>
                                        <Table.Cell>
                                        <Input labelPosition='left' color= 'teal' placeholder={'Сумма'}
                                            value={moneyFormat(summa)} 
                                            onFocus={handleFocus} 
                                            maxLength='18'  onChange={(e, {value}) => this.props.onInputChange(value,'summa')}>
                                            <Label basic>{waers}</Label>
                                            <input />
                                        </Input>
                                                                                    
                                          {/* <Input
                                            placeholder={'Сумма'}
                                            value={moneyFormat(summa)} 
                                            onFocus={handleFocus} 
                                            maxLength='18'  onChange={(e, {value}) => this.props.onInputChange(value,'summa')}
                                          />  */}

                                        </Table.Cell>
                                    </Table.Row>                                    
                                </Table.Body>                     
                            </Table>
                            
                                
               
            
           </Segment>
        )
    }
}


export default (FcisPosition)
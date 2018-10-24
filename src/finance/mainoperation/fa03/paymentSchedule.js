

import React, { PureComponent } from 'react';
import { Table, Segment, Label, Input } from 'semantic-ui-react';
import { moneyFormat} from '../../../utils/helpers';

class PaymentSchedule extends PureComponent{
    
    constructor(props){
        super(props);
    }

    render(){
        if (!this.props.ps || this.props.ps.length===0){
            return '';
        }
        
        return (
            <Segment padded size="small">                
                <Label color="orange" ribbon>
                    График платежей
                </Label> 
                <Table collapsing >                    
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Взнос</Table.HeaderCell>
                            <Table.HeaderCell>Дата платежа</Table.HeaderCell>
                            <Table.HeaderCell>Сумма оплаты</Table.HeaderCell>
                            <Table.HeaderCell>Оплачено</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {
                        this.props.ps.map((item,key)=>
                            {
                                return (
                                    <Table.Row key={key}>                                      
                                        <Table.Cell textAlign="center">
                                            {key>0?key:''} 
                                            {item.is_firstpayment === 1?'Перв. взнос':''}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {item.payment_date}
                                        </Table.Cell>
                                        <Table.Cell>
                                        <Input
                                            value={moneyFormat(item.sum2)}
                                            readOnly={true}
                                            />
                                        </Table.Cell>
                                        <Table.Cell>
                                        <Input
                                            value={moneyFormat(item.paid)}
                                            readOnly={true}
                                            />
                                        </Table.Cell>               
                                    </Table.Row> 
                                )
                            }
                        )
                    }
                    </Table.Body>                     
                </Table>       
                                
            </Segment>
        )            
    }

}


export default (PaymentSchedule)
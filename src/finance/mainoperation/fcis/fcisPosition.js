import React, { PureComponent } from 'react';
import { Table, Dropdown, Segment, Input, Label, Button } from 'semantic-ui-react';
import {handleFocus, moneyFormat} from '../../../utils/helpers';
import StaffF4Modal from '../../../reference/f4/staff/staffF4Modal';
import { injectIntl } from 'react-intl';
import { messages } from '../../../locales/defineMessages';
require('moment/locale/ru');


  

class FcisPosition extends PureComponent{
    constructor(props){

        super(props);
        this.staffF4ModalOpenHanlder = this.staffF4ModalOpenHanlder.bind(this);
        this.state = 
        {            
            staffF4ModalOpen:false
        };
    }
    
    staffF4ModalOpenHanlder(bool){
        this.setState({staffF4ModalOpen:bool});
    }
    
    render(){
        const {hkontOptions_s,hkontOptions_h} = this.props;
        const { staffFio, hkont_s, hkont_h, summa, waers, bukrs, branchOptions, companyOptions, brnch } = this.props;
        const {formatMessage} = this.props.intl;

        if (summa===undefined)
        {
            return '';
        }

        return(
            <Segment padded size="small">
                <StaffF4Modal open={this.state.staffF4ModalOpen} closeModal={(bool)=>this.staffF4ModalOpenHanlder(bool)} 
                        onStaffSelect={(item)=>this.props.onInputChange(item,'lifnr')} trans={'fcis'} 
                        brnch = {brnch} branchOptions={branchOptions}
                        bukrs={bukrs} companyOptions={companyOptions} bukrsDisabledParent={true}
                        />
                <Label color="red" ribbon>
                    {formatMessage(messages.position)}
                </Label>

                            <Table  >
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>{formatMessage(messages.operation)}</Table.HeaderCell>
                                    <Table.HeaderCell>{formatMessage(messages.cashBank)}</Table.HeaderCell>
                                    <Table.HeaderCell>{formatMessage(messages.employee)}</Table.HeaderCell>
                                    <Table.HeaderCell>{formatMessage(messages.amount)}</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Dropdown placeholder={formatMessage(messages.operation)}   selection options={hkontOptions_h?hkontOptions_h:[]} 
                                            value={hkont_h}  onChange={(e, { value }) => this.props.onInputChange(value,'hkont_h')} />  
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Dropdown placeholder={formatMessage(messages.cashBank)}   selection options={hkontOptions_s?hkontOptions_s:[]} 
                                            value={hkont_s}  onChange={(e, { value }) => this.props.onInputChange(value,'hkont_s')} /> 
                                        </Table.Cell>
                                        <Table.Cell>
                                        <span> {staffFio} <Button icon='external' 
                                            onClick={()=>{this.staffF4ModalOpenHanlder(true)}} /></span>
                                        </Table.Cell>
                                        <Table.Cell>
                                        <Input labelPosition='left' color= 'teal' placeholder={'Сумма'}
                                            value={moneyFormat(summa)} 
                                            onFocus={handleFocus} 
                                            maxLength='18'  onChange={(e, {value}) => this.props.onInputChange(value,'summa')}>
                                            <Label basic>{waers}</Label>
                                            <input />
                                        </Input>
                                        </Table.Cell>
                                    </Table.Row>                                    
                                </Table.Body>                     
                            </Table>
                            
                                
               
            
           </Segment>
        )
    }
}


export default (injectIntl(FcisPosition))
import React, { Component } from 'react';
import { Modal, Icon, Table, Button, Dropdown, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import MatnrF4Modal from '../../../reference/f4/matnr/matnrF4Modal';
import PositionF4Modal from '../../../reference/f4/position/positionF4Modal';
import {onInputChange} from './hrb02_action';
// import './notification.css'

const categoryOptions = [
    { key: 1, text: 'От продажи', value: 1 },
    { key: 2, text: 'От работы', value: 2 },
    { key: 3, text: 'Аксессуары', value: 3 },
    { key: 4, text: 'От общей суммы', value: 4 }
  ];
let fieldDis={
        matnrDis:false,
        bonusTypeDis:false,
        categoryDis:false,
        positionDis:false,
        from_numDis:false,
        to_numDis:false,
        coefDis:false,
        waersDis:false,
        depositDis:false,
        req_valueDis:false,
        term_in_monthDis:false,
        saveDis:false
}  
class Hrb02EditBonus extends Component{

    constructor(props){

        super(props);
        
        this.matnrF4ModalOpenHanlder = this.matnrF4ModalOpenHanlder.bind(this);
        this.positionF4ModalOpenHanlder = this.positionF4ModalOpenHanlder.bind(this);
        this.inputHandler=this.inputHandler.bind(this);
        this.enableAll=this.enableAll.bind(this);
        this.disableAll=this.disableAll.bind(this);
        this.disableBusinessArea=this.disableBusinessArea.bind(this);

        
        this.state = {bonus:{rowStatus:'del'}, businessAreaId:0, matnrF4ModalOpen:false, positionF4ModalOpen:false,index:null,
        ...fieldDis};
        
        // // ,tab2TableParams : {table:[], headers:headerObjectArray,columns:columnObjectArray, 
        // //     pagination:true//,footers:footers//, paginationSize:5//,totalPages:undefined, currentPage:undefined//
        //   }
    
    }
    enableAll(){
        fieldDis={
            matnrDis:false,
            bonusTypeDis:false,
            categoryDis:false,
            positionDis:false,
            from_numDis:false,
            to_numDis:false,
            coefDis:false,
            waersDis:false,
            depositDis:false,
            req_valueDis:false,
            term_in_monthDis:false,
            saveDis:false
        }  
    }
    disableAll(){
        fieldDis={
            matnrDis:true,
            bonusTypeDis:true,
            categoryDis:true,
            positionDis:true,
            from_numDis:true,
            to_numDis:true,
            coefDis:true,
            waersDis:true,
            depositDis:true,
            req_valueDis:true,
            term_in_monthDis:true,
            saveDis:true
        }  
    }
    disableBusinessArea(businessAreaId,bonus){
        
        if (bonus!==null && bonus.rowStatus!==null && bonus.rowStatus==='del')
        {
            this.disableAll();
            return '';
        }
        if(businessAreaId===1 || businessAreaId===2 || businessAreaId===3 || businessAreaId===4){
            fieldDis={            
                ...fieldDis,
                categoryDis:true
            }
            return '';
        }
        else if (businessAreaId===5 || businessAreaId===6){
            fieldDis={                      
                ...fieldDis,    
                matnrDis:true,
                depositDis:true,
                req_valueDis:true,
                term_in_monthDis:true
            }
            return '';
        }
    }
    componentWillReceiveProps(nextProps) {      
        this.enableAll();  
        this.disableBusinessArea(nextProps.businessAreaId,nextProps.bonus);
        this.setState({
            ...fieldDis,
        });
        // console.log(nextProps);
        // this.setState({...this.state,bonus:nextProps.bonus,businessAreaId:nextProps.businessAreaId});
        // this.props.bonus.from_num=343434343;
        if (nextProps.index!==this.props.index)
        {
            // this.disableAll();
            // let bonus = Object.assign({},nextProps.bonus)
            this.setState({
                    // ...this.state,
                    bonus:nextProps.bonus,
                    businessAreaId:nextProps.businessAreaId,
                    index:nextProps.index,
                    ...fieldDis
            });
        }        
    }
    componentWillMount() {
        // this.props.f4FetchMatnrList(this.props.trans);
    }
  
    componentWillUnmount(){
        // this.props.f4ClearMatnrList();
    }


    close = () => {
        this.props.closeModal(false);
    }

    matnrF4ModalOpenHanlder(bool){
        this.setState({matnrF4ModalOpen:bool});
    }

    positionF4ModalOpenHanlder(bool){
        this.setState({positionF4ModalOpen:bool});
    }

    inputHandler(value,columnName){
        let waBonus = Object.assign({},this.state.bonus);
        
        if (columnName==='matnr')
        {            
            waBonus.matnr = value.matnr;
            waBonus.matnrName = value.text45;            
        }
        else if (columnName==='position')
        {
            waBonus.position_id = value.position_id;
            waBonus.positionName = value.text;
            // fieldDis={...fieldDis,}
        }
        else if (columnName==='bonus_type_id')
        {           
            waBonus.bonus_type_id = value.value;
            waBonus.bonusTypeName = value.options.find(item=>item.value===value.value).text;        
        }
        else if (columnName==='category_id')
        {           
            waBonus.category_id = value.value;
            waBonus.categoryName = value.options.find(item=>item.value===value.value).text;        
        }
        else if (columnName==='from_num')
        {           
            waBonus.from_num = this.numberValidate(value,5);
        }
        else if (columnName==='to_num')
        {           
            waBonus.to_num = this.numberValidate(value,5);
        }
        else if (columnName==='coef')
        {           
            waBonus.coef = this.numberValidate(value,10);
        }
        else if (columnName==='waers')
        {           
            waBonus.waers = value;  
        }
        else if (columnName==='deposit')
        {           
            waBonus.deposit = this.numberValidate(value,10);
        }
        else if (columnName==='req_value')
        {           
            waBonus.req_value = this.numberValidate(value,3);
        }
        else if (columnName==='term_in_month')
        {           
            waBonus.term_in_month = this.numberValidate(value,2);
        }

        
        // console.log(waBonus);
        this.setState({bonus:waBonus});
    }


 



    render () {
        
        if (this.state.bonus===null)
        {
            return "";
        }
        
        const currencyOption=this.props.currencyList?this.props.currencyList.map(item=>{
            return {
                key: item.currency,
                text: item.currency,
                value: item.currency,
                text20: item.text20,
                currency_id: item.currency_id
            }
        }):[];

        const bonusTypeOption=this.props.bonusTypeList?this.props.bonusTypeList.map(item=>{
            return {
                key: item.bonus_type_id,
                text: item.text45,
                value: item.bonus_type_id
            }
        }):[];

        return (

            <Modal open={this.props.open} onClose={this.close}  dimmer={"inverted"} size='small' >
                <Modal.Header>
                    <Icon name='edit' size='big' />
                    Редактировать
                </Modal.Header>
                <Modal.Content>
                    <MatnrF4Modal open={this.state.matnrF4ModalOpen} closeModal={(bool)=>this.matnrF4ModalOpenHanlder(bool)} trans={'hrb02'} 
                        selectItem={(item)=>this.inputHandler(item,'matnr')}/>
        
                    <PositionF4Modal open={this.state.positionF4ModalOpen} closeModal={(bool)=>this.positionF4ModalOpenHanlder(bool)} trans={'hrb02'} 
                        selectItem={(item)=>this.inputHandler(item,'position')}/>   
                    <Table compact striped celled>
                        <Table.Body>
                            <Table.Row>                    
                                <Table.Cell>Материал</Table.Cell>
                                <Table.Cell><span>{this.state.bonus.matnrName} <Button icon='external' onClick={()=>this.matnrF4ModalOpenHanlder(true)} disabled={this.state.matnrDis}/></span></Table.Cell>
                            </Table.Row>
                            <Table.Row>                    
                                <Table.Cell>Тип бонуса</Table.Cell>
                                <Table.Cell><Dropdown scrolling compact placeholder='Выберите'  options={bonusTypeOption} value={this.state.bonus.bonus_type_id}
                                onChange={(e, data) => this.inputHandler(data,'bonus_type_id')} disabled={this.state.bonusTypeDis}
                                /></Table.Cell>
                            </Table.Row>
                            <Table.Row>                    
                                <Table.Cell>Категория</Table.Cell>
                                <Table.Cell><Dropdown scrolling compact selection placeholder='Выберите' options={categoryOptions} 
                                    value={this.state.bonus.category_id} 
                                    onChange={(e, data) => this.inputHandler(data,'category_id')} disabled={this.state.categoryDis}
                                    /></Table.Cell>
                            </Table.Row>
                            <Table.Row>                    
                                <Table.Cell>Должность</Table.Cell>
                                <Table.Cell><span>{this.state.bonus.positionName} <Button icon='external' onClick={()=>this.positionF4ModalOpenHanlder(true)} disabled={this.state.positionDis}/></span></Table.Cell>
                            </Table.Row>
                            <Table.Row>                    
                                <Table.Cell>Продожа от</Table.Cell>
                                <Table.Cell><Input value={this.state.bonus.from_num} fluid type="number"  className='no-spinners' 
                                onChange={(e, {value}) => this.inputHandler(value,'from_num')} disabled={this.state.from_numDis}
                         // numberValidateLength5(value)
                            /></Table.Cell>
                            </Table.Row>
                            <Table.Row>                    
                                <Table.Cell>Продажа по</Table.Cell>
                                <Table.Cell><Input value={this.state.bonus.to_num} fluid type="number"  className='no-spinners'                                
                                onChange={(e, {value}) => this.inputHandler(value,'to_num')} disabled={this.state.to_numDis}
                            /></Table.Cell>
                            </Table.Row>
                            <Table.Row>                    
                                <Table.Cell>Сумма</Table.Cell>
                                <Table.Cell><Input value={this.state.bonus.coef} fluid type="number"  className='no-spinners'                                
                                onChange={(e, {value}) => this.inputHandler(value,'coef')} disabled={this.state.coefDis}
                            /></Table.Cell>
                            </Table.Row>
                            <Table.Row>                    
                                <Table.Cell>Валюта</Table.Cell>
                                <Table.Cell><Dropdown scrolling selection compact placeholder='Выберите'  options={currencyOption} value={this.state.bonus.waers}                                                      
                                                      onChange={(e, {value}) => this.inputHandler(value,'waers')} disabled={this.state.waersDis}
                                /></Table.Cell>
                            </Table.Row>
                            <Table.Row>                    
                                <Table.Cell>Депозит</Table.Cell>
                                <Table.Cell><Input value={this.state.bonus.deposit} fluid type="number"  className='no-spinners'                                                      
                                                      onChange={(e, {value}) => this.inputHandler(value,'deposit')} disabled={this.state.depositDis}
                            /></Table.Cell>
                            </Table.Row>
                            <Table.Row>                    
                                <Table.Cell>Min</Table.Cell>
                                <Table.Cell><Input value={this.state.bonus.req_value} fluid type="number"  className='no-spinners'                                                
                                                      onChange={(e, {value}) => this.inputHandler(value,'req_value')} disabled={this.state.req_valueDis}
                            /></Table.Cell>
                            </Table.Row>
                            <Table.Row>                    
                                <Table.Cell>Срок</Table.Cell>
                                <Table.Cell><Input value={this.state.bonus.term_in_month} fluid type="number" placeholder="Месяц" className='no-spinners'                                              
                                                      onChange={(e, {value}) => this.inputHandler(value,'term_in_month')} disabled={this.state.term_in_monthDis}
                                                /></Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                    
                </Modal.Content>
                <Modal.Actions>                    
                    <Button positive labelPosition='right' icon='checkmark' content='Сохранить' disabled={this.state.saveDis} 
                    onClick={()=>{this.props.onInputChange(this.state.index,this.state.bonus);this.close()}}/>
                    <Button negative onClick={this.close}>Отмена</Button>
                </Modal.Actions>
            </Modal>


        )
    }

    numberValidate(value,maxlength){
        if (value<0) 
        {
            value=value*-1;
        }
        if (value.length>maxlength)
        {
            value = value.substring(0,maxlength);
        }
        
        if (value.length===undefined ||value.length===0)
        {
            value = 0;
        }
        if (value.length>0 && value.substring(0,1)==='0'){
            value = value.substring(1);
        }
        return parseFloat(value);
    }
};
// export default Notification;
function mapStateToProps (state) {
  return { currencyList:state.f4.currencyList,bonusTypeList:state.f4.bonusTypeList,  businessAreaId:state.hrb02.businessAreaId }
}

export default connect(mapStateToProps, { onInputChange})(Hrb02EditBonus)

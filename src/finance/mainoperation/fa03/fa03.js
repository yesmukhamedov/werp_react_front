import React,{ PureComponent } from 'react';
import { connect } from 'react-redux';
import {  Container, Header, List, Button, Table, Dropdown, Icon, Grid,Segment, Input, Checkbox, TextArea, Label  } from 'semantic-ui-react';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FaHeader from '../../faHeader';
// import FcisPosition from './fcisPosition';
import {f4FetchDepartmentList, f4FetchCurrencyList, f4FetchBusinessAreaList2, f4FetchExchangeRateNational} from '../../../reference/f4/f4_action';
import {clearfaBkpf, changefaBkpf, fetchCashBankHkontsByBranch, changeDynObj, clearDynObj, saveFcis} from '../../fa_action';
import {moneyInputHanler} from '../../../utils/helpers';
import OutputErrors from '../../../general/error/outputErrors';
import { modifyLoader } from '../../../general/loader/loader_action';

require('moment/locale/ru');
class Fa03 extends PureComponent {
    constructor(props){
        super(props);
        this.initialize = this.initialize.bind(this);
        this.state={
            errors:[]
        }  
    }

    componentWillMount() {

    }
    
    componentWillUnmount(){
      this.props.clearDynObj();
    }
  
    // componentWillReceiveProps(nextProps) {
    // }

    initialize(){
        const bkpf =    
        {   
            bukrs:'', brnch:'', business_area:'', official:false, dep:'', waers:'', 
            kursf:'', zreg:'', blart:'', budat:'', bldat:'', bktxt:'', contract_number:'', 
            awkey:'', usnam:'', tcode:'',storno:'',docStorno:'',docOriginal:'',
            
            cpudt:'',awtyp:'',customer_id:'', payroll_id:'',invoice_id:'',log_doc:'',
            closed:'',awkey2:'',dmbtr:'',dmbtr_paid:'',wrbtr:'',wrbtr_paid:''
        };
        return {bkpf};
    }
    render(){
        //     // if (!this.props.bkpf){
    //     //     const bkpf = {};
    //     // }
    //     // else{

    //     // }
    //     // console.log(this.props.bkpf,'this.props.bkpf')
        
        const {bkpf} =  !this.props.bkpf
                        ?   this.initialize()
                        :   this.props;
          return (
              
            <Container>
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
                                            <Input value={bkpf.bukrs} readOnly={true} />
                                        </Table.Cell>                
                                    </Table.Row>
                                    
                                    <Table.Row>
                                        <Table.Cell>
                                            <Icon name='browser' />
                                            Филиал
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Input value={bkpf.brnch} readOnly={true} />
                                        </Table.Cell>                
                                    </Table.Row>
                                    
                                    <Table.Row>
                                        <Table.Cell>
                                            <Icon name='browser' />                            
                                            Бизнес сфера
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Input value={bkpf.business_area} readOnly={true} />
                                        </Table.Cell>                
                                    </Table.Row>
                                    
                                    <Table.Row>
                                        <Table.Cell>
                                            Sn номер
                                        </Table.Cell>
                                        <Table.Cell>                                        
                                            <Input value={bkpf.contract_number} readOnly={true} />
                                        </Table.Cell>                
                                    </Table.Row>
                                    
                                    <Table.Row>
                                        <Table.Cell>
                                            Пользователь
                                        </Table.Cell>
                                        <Table.Cell>                                        
                                            <Input value={bkpf.usnam} readOnly={true} />
                                        </Table.Cell>                
                                    </Table.Row>
                                    
                                    <Table.Row>
                                        <Table.Cell>
                                            Официально
                                        </Table.Cell>
                                        <Table.Cell>                                        
                                            <Checkbox checked={bkpf.official} readOnly={true} />
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
                                            <Input value={bkpf.dep} readOnly={true} />
                                        </Table.Cell>                
                                    </Table.Row>
                                    
                                    <Table.Row>
                                        <Table.Cell>
                                            <Icon name='dollar' />
                                            Валюта
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Input value={bkpf.waers} readOnly={true} />
                                        </Table.Cell>                
                                    </Table.Row>
                                    
                                    <Table.Row>
                                        <Table.Cell>
                                            <Icon name='exchange' />                            
                                            Курс   
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Input value={bkpf.kursf} readOnly={true} />
                                        </Table.Cell>                
                                    </Table.Row>
                                    
                                    <Table.Row>
                                        <Table.Cell>
                                            <Icon name='wordpress forms' />                           
                                            Рег. номер
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Input value={bkpf.zreg} readOnly={true} />
                                        </Table.Cell>                
                                    </Table.Row>
                                    
                                    <Table.Row>
                                        <Table.Cell>
                                            Код
                                        </Table.Cell>
                                        <Table.Cell>                                        
                                            <Input value={bkpf.tcode} readOnly={true} />
                                        </Table.Cell>                
                                    </Table.Row>
                                    
                                    <Table.Row>
                                        <Table.Cell>
                                            Ссылка на документ
                                        </Table.Cell>
                                        <Table.Cell>                                        
                                            <Input value={bkpf.awkey} readOnly={true} />
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
                                            <Input value={bkpf.blart} readOnly={true} />
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
                                              selected={bkpf.budat?moment(bkpf.budat,"DD.MM.YYYY"):''} locale="ru" 
                                              dateFormat="DD.MM.YYYY" readOnly={true} disabled={true}/>
                                        </Table.Cell>                
                                    </Table.Row>
                                    
                                    <Table.Row>
                                        <Table.Cell>
                                            <Icon name='calendar' />                           
                                            Дата документа
                                        </Table.Cell>
                                        <Table.Cell>
                                            <DatePicker
                                              className='date-auto-width'
                                              autoComplete="off"
                                              showMonthDropdown showYearDropdown dropdownMode="select" //timezone="UTC"
                                              selected={bkpf.bldat?moment(bkpf.bldat,"DD.MM.YYYY"):''} locale="ru" 
                                              dateFormat="DD.MM.YYYY" readOnly={true} disabled={true}/> 
                                        </Table.Cell>                
                                    </Table.Row>
                                    
                                    <Table.Row>
                                        <Table.Cell>
                                            Отменен
                                        </Table.Cell>
                                        <Table.Cell>                                        
                                            <Input value={bkpf.storno} readOnly={true} />
                                        </Table.Cell>                
                                    </Table.Row>
                                    
                                    <Table.Row>
                                        <Table.Cell>
                                            Документ оригинал/Документ отмены
                                        </Table.Cell>
                                        <Table.Cell>                                        
                                            <Input value={bkpf.business_area} readOnly={true} />
                                        </Table.Cell>                
                                    </Table.Row>                                    
                                    
                                    <Table.Row>
                                        
                                        <Table.Cell>
                                            <Icon name='comments outline' />
                                            Примечание
                                        </Table.Cell>
                                        
                                        <Table.Cell>
                                            <TextArea style={{ maxHeight: 45,minHeight: 45, minWidth:180, maxWidth:180 }}
                                                value={bkpf.bktxt} maxLength='255' readOnly={true} disabled={true}
                                            />
                                        </Table.Cell>                
                                    </Table.Row>
                                </Table.Body>                     
                            </Table>
                            
                            
                                
                        </Grid.Column>
                    </Grid.Row>
                    
                </Grid>    
               
            
            </Segment>
            </Container>
  
          );
          
          
      }
 
};     

function mapStateToProps(state)
{
  // console.log(state,'state');
  return {
    bkpf:state.fa.dynamicObject.bkpf,
    bseg:state.fa.dynamicObject.bseg,
    ps:state.fa.dynamicObject.ps
  };
}

export default connect(mapStateToProps,{ changeDynObj, clearDynObj}) (Fa03);
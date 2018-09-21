import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Segment, List, Input, Icon, Button, Label,Table, Grid } from 'semantic-ui-react';
import OutputErrors from '../../../general/error/outputErrors';
import {amcddSave, amcddFetch, amcddChange, amcddClear} from  '../../../accounting/accounting_action';
import {LEGACY_URL} from "../../../utils/constants";

import {handleFocus, isEmpty, moneyFormat, moneyInputHanler} from '../../../utils/helpers';

class Fmcp extends Component {


    constructor(props){

        super(props);
        this.onInputChange=this.onInputChange.bind(this);
        this.save=this.save.bind(this);
        this.fetch=this.fetch.bind(this);
        this.validate=this.validate.bind(this);
        this.renderPaymentSchedule=this.renderPaymentSchedule.bind(this);
        this.renderMainInfo=this.renderMainInfo.bind(this);
        this.renderSave=this.renderSave.bind(this);

        

        
        this.state={
            searchTerm:{zregOrConNum:''}
            ,errors:[]
            
        };
        
    }

    componentWillMount() {
      this.props.amcddChange({
        zregOrConNum:'',              
        lifnr:null, 
        lifnrName:'',
        psRows:[],
        price:0,
        paid:0,
        waers:'',
        dealerName:'',
        collectorName:''
        ,summa:0
      });
        
    }

    componentWillUnmount(){
      this.props.amcddClear();
    }
    
    
    onInputChange(value,stateFieldName){
        if (stateFieldName === 'zregOrConNum'){          
          let searchTerm = Object.assign({},this.state.searchTerm);
          searchTerm.zregOrConNum = value;
          this.setState({searchTerm});
        }
        else if (stateFieldName === 'summa'){          
          let newVal = moneyInputHanler(value,2);
          if (newVal!==undefined){
            this.props.amcddChange({
              ...this.props.contract,
              summa:newVal
            });
          }
        }

        
    }

    save(){
      let errors = [];
      errors = this.validate();
      if (errors===null || errors===undefined || errors.length===0){       
        let contract = {...this.props.contract};
        this.props.amcddSave(contract);
      }
      
      this.setState({errors});
    }
    
    fetch(a_zregOrConNum){
      this.props.amcddFetch(a_zregOrConNum);
      this.setState({errors:[]});
    }


    validate(){
      let errors = [];
      const {price, paid, zregOrConNum, psRows, summa} = this.props.contract;

      if (zregOrConNum===null || zregOrConNum===undefined || !zregOrConNum) { errors.push("Выберите договор"); }
      if (summa===null || summa===undefined || !summa || summa<=0) { errors.push("Сумма 0 или отрицательная"); }
      if (price-paid < summa) { errors.push("Сумма скидки больше чем остаток."); }

      let psPaid = 0;

      if (psRows!==null && psRows.length>0){
        for (let i = 0; i < psRows.length; i++){
          let waPsRows = psRows[i];
          if (waPsRows.is_firstpayment===1){            
            if (waPsRows.sum2 !== waPsRows.paid) { errors.push("Первоначальный взнос не оплачен."); }
          }
          psPaid = psPaid + waPsRows.paid;
        }
        if (paid !== psPaid) { errors.push("Сумма взноса и оплаченная сумма не равны. Обратитесь к администратору."); }
      }
      return errors;
    }

    render(){
      const {contract} = this.props;

      if (isEmpty(contract)){
        return "";
      }
        return (
            
            <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>

                <Header as="h2" block>
                  Скидка клиенту по договору
                </Header>
                
                <Segment padded size="small">
                
                  <Label color="red" ribbon>
                    Параметры поиска
                  </Label>
                  <br />
                  <br />
                  <List horizontal>
                    <List.Item>
                      <List.Content>
                        <Input
                          value={this.state.searchTerm.zregOrConNum} maxLength='10'
                          placeholder={'Номер дог. или Рег. номер'} onFocus={handleFocus}
                          onChange={(e, { value }) => this.onInputChange(value,'zregOrConNum')}
                          />
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Content>
                          <Button icon labelPosition='left' primary size='small' onClick={()=>this.fetch(this.state.searchTerm.zregOrConNum)}>
                            <Icon name='search' size='large' />Поиск
                          </Button>
                      </List.Content>
                    </List.Item>
                  </List>             
                </Segment>


                <Grid>
                    <Grid.Row >
                        <Grid.Column mobile={16} tablet={16} computer={7}>                        
                          {this.renderMainInfo()}  
                          {this.renderSave()}
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={16} computer={9}>
                          {this.renderPaymentSchedule()}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                
                
                
                     
            </Container>

        );
        
        
    }

    renderMainInfo(){
      const {contract} = this.props;

      return (
        <Segment padded size="small">
                  
          <Label color="green" ribbon>
            Основные инфо
          </Label>
          <br />
          <br />
          <Table collapsing className='borderLess'>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                              Номер договора или рег. номер
                            </Table.Cell>
                            <Table.Cell>

                              
                              
                            {contract.iscontractnumber && 
                              <a target='_blank' href={`${LEGACY_URL}/dms/contract/dmsc03.xhtml?contract_number=` + contract.zregOrConNum}>
                                <Button>{contract.zregOrConNum}</Button>
                              </a>
                            }
                              {contract.belnr && 
                                <a target='_blank' href={`${LEGACY_URL}/accounting/reports/fa03.xhtml?belnr=` + contract.belnr 
                                  +`&gjahr=` + contract.gjahr +`&bukrs=` + contract.bukrs}>
                                  <Button>Фин. док</Button>
                                </a>                                
                              }

                            </Table.Cell>                
                        </Table.Row>
                        
                        <Table.Row>
                            <Table.Cell>
                              ФИО клиента
                            </Table.Cell>
                            <Table.Cell>
                              <Input fluid
                                value={contract.lifnrName}
                                readOnly={true}
                                />
                            </Table.Cell>                
                        </Table.Row>
                        
                        <Table.Row>
                            <Table.Cell>
                              Дилер
                            </Table.Cell>
                            <Table.Cell width="10">
                              <Input fluid
                                value={contract.dealerName}
                                readOnly={true} 
                                />
                            </Table.Cell>                
                        </Table.Row>
                        
                        <Table.Row>
                            <Table.Cell>
                              Фин. агент
                            </Table.Cell>
                            <Table.Cell>
                              <Input fluid
                                value={contract.collectorName}
                                readOnly={true}
                                />
                            </Table.Cell>                
                        </Table.Row>
                        
                        <Table.Row>
                            <Table.Cell>
                            Валюта
                            </Table.Cell>
                            <Table.Cell>
                              <Input fluid
                               value={contract.waers}
                                readOnly={true}
                                />
                            </Table.Cell>                
                        </Table.Row>
                        
                        <Table.Row>
                            <Table.Cell>
                              Цена
                            </Table.Cell>
                            <Table.Cell>
                              <Input fluid
                              value={moneyFormat(contract.price)}
                                readOnly={true}
                                />
                            </Table.Cell>                
                        </Table.Row>
                        
                        <Table.Row>
                            <Table.Cell>
                              Оплачено
                            </Table.Cell>
                            <Table.Cell>
                              <Input fluid
                              value={moneyFormat(contract.paid)}
                                readOnly={true}
                                />
                            </Table.Cell>                
                        </Table.Row>
                        
                        <Table.Row>
                            <Table.Cell>
                              Остаток
                            </Table.Cell>
                            <Table.Cell>
                              <Input fluid
                              value={moneyFormat(contract.price-contract.paid)}
                                readOnly={true}
                                />
                            </Table.Cell>                
                        </Table.Row>
                        
                       
                    </Table.Body>                     
                </Table>            
        </Segment>
      )
    }
    
    renderPaymentSchedule(){
      
      const {psRows} = this.props.contract;
      if (isEmpty(psRows)){
        return "";
      }
        return (
            
           
                <Segment padded size="small">
                
                  <Label color="yellow" ribbon>
                    График платежей
                  </Label>
                  <br />
                  <br />
                  <Table collapsing className='borderLess'>
                  
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
                                    psRows.map((item,key)=>
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
                                      </Table.Row> )
                                    })
                                  }
                                </Table.Body>                     
                            </Table>            
                </Segment>

        );
        
        
    }
    renderSave(){
      
      const {summa} = this.props.contract;
        return (
            
                <Table collapsing className='borderLess'>
                  
                      <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell colSpan="3">{<OutputErrors errors={this.state.errors}/>}</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                          Сумма скидки
                                        </Table.Cell>

                                        <Table.Cell>                                          
                                          <Input
                                          value={moneyFormat(summa)} 
                                          onFocus={handleFocus} 
                                          maxLength='18'  onChange={(e, {value}) => this.onInputChange(value,'summa')}
                                          /> 


                                        </Table.Cell>

                                        <Table.Cell>                                          
                                          <Button icon labelPosition='left' primary size='small' onClick={()=>this.save()}>
                                            <Icon name='save' size='large' />Сохранить
                                          </Button>
                                        </Table.Cell>  

                                    </Table.Row>
                                </Table.Body>                     
                            </Table>      
                            
                 
                            

        );
        
        
    }
    
};


     

function mapStateToProps(state)
{
    return {
      contract:state.accounting.dynamicObject
    };
}





export default connect(mapStateToProps,{ amcddSave, amcddFetch, amcddChange, amcddClear }) (Fmcp);

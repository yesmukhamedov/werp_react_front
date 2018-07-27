import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Segment, List, Input, Icon, Button, Label,Table, Grid, Dropdown } from 'semantic-ui-react';
import OutputErrors from '../../../general/error/outputErrors';
import {fetchFMCP, changeDynObj, clearDynObj, saveFMCP} from  '../../../finance/fa_action';
import _ from "lodash";
import {handleFocus, isEmpty, moneyFormat, moneyInputHanler} from '../../../utils/helpers';
import {LEGACY_URL} from "../../../utils/constants";
import {Link} from 'react-router-dom';
import {BigNumber} from 'bignumber.js';

class Fmcp extends Component {


    constructor(props){

        super(props);
        this.onInputChange=this.onInputChange.bind(this);
        this.onInputChangePS=this.onInputChangePS.bind(this);
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
      this.props.changeDynObj({
        zregOrConNum:'',              
        lifnr:null, 
        lifnrName:'',
        psRows:[],
        price:0,
        paid:0,
        waers:'',
        dealerName:'',
        collectorName:'',
        iscontractnumber:false
        ,summa:0
        ,hkont_d:''
      });
        
    }

    componentWillUnmount(){
      this.props.clearDynObj();
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
            let contract = {...this.props.contract};
            if (this.props.contract.psRows){
              let psRows = JSON.parse(JSON.stringify(contract.psRows));
              let remain = parseFloat(newVal);
              for(let i = 0; i<psRows.length; i++){
                let due = psRows[i].sum2 - psRows[i].paid;
                psRows[i].currentpaymentamount = 0;
                if(due>=remain){
                  psRows[i].currentpaymentamount = remain;
                  remain = 0;
                }
                else{                  
                  psRows[i].currentpaymentamount = due;
                  remain = remain - due;
                }
              }
              contract = {...contract,psRows};
            }
            
            this.props.changeDynObj({
              ...contract, summa:newVal
            });
          }
        }
        else if (stateFieldName === 'hkont_d'){
          this.props.changeDynObj({
            ...this.props.contract, hkont_d:value
          });
        }
    }

    onInputChangePS(value,key){
      let psRows = JSON.parse(JSON.stringify(this.props.contract.psRows));          
      let newVal = moneyInputHanler(value,2);
      const sum2 = psRows[key].sum2;
      const paid = psRows[key].paid;

      if(sum2-paid>=newVal && newVal>=0){
        psRows[key].currentpaymentamount = newVal;

        
        let summa = _.sum(_.map(psRows, d => parseFloat(d.currentpaymentamount)))
        summa = new BigNumber(summa).toFixed(2);
        
        this.props.changeDynObj({
          ...this.props.contract,
          psRows,
          summa
        });

      }

  }




    save(){
      let errors = [];
      errors = this.validate();
      if (errors===null || errors===undefined || errors.length===0){        
        let contract = {...this.props.contract};
        this.props.saveFMCP(contract);
      }
      
      this.setState({errors});
    }
    fetch(a_zregOrConNum){
      this.props.fetchFMCP(a_zregOrConNum);
      this.setState({errors:[]});
    }


    validate(){
      let errors = [];
      const {price, paid, zregOrConNum, psRows, summa,hkont_d} = this.props.contract;

      if (zregOrConNum===null || zregOrConNum===undefined || !zregOrConNum) { errors.push("Выберите договор"); }      
      if (hkont_d===null || hkont_d===undefined || !hkont_d) { errors.push("Выберите Касса/Банк"); }
      if (summa===null || summa===undefined || !summa || summa<=0) { errors.push("Сумма 0 или отрицательная"); }
      if (price-paid < summa) { errors.push("Сумма платежа больше чем остаток."); }

      let psPaid = 0;
      let psCurrentpaymentamount = 0;

      if (psRows!==null && psRows.length>0){
        for (let i = 0; i < psRows.length; i++){
          let waPsRows = psRows[i];
          psPaid = psPaid + waPsRows.paid;
          psCurrentpaymentamount = parseFloat(psCurrentpaymentamount) + parseFloat(waPsRows.currentpaymentamount);
        }
        if (paid !== psPaid) { errors.push("Сумма взноса и оплаченная сумма не равны. Обратитесь к администратору."); }
        if (parseFloat(summa) !== psCurrentpaymentamount) { errors.push("Сумма взноса и оплачиваемая сумма не равны. Обратитесь к администратору."); }

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
                  Взнос по договору
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
                          value={this.state.searchTerm.zregOrConNum} maxLength='12'
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
                        <Grid.Column mobile={16} tablet={16} computer={5}>                        
                          {this.renderMainInfo()}  
                          {this.renderSave()}
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={16} computer={11}>
                          {this.renderPaymentSchedule()}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <br /><br /><br /><br /><br />
                
                
                     
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
                              {contract.iscontractnumber && <Link target='_blank' className={'ui icon button'} 
                                to={`${LEGACY_URL}/dms/contract/dmsc03.xhtml?contract_number=` + contract.zregOrConNum}>
                                {contract.zregOrConNum}
                              </Link>
                              }
                              {contract.belnr && 
                                <Link target='_blank' className={'ui icon button'} 
                                to={`${LEGACY_URL}/accounting/reports/fa03.xhtml?belnr=` + contract.belnr 
                                +`&gjahr=` + contract.gjahr +`&bukrs=` + contract.bukrs}>
                                  Фин. док
                                </Link>
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
                                        <Table.HeaderCell>Оплачиваемая сумма</Table.HeaderCell>
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
                                        <Table.Cell>
                                          <Input
                                            value={moneyFormat(item.currentpaymentamount)}
                                            onFocus={handleFocus} 
                                            onChange={(e, {value}) => this.onInputChangePS(value,key)}
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
      
      const {hkontOptions,summa, hkont_d} = this.props.contract;

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
                                          Касса/Банк
                                        </Table.Cell>

                                        <Table.Cell>    
                                          <Dropdown  selection options={hkontOptions?hkontOptions:[]} 
                                            value={hkont_d}  onChange={(e, { value }) => this.onInputChange(value,'hkont_d')} />
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                          Сумма платежа
                                        </Table.Cell>

                                        <Table.Cell>                                          
                                          <Input
                                          value={moneyFormat(summa)} 
                                          onFocus={handleFocus} 
                                          maxLength='18'  onChange={(e, {value}) => this.onInputChange(value,'summa')}
                                          /> 


                                        </Table.Cell>

                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>     
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
      contract:state.fa.dynamicObject
    };
}





export default connect(mapStateToProps,{ fetchFMCP, changeDynObj, clearDynObj, saveFMCP }) (Fmcp);

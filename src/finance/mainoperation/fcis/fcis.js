import React,{ Component } from 'react';
import { connect } from 'react-redux';
import {  Container, Header, Segment, List, Button, Icon  } from 'semantic-ui-react';
import moment from 'moment';
import FaHeader from '../../faHeader';
import FcisPosition from './fcisPosition';
import {f4FetchDepartmentList, f4FetchCurrencyList, f4FetchBusinessAreaList2, f4FetchExchangeRateNational} from '../../../reference/f4/f4_action';
import {clearfaBkpf, changefaBkpf, fetchCashBankHkontsByBranch, changeDynObj, clearDynObj, saveFcis} from '../../fa_action';
import {moneyInputHanler} from '../../../utils/helpers';
import OutputErrors from '../../../general/error/outputErrors';
import { modifyLoader } from '../../../general/loader/loader_action';


require('moment/locale/ru');

const hkontOptions_h = [
  { key: 1, text: 'Оплатить долг', value: '33500002' },
  { key: 2, text: 'Деньги на хранение', value: '33500001' }
];
  

 
class Fcis extends Component {


    constructor(props){
        super(props);
        this.initializeBkpfBseg=this.initializeBkpfBseg.bind(this);
        this.initialBseg=this.initialBseg.bind(this);
        this.state={
          errors:[]
        }  
    }

    componentWillMount() {
        this.initializeBkpfBseg();

        this.props.f4FetchCurrencyList('fcis');
        this.props.f4FetchDepartmentList();
        this.props.f4FetchBusinessAreaList2();
        this.props.f4FetchExchangeRateNational();

    }
    
    componentWillUnmount(){
      this.props.clearfaBkpf();
      this.props.clearDynObj();
    }
  
    componentWillReceiveProps(nextProps) {
      if(nextProps.bkpf.brnch !== this.props.bkpf.brnch) {
          this.props.fetchCashBankHkontsByBranch(nextProps.bkpf.bukrs,nextProps.bkpf.brnch);
          this.props.changeDynObj({
            ...this.props.bseg, hkont_s: ''
          });
        // nextProps.myProp has a different value than our current prop
        // so we can perform some calculations based on the new value
      }
      if(nextProps.bkpf.waers !== this.props.bkpf.waers) {
        this.props.fetchCashBankHkontsByBranch(nextProps.bkpf.bukrs,nextProps.bkpf.brnch);
        this.props.changeDynObj({
          ...this.props.bseg, hkont_s: ''
        });
      // nextProps.myProp has a different value than our current prop
      // so we can perform some calculations based on the new value
      }
    }
    
    onInputChange(value,stateFieldName){      
      let bseg = {...this.props.bseg};
      if (stateFieldName === 'summa'){          
        let newVal = moneyInputHanler(value,2);
        if (newVal!==undefined){          
          this.props.changeDynObj({
            ...bseg, [stateFieldName]:newVal
          });
        }
      }
      else if (stateFieldName === 'lifnr'){
        this.props.changeDynObj({
          ...bseg, lifnr:value.customerId,staffFio:value.fio, staffId:value.staffId
        });
      }
      else
      {
        this.props.changeDynObj({
          ...bseg, [stateFieldName]:value
        });
      }
    }


    initializeBkpfBseg(){      
      let bkpf = Object.assign({}, this.props.initialBkpf);
      bkpf.blart="S2";
      bkpf.budat=moment().format( "DD.MM.YYYY");
      bkpf.bldat=moment().format( "DD.MM.YYYY");
     
      this.props.changefaBkpf(bkpf);
      this.initialBseg();
    }
    initialBseg(){
      this.props.changeDynObj({
        lifnr:'',
        staffId:'',
        staffFio:'',
        hkont_s:'',
        hkont_h:'',
        summa:0
      });
    }
    save(){      
      this.props.modifyLoader(true);
      let errors = [];
      errors = this.validate();
      if (errors===null || errors===undefined || errors.length===0){        
        let bkpf = {...this.props.bkpf};        
        let bseg = {...this.props.bseg};
        this.props.saveFcis(bkpf, bseg, ()=>this.initializeBkpfBseg());
      }
      else{
        this.props.modifyLoader(false);
      }
      
      this.setState({errors});
    }
    validate(){
      
      let errors = [];
      const {bukrs,brnch,dep,waers,bldat} = this.props.bkpf;
      if (bukrs===null || bukrs===undefined || !bukrs) { errors.push("Выберите компанию"); }
      if (brnch===null || brnch===undefined || !brnch) { errors.push("Выберите филиал"); }
      if (dep===null || dep===undefined || !dep) { errors.push("Выберите отдел"); }
      if (waers===null || waers===undefined || !waers) { errors.push("Выберите валюту"); }
      if (bldat===null || bldat===undefined || !bldat) { errors.push("Выберите дату документа"); }

      const {lifnr, hkont_s, hkont_h, summa} = this.props.bseg;
      if (hkont_h===null || hkont_h===undefined || !hkont_h) { errors.push("Выберите операцию"); }
      if (hkont_s===null || hkont_s===undefined || !hkont_s) { errors.push("Выберите кассу"); }
      if (lifnr===null || lifnr===undefined || !lifnr) { errors.push("Выберите сотрудника"); }
      if (summa===null || summa===undefined || !summa || parseFloat(summa)<=0) { errors.push("Сумма 0 или отрицательная "); }

      return errors;
    }
    
    render(){
      const bkpfInfo = {
        bukrsInfo:            { readOnly:false, disabled:false },
        brnchInfo:            { readOnly:false, disabled:false },
        business_area_idInfo: { readOnly:true,  disabled:true },
        depInfo:              { readOnly:false, disabled:false },
        budatInfo:            { readOnly:false, disabled:true  },
        bldatInfo:            { readOnly:false, disabled:false },
        blartInfo:            { readOnly:true , disabled:false },
        waersInfo:            { readOnly:false, disabled:false },
        kursfInfo:            { readOnly:true , disabled:false },
        bktxtInfo:            { readOnly:false, disabled:false }, 
        officialInfo:         { readOnly:true , disabled:true  },
        zregInfo:             { readOnly:true,  disabled:true }
        
      }

      const {waers, bukrs, brnch} = this.props.bkpf;

      const hkontOptions = this.props.hkontOptions.filter(wa=>wa.dynvalue===waers)
       .map((wa,idx)=>{
          return {key:idx,value:wa.value, text:wa.text};
        });



      const {lifnr, staffFio, hkont_s, hkont_h, summa} = this.props.bseg;
        

        return (
            
            <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
                <Header as="h2" block>
                  Взнос в счет сотрудника
                </Header>
                <Segment padded size="small">
                  <List horizontal>
                    <List.Item>
                      <List.Content>
                          <Button icon labelPosition='left' primary size='small' onClick={()=>this.save()} disabled={this.props.activeLoader}>
                            <Icon name='save' size='large' />Сохранить
                          </Button>
                      </List.Content>
                    </List.Item>
                  </List>             
                </Segment>

                <OutputErrors errors={this.state.errors}/>
                
                <FaHeader {...this.props}  bkpfInfo={bkpfInfo}/>
                <FcisPosition  hkontOptions_s={hkontOptions}  hkontOptions_h={hkontOptions_h} waers={waers}
                  lifnr={lifnr} staffFio={staffFio} hkont_s={hkont_s} hkont_h={hkont_h} summa={summa}
                  brnch = {brnch} branchOptions={this.props.branchOptions} 
                  bukrs={bukrs} companyOptions={this.props.companyOptions} 
                  onInputChange = {(value,stateFieldName)=>{this.onInputChange(value,stateFieldName)}}
                />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </Container>

        );
        
        
    }
    
};


     

  function mapStateToProps(state)
{
    // console.log(state,'state');
    return {
      companyOptions:state.userInfo.companyOptions
      ,branchOptions:state.userInfo.branchOptionsAll
      ,currencyOptions:state.f4.currencyOptions
      ,departmentOptions: state.f4.departmentOptions
      ,businessAreaOptions:state.f4.businessAreaList
      ,exRateNational:state.f4.exRateNational
      ,bkpf:state.fa.faForm.bkpf
      ,initialBkpf:state.fa.faForm.initialBkpf
      ,hkontOptions:state.fa.faForm.hkontOptions
      ,bseg:state.fa.dynamicObject
    };
}





export default connect(mapStateToProps,{ f4FetchDepartmentList, f4FetchCurrencyList, modifyLoader,saveFcis,
  f4FetchBusinessAreaList2, f4FetchExchangeRateNational, changefaBkpf, clearfaBkpf, fetchCashBankHkontsByBranch, changeDynObj, clearDynObj}) (Fcis);

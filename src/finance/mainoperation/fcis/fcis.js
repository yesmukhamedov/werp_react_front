import React,{ Component } from 'react';
import { connect } from 'react-redux';
import {  Container, Header  } from 'semantic-ui-react';
import moment from 'moment';
import FaHeader from '../../faHeader';
import FcisPosition from './fcisPosition';
import {f4FetchDepartmentList, f4FetchCurrencyList, f4FetchBusinessAreaList2, f4FetchExchangeRateNational} from '../../../reference/f4/f4_action';
import {clearfaBkpf, changefaBkpf, fetchCashBankHkontsByBranch, changeDynObj, clearDynObj} from '../../fa_action';
import {moneyInputHanler} from '../../../utils/helpers';


require('moment/locale/ru');

const hkontOptions_h = [
  { key: 1, text: 'Оплатить долг', value: '33500002' },
  { key: 2, text: 'Деньги на хранение', value: '33500001' }
];
  

 
class Fcis extends Component {


    constructor(props){

        super(props);
        this.initializeBkpfBseg=this.initializeBkpfBseg.bind(this);
        

        
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
      else
      {
        this.props.changeDynObj({
          ...bseg, [stateFieldName]:value
        });
      }
    }


    initializeBkpfBseg(){      
      let bkpf = Object.assign({}, this.props.initialBkpf);
      bkpf.blart="PN";
      bkpf.budat=moment().format( "DD.MM.YYYY");
      bkpf.bldat=moment().format( "DD.MM.YYYY");

     
      this.props.changefaBkpf(bkpf);


      this.props.changeDynObj({
        lifnr:'',
        staffFio:'',
        hkont_s:'',
        hkont_h:'',
        summa:0
      });
            
            
    }

    
    render(){
      console.log(this.props.hkontOptions,'this.props.hkontOptions')
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

      const {lifnr, staffFio, hkont_s, hkont_h, summa} = this.props.bseg;
        

        return (
            
            <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
                <Header as="h2" block>
                    Personel nakit tahsilati
                </Header>
                
                <FaHeader {...this.props}  bkpfInfo={bkpfInfo}/>
                <FcisPosition  hkontOptions_s={this.props.hkontOptions}  hkontOptions_h={hkontOptions_h} waers={this.props.bkpf.waers}
                  lifnr={lifnr} staffFio={staffFio} hkont_s={hkont_s} hkont_h={hkont_h} summa={summa}
                  onInputChange = {(value,stateFieldName)=>{this.onInputChange(value,stateFieldName)}}
                />
            </Container>

        );
        
        
    }
    
    // handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex })
    
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





export default connect(mapStateToProps,{ f4FetchDepartmentList, f4FetchCurrencyList, 
  f4FetchBusinessAreaList2, f4FetchExchangeRateNational, changefaBkpf, clearfaBkpf, fetchCashBankHkontsByBranch, changeDynObj, clearDynObj}) (Fcis);

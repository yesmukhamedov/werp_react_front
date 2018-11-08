import React,{ PureComponent } from 'react';
import { connect } from 'react-redux';
import { Container, Button, Table, Dropdown, Icon, Grid, Segment, Input, Header, Label } from 'semantic-ui-react';
import {handleFocus} from '../../../utils/helpers';
import {clearDynObj, fetchFA03} from '../../fa_action';
import Fa03Header from './fa03Header'
import '../../fa.css'
import Fa03Position from './fa03Position';
import PaymentSchedule from './paymentSchedule';
import Fa03RelatedDocs from './fa03RelatedDocs';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import { modifyLoader } from '../../../general/loader/loader_action';

require('moment/locale/ru');

  

class Fa03 extends PureComponent {
    constructor(props){
        super(props);
        this.onInputChange = this.onInputChange.bind(this);

        

        var date = new Date(), y = date.getFullYear();

        this.state={
            errors:[],
            searchParameters:{belnr:'1121100311',gjahr:y,bukrs:'1000'}
            // 1121100555
            // 1121100164
        }  
    }

    componentWillMount() {

        let url = this.props.location.search;
        let params = queryString.parse(url);

        if (params.belnr && params.bukrs && params.gjahr){
            let searchParameters = {belnr:params.belnr,gjahr:params.gjahr,bukrs:params.bukrs};
            this.setState({searchParameters});
            this.props.fetchFA03(searchParameters);
        }

    }
    
    componentWillUnmount(){
      this.props.clearDynObj();
    }
  

    onInputChange(value,stateFieldName){
        let searchParameters = {...this.state.searchParameters,[stateFieldName]:value};
        this.setState({searchParameters});
    }

    

    

    render(){
        const {belnr,gjahr,bukrs} = this.state.searchParameters;
          return (
              
            <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}} >
                <Header as="h2" block>
                    Просмотр Фин. Док.
                </Header>
                
                <Segment padded size="small">
                    <Link className={'ui icon button primary'}  to={`/finance/mainoperation/fa02?belnr=`+belnr+`&bukrs=`+bukrs+`&gjahr=`+gjahr}>
                        Edit
                    </Link>                               
                </Segment>
                <Segment padded size="small">                 
                    <Label color="red" ribbon>
                        Параметры поиска
                    </Label>

                    
                    <Table collapsing >
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>
                                    <Icon name='folder' />
                                    Компания
                                </Table.Cell>                                      
                                <Table.Cell>
                                    <Dropdown placeholder='Компания' selection options={this.props.companyOptions} value={bukrs} 
                                                onChange={(e, { value }) => this.onInputChange(value,'bukrs')} />
                                </Table.Cell> 
                                <Table.Cell>
                                    Номер документа
                                </Table.Cell>                                      
                                <Table.Cell>
                                    <Input value={belnr} onChange={(e, { value }) => this.onInputChange(value,'belnr')} onFocus={handleFocus} maxLength='10' />
                                </Table.Cell> 
                                <Table.Cell>
                                    Год
                                </Table.Cell>
                                <Table.Cell>
                                    <Input value={gjahr} onChange={(e, { value }) => this.onInputChange(value,'gjahr')} onFocus={handleFocus} maxLength='4'/>
                                </Table.Cell>     
                                <Table.Cell>
                                    <Button icon labelPosition='left' primary size='small' onClick={()=>{
                                        this.props.modifyLoader(true);                                                                   
                                        this.props.fetchFA03(this.state.searchParameters)}}>
                                        <Icon name='search' size='large' />Поиск
                                    </Button>
                                </Table.Cell>       
                            </Table.Row> 
                        </Table.Body>                     
                    </Table>            
                </Segment>               
      
                <Fa03RelatedDocs relatedDocs={this.props.relatedDocs}/>
                <Fa03Header companyOptions={this.props.companyOptions}
                    bkpf={this.props.bkpf}
                    customerName={this.props.customerName}
                    branchName={this.props.branchName}
                    userFIO={this.props.userFIO}
                    baName={this.props.baName}
                    depName={this.props.depName}
                    stornoOriginal={this.props.stornoOriginal}
                    stornoOriginalBelnr={this.props.stornoOriginalBelnr}
                    stornoOriginalGjahr={this.props.stornoOriginalGjahr}
                    stornoOriginalBukrs={this.props.stornoOriginalBukrs}
                />
                <Fa03Position bseg={this.props.bseg} bkpf={this.props.bkpf} />
                <PaymentSchedule ps={this.props.ps} />
            </Container>
  
          );
          
          
      }
 
};     

function mapStateToProps(state)
{
//   console.log(state,'state');
  return {
    companyOptions:state.userInfo.companyOptions,
    bkpf:state.fa.dynamicObject.bkpf,
    customerName:state.fa.dynamicObject.customerName,
    branchName:state.fa.dynamicObject.branchName,
    userFIO:state.fa.dynamicObject.userFIO,
    baName:state.fa.dynamicObject.baName,
    depName:state.fa.dynamicObject.depName,
    bseg:state.fa.dynamicObject.bseg,
    ps:state.fa.dynamicObject.ps,
    stornoOriginal:state.fa.dynamicObject.stornoOriginal,
    stornoOriginalBelnr:state.fa.dynamicObject.stornoOriginalBelnr, 
    stornoOriginalGjahr:state.fa.dynamicObject.stornoOriginalGjahr, 
    stornoOriginalBukrs:state.fa.dynamicObject.stornoOriginalBukrs,
    relatedDocs:state.fa.dynamicObject.relatedDocs
  };
}

export default connect(mapStateToProps,{ fetchFA03, clearDynObj, modifyLoader}) (Fa03);
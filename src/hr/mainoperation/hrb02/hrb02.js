import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Dropdown, Icon, Container, Header, Grid, Divider, Segment, Menu } from 'semantic-ui-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Link} from 'react-router-dom'
import moment from 'moment';
import { notify } from '../../../general/notification/notification_action';
import ReactTable from 'react-table';
import _ from "lodash";
import "react-table/react-table.css";
import MatnrF4Modal from '../../../reference/f4/matnr/matnrF4Modal';
import PositionF4Modal from '../../../reference/f4/position/positionF4Modal';
// import {frcolnSearchData, frcolnFetchBranchData, changeTab, frcolnFetchCollectorData, clearState, frcolnSaveData} from './frcoln_action';
import {LEGACY_URL} from "../../../utils/constants"
require('moment/locale/ru');
const statusOptions = [
    { key: 0, text: 'Стандарт', value: 0 },
    { key: 1, text: 'Проблемный', value: 1 }
  ];


  

 
class Hrb02 extends Component {


    constructor(props){

        super(props);
        // this.onInputChange = this.onInputChange.bind(this);
        // this.onSearchClick = this.onSearchClick.bind(this);
        // this.searchBranchInfo = this.searchBranchInfo.bind(this);
        // this.handleTabChange = this.handleTabChange.bind(this);
        // this.searchCollectorInfo = this.searchCollectorInfo.bind(this);
        this.matnrF4ModalOpenHanlder = this.matnrF4ModalOpenHanlder.bind(this);
        this.positionF4ModalOpenHanlder = this.positionF4ModalOpenHanlder.bind(this);
        

        
        this.state={searchTerm:{bukrs:'',branchList:[],date:moment(),status:0}, companyOptions:[], branchOptions:[], matnrF4ModalOpen:false, positionF4ModalOpen:false};
        
        // // ,tab2TableParams : {table:[], headers:headerObjectArray,columns:columnObjectArray, 
        // //     pagination:true//,footers:footers//, paginationSize:5//,totalPages:undefined, currentPage:undefined//
        //   }
    
    }
    componentWillReceiveProps(nextProps){
        // if(this.props.companyOptions!==nextProps.companyOptions){            
        //     this.setState({companyOptions:nextProps.companyOptions});
        //     if (nextProps.companyOptions && nextProps.companyOptions.size===1){
        //         this.onInputChange(nextProps.companyOptions[0].value,'bukrs');
        //     };
        // }
        
    }
    componentWillUnmount(){
        // this.props.clearState();
    }
    // .filter((item) =>
    //         {item.businessAreaId==1})
    onInputChange(value,stateFieldName){
        // console.log(formatMoney(324234234.55));
        // let waSearchTerm = Object.assign({}, this.state.searchTerm);
        // if (stateFieldName==="bukrs")
        // {               
        //     this.props.clearState();
        //     waSearchTerm.bukrs=value;
        //     let branchOptions = this.props.branchOptions[value];
        //     this.setState({searchTerm:waSearchTerm,branchOptions:branchOptions?branchOptions:[]});
        //     // if (branchOptions!==undefined && branchOptions.length>0){
        //     //     this.setState({searchTerm:waSearchTerm,branchOptions});
        //     // }
        //     // else
        //     // {
        //     //     this.setState({searchTerm:waSearchTerm,branchOptions:branchOptions?branchOptions:[]});
        //     // }
            
        // }
        // else if (stateFieldName==='branch') { 
        //     this.props.clearState();
        //     waSearchTerm.branchList=value;
        //     this.setState({searchTerm:waSearchTerm});
        // }
        // else if (stateFieldName==='date') { 
        //     this.props.clearState();
        //     waSearchTerm.date=value;
        //     this.setState({searchTerm:waSearchTerm});
        // }
        // else if (stateFieldName==='status') { 
        //     this.props.clearState();
        //     waSearchTerm.status=value;
        //     this.setState({searchTerm:waSearchTerm});
        // } 
        
        // console.log(this.state);
    }


    // matnrF4ModalOpenHanlder= (a_boolean) => () => {
    //     this.setState({matnrF4ModalOpen:a_boolean});
    // }
    
    matnrF4ModalOpenHanlder(a_boolean){
        console.log(a_boolean);
        this.setState({matnrF4ModalOpen:a_boolean});
    }
    positionF4ModalOpenHanlder(a_boolean){
        console.log(a_boolean);
        this.setState({positionF4ModalOpen:a_boolean});
    }

    selectItemMatnr(matnr){
        console.log("matnr",matnr)
    }
    
    render(){
       
        


        // let open=this.state.matnrF4ModalOpen;

        return (
            
            <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>

                <MatnrF4Modal open={this.state.matnrF4ModalOpen} closeModal={(bool)=>this.matnrF4ModalOpenHanlder(bool)} trans={'hrb02'} 
                selectItem={(item)=>this.selectItemMatnr(item)}/>

                <PositionF4Modal open={this.state.positionF4ModalOpen} closeModal={(bool)=>this.positionF4ModalOpenHanlder(bool)} trans={'hrb02'} 
                selectItem={(item)=>this.selectItemMatnr(item)}/>
                <Header as="h2" block>
                    Редактировать бонус
                </Header>
                <Button icon='external' onClick={()=>this.matnrF4ModalOpenHanlder(true)} />
                <Button icon='external' onClick={()=>this.positionF4ModalOpenHanlder(true)} />
                
                {/* <Segment >
                    <ReactTable
                        data={this.props.tab4OutputTable}
                        columns={t5columns}
                        defaultPageSize={20}
                        showPagination={true}
                        loadingText= 'Loading...'
                        noDataText= 'Нет записей'
                        className="-striped -highlight"
                        previousText={'Пред.'}
                        nextText={'След.'}
                        rowsText={'строк'}
                        pageText={'Страница'}
                        ofText={'из'}
                        >
        
                    </ReactTable>
                </Segment> */}
                




       
        


        
                     
            </Container>

        );
        
        
    }
    
    // handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex })
    
};




function mapStateToProps(state)
{
    // console.log(state);
    return { companyOptions:state.userInfo.companyOptions,branchOptions:state.userInfo.branchOptionsMarketing
        
        // ,tab2OutputTable:state.frcoln.tab2OutputTable
        // ,tab3OutputTable:state.frcoln.tab3OutputTable
        // ,tab4OutputTable:state.frcoln.tab4OutputTable
        // ,tab2TotalTable:state.frcoln.tab2TotalTable
        // ,tab3TotalTable:state.frcoln.tab3TotalTable 
        // ,activeIndex:state.frcoln.activeIndex
    };
}

export default connect(mapStateToProps,{ notify }) (Hrb02);

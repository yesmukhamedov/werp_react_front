import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import {f4FetchStaffList, f4ClearStaffList} from '../f4_action'
import { Table, Modal, Dropdown, Icon, Input, Checkbox, Button } from 'semantic-ui-react'
import matchSorter from 'match-sorter';
import {LEGACY_URL} from "../../../utils/constants"
// import './notification.css'

// const arrayList= ;
class StaffF4Modal extends PureComponent{
    
    constructor(props){

        super(props);
        this.onInputChange=this.onInputChange.bind(this);
        this.onSearch=this.onSearch.bind(this);
        this.close = this.close.bind(this);
        this.state = 
        {        
            bukrsDisabledState:false,
            brnchDisabledState:false,
            bukrsSV:'',
            brnchSV:'',
            fioSV:'',
            iinBinSV:'',
            unemployed:false,
            loading:false
        };


        
        
    } 

    
    componentWillReceiveProps(nextProps) {
        
        if(nextProps.bukrs !== this.props.bukrs) {      
            this.setState({ bukrsSV:nextProps.bukrs })
        }
        if(nextProps.brnch !== this.props.brnch) {      
            this.setState({ brnchSV:nextProps.brnch })
        }
    }
  
    componentWillUnmount(){
        this.props.f4ClearStaffList();
    }

    onInputChange(value,stateFieldName){
        if (stateFieldName==='unemployed'){
            this.setState({unemployed:!this.state.unemployed,bukrsDisabledState:!this.state.unemployed,brnchDisabledState:!this.state.unemployed })
        }
        else{
            this.setState({[stateFieldName]:value })
        }
    }
  
    onSearch(){
        this.props.f4FetchStaffList(this.props.trans, this.state.bukrsSV, this.state.brnchSV, this.state.fioSV, this.state.iinBinSV, this.state.unemployed,
        (value)=>this.setState({loading:value}));
    }

    close = () => {
        this.props.closeModal(false);
    }



    render () {
        let trans = this.props.trans;
        let t1columns = [];
        if (trans==='fcis')
        {
            let t1r1c1 = {Header:({value}) => <b>ID</b>,accessor: "staffId",width: 100,className:'clickableItem',
                Cell: obj => 
                <span>
                    <a target='_blank' href={`${LEGACY_URL}/hr/staff/View.xhtml?staffId=` + obj.original.staffId}>
								<Button>{obj.original.staffId}</Button>
                            </a>                                      
                </span> 
        
            };
            let t1r1c2 = {Header:({value}) => <b>ФИО</b>,width: 300,id: "fio",
            accessor: d => d.fio,
            filterMethod: (filter, rows) =>
              matchSorter(rows, filter.value, { keys: ["fio"] }),
            filterAll: true,className:'clickableItem'};


            let t1r1c3 = {Header:({value}) => <b>ИИН/БИН</b>,accessor: "iinBin",width: 150,className:'clickableItem'};

    
    
            
            t1columns.push(t1r1c1);
            t1columns.push(t1r1c2);
            t1columns.push(t1r1c3);
            // t1columns.push(t1r1c4);
        }
        
        const {companyOptions, branchOptions, bukrsDisabledParent} = this.props;
        const {bukrsDisabledState, brnchDisabledState, bukrsSV, brnchSV, fioSV, iinBinSV, unemployed} = this.state;

        return (

            <Modal open={this.props.open} onClose={this.close}  dimmer={"inverted"} size='small' >
                <Modal.Header>
                    <Icon name='filter' size='big' />
                    Сотрудники
                </Modal.Header>
                <Modal.Content>
                <Table collapsing>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                <Icon name='folder' />
                                Компания
                            </Table.Cell>
                            <Table.Cell>
                                <Dropdown placeholder='Компания' selection options={companyOptions} value={bukrsSV} 
                                            onChange={(e, { value }) => this.onInputChange(value,'bukrsSV')} 
                                            disabled={bukrsDisabledParent?bukrsDisabledParent:bukrsDisabledState}
                                            />
                            </Table.Cell>
                            <Table.Cell>
                                ФИО
                            </Table.Cell>
                            <Table.Cell>
                                <Input
                                value={fioSV} placeholder={'ФИО'}
                                onChange={(e, { value }) => this.onInputChange(value,'fioSV')}
                                />
                            </Table.Cell>                              
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                <Icon name='browser' />     
                                Филиал
                            </Table.Cell>
                            <Table.Cell>
                                <Dropdown placeholder='Филиал'  search selection options={branchOptions[bukrsSV]?branchOptions[bukrsSV]:[]} 
                                            value={brnchSV}  onChange={(e, { value }) => this.onInputChange(value,'brnchSV')}
                                            disabled={brnchDisabledState} 
                                            />
                            </Table.Cell> 
                            <Table.Cell> 
                                ИИН/БИН
                            </Table.Cell>
                            <Table.Cell>
                                <Input
                                value={iinBinSV} placeholder={'ИИН/БИН'}
                                onChange={(e, { value }) => this.onInputChange(value,'iinBinSV')}
                                />
                            </Table.Cell>                            
                        </Table.Row>                        
                        <Table.Row>                                          
                            <Table.Cell>
                                Уволенный
                            </Table.Cell>
                            <Table.Cell>                                                                        
                                <Checkbox
                                checked={unemployed}
                                onChange={(e, { value }) => this.onInputChange(value,"unemployed")}
                                />
                            </Table.Cell> 
                            <Table.Cell>                                 
                                <Button icon labelPosition='left' primary size='small' onClick={()=>{this.setState({loading:true});this.onSearch();}}
                                loading={this.state.loading} disabled={this.state.loading}>
                                    <Icon name='search' size='large' />Поиск
                                </Button>
                            </Table.Cell>
                            <Table.Cell>
                            </Table.Cell>         
                        </Table.Row>
                    </Table.Body>                     
                </Table>     

                    <ReactTable
                        filterable
                        data={this.props.table}
                        columns={t1columns}
                            defaultPageSize={10}
                            showPagination={true}
                            // style={{ height: '400px' }}
                            loadingText= 'Loading...'
                            noDataText= 'Нет записей'
                            className="-striped -highlight"
                            previousText={'Пред.'}
                            nextText={'След.'}
                            rowsText={'строк'}
                            pageText={'Страница'}
                            ofText={'из'}
                            showPageSizeOptions= {false}
                            getTrProps={(state, rowInfo, column) => {
                                return {
                                  
                                  onClick: (e, handleOriginal) => {
                                    this.props.onStaffSelect(rowInfo.original);
                                    this.props.closeModal(false);
                                  },
                                };
                              }}
                            
                            />
                </Modal.Content>
            </Modal>


        )
    }
};
// export default Notification;
function mapStateToProps (state) {
  return { table: state.f4.staffList }
}

export default connect(mapStateToProps, {f4FetchStaffList, f4ClearStaffList })(StaffF4Modal)

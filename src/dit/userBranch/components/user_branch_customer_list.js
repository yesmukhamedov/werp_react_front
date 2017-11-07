import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { removeUbc, addUbc, changeUbc, changeAccessUbc, saveUserBranchCustomers } from '../actions/userBranch_action';
import { notify } from '../../../general/notification/notification_action';
import { Table } from 'semantic-ui-react';
import { Button, Icon, Label, Dropdown } from 'semantic-ui-react';
import CustomerF4 from '../../../reference/f4/Customer/customerF4';

const options = [
    { key: 1, text: 'есть', value: 1 },
    { key: 2, text: 'нет', value: 2 },
  ]
// const arrayList= ;
class UserBranchCustomerList extends Component {



    constructor(props){
        super(props);
        this.onCustomerF4Selct = this.onCustomerF4Selct.bind(this);
        this.onCustomerF4ButtonClick = this.onCustomerF4ButtonClick.bind(this);
        
        this.additionalItem = this.additionalItem.bind(this);
        this.renderTableList = this.renderTableList.bind(this);
        this.removeCustomer = this.removeCustomer.bind(this);
        this.addCustomer = this.addCustomer.bind(this);
        this.fizYurText = this.fizYurText.bind(this);
        this.changeAccess = this.changeAccess.bind(this);
        
        this.state={open:false,idx:''};
    }

    onCustomerF4ButtonClick(a_idx){
        this.setState({...this.state,idx:a_idx, open: true});
    }
    onCustomerF4Selct(customer){
        var waUbc;
        if (this.state.idx==='new') waUbc = Object.assign({},this.props.newUbc);
        else waUbc = Object.assign({},this.props.userBranchCustomerList[this.state.idx]);
        waUbc.fio=customer.fio;
        waUbc.iin_bin=customer.iin_bin;
        waUbc.fiz_yur=customer.fiz_yur;
        waUbc.customerId=customer.id;

        if (this.state.idx==='new') this.props.selectNewUbc(waUbc);//this.setState({newUbc:waUbc});
        else this.props.changeUbc(this.state.idx,waUbc);
        
    }

    removeCustomer(event,idx){
        // console.log(idx,"remove");
        this.props.removeUbc(idx);
    }
    addCustomer(event){
        // this.props.notify('success',this.props.selectedUserBranch.branchName);
        
        var waNewUbc = Object.assign({},this.props.newUbc);
        waNewUbc.ubcAccess=1;
        if (this.props.newUbc.customerId)
        {
            waNewUbc.userBranchId=this.props.selectedUserBranch.userBranchId;
            this.props.addUbc(waNewUbc);
            
            var waUbc = Object.assign({},this.props.newUbc);
            waUbc.fio="";
            waUbc.iin_bin=null;
            waUbc.fiz_yur=1;
            waUbc.customerId=null;
            this.props.selectNewUbc(waUbc);
            // this.setState({newUbc:waUbc}); 
        }
        else{
            this.props.notify('error','Выберите контрагента','Ошибка');
        }
        
        
    }
    changeAccess(idx,access)
    {
        this.props.changeAccessUbc(idx,access);
    }
    fizYurText(id){
        if (id===1){ return ("Юр.")} 
        else if (id===2) { return "Физ."}
        else return "";
    }

    renderTableList() {
        
        if (this.props.userBranchCustomerList) {
            return(
                this.props.userBranchCustomerList.map((ubc,idx)=>{
                    

                    if (ubc.remove===false)
                    {
                        return (
                            <Table.Row key={idx}>
                                <Table.Cell>{ubc.iin_bin}</Table.Cell>
                                <Table.Cell>{ubc.fio} </Table.Cell>
                                <Table.Cell><Icon name='clone'  size='large'  className="clickableIcon" onClick={(event)=>this.onCustomerF4ButtonClick(idx)}/></Table.Cell>
                                <Table.Cell>{this.fizYurText(ubc.fiz_yur)}</Table.Cell>
                                <Table.Cell><Dropdown fluid selection options={options} value={ubc.ubcAccess} 
                                    onChange={(e,{value}) => this.changeAccess(idx,value)}/></Table.Cell>
                                <Table.Cell><Icon name='remove'  size='large'  className="clickableIcon" color="red" onClick={(event)=>this.removeCustomer(event,idx)}/></Table.Cell>
                            </Table.Row>
                        );

                    }
                    else return null;
                    
                })              
                
            );
              
        }
        

        
    
    }
    renderSelectedUserBranchLabel(){
        if (this.props.selectedUserBranch)
        {
            return (                
                <div>  
                    <br />                  
                    <Label as='a' color='teal' image>
                        {this.props.selectedUserBranch.branchName}                        
                    </Label>
                </div> 
            )
        }
        
    }
    additionalItem(){
        if (this.props.selectedUserBranch)
        {
            return (
                <Table.Row>
                    <Table.Cell>{this.props.newUbc.iin_bin}</Table.Cell>
                    <Table.Cell>{this.props.newUbc.fio}</Table.Cell>
                    <Table.Cell><Icon name='clone'  size='large'  className="clickableIcon" onClick={(event)=>this.onCustomerF4ButtonClick('new')}/></Table.Cell>
                    <Table.Cell>{this.fizYurText(this.props.newUbc.fiz_yur)}</Table.Cell>
                    <Table.Cell>{this.props.newUbc.ubcAccess}</Table.Cell>
                    <Table.Cell><Icon name='add'  size='large'  className="clickableIcon" color="green" onClick={(event)=>this.addCustomer(event)}/></Table.Cell>
                </Table.Row>);
        }
        
    }
    render(){
        
        return (
            <div id="bukrsBranchDiv">
                <CustomerF4 open={this.state.open}  onCloseCustomerF4={(open)=>this.setState({open})} onCustomerSelect={(customer)=>this.onCustomerF4Selct(customer)}/>    
                <div>
                    <Button icon labelPosition='left' primary size='small' onClick={() => this.props.saveUserBranchCustomers(this.props.userBranchCustomerList)}>
                        <Icon name='save' size='large' />Сохранить
                    </Button>
                </div>
                {this.renderSelectedUserBranchLabel(this.bind)}
                <Table striped compact collapsing   id="userBranchCustomerTable">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ИИН</Table.HeaderCell>
                            <Table.HeaderCell>Название</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell>Физ/Юр</Table.HeaderCell>
                            <Table.HeaderCell>Доступ</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>            
                    <Table.Body>{this.renderTableList()}
                    
                    {this.additionalItem()}
                    </Table.Body>        
                </Table>
            </div>

        );
        
        
    }

};

function mapStateToProps(state)
{
    return { userBranchCustomerList: state.ditUserBranch.userBranchCustomerList };
}

export default connect(mapStateToProps,{ removeUbc, addUbc, changeUbc, changeAccessUbc, saveUserBranchCustomers, notify }) (UserBranchCustomerList);



import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { markBranch, editUserBranches } from '../actions/userBranch_action';
import { Table } from 'semantic-ui-react';
import { Button, Icon, Label } from 'semantic-ui-react';
// const arrayList= ;
class BukrsBranchList extends Component {

    // constructor(props){
    //     super(props);
    //     // //this.state = {userBranchList:[]};
    //     // this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    // }

    // componentWillReceiveProps(nextProps){
    //     // console.log(nextProps.userBranchList);
    //     // this.setState(userBranchList = nextProps.userBranchList;
    //     // console.log(1);
    //     this.setState(//{userBranchList : nextProps.userBranchList}
    //         prevState => ({userBranchList: [...this.state.userBranchList, nextProps.userBranchList]})        
    //     );
    //     // console.log(2);
    //     //  console.log(this.state);
    //     // console.log(' zz');
    // }
    handleChangeCheckbox(event, idx){
        // event.flagExists=true;
        // const target = event.target;
        // const name = target.name;
        // const value = target.type === 'checkbox' ? target.checked : target.value;
        this.props.markBranch(idx);
    }
    renderEditCustomer(a_userBranchId){
        if (a_userBranchId)
        {
            return (                
                <Icon name='clone'  size='large'  className="clickableIcon"/>
            )
        }
    }
    renderBukrsBranchList() {
        
        if (this.props.userBranchList) {
            return this.props.userBranchList.map((ub,idx)=>{
                return (
                    <Table.Row key={ub.branchId}>
                        <Table.Cell>{ub.bukrsName}</Table.Cell>
                        <Table.Cell>{ub.branchName}</Table.Cell>
                        <Table.Cell><input type="checkbox" checked={ub.flagExists} name = {idx} className="checkBox" onChange={(event)=>this.handleChangeCheckbox(event, idx)} /></Table.Cell>
                        <Table.Cell>{this.renderEditCustomer(ub.userBranchId)}</Table.Cell>
                    </Table.Row>
                );
            })
        }
        

        
    
    }

    renderSelectedUserLabel(){
        if (this.props.selectdeUser)
        {
            return (                
                <div>  
                    <br />                  
                    <Label as='a' color='teal' image>
                        {this.props.selectdeUser.fio}                        
                    </Label>
                </div> 
            )
        }
        
    }
    // 
    render(){
        return (
            <div id="bukrsBranchDiv">
                <div>
                    <Button icon labelPosition='left' primary size='small' onClick={() => this.props.editUserBranches(this.props.selectdeUser.userId,this.props.userBranchList)} >
                        <Icon name='save' size='large' />Сохранить
                    </Button>
                </div>
                {this.renderSelectedUserLabel(this.bind)}   
                
                <Table striped compact collapsing  id="bukrsBranchTable">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Компания</Table.HeaderCell>
                            <Table.HeaderCell>Филиал</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>            
                    <Table.Body>{this.renderBukrsBranchList()}
                    </Table.Body>        
                </Table>
            </div>

        );
        
        
    }

};

function mapStateToProps(state)
{
    // console.log("BukrsBranchList component line 99",state);
    return { userBranchList: state.ditUserBranch.userBranchList};
}

// function mapDispatchToProps(dispatch){
//     return bindActionCreators({ fetchUsers },dispatch);
// }
export default connect(mapStateToProps,{ markBranch, editUserBranches }) (BukrsBranchList);



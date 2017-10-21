import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { markBranch } from '../actions/userBranch_action';
import { Table } from 'semantic-ui-react';

// const arrayList= ;
class UserBranchCustomerList extends Component {

    // constructor(props){
    //     super(props);
    //     // //this.state = {userBranchList:[]};
    //     // this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    // }

    constructor(props){
        super(props);
    }
   
    renderTableList() {
        
        if (this.props.userBranchList) {
            return this.props.userBranchList.map((ub,idx)=>{
                return (
                    // <Table.Row key={ub.branchId}>
                    //     <Table.Cell>{ub.bukrsName}</Table.Cell>
                    //     <Table.Cell>{ub.branchName}</Table.Cell>
                    //     <Table.Cell><input type="checkbox" checked={ub.flagExists} name = {idx} className="checkBox" onChange={(event)=>this.handleChangeCheckbox(event, idx)} /></Table.Cell>
                    // </Table.Row>
                );
            })
        }
        

        
    
    }

    render(){
        
        
        return (
            <div id="bukrsBranchDiv">
                <Table striped compact collapsing  id="userBranchCustomerTable">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ИИН</Table.HeaderCell>
                            <Table.HeaderCell>Название</Table.HeaderCell>
                            <Table.HeaderCell>Физ/Юр</Table.HeaderCell>
                            <Table.HeaderCell>Доступ</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>            
                    <Table.Body>{this.renderTableList()}
                    </Table.Body>        
                </Table>
            </div>

        );
        
        
    }

};

function mapStateToProps(state)
{
    // console.log("BukrsBranchList component line 99",state);
    return { //userBranchList: state.ditUserBranch.userBranchList
    };
}

// function mapDispatchToProps(dispatch){
//     return bindActionCreators({ fetchUsers },dispatch);
// }
export default connect(mapStateToProps,{ markBranch }) (BukrsBranchList);



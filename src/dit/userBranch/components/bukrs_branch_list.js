import React,{ Component } from 'react';
import { connect } from 'react-redux';
import '../css/userBranch.css';
import { Table } from 'semantic-ui-react';

// const arrayList= ;
class BukrsBranchList extends Component {

    constructor(props){
        super(props);
        this.state = {userBranchList:[]};
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState(
            prevState => ({userBranchList: [...this.state.userBranchList, this.props.userBranchList]})        
        );
        console.log(this.state);
    }
    
    handleChangeCheckbox(event){
     
        const target = event.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.props.userBranchList[name] = value;
        console.log(target);
    }
    renderBukrsBranchList() {
        console.log();
        ;
        return this.state.userBranchList[this.state.userBranchList.length-1].map((ub)=>{
            
            return (
                <Table.Row key={ub.branchId}>
                    <Table.Cell>{ub.bukrsName}</Table.Cell>
                    <Table.Cell>{ub.branchName}</Table.Cell>
                    <Table.Cell><input type="checkbox" checked={ub.booleanExists} onChange={this.handleChangeCheckbox} /></Table.Cell>
                </Table.Row>
            );

        })

        
    
    }

    render(){
        
        
        return (
            <div className="bukrsBranch">

                <Table striped compact collapsing selectable className="bukrsBranch">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Компания</Table.HeaderCell>
                            <Table.HeaderCell>Филиал</Table.HeaderCell>
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
    console.log(state);
    return { userBranchList: state.ditUserBranch.userBranchList};
}

// function mapDispatchToProps(dispatch){
//     return bindActionCreators({ fetchUsers },dispatch);
// }
export default connect(mapStateToProps,{  }) (BukrsBranchList);



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
        // console.log(nextProps.userBranchList);
        // this.setState(userBranchList = nextProps.userBranchList;
        // console.log(1);
        this.setState(//{userBranchList : nextProps.userBranchList}
            prevState => ({userBranchList: [...this.state.userBranchList, nextProps.userBranchList]})        
        );
        // console.log(2);
        //  console.log(this.state);
        // console.log(' zz');
    }
    handleChangeCheckbox(event){
        // event.flagExists=true;
        const target = event.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const varai = this.state.userBranchList[this.state.userBranchList.length-1];
        varai[name].flagExists=value;
        this.setState(
                prevState => ({userBranchList: [...this.state.userBranchList, varai]})        
            );

        // this.state.userBranchList[0] = varai;
        // console.log(this.state);
        // console.log('idx='+name);
        // console.log('value='+value);
    }
    renderBukrsBranchList() {
        
        // console.log(this.state);
        // console.log(' yy');
        if (this.state.userBranchList[this.state.userBranchList.length-1])
        {
            // console.log(3333);
            return this.state.userBranchList[this.state.userBranchList.length-1].map((ub,idx)=>{
                // console.log(idx);
                return (
                    <Table.Row key={ub.branchId}>
                        <Table.Cell>{ub.bukrsName}</Table.Cell>
                        <Table.Cell>{ub.branchName}</Table.Cell>
                        <Table.Cell><input type="checkbox" checked={ub.flagExists} name = {idx} onChange={this.handleChangeCheckbox} /></Table.Cell>
                    </Table.Row>
                );
    
            })
        }
        

        
    
    }

    render(){
        
        
        return (
            <div className="bukrsBranch">

                <Table striped compact collapsing  className="bukrsBranch">
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



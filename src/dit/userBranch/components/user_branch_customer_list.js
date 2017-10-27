import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { markBranch } from '../actions/userBranch_action';
import { Table } from 'semantic-ui-react';
import { Button, Icon, Label } from 'semantic-ui-react';
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
        console.log(this.props);
        
        if (this.props.userBranchCustomerList) {
            return this.props.userBranchCustomerList.map((ubc,idx)=>{
                var wa_fizYurText;
                if (ubc.fiz_yur===1){ wa_fizYurText = "Юр."} else { wa_fizYurText = "Физ."}
                return (
                    <Table.Row key={idx}>
                        <Table.Cell>{ubc.iin_bin}</Table.Cell>
                        <Table.Cell>{ubc.fio}</Table.Cell>
                        <Table.Cell>{wa_fizYurText}</Table.Cell>
                        <Table.Cell>{ubc.ubcAccess}</Table.Cell>
                    </Table.Row>
                );
            })
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
    render(){
        
        
        return (
            <div id="bukrsBranchDiv">

                <div>
                    <Button icon labelPosition='left' primary size='small' >
                        <Icon name='save' size='large' />Сохранить
                    </Button>
                </div>
                {this.renderSelectedUserBranchLabel(this.bind)}   
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
    return { userBranchCustomerList: state.ditUserBranch.userBranchCustomerList
    };
}

// function mapDispatchToProps(dispatch){
//     return bindActionCreators({ fetchUsers },dispatch);
// }
export default connect(mapStateToProps,{  }) (UserBranchCustomerList);



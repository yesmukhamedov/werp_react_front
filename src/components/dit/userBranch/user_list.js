import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers, findUsers } from '../../../actions/dit/userBranch_action';
import { Table,  Container  } from 'semantic-ui-react';

// const arrayList= ;
class UserList extends Component {
    componentWillMount(){
        this.props.fetchUsers();
    }
    constructor(props){
        super(props);
        this.state = {userSearchTerm:""};
    }
    renderUsers() {
        return this.props.foundUsers.map((user)=>{
            return (
                <Table.Row key={user.userId} onClick={()  => this.onRowSelect(user.userId)}>
                    <Table.Cell  > {user.userName}</Table.Cell>
                    <Table.Cell>{user.fio}</Table.Cell>
                </Table.Row>
            );

        })
    }
    
    onInputChange(term){
        this.setState({userSearchTerm:term});
    }

    onSearchClick(){
        this.props.findUsers(this.props.allUsers,this.state.userSearchTerm);
    }

    onRowSelect(a_userId){
        console.log(a_userId);
    }

    render(){
        
        
        return (
            
            <Container style={{ marginTop: '1em' }}>
                <div><input 
                value ={this.state.userSearchTerm}
                onChange={event => this.onInputChange(event.target.value)}/>
                <button className="btn btn-danger pull-xs-right" onClick={this.onSearchClick.bind(this)}>
                    Search
                </button> 
                     </div>
                <Table striped compact collapsing selectable>
                    <Table.Header >
                        <Table.Row>
                            <Table.HeaderCell>Пользователь</Table.HeaderCell>
                            <Table.HeaderCell>ФИО</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>            
                    <Table.Body>
                        {this.renderUsers()}
                    </Table.Body>        
                </Table>
            </Container>
            

        );
        
        
    }

};

function mapStateToProps(state)
{
    return { allUsers: state.ditUserBranch.allUsers,foundUsers: state.ditUserBranch.foundUsers};
}

// function mapDispatchToProps(dispatch){
//     return bindActionCreators({ fetchUsers },dispatch);
// }
export default connect(mapStateToProps,{ fetchUsers, findUsers }) (UserList);
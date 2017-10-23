import React,{ Component } from 'react';
import UserList from './user_list';
import BukrsBranchList from './bukrs_branch_list';
import CustomerF4 from '../../../reference/f4/Customer/customerF4';
import { fetchUsers, findUsers, fethcUserBranches } from '../actions/userBranch_action';
import { connect } from 'react-redux';
import { Container, Button, Icon } from 'semantic-ui-react';
import '../css/userBranch.css';
class AssignUserBranch extends Component {    

    componentWillMount(){
        this.props.fetchUsers();
    }

    constructor(props){
        super(props);
        this.state = {userSearchTerm:"",selectedUser:"",selectedUserBranch:""};
    }

    onInputChange(term){
        this.setState({userSearchTerm:term});
    }

    onSearchClick(){
        this.props.findUsers(this.props.allUsers,this.state.userSearchTerm);
    }
    render(){
        
        return (


            <Container style={{ marginTop: '1em' }}>
            <div className="userBranch">
                <div className="searchTerm">
                    <input value ={this.state.userSearchTerm} onChange={event => this.onInputChange(event.target.value)}/>
                    <Button icon labelPosition='left' primary size='small' onClick={this.onSearchClick.bind(this)} ><Icon name='search' 
                                    size='large' />Поиск</Button>    
                </div>
                <UserList foundUsers={this.props.foundUsers} onUserSelect={(selectedUser)=>this.setState({selectedUser})} />
                <BukrsBranchList selectdeUser3={this.state.selectedUser}/>
                <CustomerF4 />
            </div>
            </Container>
        
    );
        
        
    }

    

};

function mapStateToProps(state)
{
    return { allUsers: state.ditUserBranch.allUsers,foundUsers: state.ditUserBranch.foundUsers};
}

export default connect(mapStateToProps,{ fetchUsers, findUsers, fethcUserBranches }) (AssignUserBranch);
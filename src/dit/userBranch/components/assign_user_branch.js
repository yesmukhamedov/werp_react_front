import React,{ Component } from 'react';
import UserList from './user_list';
import BukrsBranchList from './bukrs_branch_list';
import { fetchUsers, findUsers, fethcUserBranches } from '../actions/userBranch_action';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
class AssignUserBranch extends Component {    

    componentWillMount(){
        this.props.fetchUsers();
    }

    constructor(props){
        super(props);
        this.state = {userSearchTerm:""};
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
                    <button className="btn btn-danger pull-xs-right" onClick={this.onSearchClick.bind(this)}>
                        Search
                    </button> 
                </div>
                <UserList foundUsers={this.props.foundUsers}/>
                <BukrsBranchList />
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
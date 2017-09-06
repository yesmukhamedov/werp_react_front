import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import { Button,  Icon, Table,  Container, Header,  Message } from 'semantic-ui-react';
import AddUserModal from './AddUserModal';
import Notification from './Notification';

class Settings extends Component {

    state = { modalOpen: false, visible: false, type:'', message:'' }

    handleOpen = () => this.setState({ modalOpen: true })
    
    handleClose = () => {this.setState({ modalOpen: false })}

    componentWillMount() {
        this.props.fetchUsers();
    }

    handleMsgDismiss = () => {
        this.setState({ visible: false});
    }

    handleMsgOpen = (message) => {
        this.setState({ 
            visible: true,
            type: 'success',
            message: message});
    }

    renderUsers() {
        if(this.props.users.userList) {
            const userList = this.props.users.userList.map(
                (userInfo) => {
                    return (<Table.Row key={userInfo.user.username}>
                        <Table.Cell collapsing>
                                <Button icon primary size='small'>
                                    <Icon name='write' />
                                </Button>            
                                <Button icon negative size='small'>
                                    <Icon name='remove user' />
                                </Button>
                        </Table.Cell>
                        <Table.Cell>{userInfo.user.username}</Table.Cell>
                        <Table.Cell>{userInfo.user.profileId}</Table.Cell>
                        <Table.Cell>{userInfo.contact.firstName}</Table.Cell>
                        <Table.Cell>{userInfo.contact.lastName}</Table.Cell>
                    </Table.Row>);
            });
            return (userList);
            
        } else {
            return this.renderAlert();
        }        
    }

    renderAlert() {
        return(
            <Table.Row error>
                <Table.HeaderCell colSpan='5'>                    
                    <Message error>
                        <Message.Header> <Icon name='attention' /><strong>Oops!</strong>{this.props.users.error}</Message.Header>          
                    </Message>
                </Table.HeaderCell>
            </Table.Row>
        );
    }

    render() {    
        if(this.props.users.newUserAdded){
            this.props.fetchUsers();
        }
        return(      
            <div>            
            <Container style={{ marginTop: '1em' }}>
            <Notification visible={this.state.visible} 
                          handleMsgDismiss={this.handleMsgDismiss}
                          username={this.props.users.username}
                          message={this.state.message}/>
                <Table compact singleLine definition selectable striped >
                    <Table.Header fullWidth>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell colSpan='4'>
                            <Header as='h2' floated='left'>Настройка пользователей системы</Header>
                            <Button onClick={this.handleOpen} floated='right' icon labelPosition='left' primary size='small'>
                                <Icon name='add user' /> Add User
                            </Button>
                        </Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell textAlign='center'><Icon name='setting' /></Table.HeaderCell>
                        <Table.HeaderCell>Логин</Table.HeaderCell>
                        <Table.HeaderCell>Профиль</Table.HeaderCell>
                        <Table.HeaderCell>Имя</Table.HeaderCell>
                        <Table.HeaderCell>Фамилия</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>            
                    <Table.Body>
                        {this.renderUsers()}
                    </Table.Body>        
            </Table>
            <AddUserModal 
                modalOpen={this.state.modalOpen} 
                handleClose={this.handleClose}
                handleMsgOpen={this.handleMsgOpen}
                />
          </Container>   
          </div>       
        );
    }  
}

function mapStateToProps(state) {
    return {
        users: state.users
    };
}

export default connect(mapStateToProps, actions)(Settings);
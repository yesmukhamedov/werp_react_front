import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/auth';
import { Button,  Icon, Table,  Container, Header } from 'semantic-ui-react';
import UserModal from './UserModal';
import Notification from './Notification';
import Confirmation from './Confirmation';

class Settings extends Component {

    state = { modalOpen: false, modalType: '', modalData: null,  visible: false, confirmOpen: false, deleteId: ''}

    handleModalOpen(modalType) {
        this.setState({ 
            modalOpen: true,
            modalType: modalType, 
            modalData: null
         })
    } 

    handleEditModal(e){
        const id = e.target.getAttribute('id');
        // eslint-disable-next-line
        this.props.users.userList.map((userInfo) => {
            // eslint-disable-next-line
            if(id == userInfo.user.userID) {
                this.setState({ 
                    modalOpen: true,
                    modalType: 'edit',
                    modalData: userInfo
                 })     
            }
        });        
    }
    
    handleModalClose = () => {this.setState({ modalOpen: false, modalData: null })}

    deleteShow = (props) => {        
        this.setState({ 
            confirmOpen: true,  
            deleteId: props.target.getAttribute('id')
        })
    }
    handleConfirm = (id) => {
        this.setState({ confirmOpen: false });
        this.props.deleteUser(id);
    }
    handleConfirmCancel = () => this.setState({ confirmOpen: false })

    componentWillMount() {
        this.props.fetchUsers();
    }

    componentWillReceiveProps(newProps) {
        this.setState({ visible: newProps.users.showMsg});
    }

    // dispatching an action based on state change
    componentWillUpdate(nextProps, nextState) {
        if(nextProps.users.newUserAdded || nextProps.users.deleteUser || nextProps.users.updateUser){
            this.props.fetchUsers();
        }
    }

    handleMsgDismiss = () => {
        this.setState({ visible: false});
    }

    onDeleteClick(props) {
        this.props.deleteUser(props.target.getAttribute('id'));
    }

    renderUsers() {
        if(this.props.users.userList) {
            const userList = this.props.users.userList.map(
                (userInfo) => {
                    const ID = userInfo.user.userID;
                    return (
                        <Table.Row key={ID}>
                            <Table.Cell collapsing>
                                <Button id={ID} icon primary size='small' onClick={this.handleEditModal.bind(this)}>
                                    <Icon id={ID} name='write' />
                                </Button>            
                                <Button id={ID} icon negative size='small' onClick={this.deleteShow}>
                                    <Icon id={ID} name='remove user' />
                                </Button>
                              </Table.Cell>
                            <Table.Cell>{userInfo.user.username}</Table.Cell>
                            <Table.Cell>{userInfo.user.profileId}</Table.Cell>
                            <Table.Cell>{userInfo.contact.firstName}</Table.Cell>
                            <Table.Cell>{userInfo.contact.lastName}</Table.Cell>
                        </Table.Row>);
            });
            return (userList);
            
        }       
    }

    render() {
        return(           
            <Container style={{ marginTop: '1em' }}>
                <Notification visible={this.state.visible} 
                          handleMsgDismiss={this.handleMsgDismiss}
                          message={this.props.users.message}
                          msgType={this.props.users.msgType}/>
                <Table compact singleLine definition selectable striped >
                    <Table.Header fullWidth>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell colSpan='4'>
                            <Header as='h2' floated='left'>Настройка пользователей системы</Header>
                            <Button onClick={() => this.handleModalOpen('add')} floated='right' icon labelPosition='left' primary size='small'>
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
            <UserModal 
                modalOpen={this.state.modalOpen} 
                modalType={this.state.modalType}
                modalData={this.state.modalData}
                handleClose={this.handleModalClose}
                handleMsgOpen={this.handleMsgOpen}
                />
            <Confirmation
                open={this.state.confirmOpen}
                id={this.state.deleteId}
                //cancelButton='Never mind'
                //confirmButton="Let's do it"
                handleCancel={this.handleConfirmCancel}
                handleConfirm={this.handleConfirm}
            />    
          </Container>    
        );
    }  
}

function mapStateToProps(state) {
    return {
        users: state.users
    };
}

export default connect(mapStateToProps, actions)(Settings);
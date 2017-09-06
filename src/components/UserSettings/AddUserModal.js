import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import { Button, Header, Icon, Modal, Form, Select } from 'semantic-ui-react';
import './settings.css';

const options = [
    { key: '0', text: 'Dispatcher', value: '0' },
    { key: '1', text: 'Commodity operator', value: '1' },
    { key: '2', text: 'Admin', value: '2' }]

class AddUserModal extends Component {  

  handleFormSubmit(props) {
    // Call action creator to sign up user!
    this.props.addUser(props);
    this.props.handleClose();
    this.clear();
    this.props.handleMsgOpen("Your user registration was successful");
    
  }  

  handleFormClose() {
    this.props.handleClose();
    this.clear();
  }

  clear(){
    const { reset } = this.props;
    reset();
  }

  render() {
    const { handleSubmit} = this.props;

    return (
      <Modal
        open={this.props.modalOpen}
        onClose={this.handleFormClose.bind(this)}
        closeOnEscape={false}
        closeOnRootNodeClick={false}
        dimmer={'blurring'}
        closeIcon
        size={'tiny'}
      >
        <Header icon='add user' content='Создать пользователя' />
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <Field  name="username"                    
                        icon="user"
                        label="Username"
                        type="text"
                        component={inputField} />                
                <Field  name="password"                    
                        icon="lock"
                        label="Password"
                        type="password"
                        component={inputField} />
                <Field  name="passwordConfirm"                    
                        icon="lock"
                        label="Confirm password"
                        type="password"
                        component={inputField} />
                <Field  name="firstName"                    
                        icon="user"
                        label="First name"
                        type="text"
                        component={inputField} />
                <Field  name="lastName"                    
                        icon="user"
                        label="Last name"
                        type="text"
                        component={inputField} />
                <Field  name="profile" 
                        component={selectField} />
                
                <div className="buttonGroup">
                    <Button color='blue' floated='right' type="submit" inverted>
                        <Icon name='checkmark' /> Yes
                    </Button> 
                    <Button color='red' floated='right' onClick={this.handleFormClose.bind(this)} inverted >
                        <Icon name='remove' /> No
                    </Button>                               
                </div>
            </Form>
          </Modal.Description>              
        </Modal.Content>
      </Modal>
    )
  }
}

const inputField = ({input, icon, label, type}) => 
    <Form.Input {...input} icon={icon} type={type} iconPosition='left' label={label} placeholder={label} required/>

const selectField = () => <Form.Field control={Select}  label='Profile' options={options} placeholder='Profile' required/>    

AddUserModal=  reduxForm({
    form: 'addUser'
  })(AddUserModal);

  export default connect(null, actions)(AddUserModal)
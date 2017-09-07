import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react';
import './settings.css';

class UserModal extends Component {    

  handleFormSubmit(props) {
    // Call action creator to sign up user!
    if(this.props.modalType === 'add'){
      this.props.addUser(props);
    } else if (this.props.modalType === 'edit') {
      const id = this.props.modalData.user.userID;
      const contactId = this.props.modalData.user.contactId;
      this.props.updateUser(props, id, contactId);
    }   
    this.props.handleClose();
    this.clear();
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
        <Header icon={this.props.modalType === "add" ? 'add user' : 'edit'} 
                content={this.props.modalType === "add" ? 'Создать пользователя' : 'Редактировать пользователя'}/>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <Field  name="username"                    
                        icon="user"
                        label="Username"
                        type="text"
                        disabled={this.props.modalType === 'edit' ? true: false}
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
                <div>
                  <label><strong>Profile</strong></label>
                  <Field name="profile" component="select" label='Profile'>                
                    <option value={0} key={0}>
                        Dispatcher
                    </option>
                    <option value={1} key={1}>
                        Commodity operator
                    </option>
                    <option value={2} key={2}>
                        Admin
                    </option>
                  </Field>    
                </div>
                
                <div className="buttonGroup">
                    <Button color='blue' floated='right' type="submit"  inverted>
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

const inputField = ({input, icon, label, type, disabled, meta: { touched, error, warning }}) => 
  <div className="inputField">
    <label><strong>{label}</strong></label>
    <div>
      <input {...input} placeholder={label} type={type} disabled={disabled}/>      
      {touched && (error && <span className="error"> {error} </span>)}
   </div>
  </div>

function validate(formProps, props) {
    const error = {};

    if(!formProps.username) {
        error.username = "Please enter an username";
    }

    if(props.modalType === 'add') {
      if(!formProps.password) {
        error.password = "Please enter a password";
      }
  
      if(!formProps.passwordConfirm) {
          error.passwordConfirm = "Please enter a passwordConfirm";
      } 
    }        

    if(formProps.password !== formProps.passwordConfirm) {
        error.password = "Password must match";
    }

    if(!formProps.firstName) {
        error.firstName = "Please enter a firstName";
    }

    if(!formProps.lastName) {
        error.lastName = "Please enter a lastName";
    }

    return error;
}

function mapStateToProps(state, props) {
  if(props.modalData !== null) {
    const initialData = {
      username: props.modalData.user.username,
      firstName: props.modalData.contact.firstName,
      lastName: props.modalData.contact.lastName, 
      profile: props.modalData.user.profileId
    }
    return {
      initialValues: initialData
    };
  } else {
    return {};
  }  
}

UserModal=  reduxForm({
    form: 'addUser',
    validate,
    enableReinitialize: true
  })(UserModal);

export default connect(mapStateToProps, actions)(UserModal)
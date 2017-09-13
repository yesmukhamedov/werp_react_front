import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';
import logo from '../../assets/images/auro.jpg';

class Signin extends Component {
  handleFormSubmit({ username, password }) {
    // Need to do something to log user in
    this.props.signinUser({ username, password });
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return(
        <Message negative>
          <Message.Header><strong>Oops!</strong> {this.props.errorMessage}</Message.Header>          
        </Message>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return(
      <div className='login-form'>
        {/*
          Heads up! The styles below are necessary for the correct render of this example.
          You can do same with CSS, the main idea is that all the elements up to the `Grid`
          below must have a height of 100%.
        */}
        <style>{` body > div, body > div > div, body > div > div > div.login-form { height: 100%;}`}</style>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='blue' textAlign='center'>
              <Image src={logo} />
              {' '}Log-in to your account
            </Header>
            <Form size='large' onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <Segment stacked>
                <Field
                  name="username"
                  component={usernameInput}
                />
                <Field
                  name="password"
                  component={passwordInput}
                />                
                {this.renderAlert()}
                <Button color='blue' fluid size='large' type="submit">Login</Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const usernameInput = ({input}) => 
    <Form.Input {...input} fluid icon='user' iconPosition='left' placeholder='Username' required/>

const passwordInput = ({input}) => 
    <Form.Input {...input} fluid icon='lock' iconPosition='left' placeholder='Password' type='password' required/> 
  

function mapStateToProps(state) {
  return  {errorMessage: state.auth.error};
}

Signin = reduxForm({
  form: 'signin'
})(Signin);

export default connect(mapStateToProps, actions)(Signin);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { defineMessages, intlShape, injectIntl } from 'react-intl';
import * as actions from '../../actions';
import logo from '../../assets/images/auro.jpg';
import LanguageSwitcher from './../Header/LanguageSwitcher';

class Signin extends Component {
  handleFormSubmit({ username, password }) {
    // Need to do something to log user in
    this.props.signinUser({ username, password }, this.props.locales.lang);
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

  inputField = ({input, icon, type}) => {
    const {formatMessage} = this.props.intl;
    const placeholder = (input.name === 'username') ? messages.username : messages.password;
    return <Form.Input {...input} fluid icon={icon} iconPosition='left' type={type} placeholder={formatMessage(placeholder)} required/>
  }  

  render() {
    const { handleSubmit } = this.props;
    const {formatMessage} = this.props.intl;
    return(
      <div className='login-form'>
        <style>{` body > div, body > div > div, body > div > div > div.login-form { height: 100%;}`}</style>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              <Image src={logo} />
              {' '}{formatMessage(messages.test)}
            </Header>
            <Form size='large' onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <Segment stacked>
                <Field
                  name="username"
                  icon="user"
                  type="text"
                  component={this.inputField}
                />
                <Field
                  name="password"
                  icon="lock"
                  type="password"
                  component={this.inputField}
                />
                <LanguageSwitcher type="signin"/>
                {this.renderAlert()}
                <Button color='teal' fluid size='large' type="submit">{formatMessage(messages.login)}</Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const messages = defineMessages({
  test: {
    id: 'Auth.Signin.Header', 
    defaultMessage: 'Log-in to your account'
  },
  username: {
      id: 'Auth.Signin.Username',
      defaultMessage: 'Username'
  },
  password: {
      id: 'Auth.Signin.Password',
      defaultMessage: 'Password'
  },
  login: {
      id: 'Auth.Signin.Login',
      defaultMessage: 'Login'
  }
}); 

function mapStateToProps(state) {
  return  {
    errorMessage: state.auth.error,
    locales: state.locales
  };
}

Signin.propTypes = {
  intl: intlShape.isRequired
};

Signin = reduxForm({
  form: 'signin'
})(Signin);

export default connect(mapStateToProps, actions)(injectIntl(Signin));
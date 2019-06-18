import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Header,
  Segment,
  Button,
  Container,
  Input,
  Dropdown,
  Icon,
} from 'semantic-ui-react';
import { injectIntl } from 'react-intl';

class Dmsplist extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.inputChange = this.inputChange.bind(this);
  }

  inputChange(value, fieldName) {
    let inputValue = this.state.inputValue;
    let numValue = this.state.numValue;
    console.log('value ', value);
    console.log('fieldName ', fieldName);
    console.log('num ', numValue);
    switch (fieldName) {
      case 'inputValue':
        inputValue = value;
        break;
      case 'numValue':
        numValue = value;
        break;
    }
    this.setState({
      ...this.state,
      numValue: numValue,
      inputValue: inputValue,
    });
  }

  render() {
    const { messages } = this.props.intl;
    console.log('numValue 2 ', this.state.numValue);
    return (
      <Container
        fluid
        style={{
          marginTop: '2em',
          marginBottom: '2em',
          paddingLeft: '2em',
          paddingRight: '2em',
        }}
      >
        <Segment clearing>
          {' '}
          <Header as="h2" floated="left">
            {' '}
            промоакции
          </Header>
        </Segment>
      </Container>
    );
  }
}

export default connect()(injectIntl(Dmsplist));

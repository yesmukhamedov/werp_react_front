import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Dimmer,
  Loader,
  Header,
  Segment,
  Table,
  Menu,
  Message,
  Divider,
  Grid,
} from 'semantic-ui-react';
import * as actions from '../actions/NewIssueAction';
import { PersonalInfoPanelContainer } from './PersonalInfoPanel';
import { FinancialInfoPanelContainer } from './FinancialInfoPanel';


export default class NewIssuePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testData: {},
    };
  }

  render() {
    // const { id } = this.props.params;
    return (
      <Container
        fluid
        style={{
          paddingLeft: '1em',
          paddingRight: '1em',
          backgroundColor: 'rgb(232, 234, 237)',
        }}
      >
        <PersonalInfoPanelContainer />
        <FinancialInfoPanelContainer />
      </Container>
    );
  }
}

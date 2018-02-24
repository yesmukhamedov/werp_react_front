import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Accordion, Icon } from 'semantic-ui-react';
import * as actions from '../actions/NewIssueAction';
import { PersonalInfoPanelContainer } from './PersonalInfoPanel';
import { FinancialInfoPanelContainer } from './FinancialInfoPanel';
import { TaskTrackerPanelDisplay } from './TaskTrackerPanel';
import { PurchasesPanelDisplay } from './PurchasesPanel';

export default class NewIssuePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetailedInfo: true,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(field, value) {
    this.setState({
      ...this.state,
      [field]: value,
    }, () => {
      console.log("STATE AFTER", this.state);
    });
  }

  handleAccordionClick = 
    () => this.handleClick('showDetailedInfo', !this.state.showDetailedInfo);

  render() {
    return (
      <Container
        fluid
        style={{
          paddingLeft: '1em',
          paddingRight: '1em',
          backgroundColor: 'rgb(232, 234, 237)',
        }}
        stretched="false"
      >
        <TaskTrackerPanelDisplay />
        <Accordion fluid styled>
          <Accordion.Title
            active={0}
            index={0}
            onClick={ this.handleAccordionClick }
          >
            <Icon name="dropdown" />
            Детальная информация по договору
          </Accordion.Title>
          <Accordion.Content active={this.state.showDetailedInfo}>
            <PersonalInfoPanelContainer />
            <FinancialInfoPanelContainer />
            <PurchasesPanelDisplay />
          </Accordion.Content>
        </Accordion>
      </Container>
    );
  }
}

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Accordion, Icon } from 'semantic-ui-react';
import { fetchContractById } from '../actions';
import { PersonalInfoPanelDisplay } from './PersonalInfoPanel';
import { FinancialInfoPanelDisplay } from './FinancialInfoPanel';
import { PurchasesPanelDisplay } from './PurchasesPanel';
import { TaskPanelDisplay } from './TaskPanel';
import { OutCallDetailsPanelContainer } from './OutCallDetailsPanel';
import { NewTaskModalComponent } from './NewTaskModal';


export default class NewIssuePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetailedInfo: true,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    const { id: contractId } = this.props.match.params;
    if (contractId) {
      this.props.fetchContractById(contractId);
      console.log("thrown an action")
    }
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
    const { contractDetails }  = this.props;
    return (
      <Container>
        <TaskPanelDisplay />
        {/* <NewTaskModalComponent /> */}
        <OutCallDetailsPanelContainer />
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
            <PersonalInfoPanelDisplay {...contractDetails} />
            <FinancialInfoPanelDisplay {...contractDetails} />
            <PurchasesPanelDisplay {...contractDetails} />
          </Accordion.Content>
        </Accordion>
      </Container>
    );
  }
}

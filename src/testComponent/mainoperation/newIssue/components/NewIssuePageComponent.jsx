import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Accordion, Icon } from 'semantic-ui-react';
// import { fetchContractById, fetchTasks } from '../actions';
import { PersonalInfoPanelDisplay } from './PersonalInfoPanel';
import { FinancialInfoPanelDisplay } from './FinancialInfoPanel';
import { PurchasesPanelDisplay } from './PurchasesPanel';
import { TaskPanelContainer } from './TaskPanel';
import { OutCallDetailsPanelContainer } from './OutCallDetailsPanel';
import OutCallPanelDisplay from './OutCallPanel/OutCallPanelDisplay';


export default class NewIssuePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetailedInfo: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    const { id: contractId } = this.props.match.params;
    if (contractId) {
      this.props.fetchContractById(contractId);
      this.props.fetchTasks(contractId);
      this.props.getTaskDirectories();
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

  handleAccordionClick = () => this.handleClick('showDetailedInfo', !this.state.showDetailedInfo);

  render() {
    const { contractDetails, directories }  = this.props;
    const { id: outCallId } = this.props.match.params;
    return (
      <Container>
        <Accordion fluid styled style={{ marginTop: '20px', marginBottom: '20px' }}>
          <Accordion.Title
            active={this.state.showDetailedInfo}
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
        <OutCallPanelDisplay
          outCallId={outCallId}
          statusOptions={directories.statusOptions}
        />
        <TaskPanelContainer directories={directories} />
        <OutCallDetailsPanelContainer />
      </Container>
    );
  }
}

import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Container, Accordion, Icon } from 'semantic-ui-react';
import { PersonalInfoPanelDisplay } from './PersonalInfoPanel';
import { FinancialInfoPanelDisplay } from './FinancialInfoPanel';
import { PurchasesPanelDisplay } from './PurchasesPanel';
import { TaskPanelContainer } from './TaskPanel';
import { OutCallDetailsPanelContainer } from './OutCallDetailsPanel';
import { OutCallPanelContainer } from './OutCallPanel';
import './styles.css';


class NewIssuePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetailedInfo: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    const { id: contractNumber } = this.props.match.params;
    const { lang } = this.props;
    if (contractNumber) {
      this.props.fetchContractById(contractNumber);
      this.props.fetchTasks(contractNumber);
      this.props.getTaskDirectories(lang);
    }
  }

  handleClick(field, value) {
    this.setState({
      ...this.state,
      [field]: value,
    });
  }

  handleAccordionClick = () => this.handleClick('showDetailedInfo', !this.state.showDetailedInfo);

  render() {
    const { contractDetails, directories, outCallInfo, contractNumber }  = this.props;
    const { messages } = this.props.intl;
    return (
      <Container>
        <Accordion fluid styled style={{ marginTop: '20px', marginBottom: '20px' }}>
          <Accordion.Title
            active={this.state.showDetailedInfo}
            index={0}
            onClick={ this.handleAccordionClick }
          >
            <Icon name="dropdown" />
            {messages.L__CONTRACT_INFO}
          </Accordion.Title>
          <Accordion.Content active={this.state.showDetailedInfo}>
            <PersonalInfoPanelDisplay {...contractDetails} messages={messages} />
            <FinancialInfoPanelDisplay {...contractDetails} messages={messages} />
            <PurchasesPanelDisplay {...contractDetails} messages={messages} />
          </Accordion.Content>
        </Accordion>
        <OutCallPanelContainer
          outCallId={contractNumber}
          outCallInfo={outCallInfo}
          statusOptions={directories.statusOptions}
          messages={messages}
        />
        <TaskPanelContainer
          directories={directories}
          messages={messages}
        />
        <OutCallDetailsPanelContainer messages={messages} />
      </Container>
    );
  }
}

export default injectIntl(NewIssuePage);
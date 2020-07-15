import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Label, Grid, List } from 'semantic-ui-react';
import PortalComponent from '../../../../../../general/portal/PortalComponent';
import { ContactsPanelDisplay } from '../ContactsPanel';
import { constructFullName, formatDMY } from '../../../../../../utils/helpers';

const PersonalInfoPanelDisplay = props => {
  console.log('PIPD', props);
  const {
    contractNumber = '',
    branchName = '',
    clientFullName = {},
    clientIIN = '',
    dealerFullName = {},
    clientStatus = '',
    issueType = '',
    contactDetails,
    contractDate,
    messages,
  } = props;
  return (
    <Segment raised>
      <Label color="red" ribbon>
        {messages.L__CLIENT_INFO}
      </Label>
      <Grid columns={3} divided stackable>
        <Grid.Row>
          <Grid.Column>
            <List>
              <List.Item>
                <List.Header className="list-header">
                  {messages.L__CONTRACT_NUMBER}:
                </List.Header>
                {contractNumber || <span>&mdash;</span>}
              </List.Item>
              <List.Item>
                <List.Header className="list-header">
                  {messages.L__CONTRACT_DATE}:
                </List.Header>
                {(contractDate && formatDMY(contractDate)) || (
                  <span>&mdash;</span>
                )}
              </List.Item>
              <List.Item>
                <List.Header className="list-header">
                  {messages.L__BRANCH}:
                </List.Header>
                {branchName || <span>&mdash;</span>}
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column>
            <List>
              <List.Item>
                <List.Header className="list-header">
                  {messages.L__CLIENT_FULLNAME}:
                </List.Header>
                {clientFullName && constructFullName(clientFullName)}
              </List.Item>
              <List.Item>
                <List.Header className="list-header">
                  {messages.L__CLIENT_IIN}:
                </List.Header>
                {clientIIN}
              </List.Item>
              <List.Item>
                <List.Header className="list-header">
                  {messages.L__DEALER}:
                </List.Header>
                {dealerFullName && constructFullName(dealerFullName)}
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column>
            <List>
              <List.Item>
                <List.Header className="list-header">
                  {messages.L__CLIENT_STATUS}:
                </List.Header>
                {clientStatus}
              </List.Item>
              <List.Item>
                <List.Header className="list-header">
                  {messages.L__ISSUED_TO}:
                </List.Header>
                {issueType || <span>&mdash;</span>}
              </List.Item>
              <PortalComponent
                openLabel={messages.BTN__CONTACT_INFO}
                closeLabel={messages.BTN__HIDE_CONTACT_INFO}
                title={messages.BTN__CONTACT_INFO}
              >
                <ContactsPanelDisplay
                  contactDetails={contactDetails}
                  messages={messages}
                />
              </PortalComponent>
            </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

PersonalInfoPanelDisplay.propTypes = {
  contractNumber: PropTypes.number.isRequired,
  contractDate: PropTypes.string.isRequired,
  branchName: PropTypes.string.isRequired,
  clientFullName: PropTypes.object.isRequired,
  clientIIN: PropTypes.string.isRequired,
  dealerFullName: PropTypes.object.isRequired,
  clientStatus: PropTypes.string.isRequired,
  issueType: PropTypes.object.isRequired,
  contactDetails: PropTypes.object.isRequired,
};

export default PersonalInfoPanelDisplay;

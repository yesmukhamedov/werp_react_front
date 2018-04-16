import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Label, Grid, List } from 'semantic-ui-react';
import PortalComponent from '../../../../../../general/portal/PortalComponent';
import { ContactsPanelDisplay } from '../ContactsPanel';
import { extractLFP, formatDMY } from '../../../../../../utils/helpers';

const PersonalInfoPanelDisplay = (props) => {
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
  } = props;
  return (
    <Segment raised>
      <Label color="red" ribbon>
        Данные клиента
      </Label>
      <Grid columns={3} divided stackable>
        <Grid.Row>
          <Grid.Column>
            <List>
              <List.Item>
                <List.Header className="list-header">
                  Номер договора:
                </List.Header>
                {contractNumber || <span>&mdash;</span>}
              </List.Item>
              <List.Item>
                <List.Header className="list-header">
                  Дата договора:
                </List.Header>
                {(contractDate && formatDMY(contractDate)) || <span>&mdash;</span>}
              </List.Item>
              <List.Item>
                <List.Header className="list-header">Филиал:</List.Header>
                {branchName || <span>&mdash;</span>}
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column>
            <List>
              <List.Item>
                <List.Header className="list-header">
                  Ф.И.О. клиента:
                </List.Header>
                {clientFullName &&
                  extractLFP(clientFullName)}
              </List.Item>
              <List.Item>
                <List.Header className="list-header">ИИН клиента:</List.Header>
                {clientIIN}
              </List.Item>
              <List.Item>
                <List.Header className="list-header">Дилер:</List.Header>
                {dealerFullName &&
                  extractLFP(dealerFullName)}
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column>
            <List>
              <List.Item>
                <List.Header className="list-header">
                  Статус клиента:
                </List.Header>
                {clientStatus}
              </List.Item>
              <List.Item>
                <List.Header className="list-header">Оформлен:</List.Header>
                {issueType || <span>&mdash;</span>}
              </List.Item>
              <PortalComponent
                openLabel="Контактные данные"
                closeLabel="Скрыть контактные данные"
                title="Контактные данные"
              >
                <ContactsPanelDisplay contactDetails={contactDetails} />
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

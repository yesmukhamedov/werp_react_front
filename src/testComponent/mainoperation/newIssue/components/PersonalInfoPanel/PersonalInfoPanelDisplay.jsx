import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Label, Form, Grid, Item, List } from 'semantic-ui-react';
import PortalComponent from '../../../../../general/portal/PortalComponent';
import { ContactsPanelDisplay } from '../ContactsPanel';
import './panel.css';

const headerStyle = {
  fontSize: '14px',
};

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
                {contractNumber || '--'}
              </List.Item>
              <List.Item>
                <List.Header className="list-header">
                  Дата договора:
                </List.Header>
                {'--'}
              </List.Item>
              <List.Item>
                <List.Header className="list-header">
                  Филиал:
                </List.Header>
                {branchName || '--'}
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
                  `${clientFullName.lastName || ''} ${clientFullName.firstName || ''} ${clientFullName.patronymic || ''}`}
              </List.Item>
              <List.Item>
                <List.Header className="list-header">
                  ИИН клиента:
                </List.Header>
                {clientIIN}
              </List.Item>
              <List.Item>
                <List.Header className="list-header">
                  Дилер:
                </List.Header>
                { dealerFullName &&
                  `${dealerFullName.lastName ||
                    ''} ${dealerFullName.firstName ||
                    ''} ${dealerFullName.patronymic || ''}`}
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
                <List.Header className="list-header">
                  Оформлен:
                </List.Header>
                {issueType || '--'}
              </List.Item>
              <PortalComponent
                openLabel="Контактные данные"
                closeLabel="Скрыть контактные данные"
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
  branchName: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  customerIIN: PropTypes.string.isRequired,
  dealerName: PropTypes.string.isRequired,
  customerStatus: PropTypes.string.isRequired,
  filedBy: PropTypes.string.isRequired,
};

export default PersonalInfoPanelDisplay;

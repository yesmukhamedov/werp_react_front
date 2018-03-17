import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Label, Form, Grid } from 'semantic-ui-react';
import PortalComponent from '../../../../../general/portal/PortalComponent';
import { ContactsPanelDisplay } from '../ContactsPanel';

const PersonalInfoPanelDisplay = (props) => {
  console.log("PIPD", props);
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
      <Grid columns={4} divided stackable>
        <Grid.Row>
          <Grid.Column>
            <Form>
              <Form.Field
                label="Номер договора"
                control="input"
                value={contractNumber}
              />
              <Form.Field
                label="Филиал"
                control="input"
                value={branchName}
              />
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form>
              <Form.Field
                label="ФИО клиента"
                control="input"
                value={
                  clientFullName &&
                  `${clientFullName.lastName || ''} ${clientFullName.firstName || ''} ${clientFullName.patronymic || ''}`
                }
              />
              <Form.Field
                label="ИИН клиента"
                control="input"
                value={clientIIN}
              />
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form>
              <Form.Field
                label="Дилер"
                control="input"
                value={
                  dealerFullName &&
                  `${dealerFullName.lastName || ''} ${dealerFullName.firstName || ''} ${dealerFullName.patronymic || ''}`
                }
              />
              <Form.Field
                label="Статус клиента"
                control="input"
                value={clientStatus}
              />
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form>
              <Form.Field
                label="Оформлен"
                control="input"
                value={issueType}
              />
              <PortalComponent
                openLabel="Контактные данные"
                closeLabel="Скрыть контактные данные"
              >
                <ContactsPanelDisplay contactDetails={contactDetails} />
              </PortalComponent>
            </Form>
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

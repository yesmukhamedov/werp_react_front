import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Label, Form, Grid } from 'semantic-ui-react';
import PortalComponent from '../../../../../general/portal/PortalComponent';
import { ContactsPanelDisplay } from '../ContactsPanel';

const PersonalInfoPanelDisplay = props => (
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
              defaultValue={props.contractId}
            />
            <Form.Field
              label="Филиал"
              control="input"
              defaultValue={props.branchName}
            />
          </Form>
        </Grid.Column>
        <Grid.Column>
          <Form>
            <Form.Field
              label="ФИО клиента"
              control="input"
              defaultValue={props.fullName}
            />
            <Form.Field
              label="ИИН клиента"
              control="input"
              defaultValue={props.customerIIN}
            />
          </Form>
        </Grid.Column>
        <Grid.Column>
          <Form>
            <Form.Field
              label="Дилер"
              control="input"
              defaultValue={props.dealerName}
            />
            <Form.Field
              label="Статус клиента"
              control="input"
              defaultValue={props.customerStatus}
            />
          </Form>
        </Grid.Column>
        <Grid.Column>
          <Form>
            <Form.Field
              label="Оформлен"
              control="input"
              defaultValue={props.filedBy}
            />
            <PortalComponent
              openLabel="Контактные данные"
              closeLabel="Скрыть контактные данные"
            >
              <ContactsPanelDisplay />
            </PortalComponent>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
);

PersonalInfoPanelDisplay.propTypes = {
  contractId: PropTypes.string.isRequired,
  branchName: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  customerIIN: PropTypes.string.isRequired,
  dealerName: PropTypes.string.isRequired,
  customerStatus: PropTypes.string.isRequired,
  filedBy: PropTypes.string.isRequired,
};

export default PersonalInfoPanelDisplay;

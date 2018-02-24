import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Label, Form, Header } from 'semantic-ui-react';
import PortalComponent from '../../../../../general/portal/PortalComponent';
import { ContactsPanelDisplay } from '../ContactsPanel';

const PersonalInfoPanelDisplay = props => (
  <Segment raised>
    <Label color="red" ribbon>Данные клиента</Label>
    <Form>
      <Form.Group>
        <Form.Field
          label="Номер договора"
          control="input"
          defaultValue={props.contractId}
          width="3"
        />
        <Form.Field
          label="Филиал"
          control="input"
          defaultValue={props.branchName}
          width="3"
        />
        <Form.Field
          label="ФИО клиента"
          control="input"
          defaultValue={props.fullName}
          width="3"
        />
        <Form.Field
          label="ИИН клиента"
          control="input"
          defaultValue={props.customerIIN}
          width="3"
        />
      </Form.Group>
      <Form.Group>
        <Form.Field
          label="Дилер"
          control="input"
          defaultValue={props.dealerName}
          width="3"
        />
        <Form.Field
          label="Статус клиента"
          control="input"
          defaultValue={props.customerStatus}
          width="3"
        />
        <Form.Field
          label="Оформлен"
          control="input"
          defaultValue={props.filedBy}
          width="3"
        />
      </Form.Group>
      <PortalComponent
        openLabel="Контактные данные"
        closeLabel="Скрыть контактные данные"
      >
        <ContactsPanelDisplay />
      </PortalComponent>
    </Form>
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

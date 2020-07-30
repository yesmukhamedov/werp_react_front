import React from 'react';
import { Header, Modal, Icon, Button, Form, Input } from 'semantic-ui-react';

const DemoPriceForm = props => {
  const { model, open } = props;
  return (
    <Modal
      open={open}
      closeOnEscape={false}
      closeOnRootNodeClick={false}
      closeIcon
      size="tiny"
    >
      <Header
        content={
          model.new
            ? 'Добавление прайса для демо'
            : 'Редактирование прайса для демо'
        }
      />
      <Modal.Content>
        <Modal.Description>{renderForm(props)}</Modal.Description>
      </Modal.Content>

      <Modal.Actions>
        <Button
          color="blue"
          onClick={props.handleFormSubmit}
          floated="right"
          type="submit"
          inverted
        >
          <Icon name="checkmark" /> Сохранить
        </Button>
        <Button
          color="red"
          floated="right"
          onClick={props.handleFormClose}
          inverted
        >
          <Icon name="remove" /> Отмена
        </Button>
        <br />
        <br />
      </Modal.Actions>
    </Modal>
  );
};

const renderForm = props => {
  const {
    model,
    // errors,
    companyOptions,
    branchOptions,
  } = props;
  return (
    <Form>
      <Form.Select
        name="bukrs"
        label="Компания"
        options={companyOptions}
        placeholder="Компания"
        onChange={(e, v) => props.handleChange('bukrs', v.value)}
        value={model.bukrs || ''}
      />

      <Form.Select
        name="branchId"
        label="Филиал"
        options={branchOptions}
        placeholder="Филиал"
        onChange={(e, v) => props.handleChange('branchId', v.value)}
        value={model.branchId || 0}
      />

      <Form.Field
        value={model.districtName || ''}
        control={Input}
        label="Название района"
        placeholder="Название района"
        name="districtName"
        onChange={e => props.handleChange('districtName', e.target.value)}
      />

      <Form.Field
        type="number"
        value={model.price || ''}
        control={Input}
        label="Сумма"
        placeholder="Сумма"
        name="price"
        onChange={e => props.handleChange('price', e.target.value)}
      />
    </Form>
  );
};

export default DemoPriceForm;

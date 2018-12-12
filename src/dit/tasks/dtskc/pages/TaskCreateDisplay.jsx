import React from 'react';
import { Container, Form, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import {
  DropdownFormField,
  TextAreaFormField,
  TextInputFormField,
} from '../../../utils/formFields';

const TaskCreateDisplay = props => {
  console.log(props);
  return (
    <Container
      style={{
        marginTop: '2em',
        marginBottom: '2em',
        paddingLeft: '2em',
        paddingRight: '2em',
      }}
    >
      <Form>
        <Field name="title" component={TextInputFormField} label="Тема" />
        <Field
          name="description"
          component={TextAreaFormField}
          label="Описание задачи"
        />
        <Form.Group widths="equal">
          <Field
            name="status"
            component={DropdownFormField}
            label="Статус"
            // opts={}
          />
          <Field
            name="priority"
            component={DropdownFormField}
            label="Приоритет"
            // opts={}
          />

          <Field
            name="branch"
            component={DropdownFormField}
            label="Филиал"
            // opts={}
          />
          <Field
            name="department"
            component={DropdownFormField}
            label="Департамент"
            // opts={}
          />
          <Field
            name="position"
            component={DropdownFormField}
            label="Должность"
            // opts={}
          />
        </Form.Group>
        <Button color="youtube">Отменить</Button>
        <Button
          positive
          icon="checkmark"
          labelPosition="right"
          content="Создать"
          type="submit"
        />
      </Form>
    </Container>
  );
};

const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Объязательное поле для заполнения';
  }
  if (!values.description) {
    errors.description = 'Объязательное поле для заполнения';
  }
  if (!values.status) {
    errors.status = 'Объязательное поле для заполнения';
  }
  if (!values.priority) {
    errors.priority = 'Объязательное поле для заполнения';
  }
  if (!values.branch) {
    errors.branch = 'Объязательное поле для заполнения';
  }
  if (!values.department) {
    errors.department = 'Объязательное поле для заполнения';
  }
  if (!values.position) {
    errors.position = 'Объязательное поле для заполнения';
  }
  return errors;
};

export default reduxForm({
  form: 'outCallsNewTaskForm',
  validate,
})(TaskCreateDisplay);

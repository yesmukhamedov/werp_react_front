import React, { Component } from 'react';
import { Container, Form, Button, Header, Segment } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import {
  DropdownFormField,
  TextAreaFormField,
  TextInputFormField,
} from '../../../utils/formFields';
import AttachmentPanelDisplay from './AttachmentsPanelDisplay';
import browserHistory from '../../../utils/history';
import './style.css';
import { ROOT_URL } from '../../../utils/constants';

class DtskcComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillMount() {
    const {
      fetchReferences,
      lang
    } = this.props;
    fetchReferences(lang);
  }

  componentWillUnmount() {

  }

  handleFormSubmit(formValues) {
    const { createTask } = this.props;
    createTask(formValues, (data) => {
      const { id: taskId } = data;
      browserHistory.push(`/general/gtskedit/${taskId}`);
    });
  }

  render() {
    const {
      branchOpts,
      companyOpts,
      deptOpts,
      statusOpts,
      assigneeOpts,
      taskTypeOpts,
      managerOpts,
      selectedCompany,
      selectedBranch,
      selectedDepartment,
      fetchUsers,
      handleSubmit,
    } = this.props;
    return (
      <Container
        style={{
          marginTop: '2em',
          marginBottom: '2em',
          paddingLeft: '2em',
          paddingRight: '2em',
        }}
      >
        <Header as="h2">Новая задача</Header>
        <Segment raised>
          <Form onSubmit={handleSubmit(this.handleFormSubmit)}>
            <Form.Group widths="2">
              <Field
                name="taskType"
                component={DropdownFormField}
                label="Тип"
                opts={taskTypeOpts}
              />
            </Form.Group>

            <Field name="title" component={TextInputFormField} label="Тема" />
            <Field
              name="description"
              component={TextAreaFormField}
              label="Описание задачи"
              rows="10"
            />

            <Form.Group widths="equal">
              <Field
                name="company"
                component={DropdownFormField}
                label="Компания"
                opts={companyOpts}
              />
              <Field
                name="initiator"
                component={DropdownFormField}
                label="Заказчик"
                // opts={}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Field
                name="branch"
                component={DropdownFormField}
                label="Филиал"
                disabled={!selectedCompany}
                opts={selectedCompany && branchOpts[selectedCompany]}
              />
              <Field
                name="initiatorManager"
                component={DropdownFormField}
                label="Начальник отдела заказчика"
                opts={managerOpts}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Field
                name="department"
                component={DropdownFormField}
                label="Департамент"
                opts={deptOpts}
                onChange={() => fetchUsers({
                  branchId: selectedBranch,
                  burks: selectedCompany,
                  // departmentId: selectedDepartment,
                })}
              />
              <Field
                name="assignee"
                component={DropdownFormField}
                label="Исполнитель"
                opts={assigneeOpts}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Field
                name="status"
                component={DropdownFormField}
                label="Статус"
                opts={statusOpts}
              />
              <Field
                name="assigneeManager"
                component={DropdownFormField}
                label="Начальник отдела исполнителя"
                opts={managerOpts}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Field
                name="createdAt"
                component={TextInputFormField}
                label="Дата создания"
              />
              <Field
                name="closedAt"
                component={TextInputFormField}
                label="Дата закрытия"
              />
            </Form.Group>
            <AttachmentPanelDisplay />
            <Button color="youtube">Очистить</Button>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="Создать"
              type="submit"
            />
          </Form>
        </Segment>
      </Container>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Объязательное поле для заполнения';
  }
  if (!values.description) {
    errors.description = 'Объязательное поле для заполнения';
  }
  if (!values.company) {
    errors.company = 'Объязательное поле для заполнения';
  }
  if (!values.taskType) {
    errors.taskType = 'Объязательное поле для заполнения';
  }
  if (!values.branch) {
    errors.branch = 'Объязательное поле для заполнения';
  }
  if (!values.department) {
    errors.department = 'Объязательное поле для заполнения';
  }
  return errors;
};

export default reduxForm({
  form: 'DtskcForm',
  validate,
})(DtskcComponent);

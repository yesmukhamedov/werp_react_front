import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Container, Form, Button, Header, Segment } from 'semantic-ui-react';
import UploadPanelDisplay from './UploadPanelDisplay';
import AttachmentPanelDisplay from './AttachmentPanelDisplay';
import AssigneePanelDisplay from './AssigneePanelDisplay';
import AssigneeModalContainer from './AssigneeModal/AssigneeModalContainer';
import {
  DropdownFormField,
  TextAreaFormField,
  TextInputFormField,
  DatePickerFormField,
} from '../../../utils/formFields';
import browserHistory from '../../../utils/history';
import { DELETE } from '../../../utils/helpers';
import './style.css';

class DtskcComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadList: [],
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleUploadDelete = this.handleUploadDelete.bind(this);
  }

  componentWillMount() {
    const { fetchReferences, lang } = this.props;
    fetchReferences(lang);
  }

  componentWillUnmount() {}

  handleUpload(upload) {
    this.setState({ uploadList: [...this.state.uploadList, upload] });
  }

  handleUploadDelete(url) {
    const req = DELETE(url);
    req
      .then(() => {
        const newUploadList = this.state.uploadList.filter(
          el => el.fileDownloadUri !== url,
        );
        this.setState({ uploadList: newUploadList });
      })
      .catch(error => console.log('handleUploadDelete', error));
  }

  handleFormSubmit(formValues) {
    const { createTask } = this.props;
    const { uploadList } = this.state;
    createTask({ ...formValues, uploadList }, data => {
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
      assigneeModal,
      toggleAssigneeModal,
      reset,
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
        <Segment attached="top">
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
              rows="8"
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
                component={TextInputFormField}
                label="Заказчик"
                value="Nobody"
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
                name="initiatorManager"
                component={DropdownFormField}
                label="Начальник отдела заказчика"
                opts={managerOpts}
              />
            </Form.Group>
            <Form.Group widths="equal">
              {/* <Field
                name="department"
                component={DropdownFormField}
                label="Департамент"
                opts={deptOpts}
                onChange={() =>
                  fetchUsers({
                    branchId: selectedBranch,
                    burks: selectedCompany,
                    // departmentId: selectedDepartment,
                  })
                }
              /> */}
              {/* <Field
                name="assignee"
                component={DropdownFormField}
                label="Исполнитель"
                opts={assigneeOpts}
              /> */}
              {/* <Field
                name="branch"
                component={DropdownFormField}
                label="Филиал"
                disabled={!selectedCompany}
                opts={selectedCompany && branchOpts[selectedCompany]}
              /> */}
              {/* <Field
                name="assigneeManager"
                component={DropdownFormField}
                label="Начальник отдела исполнителя"
                opts={managerOpts}
              /> */}
            </Form.Group>

            <Form.Group widths="3">
              <Field
                name="createdAt"
                component={DatePickerFormField}
                label="Дата создания"
                dateFormat="DD.MM.YYYY"
                autoComplete="off"
                disabled
              />
              <Field
                name="estimatedAt"
                component={DatePickerFormField}
                label="Предполагаемая дата закрытия"
                dateFormat="DD.MM.YYYY"
                autoComplete="off"
              />
            </Form.Group>
            <AssigneePanelDisplay
              modalState={assigneeModal}
              toggleModal={toggleAssigneeModal}
            />
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="Создать"
              type="submit"
              floated="right"
            />
            <Button
              color="youtube"
              floated="right"
              content="Отменить"
              onClick={() => {
                this.state.uploadList.forEach(el => this.handleUploadDelete(el.fileDownloadUri));
                browserHistory.push('/');
              }}
            />
            <br />
            <br />
          </Form>
        </Segment>
        <Segment attached="bottom">
          <AttachmentPanelDisplay
            attachment={this.state.uploadList}
            onDelete={this.handleUploadDelete}
          >
            <UploadPanelDisplay onUploadSuccess={this.handleUpload} />
          </AttachmentPanelDisplay>
        </Segment>
        <AssigneeModalContainer />
      </Container>
    );
  }
}

const validate = values => {
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
  if (!values.initiatorManager) {
    errors.initiatorManager = 'Объязательное поле для заполнения';
  }
  if (!values.assigneeManager) {
    errors.assigneeManager = 'Объязательное поле для заполнения';
  }
  if (!values.status) {
    errors.status = 'Объязательное поле для заполнения';
  }
  return errors;
};

export default reduxForm({
  form: 'DtskcForm',
  validate,
})(DtskcComponent);

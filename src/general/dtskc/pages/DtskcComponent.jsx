import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';
import { Container, Form, Button, Header, Segment } from 'semantic-ui-react';
import _ from 'lodash';
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
    const {
      createTask,
      assigneeGroups,
      assignees,
      clearTransaction,
      reset,
    } = this.props;
    const allRecipients = _.concat(
      _.flatMap(_.map(assigneeGroups, 'recipientList')),
      _.map(assignees, 'recipient'),
    );
    const { uploadList } = this.state;
    createTask({ ...formValues, uploadList, allRecipients }, data => {
      reset();
      browserHistory.push(`/general/dtskc`);
    });
  }

  render() {
    const {
      companyOpts,
      statusOpts,
      taskTypeOpts,
      managerOpts,
      handleSubmit,
      assigneeModal,
      toggleAssigneeModal,
      assigneeGroups,
      assignees,
      removeAssigneeGroup,
      removeAssigneePerson,
      userId,
      intl,
    } = this.props;
    const { messages } = intl;
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
              {/* <Field
                name="initiator"
                component={TextInputFormField}
                label="Заказчик"
                disabled
              /> */}
              <Form.Field>
                <label>Заказчик</label>
                <input value={userId} disabled />
              </Form.Field>
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
            <Form.Group widths="2">
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
                this.state.uploadList.forEach(el =>
                  this.handleUploadDelete(el.fileDownloadUri),
                );
                browserHistory.push('/');
              }}
            />
            <br />
            <br />
          </Form>
        </Segment>
        <AssigneePanelDisplay
          modalState={assigneeModal}
          toggleModal={toggleAssigneeModal}
          groups={Object.values(assigneeGroups)}
          persons={Object.values(assignees)}
          removeGroup={removeAssigneeGroup}
          removePerson={removeAssigneePerson}
        />
        <Segment attached="bottom">
          <AttachmentPanelDisplay
            attachment={this.state.uploadList}
            onDelete={this.handleUploadDelete}
          >
            <UploadPanelDisplay
              onUploadSuccess={this.handleUpload}
              messages={messages}
            />
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
})(injectIntl(DtskcComponent));

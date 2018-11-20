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
} from '../../../../utils/formFields';
import browserHistory from '../../../../utils/history';
import { DELETE } from '../../../../utils/helpers';
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
      browserHistory.push({
        pathname: '/general/summary',
        state: { createdTasks: data },
      });
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
      lang,
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
        <Header as="h2">{messages.H__NEW_TASK}</Header>
        <Segment attached="top">
          <Form onSubmit={handleSubmit(this.handleFormSubmit)}>
            <Form.Group widths="2">
              <Field
                name="taskType"
                component={DropdownFormField}
                label={messages.L__TYPE}
                opts={taskTypeOpts}
              />
            </Form.Group>

            <Field name="title" component={TextInputFormField} label={messages.L__TITLE} />
            <Field
              name="description"
              component={TextAreaFormField}
              label={messages.L__TASK_DESCRIPTION}
              rows="8"
            />

            <Form.Group widths="equal">
              <Field
                name="company"
                component={DropdownFormField}
                label={messages.L__COMPANY}
                opts={companyOpts}
              />
              <Form.Field>
                <label>{messages.L__ASSIGNER}</label>
                <input value={userId} disabled />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Field
                name="status"
                component={DropdownFormField}
                label={messages.L__STATUS}
                opts={statusOpts}
              />
              <Field
                name="initiatorManager"
                component={DropdownFormField}
                label={messages.L__ASSIGNER_MANAGER}
                opts={managerOpts}
              />
            </Form.Group>
            <Form.Group widths="2">
              <Field
                name="createdAt"
                component={DatePickerFormField}
                label={messages.L__CREATE_DATE}
                dateFormat="DD.MM.YYYY"
                autoComplete="off"
                disabled
              />
              <Field
                name="estimatedAt"
                component={DatePickerFormField}
                label={messages.L__ESTIMATED_ENDDATE}
                dateFormat="DD.MM.YYYY"
                autoComplete="off"
              />
            </Form.Group>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content={messages.BTN__CREATE}
              type="submit"
              floated="right"
            />
            <Button
              color="youtube"
              floated="right"
              content={messages.BTN__CANCEL}
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
          lang={lang}
          messages={messages}
        />
        <Segment attached="bottom">
          <AttachmentPanelDisplay
            attachment={this.state.uploadList}
            onDelete={this.handleUploadDelete}
            messages={messages}
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

import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';
import { Container, Form, Button, Header, Segment } from 'semantic-ui-react';
import _ from 'lodash';
import moment from 'moment';
import UploadPanelDisplay from './UploadPanelDisplay';
import AttachmentPanelDisplay from './AttachmentPanelDisplay';
import AssigneePanelDisplay from './AssigneePanelDisplay';
import AssigneeModalContainer from './AssigneeModal/AssigneeModalContainer';
import WarnMessage from './AssigneeModal/WarnMessage';
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
      errors: {},
      isLoading: false,
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
    const { createTask, assigneeGroups, assignees } = this.props;
    const allRecipients = _.concat(
      _.flatMap(_.map(assigneeGroups, 'recipientList')),
      _.map(assignees, 'recipient'),
    );

    if (allRecipients.length > 0) {
      const { uploadList } = this.state;
      this.setState({ isLoading: true });

      const newTask = {
        title: formValues.title,
        description: formValues.description,
        status: {
          id: formValues.status,
        },
        priority: {
          // TODO: get rid of hardcoded value
          id: 2,
        },
        bukrs: formValues.company,
        recipient: [...allRecipients],
        type: {
          code: formValues.taskType,
        },
        authorsManager: {
          id: formValues.initiatorManager.id,
        },
        estimatedAt: moment.utc(formValues.estimatedAt, 'DD.MM.YYYY').format(),
        attachment:
          uploadList.length > 0
            ? {
                attachmentJson: JSON.stringify(uploadList),
              }
            : null,
      };

      createTask(newTask)
        .then(data => {
          browserHistory.push({
            pathname: '/general/summary',
            state: { createdTasks: data },
          });
        })
        .catch(() =>
          this.setState({ ...this.state, error: {}, isLoading: false }),
        );
    } else {
      this.setState({
        ...this.state,
        errors: {
          assigneeTable: 'Cannot create task without any assignee',
        },
      });
    }
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
    const { isLoading } = this.state;
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
          <Form
            onSubmit={handleSubmit(this.handleFormSubmit)}
            loading={isLoading}
          >
            <Form.Group widths="2">
              <Field
                name="taskType"
                component={DropdownFormField}
                label={messages.L__TYPE}
                opts={taskTypeOpts}
              />
            </Form.Group>

            <Field
              name="title"
              component={TextInputFormField}
              label={messages.L__TITLE}
            />
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
        >
          {this.state.errors.assigneeTable && (
            <WarnMessage content={messages.TX__ERROR_NO_ASSIGNEE} />
          )}
        </AssigneePanelDisplay>
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
        <AssigneeModalContainer messages={messages} />
      </Container>
    );
  }
}

function validate(values, state) {
  const { messages } = state.intl;
  const errors = {};
  if (!values.title) {
    errors.title = messages.TX__REQUIRED_FIELD;
  }
  if (!values.description) {
    errors.description = messages.TX__REQUIRED_FIELD;
  }
  if (!values.company) {
    errors.company = messages.TX__REQUIRED_FIELD;
  }
  if (!values.taskType) {
    errors.taskType = messages.TX__REQUIRED_FIELD;
  }
  if (!values.branch) {
    errors.branch = messages.TX__REQUIRED_FIELD;
  }
  if (!values.department) {
    errors.department = messages.TX__REQUIRED_FIELD;
  }
  if (!values.initiatorManager) {
    errors.initiatorManager = messages.TX__REQUIRED_FIELD;
  }
  if (!values.assigneeManager) {
    errors.assigneeManager = messages.TX__REQUIRED_FIELD;
  }
  if (!values.status) {
    errors.status = messages.TX__REQUIRED_FIELD;
  }
  return errors;
}

export default injectIntl(
  reduxForm({
    form: 'DtskcForm',
    validate,
  })(DtskcComponent),
);

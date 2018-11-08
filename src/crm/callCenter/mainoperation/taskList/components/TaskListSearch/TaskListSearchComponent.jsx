/* eslint linebreak-style: ["error", "windows"] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import { Form, Grid, Segment, Dimmer, Loader, Label } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';
import { DropdownFormField } from '../../../../../../utils/formFields';

class TaskListSearchComponent extends Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(values) {
    const paramsDict = {
      bukrs: values.company,
      branchId: values.branch !== -1 ? values.branch : undefined,
      statusId: values.status !== -1 ? values.status : undefined,
      priorityId: values.priority !== -1 ? values.priority : undefined,
      departmentId: 1, // "Отдел маркетинга"
    };

    const params = _.map(
      paramsDict,
      (val, key) =>
        (val ? `${key}=${val}` : val === false ? `${key}=${val}` : ''),
    )
      .filter(param => param)
      .join('&');

    return new Promise(resolve => this.props.searchTasks(params, resolve));
  }

  render() {
    const { formatMessage } = this.props.intl;
    const {
      handleSubmit, pristine, submitting, reset, directories, companyOptions, branchOptions, company, messages
    } = this.props;
    const allOpt = { key: -1, text: formatMessage(messages.allOption), value: -1 };
    if (directories) {
      return (
        <Form onSubmit={handleSubmit(this.handleSearch)}>
          <Segment padded size="small">
            <Label
              as="a"
              attached="top"
              content={formatMessage(messages.taskList)}
              icon="checkmark box"
              style={{
                background: 'rgba(227,232,238, 1)',
              }}
            />
            <Grid stackable>
              <Grid.Column width={3}>
                <Field
                  required
                  name="company"
                  component={DropdownFormField}
                  label={formatMessage(messages.company)}
                  opts={companyOptions}
                />
              </Grid.Column>
              <Grid.Column width={3}>
                <Field
                  name="branch"
                  component={DropdownFormField}
                  label={formatMessage(messages.branch)}
                  opts={company ? [allOpt, ...branchOptions[company]] : []}
                />
              </Grid.Column>
              <Grid.Column width={3}>
                <Field
                  name="status"
                  component={DropdownFormField}
                  label={formatMessage(messages.status)}
                  opts={[allOpt, ...Object.values(directories.statusOptions)]}
                />
              </Grid.Column>
              <Grid.Column width={3}>
                <Field
                  name="priority"
                  component={DropdownFormField}
                  label={formatMessage(messages.priority)}
                  opts={[allOpt, ...Object.values(directories.priorityOptions)]}
                />
              </Grid.Column>
              <Grid.Column width={2}>
                <Form.Group widths="equal">
                  <Form.Button
                    content={formatMessage(messages.search)}
                    type="submit"
                    loading={submitting}
                    disabled={pristine || submitting}
                    style={
                      { marginTop: '1.6em', background: 'rgba(84,170,169, 1)', color: 'white' }}
                  />
                  <Form.Button
                    content={formatMessage(messages.reset)}
                    type="button"
                    disabled={pristine || submitting}
                    style={
                      { marginTop: '1.6em', background: 'rgba(84,170,169, 1)', color: 'white' }}
                    onClick={reset}
                  />
                </Form.Group>
              </Grid.Column>
            </Grid>
          </Segment>
        </Form>
      );
    }
    return (
      <Dimmer active>
        <Loader indeterminate>Fetching directories...</Loader>
      </Dimmer>
    );
  }
}

TaskListSearchComponent.propTypes = {
  searchTasks: PropTypes.func.isRequired,
  directories: PropTypes.object,
};

function validate(formProps, state) {
  const { formatMessage } = state.intl;
  const error = {};

  if (!formProps.company) {
    error.company = formatMessage({ id: 'Form.CompanyError' });
  }

  return error;
}

TaskListSearchComponent = reduxForm({
  form: 'taskListSearchComponent',
  validate,
})(TaskListSearchComponent);

export default TaskListSearchComponent;

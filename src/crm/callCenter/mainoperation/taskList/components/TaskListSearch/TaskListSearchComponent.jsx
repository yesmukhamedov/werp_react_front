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
    const {
      handleSubmit, pristine, submitting, reset, directories, companyOptions, branchOptions, company
    } = this.props;
    const allOpt = { key: -1, text: 'Все', value: -1 };
    if (directories) {
      return (
        <Form onSubmit={handleSubmit(this.handleSearch)}>
          <Segment padded size="small">
            <Label
              as="a"
              attached="top"
              content="Задачи"
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
                  label="Компания"
                  opts={companyOptions}
                />
              </Grid.Column>
              <Grid.Column width={3}>
                <Field
                  name="branch"
                  component={DropdownFormField}
                  label="Филиал"
                  opts={company ? [allOpt, ...branchOptions[company]] : []}
                />
              </Grid.Column>
              <Grid.Column width={3}>
                <Field
                  name="status"
                  component={DropdownFormField}
                  label="Статус"
                  opts={[allOpt, ...Object.values(directories.statusOptions)]}
                />
              </Grid.Column>
              <Grid.Column width={3}>
                <Field
                  name="priority"
                  component={DropdownFormField}
                  label="Приоритет"
                  opts={[allOpt, ...Object.values(directories.priorityOptions)]}
                />
              </Grid.Column>
              <Grid.Column width={2}>
                <Form.Group widths="equal">
                  <Form.Button
                    content="Поиск"
                    type="submit"
                    loading={submitting}
                    disabled={pristine || submitting}
                    style={
                      { marginTop: '1.6em', background: 'rgba(84,170,169, 1)', color: 'white' }}
                  />
                  <Form.Button
                    content="Сброс"
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

function validate(formProps) {
  const error = {};

  if (!formProps.company) {
    error.company = 'Выберите компанию';
  }

  return error;
}

TaskListSearchComponent = reduxForm({
  form: 'taskListSearchComponent',
  validate,
})(TaskListSearchComponent);

export default TaskListSearchComponent;

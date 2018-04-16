/* eslint linebreak-style: ["error", "windows"] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import { Form, Dropdown, Grid, Segment, Dimmer, Loader, Label } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';
import { DropdownFormField } from '../../../../../../utils/formFields';

class TaskListSearchComponent extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   selectedStatus: undefined,
    //   selectedPriority: undefined,
    //   selectedCompany: undefined,
    //   selectedBranch: undefined,
    // };

    // this.handleInputChange = this.handleInputChange.bind(this);
    // this.handleResetChange = this.handleResetChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  // handleInputChange(value, dataType) {
  //   // console.log(dataType, value)
  //   this.setState({
  //     ...this.state,
  //     [dataType]: value,
  //   });
  // }

  // handleResetChange() {
  //   this.setState({
  //     selectedStatus: undefined,
  //     selectedPriority: undefined,
  //     selectedCompany: undefined,
  //     selectedBranch: undefined,
  //   });
  // }

  handleSearch(values) {
    const paramsDict = {
      bukrs: values.company,
      branchId: values.branch,
      statusId: values.status,
      priorityId: values.priority,
      departmentId: 1, // "Отдел маркетинга"
    };
    // console.log(paramsDict);
    const params = _.map(
      paramsDict,
      (val, key) =>
        (val ? `${key}=${val}` : val === false ? `${key}=${val}` : ''),
    )
      .filter(param => param)
      .join('&');

    // console.log('PARAMS', params);
    // this.props.searchTasks(params);
    return new Promise(resolve => this.props.searchTasks(params, resolve));
  }

  render() {
    const {
      handleSubmit, pristine, submitting, reset, directories, companyOptions, branchOptions
    } = this.props;
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
                  // required
                  name="branch"
                  component={DropdownFormField}
                  label="Филиал"
                  opts={this.props.company ? branchOptions[this.props.company] : []}
                />
              </Grid.Column>
              <Grid.Column width={3}>
                <Field
                  name="status"
                  component={DropdownFormField}
                  label="Статус"
                  opts={Object.values(directories.statusOptions)}
                />
              </Grid.Column>
              <Grid.Column width={3}>
                <Field
                  name="priority"
                  component={DropdownFormField}
                  label="Приоритет"
                  opts={Object.values(directories.priorityOptions)}
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

  // if (!formProps.branch) {
  //   error.branch = 'Выберите филиал';
  // }

  return error;
}

TaskListSearchComponent = reduxForm({
  form: 'taskListSearchComponent',
  validate,
})(TaskListSearchComponent);

export default TaskListSearchComponent;

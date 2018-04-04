/* eslint linebreak-style: ["error", "windows"] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import { Form, Dropdown, Grid, Segment, Dimmer, Loader, Label } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';
import { DropdownFormField } from '../../../../../utils/formFields';

class TaskListSearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStatus: undefined,
      selectedPriority: undefined,
      selectedCompany: undefined,
      selectedBranch: undefined,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleResetChange = this.handleResetChange.bind(this);
  }

  handleInputChange(value, dataType) {
    // console.log(dataType, value)
    this.setState({
      ...this.state,
      [dataType]: value,
    });
  }

  handleResetChange() {
    this.setState({
      selectedStatus: undefined,
      selectedPriority: undefined,
      selectedCompany: undefined,
      selectedBranch: undefined,
    });
  }

  handleSearch() {
    const paramsDict = {
      bukrs: this.state.selectedCompany,
      branchId: this.state.selectedBranch,
      statusId: this.state.selectedStatus,
      priorityId: this.state.selectedPriority,
      departmentId: 1, // "Отдел маркетинга"
    };
    //console.log(paramsDict);
    const params = _.map(
      paramsDict,
      (val, key) =>
        (val ? `${key}=${val}` : val === false ? `${key}=${val}` : ''),
    )
      .filter(param => param)
      .join('&');

    //console.log('PARAMS', params);
    this.props.searchTasks(params);
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
                {/* <Form.Field>
                  <label>Компания</label>
                  <Dropdown
                    placeholder="компания"
                    fluid
                    selection
                    options={this.props.companyOptions}
                    value={this.state.selectedCompany}
                    onChange={(e, { value }) =>
                      this.handleInputChange(value, 'selectedCompany')
                    }
                  />
                </Form.Field> */}
                <Field
                  required
                  name="company"
                  component={DropdownFormField}
                  label="Компания"
                  opts={companyOptions}
                />
              </Grid.Column>
              <Grid.Column width={3}>
                {/* <Form.Field>
                  <label>Филиал</label>
                  <Dropdown
                    placeholder="филиал"
                    fluid
                    selection
                    options={this.state.selectedCompany ? this.props.branchOptions[this.state.selectedCompany] : []}
                    value={this.state.selectedBranch}
                    onChange={(e, { value }) =>
                      this.handleInputChange(value, 'selectedBranch')
                    }
                  />
                </Form.Field> */}
                <Field
                  required
                  name="branch"
                  component={DropdownFormField}
                  label="Филиал"
                  opts={this.props.company ? branchOptions[this.props.company] : []}
                />
              </Grid.Column>
              <Grid.Column width={3}>
                <Form.Field>
                  <label>Статус</label>
                  <Dropdown
                    placeholder="Статус"
                    fluid
                    selection
                    options={Object.values(directories.statusOptions)}
                    value={this.state.selectedStatus}
                    onChange={(e, { value }) =>
                      this.handleInputChange(value, 'selectedStatus')
                    }
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={3}>
                <Form.Field>
                  <label>Приоритет</label>
                  <Dropdown
                    placeholder="Приоритет"
                    fluid
                    selection
                    options={Object.values(directories.priorityOptions)}
                    value={this.state.selectedPriority}
                    onChange={(e, { value }) =>
                      this.handleInputChange(value, 'selectedPriority')
                    }
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={2}>
                <Form.Group widths="equal">
                  <Form.Button
                    content="Поиск"
                    type="submit"
                    style={
                      { marginTop: '1.6em', background: 'rgba(84,170,169, 1)', color: 'white' }}
                  />
                  <Form.Button
                    content="Сброс"
                    type="button"
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

TaskListSearchComponent = reduxForm({
  form: 'taskListSearchComponent',
  // validate,
})(TaskListSearchComponent);

export default TaskListSearchComponent;

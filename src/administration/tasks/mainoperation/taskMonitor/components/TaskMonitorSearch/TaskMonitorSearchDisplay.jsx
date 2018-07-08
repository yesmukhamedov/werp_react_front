import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import _ from 'lodash';
import { Form, Grid, Segment, Dimmer, Loader, Label } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';
import { DropdownFormField, DatePickerFormField } from '../../../../../../utils/formFields';

class TaskMonitorSearchDisplay extends Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(values) {
    // console.log("values: ", values);
    const endDateFromUtc = values.endDateFrom ? moment.utc(values.endDateFrom).format() : undefined;
    const endDateToUtc = values.endDateTo ? moment.utc(values.endDateTo).format() : undefined;
    const startDateFromUtc = values.startDateFrom ? moment.utc(values.startDateFrom).format() : undefined;
    const startDateToUtc = values.startDateTo ? moment.utc(values.startDateTo).format() : undefined;

    const paramsDict = {
      bukrs: values.company,
      branchIds: values.branch[0] !== -1 ? values.branch : undefined,
      departmentIds: values.department[0] !== -1 ? values.department : undefined,
      types: values.type[0] !== -1 ? values.type : undefined,
      endDateFrom: endDateFromUtc,
      endDateTo: endDateToUtc,
      startDateFrom: startDateFromUtc,
      startDateTo: startDateToUtc,
    };

    const params = _.map(
      paramsDict,
      (val, key) =>
        (val ? `${key}=${val}` : val === false ? `${key}=${val}` : ''),
    )
      .filter(param => param)
      .join('&');

    // console.log("params:", params)
    return new Promise(resolve => this.props.searchTasks(params, resolve));
  }

  render() {
    const {
      handleSubmit, pristine, submitting, reset, company, directories, branchOptions, companyOptions
    } = this.props;
    const allOpt = { key: -1, text: 'Все', value: -1 };
    if (directories) {
      return (
        <Form onSubmit={handleSubmit(this.handleSearch)}>
          <Segment padded size="small">
            <Label
              as="a"
              attached="top"
              content="Мониторинг задач"
              icon="checkmark box"
              style={{
                background: 'rgba(227,232,238, 1)',
              }}
            />
            <Grid stackable divided>
              <Grid.Row columns={2} style={{ padding: '3px' }}>
                <Grid.Column>
                  <Form.Group widths="equal">
                    <Field
                      required
                      name="company"
                      component={DropdownFormField}
                      label="Компания"
                      opts={companyOptions}
                    />
                    <Field
                      required
                      multiple
                      name="branch"
                      component={DropdownFormField}
                      label="Филиал"
                      opts={company ? [allOpt, ...branchOptions[company]] : []}
                    />
                  </Form.Group>
                </Grid.Column>
                <Grid.Column>
                  <Form.Group>
                    <Field
                      required
                      name="endDateFrom"
                      label="Дата завершения с"
                      component={DatePickerFormField}
                    />
                    <Field
                      required
                      name="endDateTo"
                      label="Дата завершения по"
                      component={DatePickerFormField}
                    />
                  </Form.Group>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2} style={{ padding: '3px' }}>
                <Grid.Column>
                  <Form.Group widths="equal">
                    <Field
                      required
                      multiple
                      name="department"
                      component={DropdownFormField}
                      label="Отдел"
                      opts={[allOpt, ...Object.values(directories.deptOptions)]}
                    />
                    <Field
                      required
                      multiple
                      name="type"
                      component={DropdownFormField}
                      label="Тип"
                      opts={[allOpt, ...Object.values(directories.typeOptions)]}
                    />
                  </Form.Group>
                </Grid.Column>
                <Grid.Column >
                  <Form.Group>
                    <Field
                      name="startDateFrom"
                      label="Дата создания c"
                      component={DatePickerFormField}
                    />
                    <Field
                      name="startDateTo"
                      label="Дата создания по"
                      component={DatePickerFormField}
                    />
                  </Form.Group>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ padding: '3px' }}>
                <Grid.Column width={2} >
                  <Form.Group widths="equal">
                    <Form.Button
                      content="Поиск"
                      type="submit"
                      loading={submitting}
                      disabled={pristine || submitting}
                      style={
                        { background: 'rgba(84,170,169, 1)', color: 'white' }}
                    />
                    <Form.Button
                      content="Сброс"
                      type="button"
                      disabled={pristine || submitting}
                      style={
                        { background: 'rgba(84,170,169, 1)', color: 'white' }}
                      onClick={reset}
                    />
                  </Form.Group>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Form>
      );
    }
    return (
      <Dimmer active>
        <Loader indeterminate>Fetching directories....</Loader>
      </Dimmer>
    );
  }
}

function validate(formProps) {
  const error = {};

  if (!formProps.company) {
    error.company = 'Выберите компанию';
  }
  if (!formProps.branch || (formProps.branch && formProps.branch.length === 0)) {
    error.branch = 'Выберите филиал';
  }
  if (!formProps.endDateFrom) {
    error.endDateFrom = 'Выберите дату';
  }
  if (!formProps.endDateTo) {
    error.endDateTo = 'Выберите дату';
  }
  if (!formProps.department || (formProps.department && formProps.department.length === 0)) {
    error.department = 'Выберите отдел';
  }
  if (!formProps.type || (formProps.type && formProps.type.length === 0)) {
    error.type = 'Выберите тип';
  }

  return error;
}

TaskMonitorSearchDisplay = reduxForm({
  form: 'taskMonitorSearchDisplay',
  validate,
})(TaskMonitorSearchDisplay);

export default TaskMonitorSearchDisplay;

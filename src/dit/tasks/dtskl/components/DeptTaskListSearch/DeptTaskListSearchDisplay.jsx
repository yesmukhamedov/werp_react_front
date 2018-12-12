import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import _ from 'lodash';
import { Form, Grid, Segment, Dimmer, Loader, Label } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';
import {
  DropdownFormField,
  DatePickerFormField,
} from '../../../../../utils/formFields';

class DeptTaskListSearchDisplay extends Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(values) {
    // console.log("values: ", values);
    const endDateFromUtc = values.endDateFrom
      ? moment.utc(values.endDateFrom).format()
      : undefined;
    const endDateToUtc = values.endDateTo
      ? moment.utc(values.endDateTo).format()
      : undefined;
    const startDateFromUtc = values.startDateFrom
      ? moment.utc(values.startDateFrom).format()
      : undefined;
    const startDateToUtc = values.startDateTo
      ? moment.utc(values.startDateTo).format()
      : undefined;

    const paramsDict = {
      bukrs: values.company,
      branchIds: values.branch, // values.branch[0] !== -1 ? values.branch : undefined,
      departmentIds: values.department, // values.department[0] !== -1 ? values.department : undefined,
      types: values.type[0] !== -1 ? values.type : undefined,
      statusIds: values.status[0] !== -1 ? values.status : undefined,
      endDateFrom: endDateFromUtc,
      endDateTo: endDateToUtc,
      startDateFrom: startDateFromUtc,
      startDateTo: startDateToUtc,
    };

    const params = _.map(paramsDict, (val, key) =>
      val ? `${key}=${val}` : val === false ? `${key}=${val}` : '',
    )
      .filter(param => param)
      .join('&');

    console.log(params);

    return new Promise(resolve => this.props.searchTasks(params, resolve));
  }

  render() {
    const { formatMessage } = this.props.intl;
    const {
      handleSubmit,
      pristine,
      submitting,
      reset,
      company,
      directories,
      branchOptions,
      companyOptions,
      messages,
    } = this.props;
    const allOpt = {
      key: -1,
      text: formatMessage(messages.allOption),
      value: -1,
    };
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
            <Grid stackable divided>
              <Grid.Row columns={3} style={{ padding: '3px' }}>
                <Grid.Column mobile={16} tablet={8} computer={6}>
                  <Form.Group widths="equal">
                    <Field
                      required
                      name="company"
                      component={DropdownFormField}
                      label={formatMessage(messages.company)}
                      opts={companyOptions}
                    />
                    <Field
                      required
                      multiple
                      name="branch"
                      component={DropdownFormField}
                      label={formatMessage(messages.branch)}
                      opts={company ? [allOpt, ...branchOptions[company]] : []}
                    />
                  </Form.Group>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={8} computer={4}>
                  <Form.Group widths="equal">
                    <Field
                      // required
                      name="endDateFrom"
                      label={formatMessage(messages.endDateFrom)}
                      component={DatePickerFormField}
                      autoComplete="off"
                    />
                    <Field
                      // required
                      name="endDateTo"
                      label={formatMessage(messages.endDateTo)}
                      component={DatePickerFormField}
                      autoComplete="off"
                    />
                  </Form.Group>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={3} style={{ padding: '3px' }}>
                <Grid.Column mobile={16} tablet={8} computer={6}>
                  <Form.Group widths="equal">
                    <Field
                      required
                      multiple
                      name="department"
                      component={DropdownFormField}
                      label={formatMessage(messages.department)}
                      opts={[allOpt, ...Object.values(directories.deptOptions)]}
                    />
                    <Field
                      required
                      multiple
                      name="type"
                      component={DropdownFormField}
                      label={formatMessage(messages.type)}
                      opts={[allOpt, ...Object.values(directories.typeOptions)]}
                    />
                  </Form.Group>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={8} computer={4}>
                  <Form.Group widths="equal">
                    <Field
                      name="startDateFrom"
                      label={formatMessage(messages.startDateFrom)}
                      component={DatePickerFormField}
                      autoComplete="off"
                    />
                    <Field
                      name="startDateTo"
                      label={formatMessage(messages.startDateTo)}
                      component={DatePickerFormField}
                      autoComplete="off"
                    />
                  </Form.Group>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={3} style={{ padding: '3px' }}>
                <Grid.Column mobile={16} tablet={8} computer={6}>
                  <Form.Group widths="equal">
                    <Field
                      required
                      multiple
                      name="status"
                      component={DropdownFormField}
                      label={formatMessage(messages.status)}
                      opts={[
                        allOpt,
                        ...Object.values(directories.statusOptions),
                      ]}
                    />
                    <Form.Field>
                      <Form.Group>
                        <Form.Button
                          content={formatMessage(messages.search)}
                          type="submit"
                          loading={submitting}
                          disabled={pristine || submitting}
                          style={{
                            background: 'rgba(84,170,169, 1)',
                            color: 'white',
                            marginTop: '22px',
                          }}
                        />
                        <Form.Button
                          content={formatMessage(messages.reset)}
                          type="button"
                          disabled={pristine || submitting}
                          style={{
                            background: 'rgba(84,170,169, 1)',
                            color: 'white',
                            marginTop: '22px',
                          }}
                          onClick={reset}
                        />
                      </Form.Group>
                    </Form.Field>
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
        <Loader indeterminate>Fetching directories..</Loader>
      </Dimmer>
    );
  }
}

function validate(formProps, state) {
  const { formatMessage } = state.intl;
  const error = {};

  if (!formProps.company) {
    error.company = formatMessage({ id: 'Form.CompanyError' });
  }
  if (!formProps.branch) {
    error.branch = formatMessage({ id: 'Form.BranchError' });
  }
  if (!formProps.status) {
    error.status = formatMessage({ id: 'Form.StatusError' });
  }
  if (!formProps.department) {
    error.department = formatMessage({ id: 'Form.DepartmentError' });
  }
  if (!formProps.type) {
    error.type = formatMessage({ id: 'Form.TypeError' });
  }

  return error;
}

DeptTaskListSearchDisplay = reduxForm({
  form: 'deptTaskListSearchDisplay',
  validate,
})(DeptTaskListSearchDisplay);

export default DeptTaskListSearchDisplay;

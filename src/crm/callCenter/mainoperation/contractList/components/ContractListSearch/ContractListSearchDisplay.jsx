import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import _ from 'lodash';
import { Form, Grid, Segment, Dimmer, Loader } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';
import { DropdownFormField, DatePickerFormField } from '../../../../../../utils/formFields';

class ContractListSearchDisplay extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(values) {
    const startDateUtc = moment.utc(values.startDate).format();
    const endDateUtc = moment.utc(values.endDate).format();

    const paramsDict = {
      bukrs: values.company,
      branchId: values.branch !== -1 ? values.branch : undefined,
      statusId: values.state !== -1 ? values.state : undefined,
      startDate: startDateUtc,
      endDate: endDateUtc,
    };

    const params = _.map(
      paramsDict,
      (val, key) =>
        (val ? `${key}=${val}` : val === false ? `${key}=${val}` : ''),
    )
      .filter(param => param)
      .join('&');

    return new Promise(resolve => this.props.searchContracts(params, resolve));
  }

  render() {
    const { formatMessage } = this.props.intl;
    const {
      handleSubmit, pristine, submitting, reset, company, branchOptions, messages,
    } = this.props;
    const allOpt = { key: -1, text: 'Все', value: -1 };
    if (this.props.directories && this.props.companyOptions) {
      return (
        <Form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <Segment padded size="small">
            <Grid stackable>
              <Grid.Column width={3}>
                <Field
                  required
                  name="company"
                  component={DropdownFormField}
                  label={formatMessage(messages.company)}
                  opts={this.props.companyOptions}
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
                  name="state"
                  component={DropdownFormField}
                  label={formatMessage(messages.state)}
                  opts={[allOpt, ...this.props.directories.stateOptions]}
                />
              </Grid.Column>
              <Grid.Column width={2}>
                <Field
                  required
                  name="startDate"
                  label={formatMessage(messages.dateFrom)}
                  component={DatePickerFormField}
                  autoComplete="off"
                />
              </Grid.Column>
              <Grid.Column width={2}>
                <Field
                  required
                  name="endDate"
                  label={formatMessage(messages.dateTo)}
                  component={DatePickerFormField}
                  autoComplete="off"
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
                    content={formatMessage(messages.search)}
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

ContractListSearchDisplay.propTypes = {
  directories: PropTypes.object,
  companyOptions: PropTypes.arrayOf(PropTypes.object),
  branchOptions: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
};

function validate(formProps, state) {
  const { formatMessage } = state.intl;
  const error = {};

  if (!formProps.company) {
    error.company = formatMessage({ id: 'Task.CompanyError' });
  }

  // if (!formProps.branch) {
  //   error.branch = 'Выберите филиал';
  // }

  if (!formProps.startDate) {
    error.startDate = formatMessage({ id: 'Task.DateError' });
  }

  if (!formProps.endDate) {
    error.endDate = formatMessage({ id: 'Task.DateError' });
  }

  return error;
}

ContractListSearchDisplay = reduxForm({
  form: 'contractListSearchDisplay',
  validate,
})(ContractListSearchDisplay);

export default ContractListSearchDisplay;

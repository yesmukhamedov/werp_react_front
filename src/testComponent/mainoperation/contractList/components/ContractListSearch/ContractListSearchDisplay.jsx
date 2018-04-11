import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import _ from 'lodash';
import { Form, Grid, Segment, Dimmer, Loader } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';
import { DropdownFormField, DatePickerFormField } from '../../../../../utils/formFields';

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
      branchId: values.branch,
      statusId: values.state,
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
    const {
      handleSubmit, pristine, submitting, reset,
    } = this.props;
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
                  label="Компания"
                  opts={this.props.companyOptions}
                />
              </Grid.Column>
              <Grid.Column width={3}>
                <Field
                  // required
                  name="branch"
                  component={DropdownFormField}
                  label="Филиал"
                  opts={this.props.company ? this.props.branchOptions[this.props.company] : []}
                />
              </Grid.Column>
              <Grid.Column width={3}>
                <Field
                  name="state"
                  component={DropdownFormField}
                  label="Состояние"
                  opts={this.props.directories.stateOptions}
                />
              </Grid.Column>
              <Grid.Column width={2}>
                <Field
                  required
                  name="startDate"
                  label="с"
                  component={DatePickerFormField}
                />
              </Grid.Column>
              <Grid.Column width={2}>
                <Field
                  required
                  name="endDate"
                  label="до"
                  component={DatePickerFormField}
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

ContractListSearchDisplay.propTypes = {
  directories: PropTypes.object,
  companyOptions: PropTypes.arrayOf(PropTypes.object),
  branchOptions: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
};

function validate(formProps) {
  const error = {};

  if (!formProps.company) {
    error.company = 'Выберите компанию';
  }

  // if (!formProps.branch) {
  //   error.branch = 'Выберите филиал';
  // }

  if (!formProps.startDate) {
    error.startDate = 'Выберите дату';
  }

  if (!formProps.endDate) {
    error.endDate = 'Выберите дату';
  }

  return error;
}

ContractListSearchDisplay = reduxForm({
  form: 'contractListSearchDisplay',
  validate,
})(ContractListSearchDisplay);

export default ContractListSearchDisplay;

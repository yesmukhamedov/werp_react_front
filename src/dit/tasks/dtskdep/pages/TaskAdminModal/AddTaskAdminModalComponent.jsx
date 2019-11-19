import axios from 'axios';
import React, { PureComponent } from 'react';
import { doGetCancelToken } from '../../../../../utils/apiActions';
import _ from 'lodash';
import { Modal, Button, Form, Divider, Search } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import {
  DropdownFormField,
  // SearchableSingleDropdownFormField
} from '../../../../../utils/formFields';

const validate = values => {
  const errors = {};
  if (!values.user) {
    errors.user = 'Объязательное поле для заполнения';
  }
  if (!values.department) {
    errors.department = 'Объязательное поле для заполнения';
  }
  return errors;
};

const clearForm = props => {};

const userSearchUrl = `mgru/users`;
class AddTaskAdminModalComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      results: [],
      value: '',
      userId: '',
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
  }

  handleFormSubmit(formValues) {
    const { createTaskAdmin, fetchTaskAdmins } = this.props;
    const { userId } = this.state;
    createTaskAdmin(formValues, userId, () => fetchTaskAdmins());
    this.handleFormClose();
  }

  handleFormClose() {
    this.props.close();
    this.props.reset();
    this.resetComponent();
  }

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: '', userId: '' });

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.title, userId: result.key });

  handleSearchChange = (e, { value }) => {
    const paramsDict = {
      username: value,
    };
    const params = _.map(paramsDict, (val, key) =>
      val ? `${key}=${val}` : val === false ? `${key}=${val}` : '',
    )
      .filter(param => param)
      .join('&');
    this.setState({ isLoading: true, value, userId: '' });

    // cancel the previous request
    if (typeof this._source != typeof undefined) {
      this._source.cancel('Operation canceled due to new request.');
    }

    // save the new request for cancellation
    this._source = axios.CancelToken.source();

    const req = doGetCancelToken(
      `${userSearchUrl}?${params}`,
      this._source.token,
    );

    req
      .then(({ data }) => {
        const users = data.map((el, idx) => ({
          key: el.userId,
          title: el.fio,
          description: el.userName,
        }));
        this.setState({
          isLoading: false,
          results: users,
        });
      })
      .catch(error => {
        this.resetComponent();
        if (axios.isCancel(error)) {
          console.log('Request canceled', error);
        } else {
          console.log(error);
        }
      });
  };

  render() {
    const {
      isOpen,
      handleSubmit,
      deptOptions,
      // userOptions,
      lang,
    } = this.props;
    const { messages } = this.props.intl;
    const { isLoading, value, results } = this.state;
    return (
      <Modal open={isOpen} onClose={this.handleFormClose}>
        <Modal.Header>{messages.H__ADD_TASK_ADMIN}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={handleSubmit(this.handleFormSubmit)}>
              {/* <Field
                name="user"
                component={SearchableSingleDropdownFormField}
                label="Пользователь"
                opts={userOptions}
              /> */}
              <Form.Field>
                <label>{messages.L__USER}</label>
                <Search
                  loading={isLoading}
                  onResultSelect={this.handleResultSelect}
                  onSearchChange={_.debounce(this.handleSearchChange, 800, {
                    leading: true,
                  })}
                  results={results}
                  // value={value}
                />
              </Form.Field>
              <Field
                name="department"
                component={DropdownFormField}
                label={messages.L__DEPARTMENT}
                opts={deptOptions}
              />

              <Divider />

              <Button
                color="youtube"
                float="right"
                content={messages.BTN__CANCEL}
                onClick={this.handleFormClose}
              />
              <Button
                positive
                icon="checkmark"
                labelPosition="right"
                content={messages.BTN__CREATE}
                type="submit"
                float="left"
              />
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default reduxForm({
  form: 'DtskdepAddTaskAdminForm',
  validate,
})(AddTaskAdminModalComponent);

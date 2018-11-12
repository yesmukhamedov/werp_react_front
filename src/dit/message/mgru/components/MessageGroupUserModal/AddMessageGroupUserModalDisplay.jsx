import React, { PureComponent } from 'react';
import axios from 'axios';
import _ from 'lodash';
import {
  Modal,
  Button,
  Form,
  Divider,
  Search,
} from 'semantic-ui-react';
import { Field, reduxForm, change } from 'redux-form';
import { DropdownFormField } from '../../../../../utils/formFields';
import { ROOT_URL } from '../../../../../utils/constants';

const userSearchUrl = `${ROOT_URL}/api/mgru/users`;
const searchByKeywordUrl = `${ROOT_URL}/api/tasks/assignee`;

class AddMessageGroupUserModalDisplay extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      results: [], 
      value: '' ,
      userId: '',
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
  }

  handleFormSubmit(formValues) {
    const { createMessageGroupUser, updateMessageGroupUser, fetchMessageGroupUsers, modalType, modalData } = this.props;
    const { userId } = this.state
    if (modalType === 'add') {
      createMessageGroupUser(formValues, userId,  () => fetchMessageGroupUsers());
    } else if (modalType === 'edit') {
      updateMessageGroupUser(modalData.mguId, formValues, () => fetchMessageGroupUsers());
    }
    this.handleFormClose();
  }

  handleFormClose() {
    this.props.close();
    this.props.reset();
    this.resetComponent();
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '', userId: '' })

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.title, userId: result.userid })

    const req = axios.get(`${userSearchUrl}/${result.userid}`, {
      headers: { authorization: localStorage.getItem('token') }
    })

    req
      .then(({ data }) => {
        // console.log("user: ", data)
        this.props.dispatch(change('mgruAddMessageGroupUserForm', 'company', data.bukrs));
        this.props.dispatch(change('mgruAddMessageGroupUserForm', 'branch', data.branchId));
        this.props.dispatch(change('mgruAddMessageGroupUserForm', 'department', data.departmentId));
      })
      .catch(error => {        
          console.log(error);
      })
  }

  handleSearchChange = (e, { value }) => {
    const paramsDict = { keyword: value };
    const params = _.map(
      paramsDict,
      (val, key) =>
        (val ? `${key}=${val}` : val === false ? `${key}=${val}` : ''),
    ).filter(param => param).join('&');
    this.setState({ isLoading: true, value, userId: ''})

    // cancel the previous request
    if (typeof this._source != typeof undefined) {
      this._source.cancel('Operation canceled due to new request.')
    }

    // save the new request for cancellation
    this._source = axios.CancelToken.source();

    const req = axios.get(`${searchByKeywordUrl}?${params}`, {
      headers: { authorization: localStorage.getItem('token') },
      cancelToken: this._source.token,
    })

    req
      .then(({ data }) => {
        const users = data.map((el, idx) => ({
          key: idx,
          title: el.fio,
          description: el.text,
          price: el.username,
          // image: "",
          userid: el.userId,
        }));
        this.setState({
          isLoading: false,
          results: users,
        });
      })
      .catch(error => {        
        this.resetComponent()
        if (axios.isCancel(error)) {            
          console.log('Request canceled', error);
        } else {
          console.log(error);
        }
      })
  }

  render() {
    const {
      isOpen,
      close,
      modalType,
      handleSubmit,
      selectedCompany,
      selectedDepartment,
      branchOptions,
      companyOptions,
      reference,
      pristine, 
      submitting 
    } = this.props;
    const { isLoading, value, results } = this.state
    return (
      <Modal size="tiny" open={isOpen} onClose={this.handleFormClose}>
        <Modal.Header>{modalType === 'add' ? 'Add' : 'Edit'} message group user</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <Field
                required
                name="messageGroup"
                component={DropdownFormField}
                label="Группа"
                opts={reference && reference.messgrOptions}
              />
              <Form.Field>
                <label>Пользователь</label>
                <Search
                    loading={isLoading}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={_.debounce(this.handleSearchChange, 800, { leading: true })}
                    results={results}
                    fluid
                    // value={value}
                />
              </Form.Field>
              <Field
                required
                name="company"
                component={DropdownFormField}
                label="Компания"
                opts={companyOptions}
              />
              <Field
                required
                name="branch"
                component={DropdownFormField}
                label="Филиал"
                disabled={!selectedCompany}
                opts={selectedCompany && branchOptions[selectedCompany]}
              />
              <Field
                required
                name="department"
                component={DropdownFormField}
                label="Отдел"
                opts={reference && reference.deptOptions}
              />
              <Field
                required
                name="supervisor"
                component={DropdownFormField}
                label="Начальник отдела"
                // disabled={!selectedDepartment}
                opts={reference && reference.taskAdminOptions}
              />
              <Divider />
              <Button
                color="youtube"
                float="right"
                content="Отменить"
                onClick={this.handleFormClose}
              />
              <Button
                positive
                icon="checkmark"
                labelPosition="right"
                content="OK"
                type="submit"
                float="left"
                disabled={pristine || submitting}
              />
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

const validate = props => {
  const errors = {}
  const fields = ['messageGroup', 'company', 'branch', 'department', 'supervisor'];

  fields.forEach((f) => {
    if(!(f in props)) {
      errors[f] = `${f} is required`;
    }
  });

  return errors
}

export default reduxForm({
  form: 'mgruAddMessageGroupUserForm',
  validate,
  enableReinitialize: true,
})(AddMessageGroupUserModalDisplay);

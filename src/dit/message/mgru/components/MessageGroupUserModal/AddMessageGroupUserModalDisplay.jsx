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
import { Field, reduxForm, change, untouch } from 'redux-form';
import { DropdownFormField } from '../../../../../utils/formFields';
import { ROOT_URL } from '../../../../../utils/constants';

// const userSearchUrl = `${ROOT_URL}/api/mgru/users`;
const userSearchUrl = `${ROOT_URL}/api/tasks/assignee`;

class AddMessageGroupUserModalDisplay extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      results: [], 
      value: '' ,
      userId: '',
      branchOptions: [],
      departmentOptions: [],
      selectedCompany: '',
      selectedDepartment: ''
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.branchOptions !== this.state.branchOptions) {
      if(nextProps.selectedCompany !== this.state.selectedCompany) {
        this.props.reset()
        this.props.dispatch(change('mgruAddMessageGroupUserForm', 'company', nextProps.selectedCompany));
        this.setState({ 
          branchOptions: nextProps.branchOptions,          
          selectedCompany: nextProps.selectedCompany,
          isLoading: false, results: [], value: '', userId: '',
         });
        if (nextProps.reference) {
          this.setState({
            departmentOptions: nextProps.reference.deptOptions
          })
        }
      }      
    }
    if (nextProps.selectedDepartment !== this.state.selectedDepartment) {
      this.setState({selectedDepartment: nextProps.selectedDepartment})
      this.props.dispatch(change('mgruAddMessageGroupUserForm', 'supervisor',null))
      this.props.dispatch(untouch('mgruAddMessageGroupUserForm', 'supervisor'))
    }
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

  resetComponent() {
    const { reference, branchOptions } = this.props;
    this.setState({ 
      isLoading: false, results: [], value: '', userId: '',
      branchOptions, departmentOptions: reference.deptOptions,
    })    
  }

  resetFields() {
    const fields = ['branch','department','supervisor',]
    for (var i = 0; i < fields.length; i++) {
        this.props.dispatch(change('mgruAddMessageGroupUserForm',fields[i],null))
        this.props.dispatch(untouch('mgruAddMessageGroupUserForm',fields[i]))
    }
  }

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.title, userId: result.userid })

    const req = axios.get(`${userSearchUrl}/${result.userid}`, {
      headers: { authorization: localStorage.getItem('token') }
    })

    req
      .then(({ data }) => {
        const { reference, branchOptions } = this.props;  
        let branchMap = {};
        Object.keys(branchOptions).forEach(id => {
            const valueMap = branchOptions[id];
            branchMap[valueMap.key] = valueMap;
        });
        const filteredBranchOpts = data.map(el => branchMap[el.branchId]);
        const filteredDepOpts = data.map(el => reference.deptOptions[el.departmentId]);  
        this.setState({
          branchOptions: filteredBranchOpts.filter(el => el !== undefined),
          departmentOptions: [...new Set(filteredDepOpts)],
        });
        this.resetFields()
      })
      .catch(error => {        
          console.log(error);
      })
  }

  handleSearchChange = (e, { value }) => {
    const { selectedCompany } = this.props;
    const paramsDict = { 
      keyword: value,
      bukrs: selectedCompany };
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

    const req = axios.get(`${userSearchUrl}?${params}`, {
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
        this.resetFields()
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
      modalType,
      handleSubmit,
      selectedCompany,
      selectedDepartment,
      // branchOptions,
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
                name="company"
                component={DropdownFormField}
                label="Компания"
                opts={companyOptions}
              />
              <Field
                required
                disabled={!selectedCompany}
                name="messageGroup"
                component={DropdownFormField}
                label="Группа"
                opts={reference && reference.messgrOptions}
              />
              <Form.Field disabled={!selectedCompany}>
                <label>Пользователь</label>
                <Search
                    loading={isLoading}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={_.debounce(this.handleSearchChange, 800, { leading: true })}
                    results={results}
                    value={value}
                    fluid
                />
              </Form.Field>
              <Field
                required
                name="branch"
                component={DropdownFormField}
                label="Филиал"
                disabled={!selectedCompany}
                opts={this.state.branchOptions}
              />
              <Field
                required
                name="department"
                component={DropdownFormField}
                label="Отдел"
                disabled={!selectedCompany}
                opts={this.state.departmentOptions}
              />
              <Field
                required
                name="supervisor"
                component={DropdownFormField}
                label="Начальник отдела"
                disabled={!selectedDepartment}
                opts={reference && 
                  Object.values(reference.taskAdminOptions).filter(
                    el => el.departmentId === selectedDepartment)
                  }
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

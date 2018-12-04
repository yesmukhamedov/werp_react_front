import React, { Component } from 'react';
import { Form, Search, Segment, Button } from 'semantic-ui-react';
import hash from 'object-hash';
import axios from 'axios';
import _ from 'lodash';
import WarnMessage from './WarnMessage';
import { ROOT_URL } from '../../../../../utils/constants';
import { GET, constructFullName } from '../../../../../utils/helpers';
import { defineMessages } from 'react-intl';

const assigneeSearchUrl = `${ROOT_URL}/api/tasks/assignee?keyword=`;
const assigneeDetailsUrl = `${ROOT_URL}/api/tasks/assignee`;

const initialState = {
  data: {
    selectedAssignee: '',
    selectedAssigneeId: '',
    selectedBranch: '',
    selectedDepartment: '',
    selectedManager: '',
  },
  errors: {},
  isLoading: false,
  isSubmittable: false,
  assigneesList: [],
  branchOptions: [],
  departmentOptions: [],
};

class AssigneeSearchPaneComponent extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  resetComponent = () => this.setState(initialState);

  handleChange = (e, { name, value }) => {
    let data = {
      ...this.state.data,
      [name]: value,
    };
    if (name === 'selectedDepartment') {
      data.selectedManager = '';
    }

    this.setState({
      ...this.state,
      data,
      isSubmittable: this.validate(data),
    });
  };

  validate = ({
    selectedAssignee,
    selectedBranch,
    selectedDepartment,
    selectedManager,
  }) =>
    !!selectedAssignee &&
    !!selectedBranch &&
    !!selectedDepartment &&
    !!selectedManager;

  handleResultSelect = (e, { result }) =>
    this.setState(
      {
        ...this.state,
        data: {
          ...this.state.data,
          selectedAssignee: result.title,
          selectedAssigneeId: result,
        },
        isLoading: true,
      },
      () => {
        this.fetchAssigneeDetails(result.userId);
      },
    );

  handleSearchChange = (e, { value }) => {
    const { selectedCompany, lang } = this.props;

    // cancel the previous request
    if (typeof this._source != typeof undefined) {
      this._source.cancel('Operation canceled due to new request.');
    }

    if (value.length > 0) {
      // save the new request for cancellation
      this._source = axios.CancelToken.source();

      const req = axios.get(
        `${assigneeSearchUrl}${value}&bukrs=${selectedCompany}`,
        {
          headers: { authorization: localStorage.getItem('token') },
          cancelToken: this._source.token,
        },
      );

      req
        .then(({ data }) => {
          const assignees = data.map((el, idx) => ({
            key: idx,
            title: el.fio,
            description: el[lang],
            price: '',
            image: '',
            userId: el.userId,
          }));
          this.setState({
            ...this.state,
            assigneesList: assignees,
            data: {
              ...this.state.data,
              selectedAssignee: value,
            },
          });
        })
        .catch(error => {
          if (axios.isCancel(error)) {
            console.log('Request canceled', error);
          } else {
            console.log(error);
          }
        });
    } else {
      this.resetComponent();
    }
  };

  fetchAssigneeDetails = userId => {
    const {
      branchOptsNormalized: branchOpts,
      deptOpts,
      selectedCompany,
    } = this.props;

    const req = GET(`${assigneeDetailsUrl}/${userId}?bukrs=${selectedCompany}`);
    req
      .then(({ data }) => {
        const { branchId, departmentId } = data;
        let filteredBranchOpts = {};
        let filteredDepOpts = {};

        branchId.forEach(
          el => (filteredBranchOpts[el] = branchOpts[el][0]),
        );
        departmentId.forEach(
          el => (filteredDepOpts[el] = deptOpts[el]),
        );

        this.setState({
          ...this.state,
          branchOptions: _.values(filteredBranchOpts),
          departmentOptions: _.values(filteredDepOpts),
          isLoading: false,
        });
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error);
        } else {
          console.log(error);
        }
      });
  };

  handleSubmit = () => {
    const {
      addAssigneePerson,
      toggleAssigneeModal: hideModal,
      branchOptsNormalized: branchOpts,
    } = this.props;
    const recipient = {
      branch: {
        id: this.state.data.selectedBranch,
      },
      department: {
        id: this.state.data.selectedDepartment.depId,
      },
      assignee: {
        id: this.state.data.selectedAssigneeId.userId,
      },
      assigneesManager: {
        id: this.state.data.selectedManager.id,
      },
      meta: {
        branch: branchOpts[this.state.data.selectedBranch][0],
        department: this.state.data.selectedDepartment,
        supervisor: constructFullName(this.state.data.selectedManager),
        user: this.state.data.selectedAssigneeId.title,
      },
    };
    const assigneePerson = {
      id: hash(recipient),
      recipient,
    };
    addAssigneePerson(assigneePerson);
    hideModal();
  };

  renderForm() {
    const { managerOpts, messages } = this.props;
    const { data, isLoading, isSubmittable } = this.state;
    const { selectedDepartment } = data;
    return (
      <div>
        <Form loading={isLoading}>
          <Form.Field>
            <Search
              onResultSelect={this.handleResultSelect}
              onSearchChange={this.handleSearchChange}
              results={this.state.assigneesList}
            />
          </Form.Field>
          <Form.Group widths="equal">
            <Form.Select
              label={messages.L__BRANCH}
              placeholder={messages.L__BRANCH}
              options={this.state.branchOptions}
              onChange={this.handleChange}
              name="selectedBranch"
            />
            <Form.Select
              label={messages.L__DEPARTMENT}
              placeholder={messages.L__DEPARTMENT}
              options={this.state.departmentOptions}
              name="selectedDepartment"
              onChange={this.handleChange}
            />
            <Form.Select
              label={messages.L__ASSIGNEE_MANAGER}
              placeholder={messages.L__ASSIGNEE_MANAGER}
              options={
                selectedDepartment && managerOpts[selectedDepartment.depId]
              }
              name="selectedManager"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button disabled={!isSubmittable} onClick={this.handleSubmit}>
            {messages.BTN__ADD}
          </Button>
        </Form>
      </div>
    );
  }

  render() {
    const { selectedCompany, messages } = this.props;
    return selectedCompany ? (
      this.renderForm()
    ) : (
      <WarnMessage header={messages.TX__WARN_SELECT_COMPANY} />
    );
  }
}

export default AssigneeSearchPaneComponent;

import React, { Component } from 'react';
import { Form, Search, Container } from 'semantic-ui-react';
import { debounce } from 'lodash';
import axios from 'axios';
import { ROOT_URL } from '../../../../utils/constants';
import { GET } from '../../../../utils/helpers';

const assigneeSearchUrl = `${ROOT_URL}/api/tasks/assignee?keyword=`;
const assigneeDetailsUrl = `${ROOT_URL}/api/tasks/assignee`;

class AssigneeSearchPaneComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      assigneesList: [],
      selectedAssignee: '',
      branchOptions: [],
      departmentOptions: [],
    };
  }

  resetComponent = () =>
    this.setState({
      isLoading: false,
      assigneesList: [],
      selectedAssignee: '',
    });

  handleResultSelect = (e, { result }) =>
    this.setState({ selectedAssignee: result.title }, () => {
      this.fetchAssigneeDetails(result.userId)
    });

  handleSearchChange = (e, { value }) => {
    const { selectedCompany } = this.props;
    // this.setState({ isLoading: true, selectedAssignee: value })

    // cancel the previous request
    if (typeof this._source != typeof undefined) {
      this._source.cancel('Operation canceled due to new request.');
    }

    // save the new request for cancellation
    this._source = axios.CancelToken.source();

    // if (this.state.selectedAssignee.length < 1) return this.resetComponent()
    const req = axios.get(`${assigneeSearchUrl}${value}&bukrs=${selectedCompany}`, {
      headers: { authorization: localStorage.getItem('token') },
      cancelToken: this._source.token,
    });

    req
      .then(({ data }) => {
        const assignees = data.map((el, idx) => ({
          key: idx,
          title: el.fio,
          description: el.text,
          price: '',
          image: '',
          userId: el.userId,
        }));
        this.setState({
          isLoading: false,
          assigneesList: assignees,
          selectedAssignee: value,
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

  fetchAssigneeDetails = (userId) => {
    const req = GET(`${assigneeDetailsUrl}/${userId}`);
    req
      .then(({ data }) => {
        const { branchOpts, deptOpts } = this.props;
        const filteredDepOpts = data.map(el => deptOpts[el.departmentId]);
        const filteredBranchOpts = data.map(el => branchOpts[el.branchId]);
        this.setState({
          branchOptions: filteredBranchOpts[0],
          departmentOptions: filteredDepOpts,
        });
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error);
        } else {
          console.log(error);
        }
      })
  }

  render() {
    const { managerOpts } = this.props;
    return (
      <div>
        <Search
          onResultSelect={this.handleResultSelect}
          onSearchChange={this.handleSearchChange}
          results={this.state.assigneesList}
          // value={this.state.selectedAssignee}
        />
        <Form>
          <Form.Group widths="equal" />
          <Form.Group widths="equal">
            <Form.Select
              label="Branch"
              placeholder="Branch"
              options={this.state.branchOptions}
            />
            <Form.Select
              label="Department"
              placeholder="Department"
              options={this.state.departmentOptions}
            />
            <Form.Select
              label="Assignee Manager"
              placeholder="Assignee Manager"
              options={Object.values(managerOpts).filter(el => el.departmentId === this.state.selectedDepartment)}
            />
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default AssigneeSearchPaneComponent;

import React, { Component } from 'react';
import { Form, Search, Segment, Button } from 'semantic-ui-react';
import hash from 'object-hash';
import axios from 'axios';
import { ROOT_URL } from '../../../../utils/constants';
import { GET } from '../../../../utils/helpers';

const assigneeSearchUrl = `${ROOT_URL}/api/tasks/assignee?keyword=`;
const assigneeDetailsUrl = `${ROOT_URL}/api/tasks/assignee`;

const initialState = {
  selectedAssignee: '',
  selectedAssigneeId: '',
  selectedBranch: '',
  selectedDepartment: '',
  selectedManager: '',
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
    switch (name) {
      case 'selectedDepartment': {
        this.setState({
          selectedManager: '',
          [name]: value,
        });
        break;
      }
      default:
        this.setState({ [name]: value });
    }
  };

  handleResultSelect = (e, { result }) =>
    this.setState(
      {
        selectedAssignee: result.title,
        selectedAssigneeId: result.userId,
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
    } else {
      this.resetComponent();
    }
  };

  fetchAssigneeDetails = userId => {
    const req = GET(`${assigneeDetailsUrl}/${userId}`);
    req
      .then(({ data }) => {
        const { branchOptsNormalized: branchOpts, deptOpts, selectedCompany } = this.props;

        const filteredData = data.filter(el => el.bukrsId === selectedCompany);
        let filteredBranchOpts = {};
        let filteredDepOpts = {};

        filteredData.forEach(
          el => (filteredBranchOpts[el.branchId] = branchOpts[el.branchId][0]),
        );
        filteredData.forEach(
          el => (filteredDepOpts[el.departmentId] = deptOpts[el.departmentId]),
        );

        this.setState({
          ...this.state,
          branchOptions: Object.values(filteredBranchOpts),
          departmentOptions: Object.values(filteredDepOpts),
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
    const { addAssigneePerson, toggleAssigneeModal: hideModal } = this.props;
    const recipient = {
      branch: {
        id: this.state.selectedBranch,
      },
      department: {
        id: this.state.selectedDepartment,
      },
      assignee: {
        id: this.state.selectedAssigneeId,
      },
      assigneesManager: {
        id: this.state.selectedManager,
      },
    }
    const assigneePerson = {
      id: hash(recipient),
      recipient,  
    }
    addAssigneePerson(assigneePerson);
    hideModal();
  }

  renderErrorSection() {
    return (
      <Segment inverted color="red" secondary>
        Please choose company first!!!
      </Segment>
    );
  }

  renderForm() {
    const { managerOpts } = this.props;
    const {
      selectedBranch,
      selectedDepartment,
    } = this.state;
    return (
      <div>
        <Form>
          <Form.Field>
            <Search
              onResultSelect={this.handleResultSelect}
              onSearchChange={this.handleSearchChange}
              results={this.state.assigneesList}
            />
          </Form.Field>
          <Form.Group widths="equal">
            <Form.Select
              label="Branch"
              placeholder="Branch"
              options={ this.state.branchOptions}
              onChange={this.handleChange}
              name="selectedBranch"
            />
            <Form.Select
              label="Department"
              placeholder="Department"
              options={ this.state.departmentOptions}
              name="selectedDepartment"
              onChange={this.handleChange}
            />
            <Form.Select
              label="Assignee Manager"
              placeholder="Assignee Manager"
              options={selectedDepartment && managerOpts[selectedDepartment]}
              name="selectedManager"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button onClick={this.handleSubmit}>Add assignee</Button>
        </Form>
      </div>
    );
  }

  render() {
    const { selectedCompany } = this.props;
    return selectedCompany ? this.renderForm() : this.renderErrorSection();
  }
}

export default AssigneeSearchPaneComponent;

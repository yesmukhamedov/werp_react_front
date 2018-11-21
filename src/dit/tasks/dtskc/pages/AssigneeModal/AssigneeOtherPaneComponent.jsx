import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import hash from 'object-hash';
import WarnMessage from './WarnMessage';
import { constructFullName } from '../../../../../utils/helpers';

class AssigneeOtherPane extends Component {
  state = {
    data: {
      selectedBranch: '',
      selectedDepartment: '',
      selectedManager: '',
    },
    errors: {},
    isSubmittable: false,
  };

  handleChange = (_, { name, value }) => {
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
    selectedBranch,
    selectedDepartment,
    selectedManager,
  }) =>
    !!selectedBranch &&
    !!selectedDepartment &&
    !!selectedManager;

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
      assigneesManager: {
        id: this.state.data.selectedManager.id,
      },
      meta: {
        branch: branchOpts[this.state.data.selectedBranch][0],
        department: this.state.data.selectedDepartment,
        supervisor: constructFullName(this.state.data.selectedManager),
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
    const { managerOpts, branchOpts, deptOpts, messages } = this.props;
    const { data, isSubmittable } = this.state;
    const { selectedDepartment } = data;
    return (
      <Form>
        <Form.Group widths="equal">
          <Form.Select
            label={messages.L__BRANCH}
            placeholder={messages.L__BRANCH}
            name="selectedBranch"
            options={branchOpts}
            onChange={this.handleChange}
          />
          <Form.Select
            label={messages.L__DEPARTMENT}
            placeholder={messages.L__DEPARTMENT}
            options={deptOpts}
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

export default AssigneeOtherPane;

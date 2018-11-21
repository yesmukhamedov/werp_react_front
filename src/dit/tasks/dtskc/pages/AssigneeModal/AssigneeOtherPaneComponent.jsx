import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import hash from 'object-hash';
import WarnSegment from './WarnSegment';
import { constructFullName } from '../../../../../utils/helpers';

class AssigneeOtherPane extends Component {
  state = {
    selectedBranch: '',
    selectedDepartment: '',
    selectedManager: '',
  };

  handleChange = (e, { name, value }) => {
    console.log('handleChange', name, value);
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

  handleSubmit = () => {
    const {
      addAssigneePerson,
      toggleAssigneeModal: hideModal,
      branchOptsNormalized: branchOpts,
    } = this.props;
    const recipient = {
      branch: {
        id: this.state.selectedBranch,
      },
      department: {
        id: this.state.selectedDepartment.depId,
      },
      assigneesManager: {
        id: this.state.selectedManager.id,
      },
      meta: {
        branch: branchOpts[this.state.selectedBranch][0],
        department: this.state.selectedDepartment,
        supervisor: constructFullName(this.state.selectedManager),
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
    const { selectedDepartment } = this.state;
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
        <Button onClick={this.handleSubmit}>{messages.BTN__ADD}</Button>
      </Form>
    );
  }

  render() {
    const { selectedCompany, messages } = this.props;
    return selectedCompany ? (
      this.renderForm()
    ) : (
      <WarnSegment message={messages.TX__WARN_SELECT_COMPANY} />
    );
  }
}

export default AssigneeOtherPane;

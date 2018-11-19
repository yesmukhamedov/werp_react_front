import React, { Component } from 'react';
import { Form, Button, Segment } from 'semantic-ui-react';
import hash from 'object-hash';

class AssigneeOtherPane extends Component {
  state = {
    selectedBranch: '',
    selectedDepartment: '',
    selectedManager: '',
  };

  handleChange = (e, { name, value }) => {
    console.log("handleChange", name, value);
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
    const { addAssigneePerson, toggleAssigneeModal: hideModal } = this.props;
    const recipient = {
      branch: {
        id: this.state.selectedBranch,
      },
      department: {
        id: this.state.selectedDepartment,
      },
      assigneesManager: {
        id: this.state.selectedManager,
      },
      meta: {
        branch: this.state.selectedBranch,
        department: this.state.selectedDepartment,
        supervisor: this.state.selectedManager,
      }
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
    const {
      managerOpts,
      branchOpts,
      deptOpts,
      addAssigneePerson,
    } = this.props;
    const { selectedDepartment } = this.state;
    return (
      <Form>
        <Form.Group widths="equal">
          <Form.Select
            label="Branch"
            placeholder="Branch"
            name="selectedBranch"
            options={branchOpts}
            onChange={this.handleChange}
          />
          <Form.Select
            label="Department"
            placeholder="Department"
            options={deptOpts}
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
    );
  }

  render() {
    const { selectedCompany } = this.props;
    return selectedCompany ? this.renderForm() : this.renderErrorSection();
  }
}

export default AssigneeOtherPane;

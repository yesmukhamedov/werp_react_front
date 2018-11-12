import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';

class AssigneeOtherPane extends Component {
  state = {
    selectedBranch: '',
    selectedDepartment: '',
    selectedManager: '',
  }

  handleChange = (e, {name, value}) => {
    switch(name) {
      case 'selectedDepartment': {
        this.setState({
          selectedManager: '',
          [name]: value,
        });
        break;
      }
      default:
      this.setState({ [name]: value})
    }
  }

  render() {
    const {
      managerOpts,
      branchOpts,
      deptOpts,
    } = this.props;
    return (
      <Form>
        <Form.Group widths="equal">
          <Form.Select
            label="Branch"
            placeholder="Branch"
            name="selectedBranch"
            options={branchOpts}
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
            options={Object.values(managerOpts).filter(el => el.departmentId === this.state.selectedDepartment)}
            name="selectedManager"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Button>Add assignee</Button>
      </Form>
    );
  }
}

// const filterBy = (list, param) => 

export default AssigneeOtherPane;

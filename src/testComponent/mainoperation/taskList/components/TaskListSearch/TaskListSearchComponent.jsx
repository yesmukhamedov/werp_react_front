/* eslint linebreak-style: ["error", "windows"] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Form, Dropdown, Grid, Segment, Dimmer, Loader, Label, Icon } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class TaskListSearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStatus: undefined,
      selectedPriority: undefined,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleInputChange(value, dataType) {
    // console.log(dataType, value)
    this.setState({
      ...this.state,
      [dataType]: value,
    });
  }

  handleSearch() {
    const paramsDict = {
      statusId: this.state.selectedStatus,
      priorityId: this.state.selectedPriority,
    };
    // console.log(paramsDict);
    const params = _.map(
      paramsDict,
      (val, key) =>
        (val ? `${key}=${val}` : val === false ? `${key}=${val}` : ''),
    )
      .filter(param => param)
      .join('&');

    console.log('PARAMS', params);
    this.props.searchTasks(params);
  }

  render() {
    if (this.props.directories) {
      return (
        <Form onSubmit={this.handleSearch}>
          <Segment padded size="small">
            <Label
              as="a"
              attached="top"
              content="Задачи"
              icon="checkmark box"
              style={{
                background: 'rgba(227,232,238, 1)',
              }}
            />
            <Grid stackable>
              <Grid.Column width={3}>
                <Form.Field>
                  <label>Статус</label>
                  <Dropdown
                    placeholder="Статус"
                    fluid
                    selection
                    options={this.props.directories.statusOptions}
                    value={this.state.selectedStatus}
                    onChange={(e, { value }) =>
                      this.handleInputChange(value, 'selectedStatus')
                    }
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={3}>
                <Form.Field>
                  <label>Приоритет</label>
                  <Dropdown
                    placeholder="Приоритет"
                    fluid
                    selection
                    options={this.props.directories.priorityOptions}
                    value={this.state.selectedPriority}
                    onChange={(e, { value }) =>
                      this.handleInputChange(value, 'selectedPriority')
                    }
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={2}>
                <Form.Button
                  content="Поиск"
                  style={
                    { marginTop: '1.6em', background: 'rgba(84,170,169, 1)', color: 'white' }}
                />
              </Grid.Column>
            </Grid>
          </Segment>
        </Form>
      );
    }
    return (
      <Dimmer active>
        <Loader indeterminate>Fetching directories...</Loader>
      </Dimmer>
    );
  }
}

TaskListSearchComponent.propTypes = {
  searchTasks: PropTypes.func.isRequired,
  directories: PropTypes.object,
};

export default TaskListSearchComponent;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Table, Button, Icon, Segment, Header, Label } from 'semantic-ui-react';
import { NewTaskModalContainer } from '../NewTaskModal';
import { formatDMYMS } from '../../../../../../utils/helpers';
import { outCallStatusColorMap } from '../../../../../../utils/constants';

class TaskPanelComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    this.setState({ modalOpen: true });
  }

  close() {
    this.setState({ modalOpen: false });
  }

  render() {
    const { tasks, lang, directories, messages } = this.props;
    return (
      <Segment>
        <Header as="h3" dividing>
          {messages.H__TASKS}
        </Header>
        <Table structured celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell collapsing>#</Table.HeaderCell>
              <Table.HeaderCell>{messages.TBL_H__STATUS}</Table.HeaderCell>
              <Table.HeaderCell collapsing>
                {messages.TBL_H__PRIORITY}
              </Table.HeaderCell>
              <Table.HeaderCell>{messages.TBL_H__TITLE}</Table.HeaderCell>
              <Table.HeaderCell>{messages.TBL_H__ASSIGNED_TO}</Table.HeaderCell>
              <Table.HeaderCell collapsing>
                {messages.TBL_H__MODIFIED_DATE}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {tasks &&
              tasks.map(task => (
                <Table.Row>
                  <Table.Cell>
                    <Link
                      target="_blank"
                      to={`/crm/callcenter/ccastskedit/${task.id}`}
                    >
                      {task.id}
                    </Link>
                  </Table.Cell>
                  <Table.Cell collapsing>
                    {task.status && (
                      <Label
                        color={outCallStatusColorMap[task.status.id]}
                        size="tiny"
                      >
                        {task.status[lang]}
                      </Label>
                    )}
                  </Table.Cell>
                  <Table.Cell>{task.priority[lang]}</Table.Cell>
                  <Table.Cell>
                    <Link
                      target="_blank"
                      to={`/crm/callcenter/ccastskedit/${task.id}`}
                    >
                      {task.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    {`${task.recipient.branch.value} - ${
                      task.recipient.department.value
                    } - ${task.recipient.position.value}`}
                  </Table.Cell>
                  <Table.Cell>{formatDMYMS(task.modifiedAt)}</Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="6">
                <Button
                  icon
                  labelPosition="left"
                  primary
                  size="small"
                  onClick={this.open}
                >
                  <Icon name="file text" />
                  {messages.BTN__NEW_TASK}
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        <NewTaskModalContainer
          isOpen={this.state.modalOpen}
          open={this.open}
          close={this.close}
          {...directories}
          messages={messages}
        />
      </Segment>
    );
  }
}

TaskPanelComponent.propTypes = {
  tasks: PropTypes.array.isRequired,
  lang: PropTypes.object.isRequired,
  directories: PropTypes.object.isRequired,
};

export default TaskPanelComponent;

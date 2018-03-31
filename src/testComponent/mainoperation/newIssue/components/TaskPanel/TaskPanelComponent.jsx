import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Icon, Segment, Header } from 'semantic-ui-react';
import { NewTaskModalContainer } from '../NewTaskModal';

class TaskPanelComponent extends PureComponent {
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
    const { tasks } = this.props;
    return (
      <Segment>
        <Header as="h3" dividing>
          Задачи
        </Header>
        <Table structured celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Номер задачи</Table.HeaderCell>
              <Table.HeaderCell>Статус</Table.HeaderCell>
              <Table.HeaderCell>Приоритет</Table.HeaderCell>
              <Table.HeaderCell>Тема</Table.HeaderCell>
              <Table.HeaderCell>Назначена</Table.HeaderCell>
              <Table.HeaderCell>Обновлена</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              tasks &&
              tasks.map(task => (
                <Table.Row>
                  <Table.Cell>
                    <Link target="_blank" to={`/outCallTask/${task.id}`}>
                      {task.id}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{task.status.text}</Table.Cell>
                  <Table.Cell>{task.priority.text}</Table.Cell>
                  <Table.Cell>
                    <Link target="_blank" to={`/outCallTask/${task.id}`}>
                      {task.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>?</Table.Cell>
                  <Table.Cell>{task.modifiedAt}</Table.Cell>
                </Table.Row>
              ))
            }
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
                  <Icon name="file text" /> Новая задача
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        <NewTaskModalContainer
          isOpen={this.state.modalOpen}
          open={this.open}
          close={this.close}
          {...this.props.directories}
        />
      </Segment>
    );
  }
}

export default TaskPanelComponent;

import React, { PureComponent } from 'react';
import { Table, Button, Icon, Segment, Header } from 'semantic-ui-react';
import { NewTaskModalDisplay } from '../NewTaskModal';

class TaskPanelComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: true,
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
            <Table.Row>
              <Table.Cell>John Lilki</Table.Cell>
              <Table.Cell>September 14, 2013</Table.Cell>
              <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
              <Table.Cell>No</Table.Cell>
              <Table.Cell>No</Table.Cell>
              <Table.Cell>No</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Jamie Harington</Table.Cell>
              <Table.Cell>January 11, 2014</Table.Cell>
              <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
              <Table.Cell>Yes</Table.Cell>
              <Table.Cell>No</Table.Cell>
              <Table.Cell>No</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Jill Lewis</Table.Cell>
              <Table.Cell>May 11, 2014</Table.Cell>
              <Table.Cell>jilsewris22@yahoo.com</Table.Cell>
              <Table.Cell>Yes</Table.Cell>
              <Table.Cell>No</Table.Cell>
              <Table.Cell>No</Table.Cell>
            </Table.Row>
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
        <NewTaskModalDisplay
          isOpen={this.state.modalOpen}
          open={this.open}
          close={this.close}
        />
      </Segment>
    );
  }
}

export default TaskPanelComponent;

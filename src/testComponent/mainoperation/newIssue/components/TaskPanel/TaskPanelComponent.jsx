import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Table, Button, Icon, Segment, Header, Label } from 'semantic-ui-react';
import { NewTaskModalContainer } from '../NewTaskModal';
import { formatDateTime } from '../../../../../utils/helpers';
import { outCallStatusColorMap } from '../../../../../utils/constants';

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
    const { tasks, lang, directories } = this.props;
    return (
      <Segment>
        <Header as="h3" dividing>
          Задачи
        </Header>
        <Table structured celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell collapsing>#</Table.HeaderCell>
              <Table.HeaderCell collapsing>Статус</Table.HeaderCell>
              <Table.HeaderCell collapsing>Приоритет</Table.HeaderCell>
              <Table.HeaderCell>Тема</Table.HeaderCell>
              <Table.HeaderCell>Назначена</Table.HeaderCell>
              <Table.HeaderCell collapsing>Обновлена</Table.HeaderCell>
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
                  <Table.Cell>
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
                  <Table.Cell>{formatDateTime(task.modifiedAt)}</Table.Cell>
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
          {...directories}
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

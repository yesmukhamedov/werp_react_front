/* eslint linebreak-style: ["error", "windows"] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Form,
  Container,
  List,
  Grid,
  Header,
  Button,
  Segment,
  Dimmer,
  Loader,
  Label,
  Icon,
} from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';
import { LEGACY_URL } from '../../../../../../utils/constants';
import {
  formatDMYMS,
  constructFullName,
} from '../../../../../../utils/helpers';
import { AttachmentPanelDisplay } from '../../../../../../general/dtskc/pages';
import { TaskAttachmentModalContainer } from '../TaskAttachmentModal';

class TaskInfoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };

    this.handleEditModal = this.handleEditModal.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleEditModal() {
    // console.log("handleEditModal()")
    this.setState({
      modalOpen: true,
    });
  }

  handleModalClose() {
    this.setState({
      modalOpen: false,
    });
  }

  render() {
    if (this.props.id) {
      const {
        contractNumber,
        title,
        author,
        authorsManager,
        status,
        priority,
        recipient,
        createdAt,
        description,
        TaskEditContainer,
        attachment = {},
        lang,
        modalAttachment,
        toggleModal,
        uploadble,
      } = this.props;

      const closedAt =
        status.id === 5 ? (
          formatDMYMS(this.props.modifiedAt)
        ) : (
          <span>&mdash;</span>
        );

      return (
        <Segment.Group>
          <Segment clearing>
            <Header as="h2" floated="left">
              Задача #{' '}
              <Label as="a" basic size="big">
                {this.props.id}
              </Label>
            </Header>
            <Header as="h4" floated="right">
              <Button
                style={{ background: 'rgba(84,170,169, 1)', color: 'white' }}
                onClick={this.handleEditModal}
              >
                <Icon name="edit" />Редактировать
              </Button>
            </Header>
          </Segment>
          <Segment padded color="grey">
            <Form>
              <Grid stackable>
                <Grid.Row>
                  <Grid.Column>
                    <Header as="h3">
                      {title}
                      <Header.Subheader>
                        Добавил(а) <a> {author && constructFullName(author)}</a>
                      </Header.Subheader>
                    </Header>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={4}>
                  <Grid.Column width={2}>
                    <List verticalAlign="middle" relaxed>
                      <List.Item>
                        <List.Header>Статус:</List.Header>
                      </List.Item>
                      <List.Item>
                        <List.Header>Приоритет:</List.Header>
                      </List.Item>
                      <List.Item>
                        <List.Header>Назначена:</List.Header>
                      </List.Item>
                    </List>
                  </Grid.Column>
                  <Grid.Column width={6}>
                    <List verticalAlign="middle" relaxed>
                      <List.Item>
                        <List.Content>{status[lang]}</List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content>{priority[lang]}</List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content>
                          {recipient.branch && recipient.branch.value} - 
                          {recipient.department && recipient.department.value}
                          {/* {recipient.position && recipient.position.value} */}
                        </List.Content>
                      </List.Item>
                    </List>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <List verticalAlign="middle" relaxed>
                      <List.Item>
                        <List.Header>Дата начала:</List.Header>
                      </List.Item>
                      <List.Item>
                        <List.Header>Дата завершения:</List.Header>
                      </List.Item>
                      <List.Item>
                        <List.Header>Номер договора:</List.Header>
                      </List.Item>
                    </List>
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <List verticalAlign="middle" relaxed>
                      <List.Item>
                        <List.Content>{formatDMYMS(createdAt)}</List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content>{closedAt}</List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content>
                          <Link
                            target="_blank"
                            to={`${LEGACY_URL}/dms/contract/dmsc03.xhtml?contract_id=${contractNumber}`}
                          >
                            {contractNumber}
                          </Link>
                        </List.Content>
                      </List.Item>
                    </List>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column width={4}>
                    <List verticalAlign="middle" relaxed>
                      <List.Item>
                        <List.Header>Начальник отдела заказчика:</List.Header>
                      </List.Item>
                      <List.Item>
                        <List.Header>Начальник отдела исполнителя:</List.Header>
                      </List.Item>
                      <List.Item>
                        <List.Header>Исполнитель:</List.Header>
                      </List.Item>
                    </List>
                  </Grid.Column>
                  <Grid.Column>
                    <List verticalAlign="middle" relaxed>
                      <List.Item>
                        <List.Content>
                          {authorsManager ? (
                            constructFullName(authorsManager)
                          ) : (
                            <span>&mdash;</span>
                          )}
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content>
                          {recipient.assigneesManager ? (
                            recipient.assigneesManager.value
                          ) : (
                            <span>&mdash;</span>
                          )}
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content>
                          {recipient.assignee ? (
                            recipient.assignee.value
                          ) : (
                            <span>&mdash;</span>
                          )}
                        </List.Content>
                      </List.Item>
                    </List>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    {/* <Form.TextArea label="Описание" value={description} /> */}
                    <Container>
                      <Header as="h4">Описание</Header>
                      <p>{description}</p>
                    </Container>
                  </Grid.Column>
                </Grid.Row>
                {
                  uploadble &&
                  <Grid.Row>
                    <Grid.Column>
                      <Button
                        icon="edit"
                        size="tiny"
                        floated="right"
                        color="twitter"
                        content="Редактировать"
                        onClick={() => toggleModal(modalAttachment)}
                      />
                      <AttachmentPanelDisplay attachment={attachment.attachmentJson} />
                    </Grid.Column>
                  </Grid.Row>
                }
              </Grid>
            </Form>
          </Segment>
          <TaskEditContainer
            modalOpen={this.state.modalOpen}
            handleClose={this.handleModalClose}
            {...this.props}
          />
          <TaskAttachmentModalContainer />
        </Segment.Group>
      );
    }
    return (
      <Dimmer active>
        <Loader indeterminate>Fetching task details...</Loader>
      </Dimmer>
    );
  }
}

TaskInfoComponent.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  status: PropTypes.object,
  priority: PropTypes.object,
  recipient: PropTypes.object,
  author: PropTypes.object,
  description: PropTypes.string,
  createdAt: PropTypes.string,
  modifiedAt: PropTypes.string,
  lang: PropTypes.string,
  TaskEditContainer: PropTypes.func,
};

export default TaskInfoComponent;

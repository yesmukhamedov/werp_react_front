/* eslint linebreak-style: ["error", "windows"] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Form, Input, Dropdown, List, Grid, Header, Button, Segment, Dimmer, Loader, Label, Icon, TextArea, Radio, Checkbox } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TaskEditModal from '../TaskEdit/TaskEditModal';

class TaskInfoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };

    this.handleEditModal = this.handleEditModal.bind(this);
  }

  handleEditModal() {
    console.log("handleEditModal()")
    this.setState({ 
      modalOpen: true
   })
  }

  handleModalClose = () => {this.setState({ modalOpen: false, modalData: null })}

  render() {
    return (
        <Segment.Group>
          <Segment clearing>
            <Header as="h2" floated="left">
              Задача #<Label>214</Label>
            </Header>
            <Header as="h4" floated="right">
              {/* <Checkbox label="Редактировать" slider /> */}
              <Button style={{background: 'rgba(84,170,169, 1)', color: 'white' }}
                onClick={this.handleEditModal}>
                <Icon name='edit' />Редактировать
              </Button>
            </Header>
          </Segment>
          <Segment padded color='grey'>
            <Form>
              <Grid stackable>
                <Grid.Row>
                  <Grid.Column>
                  <Header as='h3'>
                    Клиент недоволен качеством ремонта
                    <Header.Subheader>
                      Добавил(а) <a> Almer Bolatov </a>
                    </Header.Subheader>
                  </Header>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={4}>
                  <Grid.Column width={2}>                
                    <List verticalAlign='middle' relaxed>
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
                    <List verticalAlign='middle' relaxed>
                      <List.Item>
                        <List.Content>
                          In progress
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content>
                          High
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content>
                          Алматы - Маркетинг - Начальник отдела
                        </List.Content>
                      </List.Item>
                    </List>
                  </Grid.Column>
                  <Grid.Column width={3}>                
                    <List verticalAlign='middle' relaxed>
                      <List.Item>
                        <List.Header>Дата начала:</List.Header>
                      </List.Item>
                      <List.Item>                      
                        <List.Header>Дата завершения:</List.Header>
                      </List.Item>                      
                    </List>
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <List verticalAlign='middle' relaxed>
                      <List.Item>
                        <List.Content>
                          31.10.2016
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content>
                          31.10.2017
                        </List.Content>
                      </List.Item>
                    </List>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>                  
                    <Form.TextArea label='Описание' placeholder='Tell us more about you...' />                  
                  </Grid.Column>
                </Grid.Row>            
              </Grid>
            </Form>
          </Segment>
          <TaskEditModal 
            modalOpen={this.state.modalOpen} 
            //modalType={this.state.modalType}
            //userType={???}
            //modalData={this.state.modalData}
            handleClose={this.handleModalClose}
            //handleMsgOpen={this.handleMsgOpen}
          />
        </Segment.Group>        
    );
  }
}

export default TaskInfoComponent;

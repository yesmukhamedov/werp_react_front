/* eslint linebreak-style: ["error", "windows"] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Form, Dropdown, Grid, Header, Button, Segment, Dimmer, Loader, Label, Icon, TextArea, Radio, Checkbox } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class TaskInfoComponent extends Component {

  render() {
    return (
      <Form onSubmit={this.handleSearch}>
        <Segment padded size="small">
          {/* <Label as="a" attached="top">
            Задача:<Label.Detail>214</Label.Detail>       
          </Label> */}          
          <Grid stackable>
            <Grid.Row>
              <Grid.Column>
                <Header as='h3' floated='left'>
                Задача:<Label>214</Label>
                </Header>
                <Header as='h4' floated='right'>
                   <Checkbox label='Изменить' slider />
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form.Field
                  label="Тема"
                  control="input"
                  //value="{contractNumber}"
                />
                <Form.Field
                  label="Назначена"
                  control="input"
                 // value="{contractNumber}"
                />
                
              </Grid.Column>
              <Grid.Column>
                <Form.Group widths='equal'>
                  <Form.Field
                    label="Статус"
                    control="input"
                    //value="{contractNumber}"
                  />
                  <Form.Field
                    label="Приоритет"
                    control="input"
                    //value="{contractNumber}"
                  />
                  <Form.Field
                    label="Создан"
                    control="input"
                    //value="{contractNumber}"
                  />
                </Form.Group>
                <Form.Field
                  label="Автор"
                  control="input"
                  //value="{contractNumber}"
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Form.Field control={TextArea} autoHeight label='Описание' />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Form.Button disabled = {true}
                  content="Применить"
                  floated='right'
                  style={
                    { background: 'rgba(84,170,169, 1)', color: 'white' }}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Form>
    );
  }
}

export default TaskInfoComponent;

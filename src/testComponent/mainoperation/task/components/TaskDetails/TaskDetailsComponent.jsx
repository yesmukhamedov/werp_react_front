/* eslint linebreak-style: ["error", "windows"] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Form, Input, Comment, Dropdown, List, Grid, Header, Button, Segment, Dimmer, Loader, Label, Icon, TextArea, Radio, Checkbox } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class TaskDetailsComponent extends Component {

  render() {
    return (
      <Segment padded color='grey'>
        <Comment.Group>
          <Header as='h3' dividing>History</Header>
      
          <Comment>
            <Comment.Content>
              <Comment.Author as='a'>Matt</Comment.Author>
              <Comment.Metadata>
                <div>Today at 5:42PM</div>
              </Comment.Metadata>
              <Comment.Text>How artistic!</Comment.Text>
            </Comment.Content>
          </Comment>
      
          <Comment>
            <Comment.Content>
              <Comment.Author as='a'>Elliot Fu</Comment.Author>
              <Comment.Metadata>
                <div>Yesterday at 12:30AM</div>
              </Comment.Metadata>
              <Comment.Text>
                <p>This has been very useful for my research. Thanks as well!</p>
              </Comment.Text>
            </Comment.Content>            
          </Comment>
      
          <Comment>
            <Comment.Content>
              <Comment.Author as='a'>Joe Henderson</Comment.Author>
              <Comment.Metadata>
                <div>5 days ago</div>
              </Comment.Metadata>
              <Comment.Text>
                Dude, this is awesome. Thanks so much
              </Comment.Text>
            </Comment.Content>
          </Comment>
        </Comment.Group>
      </Segment>
    );
  }
}

export default TaskDetailsComponent;

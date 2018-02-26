import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment } from 'semantic-ui-react';
import { TaskPanelDisplay } from '../TaskPanel';
import { OutCallDetailsPanelDisplay } from '../OutCallDetailsPanel';

const TaskTrackerPanelDisplay = props => (
  <Segment>
    <Grid divided="vertically" stackable>
      <Grid.Row columns={2}>
        <Grid.Column>
          <TaskPanelDisplay />
        </Grid.Column>
        <Grid.Column>
          <OutCallDetailsPanelDisplay />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
);

TaskTrackerPanelDisplay.propTypes = {

};

export default TaskTrackerPanelDisplay;

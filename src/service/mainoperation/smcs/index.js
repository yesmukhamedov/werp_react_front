import React from 'react';
import 'react-table/react-table.css';
import { HeaderSmcs, SmcsLeftPart, SmcsRightPart } from './component';
import { Segment, Grid } from 'semantic-ui-react';

const Smcs = () => {
  return (
    <div>
      <HeaderSmcs />
      <Segment>
        <Grid celled>
          <Grid.Row columns={2}>
            <Grid.Column width={6}>
              <SmcsLeftPart />
            </Grid.Column>
            <Grid.Column width={10}>
              <SmcsRightPart />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};

export default Smcs;

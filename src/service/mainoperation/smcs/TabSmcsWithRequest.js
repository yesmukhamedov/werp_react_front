import React from 'react';
import { Segment, Grid, Form, Button } from 'semantic-ui-react';

const TabSmcsWithRequest = () => {
  return (
    <Form>
      <Grid>
        <Grid.Row>
          <Grid.Column width={5}>
            <Segment>
              <h1>Basic info</h1>
            </Segment>
          </Grid.Column>
          <Grid.Column width={11}>
            <Segment>
              <h1>Setting</h1>
              <Button type="submit" primary>
                Сохранить
              </Button>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  );
};

export default TabSmcsWithRequest;

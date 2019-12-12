import React from 'react';
import { Segment, Grid, Button } from 'semantic-ui-react';
import 'react-table/react-table.css';
import { SmesFilter, SmesData } from './Components';
import './../../service.css';

function Smes() {
  return (
    <Grid className="gridMain">
      <Grid.Row columns={2} style={{ padding: '0' }}>
        <Grid.Column width={6}>
          <SmesFilter />
        </Grid.Column>

        <Grid.Column width={10}>
          <SmesData />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Smes;

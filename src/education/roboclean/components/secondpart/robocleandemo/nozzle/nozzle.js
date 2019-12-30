import React from 'react';
import { Container, Grid, Image } from 'semantic-ui-react';

import './nozzle.css';

// import nozzle1 from '../../../../assets/11.png';

export default function Nozzle() {
  return (
    <div className="nozzle">
      <Container>
        <h1 className="nozzle__name">11. Насадкаларды таныстыру</h1>
        <Grid>
          <Grid.Column width="8">
            <p className="nozzle__content">
              Қалған насадкалардың әр қайсысын қалай қолданатындығы үйретіледі.
            </p>
          </Grid.Column>
          <Grid.Column width="8">
            {/* <Image src={nozzle1} alt="nozzle1" size="big" /> */}
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}

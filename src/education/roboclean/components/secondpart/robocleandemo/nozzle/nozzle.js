import React from 'react';
import { Container, Grid, Image } from 'semantic-ui-react';

import './nozzle.css';
import '../../../back.css';
import { EDU_ROBO_ASSETS_URL } from '../../../../../../utils/constants';

export default function Nozzle() {
  return (
    <div className="nozzle back">
      <Container>
        <h1 className="nozzle__name">11. Насадкаларды таныстыру</h1>
        <Grid>
          <Grid.Column width="8">
            <p className="nozzle__content">
              Қалған насадкалардың әр қайсысын қалай қолданатындығы үйретіледі.
            </p>
          </Grid.Column>
          <Grid.Column width="8">
            <Image
              src={`${EDU_ROBO_ASSETS_URL}11.png`}
              alt="nozzle1"
              size="big"
            />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}

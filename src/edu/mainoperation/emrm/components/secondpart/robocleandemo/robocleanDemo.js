import React from 'react';
import { Container, Grid, Image } from 'semantic-ui-react';

import { EDU_ROBO_ASSETS_URL } from '../../../../../../utils/constants';
import './robocleanDemo.css';
import '../../back.css';

export default function RobocleanDemo(props) {
  return (
    <div className="roboclean back">
      <Container>
        <h1 className="roboclean__name">1) Roboclean демо обучениясы.</h1>
        <Grid columns={2} textAlign="justified" verticalAlign="middle">
          <Grid.Column className="roboclean__content">
            <p
              onClick={() => {
                props.getLink('intro');
              }}
            >
              1. Introduction
            </p>
            <p
              onClick={() => {
                props.getLink('lampshow');
              }}
            >
              2. Lamp show
            </p>
            <p
              onClick={() => {
                props.getLink('airwash');
              }}
            >
              3. Air wash
            </p>
            <p
              onClick={() => {
                props.getLink('vackill');
              }}
            >
              4. Vac kill
            </p>
            <p
              onClick={() => {
                props.getLink('minivac');
              }}
            >
              5. Mini vac
            </p>
            <p
              onClick={() => {
                props.getLink('visualizer');
              }}
            >
              6. Visualizer
            </p>
            <p
              onClick={() => {
                props.getLink('vacuum');
              }}
            >
              7. Vacuum
            </p>
            <p
              onClick={() => {
                props.getLink('carpetshow');
              }}
            >
              8. Carpet show
            </p>
            <p
              onClick={() => {
                props.getLink('mattress');
              }}
            >
              9. Матрас show
            </p>
            <p
              onClick={() => {
                props.getLink('washfunc');
              }}
            >
              10. Жуу функциясы
            </p>
            <p
              onClick={() => {
                props.getLink('nozzle');
              }}
            >
              11. Насадкалармен таныстыру
            </p>
          </Grid.Column>
          <Grid.Column className="roboclean__image">
            <Image
              src={`${EDU_ROBO_ASSETS_URL}r1.png`}
              alt="r1"
              size="massive"
              centered
            />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}

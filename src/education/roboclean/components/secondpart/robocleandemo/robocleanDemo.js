import React from 'react';
import { Container, Grid, Image } from 'semantic-ui-react';

// import r1 from '../../../assets/r1.png';
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
                props.history.push('/edu/roboclean/robocleandemo/intro');
              }}
            >
              1. Introduction
            </p>
            <p
              onClick={() => {
                props.history.push('/edu/roboclean/robocleandemo/lampshow');
              }}
            >
              2. Lamp show
            </p>
            <p
              onClick={() => {
                props.history.push('/edu/roboclean/robocleandemo/airwash');
              }}
            >
              3. Air wash
            </p>
            <p
              onClick={() => {
                props.history.push('/edu/roboclean/robocleandemo/vackill');
              }}
            >
              4. Vac kill
            </p>
            <p
              onClick={() => {
                props.history.push('/edu/roboclean/robocleandemo/minivac');
              }}
            >
              5. Mini vac
            </p>
            <p
              onClick={() => {
                props.history.push('/edu/roboclean/robocleandemo/visualizer');
              }}
            >
              6. Visualizer
            </p>
            <p
              onClick={() => {
                props.history.push('/edu/roboclean/robocleandemo/vacuum');
              }}
            >
              7. Vacuum
            </p>
            <p
              onClick={() => {
                props.history.push('/edu/roboclean/robocleandemo/carpetshow');
              }}
            >
              8. Carpet show
            </p>
            <p
              onClick={() => {
                props.history.push('/edu/roboclean/robocleandemo/mattress');
              }}
            >
              9. Матрас show
            </p>
            <p
              onClick={() => {
                props.history.push('/edu/roboclean/robocleandemo/washfunc');
              }}
            >
              10. Жуу функциясы
            </p>
            <p
              onClick={() => {
                props.history.push('/edu/roboclean/robocleandemo/nozzle');
              }}
            >
              11. Насадкалармен таныстыру
            </p>
          </Grid.Column>
          <Grid.Column className="roboclean__image">
            {/* <Image src={r1} alt="r1" size="large" centered /> */}
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}

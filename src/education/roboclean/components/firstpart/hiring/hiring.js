import React from 'react';
import { Container, Grid, Image } from 'semantic-ui-react';

import './hiring.css';
import '../../back.css';
import { EDU_ROBO_ASSETS_URL } from '../../../../../utils/constants';

export default function Hiring() {
  return (
    <div className="hiring back">
      <Container>
        <h1 className="hiring__name">1) Жұмыс іздеушіні жұмысқа қабылдау.</h1>
        <Grid columns={2} textAlign="justified" verticalAlign="middle">
          <Grid.Column>
            <p className="hiring__content">
              &nbsp;Жаңа келген баланың резюмесі көріледі. Қосымша сұрақтар қою
              арқылы жұмысқа қабылданушымен жақын танысып, ортақ тақырыпта
              әңгіме қозғалады (туып өскен жері, отбасы, оқыған жері, бұрынғы
              істеген жұмыстары, тәжірбиесі, хоббиі, болашақтағы мақсаты т.б.
              сұрақтар). Жұмысқа қабылданушының мағлұматтарын ала отырып,
              адалдығы, әдептілігі, іскерлігі ескеріледі. Жұмысқа қабылданған әр
              бір дилер адалдығы мен еңбекқорлығына қаралып, болашақта қабілетті
              бизнесмен шығады деген сеніммен жұмысқа қабылданады.
            </p>
          </Grid.Column>
          <Grid.Column className="hiring__image">
            <Image
              src={`${EDU_ROBO_ASSETS_URL}u30.jpg`}
              alt="image"
              size="large"
              centered
            />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}

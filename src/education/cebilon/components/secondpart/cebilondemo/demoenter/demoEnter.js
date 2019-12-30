import React from 'react';
import { Container, Accordion, Image, Grid } from 'semantic-ui-react';

import './demoEnter.css';
// import image from '../../../../assets/2.1.jpg';

export default function DemoEnter() {
  return (
    <div className="demoenter">
      <Container>
        <h1 className="demoenter__name">
          1) Жұмыс іздеушіні жұмысқа қабылдау.
        </h1>
        <Grid columns={2} textAlign="justified" verticalAlign="middle">
          <Grid.Column>
            <p className="demoenter__content">
              &nbsp;Бұл бөлімнің мақсаты - клиенттің күнделікті ішуге,
              шәй-тамаққа қандай су қолданатынын білу.
              <i>
                Жалпы медицина мамандары салауатты өмір сүру үшін мына үш
                нәрсеге назар аударуымызға кеңес береді: 1. ішетін ауыз суымыз
                2. күнделікті жейтін тағамдарымыз 3. тыныс алып жатқан ауамыз
                таза және қауіпсіз болуы керек. Адам баласына ауа қаншалықты
                керек болса, судың да соншалықты қажеттiлігi бар. Өйткені адам
                баласының өмірі, туылған сәттен бастап өмірінің аяғына дейінгі
                әр бір сәті сумен тығыз байланыста. Сондықтан күнделікті ішіп
                отырған ауыз{' '}
              </i>
            </p>
          </Grid.Column>
          <Grid.Column className="demoenter__image">
            {/* <Image src={image} alt="image" size="large" centered /> */}
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}

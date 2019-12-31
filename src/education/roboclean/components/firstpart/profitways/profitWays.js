import React from 'react';
import { Container, Grid, Image } from 'semantic-ui-react';
import { EDU_ROBO_ASSETS_URL } from '../../../../../utils/constants';
import './profit.css';
import '../../back.css';

export default function ProfitWays() {
  return (
    <div className="profit back">
      <Container>
        <h1 className="profit__name">5) Табыс табудың жолдары .</h1>
        <Grid textAlign="justified" verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width="8" className="profit__content">
              <p>
                {' '}
                &nbsp; Табыс табудың әртүрлі жолдары бар;
                <br />
                <br />
                1. Егіншілік
                <br />
                2. Мал шаруашылығы
                <br />
                3. Қол өнер
                <br />
                4. Сауда
                <br />
                5. Айлыққа жұмыс
                <br />
                6. Қайыршылық
                <br />
                <br />
              </p>
            </Grid.Column>
            <Grid.Column width="8" className="profit__image">
              <Image
                src={`${EDU_ROBO_ASSETS_URL}u34.jpg`}
                alt="u34"
                size="large"
                centered
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column className="profit__content">
              <p>
                Осылардың ішіндегі табыстың көзі болып табылатыны – САУДА.
                <br />
                Саудада табыс табу белгілі мөлшермен шектеліп қалмайды. Айлықпен
                жұмыс істеген адам сол бір айлығына қарай шығындарын есептеп,
                сол бойынша өмір сүреді. Ол қанша көп еңбектенсе де сол айлығын
                алады. Ал бизнес саласында қаншалықты көп еңбектеніп, әр уақытта
                өзін жетілдірсе, соншалықты көп табысқа қол жеткізуге болады.
                Бұл салада мол табысқа кедергі келтіретін жалқаулық пен
                қорқақтық. Әлемге назар салсақ бизнесте алда болған елдерің
                экономикасының жақсы дамығандығын, ал бизнесі дамымаған елдердің
                экономикасының артта қалғандығын көруге болады.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
}

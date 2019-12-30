import React from 'react';
import { Container, Grid, Image } from 'semantic-ui-react';

// import u32 from '../../../assets/u32.jpg';
import './acquaintance.css';

export default function AquaintanceWork() {
  return (
    <div className="acquaintance">
      <Container>
        <h1 className="acquaintance__name">3) Жұмыс барысымен танысу.</h1>
        <Grid columns={2} textAlign="justified" verticalAlign="middle">
          <Grid.Column className="acquaintance__content">
            <p>
              {' '}
              &nbsp; Офис ішінде маркетинг бөлімі директор, менеджер, дилер,
              демосекретарьдан тұрады. Күнделікті жұмыс басталу уақыты 10:30,
              біту уақыты 21:00 де немесе соңғы демонстрацияға дейн. Клиентке
              аппаратты апарып таныстыру демонстрация деп аталады. Демострация
              кезінде клиенттен рекомендация алынады. Алынған рекомендациямен
              келесі демонстрацияны шығарып, дилер жұмысын жалғастырады.
              Демосекретарь демонстрация шығаруда дилерге көмекші болады. Жұмыс
              менеджерлік жүйеде атқарылады. Жұмыс уақытында офистің ішкі
              тәртібіне және менеджерге бағынылады.
              <br />
              &nbsp; Бұларға қосымша компанияның мақсаты, ішкі әдептілік
              нормаларымен де танысу керек.
            </p>
          </Grid.Column>
          <Grid.Column className="acquaintance__image">
            {/* <Image src={u32} alt="u32" size="large" centered /> */}
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}

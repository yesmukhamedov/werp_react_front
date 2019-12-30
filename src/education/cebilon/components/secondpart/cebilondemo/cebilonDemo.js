import React from 'react';
import { Container, Grid, Image } from 'semantic-ui-react';

// import с1 from '../../../assets/с1.png';
import './cebilonDemo.css';

export default function CebilonDemo(props) {
  return (
    <div className="cebilon">
      <Container>
        <h1 className="cebilon__name">1) Cebilon демо обучениясы.</h1>
        <Grid columns={2} textAlign="justified" verticalAlign="middle">
          <Grid.Column className="cebilon__content">
            <p
              onClick={() => {
                props.history.push('/edu/cebilon/cebilondemo/intro');
              }}
            >
              1. Introduction
            </p>
            <p
              onClick={() => {
                props.history.push('/edu/cebilon/cebilondemo/demoenter');
              }}
            >
              2. Демоға кіру.
            </p>
            <p
              onClick={() => {
                props.history.push('/edu/cebilon/cebilondemo/penury');
              }}
            >
              3. Қажеттілік туғызу.
            </p>
            <p
              onClick={() => {
                props.history.push('/edu/cebilon/cebilondemo/waterproblem');
              }}
            >
              4. Ауыз су проблемасы.
            </p>
            <p
              onClick={() => {
                props.history.push('/edu/cebilon/cebilondemo/introdevice');
              }}
            >
              5. Аппаратты таныстыру.
            </p>
            <p
              onClick={() => {
                props.history.push('/edu/cebilon/cebilondemo/tasting');
              }}
            >
              6. Дегустация.
            </p>
            <p
              onClick={() => {
                props.history.push('/edu/cebilon/cebilondemo/tds');
              }}
            >
              7. ТДС метр.
            </p>
            <p
              onClick={() => {
                props.history.push('/edu/cebilon/cebilondemo/fingershow');
              }}
            >
              8. Саусақ шоу.
            </p>
            <p
              onClick={() => {
                props.history.push('/edu/cebilon/cebilondemo/waterscale');
              }}
            >
              9. Судың кермектігі.
            </p>
            <p
              onClick={() => {
                props.history.push('/edu/cebilon/cebilondemo/chlorine');
              }}
            >
              10. Хлор тесті.
            </p>
            <p
              onClick={() => {
                props.history.push('/edu/cebilon/cebilondemo/electro');
              }}
            >
              11. Электролиз
            </p>
            <p
              onClick={() => {
                props.history.push('/edu/cebilon/cebilondemo/napkinshow');
              }}
            >
              12. Салфетка шоу.
            </p>
            <p
              onClick={() => {
                props.history.push('/edu/cebilon/cebilondemo/cebilonunique');
              }}
            >
              А) «Cebilon Unique» аппаратының ерекшеліктері мен сертификаттары.
            </p>
            <p
              onClick={() => {
                props.history.push('/edu/cebilon/cebilondemo/harm');
              }}
            >
              B) Пластик бөтелкенің зияны
            </p>
          </Grid.Column>
          <Grid.Column className="cebilon__image">
            {/* <Image src={с1} alt="с1" size="large" centered /> */}
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}

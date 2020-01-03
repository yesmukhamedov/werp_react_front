import React, { useState } from 'react';
import { Container, Grid, Image } from 'semantic-ui-react';

import { EDU_CEB_ASSETS_URL } from '../../../../../../utils/constants';
import './cebilonDemo.css';
import '../../back.css';

export default function CebilonDemo(props) {
  return (
    <div className="cebilon back">
      <Container>
        <h1 className="cebilon__name">1) Cebilon демо обучениясы.</h1>
        <Grid columns={2} textAlign="justified" verticalAlign="middle">
          <Grid.Column className="cebilon__content">
            <p
              onClick={() => {
                props.getLink('intro');
              }}
            >
              1. Introduction
            </p>
            <p
              onClick={() => {
                props.getLink('demoenter');
              }}
            >
              2. Демоға кіру.
            </p>
            <p
              onClick={() => {
                props.getLink('penury');
              }}
            >
              3. Қажеттілік туғызу.
            </p>
            <p
              onClick={() => {
                props.getLink('waterproblem');
              }}
            >
              4. Ауыз су проблемасы.
            </p>
            <p
              onClick={() => {
                props.getLink('introdevice');
              }}
            >
              5. Аппаратты таныстыру.
            </p>
            <p
              onClick={() => {
                props.getLink('tasting');
              }}
            >
              6. Дегустация.
            </p>
            <p
              onClick={() => {
                props.getLink('tds');
              }}
            >
              7. ТДС метр.
            </p>
            <p
              onClick={() => {
                props.getLink('fingershow');
              }}
            >
              8. Саусақ шоу.
            </p>
            <p
              onClick={() => {
                props.getLink('waterscale');
              }}
            >
              9. Судың кермектігі.
            </p>
            <p
              onClick={() => {
                props.getLink('chlorine');
              }}
            >
              10. Хлор тесті.
            </p>
            <p
              onClick={() => {
                props.getLink('electro');
              }}
            >
              11. Электролиз
            </p>
            <p
              onClick={() => {
                props.getLink('napkinshow');
              }}
            >
              12. Салфетка шоу.
            </p>
            <p
              onClick={() => {
                props.getLink('cebilonunique');
              }}
            >
              А) «Cebilon Unique» аппаратының ерекшеліктері мен сертификаттары.
            </p>
            <p
              onClick={() => {
                props.getLink('harm');
              }}
            >
              B) Пластик бөтелкенің зияны
            </p>
          </Grid.Column>
          <Grid.Column className="cebilon__image">
            <Image
              src={`${EDU_CEB_ASSETS_URL}c1.png`}
              alt="с1"
              size="large"
              centered
            />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}

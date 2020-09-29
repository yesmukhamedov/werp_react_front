import React from 'react';
import { Container, Grid, Accordion, Image } from 'semantic-ui-react';

import './napkinShow.css';
import '../../../back.css';

import { EDU_CEB_ASSETS_URL } from '../../../../../../../utils/constants';

export default function NapkinShow() {
  return (
    <div className="napkin back">
      <Container textAlign="justified">
        <h1 className="napkin__name">12. Салфетка шоу</h1>
        <p className="napkin__content">
          &nbsp; &nbsp; Бұл бөлімнің мақсаты - электролиз нәтижесінде шыққан
          судың құрамындағы лас заттарды салфетканың көмегімен көрсете отырып,
          денсаулыққа зиянын толықтай түсіндіру.
        </p>
        <Accordion fluid styled className="napkin__content__acc">
          <Accordion.Title>12.1. Салфетканы пайдалану.</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  <i>
                    &nbsp; Адам баласы туылған кезде бүкіл ағзамыз,
                    бүйректеріміз мына екі салфетка сияқты таза болады.
                    <br />
                  </i>
                  (Салфеткамен лас суды сүзіп алып)
                  <i>
                    &nbsp;Ал енді мұндай сапасыз, лас суды ішудің кесірінен (лас
                    салфетканы көрсетіп) мына ластықтың барлығы біздің ағзамызға
                    жиналып жатыр. Мына сүретте жаңа фильтр мен қолданылған
                    фильтрлер көрсетілген. Қаламыздағы судың ластығы соншалық,
                    бұл фильтрлер не бәрі алты ай мен бір жыл арасында бітеліп,
                    мынандай халге келуде. Ал енді біздің бүйректеріміз, қан
                    тамырларымыз бұл судың ластығына тағы қанша шыдау мүмкін.
                  </i>
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                <Image
                  src={`${EDU_CEB_ASSETS_URL}12.1.jpg`}
                  alt="napkin1"
                  size="big"
                />
              </Grid.Column>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>12.2. Мысалдар келтіру.</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  <i>
                    &nbsp; Айтып өткен бүйрек аурулары, cеміздік, гастрит,
                    гипертония, онкология сияқты аурулардың барлығына осындай
                    сапасыз лас су себеп болуда. Әсіресе олардың ішінде ең қатты
                    зардап шегетін біздің бүйректеріміз. Өйткені бүйрек
                    ағзамызда фильтр қызметін атқарып, күніне 1800 литр қан
                    тазалайды. Таңқаларлық осыншама үлкен қызметті атқаратын,
                    жұдырықтай ғана 150 грамдық бүйрек, мынандай лас судың
                    кесірінен өз жұмысын қалай дұрыс атқарсын?
                  </i>
                </p>
                <p>
                  <i>
                    &nbsp;Ал «Cebilon Unique» аппаратының көмегімен бұл
                    ластықтың барлығы тазаланып, мынадай таза әрі мөлдір
                    бұлақтың суын ішетін боламыз. Көріп тұрғаныңыздай фильтр
                    суында ешқандай ластық жоқ.
                  </i>
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                <Image
                  src={`${EDU_CEB_ASSETS_URL}12.2.jpg`}
                  alt="napkin2"
                  size="big"
                />
              </Grid.Column>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>12.3. Қорытынды. </Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  <i>
                    &nbsp; Даулет, ақиқатты көріп тұрған кездегі шешім, ең дұрыс
                    шешім болып табылады. «Cebilon Unique» аппаратының көмегімен
                    75 пайыз судан тұратын ағзамызды таза сумен қоректендіріп,
                    атап өткен аурулардың барлығынан өз отбасымызды қорғаған
                    боламыз. Даулет Айдана, бала шағаның денсаулығы мен келешегі
                    үшін, үйімізде мөлдір бұлақтың суы бүгіннен бастап ағып
                    тұруы үшін, сіздерге қандай көмек бере аламын?
                  </i>
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                <Image
                  src={`${EDU_CEB_ASSETS_URL}12.3.jpg`}
                  alt="napkin3"
                  size="big"
                />
              </Grid.Column>
            </Grid>
          </Accordion.Content>
        </Accordion>
      </Container>
    </div>
  );
}

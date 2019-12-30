import React from 'react';
import { Container, Grid, Accordion, Image } from 'semantic-ui-react';

import './tasting.css';

// import tasting1 from '../../../../assets/6.1.jpg';
// import tasting2 from '../../../../assets/6.2.jpg';
// import tasting3 from '../../../../assets/6.3.jpg';
// import tasting4 from '../../../../assets/6.4.jpg';

export default function Tasting() {
  return (
    <div className="tasting">
      <Container textAlign="justified">
        <h1 className="tasting__name">6. Дегустация</h1>
        <p className="tasting__content">
          &nbsp; &nbsp; Бұл бөлімнің мақсаты - кран және Сеbilon суының дәмін
          татқызып, айырмашылығын айта келе денсаулыққа тигізер әсерін
          түсіндіру.
        </p>
        <Accordion fluid styled className="tasting__content__acc">
          <Accordion.Title>6.1 Кіріспе.</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  (Демо чемоданды қосады)
                  <i>
                    &nbsp; Бұл анализ көрсетуге арналған «Cebilon Unique»
                    аппаратының кішігірім түрі. Міне қараңыздар, аппаратымызды
                    қостық. Мынау көріп тұрған помпа көмегімен аппарат банкідегі
                    суды тартып жатыр. Ең алдымен мына үш фильтр арқылы суымыз
                    механикалық ірі заттардан тазарады. Әрі қарай мына кері
                    осмостық мембранаға келген су, молекулярлық деңгейде
                    тазаланып, таза су мына резервуарға жиналып жатыр, ал лас су
                    мына шланга арқылы канализацияға кетіп жатыр.
                  </i>
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                {/* <Image src={tasting1} alt="tasting1" size="big" /> */}
              </Grid.Column>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>
            6.2. Екі судың айырмашылығын көрсету.
          </Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Row>
                <Grid.Column width="8" verticalAlign="middle">
                  <p>
                    <br />
                    <i>
                      &nbsp; Міне көріп тұрғаныңыздай суларымыз дайын болды.
                      Біреуі кран суы, ал мынау «Cebilon Unique» аппаратынан
                      шыққан таза мөлдір бұлақ суы. Даулет Айдана, (стакандарды
                      жоғары көтеріп) мұқият қараңыздаршы, мына екі судың
                      түсінде айырмашылық байқала ма? Дұрыс айтасыздар, екі
                      стакандағы судың түсінде үлкен айырмашылық бар. Енді бұл
                      суларды арнайы приборлармен тексермес бұрын, екі судың
                      дәмі және жұмсақтығындағы айырмашылықты сезу үшін ішіп
                      көрсек.
                    </i>
                  </p>
                </Grid.Column>
                <Grid.Column width="8">
                  {/* <Image src={tasting2} alt="tasting2" size="big" /> */}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <p>
                    (бірінші фильтр суын, артыннан кран суын береміз).
                    <i>
                      <br />
                      &nbsp; Судың дәмі қалай екен Даулет? Енді артыннан кран
                      суын ішіп көрсеңіз, әрине көп емес азғантай.
                      <br />
                    </i>
                    <i>
                      &nbsp; Айдана енді сіз ішіп көрсеңіз, дегенмен ас үйдің
                      нағыз иесі өзіңіз емес пе!
                      <br />
                    </i>
                    (бірінші фильтр суын, артыннан кран суын береміз)
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>6.3 Мысалдар келтіру.</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  <i>
                    &nbsp; Айдана, мұндай таза әрі жұмсақ су адамның
                    түр-келбетін жақсартып, терінің ерте әжім түсуінен сақтайды.
                    Ағзамызды шлак, токсин сияқты керек емес қалдықтардан
                    тазартады. Қартайған кезде есінен алжудың алдын алады.
                    Қанымызды сұйылтып, қоюлануына жол бермейді. Әсіресе,
                    әйелдердің жүктілік кезінде жүрек айнуын азайтады.
                    Сондай-ақ, инфекция мен рак ауруына қарсы күресіп,
                    иммунитетті күшейтеді, өйткені су – өзіңіз білетіндей
                    тазартушы азық.
                    <br />
                    &nbsp;Егер де біз әрдайым мынадай мөлдір бұлақтың суын
                    ішетін болсақ, бүкіл ағзамыз түгелдей тазарып өз қызметін
                    дұрыс атқарады, жоқ мынадай лас және сапасыз су ішетін
                    болсақ, өз денсаулығымызға зиян келтіріп, уақыт өтуімен
                    күтпеген ауруларға тап боламыз. Өйткені, ақ көйлекті кір
                    сумен жуу қаншалықты мәнсіз болғаны сияқты, ағзамызды да
                    мынандай лас сумен жуу негізінде дұрыс емес. Айдана,
                    отбасымыздың денсаулығына мән беріп қолға алмасақ, жанымыз
                    ашымаса, бізден басқа кім қорғайды. Бұл дүниеде ең асыл да
                    қымбат байлық, ол біздің отбасымыз емес пе?
                  </i>
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                {/* <Image src={tasting3} alt="tasting3" size="big" /> */}
              </Grid.Column>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>6.4. Қорытынды. </Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  <i>
                    &nbsp; Отбасымыздың денсаулығы мен бала - шағамыздың жан
                    рахаты үшін бұдан кейін күнделікті шәй ішкенге, тамақ
                    дайындағанға, жеміс – жидек пен көкөністерді жуғанға,
                    үйіңізде қай судың ағып тұрғанын қалар едіңіз?
                  </i>
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                {/* <Image src={tasting4} alt="tasting4" size="big" /> */}
              </Grid.Column>
            </Grid>
          </Accordion.Content>
        </Accordion>
      </Container>
    </div>
  );
}

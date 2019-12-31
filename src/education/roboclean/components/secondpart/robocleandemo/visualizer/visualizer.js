import React from 'react';
import { Container, Grid, Accordion, Image } from 'semantic-ui-react';

import './visualizer.css';
import '../../../back.css';
import { EDU_ROBO_ASSETS_URL } from '../../../../../../utils/constants';

export default function Visualizer() {
  return (
    <div className="visualizer back">
      <Container textAlign="justified">
        <h1 className="visualizer__name">6 Visualizer.</h1>
        <p className="visualizer__content">
          &nbsp; &nbsp; Бұл бөлімнің мақсаты классикалық фильтрлі системалардың
          фильтрлерін қаншалықты көп ауыстырсақ, соншалықты көп шаң шашатындығын
          көрсету.
        </p>
        <Accordion fluid styled className="visualizer__content__acc">
          <Accordion.Title>6.1 Кіріспе.</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  <i>
                    &nbsp; Пылесостың мешоктары, фйльтрлері бітеліп, сормай
                    қалатындығын көрдік. Одан әрі үйімізде қалай уборка жасауға
                    болады? Ал егер , қапшықтар мен фильтірлерді жиі – жиі
                    тазалап немесе жаңасын ауыстырып тұрсақ, үйде уборка жасай
                    аламыз ба, жоқ па? Соны көрейік.
                  </i>
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                <Image
                  src={`${EDU_ROBO_ASSETS_URL}6.1.jpg`}
                  alt="visualizer1"
                  size="big"
                />
              </Grid.Column>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>
            6.2 К.Ф.С. – да фильтрді жиі ауыстырғанның нәтижесі.
          </Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Row>
                <Grid.Column width="8" verticalAlign="middle">
                  <p>
                    (Visualizer құрастырылады.)
                    <br />
                    <i>
                      &nbsp; Мына 3 қабат матаның бірінші қабаты қапшығымыз,
                      артында тұрған екі қабат мата бұл да фильтірлері. Алдын
                      көргеніміздей үйіміздегі шаңсорғыштың қапшығы мен
                      фильтірлері ұстай алмаған шаңды бөлмеге шашты. Ал бөлмеге
                      шашылған шаңмен не істейміз? Иә, өзіміз демаламыз. Сол
                      секілді мына 3 қабат фильтрді мұрнымыз деп алайық. Ал
                      мұрыннан өткен өте ұсақ шаңдар өкпемізге барады. Ал мынаны
                      өкпеміз деп алайық. Сулатуымның да себебі өкпеміз влажный
                      болғандықтан. Алина, қапшық және фильтрдің поралары
                      бітелсе тазалаймын немесе ауыстырамын деп едік. Фильтрдің
                      поралары бітелгенде мен жаңасына ауыстырып отырамын.
                    </i>
                  </p>
                </Grid.Column>
                <Grid.Column width="8">
                  <Image
                    src={`${EDU_ROBO_ASSETS_URL}6.2.jpg`}
                    alt="visualizer2"
                    size="big"
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <p>
                    (Берікке фонарьды береміз, Алинаға отырған диванын тазалауды
                    ұсынамыз.)
                    <br />
                    (3-рет ауыстырып болған соң тряпкаларды жерге жаямыз)
                    <i>
                      <br />
                      &nbsp; Міне қараңыз, фильтрді 3-рет ауыстырғанның өзінде
                      мұрнымыз мынадай шаң болды. Егер 10 рет ауыстырсам,
                      мұрнымызда шаң көп бола ма, әлде аз ба? Әрине көп болады,
                      көріп отырғанымыздай фильтрді қаншалықты көп ауыстырған
                      сайын, соншалық мұрнымыз шаңға толады.
                      <br />
                    </i>
                    <i>
                      &nbsp; Ал егер фильтрді ауыстырмай, бір фильтрмен
                      тазалағанымда ше? Дұрыс айтасыз, ол кезде поралары бітеліп
                      шаңсорғыш сормай қалады. Демек фильтір мен қапшықты жиі
                      ауыстырсақ шаң шашады, денсаулығымыз үшін өте зиянды. Ал
                      егер ауыстырмайтын болсақ фильтірдің порасы бітеліп
                      үйімізде еш уақытта тазалық болмайды. Біз шаңсорғыштан
                      екі-ақ нәрсені талап етеміз, біріншісі жақсы шаң сору
                      керек, екіншісі шаң шашпау керек. Қарапайым фильтрлі
                      системалар бұл екі талапты бірдей еш қашан орындай
                      алмайтындығын іс жүзінде көрдік. Қарапайым фильтрлі
                      системамен тазалық жасау нәтижесінде денсаулығымыз үшін
                      аса қауіпті болған өте ұсақ шаң, клещ, бактериялардың
                      барлығы мұрнымыздан өтіп, өкпемізге жиналады. Мына ақ
                      матада айқын көрініп тұр.
                      <br />
                    </i>
                    (Өкпе деп алған тряпка көрсетіледі.)
                    <br />
                    <br />
                    <i>
                      &nbsp; Мұрнымыздың шаңын жуып, тазалауға болады, ал
                      мынадай қап-қара өкпемізге жиналған шаң, клещті жуып
                      тазалай аламыз ба? Ал енді Roboclean-нің артынан қандай
                      ауа шығатындығын көрейік. Ол үшін Roboclean-нің ауа
                      шығатын бөлігіне екінші ақ матамызды қоямыз. Қақпақ жабық
                      тұрған кезде кірген ауа төрт жерінен шығады, ал ашқан
                      кезімізде кірген ауаның барлығы мына жерден шығады. <br />
                    </i>
                    (Roboclean-ді қосып диванның қалған бөлігін тазалаймыз.)
                  </p>
                  <p>
                    <i>
                      &nbsp; Қараңыздар ауа ағымы еш өзгерген жоқ, сору күші бір
                      қалыпты. Ал артындағы матамыз аппақ. Roboclean әлемде №1
                      тазалық системасы. Себебі ауа ағымы еш уақытта өзгермейді.
                      Бүгін қалай сорып тұрған болса, 10 жылдан кейін де дәл осы
                      күшпен сорып тұрады. Ең маңыздысы әр уақытта 100% таза ауа
                      шығарады.
                    </i>
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
                  (Берік пен Алинаның қолына екі ақ матаны ұстатады.)
                  <br />
                  <i>
                    &nbsp; Су бір жерге тамшылай берсе тасты да тесетіні сияқты,
                    мұның нәтижесі астма, аллергия ауруларына әкеп соқтырады. Ең
                    жаманы бұл аурулар бір жабысса одан ешкім оңай құтыла
                    алмайды, тіпті ген арқылы жалғасып кетуі де мүмкін деп
                    аллерголог дәрігерлері де айтады. Қарапайым фильтрлі
                    шаңсорғышты қолданудың пайдасыз екендігін, керісінше
                    отбасымыздың денсаулығы үшін зиянды болып жатқандығын мына
                    матадан айқын көріп тұрмыз. Ал Roboclean-мен тазалық
                    жасаудың нәтижесі мына матадан көрініп тұр.
                  </i>
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                <Image
                  src={`${EDU_ROBO_ASSETS_URL}6.3.jpg`}
                  alt="visualizer3"
                  size="big"
                />
              </Grid.Column>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>6.4 Sell Closing сұрағы.</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  <i>
                    &nbsp; Қорыта айтқанда мынау қарапайым шаңсорғыш қолданған
                    отбасының өкпесі, ал мынау сепараторлы система қолданған
                    отбасының өкпесі. Бүгіннен бастап қай сиситемамен тазалық
                    жасайсыздар?
                  </i>
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                <Image
                  src={`${EDU_ROBO_ASSETS_URL}6.4.jpg`}
                  alt="visualizer4"
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

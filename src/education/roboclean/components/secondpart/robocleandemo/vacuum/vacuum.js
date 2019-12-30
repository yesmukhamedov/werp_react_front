import React from 'react';
import { Container, Grid, Accordion, Image } from 'semantic-ui-react';

import './vacuum.css';
import '../../../back.css';

// import vacuum1 from '../../../../assets/7.1.jpg';
// import vacuum2 from '../../../../assets/7.2.jpg';
// import vacuum3 from '../../../../assets/7.3.jpg';
// import vacuum4 from '../../../../assets/7.4.jpg';

export default function Vacuum() {
  return (
    <div className="vacuum back">
      <Container textAlign="justified">
        <h1 className="vacuum__name">7 Vacuum.</h1>
        <p className="vacuum__content">
          &nbsp; &nbsp;Бұл бөлімнің мақсаты көрпе-жастығымыздағы клещтер мен
          оларды тазалау қиындығын түсіндіру және Робоклиннің көмегімен
          көрпе-жастығымызды клещтерден оңай әрі тиімді тазалау жолын көрсету.
        </p>
        <Accordion fluid styled className="vacuum__content__acc">
          <Accordion.Title>7.1 Кіріспе.</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  <i>
                    &nbsp; Алина, Берік клещтердің өмір сүруіне ең қолайлы жер
                    біздің төсек орнымыз. Өйткені ұйқтағанымызда көрпе төсекке
                    коженный отход, перхот түседі. Оның үстіне денеміздің жылуы
                    да бар, яғни клещтер үшін ең қолайлы жер. Қорегі де бар және
                    жылуы да бар. Бұрынғы уақытта апаларымыз мұны білгендіктен
                    көрпе – жастықтардың барлығын күнге шығарып жайған. Оларды
                    клещтерден күн сәулесі, яғни ультрафиолет сәулесі арқылы
                    тазалаған. Ал қазір бұл клещтерден қалай құтылуға болады?
                    <br />
                  </i>
                  (Жастықты вакуумдайды.)
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                {/* <Image src={vacuum1} alt="vacuum1" size="big" /> */}
              </Grid.Column>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>
            7.2 Көрпе – жастықты вакууммен тазалау.
          </Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  <i>
                    &nbsp; Осылай 5 мин сақтау керек. Клещтер күн сәулесінде
                    тазаланғанындай ауасыз және қысымсыз жерде де тазаланады.
                    Клещтер тазаланғаннан соң 20 күнде қайта көбейеді. Сондықтан
                    көрпе төсегімізді айына 1-2 рет осы¬лай вакуумдап тұруымыз
                    қажет.
                  </i>
                </p>
                <p>
                  <i>
                    &nbsp; Мұнымен қатар қолданбайтын киім-кешектерді немесе
                    көрпе, жастықтарды осылай вакуумдап, күйе жеп қоймас үшін
                    сақтап қоюға да болады. Көлемі кішірейіп көп орын алмайды,
                    әрі жақсы сақталады.
                  </i>
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                {/* <Image src={vacuum2} alt="vacuum2" size="big" /> */}
              </Grid.Column>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>7.3 Мысалдар келтіру.</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  <i>
                    &nbsp; Мысалға тауға шыққанымызда немесе ауылда таза ауада,
                    далада ұйқтасақ, таңертең қалай тұрамыз? Таза ауа
                    болғандықтан организіміміз терең ұйқыға батып, жақсылап
                    тынығады. Тіпті 1-2 сағат ұйқтасақ та шаршағанымыз басылады.
                    Ал үйде 7-8 сағат ұйқтасақ та шаршағанымыз басылмайды.
                    Өйткені ауамыздағы, көрпе төсегіміздегі
                  </i>
                  (суретті көрсетіп)
                  <i>
                    бұл шаң-клещтердің кесірінен организіміміз терең ұйқыға бата
                    алмайды, жақсылап тыныға алмайды. Ал Roboclean-нің бұл
                    функциясы арқылы шаң-клещтерден оңай әрі тез құтылып,
                    рахаттанып ұйқтайтын боласыздар.
                  </i>
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                {/* <Image src={vacuum3} alt="vacuum3" size="big" /> */}
              </Grid.Column>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>7.4 Sell Closing сұрағы.</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  <i>
                    &nbsp; Ал енді бүгіннен бастап бала-шағаңызды қандай
                    жастыққа ұйқтатасыз, іші шаң, клещке толы жастыққа ма немесе
                    вакуумен тазаланған таза жастыққа ма?
                  </i>
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                {/* <Image src={vacuum4} alt="vacuum4" size="big" /> */}
              </Grid.Column>
            </Grid>
          </Accordion.Content>
        </Accordion>
      </Container>
    </div>
  );
}

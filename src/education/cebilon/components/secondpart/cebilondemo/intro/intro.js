import React from 'react';
import { Container, Accordion, Image, Grid } from 'semantic-ui-react';

import './intro.css';

// import intro1 from '../../../../assets/1.1.jpg';
// import intro2 from '../../../../assets/1.2.jpg';
// import intro3 from '../../../../assets/1.3.jpg';
// import intro4 from '../../../../assets/1.4.jpg';
// import intro5 from '../../../../assets/1.5.jpg';
// import intro6 from '../../../../assets/1.6.jpg';
// import intro7 from '../../../../assets/1.7.jpg';
// import intro8 from '../../../../assets/1.8.jpg';
// import intro9 from '../../../../assets/1.9.jpg';
// import intro10 from '../../../../assets/1.10.jpg';

export default function Intro() {
  return (
    <div className="intro">
      <Container textAlign="justified">
        <h1 className="intro__name">1 Introduction.</h1>
        <p className="intro__content">
          &nbsp; &nbsp;Бұл бөлімнің мақсаты клиентпен танысып, онымен
          қарым-қатынастағы ара-қашықтықты жақындату, клиентті тану және
          клиентті тани отырып мағлұмат алу (шешім қабылдайтын кім, хоббиі,
          нелерге мән береді, характері т.б.) Осылар арқылы клиентпен
          дистанцияны жақындатып, танысып соған қарай демо стратегиясын құрамыз.
          Демоны осылай бастағанда клиент бізді мән беріп тыңдайды. Бұл тауарды
          сатуға 90 пайыз мүмкіндігіңіз бар деген сөз.
        </p>
        <Accordion fluid styled className="intro__content__acc">
          <Accordion.Title>1.1 Сыртқы көрініс, киім</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  &nbsp; Дилер классикалық стильде киінуі керек. Киіміміз
                  әрдайым таза, үтіктелген, галстук тағылған болып, аяқ киіміміз
                  шаңнан тазаланған, шаш таралған әдемі көріністе болуымыз
                  керек.
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                {/* <Image src={intro1} alt="intro1" size="big" /> */}
              </Grid.Column>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>1.2 Күлімдеу</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  &nbsp; Күлімдеу жетістікке жетудің кілті. Клиентке жақсы әсер
                  қалдыруда алғашқы 17 секунд өте маңызды. Есікті ашқанда адам
                  бірінші біздің күлімдеген жүзімізді көруі керек. Күлімдеу
                  клиентпен қарым-қатынас орнатуда маңызды рөл атқарады.
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                {/* <Image src={intro2} alt="intro2" size="big" /> */}
              </Grid.Column>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>1.3 Сәлемдесу</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  &nbsp; Клиентпен дұрыс сәлемдесе білуіміз керек. Клиентпен
                  амандасқанда көтеріңкі көңілмен, күлімдеген жүзбен, жоғарғы
                  тонмен, ер кісімен қолын созып амандасу керек. Дилердің дұрыс
                  амандасуы өзіне деген сенімділігін көрсетеді.
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                {/* <Image src={intro3} alt="intro3" size="big" /> */}
              </Grid.Column>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>1.4 Сахнаны дайындау</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  &nbsp; Әйелі мен күйеуін бір-бірінің жанына отырғызып, өзіміз
                  мүмкіндігінше одан биігірек, 1.5 – 2 м қашықтықта,
                  қарама-қарсы отыруымыз керек. Телевизор қосылған болса
                  өшіріледі. Клиенттің назары бізде болуы керек.
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                {/* <Image src={intro4} alt="intro4" size="big" /> */}
              </Grid.Column>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>1.5 Танысу және өзін таныстыру</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  &nbsp; Клиентке алдымен өзімізді толық таныстыруымыз шарт. Тек
                  содан кейін ғана, әңгімелесу барысында олар туралы жақынырақ
                  біле аламыз. Егер бастапқыдан клиентке сұрақтарды жаудыра
                  бастасаңыз, ыңғайсыз жағдай туындауы мүмкін. Әр дилер осыны
                  ескергені жөн.
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                {/* <Image src={intro5} alt="intro5" size="big" /> */}
              </Grid.Column>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>1.6 Компанияны таныстыру</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Row>
                <Grid.Column width="8" verticalAlign="middle">
                  <p>
                    &nbsp; Компаниямыздың өнімі, қысқаша тарихы, әлемдегі
                    деңгейі, жеткен жетістіктері, филиалдары мен офистың
                    орналасқан жері туралы айтылады. (Демобукты ашып)
                  </p>
                  <p>
                    <i>
                      &nbsp;«Aura» неміс маркасы, әлемде қырық бестен астам
                      елдерде дистрибьюторлары бар. Европа, Америка, Азияның
                      көптеген елдерінде өз қызметін атқарып келеді. Соның бірі
                      «Аура Қазақстан» орталық Азияда тікелей, эксклюзивті
                      дистрибьютор болып табылады, яғни Қырғыстан, Өзбекстан,
                      Тәжікістан, Азербайжан елдері және Қазақстанның (Астана,
                      Қарағанды, Өскемен, Тараз, Шымкент, Қызылорда, Ақтау,
                      Атырау, Орал, Ақтобе, Талдықорған) барлық ірі қалаларында
                      филиалдары бар. Орталығы да Алматы қаласында мамыр 4 ықшам
                      ауданында орналасқан.
                    </i>
                  </p>
                </Grid.Column>
                <Grid.Column width="8" verticalAlign="middle">
                  {/* <Image src={intro6} alt="intro6" size="big" /> */}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <p>
                    <i>
                      &nbsp; Негізінде Aura компаниясы адам денсаулығы үшін аса
                      маңызды су тазалау жүйесі Cebilon мен көп функционалды
                      тазалық жүйесі Roboclean аппараттарын сату және сервистік
                      қызмет көрсетумен айналысады. Aura компаниясы маркетинг
                      және сервистік қызметі бойынша әлемде 3-ші орында, ал Орта
                      Азияда 1-орынға ие. Сатып алушылардың көп болуы - тауардың
                      сапасы мен сервистік қызметтің жоғарғы деңгейде екендігін
                      көрсетеді. Aura компаниясының Қазақстанда жұмыс істеп
                      жатқанына 17 жылдан асты, осы 17 жылдың ішінде 200 мыңнан
                      астам клиенттеріміз бар, барлығы дерлік өте риза. Осыншама
                      уақыт атқарған маркетингтің және сервистік қызметінің
                      нәтижесінде алты рет жыл таңдауы (выбор года) номинациясын
                      жеңіп алды.
                    </i>
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>
            1.7 Рекомендатель жайлы әңгіме қозғау
          </Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  &nbsp; Кім арқылы келгендігіміз, не үшін келгендігіміз
                  айтылады.
                </p>
                <p>
                  <i>
                    &nbsp; Жақында достарыңыз Сәуле мен Бағдаттың үйінде қонақта
                    болып, немістің соңғы технологиясымен жасалған су тазалайтын
                    «Cebilon unique» аппаратын таныстырған едік. Олардың бүгінгі
                    таңда ішіп отырған суларының сапасын, арнайы лабораториялық
                    приборлармен тексеріп, таза су мен денсаулық тақырыбында өте
                    құнды мағлұматтар берген болатынбыз. Олар қатты қызығып,
                    акция кезін пайдаланып, жақсы жеңілдікпен алып қалды.
                    Сіздерді де денсаулық пен тазалыққа мән беретін кісілер деп,
                    міндетті түрде көрсетуімізді өтінген еді.
                  </i>
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                {/* <Image src={intro7} alt="intro7" size="big" /> */}
              </Grid.Column>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>1.8. Ортақ тақырыпта әңгіме құру</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  &nbsp; Жаңалық, спорт, мамандығы т.б. жайлы әңгімелесуге
                  тырысуымыз керек.
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                {/* <Image src={intro8} alt="intro8" size="big" /> */}
              </Grid.Column>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>
            1.9. Баласы болса міндетті түрде көңіл аудару
          </Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  &nbsp; Кішкентай баланың атын, жасын сұрап, мақтап қоюымыз
                  керек.
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                {/* <Image src={intro9} alt="intro9" size="big" /> */}
              </Grid.Column>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>1.10. Комплимент</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  &nbsp; Жылы сөз бен күлімдеген жүз барлық адамға жақсы әсер
                  береді. Әр бір нәрседен жақсы жағын көріп, қарсымыздағы кісіге
                  шынайы комплимент айтуды үйренуіміз керек. Адамның атымен атау
                  (Мысалы Берік аға, Сәуле тате), мамандығына, атқарған
                  еңбегіне, хоббиіне, жаңа алған затына немесе ерекше болған
                  нәрселерге көңіл бөліп, мақтап қою адамдарға әр қашан жағымды
                  әсер етеді. Комплимент шынайы болу керек.
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                {/* <Image src={intro10} alt="intro10" size="big" /> */}
              </Grid.Column>
            </Grid>
          </Accordion.Content>
        </Accordion>
      </Container>
    </div>
  );
}

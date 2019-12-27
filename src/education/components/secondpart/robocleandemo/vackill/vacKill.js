import React from 'react';
import { Container, Grid, Image, Accordion } from 'semantic-ui-react';

import './vacKill.css';

import vac1 from '../../../../assets/4.1.jpg';
import vac2 from '../../../../assets/4.2.jpg';
import vac3 from '../../../../assets/4.3.jpg';
import vac4 from '../../../../assets/4.4.jpg';
import vac5 from '../../../../assets/4.5.jpg';
import vac6 from '../../../../assets/4.6.jpg';
import vac7 from '../../../../assets/4.7.jpg';
import vac8 from '../../../../assets/4.8.jpg';
import vac9 from '../../../../assets/4.9.jpg';
import vac10 from '../../../../assets/4.10.jpg';

export default function VacKill() {
  return (
    <div className="vackill">
      <Container textAlign="justified">
        <h1 className="vackill__name">4 Vac kill.</h1>
        <p className="vackill__content">
          &nbsp; &nbsp; Бұл бөлімнің мақсаты классикалық фильтрлі системалардың
          өз функциясын орындамайтынын түсіндіру. Яғни, үйді тазаламайды,
          шаңнан, клещтерден құтқара алмайды. Онымен қоса, оны қолдану өте
          зиянды. Сол себепті, бұл системаның мүлдем дұрыс еместігін түсіндіріп,
          пылесосты лақтырту қажет.
        </p>
        <Accordion fluid styled className="vackill__content__acc">
          <Accordion.Title>4.1 Кіріспе.</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  <i>
                    &nbsp; Тек қана ауа тазалау арқылы шаңнан толық құтыла
                    аламыз ба? Негізінен құтыла алмаймыз. Үйдің ауасы таза болу
                    үшін бірінші болып үйіміздегі шаң источникгінен құтылу
                    керек. Ол шаң источниктері мына жиһаздар мен кілемдер.
                  </i>
                  (Жарықты өшіріп, кілем мен дивандағы шаңды лампамен
                  көрсетеңіз.)
                  <i>
                    &nbsp; Осы источниктер ауамызды үнемі ластап тұрады. Бұл
                    шаңның источниктері кілемдер мен дивандар. Бұларды
                    пылесоспен тазалап келдіңз ғой, соны алып келіңізші.
                  </i>
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                <Image src={vac1} alt="vac1" size="big" />
              </Grid.Column>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>4.2 Пылесостың тарихы.</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  <i>
                    &nbsp; Алғашқы электрлі пылесос 1907 жылдары Уйльям Хувер
                    тарапынан шығырыла бастады. Ол кезде пылесостың көлемі үлкен
                    болып, далада тұрған. Шлангісін терезеден кіргізіп, тазалық
                    жасаған. 60 жылдары пылесостардың дизайны кішірейіп жаппай
                    үйдің ішіне кіре бастады. Сол жылдардан бастап астма
                    аллергия ауруларының дәрілеріне сұраныс көбейе бастады.
                    Неліктен олай болды? Оның себебі мынада...
                  </i>
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                <Image src={vac2} alt="vac2" size="big" />
              </Grid.Column>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>4.3 Бөлімдері.</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  <i>
                    &nbsp; Бүкіл пылесостар төрт бөліктен тұрады: ауа соратын
                    бөлігі, мешок, мотор және ауа шығатын бөлігі. Арада жүзден
                    астам жыл өтсе де бұлардың жұмыс істеу принципі еш
                    өзгермеген.
                  </i>
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                <Image src={vac3} alt="vac3" size="big" />
              </Grid.Column>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>4.4 Жұмыс істеу принціпі.</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  <i>
                    &nbsp; Пылесостың жұмыс істеу принципі - қанша ауа кірсе,
                    сонша ауа шығады. Кірген ауа мешок, фильтрлер арқылы өтіп,
                    моторды салқындатып, сыртқа шығады. Кірген ауа сыртқа шыға
                    алу үшін мешок, фильтрлер қандай болу керек? Әрине пористый
                    болу керек, солай емес пе?
                  </i>
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                <Image src={vac4} alt="vac4" size="big" />
              </Grid.Column>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>4.5 Шаң шашатындығын түсіндіру.</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  <i>
                    &nbsp; Пористый болғандықтан сорған шаңдарды артынан қайта
                    шашып отырады. Яғни үйімізді шаңнан тазаламайды. Сондықтан
                    да мешоктың ішіне қарасақ не көреміз? Шаң емес, тек ірі
                    мусорларды көреміз. Бұған біз пылесос емес, мусорасос деп
                    атауымыз керек емес пе?
                  </i>
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                <Image src={vac5} alt="vac5" size="big" />
              </Grid.Column>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>
            4.6 Бактерия, микроп, клещтер көбейетіндігін түсіндіру.
          </Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  <i>
                    &nbsp; Мешокты қанша аптада бір төгесіз? Ал кухнядағы
                    мусорды ше? Мешоктың ішінде бір апта бойы клещтер,
                    бактериялар миллиондап көбейеді. Мұндағы мусор, қараңғылық
                    және мотордың жылуы клещтердің көбейуіне ең қолайлы жер,
                    олар үшін курорт деп айтсақ та болады. Бір апта бойы дамып,
                    көбйіп жатқан клещтерді пылесосты қосқан кезде шаңмен қоса
                    бөлмемізге шашады. Пылесосты алғашқы қосқанда сасық бір иіс
                    сезесіз бе? Оның себебі де осыдан.
                  </i>
                </p>
                <p>
                  <i>
                    &nbsp; Мысалға мешокқа қазір таза су құйсам астынан қандай
                    су ағады? Ал енді су орнына ауа өтсе ше? Мешоктан аққан лас
                    суды ішпейміз, бірақ та осы мешоктан шыққан лас ауамен
                    демаламыз. 1960 жылдары пылесостар үйге кіргеннен бастап
                    аллергияның көбейіп кетуінің себебі де осы.
                  </i>
                </p>
              </Grid.Column>
              <Grid.Column width="8" verticalAlign="middle">
                <Image src={vac6} alt="vac6" size="big" />
              </Grid.Column>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>4.7 Шаң шашқандығын көрсету.</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  <i>
                    &nbsp; Күнделікті үйіңізді пылесостау үшін қанша уақыт
                    кетеді? Сіздерің орныңызға бүгін мен пылесостаймын, бірақ
                    қараңғыда, жарықты өшіріп.
                  </i>
                </p>
                <p>
                  &nbsp;(Жарықты өшіріп, пылесосты дұрыстап қойып, лампаны дұрыс
                  ұстап, клиентке пылесостың шаң шашқандығы көрсетіледі).
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                <Image src={vac7} alt="vac7" size="big" />
              </Grid.Column>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>4.8 Мысалдар келтіру.</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>(Лампаны жаққан бойда.)</p>
                <p>
                  <i>
                    &nbsp; Пылесосты қосқаныма 5 секунд болмай жатып дереу өшір
                    дедіңіз. 5 секундта осыншама шаң, клещ, бактерия шашатын
                    болса, жарты сағатта қанша шаң шашады? Лампамен тек көзге
                    көрінетін шаңдарды ған көріп тұрмыз, ал шаң қапшығында
                    милиондап көбейген микроб, бактерия, клещтер мүлдем
                    көзімізге көрінбейді. Бұл шаң, бактерия, клещтер өте жеңіл
                    болғандықтан ауада ұшқан бойы қалады. Бұлармен тікелей
                    демалғандықтан аллергия болу қаупі өте үлкен. Көбінесе
                    шаңсорғышпен әйел адамдар қолданады, ал оның артында балалар
                    ойнап жүреді.Сондықтан да, статистика бойынша астма,
                    аллергия аурына шалдыққан адамдардың көбісі әйелдер мен жас
                    балалар. Үйіміздегі көбейіп жатқан шаңдарды жинаудың орнына,
                    шаң, бактерия, клещи шашып, ауадағы шаң консентрациясын
                    еселеп арттырып жатқан бұл пылесос өз жұмысының терісін
                    істеп жатқан жоқ па?
                  </i>
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                <Image src={vac8} alt="vac8" size="big" />
              </Grid.Column>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>4.9 Қорытындылау.</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  <i>
                    &nbsp; Мысалға 500 долларлық холодильнигіміз бар, ішінде 50
                    доллларлық продуктысы бар делік. Сол холодильник 50
                    доллардың продуктосын ашытып, сасытып жатса, оны не
                    істейміз? Ремонтқа береміз, егер ремонтқа да жарамаса
                    мусорға тастаймыз, дұрыс қой? 50 долллардың продуктосын
                    ашытып, сасытқаны үшін 500 долллардың холодильнигін мусорға
                    тастадық, ал енді баға жетпес денсаулығымызды құртып жатқан
                    мынаны да не істеу керек?
                  </i>
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                <Image src={vac9} alt="vac9" size="big" />
              </Grid.Column>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>4.10 Sell closing сұрағы.</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  <i>
                    &nbsp; Алина, Берік үйіміздің таза болуы үшін екі жол бар.
                    Біріншісі 2-3 айда жұмсақ жиһаздарымыз бен кілемдерімізді
                    шаң баспай тұрып, қайта-қайта ауыстырып жаңартып тұру,
                    екіншісі үйімізді сепараторлы система Roboclean-мен тазалау.
                    Сіздерге қайсысы тиімді.
                  </i>
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                <Image src={vac10} alt="vac10" size="big" />
              </Grid.Column>
            </Grid>
          </Accordion.Content>
        </Accordion>
      </Container>
    </div>
  );
}

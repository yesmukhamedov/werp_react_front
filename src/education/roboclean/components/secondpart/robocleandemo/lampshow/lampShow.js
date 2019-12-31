import React from 'react';
import { Container, Accordion, Image, Grid } from 'semantic-ui-react';

import './lampShow.css';
import '../../../back.css';
import { EDU_ROBO_ASSETS_URL } from '../../../../../../utils/constants';

export default function LampShow() {
  return (
    <div className="lampshow back">
      <Container textAlign="justified">
        <h1 className="lampshow__name">2 Lamp show.</h1>
        <p className="lampshow__content">
          &nbsp; &nbsp;Бұл бөлімде ашық және жабық ортадағы ауа, үйіміздің
          ауасындағы шаң мен денсаулығымызға қауіпті микроорганизмдер туралы сөз
          қозғалады. Осыларды айта отырып клиенттің демалып отырған ауасының өте
          зиянды екендігін түсіндіру керек.
        </p>
        <Accordion fluid styled className="lampshow__content__acc">
          <Accordion.Title>2.1 Таза ауа және оның маңыздылығы.</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>(демобукты көрсете отырып)</p>
                <p>
                  <i>
                    &nbsp; Адам баласының өмір жасы ұзақ , денсаулығы мықты болу
                    үшін 3 нәрсе қажет: Таза тамақ, Таза су және Таза ауа. Таза
                    тамақ пен таза суды таңдау еркіміз бар, яғни суды сатып
                    алсақ болады, фильтр орнатсақ болады немесе табиғаттан тасып
                    ішсек болады, сол секілді Алина таза тамақты да қолдан
                    келгенше таза өнімдермен дайындаймыз. Жеп отырған тамағымыз
                    бен ішіп отырған суымыздың тазалығын сақтау аса қиын емес.
                    Бұлардың ішіндегі ең маңыздысы таза ауа. Өйткені адам баласы
                    күніне 12 000 литр ауа жұтады және оның таза болуы
                    денсаулығымыз үшін өте маңызды. <br /> &nbsp; Алина, үйдегі
                    демалып отырған ауамыздың таза болуы үшін не істейсіз?
                  </i>
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                <Image
                  src={`${EDU_ROBO_ASSETS_URL}2.1.jpg`}
                  alt="lamp1"
                  size="big"
                />
              </Grid.Column>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>2.2 Шаң және оның түрлері. </Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Row>
                <Grid.Column width="8" verticalAlign="middle">
                  <p>
                    <i>
                      &nbsp;Мебельдердің шаңын сүртіп 2 сағаттан кейін қарасақ,
                      қайтадан шаңның отырғанын байқаймыз, дұрыс қой. Қазір
                      қолым мен лампаның арасында не көріп тұрсыз?
                      <br />
                      &nbsp;(Лампаны жағып шаңды көрсетеңіз. Лампамен шаңды
                      көрсетуден бұрын бөлмедегі жарықты өшіру керек. Бөлме
                      жарық болса перделерді жабылады. Лампаны дұрыс ұстап,
                      клиенттердің көзіне жарық түспеуіне мән беріңіз. Шаңды
                      көрсеткен кезде лампаны тез өшіруге асықпаңыз. Шаң туралы
                      айтылып жатқан уақытта лампа әрдайым жанып тұруы керек. )
                      <br />
                      &nbsp;Ал енді ше? Қаншама шаң сүртсек те мебельдерге
                      қайта-қайта шаң қонуының себебі осы шаң жаңбыры
                      болғандықтан. Бұл шаңдар тек мебельдерге ғана қонып жатқан
                      жоқ, онымен қоса өкпемізге де жиналып жатыр. Осыны көре
                      отырып, еркін демала аламыз ба? Үйімізді қаншама тазалауға
                      тырыссақ та ауамыз осыншама шаң. Адам баласы күніне 12000
                      литр ауа жұтады, ал біздің өкпемізге керегі тек қана
                      оттегі, ал мына шаңның бізге керегі бар ма?
                    </i>
                  </p>
                </Grid.Column>
                <Grid.Column width="8">
                  <Image
                    src={`${EDU_ROBO_ASSETS_URL}2.2.jpg`}
                    alt="lamp2"
                    size="big"
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <p>
                    <i>
                      &nbsp;Шаңның екі түрі бар - ашық және жабық шаң. Ашық шаң
                      дегеніміз сырттағы шаңдар. Сыртта қар, жаңбыр, жел,
                      әсіресе күн сәулесі, яғни табиғи процесстер арқылы ауа
                      үздіксіз тазаланып тұрады. Ал жабық шаң дегеніміз мына
                      көріп отырған үйіміздегі шаң.
                      <br />
                      Алина, бұл шаң қалай тазаланады, оны тазалайтын үйімізде
                      табиғи процесстер бар ма?
                      <br />
                      Сондықтан да жабық шаң сыртқа қарағанда 20 есе лас болады.
                      <br />
                      Сонымен қатар бұрынғы үйлер қалай салынған? Қабырғасы
                      кесекпен қаланып, лаймен сыланып, әкпен ақталған. Есік
                      терезесі ағаштан, төбесі ағаш және қамыспен жабылған. Яғни
                      ылғи да ауа алмасып тұрған.
                      <br />
                      Берік, қазіргі үйлер қалай салынады? Қабырғалар цементпен
                      сыланып, водоэмульциямен ақталады, есік, терезе де
                      пластик. Бұлардың ешқайсысы ауа өткізбейді. Яғни, бұрын
                      табиғатпен бірге өмір сүрсек, ал қазір табиғаттан бөлек
                      бір құтының ішінде өмір сүріп жатырмыз. Сондықтан да жабық
                      шаң сыртқа қарағанда 20 есе лас болып келеді.
                    </i>
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>2.3 Клещ және оның зияны.</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Row>
                <Grid.Column width="8" verticalAlign="middle">
                  <p>
                    <i>
                      &nbsp; Үйіміздің шаңын ылғи көбейтіп, ауамызды 20 есеге
                      ластап отырған, (Суретті көрсетіп.)
                      <br /> &nbsp; Мына шаң кенелері, орысша – пылевые клещи.
                      <br />
                      Бұлардың үйімізде 150 түрі анықталған. Үйдің температурасы
                      мен ылғалдылығы олардың өмір сүрулеріне ең қолайлы орта.
                      Сыртта қар, жаңбыр және күн сәулесі болғандықтан бұл
                      клещтер далада өмір сүре алмайды. Тамағы, біздің перхоть
                      пен кожный отходымыз. Олар 2-3 ай өмір сүреді, бұл уақытта
                      өзінен 250-300 есе көп қалдық шашады.
                      <br /> &nbsp; Алина, біз үйде болмасақ та шаңдардың
                      көбейіп кетуі де сондықтан.
                    </i>
                  </p>
                </Grid.Column>
                <Grid.Column width="8">
                  <Image
                    src={`${EDU_ROBO_ASSETS_URL}2.3.jpg`}
                    alt="lamp3"
                    size="big"
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <p>
                    <i>
                      Көлемі, 0,7-0,8 микрон, ал отходы 0,2-0,3 микрон. Бір
                      тырнағымыздың астына 7000-ға дейін сыйяды. (1 мм = 1000
                      микрон, шашымыздың қалыңдығы 100 микрон.) Бұлар өте майда
                      болғандықтан мұрыннан өтіп, әрі қарай бронхтан өтіп,
                      альвиолымызға дейін барады. Өкпенің оттегі алмасу
                      процессін бұзады және иммунитетімізді әлсіретеді. Содан
                      кейін, түшкіре бастаймыз, артынша аллергия пайда болады.
                      Аллергия одан әрі асқынып аллергический ринит, бронхид,
                      бронхияльная астма т.б. ауруларды туғызады. Астма ауруы да
                      әрі қарай ген арқылы жалғасады.
                      <br />
                      &nbsp; Берік, қазіргі таңда қаламыздың экологиясының
                      қандай екенін өзіңіз де білесіз. Сол сырттағы шаңдар мен
                      түтіндер (Химический загрязнитель.) үйімізге де кіреді.
                      Бұған клещтер қосылып ауамызды одан бетер ластайды.
                      Сыртта, қар, жел немесе жаңбыр жауғанда сырттың ауасы
                      тазаланады. Ал үйімізде болса, бұл шаңдар, клещтер ауада
                      ұшқан бойы қалады. Берік, мұның нәтижесі неге әкеп
                      соқтырады?
                    </i>
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>
            2.4 Астма, аллергия ауруларының статистикасы.
          </Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  <i>
                    &nbsp; Астма, аллергия аурулары күн санап өсіп барады. 1996
                    жылы 1000 адамнан бір адам аллергия болса, 2011 жылғы
                    көрсеткіш 100 адамнан 3 адам аллергия болып тіркеліп жатыр.
                    Бүгінгі таңда орта есеппен Алматыда әр бір үш семьяда бір
                    адам алергиямен ауырады. Үйде ешкімде аллергия жоқ па?
                    <br /> &nbsp; Аллерголог мамандарының айтуынша
                    аллергиктердің көрсеткіші жыл сайын 10-20 % артып отыр.
                    Тіпті қазір роддомда рожденный астматиктер де туыла
                    бастапты. Медицинаның бұрынғы проблемасы жүрек ауруы мен
                    туберкулез болса, қазіргі таңдағы бірінші орындағы
                    проблемасы АЛЛЕРГИЯ болып тұр.
                    <br /> &nbsp; Бұл шаң, клещтерден құтылу үшін сырттағыдай
                    үйімізде де жаңбыр жаудыруымыз керек. Сіздерге жаңбырдан
                    кейінгі ауа ұнайды ма? Олай болса Roboclean-нің бірінші
                    функциясы үйімізде жаңбыр жаудырады.
                  </i>
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                <Image
                  src={`${EDU_ROBO_ASSETS_URL}2.4.jpg`}
                  alt="lamp4"
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

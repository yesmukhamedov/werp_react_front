import React from 'react';
import { Container, Grid, Accordion, Image } from 'semantic-ui-react';

import './fingerShow.css';

// import fingershow1 from '../../../../assets/8.1.jpg';
// import fingershow2 from '../../../../assets/8.2.jpg';

export default function FingerShow() {
  return (
    <div className="fingershow">
      <Container textAlign="justified">
        <h1 className="fingershow__name">8. Саусақ шоу</h1>
        <p className="fingershow__content">
          &nbsp; &nbsp; Бұл бөлімнің мақсаты - судың ластануын кішігірім
          тәжірибе жүзінде көрсету.
        </p>
        <Accordion fluid styled className="fingershow__content__acc">
          <Accordion.Title>8.1 Кіріспе.</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Row>
                <Grid.Column width="8" verticalAlign="middle">
                  <p>
                    <i>
                      &nbsp; Кран суы TДС бойынша 168 көрсетті. Су қоймасынан
                      үйге келгенге дейін, суымыздың қалай ластанатынын
                      кішігірім тәжірибе жүзінде көрейік. Барлығымызға белгілі
                      әр түрлі бактерия, микроб, шаң-тозаң сияқты кірлерден
                      тазалау үшін тамақтанар алдында қолымызды жуамыз. Ал енді
                      Айдана, осы 16 көрсеткен фильтр суына үш саусағыңызды жуып
                      көріңізші. 16 көрсеткен таза су енді неше көрсетіп жатыр?
                      Даулет, сіз де үш саусағыңызды жусаңыз. Жаңа 20 көрсеткен
                      суымыз енді неше көрсетіп жатыр? Ал енді мен де жуып
                      көрейін. Көріп тұрғаныңыздай, 16 көрсеткен таза мөлдір
                      бұлақтың суына жай ғана үш адам қолын жуумен 37 көрсетті.
                    </i>
                  </p>
                </Grid.Column>
                <Grid.Column width="8">
                  {/* <Image src={fingershow1} alt="fingershow1" size="big" /> */}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <p>
                    <i>
                      &nbsp; Даулет, мына алманы осы қол жуылған суға жуып
                      қызымызға бере аламыз ба? Айдана, мұндай сумен тамақ та
                      дайындамаймыз ғой, дұрыс па? Тіпті қатты шөлдеп тұрсақ та
                      қол жуған мына суды ішер ме едік? Дұрыс айтасыздар, бұл
                      судың қалай ластанғанын қазір өз көзімізбен көргеннен соң
                      ішпейміз әрине. Өйткені адам психологиясы осылай
                      қалыптасқан. Енді қараңыз, мына кран суы 168 көрсетті,
                      яғни кемінде 10 есе лас. Ал мына сатып алған суымыз 86
                      көрсетті, бұл да айтарлықтай таза емес. Мына қол жуған
                      суымыз да 37 көрсетіп тұр. Даулет, Айдана егер де басқа
                      бір адамды шақыртып немесе қызыңыз қазір үйірмеден
                      келуімен, TДС метр бойынша стандарттарды түсіндіріп, осы
                      үш стакандағы суларды ішуге ұсынатын болсам, қалай
                      ойлайсыз, қызыңыз қай біреуін таңдаған болар еді? Әрине,
                      бұл суға қол жуғанымызды көрмегеннен кейін, осы суды
                      таңдар еді. Ал енді, біле тұра қызыңызға бұл суды ішуіне
                      рұқсат берер ме едіңіз? Ал енді, үш адамның қолы жуылған
                      су 37 көрсетіп тұрған болса, бүгінге дейін білмей қолданып
                      жүрген кран суының 168 көрсеткішіне жету үшін, бұл суға
                      тағы қанша адам қол жуу керек?
                    </i>
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>8.2. Қорытынды</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  <i>
                    &nbsp; Экологияның нашарлаунан ластанып жатқан су, тозығы
                    жеткен құбырлармен бізге жетемін дегенше қанша есе
                    ластанатынын осыдан да көруге болады. Мұндай лас суды
                    білмей, мән бермей қолданғанның кесірінен қаншама аурулар
                    туындауда. Даулет, осы бала шағамыздың несібесі деп таң
                    атқаннан кешке дейін жұмыс істейміз. Сол адал жолмен, маңдай
                    термен тапқан табысымызды осындай орынды жерлерге
                    жұмсағанымыз жақсы емес пе. Тіпті темір көлігімізге де
                    страховка жасаймыз ғой. «Cebilon Unique» аппаратын орнатумен
                    таза әрі сенімді су ішіп, отбасыңыздың денсаулығын
                    кепілдікке алған боласыз. Ең бастысы да осы емес пе Даулет?
                  </i>
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                {/* <Image src={fingershow2} alt="fingershow2" size="big" /> */}
              </Grid.Column>
            </Grid>
          </Accordion.Content>
        </Accordion>
      </Container>
    </div>
  );
}

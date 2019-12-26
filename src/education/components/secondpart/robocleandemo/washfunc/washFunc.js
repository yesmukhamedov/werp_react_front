import React from 'react';
import { Container, Grid, Accordion, Image } from 'semantic-ui-react';

import './washFunc.css';

import washfunc1 from '../../../../assets/10.1.jpg';
import washfunc2 from '../../../../assets/10.2.jpg';
import washfunc3 from '../../../../assets/10.3.jpg';
import washfunc4 from '../../../../assets/10.4.jpg';

export default function WashFunc() {
  return (
    <div className="washfunc">
      <Container textAlign="justified">
        <h1 className="washfunc__name">10 Жуу функциясы.</h1>
        <p className="washfunc__content">
          &nbsp; &nbsp;Бұл бөлімнің мақсаты кірленіп, ластанған кілем, диван,
          кресло, орындықтарды тазалау қиындығын түсіндіру және Робоклин арқылы
          олардан оңай әрі тиімді құтылу жолын көрсету.
        </p>
        <Accordion fluid styled>
          <Accordion.Title>10.1 Кіріспе. </Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  <i>
                    &nbsp; Кілемдеріміз, мягкая мебельдеріміз кірлейді, тамақ
                    төгіледі, сок төгіледі, балалар былғайды. Кірленген кілемнің
                    арасында құмдар да болатындығын көрдіңіз. Біз оны
                    химчисткаға берген кезімізде сразу жуғандықтан кілемнің
                    арасындағы құмдар тапталып, қатып қалады. Тапталып қалған
                    құм кілемнің арасынан шықпайды. Кілемнің беті тазарғанымен
                    арасы құмға толып, үйімізге қайтып келеді. Ол құрғағаннан
                    соң майда шаң болып ауаға көтеріледі. Сондықтан да бірінші
                    болып виброщеткамен қағып, сонан соң жуу керек.
                    Roboclean-нің мына насадкалары арқылы жатқан орнында тез,
                    әрі оңай жуып, кептіріп аласыз.
                  </i>
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                <Image src={washfunc1} alt="washfunc1" size="big" />
              </Grid.Column>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>
            10.2 Кілем немесе жұмсақ жиһаздарды жуу.
          </Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  &nbsp; (Кілем немесе жұмсақ мебельдердің жууға арналған
                  насадкаларымен таныстырамыз және оларды құрастырамыз)
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                <Image src={washfunc2} alt="washfunc2" size="big" />
              </Grid.Column>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>10.3 Суды көрсету. </Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  <i>
                    &nbsp; Мына кілемімізден шыққан кірді көрдіңіз. Егер кілемде
                    бір дақ болса, соған бола химчисткаға апарып, уақытымызды
                    құртып, ақшамызды құртып жүреміз. Кірленген кілемімізді
                    Roboclean-мен еш қайда әуре болмай-ақ, арасындағы құмдарын
                    да тазалап, көңіліңіз ұнағандай етіп жуып аласыз.
                  </i>
                </p>
                <p>
                  <i>
                    &nbsp; Roboclean аппаратының көмегімен үйімізді бастан аяқ
                    толықтай тазартып аламыз. Үйімізде шынайы тазалықтың болуы
                    өз отбасымыздың жан рахаттығы мен денсаулығымыздың кепілі
                    емес пе? Ақшаның орнын қашан да толтыруға болады, ал бірақ
                    жоғалтқан денсаулығымыздың орнын толтыра аламыз ба?
                  </i>
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                <Image src={washfunc3} alt="washfunc3" size="big" />
              </Grid.Column>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>
            10.4. Қорытынды, Sell Closing сұрағы
          </Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  <i>
                    &nbsp; Кілем, дивандарымыз пятно, кір, шаң күйінде қалсын ба
                    немесе бүгіннен бастап үйімізде Roboclean-нің көмегімен
                    шынайы тазалық болсын ба?
                  </i>
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                <Image src={washfunc4} alt="washfunc4" size="big" />
              </Grid.Column>
            </Grid>
          </Accordion.Content>
        </Accordion>
      </Container>
    </div>
  );
}

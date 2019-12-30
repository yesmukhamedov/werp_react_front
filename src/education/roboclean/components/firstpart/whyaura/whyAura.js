import React from 'react';
import { Container, Grid, Image } from 'semantic-ui-react';

// import u33 from '../../../assets/u33.jpg';
import './whyAura.css';
import '../../back.css';

export default function WhyAura() {
  return (
    <div className="whyaura back">
      <Container>
        <h1 className="whyaura__name">
          4) Мен неліктен Аура компаниясын таңдаймын?
        </h1>
        <Grid columns={2} textAlign="justified" verticalAlign="middle">
          <Grid.Column className="whyaura__content">
            <p>
              * Aura компаниясында жұмыс істеу барысында өз жұмысын тиянақты
              орындау арқылы мол табыс табуға қол жеткізеді.
              <br />* Адал еңбегімен келешекте менеджер, директор болу сияқты
              карьерлік өсу мүмкіндіктері бар.
              <br />* Адамдармен сөйлесуді, бизнестің қыр-сырын үйреніп жан
              жақты жетіледі.
              <br />* Фирманың ішкі аурасы, қызметкерлердің арасындағы
              сыйластығы, адамгершілігі арқасында жұмысын рахат әрі көңілді
              ортада атқарып, жаңа достар табады.
              <br />* Жетістікке жеткен дилерден, менеджерлерден үлгі алып, мол
              тәжірибеге қол жеткізіледі.
              <br />* Әр түрлі акцияларға қатысу, яғни Туркия, Индия,
              Өзбекістан, Малайзия, Дубай, Европа елдеріне саяхат ету
              мүмкіндіктері бар.
              <br />
              <br />
              Жұмысқа қабылданушыға офиста демо көрсетіледі.
              <br />
              Жұмысқа қабылданушы клиенттің үйінде жақсы сатушының екі демосын
              көреді.
            </p>
          </Grid.Column>
          <Grid.Column className="whyaura__image">
            {/* <Image src={u33} alt="u33" size="large" centered /> */}
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}

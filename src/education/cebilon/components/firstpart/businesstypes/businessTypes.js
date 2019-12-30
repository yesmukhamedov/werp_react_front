import React from 'react';
import { Container, Grid, Image } from 'semantic-ui-react';
// import u35 from '../../../assets/u35.jpg';
import './business.css';

export default function BusinessTypes() {
  return (
    <div className="business">
      <Container>
        <h1 className="business__name">6) Бизнес және оның түрлері.</h1>
        <Grid columns={2} textAlign="justified" verticalAlign="middle">
          <Grid.Column className="business__content">
            <p>
              {' '}
              &nbsp;Бизнес жалпы екі түрге бөлінеді:
              <br />
              <br />
              1. Пассивті сауда
              <br />
              2. Активті сауда.
              <br />
              <br />
              &nbsp;Пассивті сауда дегеніміз магазин, сіупермаркет, базар т.б.
              сияқты клиенттің өзі келуін талап ететін сауданың түрі. Бизнестің
              бұл түрін бастау үшін белгілі мөлшерде капитал болу керек. Өйткені
              аренда, товар алу, реклама сияқты т.б. шығындар бар.
              <br />
              &nbsp;Активті сауда дегеніміз клиенттің келуін күтіп отырмастан,
              клиентке өзі барып орындалатын сауданың түрі. Бизнестің бұл түрі
              капиталды қажет етпейді. Сауданың бұл түрі арқылы аз уақыттың
              ішінде мол табысқа жетуге болады және де адамдармен дұрыс
              сөйлесуді, сөзін тыңдатуды, басқаруды, жалпы психологияны жетік
              үйренеді.
            </p>
          </Grid.Column>
          <Grid.Column className="business__image">
            {/* <Image src={u35} alt="u35" size="large" centered /> */}
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}

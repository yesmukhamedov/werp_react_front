import React from 'react';
import { Accordion } from 'semantic-ui-react';

import './content.css';

function Content(props) {
  return (
    <div className="content__edu">
      <h1>Мазмұны</h1>
      <p className="part__name">Бірінші бөлім</p>
      <Accordion>
        <Accordion.Title>
          <h1>Кіріспе</h1>
        </Accordion.Title>
        <Accordion.Content>
          <p className="intro__content__edu">
            Бұл «Тренинг Roboclean» кітабы Roboclean-нің демо обучениясын
            үйренуге арналған. Бұл кітап бизнес саласын кеңінен түсініп, жан
            жақты ой-өрісін кеңейтуге мүмкіндік береді. Өз бойындағы сенімділік
            пен қабілеттілікті арттырады. Roboclean демосын жақсылап үйреніп
            еліне пайдалы, табысты бизнесмен болуыңызға тілектеспіз.
          </p>
        </Accordion.Content>
      </Accordion>
      <br />
      <div className="content__links">
        <p
          onClick={() => {
            props.history.push('/edu/roboclean/hiring');
          }}
        >
          1) Жұмыс іздеушіні жұмысқа қабылдау.
        </p>
        <p
          onClick={() => {
            props.history.push('/edu/roboclean/acquaintancecompany');
          }}
        >
          2) Компаниямен таныстыру.
        </p>
        <p
          onClick={() => {
            props.history.push('/edu/roboclean/acquaintancework');
          }}
        >
          3) Жұмыс барысымен таныстыру
        </p>
        <p
          onClick={() => {
            props.history.push('/edu/roboclean/whyaura');
          }}
        >
          4) Мен неліктен Aura компаниясын таңдаймын?
        </p>
        <p
          onClick={() => {
            props.history.push('/edu/roboclean/profitways');
          }}
        >
          5) Табыс табудың жолдары .
        </p>
        <p
          onClick={() => {
            props.history.push('/edu/roboclean/businesstypes');
          }}
        >
          6) Бизнес және оның түрлері.
        </p>
      </div>
      <br />
      <p className="part__name">Екінші бөлім</p>
      <br />
      <div className="content__links">
        <p
          onClick={() => {
            props.history.push('/edu/roboclean/robocleandemo');
          }}
        >
          1) Roboclean демо обучениясы.
        </p>
        <p
          onClick={() => {
            props.history.push('/edu/roboclean/prepexam');
          }}
        >
          2) Экзаменге дайындау.
        </p>
        <p
          onClick={() => {
            props.history.push('/edu/roboclean/takeexam');
          }}
        >
          3) Экзамен қабылдау.
        </p>
        <p
          onClick={() => {
            props.history.push('/edu/roboclean/recommendations');
          }}
        >
          4) Рекомендация алу.
        </p>
        <p
          onClick={() => {
            props.history.push('/edu/roboclean/document');
          }}
        >
          5) Құжаттармен танысу және толтыру.
        </p>
      </div>
      <br />
      <p className="part__name">Үшінші бөлім</p>
      <br />
      <div className="content__links">
        <p>1) Эмоцияға әсер.</p>
        <p>2) Sell closing.</p>
        <p>3) Сенімге кіру.</p>
        <p>4) Демода контакт.</p>
        <p>5) Клиентпен жұмыс және рекомендация алу. </p>
        <p>6) Жетістікке жетудің жолдары. </p>
      </div>
    </div>
  );
}

export default Content;

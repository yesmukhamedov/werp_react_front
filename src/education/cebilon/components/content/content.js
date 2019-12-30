import React from 'react';
import { Accordion } from 'semantic-ui-react';

import './content.css';
import '../back.css';

function Content(props) {
  return (
    <div className="content__edu back">
      <h1>Мазмұны</h1>
      <p className="part__name">Бірінші бөлім</p>
      <Accordion>
        <Accordion.Title>
          <h1>Кіріспе</h1>
        </Accordion.Title>
        <Accordion.Content>
          <p className="intro__content__edu">
            <i>
              Бұл «Тренинг Cebilon» кітабы Себилонның демо обучениясын үйренуге
              арналған. Бұл кітап бизнес саласын кеңінен түсініп, жан жақты
              ой-өрісін кеңейтуге мүмкіндік береді. Өз бойындағы сенімділік пен
              қабілеттілікті арттырады. Себилон демосын жақсылап үйреніп еліне
              пайдалы, табысты бизнесмен болуыңызға тілектеспіз.
            </i>
          </p>
        </Accordion.Content>
      </Accordion>
      <br />
      <div className="content__links">
        <p
          onClick={() => {
            props.history.push('/edu/cebilon/hiring');
          }}
        >
          1) Жұмыс іздеушіні жұмысқа қабылдау.
        </p>
        <p
          onClick={() => {
            props.history.push('/edu/cebilon/acquaintancecompany');
          }}
        >
          2) Компаниямен таныстыру.
        </p>
        <p
          onClick={() => {
            props.history.push('/edu/cebilon/acquaintancework');
          }}
        >
          3) Жұмыс барысымен таныстыру
        </p>
        <p
          onClick={() => {
            props.history.push('/edu/cebilon/whyaura');
          }}
        >
          4) Мен неліктен Aura компаниясын таңдаймын?
        </p>
        <p
          onClick={() => {
            props.history.push('/edu/cebilon/profitways');
          }}
        >
          5) Табыс табудың жолдары .
        </p>
        <p
          onClick={() => {
            props.history.push('/edu/cebilon/businesstypes');
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
            props.history.push('/edu/cebilon/cebilondemo');
          }}
        >
          1) Cebilon демо обучениясы.
        </p>
        <p
          onClick={() => {
            props.history.push('/edu/cebilon/prepexam');
          }}
        >
          2) Экзаменге дайындау.
        </p>
        <p
          onClick={() => {
            props.history.push('/edu/cebilon/takeexam');
          }}
        >
          3) Экзамен қабылдау.
        </p>
        <p
          onClick={() => {
            props.history.push('/edu/cebilon/recommendations');
          }}
        >
          4) Рекомендация алу.
        </p>
        <p
          onClick={() => {
            props.history.push('/edu/cebilon/document');
          }}
        >
          5) Құжаттармен танысу және толтыру.
        </p>
      </div>
    </div>
  );
}

export default Content;

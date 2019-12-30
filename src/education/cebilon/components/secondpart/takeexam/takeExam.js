import React from 'react';
import { Container } from 'semantic-ui-react';

import './takeExam.css';

export default function TakeExam() {
  return (
    <div className="takeexam">
      <Container>
        <h1 className="takeexam__name">3) Экзамен қабылдау</h1>
        <p className="takeexam__content">
          {' '}
          &nbsp; Толық әрі кемшіліксіз демо көрсетуді меңгерген соң директор
          менеджермен бірге экзамен қабылдайды. Емтихан «Емтихан кестесі»
          бойынша алынады. Экзаменнен өткеннен соң сертификат беріледі.
        </p>
      </Container>
    </div>
  );
}

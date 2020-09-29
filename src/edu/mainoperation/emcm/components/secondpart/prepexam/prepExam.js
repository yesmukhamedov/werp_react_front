import React from 'react';
import { Container } from 'semantic-ui-react';

import './prepExam.css';
import '../../back.css';

export default function PrepExam() {
  return (
    <div className="prepexam back">
      <Container>
        <h1 className="prepexam__name">2) Экзаменге дайындалу</h1>
        <p className="prepexam__content">
          {' '}
          &nbsp; Обучения біткеннен соң менеджерге, офистағы дилерлерге және өз
          ара 10 демо көрсетеді. Қателіктерін түзетеді, кемшіліктерін
          толықтырады. Демо тәртібін бұзбай, мағынасын түсініп өздігінше
          толықтай көрсете алатын дәрежеге жеткенде экзамен тапсырады.
        </p>
      </Container>
    </div>
  );
}

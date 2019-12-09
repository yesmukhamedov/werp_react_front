import React, { useState } from 'react';
import { Segment, Grid, Button, Divider, Icon } from 'semantic-ui-react';
import './../../service.css';

export const HeaderSmcs = () => {
  return (
    <Segment>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column width={8}>
            <h2>Создание сервиса</h2>
          </Grid.Column>

          <Grid.Column width={8} textAlign="justified">
            <Button className="br30" inverted color="blue">
              Без завки
            </Button>
            <Button className="br30" inverted color="blue">
              Без договора
            </Button>
            <Button className="br30" inverted color="blue">
              С заявкой
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export const SmcsLeftPart = () => {
  return <Segment>asd</Segment>;
};

export const SmcsRightPart = () => {
  const [services, setServices] = useState([
    {
      number: 1,
      type: 'Снятие',
      summ: 1500,
    },
    {
      number: 2,
      type: 'Устранил',
      summ: 1700,
    },
    {
      number: 3,
      type: 'Установка',
      summ: 1800,
    },
  ]);

  return (
    <Grid>
      <Grid.Column>
        <Segment>
          <h4>Услуга</h4>
          <Divider />
          {services.map((service, key) => (
            <Grid.Row columns={4} key={service.number}>
              <Grid.Column width={1}>{service.number}</Grid.Column>

              <Grid.Column width={7}>{service.type}</Grid.Column>

              <Grid.Column width={3}>{service.summ}</Grid.Column>

              <Grid.Column width={2}>
                <Button>Удалить</Button>
              </Grid.Column>
              <Divider />
            </Grid.Row>
          ))}
          <Button color="green" className="br30">
            <Icon name="add circle" />
            Добавить услугу
          </Button>
        </Segment>

        <Segment>
          <h4>Продажа запчастей</h4>
          <Divider />
          <Button color="green" className="br30">
            <Icon name="add circle" />
            Добавить запчасти
          </Button>
        </Segment>

        <Segment>
          <h4>Продажа картриджи</h4>
          <Divider />
          <Button color="green" className="br30">
            <Icon name="add circle" />
            Добавить картриджи
          </Button>
        </Segment>

        <Segment>
          <h4>Сервис пакет</h4>
          <Divider />
          <Button color="green" className="br30">
            <Icon name="add circle" />
            Добавить сервис
          </Button>
        </Segment>

        <Grid celled>
          <Grid.Row columns={2}>
            <Grid.Column className="m_1rem" width={6}>
              <h4>Общая Сумма</h4>
            </Grid.Column>
            <Grid.Column className="m_1rem" width={9}>
              54545
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2}>
            <Grid.Column className="m_1rem" width={6}>
              <h4>Скидка</h4>
            </Grid.Column>
            <Grid.Column className="m_1rem" width={9}>
              54545
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column className="m_1rem" width={6}>
              <h4>Сумма к оплате</h4>
            </Grid.Column>
            <Grid.Column className="m_1rem" width={9}>
              Оплачено
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2}>
            <Grid.Column className="m_1rem" width={6}>
              <h4>Премия мастера</h4>
            </Grid.Column>
            <Grid.Column className="m_1rem" width={9}>
              54545
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2}>
            <Grid.Column className="m_1rem" width={6}>
              <h4>Общая Сумма</h4>
            </Grid.Column>
            <Grid.Column className="m_1rem" width={9}>
              54545
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2}>
            <Grid.Column className="m_1rem" width={6}>
              <h4>Общая Сумма</h4>
            </Grid.Column>
            <Grid.Column className="m_1rem" width={9}>
              54545
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Button primary className="br30">
          Сохранить
        </Button>
      </Grid.Column>
    </Grid>
  );
};

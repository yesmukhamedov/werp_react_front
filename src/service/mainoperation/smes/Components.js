import React, { useState } from 'react';
import { Input, Button, Grid, Segment } from 'semantic-ui-react';

export const SmesFilter = () => {
  const initialDataFilter = [
    {
      id: 15,
      name: '№ Сервиса',
      type: 'number',
      disabled: true,
      size: 5,
      value: '148956',
    },
    {
      id: 16,
      name: 'Статус сервиса',
      type: 'text',
      disabled: true,
      value: 'Выполнено',
    },
    {
      id: 17,
      name: '№ Заявки',
      type: 'number',
      disabled: true,
      value: 954785,
    },
    {
      id: 18,
      name: 'Компания',
      type: 'text',
      disabled: true,
      value: 'Aura',
    },
    {
      id: 19,
      name: 'Филиал',
      type: 'text',
      disabled: true,
      value: 'Alm-сервис',
    },
    {
      id: 20,
      name: 'Клиент',
      type: 'text',
      disabled: true,
      value: 'Спанбетов Нурлан',
    },
    {
      id: 21,
      name: 'Заводской номер',
      type: 'text',
      disabled: true,
      value: '4134-031589',
    },
    {
      id: 22,
      name: 'Категория',
      type: 'text',
      disabled: true,
      value: 'Уборочная система',
    },
    {
      id: 23,
      name: 'Продукт',
      type: 'text',
      disabled: true,
      value: 'Roboclean S Plus',
    },
    {
      id: 24,
      name: 'CN',
      type: 'number',
      disabled: true,
      value: 358697,
    },
    {
      id: 25,
      name: 'Адрес',
      type: 'text',
      disabled: true,
      value: 'Мамыр4 71',
    },
    {
      id: 26,
      name: 'Дата покупки',
      type: 'text',
      disabled: true,
      value: '20.10.2019',
    },
    {
      id: 27,
      name: 'Мастер',
      type: 'text',
      disabled: true,
      value: 'Дархан Токсанбеков',
    },
    {
      id: 28,
      name: 'Оператор',
      type: 'text',
      disabled: true,
      value: 'Лаура Кожабековна',
    },
    {
      id: 29,
      name: 'Дата сервиса',
      type: 'text',
      disabled: true,
      value: '31.10.2019',
    },
    {
      id: 30,
      name: 'Срок гарантии',
      type: 'text',
      disabled: true,
      value: '19.10.2022',
    },
  ];

  const [data, setData] = useState(initialDataFilter);

  return (
    <Grid celled="internally" className="gridSmes">
      {data.map(res => (
        <Grid.Row key={res.id} column={2}>
          <Grid.Column width={5} verticalAlign="middle">
            {res.name}
          </Grid.Column>
          <Grid.Column width={11}>
            <Input
              id={res.id}
              type={res.type}
              placeholder={res.placeholder}
              disabled={res.disabled}
              value={res.value}
              size={res.size}
            />
          </Grid.Column>
        </Grid.Row>
      ))}
    </Grid>
  );
};
export const SmesData = () => {
  return (
    <Grid celled="internally" className="gridSmes">
      <Grid.Column width={6}>Column 6</Grid.Column>
      <Grid.Column width={10}>Column 10</Grid.Column>
    </Grid>
  );
};

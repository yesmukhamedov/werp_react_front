import React from 'react';
import TabSmcsWithoutContract from './tabs/TabSmcsWithoutContract';
import TabSmcsWithRequest from './tabs/TabSmcsWithRequest';
import TabSmcsWithoutRequest from './tabs/TabSmcsWithoutRequest';
import { Container, Tab, Segment, Label } from 'semantic-ui-react';
import './style.css';

const Smcs = props => {
  //Вкладки
  const panes = [
    {
      menuItem: {
        key: 'TabSmcsWithoutRequest',
        content: 'Без заявки',
      },
      pane: (
        <Tab.Pane key={1}>
          <TabSmcsWithoutRequest />
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        key: 'TabSmcsWithoutContract',
        content: 'Без договора',
        icon: 'ban',
        color: 'red',
      },
      pane: (
        <Tab.Pane key={2}>
          <TabSmcsWithoutContract />
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        key: 'TabSmcsWithRequest',
        content: 'С  заявкой',
        icon: 'ban',
        color: 'red',
      },
      pane: (
        <Tab.Pane key={3}>
          <TabSmcsWithRequest />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <Container
      fluid
      style={{
        marginTop: '2em',
        marginBottom: '2em',
        paddingLeft: '2em',
        paddingRight: '2em',
      }}
    >
      <Segment as="h2">Создание сервиса</Segment>

      <Tab
        menu={{ attached: true, tabular: false, pointing: true }}
        panes={panes}
        renderActiveOnly={false}
      />
    </Container>
  );
};

export default Smcs;

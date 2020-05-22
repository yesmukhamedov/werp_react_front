import React, { useState } from 'react';
import TabSmcsWithoutContract from './tabs/TabSmcsWithoutContract';
import TabSmcsWithRequest from './tabs/TabSmcsWithRequest';
import TabSmcsWithoutRequest from './tabs/TabSmcsWithoutRequest';
import { Container, Tab, Segment, Label } from 'semantic-ui-react';
import './style.css';

const Smcs = props => {
  const [activeTab, setActiveTab] = useState(1);
  //Вкладки
  const panes = [
    {
      menuItem: {
        key: '1',
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
        key: '2',
        content: 'Без договора',
      },
      pane: (
        <Tab.Pane key={2}>
          <TabSmcsWithoutContract />
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        key: '3',
        content: 'С  заявкой',
      },
      pane: (
        <Tab.Pane key={3}>
          <TabSmcsWithRequest />
        </Tab.Pane>
      ),
    },
  ];

  const changeActiveIndex = (e, value) => {
    setActiveTab(value);
  };

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
        activeIndex={activeTab}
        menu={{ attached: true, tabular: false, pointing: true }}
        panes={panes}
        renderActiveOnly={false}
        onTabChange={(e, { activeIndex }) => setActiveTab(activeIndex)}
      />
    </Container>
  );
};

export default Smcs;

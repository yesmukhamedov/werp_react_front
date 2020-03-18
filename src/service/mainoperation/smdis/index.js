import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import Smcrld from './tabs/Smcrld';
import Smvod from './tabs/Smvod';
import Smrd from './tabs/Smrd';

import { Container, Grid, Tab, Segment, Menu, Label } from 'semantic-ui-react';

import '../../service.css';
import './style.css';

const Smdis = props => {
  const {
    intl: { messages },
    language,
  } = props;

  const [defaultPane, setDefaultPane] = useState(0);
  const clickViewService = () => {
    setDefaultPane(1);
  };
  //Вкладки
  const panes = [
    {
      menuItem: (
        <Menu.Item key={0} onClick={() => setDefaultPane(0)}>
          Распределение списка замена картриджа
        </Menu.Item>
      ),
      pane: (
        <Tab.Pane key={0}>
          <Smcrld clickViewService={clickViewService} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: (
        <Menu.Item key={1} onClick={() => setDefaultPane(1)}>
          Просмотр распределения по операторам
        </Menu.Item>
      ),
      pane: (
        <Tab.Pane key={1}>
          <Smvod />
        </Tab.Pane>
      ),
    },
    {
      menuItem: (
        <Menu.Item key={2} onClick={() => setDefaultPane(2)}>
          Перераспределение
        </Menu.Item>
      ),
      pane: (
        <Tab.Pane key={2}>
          <Smrd />
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
      <Tab
        activeIndex={defaultPane}
        menu={{ attached: true, tabular: false, pointing: true }}
        panes={panes}
        renderActiveOnly={false}
      />
    </Container>
  );
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(injectIntl(Smdis));

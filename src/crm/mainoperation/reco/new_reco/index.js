import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  Container,
  Segment,
  Label,
  Menu,
  Tab,
  Button,
  Popup,
} from 'semantic-ui-react';

import './style.css';
import New from './components/New';
import Assigned from './components/Assigned';
import Processed from './components/Processed';

const NewReco = props => {
  const {
    intl: { messages },
    language,
  } = props;
  const panes = [
    {
      menuItem: (
        <Menu.Item key="new">
          Новые
          <Label color="teal" circular>
            7
          </Label>
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane>
          <New language={language} messages={messages} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: (
        <Menu.Item key="assigned">
          Назначенные
          <Label color="orange" circular>
            12
          </Label>
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane>
          <Assigned language={language} messages={messages} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: (
        <Menu.Item key="processed">
          Обработанные
          <Label color="green" circular>
            13
          </Label>
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane>
          <Processed language={language} messages={messages} />
        </Tab.Pane>
      ),
    },
  ];
  return (
    <Container fluid style={{ padding: '10px' }}>
      <Segment className="flexSpaceBeetween" color="green">
        <h3>Список рекомендации</h3>

        <Popup
          content="Добавить рекомендации"
          trigger={
            <Button
              content="Добавить"
              color="green"
              icon="add"
              labelPosition="left"
            />
          }
        />
      </Segment>

      <Tab panes={panes} />
    </Container>
  );
};

function mapStateToProps(state) {
  return { language: state.locales.lang };
}

export default connect(mapStateToProps, {})(injectIntl(NewReco));

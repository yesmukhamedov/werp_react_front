import React, { useState } from 'react';
import { Container } from 'semantic-ui-react';
import {
  Button,
  Checkbox,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
  Form,
} from 'semantic-ui-react';
import YMaps from './components/YMap';

import DropdownClearable from '../../utils/DropdownClearable';

const HorizontalSidebar = ({ animation, direction, visible }) => {
  const handleSubmit = () => {
    console.log('handleSubmit');
  };
  return (
    <Sidebar
      as={Segment}
      animation={animation}
      direction={direction}
      visible={visible}
    >
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Field>
            <label></label>
            <DropdownClearable
              selection
              options={[]}
              value={''}
              placeholder="Компания"
              onChange={(e, { value }) => console.log('onChange')}
              handleClear={() => console.log('handleClear')}
            />
          </Form.Field>
        </Form.Group>
      </Form>
      <Grid textAlign="center">
        <Grid.Row columns={1}>
          <Grid.Column>
            <Header as="h3">New Content Awaits</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={3}>
          <Grid.Column>
            <Button color="red">Button</Button>
          </Grid.Column>
          <Grid.Column>
            <Button color="teal">Button</Button>
          </Grid.Column>
          <Grid.Column>
            <Button color="green">Button</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Sidebar>
  );
};

const Hrslc = () => {
  const [state, setState] = useState({
    animation: 'overlay',
    direction: 'top',
    dimmed: false,
    visible: false,
  });

  const [mapState, setMapState] = useState({
    center: [43.22387586, 76.92826238],
    zoom: 8,
    pointsM: [
      {
        location: [43.23626709, 76.94602374],
        id: 4545,
        fullName: 'Есмухамбетов Нұрғали',
        position: 'BackEnd разработчик',
        phone: '+7(707)-505-6858',
        status: 'На работе',
      },
      {
        location: [43.21681012, 76.85060147],
        id: 4546,
        fullName: 'Сейтбеков Жаксылык',
        position: 'FrontEnd разработчик',
        phone: '+7(707)-505-6111',
        status: 'В отпуске',
      },
      {
        location: [43.21749279, 76.85226444],
        id: 4547,
        fullName: 'Сұлтан',
        position: 'Дилер',
        phone: '+7(707)-505-6999',
        status: 'Демонстрация',
      },
      {
        location: [43.21749279, 76.85226444],
        id: 4548,
        fullName: 'Жахангир',
        position: 'Дилер',
        phone: '+7(707)-505-6888',
        status: 'Завершил демонстрацию',
      },
      {
        location: [43.21109737, 76.85371283],
        id: 4549,
        fullName: 'Азамат Сембекович',
        position: 'Начальник IT отдела',
        phone: '+7(707)-505-6777',
        status: 'На работе',
      },
      {
        location: [43.21280812, 76.85343389],
        id: 4550,
        fullName: 'Хандемир',
        position: 'Системный администратор',
        phone: '+7(707)-505-6069',
        status: 'Отгул 1 день',
      },
    ],
  });

  console.log('STATE', state);

  const { animation, dimmed, direction, visible } = state;
  const vertical = direction === 'bottom' || direction === 'top';

  return (
    <Container fluid style={{ height: '100%' }}>
      <Sidebar.Pushable as={Segment} style={{ overflow: 'hidden' }}>
        <Button
          icon="filter"
          style={{ position: 'absolute', zIndex: '1000' }}
          color="blue"
          onClick={() => setState({ ...state, visible: !visible })}
        />
        {vertical && (
          <HorizontalSidebar
            animation={animation}
            direction={direction}
            visible={visible}
          />
        )}

        <Sidebar.Pusher dimmed={dimmed && visible}>
          <Segment
            style={{ positions: 'relative', height: '100%', width: '100%' }}
          >
            <YMaps mainState={mapState} style={{ positions: 'absolute' }} />
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Container>
  );
};

export default Hrslc;

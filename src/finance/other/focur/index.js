import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Segment, Container, Button, Icon, Grid } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import { History } from './components/History';
import { Currency } from './components/Currency';
import AddCurrencyModal from './components/AddCurrencyModal';

//Курсы валют
const Focur = props => {
  const {
    intl: { messages },
  } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const saveNewCourse = () => {
    setModalOpen(false);
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
      <AddCurrencyModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        saveNewCourse={saveNewCourse}
      />
      <Segment
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h3>{messages['exchangeRates']}</h3>
        <Button
          icon
          labelPosition="left"
          color="green"
          onClick={() => setModalOpen(true)}
        >
          <Icon name="plus" />
          {messages['add_new_rate']}
        </Button>
      </Segment>
      <Grid celled>
        <Grid.Row columns={2}>
          <Grid.Column width={8}>
            <h5>{messages['currency_rates_for_today']}</h5>
            <Currency messages={messages} />
          </Grid.Column>
          <Grid.Column width={8}>
            <h5>{messages['history']}</h5>
            <History messages={messages} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};
const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, {})(injectIntl(Focur));

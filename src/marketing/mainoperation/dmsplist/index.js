import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Header,
  Icon,
  Segment,
  Button,
  Container,
  Modal,
} from 'semantic-ui-react';
import List from './list';
//
import {
  fetchDmsplist,
  f4FetchBranches,
  f4ClearAnyObject,
} from '../../marketingAction';

import { injectIntl } from 'react-intl';

function Dmsplist(props) {
  //componentDidMount
  useEffect(() => {
    props.fetchDmsplist();
    //unmount
    return () => {};
  }, []);

  const [state, setState] = useState({
    showStaff: false,
  });

  const handleOpen = () => {
    setState({ showStaff: true });
  };

  const handleClose = () => {
    setState({ showStaff: true });
  };

  const { messages } = props.intl;
  return (
    <div>
      <Container
        fluid
        style={{
          marginTop: '2em',
          marginBottom: '2em',
          paddingLeft: '4em',
          paddingRight: '4em',
        }}
      >
        <Segment clearing>
          <Header as="h2" floated="left">
            {messages['sys_users']}
          </Header>
          <Modal
            trigger={
              <Button
                floated="right"
                onClick={handleOpen.bind(this)}
                color="teal"
              >
                <Icon name="plus" />
                {messages['BTN__ADD']}
              </Button>
            }
            open={state.showStaff}
            onClose={handleClose.bind(this)}
          >
            <Modal.Header>{messages['addNewTr']}</Modal.Header>
            <Modal.Content>{'Добавить'}</Modal.Content>
          </Modal>
        </Segment>

        <List messages={messages} dynDmsplst={props.dynDmsplst} />
      </Container>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    dynDmsplst: state.marketing.dynDmsplst,
  };
}

export default connect(
  mapStateToProps,
  { fetchDmsplist },
)(injectIntl(Dmsplist));

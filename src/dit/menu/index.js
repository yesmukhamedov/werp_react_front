import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Header,
  Icon,
  Segment,
  Button,
  Container,
  Modal,
} from 'semantic-ui-react';
import ListTable from './listTable';
import { fetchCurrentMenu } from './menuAction';

class Menu extends Component {
  componentWillMount() {
    this.props.fetchCurrentMenu();
  }

  render() {
    return (
      <div>
        <div id="transaction">
          <Container
            fluid
            style={{
              marginTop: '2em',
              marginBottom: '2em',
              paddingLeft: '2em',
              paddingRight: '2em',
            }}
          >
            <Segment clearing>
              <Header as="h2" floated="left">
                Список меню
              </Header>
            </Segment>
          </Container>
          <div className="ui grid">
            <div className="two wide column" />

            <div className="twelve wide column">
              <ListTable {...this.props} />
            </div>
            <div className="two wide column" />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentMenu: state.menuReducer.currentMenu,
  };
}

export default connect(
  mapStateToProps,
  { fetchCurrentMenu },
)(Menu);

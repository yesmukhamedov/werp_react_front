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
import ListTableCreate from './listTableCreate';
import {
  fetchCurrentPositions,
  newPosition,
  updatePosition,
} from './positionAction';
import { injectIntl } from 'react-intl';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.newPosition = this.newPosition.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
  }

  componentWillMount() {
    this.props.fetchCurrentPositions();
  }

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose() {
    this.setState({ modalOpen: false });
  }

  newPosition(localPosition) {
    this.props.newPosition(localPosition);
  }

  updatePosition(update) {
    this.props.updatePosition(update);
  }

  render() {
    const { messages } = this.props.intl;
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
                {messages['posList']}
              </Header>
              <Modal
                size="fullscreen"
                trigger={
                  <Button
                    floated="right"
                    onClick={this.handleOpen}
                    color="blue"
                  >
                    <Icon name="plus" />
                    {messages['BTN__ADD']}
                  </Button>
                }
                open={this.state.modalOpen}
                onClose={this.handleClose}
              >
                <Modal.Header>{messages['add_Position']}</Modal.Header>
                <Modal.Content>
                  <ListTableCreate
                    messages={messages}
                    newPosition={this.newPosition}
                    handleClose={this.handleClose}
                  />
                </Modal.Content>
                <Modal.Actions />
              </Modal>
            </Segment>
          </Container>
          <div className="ui grid">
            <div className="two wide column" />

            <div className="twelve wide column">
              <ListTable
                positions={this.props.currentPosition}
                messages={messages}
                updatePosition={this.updatePosition}
              />
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
    currentPosition: state.hrPosReducer,
  };
}

export default connect(mapStateToProps, {
  fetchCurrentPositions,
  newPosition,
  updatePosition,
})(injectIntl(List));

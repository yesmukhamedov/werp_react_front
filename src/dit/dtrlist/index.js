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
import NewTransaction from './newTransaction';
import { fetchCurrDtrLst, newDtr, updDtr } from '../ditAction';
import { injectIntl } from 'react-intl';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.newTransaction = this.newTransaction.bind(this);
    this.updTransaction = this.updTransaction.bind(this);
  }

  componentWillMount() {
    this.props.fetchCurrDtrLst();
  }

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose() {
    this.setState({ modalOpen: false });
  }

  newTransaction(localTransaction) {
    this.props.newDtr(localTransaction);
  }

  updTransaction(updateTransaction) {
    this.props.updDtr(updateTransaction);
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
                {messages['trList']}
              </Header>
              <Modal
                size="large"
                trigger={
                  <Button
                    floated="right"
                    onClick={this.handleOpen}
                    color="teal"
                  >
                    <Icon name="plus" />
                    {messages['BTN__ADD']}
                  </Button>
                }
                open={this.state.modalOpen}
                onClose={this.handleClose}
              >
                <Modal.Header>{messages['addNewTr']}</Modal.Header>
                <Modal.Content>
                  <NewTransaction
                    newTransaction={this.newTransaction}
                    handleClose={this.handleClose}
                    messages={messages}
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
                transactions={this.props.currTrans}
                updTransaction={this.updTransaction}
                messages={messages}
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
    currTrans: state.ditReducer,
  };
}

export default connect(
  mapStateToProps,
  { fetchCurrDtrLst, newDtr, updDtr },
)(injectIntl(List));

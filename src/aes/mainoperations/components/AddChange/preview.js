import React, { Component } from 'react';
import { Table, Icon, Form, Button, Modal } from 'semantic-ui-react';

class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  show = dimmer => () => {
    this.setState({ ...this.state, dimmer: dimmer, open: true });
  };
  close = () => this.setState({ open: false });
  render() {
    const { queryParams, compbranch, messages } = this.props;
    return (
      <div>
        <Button floated="right" color="blue" onClick={this.show()}>
          {messages['preview']}
        </Button>
        <Modal open={this.state.open} onClose={this.close}>
          <Modal.Content>
            <Modal.Description>
              <Form>
                <div className="ui segments">
                  <div className="ui segment">
                    <h3>{messages['preview']}</h3>
                  </div>
                  <div className="ui secondary segment">
                    <Table celled>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell />
                          <Table.HeaderCell>
                            {messages['nomination']}
                          </Table.HeaderCell>
                          <Table.HeaderCell>
                            {messages['code']}
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>{messages['country']}</Table.Cell>
                          <Table.Cell>{queryParams.country_name}</Table.Cell>
                          <Table.Cell>{queryParams.country_id}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            {messages['bukrs']} && {messages['brnch']}
                          </Table.Cell>
                          <Table.Cell>
                            {messages['bukrs']}:
                            <strong>
                              {queryParams.bukrs_name} {queryParams.bukrs_code}
                            </strong>{' '}
                            {messages['brnch']}:{' '}
                            <strong>
                              {queryParams.branch_name}{' '}
                              {queryParams.branch_code}
                            </strong>
                          </Table.Cell>
                          <Table.Cell>
                            {compbranch.map((code, i) => (
                              <span key={i}>{code.compbr_code}</span>
                            ))}
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>{messages['dep']}</Table.Cell>
                          <Table.Cell>{queryParams.dep_name}</Table.Cell>
                          <Table.Cell>{queryParams.dep_code}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>{messages['os_name']}</Table.Cell>
                          <Table.Cell>{queryParams.os_name}</Table.Cell>
                          <Table.Cell>{queryParams.os_code}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>{messages['type1']}</Table.Cell>
                          <Table.Cell>{queryParams.type1_name}</Table.Cell>
                          <Table.Cell>{queryParams.type1_code}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>{messages['type2']}</Table.Cell>
                          <Table.Cell>{queryParams.type2_name}</Table.Cell>
                          <Table.Cell>{queryParams.type2_code}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>{messages['type3']}</Table.Cell>
                          <Table.Cell>{queryParams.type3_name}</Table.Cell>
                          <Table.Cell>{queryParams.type3_code}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>{messages['os_det']}</Table.Cell>
                          <Table.Cell>{queryParams.detail_name}</Table.Cell>
                          <Table.Cell>{queryParams.detail_code}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>{messages['rnum']}</Table.Cell>
                          <Table.Cell>{queryParams.room_name}</Table.Cell>
                          <Table.Cell>{queryParams.room_code}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>{messages['state1']}</Table.Cell>
                          <Table.Cell>{queryParams.status_name}</Table.Cell>
                          <Table.Cell>{queryParams.status_code}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>{messages['price']}</Table.Cell>
                          <Table.Cell>
                            {queryParams.price} {queryParams.currency}
                          </Table.Cell>
                          <Table.Cell />
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>{messages['count']}</Table.Cell>
                          <Table.Cell>{queryParams.quantity}</Table.Cell>
                          <Table.Cell />
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>{messages['buying_date']}</Table.Cell>
                          <Table.Cell>
                            {queryParams.buying_time == null
                              ? ''
                              : queryParams.buying_time.format('DD.MM.YYYY')}
                          </Table.Cell>
                          <Table.Cell />
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>{messages['owner']}</Table.Cell>
                          <Table.Cell>{queryParams.se0_name}</Table.Cell>
                          <Table.Cell />
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>{messages['examiner']}</Table.Cell>
                          <Table.Cell>{queryParams.se1_name}</Table.Cell>
                          <Table.Cell />
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>{messages['examiner2']}</Table.Cell>
                          <Table.Cell>{queryParams.se2_name}</Table.Cell>
                          <Table.Cell />
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>{messages['examiner3']}</Table.Cell>
                          <Table.Cell>{queryParams.se3_name}</Table.Cell>
                          <Table.Cell />
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  </div>
                </div>

                <Button
                  onClick={() => this.close()}
                  floated="right"
                  className={this.state.sendingData ? 'loading' : ''}
                  color="teal"
                >
                  <Icon name="checkmark" />
                  {messages['save']}
                </Button>
                <Button floated="right" onClick={() => this.close()} negative>
                  {' '}
                  <Icon name="remove" />
                  {messages['cancel']}
                </Button>
                <br />
                <br />
              </Form>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default Preview;

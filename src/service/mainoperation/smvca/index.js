import React, { useState, useEffect } from 'react';
import {
  Container,
  Segment,
  Header,
  Form,
  Label,
  Grid,
  Input,
  Table,
} from 'semantic-ui-react';
import {
  fetchSmvca,
  fetchServAppStatus,
  clearDynObjService,
} from '../../serviceAction';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import ListHistory from './list';

const Smvca = props => {
  const {
    historyDynamicObject,
    dynamicObject,
    fetchSmvca,
    intl: { messages },
    fetchServAppStatus,
    clearDynObjService,
  } = props;

  const url = window.location.search;
  const id = url.slice(url.indexOf('=') + 1);

  useEffect(() => {
    clearDynObjService();
    if (id) fetchSmvca(id);
    fetchServAppStatus();
  }, []);

  return (
    <div>
      <Container
        fluid
        style={{
          marginTop: '2em',
          marginBottom: '2em',
          paddingLeft: '2em',
          paddingRight: '2em',
        }}
      >
        <Segment clearing tertiary>
          <Header as="h2">{messages['view_customer_request']} </Header>
        </Segment>
        <Grid centered>
          <Grid.Row>
            <Grid.Column mobile={16} table={16} computer={8}>
              <Table compact striped>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        № {messages['request_number']}
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Input
                        readOnly
                        fluid
                        value={dynamicObject.customerId || ''}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        {' '}
                        {messages['Form.ClientFullName']}{' '}
                      </Label>
                    </Table.Cell>

                    <Table.Cell>
                      <Input
                        fluid
                        readOnly
                        value={dynamicObject.applicantName || ''}
                      />
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        {' '}
                        {messages['bukrs']}{' '}
                      </Label>
                    </Table.Cell>

                    <Table.Cell>
                      <Input
                        fluid
                        readOnly
                        value={dynamicObject.bukrsName || ''}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      {' '}
                      <Label size="large" basic>
                        {' '}
                        {messages['Table.Address']}{' '}
                      </Label>
                    </Table.Cell>

                    <Table.Cell>
                      <Input
                        fluid
                        readOnly
                        value={dynamicObject.address || ''}
                      />
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        {' '}
                        {messages['brnch']}{' '}
                      </Label>
                    </Table.Cell>

                    <Table.Cell>
                      <Input
                        fluid
                        readOnly
                        value={dynamicObject.branchName || ''}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        {messages['contacts']}{' '}
                      </Label>
                    </Table.Cell>

                    <Table.Cell>
                      <Input
                        fluid
                        readOnly
                        value={dynamicObject.inPhoneNum || ''}
                      />
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        {' '}
                        {messages['Product']}{' '}
                      </Label>
                    </Table.Cell>

                    <Table.Cell>
                      <Input
                        fluid
                        readOnly
                        value={dynamicObject.matnrName || ''}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        {' '}
                        {messages['productSerialNumber']}{' '}
                      </Label>
                    </Table.Cell>

                    <Table.Cell>
                      <Input
                        fluid
                        readOnly
                        value={dynamicObject.contractNumber || ''}
                      />
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        {' '}
                        {messages['type_of_application']}{' '}
                      </Label>
                    </Table.Cell>

                    <Table.Cell>
                      <Input
                        fluid
                        readOnly
                        value={dynamicObject.appTypeName || ''}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        {' '}
                        {messages['installation_date']}{' '}
                      </Label>
                    </Table.Cell>

                    <Table.Cell>
                      <Input fluid readOnly value={dynamicObject.adate || ''} />
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        {' '}
                        {messages['Operator']}{' '}
                      </Label>
                    </Table.Cell>

                    <Table.Cell>
                      <Input
                        fluid
                        readOnly
                        value={dynamicObject.operatorName || ''}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        CN{' '}
                      </Label>
                    </Table.Cell>

                    <Table.Cell>
                      <Input
                        fluid
                        readOnly
                        value={dynamicObject.contractNumber || ''}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell></Table.Cell>
                    <Table.Cell>
                      <Label color="green" size="large">
                        F1 |
                        <Label.Detail>{dynamicObject.f1MtLeft}</Label.Detail>
                      </Label>
                      <Label color="blue" size="large">
                        F2 |
                        <Label.Detail>{dynamicObject.f2MtLeft}</Label.Detail>
                      </Label>
                      <Label color="red" size="large">
                        F3 |
                        <Label.Detail>{dynamicObject.f3MtLeft}</Label.Detail>
                      </Label>
                      <Label color="orange" size="large">
                        F4 |
                        <Label.Detail>{dynamicObject.f4MtLeft}</Label.Detail>
                      </Label>
                      <Label color="pink" size="large">
                        F5 |
                        <Label.Detail>{dynamicObject.f5MtLeft}</Label.Detail>
                      </Label>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        {' '}
                        {messages['goodsInstaller']}{' '}
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Input
                        fluid
                        readOnly
                        value={dynamicObject.masterName || ''}
                      />
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        {' '}
                        {messages['date_of_admission_to_the_service']}{' '}
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Input
                        fluid
                        readOnly
                        value={dynamicObject.updatedBy || ''}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        {' '}
                        {messages['service_time']}{' '}
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Input
                        fluid
                        readOnly
                        value={dynamicObject.updatedDate || ''}
                      />
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        {messages['transfer_date']}
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Input
                        fluid
                        readOnly
                        value={dynamicObject.rescheduledDate || ''}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        {' '}
                        {messages['L__ORDER_STATUS']}
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Input
                        fluid
                        readOnly
                        value={dynamicObject.appStatusName || ''}
                      />
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
              <Form>
                <Form.Field>
                  <Label size="large" basic>
                    {' '}
                    {messages['Table.Note']}
                  </Label>
                  <Input fluid readOnly value={dynamicObject.info || ''} />
                </Form.Field>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
      <ListHistory
        historyDynamicObject={historyDynamicObject}
        messages={messages}
      />
    </div>
  );
};
function mapStateToProps(state) {
  return {
    dynamicObject: state.serviceReducer.dynamicObject,
    historyDynamicObject: state.serviceReducer.historyDynamicObject,
    servAppStatusList: state.serviceReducer.servAppStatus,
  };
}

export default connect(mapStateToProps, {
  fetchSmvca,
  fetchServAppStatus,
  clearDynObjService,
})(injectIntl(Smvca));

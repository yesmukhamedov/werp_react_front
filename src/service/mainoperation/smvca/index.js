import React, { useState, useEffect } from 'react';
import {
  Container,
  Segment,
  Form,
  Grid,
  Input,
  Table,
  TextArea,
  Checkbox,
} from 'semantic-ui-react';
import { fetchSmvca, clearDynObjService } from './smvcaAction';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import TableHistory from './TableHistory';
import {
  f4FetchCurrentStaff,
  f4FetchAvailabledTransactionByUser,
} from '../../../reference/f4/f4_action';
import './smvca.css';

const Smecam = props => {
  const {
    intl: { messages },
    smvcaData = {},
    smvcaHistory = [],
    availabledTransaction = [],
    staffInfo = {},
  } = props;

  const url = window.location.search;
  const id = url.slice(url.indexOf('=') + 1);

  const [smvca, setSmvca] = useState({});
  const [smvcaHis, setSmvcaHis] = useState([]);
  const [editStatus, setEditStatus] = useState(false);

  console.log('SMECA EDIT STATUS', editStatus);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (Object.keys(smvcaData).length > 0) {
      setSmvca({ ...smvcaData });
      setSmvcaHis([...smvcaHistory]);
    }
  }, [smvcaData]);

  useEffect(() => {
    props.fetchSmvca(id);
    props.f4FetchAvailabledTransactionByUser();
    props.f4FetchCurrentStaff();
  }, []);

  useEffect(() => {
    if (availabledTransaction.length > 0) {
      availabledTransaction.map(item =>
        item.transactionCode == 'SMECA'
          ? setEditStatus(true)
          : setEditStatus(false),
      );
    }
  }, [availabledTransaction]);

  return (
    <Container fluid>
      <Grid centered>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={16} computer={7}>
            <div className="spaceBetween">
              <h2>Просмотр заявку клиента</h2>
              {editStatus == true ? (
                <a
                  href={`../mainoperation/smeca?id=${id}`}
                  rel="noopener noreferrer"
                >
                  <Form.Button color="green">Редактировать</Form.Button>
                </a>
              ) : (
                ''
              )}
            </div>

            <Segment>
              <Form>
                <h3>{messages['L__CLIENT_INFO']}</h3>
                <Table compact striped>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>№ {messages['request_number']}</Table.Cell>
                      <Table.Cell>
                        <Input readOnly fluid value={smvca.id || ''} />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <Form.Field>{messages['bukrs']}</Form.Field>
                      </Table.Cell>
                      <Table.Cell>
                        <Input
                          fluid
                          readOnly
                          error={errors.bukrs ? true : false}
                          value={smvca.bukrsName || ''}
                        />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <Form.Field>{messages['brnch']}</Form.Field>
                      </Table.Cell>
                      <Table.Cell>
                        <Input
                          fluid
                          readOnly
                          error={errors.branchId ? true : false}
                          value={smvca.branchName || ''}
                        />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <Form.Field>{messages['Product']}</Form.Field>
                      </Table.Cell>
                      <Table.Cell>
                        <Input fluid readOnly value={smvca.matnrName || ''} />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <Form.Field>
                          {messages['type_of_application']}
                        </Form.Field>
                      </Table.Cell>
                      <Table.Cell>
                        <Input
                          fluid
                          readOnly
                          value={smvca.applicationTypeName || ''}
                        />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Form.Field>Дата заявки</Form.Field>
                      </Table.Cell>

                      <Table.Cell>
                        <Table>
                          <Table.Body>
                            <Table.Row>
                              <Table.Cell>
                                <Input
                                  fluid
                                  readOnly
                                  value={
                                    smvca.applicationDate
                                      ? smvca.applicationDate
                                      : ''
                                  }
                                />
                              </Table.Cell>

                              <Table.Cell collapsing>
                                <Checkbox
                                  readOnly
                                  checked={smvca.urgencyLevel}
                                />
                              </Table.Cell>
                              <Table.Cell>
                                <Form.Field>
                                  <label>{messages['urgent']}</label>
                                </Form.Field>
                              </Table.Cell>
                            </Table.Row>
                          </Table.Body>
                        </Table>
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell verticalAlign="top">
                        <Form.Field required>{messages['Operator']}</Form.Field>
                      </Table.Cell>
                      <Table.Cell>
                        <Input fluid readOnly value={smvca.operatorFIO || ''} />
                        <Table>
                          <Table.Body>
                            <Table.Row>
                              <Table.Cell>
                                <Input
                                  readOnly
                                  size="mini"
                                  label="F1"
                                  className="input__filter_terms"
                                  value={smvca.f1MtLeft ? smvca.f1MtLeft : ''}
                                />
                                <Input
                                  readOnly
                                  size="mini"
                                  label="F2"
                                  className="input__filter_terms"
                                  value={smvca.f2MtLeft ? smvca.f2MtLeft : ''}
                                />

                                <Input
                                  readOnly
                                  size="mini"
                                  label="F3"
                                  className="input__filter_terms"
                                  value={smvca.f3MtLeft ? smvca.f3MtLeft : ''}
                                />

                                <Input
                                  readOnly
                                  size="mini"
                                  label="F4"
                                  className="input__filter_terms"
                                  value={smvca.f4MtLeft ? smvca.f4MtLeft : ''}
                                />

                                <Input
                                  readOnly
                                  size="mini"
                                  label="F5"
                                  className="input__filter_terms"
                                  value={smvca.f5MtLeft ? smvca.f5MtLeft : ''}
                                />
                              </Table.Cell>
                            </Table.Row>
                          </Table.Body>
                        </Table>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{messages['full_name_of_client']}</Table.Cell>
                      <Table.Cell>
                        <Input fluid readOnly value={smvca.customerFIO || ''} />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>{messages['address']}</Table.Cell>
                      <Table.Cell>
                        <Input fluid readOnly value={smvca.addressName || ''} />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{messages['contacts']}</Table.Cell>
                      <Table.Cell>
                        <Input fluid readOnly value={smvca.fullPhone || ''} />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{messages['productSerialNumber']}</Table.Cell>
                      <Table.Cell>
                        <Input fluid readOnly value={smvca.tovarSn || ''} />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{messages['installation_date']}</Table.Cell>
                      <Table.Cell>
                        <Input
                          fluid
                          readOnly
                          value={smvca.installmentDate || ''}
                        />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>CN</Table.Cell>
                      <Table.Cell>
                        <Input
                          fluid
                          readOnly
                          value={smvca.contractNumber || ''}
                        />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>{messages['goodsInstaller']}</Table.Cell>
                      <Table.Cell>
                        <Input fluid readOnly value={smvca.masterFIO || ''} />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        {`${messages['date_of_admission_to_the_service']} и время`}
                      </Table.Cell>
                      <Table.Cell>
                        <Input fluid readOnly value={smvca.serviceDate || ''} />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>{messages['transfer_date']}</Table.Cell>
                      <Table.Cell>
                        <Input
                          fluid
                          readOnly
                          value={smvca.rescheduledDate || ''}
                        />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>{messages['L__ORDER_STATUS']}</Table.Cell>
                      <Table.Cell>
                        <Input
                          fluid
                          readOnly
                          value={smvca.applicationStatusName || ''}
                        />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <Form.Field>{messages['bktxt']}</Form.Field>
                      </Table.Cell>
                      <Table.Cell>
                        <Form.Field>
                          <TextArea
                            readOnly
                            rows={1}
                            placeholder={messages['Table.Note']}
                            value={smvca.info || ''}
                          />
                        </Form.Field>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <TableHistory data={smvcaHis} messages={messages} />
    </Container>
  );
};
function mapStateToProps(state) {
  return {
    smvcaData: state.smvcaReducer.smvcaData,
    smvcaHistory: state.smvcaReducer.smvcaHistory,
    availabledTransaction: state.f4.availabledTransaction,
    staffInfo: state.f4.staffInfo,
  };
}

export default connect(mapStateToProps, {
  fetchSmvca,
  clearDynObjService,
  f4FetchCurrentStaff,
  f4FetchAvailabledTransactionByUser,
})(injectIntl(Smecam));

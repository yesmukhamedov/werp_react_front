import React, { useState, useEffect } from 'react';
import {
  Container,
  Segment,
  Form,
  Grid,
  Input,
  Table,
  TextArea,
  Button,
} from 'semantic-ui-react';

import { fetchSmeca, editSmeca } from './smecaAction';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import TableHistory from './TableHistory';
import OutputErrors from '../../../general/error/outputErrors';
import './smeca.css';

const Smecam = props => {
  const {
    intl: { messages },
    smecaData = {},
    smecaHistory = [],
    smecaPutStatus = {},
  } = props;

  const url = window.location.search;
  const id = url.slice(url.indexOf('=') + 1);

  const [smeca, setSmeca] = useState({});
  const [smecaHis, setSmecaHis] = useState([]);
  const [postStatus, setPostStatus] = useState(false);
  const [editStatus, setEditStatus] = useState(true);

  const deepEqual = (obj1, obj2) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  };

  useEffect(() => {
    const equal = deepEqual(smecaData, smeca);
    if (equal == true) {
      setEditStatus(true);
    } else {
      setEditStatus(false);
    }
  }, [smeca]);

  useEffect(() => {
    if (smecaPutStatus.status == 'OK') {
      setPostStatus(true);
      props.fetchSmeca(id);
    } else {
      setPostStatus(false);
    }
  }, [smecaPutStatus]);

  const [error, setError] = useState([]);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (Object.keys(smecaData).length > 0) {
      setSmeca({ ...smecaData });
      setSmecaHis([...smecaHistory]);
    }
  }, [smecaData]);

  useEffect(() => {
    props.fetchSmeca(id);
  }, []);

  const handleChange = (value, fieldName) => {
    switch (fieldName) {
      case 'info':
        console.log('info value', value);
        setSmeca({ ...smeca, info: value });
        break;
      case '':
        break;
      default:
    }
  };

  const handleSubmit = () => {
    console.log('EDIT BUTTON');
    props.editSmeca({ ...smeca });
  };

  return (
    <Container fluid>
      <Grid centered>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={16} computer={7}>
            <div className="spaceBetween">
              <h2>Редактирование заявки клиента</h2>
            </div>

            <Segment>
              <Form>
                <h3>{messages['L__CLIENT_INFO']}</h3>
                <Table compact striped>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>№ {messages['request_number']}</Table.Cell>
                      <Table.Cell>
                        <Input readOnly fluid value={smeca.id || ''} />
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
                          value={smeca.bukrsName || ''}
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
                          value={smeca.branchName || ''}
                        />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <Form.Field>{messages['Product']}</Form.Field>
                      </Table.Cell>
                      <Table.Cell>
                        <Input fluid readOnly value={smeca.matnrName || ''} />
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
                          value={smeca.applicationTypeName || ''}
                        />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell verticalAlign="top">
                        <Form.Field required>{messages['Operator']}</Form.Field>
                      </Table.Cell>
                      <Table.Cell>
                        <Input fluid readOnly value={smeca.operatorFIO || ''} />
                        <Table>
                          <Table.Body>
                            <Table.Row>
                              <Table.Cell>
                                <Input
                                  readOnly
                                  size="mini"
                                  label="F1"
                                  className="input__filter_terms"
                                  value={smeca.f1MtLeft ? smeca.f1MtLeft : ''}
                                />
                                <Input
                                  readOnly
                                  size="mini"
                                  label="F2"
                                  className="input__filter_terms"
                                  value={smeca.f2MtLeft ? smeca.f2MtLeft : ''}
                                />

                                <Input
                                  readOnly
                                  size="mini"
                                  label="F3"
                                  className="input__filter_terms"
                                  value={smeca.f3MtLeft ? smeca.f3MtLeft : ''}
                                />

                                <Input
                                  readOnly
                                  size="mini"
                                  label="F4"
                                  className="input__filter_terms"
                                  value={smeca.f4MtLeft ? smeca.f4MtLeft : ''}
                                />

                                <Input
                                  readOnly
                                  size="mini"
                                  label="F5"
                                  className="input__filter_terms"
                                  value={smeca.f5MtLeft ? smeca.f5MtLeft : ''}
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
                        <Input fluid readOnly value={smeca.customerFIO || ''} />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>{messages['address']}</Table.Cell>
                      <Table.Cell>
                        <Input fluid readOnly value={smeca.addressName || ''} />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{messages['contacts']}</Table.Cell>
                      <Table.Cell>
                        <Input fluid readOnly value={smeca.fullPhone || ''} />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{messages['productSerialNumber']}</Table.Cell>
                      <Table.Cell>
                        <Input fluid readOnly value={smeca.tovarSn || ''} />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{messages['installation_date']}</Table.Cell>
                      <Table.Cell>
                        <Input
                          fluid
                          readOnly
                          value={smeca.installmentDate || ''}
                        />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>CN</Table.Cell>
                      <Table.Cell>
                        <Input
                          fluid
                          readOnly
                          value={smeca.contractNumber || ''}
                        />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>{messages['goodsInstaller']}</Table.Cell>
                      <Table.Cell>
                        <Input fluid readOnly value={smeca.masterFIO || ''} />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        {`${messages['date_of_admission_to_the_service']} и время`}
                      </Table.Cell>
                      <Table.Cell>
                        <Input fluid readOnly value={smeca.serviceDate || ''} />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>{messages['transfer_date']}</Table.Cell>
                      <Table.Cell>
                        <Input
                          fluid
                          readOnly
                          value={smeca.rescheduledDate || ''}
                        />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>{messages['L__ORDER_STATUS']}</Table.Cell>
                      <Table.Cell>
                        <Input
                          fluid
                          readOnly
                          value={smeca.applicationStatusName || ''}
                        />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <Form.Field>
                          <label>{messages['bktxt']}</label>
                        </Form.Field>
                      </Table.Cell>
                      <Table.Cell>
                        <Form.Field>
                          <TextArea
                            rows={1}
                            placeholder={messages['Table.Note']}
                            value={smeca.info || ''}
                            onChange={(e, value) =>
                              handleChange(e.target.value, 'info')
                            }
                          />
                        </Form.Field>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
                <OutputErrors errors={error} />
                <Form.Field>
                  <Button
                    color="blue"
                    fluid
                    onClick={() => handleSubmit()}
                    disabled={editStatus}
                  >
                    {messages['save']}
                  </Button>
                </Form.Field>
                <Form.Field>
                  <Button
                    color="red"
                    fluid
                    onClick={() => window.history.back()}
                  >
                    {messages['cancel']}
                  </Button>
                </Form.Field>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <TableHistory data={smecaHis} messages={messages} />
    </Container>
  );
};
function mapStateToProps(state) {
  return {
    smecaData: state.smecaReducer.smecaData,
    smecaHistory: state.smecaReducer.smecaHistory,
    smecaPutStatus: state.smecaReducer.smecaEditStatus,
  };
}

export default connect(mapStateToProps, {
  fetchSmeca,
  editSmeca,
})(injectIntl(Smecam));

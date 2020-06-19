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
  Dropdown,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { fetchSmecam, editSmecam } from './smecamAction';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import TableHistory from './TableHistory';
import OutputErrors from '../../../general/error/outputErrors';
import './smecam.css';
import {
  stringYYYYMMDDHHMMSSToMoment,
  momentToStringYYYYMMDDHHMMSS,
  momentToStringYYYYMMDD,
  moneyInputHanler,
} from '../../../utils/helpers';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import 'moment/locale/ru';
import 'moment/locale/tr';
import { f4FetchServiceAppStatus } from '../../../reference/f4/f4_action';

const Smecam = props => {
  const {
    intl: { messages },
    smecamData = {},
    smecamHistory = [],
    smecamPutStatus = {},
    serviceAppStatus = [],
    smecamEditStatus,
  } = props;

  const url = window.location.search;
  const id = url.slice(url.indexOf('=') + 1);
  const lang = localStorage.getItem('language');
  useEffect(() => {
    props.fetchSmecam(id);
    props.f4FetchServiceAppStatus();
  }, []);
  const [smecam, setSmecam] = useState({});
  console.log('smecam', smecam);
  const [smecamHis, setSmecamHis] = useState([]);
  const [postStatus, setPostStatus] = useState(false);
  const [editStatus, setEditStatus] = useState(true);

  const serviceAppStatusOptions = serviceAppStatus.map(item => {
    return {
      key: item.id,
      text: item.name,
      value: item.id,
    };
  });

  useEffect(() => {
    const equal = JSON.stringify(smecam) === JSON.stringify(smecamData);
    if (equal == true) {
      setEditStatus(true);
    } else {
      setEditStatus(false);
    }
  }, [smecam]);

  useEffect(() => {
    if (smecamPutStatus.status == 'OK') {
      setPostStatus(true);
      props.fetchSmecam(id);
      setSmecam({ ...smecamPutStatus.data.application });
      setSmecamHis([...smecamPutStatus.data.applicationAudit]);
    } else {
      setPostStatus(false);
    }
  }, [smecamPutStatus]);

  const [error, setError] = useState([]);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (Object.keys(smecamData).length > 0) {
      setSmecam({ ...smecamData });
      setSmecamHis([...smecamHistory]);
    }
  }, [smecamData]);

  const handleChange = (value, fieldName) => {
    switch (fieldName) {
      case 'info':
        console.log('info value', value);
        setSmecam({ ...smecam, info: value });
        break;
      case 'applicationStatusId':
        console.log('applicationStatusId', value.value);
        setSmecam({ ...smecam, applicationStatusId: value.value });
        break;
      case 'rescheduledDate':
        setSmecam({
          ...smecam,
          rescheduledDate: momentToStringYYYYMMDDHHMMSS(value),
        });
        break;
      default:
    }
  };

  const handleSubmit = () => {
    console.log('EDIT BUTTON');
    props.editSmecam({ ...smecam });
  };

  return (
    <Container fluid>
      <Grid centered>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={16} computer={7}>
            <div className="spaceBetween">
              <h2>Заявка клиента</h2>
            </div>

            <Segment>
              <Form>
                <h3>{messages['L__CLIENT_INFO']}</h3>
                <Table compact striped>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>{messages['request_number']}</Table.Cell>
                      <Table.Cell>
                        <Input readOnly fluid value={smecam.id || ''} />
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
                          value={smecam.bukrsName || ''}
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
                          value={smecam.branchName || ''}
                        />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <Form.Field>{messages['Product']}</Form.Field>
                      </Table.Cell>
                      <Table.Cell>
                        <Input fluid readOnly value={smecam.matnrName || ''} />
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
                          value={smecam.applicationTypeName || ''}
                        />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell verticalAlign="top">
                        <Form.Field required>{messages['Operator']}</Form.Field>
                      </Table.Cell>
                      <Table.Cell>
                        <Input
                          fluid
                          readOnly
                          value={smecam.operatorFIO || ''}
                        />
                        <Table>
                          <Table.Body>
                            <Table.Row>
                              <Table.Cell>
                                <Input
                                  readOnly
                                  size="mini"
                                  label="F1"
                                  className="input__filter_terms"
                                  value={smecam.f1MtLeft ? smecam.f1MtLeft : ''}
                                />
                                <Input
                                  readOnly
                                  size="mini"
                                  label="F2"
                                  className="input__filter_terms"
                                  value={smecam.f2MtLeft ? smecam.f2MtLeft : ''}
                                />

                                <Input
                                  readOnly
                                  size="mini"
                                  label="F3"
                                  className="input__filter_terms"
                                  value={smecam.f3MtLeft ? smecam.f3MtLeft : ''}
                                />

                                <Input
                                  readOnly
                                  size="mini"
                                  label="F4"
                                  className="input__filter_terms"
                                  value={smecam.f4MtLeft ? smecam.f4MtLeft : ''}
                                />

                                <Input
                                  readOnly
                                  size="mini"
                                  label="F5"
                                  className="input__filter_terms"
                                  value={smecam.f5MtLeft ? smecam.f5MtLeft : ''}
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
                        <Input
                          fluid
                          readOnly
                          value={smecam.customerFIO || ''}
                        />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>{messages['address']}</Table.Cell>
                      <Table.Cell>
                        <Input
                          fluid
                          readOnly
                          value={smecam.addressName || ''}
                        />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{messages['contacts']}</Table.Cell>
                      <Table.Cell>
                        <Input fluid readOnly value={smecam.fullPhone || ''} />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{messages['productSerialNumber']}</Table.Cell>
                      <Table.Cell>
                        <Input fluid readOnly value={smecam.tovarSn || ''} />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{messages['installation_date']}</Table.Cell>
                      <Table.Cell>
                        <Input
                          fluid
                          readOnly
                          value={smecam.installmentDate || ''}
                        />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>CN</Table.Cell>
                      <Table.Cell>
                        <Input
                          fluid
                          readOnly
                          value={smecam.contractNumber || ''}
                        />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>{messages['goodsInstaller']}</Table.Cell>
                      <Table.Cell>
                        <Input fluid readOnly value={smecam.masterFIO || ''} />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        {`${messages['date_of_admission_to_the_service']} и время`}
                      </Table.Cell>
                      <Table.Cell>
                        <Input
                          fluid
                          readOnly
                          value={smecam.serviceDate || ''}
                        />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <Form.Field>
                          <label>{messages['transfer_date']}</label>
                        </Form.Field>
                      </Table.Cell>
                      <Table.Cell>
                        {/* <Input
                          fluid
                          readOnly
                          value={smecam.rescheduledDate || ''}
                        /> */}
                        <DatePicker
                          autoComplete="off"
                          dateFormat="DD/MM/YYYY HH:mm"
                          selected={
                            smecam.rescheduledDate == ''
                              ? ''
                              : stringYYYYMMDDHHMMSSToMoment(
                                  smecam.rescheduledDate,
                                )
                          }
                          dropdownMode="select"
                          locale={lang}
                          timeFormat="HH:mm"
                          showTimeSelect
                          // injectTimes={[
                          //   moment()
                          //     .hours(23)
                          //     .minutes(59),
                          // ]}
                          onChange={date =>
                            handleChange(date, 'rescheduledDate')
                          }
                        />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <Form.Field>
                          <label>{messages['L__ORDER_STATUS']}</label>
                        </Form.Field>
                      </Table.Cell>
                      <Table.Cell>
                        <Dropdown
                          value={smecam.applicationStatusId || ''}
                          selection
                          fluid
                          options={serviceAppStatusOptions}
                          onChange={(e, value) =>
                            handleChange(value, 'applicationStatusId')
                          }
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
                            style={{ minHeight: 100 }}
                            rows={1}
                            placeholder={messages['Table.Note']}
                            value={smecam.info || ''}
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
                    disabled={!editStatus}
                    color="green"
                    fluid
                    // onClick={() => handleSubmit()}
                  >
                    <Link
                      disabled={!editStatus}
                      className="linkColor"
                      target="_blank"
                      to={`../mainoperation/smcs?applicationNumber=${id}`}
                    >
                      Создать сервис карточку
                    </Link>
                  </Button>
                </Form.Field>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <TableHistory data={smecamHis} messages={messages} />
    </Container>
  );
};
function mapStateToProps(state) {
  return {
    smecamData: state.smecamReducer.smecamData,
    smecamHistory: state.smecamReducer.smecamHistory,
    smecamPutStatus: state.smecamReducer.smecamEditStatus,
    serviceAppStatus: state.f4.serviceAppStatus,
  };
}

export default connect(mapStateToProps, {
  fetchSmecam,
  editSmecam,
  f4FetchServiceAppStatus,
})(injectIntl(Smecam));

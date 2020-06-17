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
  Dropdown,
  TextArea,
  Button,
} from 'semantic-ui-react';
import { fetchSmecam, clearDynObjService, editSmecam } from './smecamAction';
import { LinkToSmcsWithRequest } from '../../../utils/outlink';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import TableHistory from './TableHistory';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { f4FetchServiceAppStatus } from '../../../reference/f4/f4_action';
import {
  momentToStringYYYYMMDDHHMMSS,
  stringYYYYMMDDHHMMSSToMoment,
} from '../../../utils/helpers';

import './smecam.css';

const Smecam = props => {
  const {
    intl: { messages },
    smecamData = {},
    smecamHistory = [],
    serviceAppStatus = [],
  } = props;

  const url = window.location.search;
  const id = url.slice(url.indexOf('=') + 1);

  const [smecam, setSmecam] = useState({});
  console.log('state SMECAM', smecam);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (Object.keys(smecamData).length > 0) {
      setSmecam({ ...smecamData });
    }
  }, [smecamData]);

  const [state, setState] = useState({});
  const language = localStorage.getItem('language');

  useEffect(() => {
    props.f4FetchServiceAppStatus();
    props.fetchSmecam(id);
  }, []);

  const handleChange = (value, fieldName) => {
    switch (fieldName) {
      case 'applicationStatusId': {
        setSmecam({ ...smecam, applicationStatusId: value });
        break;
      }
      case 'info': {
        setSmecam({ ...smecam, info: value });
        break;
      }

      case 'rescheduledDate': {
        setSmecam({
          ...smecam,
          rescheduledDate: momentToStringYYYYMMDDHHMMSS(value),
        });
        break;
      }
    }
  };

  const handleSave = () => {
    console.log('SAVE SMECAM');
    props.editSmecam({ ...smecam });
  };

  const serviceAppStatusOptions = serviceAppStatus.map(item => {
    return {
      key: item.id,
      text: item.ru,
      value: item.id,
    };
  });

  // const {
  //   historyDynamicObject,
  //   dynamicObject,
  //   fetchSmecam,
  //   intl: { messages },
  //   clearDynObjService,
  //   editSmecam,
  //   serviceAppStatus = [],
  // } = props;

  // let editList = {
  //   id: dynamicObject.id,
  //   bukrs: dynamicObject.bukrs,
  //   branchId: dynamicObject.branchId,
  //   appStatus: dynamicObject.appStatus,
  //   info: dynamicObject.info,
  //   rescheduledDate: dynamicObject.rescheduledDate,
  // };

  // const serviceAppStatusOptions = serviceAppStatus.map(item => {
  //   return {
  //     key: item.id,
  //     text: item.name,
  //     value: item.id,
  //   };
  // });

  // const [state, setState] = useState({});
  // const [errors, setErrors] = useState({});
  // const language = localStorage.getItem('language');

  // console.log('STATE', state);

  // useEffect(() => {
  //   setState({ ...editList });
  // }, [dynamicObject]);

  // useEffect(() => {
  //   clearDynObjService();
  //   if (id) fetchSmecam(id);
  //   props.f4FetchServiceAppStatus();
  // }, []);

  // const handleChange = (o, label) => {
  //   setState(prev => {
  //     let list = { ...prev };
  //     switch (label) {
  //       case 'servStatus': {
  //         list.appStatus = o;
  //         break;
  //       }
  //       case 'info': {
  //         list.info = o;
  //         break;
  //       }
  //       case 'rescheduledDate': {
  //         list.rescheduledDate = o ? o.format('DD.MM.YYYY HH:mm') : '';
  //       }
  //       default: {
  //         return list;
  //       }
  //     }

  //     return list;
  //   });
  // };

  // const handleSave = () => {
  //   console.log('Date', dynamicObject);
  // };

  // const validate = () => {
  //   let errorObj = {};
  //   if (state.id === null || state.id === undefined || !state.id) {
  //     errorObj.id = true;
  //   }
  //   if (state.bukrs === null || state.bukrs === undefined || !state.bukrs) {
  //     errorObj.bukrs = true;
  //   }
  //   if (
  //     state.branchId === null ||
  //     state.branchId === undefined ||
  //     !state.branchId
  //   ) {
  //     errorObj.branchId = true;
  //   }

  //   return errorObj;
  // };

  let columnsHistory = [
    {
      Header: messages['Form.Date'],
      accessor: 'revsttmp',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: messages['old'],
      accessor: 'date',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: messages['new'],
      accessor: 'date',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: messages['L__DESCRIPTION'],
      accessor: 'revType',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: messages['changed_by_employee'],
      accessor: 'username',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
  ];

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
        <Form>
          <Segment>
            <h2>{messages['customer_request']} </h2>
          </Segment>

          <Grid centered>
            <Grid.Row>
              <Grid.Column mobile={16} tablet={16} computer={8}>
                <Table compact striped>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>№ {messages['request_number']}</Table.Cell>
                      <Table.Cell>
                        <Input readOnly fluid value={smecam.id || ''} />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>{messages['bukrs']}</Table.Cell>

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
                      <Table.Cell>{messages['brnch']}</Table.Cell>

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
                      <Table.Cell>{messages['Product']}</Table.Cell>

                      <Table.Cell>
                        <Input fluid readOnly value={smecam.matnrName || ''} />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>{messages['type_of_application']}</Table.Cell>

                      <Table.Cell>
                        <Input
                          fluid
                          readOnly
                          value={smecam.applicationTypeName || ''}
                        />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{messages['Operator']}</Table.Cell>

                      <Table.Cell>
                        <Input
                          fluid
                          readOnly
                          value={smecam.operatorFIO || ''}
                        />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell></Table.Cell>
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

                    <Table.Row>
                      <Table.Cell>{messages['Form.ClientFullName']}</Table.Cell>

                      <Table.Cell>
                        <Input
                          fluid
                          readOnly
                          value={smecam.customerFIO || ''}
                        />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{messages['Table.Address']}</Table.Cell>

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
                    {/* <Table.Row>
                      <Table.Cell>{messages['service_time']}</Table.Cell>
                      <Table.Cell>
                        <Input
                          fluid
                          readOnly
                          value={smecam.serviceDate || ''}
                        />
                      </Table.Cell>
                    </Table.Row> */}

                    <Table.Row>
                      <Table.Cell>{messages['transfer_date']}</Table.Cell>
                      <Table.Cell>
                        <Input fluid>
                          <DatePicker
                            className="date-auto-width"
                            autoComplete="off"
                            showMonthDropdown
                            showYearDropdown
                            showTimeSelect
                            timeIntervals={15}
                            dropdownMode="select" // timezone="UTC"
                            selected={
                              smecam.rescheduledDate === null ||
                              smecam.rescheduledDate === undefined
                                ? ''
                                : stringYYYYMMDDHHMMSSToMoment(
                                    smecam.rescheduledDate,
                                  ) || ''
                            }
                            locale={language}
                            onChange={date => {
                              handleChange(date, 'rescheduledDate');
                            }}
                            dateFormat="DD.MM.YYYY HH:mm"
                            placeholderText={messages['transfer_date']}
                          />
                        </Input>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{messages['L__ORDER_STATUS']}</Table.Cell>
                      <Table.Cell>
                        <Dropdown
                          placeholder={messages['L__ORDER_STATUS']}
                          search
                          selection
                          fluid
                          options={serviceAppStatusOptions}
                          value={smecam.applicationStatusId}
                          onChange={(e, o) =>
                            handleChange(o.value, 'applicationStatusId')
                          }
                        />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{messages['Table.Note']}</Table.Cell>
                      <Table.Cell>
                        <TextArea
                          rows={1}
                          placeholder={messages['Table.Note']}
                          value={smecam.info || ''}
                          onChange={e => {
                            handleChange(e.target.value, 'info');
                          }}
                        />
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>

                <Form.Field>
                  <div align="center">
                    <Button primary onClick={handleSave}>
                      {messages['Form.Save']}
                    </Button>
                    <LinkToSmcsWithRequest applicationNumber={smecam.id} />
                  </div>
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Container>
      <TableHistory data={smecamHistory} messages={messages} />
    </div>
  );
};
function mapStateToProps(state) {
  return {
    smecamData: state.smecamReducer.smecamData,
    smecamHistory: state.smecamReducer.smecamHistory,
    serviceAppStatus: state.f4.serviceAppStatus,
  };
}

export default connect(mapStateToProps, {
  fetchSmecam,
  editSmecam,
  clearDynObjService,
  f4FetchServiceAppStatus,
})(injectIntl(Smecam));

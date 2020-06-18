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
import { fetchSmvca, clearDynObjService } from './smvcaAction';
import { LinkToSmcsWithRequest } from '../../../utils/outlink';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import TableHistory from './TableHistory';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import {
  f4FetchServiceAppStatus,
  f4FetchAvailabledTransactionByUser,
} from '../../../reference/f4/f4_action';
import {
  momentToStringYYYYMMDDHHMMSS,
  stringYYYYMMDDHHMMSSToMoment,
} from '../../../utils/helpers';

import './smvca.css';

const Smecam = props => {
  const {
    intl: { messages },
    smvcaData = {},
    smvcaHistory = [],
    serviceAppStatus = [],
  } = props;

  console.log('smvcaData', smvcaData);

  const url = window.location.search;
  const id = url.slice(url.indexOf('=') + 1);

  const [smvca, setSmvca] = useState({});
  const [smvcaHis, setSmvcaHis] = useState([]);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (Object.keys(smvcaData).length > 0) {
      setSmvca({ ...smvcaData });
      setSmvcaHis([...smvcaHistory]);
    }
  }, [smvcaData]);

  const [state, setState] = useState({});
  const language = localStorage.getItem('language');

  useEffect(() => {
    props.f4FetchServiceAppStatus();
    props.fetchSmvca(id);
    props.f4FetchAvailabledTransactionByUser();
  }, []);

  const handleChange = (value, fieldName) => {
    switch (fieldName) {
      case 'applicationStatusId': {
        setSmvca({ ...smvca, applicationStatusId: value });
        break;
      }
      case 'info': {
        setSmvca({ ...smvca, info: value });
        break;
      }

      case 'rescheduledDate': {
        setSmvca({
          ...smvca,
          rescheduledDate: momentToStringYYYYMMDDHHMMSS(value),
        });
        break;
      }
    }
  };

  const serviceAppStatusOptions = serviceAppStatus.map(item => {
    return {
      key: item.id,
      text: item.ru,
      value: item.id,
    };
  });

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
            <h2>Просмотр заявку клиента</h2>
          </Segment>

          <Grid centered>
            <Grid.Row>
              <Grid.Column mobile={16} tablet={16} computer={8}>
                <Table compact striped>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>№ {messages['request_number']}</Table.Cell>
                      <Table.Cell>
                        <Input readOnly fluid value={smvca.id || ''} />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>{messages['bukrs']}</Table.Cell>

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
                      <Table.Cell>{messages['brnch']}</Table.Cell>

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
                      <Table.Cell>{messages['Product']}</Table.Cell>

                      <Table.Cell>
                        <Input fluid readOnly value={smvca.matnrName || ''} />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>{messages['type_of_application']}</Table.Cell>

                      <Table.Cell>
                        <Input
                          fluid
                          readOnly
                          value={smvca.applicationTypeName || ''}
                        />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{messages['Operator']}</Table.Cell>

                      <Table.Cell>
                        <Input fluid readOnly value={smvca.operatorFIO || ''} />
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

                    <Table.Row>
                      <Table.Cell>{messages['Form.ClientFullName']}</Table.Cell>

                      <Table.Cell>
                        <Input fluid readOnly value={smvca.customerFIO || ''} />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{messages['Table.Address']}</Table.Cell>

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
                      <Table.Cell>{messages['Table.Note']}</Table.Cell>
                      <Table.Cell>
                        <TextArea
                          readOnly
                          rows={1}
                          placeholder={messages['Table.Note']}
                          value={smvca.info || ''}
                          onChange={e => {
                            handleChange(e.target.value, 'info');
                          }}
                        />
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Container>
      <TableHistory data={smvcaHistory} messages={messages} />
    </div>
  );
};
function mapStateToProps(state) {
  return {
    smvcaData: state.smvcaReducer.smvcaData,
    smvcaHistory: state.smvcaReducer.smvcaHistory,
    serviceAppStatus: state.f4.serviceAppStatus,
  };
}

export default connect(mapStateToProps, {
  fetchSmvca,
  clearDynObjService,
  f4FetchServiceAppStatus,
  f4FetchAvailabledTransactionByUser,
})(injectIntl(Smecam));

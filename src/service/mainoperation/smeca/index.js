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
  Button,
  TextArea,
} from 'semantic-ui-react';
import {
  fetchSmeca,
  fetchServAppStatus,
  clearDynObjService,
  editSmeca,
} from '../../serviceAction';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import ListHistory from './list';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
const Smeca = props => {
  const {
    historyDynamicObject,
    dynamicObject,
    fetchSmeca,
    intl: { messages },
    fetchServAppStatus,
    clearDynObjService,
    servAppStatusList,
    editSmeca,
  } = props;
  const url = window.location.search;
  const id = url.slice(url.indexOf('=') + 1);
  let emptyEditList = {
    id: dynamicObject.id,
    bukrs: dynamicObject.bukrs,
    branchId: dynamicObject.branchId,
    appStatus: dynamicObject.appStatus,
    info: dynamicObject.info,
    rescheduledDate: dynamicObject.rescheduledDate,
  };
  const [state, setState] = useState({});
  const [errors, setErrors] = useState({});
  const language = localStorage.getItem('language');
  useEffect(() => {
    setState({ ...emptyEditList });
  }, [dynamicObject]);

  useEffect(() => {
    clearDynObjService();
    if (id) fetchSmeca(id);
    fetchServAppStatus();
  }, []);

  const handleChange = (o, label) => {
    setState(prev => {
      let list = { ...prev };
      switch (label) {
        case 'servStatus': {
          list.appStatus = o.value;
          break;
        }
        case 'info': {
          list.info = o;
          break;
        }
        case 'rescheduledDate': {
          list.rescheduledDate = o ? o.format('DD.MM.YYYY HH:mm') : '';
        }
        default: {
          return list;
        }
      }

      return list;
    });
  };

  const handleSave = () => {
    let errs = validate();
    if (Object.keys(errs).length === 0) {
      editSmeca(state, () => {
        fetchSmeca(id);
      });
    }
    setErrors({ ...errs });
  };

  const validate = () => {
    let errorObj = {};
    if (state.id === null || state.id === undefined || !state.id) {
      errorObj.id = true;
    }
    if (state.bukrs === null || state.bukrs === undefined || !state.bukrs) {
      errorObj.bukrs = true;
    }
    if (
      state.branchId === null ||
      state.branchId === undefined ||
      !state.branchId
    ) {
      errorObj.branchId = true;
    }

    return errorObj;
  };
  const getServAppStatus = servAppStatusList => {
    if (!servAppStatusList || dynamicObject.appStatus === undefined) {
      return [];
    }
    let out = servAppStatusList.map(e => {
      return {
        key: e.id,
        text: e.name,
        value: e.id,
      };
    });
    return out;
  };

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
          <Header as="h2">{messages['editing_a_customer_request']} </Header>
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
                        {messages['bukrs']}{' '}
                      </Label>
                    </Table.Cell>

                    <Table.Cell>
                      <Input
                        fluid
                        readOnly
                        error={errors.bukrs ? true : false}
                        value={dynamicObject.bukrsName || ''}
                      />
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" required basic>
                        {' '}
                        {messages['brnch']}{' '}
                      </Label>
                    </Table.Cell>

                    <Table.Cell>
                      <Input
                        fluid
                        readOnly
                        error={errors.branchId ? true : false}
                        value={dynamicObject.branchName || ''}
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
                        {messages['productSerialNumber']}{' '}
                      </Label>
                    </Table.Cell>

                    <Table.Cell>
                      <Input
                        fluid
                        readOnly
                        value={dynamicObject.tovarSn || ''}
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
                      <Input
                        fluid
                        readOnly
                        value={dynamicObject.installmentDate || ''}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        CN
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
                      <Input fluid>
                        <DatePicker
                          // className="date-auto-width"
                          autoComplete="off"
                          showMonthDropdown
                          showYearDropdown
                          showTimeSelect
                          dropdownMode="select" // timezone="UTC"
                          timeIntervals={15}
                          selected={
                            state.rescheduledDate
                              ? moment(
                                  state.rescheduledDate,
                                  'DD.MM.YYYY HH:mm',
                                )
                              : ''
                          }
                          locale={language}
                          onChange={date =>
                            handleChange(date, 'rescheduledDate')
                          }
                          dateFormat="DD.MM.YYYY HH:mm"
                          placeholderText={messages['transfer_date']}
                        />
                      </Input>
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
                      <Dropdown
                        search
                        selection
                        fluid
                        readOnly
                        options={getServAppStatus(servAppStatusList)}
                        value={state.appStatus}
                        onChange={(e, o) => handleChange(o, 'servStatus')}
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
                  <TextArea
                    rows={1}
                    placeholder={messages['Table.Note']}
                    value={state.info || ''}
                    onChange={e => {
                      handleChange(e.target.value, 'info');
                    }}
                  />
                </Form.Field>
                <Form.Field>
                  <div align="center">
                    <Button
                      primary
                      onClick={() => {
                        handleSave();
                      }}
                    >
                      {' '}
                      {messages['Form.Save']}
                    </Button>
                  </div>
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
  fetchSmeca,
  fetchServAppStatus,
  clearDynObjService,
  editSmeca,
})(injectIntl(Smeca));

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Segment,
  Grid,
  Dropdown,
  Table,
  Input,
  Button,
  Form,
  TextArea,
  Checkbox,
} from 'semantic-ui-react';
import { fetchServAppType } from '../../reference/srefAction';
import { f4ClearAnyObject } from '../../../reference/f4/f4_action';

import {
  fetchSmccaldGetProductList,
  fetchCurrentStaff,
  postSmccaldCreateApp,
} from './smccaldActions';
import OutputErrors from '../../../general/error/outputErrors';
import {
  errorTableText,
  stringYYYYMMDDHHMMSSToMoment,
  momentToStringYYYYMMDDHHMMSS,
} from '../../../utils/helpers';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'moment/locale/ru';
import 'moment/locale/tr';
import { injectIntl } from 'react-intl';

import 'react-datepicker/dist/react-datepicker.css';
import './smccald.css';

function Smccald(props) {
  const {
    companyOptions = [],
    branchOptions = [],
    servAppType,
    smccaldProductList = [],
    currentStaff = {},
    intl: { messages },
    smccaldCreate,
  } = props;

  console.log('currentStaff', currentStaff);

  const emptyParam = {
    addressId: null,
    addressName: '',
    applicantName: '',
    applicationDate: '',
    applicationNumber: null,
    applicationStatusId: null,
    applicationStatusName: '',
    applicationTypeId: null,
    applicationTypeName: '',
    branchId: null,
    branchName: '',
    bukrsId: '',
    bukrsName: '',
    contractNumber: null,
    countryId: null,
    countryName: '',
    createdBy: null,
    customerFIO: '',
    customerId: null,
    f1MtLeft: null,
    f2MtLeft: null,
    f3MtLeft: null,
    f4MtLeft: null,
    f5MtLeft: null,
    fitterFIO: '',
    fitterId: null,
    fullPhone: '',
    id: null,
    inPhoneNum: '',
    info: '',
    installmentDate: '',
    masterFIO: '',
    masterId: null,
    matnrId: null,
    matnrName: '',
    operatorFIO: '',
    operatorId: null,
    rescheduledDate: '',
    serviceDate: '',
    serviceFilterPlanId: null,
    serviceFilterVCPlanId: null,
    serviceId: null,
    tovarCategoryId: null,
    tovarCategoryName: '',
    tovarSn: '',
    updatedBy: null,
    updatedDate: '',
    urgencyLevel: false,
  };

  const lang = localStorage.getItem('language');

  const [param, setParam] = useState({ ...emptyParam });

  console.log('PARAM', param);

  const [error, setError] = useState([]);

  const onInputChange = (o, fieldName) => {
    switch (fieldName) {
      case 'bukrsId':
        setParam({ ...param, bukrsId: o.value });

        break;
      case 'branchId':
        setParam({ ...param, branchId: o.value });
        break;

      case 'applicationTypeId':
        setParam({ ...param, applicationTypeId: o.value });
        break;
      case 'matnrId':
        setParam({ ...param, matnrId: o.value });
        break;
      case 'info':
        setParam({ ...param, info: o.value });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    let matnrId = param.matnrId;
    smccaldProductList.forEach(item => {
      if (item.matnr == matnrId) {
        setParam({
          ...param,
          tovarCategoryId: item.category,
        });
      }
    });
  }, [param.matnrId]);

  useEffect(() => {
    setParam({
      ...param,
      operatorId: currentStaff.staffId,
      operatorFIO: currentStaff.fullName,
    });
  }, [currentStaff]);

  useEffect(() => {
    props.fetchCurrentStaff();
  }, []);

  useEffect(() => {
    const userName = localStorage.getItem('username');
    let userId = localStorage.getItem('userId');
    setParam({ ...param, operatorFIO: userName, operatorId: parseInt(userId) });
    props.fetchServAppType();

    return () => {
      props.f4ClearAnyObject('F4_CLEAR_CONTYPE_LIST');
    };
  }, []);

  const productOptions = smccaldProductList.map(item => {
    return {
      key: item.matnr,
      text: item.text45,
      value: item.matnr,
      category: item.category,
    };
  });

  useEffect(() => {
    if (param.bukrsId != '') {
      props.fetchSmccaldGetProductList({ bukrs: param.bukrsId });
    }
  }, [param.bukrsId]);

  const validate = () => {
    const errors = [];
    if (param.applicationTypeId === '') {
      errors.push(errorTableText(166));
    }
    if (param.branchId === '') {
      errors.push(errorTableText(7));
    }
    if (param.bukrsId === '') {
      errors.push(errorTableText(5));
    }
    if (param.requestTypeId === '') {
      errors.push(errorTableText(17));
    }
    setError(() => errors);
  };

  const servAppOpts = (servAppType, lang) => {
    if (!servAppType) {
      return [];
    }
    let out = servAppType.map(item => {
      return {
        key: item.id,
        value: item.id,
        text: item[lang],
      };
    });
    return out;
  };

  const clearState = () => {
    setParam({
      ...emptyParam,
      operatorId: currentStaff.staffId,
      operatorFIO: currentStaff.fullName,
    });
  };

  const handleSubmit = () => {
    validate();

    if (
      param.applicationTypeId !== '' &&
      param.branchId !== '' &&
      param.bukrsId !== ''
    ) {
      props.postSmccaldCreateApp({
        ...param,
      });
      clearState();
    }
  };

  const getCompanyOptions = compOptions => {
    const companyOptions = compOptions;
    if (!companyOptions) {
      return [];
    }
    let out = compOptions.map(c => {
      return {
        key: parseInt(c.key, 10),
        text: `${c.text}`,
        value: parseInt(c.value, 10),
      };
    });
    return out;
  };

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column mobile={16} tablet={16} computer={7}>
          <h1>{messages['create_request_without_data']}</h1>
          <Segment>
            <Table compact striped>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>{messages['bukrs']}</Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      required
                      placeholder={messages['bukrs']}
                      fluid
                      selection
                      search
                      options={getCompanyOptions(companyOptions)}
                      value={param.bukrsId}
                      onChange={(e, o) => onInputChange(o, 'bukrsId')}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{messages['brnch']}</Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      placeholder={messages['brnch']}
                      fluid
                      selection
                      search
                      options={
                        param.bukrsId ? branchOptions[param.bukrsId] : []
                      }
                      value={param.branchId}
                      onChange={(e, o) => onInputChange(o, 'branchId')}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{messages['Product']}</Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      placeholder={messages['service']}
                      fluid
                      selection
                      search
                      options={productOptions}
                      value={param.matnrId}
                      onChange={(e, o) => onInputChange(o, 'matnrId')}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{messages['type_of_application']}</Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      placeholder={messages['type_of_application']}
                      fluid
                      selection
                      search
                      options={servAppOpts(servAppType, lang)}
                      value={param.applicationTypeId}
                      onChange={(e, o) => onInputChange(o, 'applicationTypeId')}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{messages['Application_Date']} </Table.Cell>
                  <Table.Cell>
                    <Table>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>
                            <Input>
                              <DatePicker
                                placeholder="Дата"
                                autoComplete="off"
                                deteFormat="YYYY-MM-DD HH:mm:ss"
                                selected={
                                  param.applicationDate === ''
                                    ? ''
                                    : stringYYYYMMDDHHMMSSToMoment(
                                        param.applicationDate,
                                      )
                                }
                                dropdownMode="select"
                                locale={lang}
                                showMonthDropDown
                                showYearDropDown
                                onChange={date =>
                                  setParam({
                                    ...param,
                                    applicationDate: momentToStringYYYYMMDDHHMMSS(
                                      date,
                                    ),
                                  })
                                }
                              />
                            </Input>
                          </Table.Cell>
                          <Table.Cell>
                            <Checkbox
                              checked={param.urgencyLevel}
                              label={messages['urgent']}
                              onChange={(e, o) => {
                                setParam({ ...param, urgencyLevel: o.checked });
                              }}
                            />
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell verticalAlign="top">
                    {messages['Operator']}
                  </Table.Cell>
                  <Table.Cell>
                    <Input size="small" fluid value={param.operatorFIO} />
                    <Table>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>
                            <Input
                              size="mini"
                              label="F1"
                              className="input__filter_terms"
                              disabled
                            />
                            <Input
                              size="mini"
                              label="F2"
                              className="input__filter_terms"
                              disabled
                            />
                            <Input
                              size="mini"
                              label="F3"
                              className="input__filter_terms"
                              disabled
                            />
                            <Input
                              size="mini"
                              label="F4"
                              className="input__filter_terms"
                              disabled
                            />
                            <Input
                              size="mini"
                              label="F5"
                              className="input__filter_terms"
                              disabled
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
                    <Input size="small" fluid disabled />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{messages['address']}</Table.Cell>
                  <Table.Cell>
                    <Input size="small" fluid disabled />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{messages['contacts']}</Table.Cell>
                  <Table.Cell>
                    <Input size="small" fluid disabled />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{messages['productSerialNumber']}</Table.Cell>
                  <Table.Cell>
                    <Input size="small" fluid disabled />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{messages['installation_date']}</Table.Cell>
                  <Table.Cell>
                    <Input disabled>
                      <DatePicker
                        autoComplete="off"
                        deteFormat="DD/MM/YYYY"
                        selected={moment(new Date())}
                        dropdownMode="select"
                        showMonthDropDown
                        showYearDropDown
                      />
                    </Input>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{messages['goodsInstaller']}</Table.Cell>
                  <Table.Cell>
                    <Input size="small" fluid disabled />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{messages['bktxt']}</Table.Cell>
                  <Table.Cell>
                    <Form>
                      <TextArea
                        placeholder={messages['bktxt']}
                        value={param.info}
                        onChange={(e, o) => onInputChange(o, 'info')}
                      />
                    </Form>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Button color="blue" fluid onClick={() => handleSubmit()}>
              {messages['save']}
            </Button>
          </Segment>
          <OutputErrors errors={error} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

function mapStateToProps(state) {
  return {
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsService,
    servAppType: state.srefReducer.servAppType,
    smccaldProductList: state.smccaldReducer.smccaldProductList,
    currentStaff: state.smccaldReducer.currentStaff,
    smccaldCreate: state.smccaldReducer.smccaldCreate,
  };
}

export default connect(mapStateToProps, {
  f4ClearAnyObject,
  fetchServAppType,
  postSmccaldCreateApp,
  fetchSmccaldGetProductList,
  fetchCurrentStaff,
})(injectIntl(Smccald));

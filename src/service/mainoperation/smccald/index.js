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
import {
  f4ClearAnyObject,
  f4FetchCurrentStaff,
} from '../../../reference/f4/f4_action';

import {
  fetchSmccaldGetProductList,
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
    //smccaldCreate,
    smccaldPostStatus = {},
  } = props;

  const [postStatus, setPostStatus] = useState(false);

  useEffect(() => {
    if (smccaldPostStatus.status == 'OK') {
      setPostStatus(true);
    } else {
      setPostStatus(false);
    }
  }, [smccaldPostStatus]);

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
    operatorId: currentStaff.staffId == undefined ? '' : currentStaff.staffId,
    operatorFIO:
      currentStaff.fullName == undefined ? '' : currentStaff.fullName,
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

  console.log('param', param);

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
    smccaldProductList.forEach(item => {
      if (parseInt(item.matnr) == param.matnrId) {
        setParam({
          ...param,
          tovarCategoryId: item.category,
        });
      }
    });
  }, [param.matnrId]);

  useEffect(() => {
    if (Object.keys(currentStaff).length > 0) {
      setParam({
        ...param,
        operatorId: currentStaff.staffId,
        operatorFIO: currentStaff.fullName,
      });
    }
  }, [currentStaff]);

  useEffect(() => {
    props.f4FetchCurrentStaff();
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

  useEffect(() => {
    const errors = [];
    if (
      param.bukrsId === '' ||
      param.bukrsId === null ||
      param.bukrsId === undefined
    ) {
      errors.push(errorTableText(5));
    }

    if (
      param.branchId === '' ||
      param.branchId === null ||
      param.branchId === undefined
    ) {
      errors.push(errorTableText(7));
    }

    if (
      param.matnrId === '' ||
      param.matnrId === null ||
      param.matnrId === undefined
    ) {
      errors.push(errorTableText(173));
    }

    if (
      param.applicationTypeId === '' ||
      param.applicationTypeId === null ||
      param.applicationTypeId === undefined
    ) {
      errors.push(errorTableText(166));
    }
    if (
      param.operatorId === '' ||
      param.operatorId === null ||
      param.operatorId === undefined
    ) {
      errors.push(errorTableText(17));
    }
    setError(() => errors);
    setPostStatus(false);
  }, [param]);

  useEffect(() => {
    if (postStatus == true) {
      setParam({
        ...emptyParam,
      });
    }
  }, [postStatus]);

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

  const [errorsView, setErrorsView] = useState([]);

  const handleSubmit = () => {
    if (error == undefined || error == null || error.length == 0) {
      setErrorsView([]);
      props.postSmccaldCreateApp({
        ...param,
      });
    } else {
      setErrorsView([...error]);
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
          <h2>Создать заявку без данных</h2>
          <Segment>
            <Form>
              <h3>{messages['L__CLIENT_INFO']}</h3>
              <Table compact striped>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Form.Field required>
                        <label>{messages['bukrs']}</label>
                      </Form.Field>
                    </Table.Cell>
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
                    <Table.Cell>
                      <Form.Field required>
                        <label>{messages['brnch']}</label>
                      </Form.Field>
                    </Table.Cell>
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
                    <Table.Cell>
                      <Form.Field required>
                        <label>{messages['Product']}</label>
                      </Form.Field>
                    </Table.Cell>
                    <Table.Cell>
                      <Dropdown
                        placeholder={messages['Product']}
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
                    <Table.Cell>
                      <Form.Field required>
                        <label>{messages['type_of_application']}</label>
                      </Form.Field>
                    </Table.Cell>
                    <Table.Cell>
                      <Dropdown
                        placeholder={messages['type_of_application']}
                        fluid
                        selection
                        search
                        options={servAppOpts(servAppType, lang)}
                        value={param.applicationTypeId}
                        onChange={(e, o) =>
                          onInputChange(o, 'applicationTypeId')
                        }
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Form.Field>
                        <label>{messages['Application_Date']}</label>
                      </Form.Field>
                    </Table.Cell>
                    <Table.Cell>
                      <Table>
                        <Table.Body>
                          <Table.Row>
                            <Table.Cell>
                              <DatePicker
                                placeholderText={messages['Application_Date']}
                                autoComplete="off"
                                dateFormat="DD/MM/YYYY HH:mm"
                                selected={
                                  param.applicationDate === ''
                                    ? ''
                                    : stringYYYYMMDDHHMMSSToMoment(
                                        param.applicationDate,
                                      )
                                }
                                dropdownMode="select"
                                locale={lang}
                                timeFormat="HH:mm"
                                showTimeSelect
                                injectTimes={[
                                  moment()
                                    .hours(23)
                                    .minutes(59),
                                ]}
                                onChange={date =>
                                  setParam({
                                    ...param,
                                    applicationDate: momentToStringYYYYMMDDHHMMSS(
                                      date,
                                    ),
                                  })
                                }
                              />
                            </Table.Cell>

                            <Table.Cell collapsing>
                              <Checkbox
                                checked={param.urgencyLevel}
                                onChange={(e, o) => {
                                  setParam({
                                    ...param,
                                    urgencyLevel: o.checked,
                                  });
                                }}
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
                      <Input
                        readOnly
                        size="small"
                        fluid
                        value={param.operatorFIO}
                      />
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
                      <DatePicker
                        disabled
                        autoComplete="off"
                        dateFormat="DD/MM/YYYY HH:mm"
                        dropdownMode="select"
                        locale={lang}
                        timeFormat="HH:mm"
                        showTimeSelect
                        injectTimes={[
                          moment()
                            .hours(23)
                            .minutes(59),
                        ]}
                        maxDate={moment(new Date())}
                        onChange={date =>
                          setParam({
                            ...param,
                            installmentDate: momentToStringYYYYMMDDHHMMSS(date),
                          })
                        }
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>{messages['goodsInstaller']}</Table.Cell>
                    <Table.Cell>
                      <Input size="small" fluid disabled />
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
                          placeholder={messages['bktxt']}
                          value={param.info}
                          onChange={(e, o) => onInputChange(o, 'info')}
                        />
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
              <OutputErrors errors={errorsView} />
              <Form.Field>
                <Button color="blue" fluid onClick={() => handleSubmit()}>
                  {messages['save']}
                </Button>
              </Form.Field>
            </Form>
          </Segment>
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
    smccaldPostStatus: state.smccaldReducer.smccaldPostStatus,
    currentStaff: state.f4.staffInfo,
  };
}

export default connect(mapStateToProps, {
  f4ClearAnyObject,
  fetchServAppType,
  postSmccaldCreateApp,
  fetchSmccaldGetProductList,
  f4FetchCurrentStaff,
})(injectIntl(Smccald));

import React, { useState } from 'react';
import {
  Grid,
  Dropdown,
  Button,
  Icon,
  Input,
  Form,
  Segment,
} from 'semantic-ui-react';
import OutputErrors from '../../../general/error/outputErrors';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CustomerF4Modal from '../../../reference/f4/Customer/customerF4';
require('moment/locale/ru');
require('moment/locale/tr');

const iconStyle = {
  position: 'absolute',
  top: '1.5em',
  bottom: 0,
  margin: '1em',
  right: '2.5em',
  lineHeight: 1,
  zIndex: 1,
};

export default function SearchOpt(props) {
  const [errors, setErrors] = useState([]);

  const selectedCustomer = customer => {
    props.selectedCustomer(customer);
  };

  const {
    dealers,
    demosec,
    collectors,
    contstatus,
    contlaststate,
  } = props.dynObjDmsc;
  const {
    messages,
    companyOptions,
    branchOptions,
    callModalOpen,
    cancelForm,
    searchPms,
    srchModal,
    inputChange,
    handleClear,
  } = props;

  const searchContract = () => {
    let errors = [];
    const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
    const language = localStorage.getItem('language');
    const { bukrs } = searchPms;

    if (bukrs === null || bukrs === undefined || !bukrs) {
      errors.push(errorTable['5' + language]);
    }
    if (errors === null || errors === undefined || errors.length === 0) {
      props.searchContract();
    }
    setErrors(errors);
  };
  const language = localStorage.getItem('language');
  return (
    <div>
      <Segment clearing>
        <Form>
          <Grid>
            <Grid.Row>
              <Grid.Column width={3}>
                <Form.Field required>
                  <label>{messages['bukrs']}</label>
                  <Dropdown
                    fluid
                    selection
                    search
                    value={searchPms.bukrs}
                    options={getCompanyOptions(companyOptions)}
                    onChange={(e, o) => inputChange('bukrs', o)}
                    placeholder={messages['bukrs']}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={3}>
                <Form.Field>
                  <label>{messages['brnch']}</label>
                  <Dropdown
                    fluid
                    selection
                    search
                    multiple
                    value={searchPms.brIds}
                    options={getBranchOptions(branchOptions, searchPms.bukrs)}
                    onChange={(e, o) => inputChange('branchIds', o)}
                    placeholder={messages['all']}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={3}>
                <Form.Field>
                  <label>{messages['Crm.DemoSecretary']}</label>
                  <Icon
                    link
                    name="close"
                    style={iconStyle}
                    onClick={() => handleClear('demoSecId')}
                  />
                  <Dropdown
                    fluid
                    search
                    selection
                    options={getDsecrets(demosec)}
                    onChange={(e, o) => inputChange('demoSecId', o)}
                    value={searchPms.demoSecId}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={3}>
                <Form.Field>
                  <label>{messages['collector']}</label>
                  <Dropdown
                    fluid
                    search
                    selection
                    options={getCollectors(collectors)}
                    onChange={(e, o) => inputChange('collId', o)}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={2}>
                <Form.Field>
                  <label>{'Trade IN'}</label>
                  <Icon
                    link
                    name="close"
                    style={iconStyle}
                    onClick={() => handleClear('tradeIn')}
                  />
                  <Dropdown
                    fluid
                    search
                    selection
                    options={getTradeIn(messages)}
                    onChange={(e, o) => inputChange('tradeIn', o)}
                    value={searchPms.tradeIn}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={2}>
                <Form.Field>
                  <label>{messages['Form.DateFrom']}</label>
                  <DatePicker
                    className="date-100-width"
                    autoComplete="off"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select" //timezone="UTC"
                    locale={language}
                    selected={searchPms.dateFrom ? searchPms.dateFrom : null}
                    locale="ru"
                    // onChange={(e, o) => { inputChange('dateFrom',e); }}
                    onChange={v => inputChange('dateFrom', v)}
                    dateFormat="DD.MM.YYYY"
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            {
              //*************************************** SECOND ROW ***************************** */
            }
            <Grid.Row>
              <Grid.Column width={3}>
                <Form.Field>
                  <label>{messages['L__DEALER']}</label>
                  <Icon
                    link
                    name="close"
                    style={iconStyle}
                    onClick={() => handleClear('dealerId')}
                  />
                  <Dropdown
                    fluid
                    selection
                    search
                    options={getDealerOptions(dealers)}
                    onChange={(e, o) => inputChange('dealerId', o)}
                    value={searchPms.dealerId}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={4}>
                <Form.Field>
                  <label>{messages['Form.Client']}</label>
                  <Input
                    style={{ width: '80%' }}
                    defaultValue={searchPms.fullFIO}
                    readOnly
                  />
                  <Button style={{ width: '10%' }} onClick={callModalOpen} icon>
                    <Icon name="search" />
                  </Button>
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={3}>
                <Form.Field>
                  <label>{messages['fin_status']}</label>
                  <Dropdown
                    fluid
                    selection
                    search
                    multiple
                    options={getContractStatus(contstatus)}
                    onChange={(e, o) => inputChange('contract_status_id', o)}
                    value={searchPms.cont_st_ids}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={2}>
                <Form.Field>
                  <label>{messages['phys_status']}</label>
                  <Icon
                    link
                    name="close"
                    style={iconStyle}
                    onClick={() => handleClear('physCond')}
                  />
                  <Dropdown
                    fluid
                    search
                    selection
                    options={getContractLastState(contlaststate)}
                    onChange={(e, o) => inputChange('physCond', o)}
                    value={searchPms.physCond}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={2}>
                <Form.Field>
                  <label>{messages['paid']}</label>
                  <Icon
                    link
                    name="close"
                    style={iconStyle}
                    onClick={() => handleClear('paySchedule')}
                  />
                  <Dropdown
                    fluid
                    search
                    selection
                    options={getPaymentShedule()}
                    onChange={(e, o) => inputChange('paySchedule', o)}
                    value={searchPms.paySchedule}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={2}>
                <Form.Field>
                  <label>{messages['Form.DateTo']}</label>
                  <DatePicker
                    className="date-100-width"
                    autoComplete="off"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select" //timezone="UTC"
                    locale={language}
                    selected={searchPms.dateTo ? searchPms.dateTo : null}
                    locale="ru"
                    onChange={v => inputChange('dateTo', v)}
                    dateFormat="DD.MM.YYYY"
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
        <OutputErrors errors={errors} />
      </Segment>
      <CustomerF4Modal
        open={srchModal}
        onCloseCustomerF4={cancelForm}
        onCustomerSelect={selectedCustomer}
      />
      <Button
        color="teal"
        floated="right"
        onClick={() => {
          searchContract();
        }}
      >
        {messages['search']}
      </Button>
      <br />
      <br />
    </div>
  );
}

/*************************************************** FIRST ROW */
const getCompanyOptions = compOptions => {
  const companyOptions = compOptions;
  if (!companyOptions) {
    return [];
  }
  let out = companyOptions.map(c => {
    return {
      key: parseInt(c.key, 10),
      text: `${c.text}`,
      value: parseInt(c.value, 10),
    };
  });
  return out;
};

const getBranchOptions = (brOptions, bukrs) => {
  const brachOptions = brOptions;
  if (!bukrs) {
    return [];
  }
  let out = brachOptions[bukrs].map(c => {
    return {
      key: parseInt(c.key, 10),
      text: `${c.text}`,
      value: parseInt(c.value, 10),
    };
  });

  return out;
};

const getDealerOptions = dealers => {
  let def = [
    { key: 0, text: 'не работаюший', value: 0 },
    { key: 1, text: 'Активные', value: 1 },
  ];
  if (!dealers) {
    return def;
  }
  let out = dealers.map(c => {
    return {
      key: parseInt(c.dealerId, 10),
      text: `${c.diler}`,
      value: parseInt(c.dealerId, 10),
    };
  });
  return [...def, ...out];
};

const getDsecrets = demosec => {
  let def = [
    { key: 0, text: 'не работаюший', value: 0 },
    { key: 1, text: 'Активные', value: 1 },
  ];
  if (!demosec) {
    return def;
  }
  let out = demosec.map(c => {
    return {
      key: parseInt(c.demoSecId, 10),
      text: `${c.demoSecName}`,
      value: parseInt(c.demoSecId, 10),
    };
  });
  return [...def, ...out];
};

const getCollectors = collectors => {
  if (!collectors) {
    return [];
  }

  let out = collectors.map(c => {
    return {
      key: parseInt(c.collId, 10),
      text: `${c.collName}`,
      value: parseInt(c.collId, 10),
    };
  });
  return out;
};

const getTradeIn = messages => {
  let out = [
    { key: 0, text: messages['noDataText'], value: 0 },
    { key: 1, text: 'Внутренние', value: 1 },
    { key: 2, text: 'Внешние', value: 2 },
  ];
  return out;
};

/*************************************************** SECOND ROW */
const getContractStatus = contstatus => {
  if (!contstatus) {
    return [];
  }

  let out = contstatus.map(c => {
    return {
      key: parseInt(c.contract_status_id, 10),
      text: `${c.name}`,
      value: parseInt(c.contract_status_id, 10),
    };
  });
  return out;
};

const getContractLastState = contlaststate => {
  if (!contlaststate) {
    return [];
  }

  let out = contlaststate.map(c => {
    return {
      key: parseInt(c.id, 10),
      text: `${c.oper_name_ru}`,
      value: parseInt(c.id, 10),
    };
  });
  return out;
};

const getPaymentShedule = () => {
  let out = [
    { key: 0, text: 'Наличными', value: 0 },
    { key: 1, text: 'В рассрочку', value: 1 },
  ];
  return out;
};

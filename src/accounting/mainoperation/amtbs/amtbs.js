import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Header,
  Segment,
  List,
  Button,
  Icon,
  Table,
  Confirm,
  Input,
  Label,
} from 'semantic-ui-react';
import FaHeader from '../../../finance/faHeader';
import {
  f4FetchDepartmentList,
  f4FetchCurrencyList,
  f4FetchExchangeRateNational,
} from '../../../reference/f4/f4_action';
import {
  clearfaBkpf,
  changefaBkpf,
  fetchExpenseHkontsByBukrs,
} from '../../../finance/fa_action';
import { saveAccSrcDocs } from '../../accounting_action';
import { moneyInputHanler } from '../../../utils/helpers';
import { handleFocus, moneyFormat } from '../../../utils/helpers';
import OutputErrors from '../../../general/error/outputErrors';
import { modifyLoader } from '../../../general/loader/loader_action';
import { injectIntl } from 'react-intl';
import CustomerF4Modal from '../../../reference/f4/Customer/customerF4';

import moment from 'moment';

const Amtbs = props => {
  const {
    bkpf = {},
    initialBkpf = {},
    activeLoader,
    intl: { messages },
    language,
  } = props;

  const [customerF4ModalOpen, setCustomerF4ModalOpen] = useState(false);
  const [errors, setErrors] = useState([]);
  const [lifnrDebit, setLifnrDebit] = useState(null);
  const [lifnrNameDebit, setLifnrNameDebit] = useState('');
  const [lifnrCredit, setLifnrCredit] = useState(null);
  const [lifnrNameCredit, setLifnrNameCredit] = useState('');
  const [selectedCustomerRow, setSelectedCustomerRow] = useState('');
  const [amount, setAmount] = useState('0');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // const [hkont_s, setHkont_s] = useState('');

  //componentDidMount
  useEffect(() => {
    initializeBkpfBseg();
    props.f4FetchCurrencyList('amtbs');
    props.f4FetchDepartmentList();
    props.f4FetchExchangeRateNational();

    //unmount
    return () => {
      props.clearfaBkpf();
    };
  }, []);

  //componentWillReceiveProps
  useEffect(() => {
    props.fetchExpenseHkontsByBukrs(bkpf.bukrs);
  }, [bkpf.bukrs]);

  const onInputChange = (value, stateFieldName) => {
    // let bseg = {...props.bseg};
    if (stateFieldName === 'amount') {
      const newVal = moneyInputHanler(value, 2);
      if (newVal !== undefined) {
        setAmount(newVal);
      }
    } else if (stateFieldName === 'lifnr') {
      if (selectedCustomerRow === 'Credit') {
        setLifnrCredit(value.id);
        setLifnrNameCredit(value.fio);
      } else if (selectedCustomerRow === 'Debit') {
        setLifnrDebit(value.id);
        setLifnrNameDebit(value.fio);
      }
    }
  };

  const initializeBkpfBseg = () => {
    const bkpf = Object.assign({}, initialBkpf);
    bkpf.blart = 'VN';
    bkpf.budat = moment().format('YYYY-MM-DD');
    bkpf.bldat = moment().format('YYYY-MM-DD');

    props.changefaBkpf(bkpf);
    initialBseg();
  };
  const initialBseg = () => {
    setCustomerF4ModalOpen(false);
    setErrors([]);
    setLifnrCredit(null);
    setLifnrNameCredit('');
    setLifnrDebit(null);
    setLifnrNameDebit('');
    setAmount('0');
  };
  const save = () => {
    props.modifyLoader(true);
    let errors = [];
    errors = validate();
    if (errors === null || errors === undefined || errors.length === 0) {
      const wa_bseg_debit = { lifnr: lifnrDebit, shkzg: 'S' };
      const wa_bseg_credit = { lifnr: lifnrCredit, shkzg: 'H' };
      const bseg = [];
      bseg.push(wa_bseg_debit);
      bseg.push(wa_bseg_credit);

      const args = {
        bkpf: { ...bkpf },
        amount,
        l_bseg: bseg,
      };
      props.saveAccSrcDocs(args, 'AMTBS', () => initializeBkpfBseg());
    } else {
      props.modifyLoader(false);
    }

    setErrors(errors);
  };
  const validate = () => {
    // getter
    // console.log(localStorage.getItem('language'),'error');

    const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
    const errors = [];
    const { bukrs, brnch, dep, waers, bldat } = bkpf;
    if (bukrs === null || bukrs === undefined || !bukrs) {
      errors.push(errorTable[`5${language}`]);
    }
    if (brnch === null || brnch === undefined || !brnch) {
      errors.push(errorTable[`7${language}`]);
    }
    if (dep === null || dep === undefined || !dep) {
      errors.push(errorTable[`4${language}`]);
    }
    if (waers === null || waers === undefined || !waers) {
      errors.push(errorTable[`1${language}`]);
    }
    if (bldat === null || bldat === undefined || !bldat) {
      errors.push(errorTable[`15${language}`]);
    }

    if (lifnrDebit === null || lifnrDebit === undefined || !lifnrDebit) {
      errors.push('Debit: ' + errorTable[`9${language}`]);
    }
    if (lifnrCredit === null || lifnrCredit === undefined || !lifnrCredit) {
      errors.push('Credit: ' + errorTable[`9${language}`]);
    }
    if (
      amount === null ||
      amount === undefined ||
      !amount ||
      parseFloat(amount) <= 0
    ) {
      errors.push(errorTable[`61${language}`]);
    }
    return errors;
  };

  const bkpfInfo = {
    bukrsInfo: { readOnly: false, disabled: false },
    brnchInfo: { readOnly: false, disabled: false },
    business_area_idInfo: { readOnly: true, disabled: true },
    depInfo: { readOnly: false, disabled: false },
    budatInfo: { readOnly: false, disabled: true },
    bldatInfo: { readOnly: false, disabled: false },
    blartInfo: { readOnly: true, disabled: false },
    waersInfo: { readOnly: false, disabled: false },
    kursfInfo: { readOnly: true, disabled: false },
    bktxtInfo: { readOnly: false, disabled: false },
    officialInfo: { readOnly: true, disabled: true },
    zregInfo: { readOnly: true, disabled: true },
  };

  return (
    <Container
      fluid
      style={{
        marginTop: '2em',
        marginBottom: '2em',
        paddingLeft: '2em',
        paddingRight: '2em',
      }}
    >
      <Header as="h2" block>
        {messages['transNameAmtbs']}
      </Header>
      <Confirm
        open={isConfirmOpen}
        content={messages['questionAreYouSure']}
        cancelButton={messages['no']}
        confirmButton={messages['yes']}
        size={'mini'}
        onCancel={() => {
          setIsConfirmOpen(false);
        }}
        onConfirm={() => {
          setIsConfirmOpen(false);
          save();
        }}
      />
      <Segment padded size="small">
        <List horizontal>
          <List.Item>
            <List.Content>
              <Button
                icon
                labelPosition="left"
                primary
                size="small"
                onClick={() => setIsConfirmOpen(true)}
                disabled={activeLoader}
              >
                <Icon name="save" size="large" /> {messages['save']}
              </Button>
            </List.Content>
          </List.Item>
        </List>
      </Segment>

      <OutputErrors errors={errors} />

      <FaHeader {...props} bkpfInfo={bkpfInfo} />
      <CustomerF4Modal
        open={customerF4ModalOpen}
        onCloseCustomerF4={bool => setCustomerF4ModalOpen(bool)}
        onCustomerSelect={item => onInputChange(item, 'lifnr')}
      />

      <Segment padded size="small">
        <Label color="red" ribbon>
          {messages['position']}
        </Label>

        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>{messages['customer']}</Table.HeaderCell>
              <Table.HeaderCell>{messages['shkzg']}</Table.HeaderCell>
              <Table.HeaderCell>{messages['amount']}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <span>
                  {' '}
                  {lifnrNameDebit}{' '}
                  <Button
                    icon="external"
                    onClick={() => {
                      setCustomerF4ModalOpen(true);
                      setSelectedCustomerRow('Debit');
                    }}
                  />
                </span>
              </Table.Cell>
              <Table.Cell>
                <Input color="teal" value={'Debit'} readOnly={true} />
              </Table.Cell>
              <Table.Cell>
                <Input
                  label={bkpf.waers}
                  labelPosition="left"
                  color="teal"
                  value={moneyFormat(amount)}
                  onFocus={handleFocus}
                  maxLength="18"
                  onChange={(e, { value }) => onInputChange(value, 'amount')}
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <span>
                  {' '}
                  {lifnrNameCredit}{' '}
                  <Button
                    icon="external"
                    onClick={() => {
                      setCustomerF4ModalOpen(true);
                      setSelectedCustomerRow('Credit');
                    }}
                  />
                </span>
              </Table.Cell>
              <Table.Cell>
                <Input color="teal" value={'Credit'} readOnly={true} />
              </Table.Cell>
              <Table.Cell>
                <Input
                  label={bkpf.waers}
                  labelPosition="left"
                  color="teal"
                  value={moneyFormat(amount)}
                  onFocus={handleFocus}
                  maxLength="18"
                  disabled={true}
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Segment>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </Container>
  );
};

function mapStateToProps(state) {
  // console.log(state.fa.faForm.bkpf, 'state');
  return {
    language: state.locales.lang,
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsAll,
    currencyOptions: state.f4.currencyOptions,
    departmentOptions: state.f4.departmentOptions,
    businessAreaOptions: state.f4.businessAreaList,
    exRateNational: state.f4.exRateNational,
    bkpf: state.fa.faForm.bkpf,
    initialBkpf: state.fa.faForm.initialBkpf,
    hkontOptions: state.fa.faForm.hkontOptions2,
    bseg: state.fa.dynamicObject,
  };
}

export default connect(mapStateToProps, {
  f4FetchDepartmentList,
  f4FetchCurrencyList,
  modifyLoader,
  f4FetchExchangeRateNational,
  changefaBkpf,
  clearfaBkpf,
  fetchExpenseHkontsByBukrs,
  saveAccSrcDocs,
})(injectIntl(Amtbs));

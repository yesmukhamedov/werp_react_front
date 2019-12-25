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
  Dropdown,
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

const Ampi = props => {
  const {
    hkontOptions = [],
    bkpf = {},
    initialBkpf = {},
    activeLoader,
    intl: { messages },
    language,
  } = props;

  const [customerF4ModalOpen, setCustomerF4ModalOpen] = useState(false);
  const [errors, setErrors] = useState([]);
  const [lifnr, setLifnr] = useState(null);
  const [lifnrName, setLifnrName] = useState('');
  const [amount, setAmount] = useState('0');
  const [hkont_s, setHkont_s] = useState('');

  //componentDidMount
  useEffect(() => {
    initializeBkpfBseg();
    props.f4FetchCurrencyList('ampi');
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
      setLifnr(value.id);
      setLifnrName(value.fio);
    } else if (stateFieldName === 'hkont_s') {
      setHkont_s(value);
    }
  };

  const initializeBkpfBseg = () => {
    const bkpf = Object.assign({}, initialBkpf);
    bkpf.blart = 'AE';
    bkpf.budat = moment().format('YYYY-MM-DD');
    bkpf.bldat = moment().format('YYYY-MM-DD');

    props.changefaBkpf(bkpf);
    initialBseg();
  };
  const initialBseg = () => {
    setCustomerF4ModalOpen(false);
    setErrors([]);
    setLifnr(null);
    setLifnrName('');
    setAmount('0');
    setHkont_s('');
  };
  const save = () => {
    props.modifyLoader(true);
    let errors = [];
    errors = validate();
    if (errors === null || errors === undefined || errors.length === 0) {
      const bkpf = { ...bkpf };
      const args = {
        bkpf,
        amount,
        lifnr,
        hkont_s,
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

    if (lifnr === null || lifnr === undefined || !lifnr) {
      errors.push(errorTable[`9${language}`]);
    }
    if (hkont_s === null || hkont_s === undefined || !hkont_s) {
      errors.push(errorTable[`12${language}`]);
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
    officialInfo: { readOnly: false, disabled: false },
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
        {messages['transNameAmpi']}
      </Header>
      <Segment padded size="small">
        <List horizontal>
          <List.Item>
            <List.Content>
              <Button
                icon
                labelPosition="left"
                primary
                size="small"
                onClick={() => save()}
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
              <Table.HeaderCell>{messages['hkont']}</Table.HeaderCell>
              <Table.HeaderCell>{messages['amount']}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <span>
                  {' '}
                  {lifnrName}{' '}
                  <Button
                    icon="external"
                    onClick={() => {
                      setCustomerF4ModalOpen(true);
                    }}
                  />
                </span>
              </Table.Cell>
              <Table.Cell>
                <Dropdown
                  fluid
                  search
                  selection
                  options={hkontOptions}
                  value={hkont_s}
                  onChange={(e, { value }) => onInputChange(value, 'hkont_s')}
                />
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
  // console.log(state,'state');
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
})(injectIntl(Ampi));

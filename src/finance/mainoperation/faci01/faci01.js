import React, { Component } from 'react';
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
  Checkbox,
} from 'semantic-ui-react';
import moment from 'moment';
import FaHeader from '../../faHeader';
import {
  f4FetchDepartmentList,
  f4FetchCurrencyList,
  f4FetchExchangeRateNational,
} from '../../../reference/f4/f4_action';
import {
  clearfaBkpf,
  changefaBkpf,
  fetchIncomeHkontsByBukrs,
  fetchCashBankHkontsByBranch,
  saveFiSrcDocs,
  clearAnyObject,
} from '../../fa_action';
import { moneyInputHanler } from '../../../utils/helpers';
import { handleFocus, moneyFormat } from '../../../utils/helpers';
import OutputErrors from '../../../general/error/outputErrors';
import { modifyLoader } from '../../../general/loader/loader_action';
import { injectIntl } from 'react-intl';
import CustomerF4Modal from '../../../reference/f4/Customer/customerF4';
import { messages } from '../../../locales/defineMessages';

require('moment/locale/ru');

class Faci01 extends Component {
  constructor(props) {
    super(props);
    this.initializeBkpfBseg = this.initializeBkpfBseg.bind(this);
    this.initialBseg = this.initialBseg.bind(this);
    this.customerF4ModalOpenHanlder = this.customerF4ModalOpenHanlder.bind(
      this,
    );
    this.onInputChange = this.onInputChange.bind(this);
    this.save = this.save.bind(this);
    this.validate = this.validate.bind(this);
    this.state = {
      customerF4ModalOpen: false,
      errors: [],
      lifnr: null,
      lifnrName: '',
      amount: '0',
      hkont_s: '',
      hkont_h: '',
      withInvoice: false,
    };
  }

  componentDidMount() {
    this.initializeBkpfBseg();

    this.props.f4FetchCurrencyList('faci01');
    this.props.f4FetchDepartmentList();
    this.props.f4FetchExchangeRateNational();
  }

  componentWillUnmount() {
    this.props.clearfaBkpf();
    this.props.clearAnyObject('CLEAR_CASHBANKHKONTS_BY_BRANCH');
    this.props.clearAnyObject('CLEAR_EXPENSEHKONTS_BY_BUKRS');
    this.props.f4ClearAnyObject('F4_CLEAR_CURRENCY_LIST');
    this.props.f4ClearAnyObject('F4_CLEAR_EXCHANGERATE_NATIONAL');
    // this.props.clearDynObj();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.bkpf.bukrs !== this.props.bkpf.bukrs) {
      this.props.fetchIncomeHkontsByBukrs(nextProps.bkpf.bukrs);
    }

    if (nextProps.bkpf.brnch !== this.props.bkpf.brnch) {
      this.props.fetchCashBankHkontsByBranch(
        nextProps.bkpf.bukrs,
        nextProps.bkpf.brnch,
      );
    }
    if (nextProps.bkpf.waers !== this.props.bkpf.waers) {
      this.props.fetchCashBankHkontsByBranch(
        nextProps.bkpf.bukrs,
        nextProps.bkpf.brnch,
      );
    }

    if (
      nextProps.reset !== null &&
      nextProps.reset !== undefined &&
      nextProps.reset === true
    ) {
      // console.log(nextProps,'nextProps')
      this.props.changeDynObj({ reset: false });
      this.initializeBkpfBseg();
    }
  }

  customerF4ModalOpenHanlder(bool) {
    this.setState({ customerF4ModalOpen: bool });
  }
  onInputChange(value, stateFieldName) {
    // let bseg = {...this.props.bseg};
    if (stateFieldName === 'amount') {
      const newVal = moneyInputHanler(value, 2);
      if (newVal !== undefined) {
        this.setState({ [stateFieldName]: newVal });
      }
    } else if (stateFieldName === 'lifnr') {
      this.setState({ lifnr: value.id, lifnrName: value.fio });
    } else if (stateFieldName === 'withInvoice') {
      const hkont_h = !this.state.withInvoice ? this.state.hkont_h : '';
      this.setState({ withInvoice: !this.state.withInvoice, hkont_h });
    } else {
      this.setState({ [stateFieldName]: value });
    }
  }

  initializeBkpfBseg() {
    const bkpf = Object.assign({}, this.props.initialBkpf);
    bkpf.blart = 'DP';
    bkpf.budat = moment().format('DD.MM.YYYY');
    bkpf.bldat = moment().format('DD.MM.YYYY');

    this.props.changefaBkpf(bkpf);
    this.initialBseg();
  }
  initialBseg() {
    this.setState({
      customerF4ModalOpen: false,
      errors: [],
      lifnr: null,
      lifnrName: '',
      amount: '0',
      hkont_s: '',
      hkont_h: '',
      withInvoice: false,
    });
  }
  save() {
    this.props.modifyLoader(true);
    let errors = [];
    errors = this.validate();
    if (errors === null || errors === undefined || errors.length === 0) {
      const bkpf = JSON.parse(JSON.stringify(this.props.bkpf));
      const args = {
        bkpf,
        amount: this.state.amount,
        lifnr: this.state.lifnr,
        hkont_s: this.state.hkont_s,
        hkont_h: this.state.hkont_h,
        withInvoice: this.state.withInvoice,
      };
      this.props.saveFiSrcDocs(args, 'FACI01');
    } else {
      this.props.modifyLoader(false);
    }

    this.setState({ errors });
  }
  validate() {
    // getter
    // console.log(localStorage.getItem('language'),'error');

    const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
    const language = localStorage.getItem('language');
    const errors = [];
    const { bukrs, brnch, dep, waers, bldat } = this.props.bkpf;
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

    const { lifnr, hkont_h, amount, withInvoice, hkont_s } = this.state;
    if (lifnr === null || lifnr === undefined || !lifnr) {
      errors.push(errorTable[`9${language}`]);
    }
    if (
      amount === null ||
      amount === undefined ||
      !amount ||
      parseFloat(amount) <= 0
    ) {
      errors.push(errorTable[`61${language}`]);
    }
    if (hkont_s === null || hkont_s === undefined || !hkont_s) {
      errors.push(errorTable[`3${language}`]);
    }
    if (
      withInvoice === true &&
      (hkont_h === null || hkont_h === undefined || !hkont_h)
    ) {
      errors.push(errorTable[`12${language}`]);
    }
    return errors;
  }

  render() {
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

    const { waers } = this.props.bkpf;
    const {
      customerF4ModalOpen,
      withInvoice,
      amount,
      lifnrName,
      hkont_h,
      hkont_s,
    } = this.state;
    const { formatMessage } = this.props.intl;

    const hkontOptions = this.props.hkontOptions
      .filter(wa => wa.dynvalue === waers)
      .map((wa, idx) => ({ key: idx, value: wa.value, text: wa.text }));

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
          {formatMessage(messages.transNameFaci01)}
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
                  onClick={() => this.save()}
                  disabled={this.props.activeLoader}
                >
                  <Icon name="save" size="large" />{' '}
                  {formatMessage(messages.save)}
                </Button>
              </List.Content>
            </List.Item>
          </List>
        </Segment>

        <OutputErrors errors={this.state.errors} />

        <FaHeader {...this.props} bkpfInfo={bkpfInfo} />
        <CustomerF4Modal
          open={customerF4ModalOpen}
          onCloseCustomerF4={bool => this.customerF4ModalOpenHanlder(bool)}
          onCustomerSelect={item => this.onInputChange(item, 'lifnr')}
        />

        <Segment padded size="small">
          <Label color="red" ribbon>
            {formatMessage(messages.position)}
          </Label>

          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  {formatMessage(messages.customer)}
                </Table.HeaderCell>
                <Table.HeaderCell>
                  {formatMessage(messages.amount)}
                </Table.HeaderCell>
                <Table.HeaderCell>
                  {formatMessage(messages.cashBank)}
                </Table.HeaderCell>
                <Table.HeaderCell colSpan="2">
                  {formatMessage(messages.toCreatInvoice)}
                </Table.HeaderCell>
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
                        this.customerF4ModalOpenHanlder(true);
                      }}
                    />
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <Input
                    label={waers}
                    labelPosition="left"
                    color="teal"
                    value={moneyFormat(amount)}
                    onFocus={handleFocus}
                    maxLength="18"
                    onChange={(e, { value }) =>
                      this.onInputChange(value, 'amount')
                    }
                  />
                </Table.Cell>

                <Table.Cell>
                  <Dropdown
                    search
                    selection
                    options={hkontOptions || []}
                    value={hkont_s}
                    onChange={(e, { value }) =>
                      this.onInputChange(value, 'hkont_s')
                    }
                  />
                </Table.Cell>
                <Table.Cell>
                  <Checkbox
                    checked={withInvoice}
                    onChange={(e, { value }) =>
                      this.onInputChange(value, 'withInvoice')
                    }
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    fluid
                    search
                    selection
                    options={
                      this.props.hkontOptions2 ? this.props.hkontOptions2 : []
                    }
                    value={hkont_h}
                    onChange={(e, { value }) =>
                      this.onInputChange(value, 'hkont_h')
                    }
                    disabled={!withInvoice}
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
  }
}

function mapStateToProps(state) {
  // console.log(state,'state');
  return {
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsAll,
    currencyOptions: state.f4.currencyOptions,
    departmentOptions: state.f4.departmentOptions,
    businessAreaOptions: state.f4.businessAreaList,
    exRateNational: state.f4.exRateNational,
    bkpf: state.fa.faForm.bkpf,
    initialBkpf: state.fa.faForm.initialBkpf,
    hkontOptions: state.fa.faForm.hkontOptions,
    hkontOptions2: state.fa.faForm.hkontOptions2,
    bseg: state.fa.dynamicObject,
    reset: state.fa.dynamicObject.reset,
  };
}

export default connect(
  mapStateToProps,
  {
    f4FetchDepartmentList,
    f4FetchCurrencyList,
    modifyLoader,
    f4FetchExchangeRateNational,
    changefaBkpf,
    clearfaBkpf,
    fetchIncomeHkontsByBukrs,
    fetchCashBankHkontsByBranch,
    saveFiSrcDocs,
    clearAnyObject,
  },
)(injectIntl(Faci01));

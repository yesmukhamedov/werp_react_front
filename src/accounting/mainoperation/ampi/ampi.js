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
} from 'semantic-ui-react';
import moment from 'moment';
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
import { messages } from '../../../locales/defineMessages';

require('moment/locale/ru');

class Ampi extends Component {
  constructor(props) {
    super(props);
    this.initializeBkpfBseg = this.initializeBkpfBseg.bind(this);
    this.initialBseg = this.initialBseg.bind(this);
    this.customerF4ModalOpenHanlder = this.customerF4ModalOpenHanlder.bind(
      this,
    );
    this.state = {
      customerF4ModalOpen: false,
      errors: [],
      lifnr: null,
      lifnrName: '',
      amount: '0',
      hkont_s: '',
    };
  }

  componentWillMount() {
    this.initializeBkpfBseg();

    this.props.f4FetchCurrencyList('ampi');
    this.props.f4FetchDepartmentList();
    this.props.f4FetchExchangeRateNational();
  }

  componentWillUnmount() {
    this.props.clearfaBkpf();
    // this.props.clearDynObj();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.bkpf.bukrs !== this.props.bkpf.bukrs) {
      this.props.fetchExpenseHkontsByBukrs(nextProps.bkpf.bukrs);
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
    } else {
      this.setState({ [stateFieldName]: value });
    }
  }

  initializeBkpfBseg() {
    const bkpf = Object.assign({}, this.props.initialBkpf);
    bkpf.blart = 'AE';
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
    });
  }
  save() {
    this.props.modifyLoader(true);
    let errors = [];
    errors = this.validate();
    if (errors === null || errors === undefined || errors.length === 0) {
      const bkpf = { ...this.props.bkpf };
      const args = {
        bkpf,
        amount: this.state.amount,
        lifnr: this.state.lifnr,
        hkont_s: this.state.hkont_s,
      };
      this.props.saveAccSrcDocs(args, 'AMPI', () => this.initializeBkpfBseg());
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

    const { lifnr, hkont_s, amount } = this.state;
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
    const customerF4ModalOpen = this.state.customerF4ModalOpen;
    const amount = this.state.amount;
    const lifnrName = this.state.lifnrName;
    const hkont_s = this.state.hkont_s;
    const { formatMessage } = this.props.intl;

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
          {formatMessage(messages.transNameAmpi)}
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
                  {formatMessage(messages.hkont)}
                </Table.HeaderCell>
                <Table.HeaderCell>
                  {formatMessage(messages.amount)}
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
                  <Dropdown
                    fluid
                    search
                    selection
                    options={
                      this.props.hkontOptions ? this.props.hkontOptions : []
                    }
                    value={hkont_s}
                    onChange={(e, { value }) =>
                      this.onInputChange(value, 'hkont_s')
                    }
                  />
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
    hkontOptions: state.fa.faForm.hkontOptions2,
    bseg: state.fa.dynamicObject,
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
    fetchExpenseHkontsByBukrs,
    saveAccSrcDocs,
  },
)(injectIntl(Ampi));

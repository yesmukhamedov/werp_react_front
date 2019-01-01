import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Header,
  Segment,
  List,
  Button,
  Icon,
} from 'semantic-ui-react';
import moment from 'moment';
import FaHeader from '../../faHeader';
import FaicfpPosition from './faicfpPosition';
import {
  f4FetchDepartmentList,
  f4FetchCurrencyList,
  f4FetchExchangeRateNational,
  f4FetchHkontList,
  f4ClearAnyObject,
} from '../../../reference/f4/f4_action';
import {
  clearfaBkpf,
  changefaBkpf,
  fetchCashBankHkontsByBranch,
  changeDynObj,
  clearDynObj,
  saveFcis,
} from '../../fa_action';
import { moneyInputHanler } from '../../../utils/helpers';
import OutputErrors from '../../../general/error/outputErrors';
import { modifyLoader } from '../../../general/loader/loader_action';
import { injectIntl } from 'react-intl';
import { messages } from '../../../locales/defineMessages';

require('moment/locale/ru');

class Faicfp extends Component {
  constructor(props) {
    super(props);
    this.initializeBkpfBseg = this.initializeBkpfBseg.bind(this);
    this.initialBseg = this.initialBseg.bind(this);
    this.state = {
      errors: [],
    };
  }
  componentDidMount() {
    this.initializeBkpfBseg();

    this.props.f4FetchCurrencyList('faicfp');
    this.props.f4FetchDepartmentList();
    this.props.f4FetchExchangeRateNational();
  }

  componentWillUnmount() {
    this.props.clearfaBkpf();
    this.props.clearDynObj();
    this.props.f4ClearAnyObject('F4_CLEAR_HKONT_LIST');
  }

  componentWillReceiveProps(nextProps) {
    // nextProps.myProp has a different value than our current prop
    // so we can perform some calculations based on the new value
    if (nextProps.bkpf.bukrs !== this.props.bkpf.bukrs) {
      this.props.f4FetchHkontList(nextProps.bkpf.bukrs, 'FAICFP', 0);
      this.initialBseg();
    }
    if (nextProps.bkpf.brnch !== this.props.bkpf.brnch) {
      this.props.fetchCashBankHkontsByBranch(
        nextProps.bkpf.bukrs,
        nextProps.bkpf.brnch,
      );
      this.initialBseg();
    }
    if (nextProps.bkpf.waers !== this.props.bkpf.waers) {
      this.props.fetchCashBankHkontsByBranch(
        nextProps.bkpf.bukrs,
        nextProps.bkpf.brnch,
      );
      this.initialBseg();
    }
  }

  onInputChange(value, stateFieldName, position) {
    let bseg = { ...this.props.bseg };
    let waBseg = bseg[position];
    if (stateFieldName === 'summa') {
      const newVal = moneyInputHanler(value, 2);
      if (newVal !== undefined) {
        waBseg[stateFieldName] = newVal;
      }
    } else {
      waBseg[stateFieldName] = value;
    }
    this.props.changeDynObj({
      bseg,
    });
  }

  initializeBkpfBseg() {
    const bkpf = Object.assign({}, this.props.initialBkpf);
    bkpf.blart = 'IF';
    bkpf.budat = moment().format('DD.MM.YYYY');
    bkpf.bldat = moment().format('DD.MM.YYYY');

    this.props.changefaBkpf(bkpf);
    this.initialBseg();
  }
  initialBseg() {
    this.props.changeDynObj({
      0: {
        shkzg: '',
        hkont: '',
        summa: 0,
      },
      1: {
        shkzg: '',
        hkont: '',
        summa: 0,
      },
    });
  }
  save() {
    this.props.modifyLoader(true);
    let errors = [];
    errors = this.validate();
    if (errors === null || errors === undefined || errors.length === 0) {
      const bkpf = { ...this.props.bkpf };
      const bseg = { ...this.props.bseg };
      this.props.saveFcis(bkpf, bseg, () => this.initializeBkpfBseg());
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

    const { lifnr, hkont_s, hkont_h, summa } = this.props.bseg;
    if (hkont_h === null || hkont_h === undefined || !hkont_h) {
      errors.push(errorTable[`16${language}`]);
    }
    if (hkont_s === null || hkont_s === undefined || !hkont_s) {
      errors.push(errorTable[`3${language}`]);
    }
    if (lifnr === null || lifnr === undefined || !lifnr) {
      errors.push(errorTable[`63${language}`]);
    }
    if (
      summa === null ||
      summa === undefined ||
      !summa ||
      parseFloat(summa) <= 0
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
      depInfo: { readOnly: true, disabled: true },
      budatInfo: { readOnly: false, disabled: true },
      bldatInfo: { readOnly: false, disabled: false },
      blartInfo: { readOnly: true, disabled: false },
      waersInfo: { readOnly: false, disabled: false },
      kursfInfo: { readOnly: true, disabled: false },
      bktxtInfo: { readOnly: false, disabled: false },
      officialInfo: { readOnly: true, disabled: true },
      zregInfo: { readOnly: true, disabled: true },
    };

    const { waers } = this.props.bkpf;
    const { bseg, hkontOptions } = this.props;

    const cashBankHkontOptions = this.props.cashBankHkontOptions
      .filter(wa => wa.dynvalue === waers)
      .map((wa, idx) => ({ key: idx, value: wa.value, text: wa.text }));

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
          {formatMessage(messages.transNameFaicfp)}
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
        <FaicfpPosition
          cashBankHkontOptions={cashBankHkontOptions}
          hkontOptions={hkontOptions}
          bseg={bseg}
          waers={waers}
          onInputChange={(value, stateFieldName, position) => {
            this.onInputChange(value, stateFieldName, position);
          }}
        />
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
    exRateNational: state.f4.exRateNational,
    hkontOptions: state.f4.hkontList,
    bkpf: state.fa.faForm.bkpf,
    initialBkpf: state.fa.faForm.initialBkpf,
    cashBankHkontOptions: state.fa.faForm.hkontOptions,
    bseg: state.fa.dynamicObject,
  };
}

export default connect(
  mapStateToProps,
  {
    f4FetchDepartmentList,
    f4FetchCurrencyList,
    f4FetchHkontList,
    f4ClearAnyObject,
    modifyLoader,
    saveFcis,
    f4FetchExchangeRateNational,
    changefaBkpf,
    clearfaBkpf,
    fetchCashBankHkontsByBranch,
    changeDynObj,
    clearDynObj,
  },
)(injectIntl(Faicfp));

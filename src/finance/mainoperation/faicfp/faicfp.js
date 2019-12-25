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
  f4FetchCurrencyList,
  f4FetchExchangeRateNational,
  f4FetchHkontList,
  f4ClearAnyObject,
} from '../../../reference/f4/f4_action';
import {
  clearfaBkpf,
  changefaBkpf,
  fetchCashBankHkontsByBranch,
  clearAnyObject,
  changeDynObj,
  clearDynObj,
  saveFiSrcDocs,
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
    this.onInputChange = this.onInputChange.bind(this);
    this.validate = this.validate.bind(this);
    this.save = this.save.bind(this);
    this.state = {
      errors: [],
    };
  }
  componentDidMount() {
    this.initializeBkpfBseg();

    this.props.f4FetchCurrencyList('faicfp');
    this.props.f4FetchExchangeRateNational();
  }

  componentWillUnmount() {
    this.props.clearfaBkpf();
    this.props.clearDynObj();
    this.props.clearAnyObject('CLEAR_CASHBANKHKONTS_BY_BRANCH');
    this.props.f4ClearAnyObject('F4_CLEAR_HKONT_LIST');
    this.props.f4ClearAnyObject('F4_CLEAR_CURRENCY_LIST');
    this.props.f4ClearAnyObject('F4_CLEAR_EXCHANGERATE_NATIONAL');
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

  onInputChange(value, stateFieldName, position) {
    let bseg = JSON.parse(JSON.stringify(this.props.bseg));
    // console.log(bseg,'bseg',this.props.bseg,'this.props.bseg')
    let waBseg = bseg[position];
    if (stateFieldName === 'summa') {
      const newVal = moneyInputHanler(value, 2);
      if (newVal !== undefined) {
        waBseg[stateFieldName] = newVal;
      }
      //updating all rows amount
      if (position === 0) bseg[1][stateFieldName] = newVal;
      else bseg[0][stateFieldName] = newVal;
    } else if (stateFieldName === 'shkzg') {
      waBseg[stateFieldName] = value;

      //updating all rows amount
      if (position === 0 && value === 'S') bseg[1][stateFieldName] = 'H';
      else if (position === 0 && value === 'H') bseg[1][stateFieldName] = 'S';
      else if (position === 1 && value === 'S') bseg[0][stateFieldName] = 'H';
      else if (position === 1 && value === 'H') bseg[0][stateFieldName] = 'S';
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
    bkpf.budat = moment().format('YYYY-MM-DD');
    bkpf.bldat = moment().format('YYYY-MM-DD');

    this.props.changefaBkpf(bkpf);
    this.initialBseg();
  }
  initialBseg() {
    this.props.changeDynObj({
      bseg: [
        {
          shkzg: '',
          hkont: '',
          summa: 0,
        },
        {
          shkzg: '',
          hkont: '',
          summa: 0,
        },
      ],
    });
  }
  save() {
    this.props.modifyLoader(true);
    let errors = [];
    errors = this.validate();
    if (errors === null || errors === undefined || errors.length === 0) {
      const bkpf = JSON.parse(JSON.stringify(this.props.bkpf));
      const bseg = JSON.parse(JSON.stringify(this.props.bseg));
      this.props.saveFiSrcDocs({ bkpf, l_bseg: bseg }, 'FAICFP');
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
    if (waers === null || waers === undefined || !waers) {
      errors.push(errorTable[`1${language}`]);
    }
    if (bldat === null || bldat === undefined || !bldat) {
      errors.push(errorTable[`15${language}`]);
    }

    let waBseg0 = this.props.bseg[0];
    let waBseg1 = this.props.bseg[1];

    if (
      waBseg0.hkont === null ||
      waBseg0.hkont === undefined ||
      !waBseg0.hkont
    ) {
      errors.push(
        errorTable[`3${language}`] + ' ' + errorTable[`25${language}`] + ' 1',
      );
    }
    if (
      waBseg1.hkont === null ||
      waBseg1.hkont === undefined ||
      !waBseg1.hkont
    ) {
      errors.push(
        errorTable[`12${language}`] + '. ' + errorTable[`25${language}`] + ' 2',
      );
    }
    if (
      waBseg0.shkzg === null ||
      waBseg0.shkzg === undefined ||
      !waBseg0.shkzg
    ) {
      errors.push(errorTable[`24${language}`]);
    }
    if (
      waBseg0.summa === null ||
      waBseg0.summa === undefined ||
      !waBseg0.summa ||
      parseFloat(waBseg0.summa) <= 0
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
    language: state.locales.lang,
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsAll,
    currencyOptions: state.f4.currencyOptions,
    exRateNational: state.f4.exRateNational,
    hkontOptions: state.f4.hkontList,
    bkpf: state.fa.faForm.bkpf,
    initialBkpf: state.fa.faForm.initialBkpf,
    cashBankHkontOptions: state.fa.faForm.hkontOptions,
    bseg: state.fa.dynamicObject.bseg,
    reset: state.fa.dynamicObject.reset,
  };
}

export default connect(mapStateToProps, {
  f4FetchCurrencyList,
  f4FetchHkontList,
  f4ClearAnyObject,
  modifyLoader,
  f4FetchExchangeRateNational,
  changefaBkpf,
  clearfaBkpf,
  fetchCashBankHkontsByBranch,
  changeDynObj,
  clearDynObj,
  clearAnyObject,
  saveFiSrcDocs,
})(injectIntl(Faicfp));

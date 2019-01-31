import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Header,
  Segment,
  List,
  Button,
  Icon,
  Grid,
  Label,
  Table,
  Dropdown,
  Input,
  TextArea,
} from 'semantic-ui-react';
import moment from 'moment';
import {
  f4FetchCurrencyList,
  f4FetchExchangeRateNational,
  f4ClearAnyObject,
} from '../../../reference/f4/f4_action';
import {
  saveFiSrcDocs,
  changeDynObj,
  clearDynObj,
  fetchDynamicFAGM,
} from '../../fa_action';
import { moneyInputHanler } from '../../../utils/helpers';
import OutputErrors from '../../../general/error/outputErrors';
import { modifyLoader } from '../../../general/loader/loader_action';
import { injectIntl } from 'react-intl';
import { messages } from '../../../locales/defineMessages';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../fa.css';
import { handleFocus, moneyFormat } from '../../../utils/helpers';

require('moment/locale/ru');
require('moment/locale/tr');
let initialBseg = [
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
];

let initialBkpf = {
  bukrs: '',
  brnch: '',
  business_area_id: '',
  dep: '',
  blart: 'I2',
  waers: '',
  kursf: 0,
  bktxt: '',
  official: false,
  bldat: moment().format('DD.MM.YYYY'),
  budat: moment().format('DD.MM.YYYY'),
  zreg: '',
};

class Faicfp2 extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.validate = this.validate.bind(this);
    this.initializeBseg = this.initializeBseg.bind(this);
    this.initializeBkpfBseg = this.initializeBkpfBseg.bind(this);
    this.initializeCashBanks = this.initializeCashBanks.bind(this);

    this.state = {
      errors: [],
      bkpf: JSON.parse(JSON.stringify(initialBkpf)),
      bseg: JSON.parse(JSON.stringify(initialBseg)),
    };
  }
  componentDidMount() {
    this.initializeBkpfBseg();
    let params = {};
    this.props.fetchDynamicFAGM(
      '/api/finance/mainoperation/fetchCitiesWithMainOffices',
      params,
    );
    this.props.f4FetchCurrencyList('faicfp2');
    this.props.f4FetchExchangeRateNational();
  }

  componentWillUnmount() {
    this.props.clearDynObj();
    this.props.f4ClearAnyObject('F4_CLEAR_CURRENCY_LIST');
    this.props.f4ClearAnyObject('F4_CLEAR_EXCHANGERATE_NATIONAL');
  }

  componentWillReceiveProps(nextProps) {
    // nextProps.myProp has a different value than our current prop
    // so we can perform some calculations based on the new value
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
    if (position === null) {
      let bkpf = JSON.parse(JSON.stringify(this.state.bkpf));
      if (stateFieldName === 'waers') {
        this.initializeBseg();
        let exRateNational = { ...this.props.exRateNational };
        let waRate = 0;
        waRate = exRateNational
          ? exRateNational[value]
            ? exRateNational[value]
            : 0
          : 0;
        if (value === 'USD') {
          waRate = 1;
        }
        if (waRate === null || waRate === undefined) {
          waRate = 0;
        }
        bkpf.kursf = waRate;
        bkpf[stateFieldName] = value;
      } else if (stateFieldName === 'budat' || stateFieldName === 'bldat') {
        if (value !== null && value !== undefined) {
          bkpf[stateFieldName] = value.format('DD.MM.YYYY');
        } else bkpf[stateFieldName] = '';
      } else if (stateFieldName === 'bukrs') {
        bkpf[stateFieldName] = value;
        bkpf['brnch'] = '';
        this.initializeBseg();
        this.initializeCashBanks();
      } else if (stateFieldName === 'brnch') {
        bkpf[stateFieldName] = value;
        let bukrs = this.state.bkpf.bukrs;
        let brnch = value;
        let params = { bukrs: bukrs, branchId: brnch };
        this.props.fetchDynamicFAGM(
          '/api/finance/mainoperation/fetchCityBranchCashBanks',
          params,
        );
        this.initializeBseg();
        this.initializeCashBanks();
      } else {
        bkpf[stateFieldName] = value;
      }

      this.setState({ bkpf });
      // console.log(bkpf,'bkpf', initialBkpf,'initialBkpf')
    } else {
      let bseg = JSON.parse(JSON.stringify(this.state.bseg));
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

      this.setState({ bseg });
      // console.log(bseg,'bseg',initialBseg,'initialBseg')
    }
  }

  initializeBkpfBseg() {
    // let bkpf= { ...initialBkpf };
    let bkpf = JSON.parse(JSON.stringify(initialBkpf));
    this.setState({ bkpf });
    this.initializeBseg();
  }
  initializeBseg() {
    // let bseg = {0:{...initialBseg[0]},1:{...initialBseg[1]}}
    let bseg = JSON.parse(JSON.stringify(initialBseg));
    this.setState({ bseg });
  }
  initializeCashBanks() {
    this.props.changeDynObj({ cashBanks: [] });
  }
  save() {
    this.props.modifyLoader(true);
    let errors = [];
    errors = this.validate();
    if (errors === null || errors === undefined || errors.length === 0) {
      const bkpf = JSON.parse(JSON.stringify(this.state.bkpf));
      const bseg = JSON.parse(JSON.stringify(this.state.bseg));
      this.props.saveFiSrcDocs({ bkpf, l_bseg: bseg }, 'FAICFP2');
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
    const { bukrs, brnch, waers, bldat } = this.state.bkpf;
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

    let waBseg0 = JSON.parse(JSON.stringify(this.state.bseg[0]));
    let waBseg1 = JSON.parse(JSON.stringify(this.state.bseg[1]));
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
        errorTable[`3${language}`] + ' ' + errorTable[`25${language}`] + ' 2',
      );
    }
    if (waBseg0.hkont === waBseg1.hkont) {
      errors.push(errorTable[`26${language}`]);
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
    const {
      bukrs,
      brnch,
      budat,
      bldat,
      blart,
      waers,
      kursf,
      bktxt,
    } = this.state.bkpf;
    const { bseg } = this.state;
    const {
      cityBranches,
      companyOptions,
      currencyOptions,
      activeLoader,
      cashBanks,
    } = this.props;
    const cashBankHkontOptions = cashBanks
      ? cashBanks
          .filter(wa => wa.dynvalue === waers)
          .map((wa, idx) => ({ key: idx, value: wa.value, text: wa.text }))
      : [];
    const { formatMessage } = this.props.intl;
    const shkzgOptions = [
      { key: 1, text: formatMessage(messages.incoming), value: 'S' },
      { key: 2, text: formatMessage(messages.outgoing), value: 'H' },
    ];
    const language = localStorage.getItem('language');
    // console.log(cityBranches,'cityBranches');
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
          {formatMessage(messages.transNameFaicfp2)}
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
                  disabled={activeLoader}
                >
                  <Icon name="save" size="large" />{' '}
                  {formatMessage(messages.save)}
                </Button>
              </List.Content>
            </List.Item>
          </List>
        </Segment>

        <OutputErrors errors={this.state.errors} />

        <Segment padded size="small">
          <Label color="blue" ribbon>
            {formatMessage(messages.header)}
          </Label>
          <Grid columns={3} stackable>
            <Grid.Row>
              <Grid.Column mobile={16} tablet={16} computer={5}>
                <Table collapsing className="borderLess">
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>
                        <Icon name="folder" /> {formatMessage(messages.bukrs)}
                      </Table.Cell>
                      <Table.Cell>
                        <Dropdown
                          placeholder={formatMessage(messages.bukrs)}
                          selection
                          options={companyOptions ? companyOptions : []}
                          value={bukrs}
                          onChange={(e, { value }) =>
                            this.onInputChange(value, 'bukrs', null)
                          }
                        />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <Icon name="browser" />
                        {formatMessage(messages.brnch)}
                      </Table.Cell>
                      <Table.Cell>
                        <Dropdown
                          placeholder={formatMessage(messages.brnch)}
                          search
                          selection
                          options={
                            cityBranches
                              ? cityBranches[bukrs]
                                ? cityBranches[bukrs]
                                : []
                              : []
                          }
                          value={brnch}
                          onChange={(e, { value }) =>
                            this.onInputChange(value, 'brnch', null)
                          }
                        />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <Icon name="dollar" />
                        {formatMessage(messages.waers)}
                      </Table.Cell>
                      <Table.Cell>
                        <Dropdown
                          placeholder={formatMessage(messages.waers)}
                          search
                          selection
                          options={currencyOptions || []}
                          value={waers}
                          onChange={(e, { value }) =>
                            this.onInputChange(value, 'waers', null)
                          }
                        />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <Icon name="exchange" />
                        {formatMessage(messages.kursf)}
                      </Table.Cell>
                      <Table.Cell>
                        <Input
                          value={kursf}
                          placeholder={formatMessage(messages.kursf)}
                        />
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={16} computer={5}>
                <Table collapsing className="borderLess">
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>
                        <Icon name="square outline" />
                        {formatMessage(messages.blart)}
                      </Table.Cell>
                      <Table.Cell>
                        <Input
                          value={blart}
                          placeholder={formatMessage(messages.blart)}
                        />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <Icon name="calendar" />
                        {formatMessage(messages.budat)}
                      </Table.Cell>
                      <Table.Cell>
                        <DatePicker
                          className="date-auto-width"
                          autoComplete="off"
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select" // timezone="UTC"
                          selected={budat ? moment(budat, 'DD.MM.YYYY') : ''}
                          locale={language}
                          onChange={event =>
                            this.onInputChange(event, 'budat', null)
                          }
                          dateFormat="DD.MM.YYYY"
                          disabled
                          readOnly
                        />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <Icon name="calendar" />
                        {formatMessage(messages.bldat)}
                      </Table.Cell>
                      <Table.Cell>
                        <DatePicker
                          className="date-auto-width"
                          autoComplete="off"
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select" // timezone="UTC"
                          selected={bldat ? moment(bldat, 'DD.MM.YYYY') : ''}
                          locale={language}
                          onChange={event =>
                            this.onInputChange(event, 'bldat', null)
                          }
                          dateFormat="DD.MM.YYYY"
                        />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <Icon name="comments outline" />
                        {formatMessage(messages.bktxt)}
                      </Table.Cell>

                      <Table.Cell>
                        <TextArea
                          style={{
                            maxHeight: 45,
                            minHeight: 45,
                            minWidth: 180,
                            maxWidth: 180,
                          }}
                          value={bktxt}
                          maxLength="255"
                          onChange={(e, { value }) =>
                            this.onInputChange(value, 'bktxt', null)
                          }
                          placeholder={formatMessage(messages.bktxt)}
                        />
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment padded size="small">
          <Label color="red" ribbon>
            {formatMessage(messages.position)}
          </Label>

          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  {formatMessage(messages.cashBank)}
                </Table.HeaderCell>
                <Table.HeaderCell>
                  {formatMessage(messages.shkzg)}
                </Table.HeaderCell>
                <Table.HeaderCell>
                  {formatMessage(messages.amount)}
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Dropdown
                    placeholder={formatMessage(messages.cashBank)}
                    selection
                    options={cashBankHkontOptions || []}
                    value={bseg[0].hkont}
                    onChange={(e, { value }) =>
                      this.onInputChange(value, 'hkont', 0)
                    }
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    selection
                    options={shkzgOptions || []}
                    value={bseg[0].shkzg}
                    onChange={(e, { value }) =>
                      this.onInputChange(value, 'shkzg', 0)
                    }
                  />
                </Table.Cell>
                <Table.Cell>
                  <Input
                    label={waers}
                    labelPosition="left"
                    color="teal"
                    value={moneyFormat(bseg[0].summa)}
                    onFocus={handleFocus}
                    maxLength="18"
                    onChange={(e, { value }) =>
                      this.onInputChange(value, 'summa', 0)
                    }
                  />
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Dropdown
                    placeholder={formatMessage(messages.cashBank)}
                    selection
                    options={cashBankHkontOptions || []}
                    value={bseg[1].hkont}
                    onChange={(e, { value }) =>
                      this.onInputChange(value, 'hkont', 1)
                    }
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    selection
                    options={shkzgOptions || []}
                    value={bseg[1].shkzg}
                    disabled={true}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Input
                    label={waers}
                    labelPosition="left"
                    color="teal"
                    value={moneyFormat(bseg[1].summa)}
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
  }
}

function mapStateToProps(state) {
  return {
    companyOptions: state.userInfo.companyOptions,
    currencyOptions: state.f4.currencyOptions,
    exRateNational: state.f4.exRateNational,
    cityBranches: state.fa.dynamicObject.cityBranches,
    cashBanks: state.fa.dynamicObject.cashBanks,
    reset: state.fa.dynamicObject.reset,
  };
}

export default connect(
  mapStateToProps,
  {
    f4FetchCurrencyList,
    f4ClearAnyObject,
    f4FetchExchangeRateNational,

    modifyLoader,
    fetchDynamicFAGM,
    changeDynObj,
    clearDynObj,
    saveFiSrcDocs,
  },
)(injectIntl(Faicfp2));

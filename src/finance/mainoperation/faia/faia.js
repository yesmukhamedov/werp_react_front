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
import FaHeader from '../../faHeader';
import {
  f4FetchDepartmentList,
  f4FetchCurrencyList,
  f4FetchExchangeRateNational,
  f4ClearAnyObject,
} from '../../../reference/f4/f4_action';
import {
  clearfaBkpf,
  changefaBkpf,
  fetchCashBankHkontsByBranch,
  saveFaia,
  changeDynObj,
  clearDynObj,
} from '../../fa_action';
import {
  moneyInputHanler,
  handleFocus,
  moneyFormat,
} from '../../../utils/helpers';
import OutputErrors from '../../../general/error/outputErrors';
import { modifyLoader } from '../../../general/loader/loader_action';
import { injectIntl } from 'react-intl';
import { messages } from '../../../locales/defineMessages';
import StaffF4Modal from '../../../reference/f4/staff/staffF4Modal';
import WorkAccList from './workAccList';
import CashBankBalance from '../../../reference/f4/cashBankBalance/cashBankBalance';

require('moment/locale/ru');

class Faia extends Component {
  constructor(props) {
    super(props);
    this.initializeBkpfBseg = this.initializeBkpfBseg.bind(this);
    this.initialBseg = this.initialBseg.bind(this);
    this.staffF4ModalOpenHanlder = this.staffF4ModalOpenHanlder.bind(this);
    this.state = {
      errors: [],
      staffF4ModalOpen: false,
      lifnr: '',
      staffId: '',
      staffFio: '',
      hkont: '',
      shkzg: '',
      summa: 0,
      showCBB: false,
      showWAL: false,
    };
  }

  componentDidMount() {
    this.initializeBkpfBseg();

    this.props.f4FetchCurrencyList('faia');
    this.props.f4FetchDepartmentList();
    this.props.f4FetchExchangeRateNational();
  }

  componentWillUnmount() {
    this.props.clearfaBkpf();
    this.props.clearDynObj();
    this.props.f4ClearAnyObject('F4_CLEAR_CURRENCY_LIST');
    this.props.f4ClearAnyObject('F4_CLEAR_EXCHANGERATE_NATIONAL');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.bkpf.bukrs !== this.props.bkpf.bukrs) {
      this.setState({
        staffF4ModalOpen: false,
        lifnr: '',
        staffId: '',
        staffFio: '',
        hkont: '',
        shkzg: '',
        summa: 0,
      });
      // nextProps.myProp has a different value than our current prop
      // so we can perform some calculations based on the new value
    }
    if (nextProps.bkpf.brnch !== this.props.bkpf.brnch) {
      this.props.fetchCashBankHkontsByBranch(
        nextProps.bkpf.bukrs,
        nextProps.bkpf.brnch,
      );
      this.setState({
        staffF4ModalOpen: false,
        lifnr: '',
        staffId: '',
        staffFio: '',
        hkont: '',
        shkzg: '',
        summa: 0,
      });
      // nextProps.myProp has a different value than our current prop
      // so we can perform some calculations based on the new value
    }
    if (nextProps.bkpf.waers !== this.props.bkpf.waers) {
      this.props.fetchCashBankHkontsByBranch(
        nextProps.bkpf.bukrs,
        nextProps.bkpf.brnch,
      );
      this.setState({
        hkont: '',
      });
      // nextProps.myProp has a different value than our current prop
      // so we can perform some calculations based on the new value
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

  onInputChange(value, stateFieldName) {
    if (stateFieldName === 'summa') {
      const newVal = moneyInputHanler(value, 2);
      if (newVal !== undefined) {
        this.setState({
          [stateFieldName]: newVal,
        });
      }
    } else if (stateFieldName === 'lifnr') {
      this.setState({
        lifnr: value.customerId,
        staffFio: value.fio,
        staffId: value.staffId,
      });
    } else {
      this.setState({
        [stateFieldName]: value,
      });
    }
  }
  staffF4ModalOpenHanlder(bool) {
    this.setState({ staffF4ModalOpen: bool });
  }
  initializeBkpfBseg() {
    const bkpf = Object.assign({}, this.props.initialBkpf);
    bkpf.blart = 'IA';
    bkpf.budat = moment().format('YYYY-MM-DD');
    bkpf.bldat = moment().format('YYYY-MM-DD');

    this.props.changefaBkpf(bkpf);
    this.initialBseg();
  }
  initialBseg() {
    this.setState({
      errors: [],
      staffF4ModalOpen: false,
      lifnr: '',
      staffId: '',
      staffFio: '',
      hkont: '',
      shkzg: '',
      summa: 0,
    });
  }
  save() {
    this.props.modifyLoader(true);
    let errors = [];
    errors = this.validate();
    if (errors === null || errors === undefined || errors.length === 0) {
      const bkpf = JSON.parse(JSON.stringify(this.props.bkpf));
      const bseg = JSON.parse(JSON.stringify(this.state));
      this.props.saveFaia(bkpf, bseg);
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

    const { lifnr, shkzg, hkont, summa } = this.state;
    if (shkzg === null || shkzg === undefined || !shkzg) {
      errors.push(errorTable[`16${language}`]);
    }
    if (hkont === null || hkont === undefined || !hkont) {
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
    const { formatMessage } = this.props.intl;
    const { waers, bukrs, brnch } = this.props.bkpf;
    const {
      staffF4ModalOpen,
      lifnr,
      staffFio,
      shkzg,
      hkont,
      summa,
      showCBB,
      showWAL,
    } = this.state;
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

    const hkontOptions = this.props.hkontOptions
      .filter(wa => wa.dynvalue === waers)
      .map((wa, idx) => ({ key: idx, value: wa.value, text: wa.text }));

    const shkzgOptions = [
      { key: 1, text: formatMessage(messages.receipt), value: 'S' },
      { key: 2, text: formatMessage(messages.issue), value: 'H' },
    ];

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
        <StaffF4Modal
          open={staffF4ModalOpen}
          closeModal={bool => this.staffF4ModalOpenHanlder(bool)}
          onStaffSelect={item => this.onInputChange(item, 'lifnr')}
          trans="faia"
          brnch={brnch}
          branchOptions={this.props.branchOptions}
          bukrs={bukrs}
          companyOptions={this.props.companyOptions}
          bukrsDisabledParent
        />
        <Header as="h2" block>
          {formatMessage(messages.transNameFaia)}
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
            <List.Item>
              <List.Content>
                <Button
                  content={
                    formatMessage(messages.balance) +
                    ' ' +
                    formatMessage(messages.cashBank)
                  }
                  onClick={() =>
                    this.setState({ showCBB: !this.state.showCBB })
                  }
                  color={this.state.showCBB ? 'red' : 'green'}
                />
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <Button
                  content={formatMessage(messages.employeesOnAccount)}
                  onClick={() =>
                    this.setState({ showWAL: !this.state.showWAL })
                  }
                  color={this.state.showWAL ? 'red' : 'green'}
                />
              </List.Content>
            </List.Item>
          </List>
        </Segment>

        <CashBankBalance bukrs={bukrs} brnch={brnch} show={showCBB} />
        <WorkAccList bukrs={bukrs} brnch={brnch} show={showWAL} />
        <OutputErrors errors={this.state.errors} />
        <FaHeader {...this.props} bkpfInfo={bkpfInfo} />

        <Segment padded size="small">
          <Label color="red" ribbon>
            {formatMessage(messages.position)}
          </Label>

          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  {formatMessage(messages.operation)}
                </Table.HeaderCell>
                <Table.HeaderCell>
                  {formatMessage(messages.cashBank)}
                </Table.HeaderCell>
                <Table.HeaderCell>
                  {formatMessage(messages.employee)}
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
                    placeholder={formatMessage(messages.operation)}
                    selection
                    options={shkzgOptions || []}
                    value={shkzg}
                    onChange={(e, { value }) =>
                      this.onInputChange(value, 'shkzg')
                    }
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    placeholder={formatMessage(messages.cashBank)}
                    selection
                    options={hkontOptions || []}
                    value={hkont}
                    onChange={(e, { value }) =>
                      this.onInputChange(value, 'hkont')
                    }
                  />
                </Table.Cell>
                <Table.Cell>
                  <span>
                    {' '}
                    {staffFio}{' '}
                    <Button
                      icon="external"
                      onClick={() => {
                        this.staffF4ModalOpenHanlder(true);
                      }}
                    />
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <Input
                    label={waers}
                    labelPosition="left"
                    color="teal"
                    value={moneyFormat(summa)}
                    onFocus={handleFocus}
                    maxLength="18"
                    onChange={(e, { value }) =>
                      this.onInputChange(value, 'summa')
                    }
                  />
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Segment>

        {/* <WorkAccList bukrs={this.props.bkpf.bukrs} brnch={this.props.bkpf.brnch}/> */}

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
    departmentOptions: state.f4.departmentOptions,
    businessAreaOptions: state.f4.businessAreaList,
    exRateNational: state.f4.exRateNational,
    bkpf: state.fa.faForm.bkpf,
    initialBkpf: state.fa.faForm.initialBkpf,
    hkontOptions: state.fa.faForm.hkontOptions,
    bseg: state.fa.dynamicObject,
    reset: state.fa.dynamicObject.reset,
  };
}

export default connect(mapStateToProps, {
  f4FetchDepartmentList,
  f4FetchCurrencyList,
  f4ClearAnyObject,
  modifyLoader,
  saveFaia,
  f4FetchExchangeRateNational,
  changefaBkpf,
  clearfaBkpf,
  fetchCashBankHkontsByBranch,
  changeDynObj,
  clearDynObj,
})(injectIntl(Faia));

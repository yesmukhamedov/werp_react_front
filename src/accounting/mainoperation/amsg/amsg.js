import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Header,
  Segment,
  List,
  Icon,
  Button,
  Checkbox,
} from 'semantic-ui-react';
import FaHeader from '../../../finance/faHeader';
import AmsgPosition from './amsgPosition';
import AmsgPaySchedule from './amsgPaySchedule';
import OutputErrors from '../../../general/error/outputErrors';
import {
  f4FetchDepartmentList,
  f4FetchCurrencyList,
  f4FetchBusinessAreaList2,
  f4FetchExchangeRateNational,
  f4FetchWerksBranchList,
} from '../../../reference/f4/f4_action';
import { amsgSave } from '../../../accounting/accounting_action';
import { modifyLoader } from '../../../general/loader/loader_action';
import { changefaBkpf, clearfaBkpf } from '../../../finance/fa_action';
import { injectIntl } from 'react-intl';

import moment from 'moment';

class Amsg extends Component {
  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.save = this.save.bind(this);
    this.validate = this.validate.bind(this);
    this.initializePsRows = this.initializePsRows.bind(this);
    this.initializeBkpfBseg = this.initializeBkpfBseg.bind(this);

    this.state = {
      enablePaySchedule: false,
      errors: [],
      // loading:false,

      rows: [],

      customer: {
        lifnr: null,
        lifnrName: '',
      },
      emptyRow: {
        matnr: null,
        matnrName: '',
        menge: 0,
        summa: 0,
        unitPrice: 0,
        werks: null,
        minSumma: 0,
      },

      psRows: [],
      emptyPsRow: {
        payment_date: moment().format('YYYY-MM-DD'),
        sum2: 0,
      },
    };
  }

  componentDidMount() {
    // console.log(this.props)
    // this.props.f4FetchBonusTypeList('hrb02');
    this.props.f4FetchCurrencyList('amsg');
    this.props.f4FetchDepartmentList();
    this.props.f4FetchBusinessAreaList2();
    this.props.f4FetchExchangeRateNational();
    this.props.f4FetchWerksBranchList();

    this.initializeBkpfBseg();
    this.initializePsRows();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.bkpf.bukrs !== this.props.bkpf.bukrs) {
      if (
        nextProps.bkpf.bukrs === null ||
        nextProps.bkpf.bukrs === undefined ||
        !nextProps.bkpf.bukrs
      ) {
        this.initializeBkpfBseg();
        this.initializePsRows();
      }
    }
  }
  componentWillUnmount() {
    this.props.clearfaBkpf();
  }
  initializeBkpfBseg() {
    const bkpf = Object.assign({}, this.props.initialBkpf);
    bkpf.blart = 'G2';
    bkpf.budat = moment().format('YYYY-MM-DD');
    bkpf.bldat = moment().format('YYYY-MM-DD');

    this.props.changefaBkpf(bkpf);

    this.setState({
      rows: [],
      customer: {
        lifnr: null,
        lifnrName: '',
      },
    });
  }

  initializePsRows() {
    const psRow0 = Object.assign({}, this.state.emptyPsRow);
    let psRow1 = Object.assign({}, this.state.emptyPsRow);

    psRow1 = {
      ...psRow1,
      payment_date: moment(psRow1.payment_date, 'YYYY-MM-DD')
        .add(1, 'M')
        .format('YYYY-MM-DD'),
    };

    const psRows = [];
    psRows.push(psRow0);
    psRows.push(psRow1);
    this.setState({ psRows });
  }

  onInputChange(value, stateFieldName) {
    if (stateFieldName === 'enablePaySchedule') {
      if (!this.state.enablePaySchedule === false) {
        this.setState({
          enablePaySchedule: !this.state.enablePaySchedule,
          psRows: [],
        });
      } else {
        this.setState({ enablePaySchedule: !this.state.enablePaySchedule });
        this.initializePsRows();
      }
    }
  }

  save() {
    // this.setState({loading:true});
    this.props.modifyLoader(true);
    let errors = [];
    // console.log(222222)
    errors = this.validate();
    // console.log(33333)
    if (errors === null || errors === undefined || errors.length === 0) {
      const bkpf = Object.assign({}, this.props.bkpf);
      const rows = JSON.parse(JSON.stringify(this.state.rows));
      const psRows = this.state.enablePaySchedule
        ? JSON.parse(JSON.stringify(this.state.psRows))
        : [];
      const customer = Object.assign({}, this.state.customer);
      this.props.amsgSave(bkpf, rows, psRows, customer.lifnr);
    } else {
      this.props.modifyLoader(false);
    }

    this.setState({ errors });
  }
  validate() {
    const errors = [];
    const {
      bukrs,
      brnch,
      business_area_id,
      dep,
      waers,
      bldat,
      zreg,
    } = this.props.bkpf;
    if (bukrs === null || bukrs === undefined || !bukrs) {
      errors.push('Выберите компанию');
    }
    if (brnch === null || brnch === undefined || !brnch) {
      errors.push('Выберите филиал');
    }
    if (
      business_area_id === null ||
      business_area_id === undefined ||
      !business_area_id
    ) {
      errors.push('Выберите бизнес сферу');
    }
    if (dep === null || dep === undefined || !dep) {
      errors.push('Выберите отдел');
    }
    if (waers === null || waers === undefined || !waers) {
      errors.push('Выберите валюту');
    }
    if (bldat === null || bldat === undefined || !bldat) {
      errors.push('Выберите дату документа');
    }
    if (zreg === null || zreg === undefined || !zreg) {
      errors.push('Заполните рег.номер');
    }

    const { customer, rows, psRows, enablePaySchedule } = this.state;

    if (customer === null || customer === undefined || !customer) {
      errors.push('Выберите контрагента');
    }
    if (
      customer.lifnr === null ||
      customer.lifnr === undefined ||
      !customer.lifnr
    ) {
      errors.push('Выберите контрагента');
    }

    if (rows === null || rows === undefined || rows.length === 0) {
      errors.push('Необходимо выбрать материал');
    }

    let totalPosition = 0;
    let totalSum2 = 0;
    for (let i = 0; i < rows.length; i++) {
      const { matnr, menge, summa, werks, minSumma } = rows[i];
      const rowNum = i + 1;
      if (matnr === null || matnr === undefined || !matnr) {
        errors.push(`Выберите материал (Позиция-строка ${rowNum})`);
      }
      if (menge === null || menge === undefined || !menge || menge < 1) {
        errors.push(`Количество меньше 1 (Позиция-строка ${rowNum})`);
      }
      if (summa === null || summa === undefined || !summa || summa <= 0) {
        errors.push(`Сумма 0 или отрицательная (Позиция-строка ${rowNum})`);
      }
      if (werks === null || werks === undefined || !werks) {
        errors.push(`Выберите склад (Позиция-строка ${rowNum})`);
      }
      if (parseFloat(minSumma) > parseFloat(summa)) {
        errors.push(
          `Мин. сумма должна быть ${minSumma} (Позиция-строка ${rowNum})`,
        );
      }
      totalPosition += parseFloat(summa);
    }

    if (enablePaySchedule) {
      if (psRows === null || psRows === undefined || psRows.length === 0) {
        errors.push('Необходимо заполнить график платежей');
      }

      for (let i = 0; i < psRows.length; i++) {
        const { payment_date, sum2 } = psRows[i];
        const rowNum = i + 1;
        if (
          payment_date === null ||
          payment_date === undefined ||
          !payment_date
        ) {
          errors.push(`Дата не выбрана (График платежей-строка ${rowNum})`);
        }
        if (sum2 === null || sum2 === undefined || !sum2 || sum2 <= 0) {
          errors.push(
            `Сумма 0 или отрицательная (График платежей-строка ${rowNum})`,
          );
        }
        totalSum2 += parseFloat(sum2);
      }
      if (totalPosition !== totalSum2) {
        errors.push('Суммы не равны');
      }
    }

    return errors;
  }

  render() {
    const bkpfInfo = {
      bukrsInfo: { readOnly: false, disabled: false },
      brnchInfo: { readOnly: false, disabled: false },
      business_area_idInfo: { readOnly: false, disabled: false },
      depInfo: { readOnly: false, disabled: false },
      budatInfo: { readOnly: false, disabled: true },
      bldatInfo: { readOnly: false, disabled: false },
      blartInfo: { readOnly: true, disabled: false },
      waersInfo: { readOnly: false, disabled: false },
      kursfInfo: { readOnly: true, disabled: false },
      bktxtInfo: { readOnly: false, disabled: false },
      officialInfo: { readOnly: true, disabled: true },
      zregInfo: { readOnly: false, disabled: false },
    };
    const { messages } = this.props.intl;

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
        {/* <Dimmer active={this.state.loading}>
                  <Loader size='massive' />
                </Dimmer> */}
        <Header as="h2" block>
          Договор продажи
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
                  <Icon name="save" size="large" />
                  Сохранить
                </Button>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header>Рассрочка</List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <Checkbox
                  checked={this.state.enablePaySchedule}
                  toggle
                  onChange={(e, { value }) =>
                    this.onInputChange(value, 'enablePaySchedule')
                  }
                />
              </List.Content>
            </List.Item>
          </List>
        </Segment>

        <OutputErrors errors={this.state.errors} />

        <FaHeader {...this.props} bkpfInfo={bkpfInfo} messages={messages} />
        <AmsgPosition
          brnch={this.props.bkpf.brnch}
          bukrs={this.props.bkpf.bukrs}
          waers={this.props.bkpf.waers}
          rows={this.state.rows}
          customer={this.state.customer}
          emptyRow={this.state.emptyRow}
          changeBseg={(name, value) => this.setState({ [name]: value })}
          werksBranchList={this.props.werksBranchList}
        />

        {this.state.enablePaySchedule && (
          <AmsgPaySchedule
            waers={this.props.bkpf.waers}
            psRows={this.state.psRows}
            emptyPsRow={this.state.emptyPsRow}
            changePaymentSchedule={(name, value) =>
              this.setState({ [name]: value })
            }
          />
        )}
      </Container>
    );
  }

  // handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex })
}

function mapStateToProps(state) {
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
    werksBranchList: state.f4.werksBranchList,
    activeLoader: state.loader.active,
  };
}

export default connect(mapStateToProps, {
  changefaBkpf,
  clearfaBkpf,
  amsgSave,
  modifyLoader,
  f4FetchWerksBranchList,
  f4FetchDepartmentList,
  f4FetchCurrencyList,
  f4FetchBusinessAreaList2,
  f4FetchExchangeRateNational,
})(injectIntl(Amsg));

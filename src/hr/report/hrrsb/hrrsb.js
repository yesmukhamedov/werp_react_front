import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Button,
  Dropdown,
  Icon,
  Container,
  Header,
  Grid,
  Segment,
  Checkbox,
  List,
} from 'semantic-ui-react';
import { modifyLoader } from '../../../general/loader/loader_action';
import OutputErrors from '../../../general/error/outputErrors';
import { fetchDynObjHr, clearDynObjHr } from '../../hr_action';
import { moneyFormat } from '../../../utils/helpers';
import { injectIntl } from 'react-intl';
import { messages } from '../../../locales/defineMessages';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { LinkToStaffCardView } from '../../../utils/outlink';
//import { excelDownload } from '../../../utils/helpers';
import OutputEmployyeAccount from './outputEmployeeAccount';

class Hrrsb extends Component {
  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.renderSearchTab = this.renderSearchTab.bind(this);
    this.searchFrep7 = this.searchFrep7.bind(this);
    this.getDetail = this.getDetail.bind(this);
    this.validate = this.validate.bind(this);
    this.renderTotal = this.renderTotal.bind(this);
    this.renderDetail = this.renderDetail.bind(this);
    this.exportExcel = this.exportExcel.bind(this);

    this.state = {
      searchTerm: {
        bukrs: '',
        branchList: [],
        dismissed: false,
        branchesOff: false,
      },
      activeIndex: 0,
      errors: [],
    };
  }

  // componentDidMount() {
  //   this.props.clearDynObjHr();
  //   // this.props.fetchDynamicFAGM(
  //   //   '/api/finance/reports/frep7/canReadDismissed',
  //   //   {},
  //   // );
  // }
  // componentWillReceiveProps(nextProps) {

  // }

  // componentWillUnmount() {
  //   this.props.clearDynObjHr();
  // }
  onInputChange(value, stateFieldName) {
    // const { canReadDismissed } = this.props;
    // this.props.clearDynObj();
    // this.props.changeDynObj({ canReadDismissed });
    // if (stateFieldName === 'bukrs') {
    //   this.setState({
    //     searchTerm: {
    //       ...this.state.searchTerm,
    //       [stateFieldName]: value,
    //       branchList: [],
    //     },
    //   });
    // } else if (stateFieldName === 'dismissed') {
    //   let dismissedNewVal = !this.state.searchTerm.dismissed;
    //   let branchesOff = this.state.searchTerm.branchesOff;
    //   if (!dismissedNewVal) {
    //     branchesOff = false;
    //   }
    //   this.setState({
    //     searchTerm: {
    //       ...this.state.searchTerm,
    //       dismissed: dismissedNewVal,
    //       branchesOff,
    //     },
    //   });
    // } else if (stateFieldName === 'branchesOff') {
    //   let branchesOffNewVal = !this.state.searchTerm.branchesOff;
    //   let branchList = JSON.parse(
    //     JSON.stringify(this.state.searchTerm.branchList),
    //   );
    //   if (branchesOffNewVal) {
    //     branchList = [];
    //   }
    //   this.setState({
    //     searchTerm: {
    //       ...this.state.searchTerm,
    //       branchList,
    //       branchesOff: branchesOffNewVal,
    //     },
    //   });
    // } else {
    //   this.setState({
    //     searchTerm: { ...this.state.searchTerm, [stateFieldName]: value },
    //   });
    // }
  }
  exportExcel(a_type) {
    //const { formatMessage } = this.props.intl;
    //let excelHeaders = [];
    // excelHeaders.push(messages['waers));
    // excelHeaders.push(messages['brnch));
    // excelHeaders.push(messages['balanceAccountMin));
    // excelHeaders.push(messages['depositAccountMin));
    // excelHeaders.push(messages['debtAccountMin));
    // excelHeaders.push(messages['doubtfulDebtAccountMin));
    // excelHeaders.push(messages['blockedAccountMin));
    // excelHeaders.push(
    //   messages['advancePaymentRequestAccountMin),
    // );
    // excelHeaders.push(messages['balanceAccountMin) + ' $');
    // excelHeaders.push(messages['depositAccountMin) + ' $');
    // excelHeaders.push(messages['debtAccountMin) + ' $');
    // excelHeaders.push(messages['doubtfulDebtAccountMin) + ' $');
    // excelHeaders.push(messages['blockedAccountMin) + ' $');
    // excelHeaders.push(
    //   messages['advancePaymentRequestAccountMin) + ' $',
    // );
    // excelDownload(
    //   '/api/finance/reports/frep7/downloadExcel',
    //   'Frep7Total.xls',
    //   'outputTable',
    //   this.props.outputTable,
    //   excelHeaders,
    // );
  }

  renderSearchTab() {
    const { messages } = this.props.intl;
    const { branchOptions, companyOptions, canReadDismissed } = this.props;
    const { bukrs, branchList, dismissed, branchesOff } = this.state.searchTerm;

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={16} computer={4}>
            <Table compact>
              <Table.Body>
                <Table.Row>
                  <Table.Cell collapsing>
                    <Icon name="folder" />
                    {messages['bukrs']}
                  </Table.Cell>
                  <Table.Cell colSpan="2">
                    <Dropdown
                      fluid
                      placeholder={messages['bukrs']}
                      selection
                      options={companyOptions || []}
                      value={bukrs}
                      onChange={(e, { value }) =>
                        this.onInputChange(value, 'bukrs')
                      }
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell collapsing>
                    <Icon name="browser" />
                    {messages['brnch']}
                  </Table.Cell>
                  <Table.Cell colSpan="2">
                    <Dropdown
                      placeholder={messages['all']}
                      fluid
                      multiple
                      search
                      selection
                      disabled={branchesOff}
                      options={bukrs ? branchOptions[bukrs] : []}
                      value={branchList}
                      onChange={(e, { value }) =>
                        this.onInputChange(value, 'branchList')
                      }
                      noResultsMessage={null}
                    />
                  </Table.Cell>
                </Table.Row>
                {canReadDismissed && (
                  <Table.Row>
                    <Table.Cell collapsing />
                    <Table.Cell colSpan="2">
                      <List>
                        <List.Item>
                          <Checkbox
                            checked={dismissed}
                            label={messages['dismissed']}
                            onChange={(e, { value }) =>
                              this.onInputChange(value, 'dismissed')
                            }
                          />
                        </List.Item>
                        <List.Item>
                          <Checkbox
                            checked={branchesOff}
                            disabled={!dismissed}
                            label={messages['branchesOff']}
                            toggle
                            onChange={(e, { value }) =>
                              this.onInputChange(value, 'branchesOff')
                            }
                          />
                        </List.Item>
                      </List>
                    </Table.Cell>
                  </Table.Row>
                )}

                <Table.Row>
                  <Table.Cell />
                  <Table.Cell colSpan="2">
                    <Button
                      icon
                      labelPosition="left"
                      primary
                      size="small"
                      onClick={() => this.searchFrep7()}
                    >
                      <Icon name="search" size="large" />
                      {messages['search']}
                    </Button>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  validate() {
    const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
    const language = localStorage.getItem('language');
    const errors = [];
    const { bukrs } = this.state.searchTerm;
    if (bukrs === null || bukrs === undefined || !bukrs) {
      errors.push(errorTable[`5${language}`]);
    }

    return errors;
  }
  searchFrep7() {
    this.props.modifyLoader(true);
    let errors = [];
    errors = this.validate();
    if (errors === null || errors === undefined || errors.length === 0) {
      this.props.fetchDynamicFAGM('finance/reports/frep7/search', {
        bukrs: this.state.searchTerm.bukrs,
        branchList: this.state.searchTerm.branchList.join(),
        dismissed: this.state.searchTerm.dismissed ? 1 : 0,
        branchesOff: this.state.searchTerm.branchesOff ? 1 : 0,
      });

      this.setState({
        activeIndex: 1,
      });
    } else {
      this.props.modifyLoader(false);
    }

    this.setState({ errors });
  }
  renderTotal() {
    //const { formatMessage } = this.props.intl;
    const { outputTable } = this.props;
    if (!outputTable) return '';

    return (
      <Table compact celled>
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell>{messages['waers']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['brnch']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['balanceAccountMin']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['depositAccountMin']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['debtAccountMin']}</Table.HeaderCell>
            <Table.HeaderCell>
              {messages['doubtfulDebtAccountMin']}
            </Table.HeaderCell>
            <Table.HeaderCell>{messages['blockedAccountMin']}</Table.HeaderCell>
            <Table.HeaderCell>
              {messages['advancePaymentRequestAccountMin']}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {messages['balanceAccountMin']} $
            </Table.HeaderCell>
            <Table.HeaderCell>
              {messages['depositAccountMin']} $
            </Table.HeaderCell>
            <Table.HeaderCell>{messages['debtAccountMin']} $</Table.HeaderCell>
            <Table.HeaderCell>
              {messages['doubtfulDebtAccountMin']} $
            </Table.HeaderCell>
            <Table.HeaderCell>
              {messages['blockedAccountMin']} $
            </Table.HeaderCell>
            <Table.HeaderCell>
              {messages['advancePaymentRequestAccountMin']} $
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {outputTable &&
            outputTable.map((wa, idx) => {
              // console.log(wa.branchName.length);
              return (
                <Table.Row
                  key={idx}
                  className={
                    wa.branchName && wa.waers
                      ? ''
                      : !wa.branchName && wa.waers
                      ? 'subtotalRow'
                      : 'totalRow'
                  }
                >
                  <Table.Cell>{wa.waers}</Table.Cell>
                  <Table.Cell>
                    {wa.branchName}

                    {wa.branchName && (
                      <Icon
                        name="search"
                        className="clickableIcon"
                        size="large"
                        onClick={() =>
                          this.getDetail(
                            wa.bukrs,
                            wa.branchId,
                            wa.waers,
                            wa.branchName,
                          )
                        }
                      />
                    )}
                  </Table.Cell>
                  <Table.Cell>{moneyFormat(wa.balance)}</Table.Cell>
                  <Table.Cell>{moneyFormat(wa.deposit)}</Table.Cell>
                  <Table.Cell>{moneyFormat(wa.debt)}</Table.Cell>
                  <Table.Cell>{moneyFormat(wa.doubtDebt)}</Table.Cell>
                  <Table.Cell>{moneyFormat(wa.block)}</Table.Cell>
                  <Table.Cell>{moneyFormat(wa.advReq)}</Table.Cell>
                  <Table.Cell>{moneyFormat(wa.balanceUsd)} $</Table.Cell>
                  <Table.Cell>{moneyFormat(wa.depositUsd)} $</Table.Cell>
                  <Table.Cell>{moneyFormat(wa.debtUsd)} $</Table.Cell>
                  <Table.Cell>{moneyFormat(wa.doubtDebtUsd)} $</Table.Cell>
                  <Table.Cell>{moneyFormat(wa.blockUsd)} $</Table.Cell>
                  <Table.Cell>{moneyFormat(wa.advReqUsd)} $</Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    );
  }
  getDetail(bukrs, branchId, waers, branchName) {
    this.props.modifyLoader(true);
    this.props.fetchDynamicFAGM('finance/reports/frep7/searchDetail', {
      bukrs: bukrs,
      branchId: branchId,
      waers: waers,
      branchName: branchName,
    });

    this.setState({
      activeIndex: 2,
    });
  }
  renderDetail() {
    const { messages } = this.props.intl;
    const { outputTableDetail, amountTotal } = this.props;

    if (!outputTableDetail) return '';

    let t1columns = [];
    let t1r1c1 = {
      Header: ({ value }) => <b>{messages['expenseDate']}</b>,
      accessor: 'staffFio',
      Cell: obj => (
        <span>
          <LinkToStaffCardView
            staffId={obj.original.staffId}
            staffFio={obj.original.fio}
          />
        </span>
      ),

      width: 250,
      minResizeWidth: 250,
    };

    // Cell: obj => (
    //   <span>
    //     <LinkToStaffCardView
    //       staffId={obj.original.staffId}
    //       staffFio={obj.original.fio}
    //     />
    //   </span>
    // ),
    let t1r1c2 = {
      Header: ({ value }) => <b>{messages['givenDate']}</b>,
      accessor: 'bldat',
      width: 80,
      minResizeWidth: 80,
    };

    let t1r1c3 = {
      Header: ({ value }) => <b>{messages['amount']}</b>,
      accessor: 'balance',
      Cell: obj => <span>{moneyFormat(obj.original.balance)}</span>,
      width: 140,
      minResizeWidth: 140,
    };

    let t1r1c4 = {
      Header: ({ value }) => <b>{messages['snNum']}</b>,
      accessor: 'deposit',
      Cell: obj => <span>{moneyFormat(obj.original.deposit)}</span>,
      width: 140,
      minResizeWidth: 140,
    };

    let t1r1c5 = {
      Header: ({ value }) => <b>{messages['bonusType']}</b>,
      accessor: 'debt',
      Cell: obj => <span>{moneyFormat(obj.original.debt)}</span>,
      width: 140,
      minResizeWidth: 140,
    };
    let t1r1c6 = {
      Header: ({ value }) => <b>{messages['employeePosition']}</b>,
      accessor: 'doubtDebt',
      Cell: obj => <span>{moneyFormat(obj.original.doubtDebt)}</span>,
      width: 140,
      minResizeWidth: 140,
    };
    let t1r1c7 = {
      Header: ({ value }) => <b>{messages['operationType']}</b>,
      accessor: 'block',
      Cell: obj => <span>{moneyFormat(obj.original.block)}</span>,
      width: 140,
      minResizeWidth: 140,
    };
    let t1r1c8 = {
      Header: ({ value }) => <b>{messages['bktxt']}</b>,
      accessor: 'advReq',
      Cell: obj => <span>{moneyFormat(obj.original.advReq)}</span>,
      width: 140,
      minResizeWidth: 140,
    };

    t1r1c3.Footer = (
      <span>
        <strong>
          <font>{amountTotal ? moneyFormat(amountTotal) : ''}</font>
        </strong>
      </span>
    );

    t1columns.push(t1r1c1);
    t1columns.push(t1r1c2);
    t1columns.push(t1r1c3);
    t1columns.push(t1r1c4);
    t1columns.push(t1r1c5);
    t1columns.push(t1r1c6);
    t1columns.push(t1r1c7);
    t1columns.push(t1r1c8);

    return (
      <ReactTable
        data={outputTableDetail ? outputTableDetail : []}
        columns={t1columns}
        pageSize={50}
        // defaultPageSize={100}
        showPagination={true}
        className="-striped -highlight"
        loadingText={messages['loadingText']}
        noDataText={messages['noDataText']}
        previousText={messages['previousText']}
        nextText={messages['nextText']}
        rowsText={messages['rowsText']}
        pageText={messages['pageText']}
        ofText={messages['ofText']}
      />
    );
  }

  render() {
    const { messages } = this.props.intl;
    // const { activeIndex } = this.state;
    // const { outputTable, outputTableDetail } = this.props;

    const {
      balanceAccountList,
      depositAccountList,
      blockedAccountList,
      advancePaymentRequestAccountList,
      debtAccountList,
      doubtfulDebtAccountList,
    } = this.props;

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
          {messages['transNameFrep7']}
        </Header>

        <Grid>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <OutputEmployyeAccount
                outputTable={balanceAccountList}
                color={'orange'}
                header={messages['balanceAccount']}
              />
              <OutputEmployyeAccount
                outputTable={depositAccountList}
                color={'orange'}
                header={messages['depositAccount']}
              />
              <OutputEmployyeAccount
                outputTable={blockedAccountList}
                color={'orange'}
                header={messages['blockedAccount']}
              />
              <OutputEmployyeAccount
                outputTable={advancePaymentRequestAccountList}
                color={'orange'}
                header={messages['advancePaymentRequestAccount']}
              />
              <OutputEmployyeAccount
                outputTable={debtAccountList}
                color={'orange'}
                header={messages['debtAccount']}
              />
              <OutputEmployyeAccount
                outputTable={doubtfulDebtAccountList}
                color={'orange'}
                header={messages['doubtfulDebtAccount']}
              />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={12}>
              <Segment>
                <OutputErrors errors={this.state.errors} />
                Detail
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  // console.log(state,'state')
  return {
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsAll,
    outputTable: state.fa.dynamicObject.outputTable,
    outputTableDetail: state.fa.dynamicObject.outputTableDetail,
    detailTotal: state.fa.dynamicObject.detailTotal,
    canReadDismissed: state.fa.dynamicObject.canReadDismissed,
  };
}

export default connect(mapStateToProps, {
  modifyLoader,

  //cleared by dynamic clear function
  fetchDynObjHr,
  clearDynObjHr,
})(injectIntl(Hrrsb));

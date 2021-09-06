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
    Menu,
    Checkbox,
    List,
} from 'semantic-ui-react';
import { modifyLoader } from '../../../general/loader/loader_action';
import OutputErrors from '../../../general/error/outputErrors';
import { fetchDynamicFAGM, clearDynObj, changeDynObj } from '../../fa_action';
import { moneyFormat } from '../../../utils/helpers';
import { injectIntl } from 'react-intl';
import { messages } from '../../../locales/defineMessages';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { LinkToStaffCardView } from '../../../utils/outlink';
import { excelDownload } from '../../../utils/helpers';

class Frep7 extends Component {
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

    componentDidMount() {
        this.props.clearDynObj();
        this.props.fetchDynamicFAGM(
            'core/finance/reports/frep7/canReadDismissed',
            {},
        );
    }
    componentWillReceiveProps(nextProps) {}
    componentWillUnmount() {
        this.props.clearDynObj();
    }
    onInputChange(value, stateFieldName) {
        const { canReadDismissed } = this.props;
        this.props.clearDynObj();
        this.props.changeDynObj({ canReadDismissed });

        if (stateFieldName === 'bukrs') {
            this.setState({
                searchTerm: {
                    ...this.state.searchTerm,
                    [stateFieldName]: value,
                    branchList: [],
                },
            });
        } else if (stateFieldName === 'dismissed') {
            let dismissedNewVal = !this.state.searchTerm.dismissed;
            let branchesOff = this.state.searchTerm.branchesOff;
            if (!dismissedNewVal) {
                branchesOff = false;
            }
            this.setState({
                searchTerm: {
                    ...this.state.searchTerm,
                    dismissed: dismissedNewVal,
                    branchesOff,
                },
            });
        } else if (stateFieldName === 'branchesOff') {
            let branchesOffNewVal = !this.state.searchTerm.branchesOff;
            let branchList = JSON.parse(
                JSON.stringify(this.state.searchTerm.branchList),
            );

            if (branchesOffNewVal) {
                branchList = [];
            }
            this.setState({
                searchTerm: {
                    ...this.state.searchTerm,
                    branchList,
                    branchesOff: branchesOffNewVal,
                },
            });
        } else {
            this.setState({
                searchTerm: {
                    ...this.state.searchTerm,
                    [stateFieldName]: value,
                },
            });
        }
    }
    exportExcel(a_type) {
        const { formatMessage } = this.props.intl;
        let excelHeaders = [];

        if (a_type === 'total') {
            excelHeaders.push(formatMessage(messages.waers));
            excelHeaders.push(formatMessage(messages.brnch));
            excelHeaders.push(formatMessage(messages.balanceAccountMin));
            excelHeaders.push(formatMessage(messages.depositAccountMin));
            excelHeaders.push(formatMessage(messages.debtAccountMin));
            excelHeaders.push(formatMessage(messages.doubtfulDebtAccountMin));
            excelHeaders.push(formatMessage(messages.blockedAccountMin));
            excelHeaders.push(
                formatMessage(messages.advancePaymentRequestAccountMin),
            );
            excelHeaders.push(formatMessage(messages.balanceAccountMin) + ' $');
            excelHeaders.push(formatMessage(messages.depositAccountMin) + ' $');
            excelHeaders.push(formatMessage(messages.debtAccountMin) + ' $');
            excelHeaders.push(
                formatMessage(messages.doubtfulDebtAccountMin) + ' $',
            );
            excelHeaders.push(formatMessage(messages.blockedAccountMin) + ' $');
            excelHeaders.push(
                formatMessage(messages.advancePaymentRequestAccountMin) + ' $',
            );

            excelDownload(
                'core/finance/reports/frep7/downloadExcel',
                'Frep7Total.xls',
                'outputTable',
                this.props.outputTable,
                excelHeaders,
            );
        } else if (a_type === 'detail') {
            excelHeaders.push(formatMessage(messages.fio));
            excelHeaders.push(formatMessage(messages.waers));
            excelHeaders.push(formatMessage(messages.balanceAccountMin));
            excelHeaders.push(formatMessage(messages.depositAccountMin));
            excelHeaders.push(formatMessage(messages.debtAccountMin));
            excelHeaders.push(formatMessage(messages.doubtfulDebtAccountMin));
            excelHeaders.push(formatMessage(messages.blockedAccountMin));
            excelHeaders.push(
                formatMessage(messages.advancePaymentRequestAccountMin),
            );
            excelHeaders.push(formatMessage(messages.balanceAccountMin) + ' $');
            excelHeaders.push(formatMessage(messages.depositAccountMin) + ' $');
            excelHeaders.push(formatMessage(messages.debtAccountMin) + ' $');
            excelHeaders.push(
                formatMessage(messages.doubtfulDebtAccountMin) + ' $',
            );
            excelHeaders.push(formatMessage(messages.blockedAccountMin) + ' $');
            excelHeaders.push(
                formatMessage(messages.advancePaymentRequestAccountMin) + ' $',
            );

            excelDownload(
                'core/finance/reports/frep7/downloadExcelDetail',
                'Frep7Detail.xls',
                'outputTableDetail',
                this.props.outputTableDetail,
                excelHeaders,
            );
        }
    }

    renderSearchTab() {
        const { formatMessage } = this.props.intl;
        const { branchOptions, companyOptions, canReadDismissed } = this.props;
        const {
            bukrs,
            branchList,
            dismissed,
            branchesOff,
        } = this.state.searchTerm;

        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column mobile={16} tablet={16} computer={4}>
                        <Table compact>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell collapsing>
                                        <Icon name="folder" />
                                        {formatMessage(messages.bukrs)}
                                    </Table.Cell>
                                    <Table.Cell colSpan="2">
                                        <Dropdown
                                            fluid
                                            placeholder={formatMessage(
                                                messages.bukrs,
                                            )}
                                            selection
                                            options={companyOptions || []}
                                            value={bukrs}
                                            onChange={(e, { value }) =>
                                                this.onInputChange(
                                                    value,
                                                    'bukrs',
                                                )
                                            }
                                        />
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell collapsing>
                                        <Icon name="browser" />
                                        {formatMessage(messages.brnch)}
                                    </Table.Cell>
                                    <Table.Cell colSpan="2">
                                        <Dropdown
                                            placeholder={formatMessage(
                                                messages.all,
                                            )}
                                            fluid
                                            multiple
                                            search
                                            selection
                                            disabled={branchesOff}
                                            options={
                                                bukrs
                                                    ? branchOptions[bukrs]
                                                    : []
                                            }
                                            value={branchList}
                                            onChange={(e, { value }) =>
                                                this.onInputChange(
                                                    value,
                                                    'branchList',
                                                )
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
                                                        label={formatMessage(
                                                            messages.dismissed,
                                                        )}
                                                        onChange={(
                                                            e,
                                                            { value },
                                                        ) =>
                                                            this.onInputChange(
                                                                value,
                                                                'dismissed',
                                                            )
                                                        }
                                                    />
                                                </List.Item>
                                                <List.Item>
                                                    <Checkbox
                                                        checked={branchesOff}
                                                        disabled={!dismissed}
                                                        label={formatMessage(
                                                            messages.branchesOff,
                                                        )}
                                                        toggle
                                                        onChange={(
                                                            e,
                                                            { value },
                                                        ) =>
                                                            this.onInputChange(
                                                                value,
                                                                'branchesOff',
                                                            )
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
                                            {formatMessage(messages.search)}
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
            this.props.fetchDynamicFAGM('core/finance/reports/frep7/search', {
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
        const { formatMessage } = this.props.intl;
        const { outputTable } = this.props;
        if (!outputTable) return '';

        return (
            <Table compact celled>
                <Table.Header>
                    <Table.Row textAlign="center">
                        <Table.HeaderCell>
                            {formatMessage(messages.waers)}
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {formatMessage(messages.brnch)}
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {formatMessage(messages.balanceAccountMin)}
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {formatMessage(messages.depositAccountMin)}
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {formatMessage(messages.debtAccountMin)}
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {formatMessage(messages.doubtfulDebtAccountMin)}
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {formatMessage(messages.blockedAccountMin)}
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {formatMessage(
                                messages.advancePaymentRequestAccountMin,
                            )}
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {formatMessage(messages.balanceAccountMin)} $
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {formatMessage(messages.depositAccountMin)} $
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {formatMessage(messages.debtAccountMin)} $
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {formatMessage(messages.doubtfulDebtAccountMin)} $
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {formatMessage(messages.blockedAccountMin)} $
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {formatMessage(
                                messages.advancePaymentRequestAccountMin,
                            )}{' '}
                            $
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
                                    <Table.Cell>
                                        {moneyFormat(wa.balance)}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {moneyFormat(wa.deposit)}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {moneyFormat(wa.debt)}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {moneyFormat(wa.doubtDebt)}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {moneyFormat(wa.block)}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {moneyFormat(wa.advReq)}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {moneyFormat(wa.balanceUsd)} $
                                    </Table.Cell>
                                    <Table.Cell>
                                        {moneyFormat(wa.depositUsd)} $
                                    </Table.Cell>
                                    <Table.Cell>
                                        {moneyFormat(wa.debtUsd)} $
                                    </Table.Cell>
                                    <Table.Cell>
                                        {moneyFormat(wa.doubtDebtUsd)} $
                                    </Table.Cell>
                                    <Table.Cell>
                                        {moneyFormat(wa.blockUsd)} $
                                    </Table.Cell>
                                    <Table.Cell>
                                        {moneyFormat(wa.advReqUsd)} $
                                    </Table.Cell>
                                </Table.Row>
                            );
                        })}
                </Table.Body>
            </Table>
        );
    }
    getDetail(bukrs, branchId, waers, branchName) {
        this.props.modifyLoader(true);
        this.props.fetchDynamicFAGM('core/finance/reports/frep7/searchDetail', {
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
        const { formatMessage } = this.props.intl;
        const { outputTableDetail, detailTotal } = this.props;

        if (!outputTableDetail) return '';

        let t1columns = [];
        let t1r1c1 = {
            Header: ({ value }) => <b>{formatMessage(messages.fio)}</b>,
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
        let t1r1c2 = {
            Header: ({ value }) => <b>{formatMessage(messages.waers)}</b>,
            accessor: 'waers',
            width: 80,
            minResizeWidth: 80,
        };
        let t1r1c3 = {
            Header: ({ value }) => (
                <b>{formatMessage(messages.balanceAccountMin)}</b>
            ),
            accessor: 'balance',
            Cell: obj => <span>{moneyFormat(obj.original.balance)}</span>,
            width: 140,
            minResizeWidth: 140,
        };

        let t1r1c4 = {
            Header: ({ value }) => (
                <b>{formatMessage(messages.depositAccountMin)}</b>
            ),
            accessor: 'deposit',
            Cell: obj => <span>{moneyFormat(obj.original.deposit)}</span>,
            width: 140,
            minResizeWidth: 140,
        };
        let t1r1c5 = {
            Header: ({ value }) => (
                <b>{formatMessage(messages.debtAccountMin)}</b>
            ),
            accessor: 'debt',
            Cell: obj => <span>{moneyFormat(obj.original.debt)}</span>,
            width: 140,
            minResizeWidth: 140,
        };
        let t1r1c6 = {
            Header: ({ value }) => (
                <b>{formatMessage(messages.doubtfulDebtAccountMin)}</b>
            ),
            accessor: 'doubtDebt',
            Cell: obj => <span>{moneyFormat(obj.original.doubtDebt)}</span>,
            width: 140,
            minResizeWidth: 140,
        };
        let t1r1c7 = {
            Header: ({ value }) => (
                <b>{formatMessage(messages.blockedAccountMin)}</b>
            ),
            accessor: 'block',
            Cell: obj => <span>{moneyFormat(obj.original.block)}</span>,
            width: 140,
            minResizeWidth: 140,
        };
        let t1r1c8 = {
            Header: ({ value }) => (
                <b>{formatMessage(messages.advancePaymentRequestAccountMin)}</b>
            ),
            accessor: 'advReq',
            Cell: obj => <span>{moneyFormat(obj.original.advReq)}</span>,
            width: 140,
            minResizeWidth: 140,
        };
        let t1r1c9 = {
            Header: ({ value }) => (
                <b>{formatMessage(messages.balanceAccountMin)} $</b>
            ),
            accessor: 'balanceUsd',
            Cell: obj => <span>{moneyFormat(obj.original.balanceUsd)} $</span>,
            width: 140,
            minResizeWidth: 140,
        };
        let t1r1c10 = {
            Header: ({ value }) => (
                <b>{formatMessage(messages.depositAccountMin)} $</b>
            ),
            accessor: 'depositUsd',
            Cell: obj => <span>{moneyFormat(obj.original.depositUsd)} $</span>,
            width: 140,
            minResizeWidth: 140,
        };
        let t1r1c11 = {
            Header: ({ value }) => (
                <b>{formatMessage(messages.debtAccountMin)} $</b>
            ),
            accessor: 'debtUsd',
            Cell: obj => <span>{moneyFormat(obj.original.debtUsd)} $</span>,
            width: 140,
            minResizeWidth: 140,
        };
        let t1r1c12 = {
            Header: ({ value }) => (
                <b>{formatMessage(messages.doubtfulDebtAccountMin)} $</b>
            ),
            accessor: 'doubtDebtUsd',
            Cell: obj => (
                <span>{moneyFormat(obj.original.doubtDebtUsd)} $</span>
            ),
            width: 140,
            minResizeWidth: 140,
        };
        let t1r1c13 = {
            Header: ({ value }) => (
                <b>{formatMessage(messages.blockedAccountMin)} $</b>
            ),
            accessor: 'blockUsd',
            Cell: obj => <span>{moneyFormat(obj.original.blockUsd)} $</span>,
            width: 140,
            minResizeWidth: 140,
        };
        let t1r1c14 = {
            Header: ({ value }) => (
                <b>
                    {formatMessage(messages.advancePaymentRequestAccountMin)} $
                </b>
            ),
            accessor: 'advReqUsd',
            Cell: obj => <span>{moneyFormat(obj.original.advReqUsd)} $</span>,
            width: 140,
            minResizeWidth: 140,
        };

        t1r1c3.Footer = (
            <span>
                <strong>
                    <font>
                        {detailTotal.balance
                            ? moneyFormat(detailTotal.balance)
                            : ''}
                    </font>
                </strong>
            </span>
        );
        t1r1c4.Footer = (
            <span>
                <strong>
                    <font>
                        {detailTotal.deposit
                            ? moneyFormat(detailTotal.deposit)
                            : ''}
                    </font>
                </strong>
            </span>
        );
        t1r1c5.Footer = (
            <span>
                <strong>
                    <font>
                        {detailTotal.debt ? moneyFormat(detailTotal.debt) : ''}
                    </font>
                </strong>
            </span>
        );
        t1r1c6.Footer = (
            <span>
                <strong>
                    <font>
                        {detailTotal.doubtDebt
                            ? moneyFormat(detailTotal.doubtDebt)
                            : ''}
                    </font>
                </strong>
            </span>
        );
        t1r1c7.Footer = (
            <span>
                <strong>
                    <font>
                        {detailTotal.block
                            ? moneyFormat(detailTotal.block)
                            : ''}
                    </font>
                </strong>
            </span>
        );
        t1r1c8.Footer = (
            <span>
                <strong>
                    <font>
                        {detailTotal.advReq
                            ? moneyFormat(detailTotal.advReq)
                            : ''}
                    </font>
                </strong>
            </span>
        );
        t1r1c9.Footer = (
            <span>
                <strong>
                    <font>
                        {detailTotal.balanceUsd
                            ? moneyFormat(detailTotal.balanceUsd)
                            : ''}
                    </font>
                </strong>
            </span>
        );
        t1r1c10.Footer = (
            <span>
                <strong>
                    <font>
                        {detailTotal.depositUsd
                            ? moneyFormat(detailTotal.depositUsd)
                            : ''}
                    </font>
                </strong>
            </span>
        );
        t1r1c11.Footer = (
            <span>
                <strong>
                    <font>
                        {detailTotal.debtUsd
                            ? moneyFormat(detailTotal.debtUsd)
                            : ''}
                    </font>
                </strong>
            </span>
        );
        t1r1c12.Footer = (
            <span>
                <strong>
                    <font>
                        {detailTotal.doubtDebtUsd
                            ? moneyFormat(detailTotal.doubtDebtUsd)
                            : ''}
                    </font>
                </strong>
            </span>
        );
        t1r1c13.Footer = (
            <span>
                <strong>
                    <font>
                        {detailTotal.blockUsd
                            ? moneyFormat(detailTotal.blockUsd)
                            : ''}
                    </font>
                </strong>
            </span>
        );
        t1r1c14.Footer = (
            <span>
                <strong>
                    <font>
                        {detailTotal.advReqUsd
                            ? moneyFormat(detailTotal.advReqUsd)
                            : ''}
                    </font>
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
        t1columns.push(t1r1c9);
        t1columns.push(t1r1c10);
        t1columns.push(t1r1c11);
        t1columns.push(t1r1c12);
        t1columns.push(t1r1c13);
        t1columns.push(t1r1c14);

        return (
            <ReactTable
                data={outputTableDetail ? outputTableDetail : []}
                columns={t1columns}
                pageSize={50}
                // defaultPageSize={100}
                showPagination={true}
                className="-striped -highlight"
                loadingText={formatMessage(messages.loadingText)}
                noDataText={formatMessage(messages.noDataText)}
                previousText={formatMessage(messages.previousText)}
                nextText={formatMessage(messages.nextText)}
                rowsText={formatMessage(messages.rowsText)}
                pageText={formatMessage(messages.pageText)}
                ofText={formatMessage(messages.ofText)}
            />
        );
    }

    render() {
        const { formatMessage } = this.props.intl;
        const { activeIndex } = this.state;
        const { outputTable, outputTableDetail } = this.props;

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
                    {formatMessage(messages.transNameFrep7)}
                </Header>

                <Menu pointing stackable>
                    <Menu.Item
                        name={formatMessage(messages.searchParameters)}
                        active={activeIndex === 0}
                        onClick={() => {
                            this.setState({ activeIndex: 0 });
                        }}
                        icon="search"
                    />
                    <Menu.Item
                        name={formatMessage(messages.result)}
                        active={activeIndex === 1}
                        onClick={() => {
                            this.setState({ activeIndex: 1 });
                        }}
                        icon="bar chart"
                    />
                    <Menu.Item
                        name={formatMessage(messages.details)}
                        active={activeIndex === 2}
                        onClick={() => {
                            this.setState({ activeIndex: 2 });
                        }}
                        icon="list layout"
                    />
                </Menu>

                <Segment className={activeIndex === 0 ? 'show' : 'hide'}>
                    <OutputErrors errors={this.state.errors} />
                    {this.renderSearchTab()}
                </Segment>
                <Segment className={activeIndex === 1 ? 'show' : 'hide'}>
                    {outputTable && outputTable.length > 0 && (
                        <Menu stackable size="small">
                            <Menu.Item>
                                <img
                                    alt=""
                                    className="clickableItem"
                                    src="/assets/img/xlsx_export_icon.png"
                                    onClick={() => this.exportExcel('total')}
                                />
                            </Menu.Item>
                        </Menu>
                    )}
                    {this.renderTotal()}
                </Segment>
                <Segment className={activeIndex === 2 ? 'show' : 'hide'}>
                    {outputTableDetail && outputTableDetail.length > 0 && (
                        <Menu stackable size="small">
                            <Menu.Item>
                                <img
                                    alt=""
                                    className="clickableItem"
                                    src="/assets/img/xlsx_export_icon.png"
                                    onClick={() => this.exportExcel('detail')}
                                />
                            </Menu.Item>
                        </Menu>
                    )}
                    {this.renderDetail()}
                </Segment>
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
    clearDynObj,
    fetchDynamicFAGM,
    changeDynObj,
})(injectIntl(Frep7));

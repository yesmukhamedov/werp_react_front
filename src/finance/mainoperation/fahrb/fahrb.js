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
    Input,
    Label,
} from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';
import { modifyLoader } from '../../../general/loader/loader_action';
import OutputErrors from '../../../general/error/outputErrors';
import {
    fetchDynamicFAGM,
    clearDynObj,
    saveFahrb,
    changeDynObj,
} from '../../../finance/fa_action';
import {
    handleFocus,
    moneyFormat,
    moneyInputHanler,
} from '../../../utils/helpers';
import { injectIntl } from 'react-intl';
import { messages } from '../../../locales/defineMessages';
import queryString from 'query-string';

class Fahrb extends Component {
    constructor(props) {
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
        this.validate = this.validate.bind(this);
        this.renderStaffAccount = this.renderStaffAccount.bind(this);
        this.save = this.save.bind(this);

        this.state = {
            payroll: { waers: '', operation: '', dmbtr: 0 },
            //   searchParameters:{},
            errors: [],
        };
    }

    componentWillReceiveProps(nextProps) {
        if (
            nextProps.result !== null &&
            nextProps.result !== undefined &&
            nextProps.result === true
        ) {
            // console.log(nextProps,'nextProps')
            this.props.changeDynObj({ result: null });
            this.setState({
                payroll: { waers: '', operation: '', dmbtr: 0 },
                //   searchParameters:{},
                errors: [],
            });
        }
    }

    componentDidMount() {
        const url = this.props.location.search;
        const params = queryString.parse(url);

        if (params.bukrs && params.branchId && params.staffId) {
            const searchParameters = {
                bukrs: params.bukrs,
                branchId: params.branchId,
                staffId: params.staffId,
            };
            this.props.fetchDynamicFAGM(
                'core/finance/mainoperation/fahrb/fetch',
                {
                    ...searchParameters,
                },
            );
            //   this.setState(searchParameters)
        }
    }
    componentWillUnmount() {
        this.props.clearDynObj();
    }
    onInputChange(value, stateFieldName) {
        if (stateFieldName === 'dmbtr') {
            const newVal = moneyInputHanler(value, 2);
            if (newVal !== undefined) {
                this.setState({
                    payroll: {
                        ...this.state.payroll,
                        [stateFieldName]: newVal,
                    },
                });
            }
        } else {
            this.setState({
                payroll: { ...this.state.payroll, [stateFieldName]: value },
            });
        }
    }

    save() {
        this.props.modifyLoader(true);
        let errors = [];
        errors = this.validate();
        if (errors === null || errors === undefined || errors.length === 0) {
            const newPrl = JSON.parse(JSON.stringify(this.state.payroll));
            const param = {
                ...newPrl,
                bukrs: this.props.bukrs,
                branchId: this.props.branchId,
                staffId: this.props.staffId,
            };
            this.props.saveFahrb(param);
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
        const { waers, operation, dmbtr } = this.state.payroll;
        // if (bukrs === null || bukrs === undefined || !bukrs) {
        //   errors.push(errorTable[`5${language}`]);
        // }

        if (
            operation === null ||
            operation === undefined ||
            operation.length === 0
        ) {
            errors.push(errorTable[`16${language}`]);
        }

        if (waers === null || waers === undefined || !waers) {
            errors.push(errorTable[`1${language}`]);
        }

        if (
            dmbtr === null ||
            dmbtr === undefined ||
            !dmbtr ||
            parseFloat(dmbtr) <= 0
        ) {
            errors.push(errorTable[`61${language}`]);
        }

        return errors;
    }

    renderStaffAccount() {
        const { formatMessage } = this.props.intl;
        const {
            balanceAccountList,
            debtAccountList,
            doubtfulDebtAccountList,
        } = this.props;
        // console.log(balanceAccountList,'balanceAccountList')
        // console.log(debtAccountList,'debtAccountList')
        return (
            <Grid>
                {balanceAccountList && (
                    <Grid.Row>
                        <Grid.Column mobile={16} tablet={16} computer={16}>
                            <Segment>
                                <Label color="orange" ribbon>
                                    {formatMessage(messages.balanceAccount)}
                                </Label>
                                <Table compact>
                                    <Table.Body>
                                        {balanceAccountList.map((item, key) => (
                                            <Table.Row key={key}>
                                                <Table.Cell>
                                                    <Input
                                                        value={item.waers}
                                                        readOnly
                                                    />
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <Input
                                                        value={moneyFormat(
                                                            item.dmbtr,
                                                        )}
                                                        readOnly
                                                    />
                                                </Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                )}
                {debtAccountList && (
                    <Grid.Row>
                        <Grid.Column mobile={16} tablet={16} computer={16}>
                            <Segment>
                                <Label color="orange" ribbon>
                                    {formatMessage(messages.debtAccount)}
                                </Label>
                                <Table compact>
                                    <Table.Body>
                                        {debtAccountList.map((item, key) => (
                                            <Table.Row key={key}>
                                                <Table.Cell>
                                                    <Input
                                                        value={item.waers}
                                                        readOnly
                                                    />
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <Input
                                                        value={moneyFormat(
                                                            item.dmbtr,
                                                        )}
                                                        readOnly
                                                    />
                                                </Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                )}
                {doubtfulDebtAccountList && (
                    <Grid.Row>
                        <Grid.Column mobile={16} tablet={16} computer={16}>
                            <Segment>
                                <Label color="orange" ribbon>
                                    {formatMessage(
                                        messages.doubtfulDebtAccount,
                                    )}
                                </Label>
                                <Table compact>
                                    <Table.Body>
                                        {doubtfulDebtAccountList.map(
                                            (item, key) => (
                                                <Table.Row key={key}>
                                                    <Table.Cell>
                                                        <Input
                                                            value={item.waers}
                                                            readOnly
                                                        />
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <Input
                                                            value={moneyFormat(
                                                                item.dmbtr,
                                                            )}
                                                            readOnly
                                                        />
                                                    </Table.Cell>
                                                </Table.Row>
                                            ),
                                        )}
                                    </Table.Body>
                                </Table>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                )}
            </Grid>
        );
    }

    render() {
        const { formatMessage } = this.props.intl;
        const { currencyList, bukrsName, branchName, staffName } = this.props;
        const { waers, operation, dmbtr } = this.state.payroll;
        let currencyOptions = [];
        // console.log(currencyList, bukrsName, branchName, staffName )

        if (currencyList) {
            currencyOptions = currencyList.map(item => {
                return {
                    key: item.id,
                    value: item.currency,
                    text: item.currency,
                };
            });
        }

        const operationOptions = [
            {
                key: 1,
                text: formatMessage(messages.fahrb_op_pay_loan),
                value: '1',
            },
            {
                key: 2,
                text: formatMessage(messages.fahrb_op_from_loan_to_balance),
                value: '2',
            },
            {
                key: 3,
                text: formatMessage(messages.fahrb_op_from_balance_to_loan),
                value: '3',
            },
            {
                key: 4,
                text: formatMessage(messages.fahrb_op_from_loan_to_doubtful),
                value: '4',
            },
            {
                key: 5,
                text: formatMessage(messages.fahrb_op_from_doubtful_to_loan),
                value: '5',
            },
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
                <Header as="h2" block>
                    {formatMessage(messages.transNameFahrb)}
                </Header>

                <Segment>
                    <OutputErrors errors={this.state.errors} />

                    <Grid>
                        <Grid.Row>
                            <Grid.Column mobile={16} tablet={16} computer={8}>
                                <Table compact>
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell>
                                                <Icon name="folder" />
                                                {formatMessage(messages.bukrs)}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Input
                                                    value={bukrsName || ''}
                                                    readOnly
                                                    fluid
                                                />
                                            </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                <Icon name="browser" />
                                                {formatMessage(messages.brnch)}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Input
                                                    value={branchName || ''}
                                                    readOnly
                                                    fluid
                                                />
                                            </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                <Icon name="user" />
                                                {formatMessage(
                                                    messages.employee,
                                                )}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Input
                                                    value={staffName || ''}
                                                    readOnly
                                                    fluid
                                                />
                                            </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                <Icon name="list" />
                                                {formatMessage(
                                                    messages.operation,
                                                )}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Dropdown
                                                    placeholder={formatMessage(
                                                        messages.operation,
                                                    )}
                                                    fluid
                                                    selection
                                                    options={
                                                        operationOptions || []
                                                    }
                                                    value={operation}
                                                    onChange={(e, { value }) =>
                                                        this.onInputChange(
                                                            value,
                                                            'operation',
                                                        )
                                                    }
                                                    noResultsMessage={formatMessage(
                                                        messages.noResultsMessage,
                                                    )}
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
                                                    placeholder={formatMessage(
                                                        messages.waers,
                                                    )}
                                                    fluid
                                                    selection
                                                    options={
                                                        currencyOptions || []
                                                    }
                                                    value={waers}
                                                    onChange={(e, { value }) =>
                                                        this.onInputChange(
                                                            value,
                                                            'waers',
                                                        )
                                                    }
                                                    noResultsMessage={formatMessage(
                                                        messages.noResultsMessage,
                                                    )}
                                                />
                                            </Table.Cell>
                                        </Table.Row>

                                        <Table.Row>
                                            <Table.Cell>
                                                {formatMessage(messages.amount)}
                                            </Table.Cell>

                                            <Table.Cell>
                                                <Input
                                                    value={moneyFormat(dmbtr)}
                                                    onFocus={handleFocus}
                                                    maxLength="18"
                                                    fluid
                                                    onChange={(e, { value }) =>
                                                        this.onInputChange(
                                                            value,
                                                            'dmbtr',
                                                        )
                                                    }
                                                />
                                            </Table.Cell>
                                        </Table.Row>

                                        <Table.Row>
                                            <Table.Cell />
                                            <Table.Cell colSpan="2">
                                                <Button
                                                    icon
                                                    labelPosition="left"
                                                    primary
                                                    size="small"
                                                    onClick={() => this.save()}
                                                >
                                                    <Icon
                                                        name="save"
                                                        size="large"
                                                    />
                                                    {formatMessage(
                                                        messages.save,
                                                    )}
                                                </Button>
                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </Grid.Column>

                            <Grid.Column mobile={16} tablet={16} computer={8}>
                                {this.renderStaffAccount()}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    // console.log(state,'state')
    return {
        currencyList: state.fa.dynamicObject.currencyList,
        bukrs: state.fa.dynamicObject.bukrs,
        bukrsName: state.fa.dynamicObject.bukrsName,
        branchId: state.fa.dynamicObject.branchId,
        branchName: state.fa.dynamicObject.branchName,
        staffId: state.fa.dynamicObject.staffId,
        staffName: state.fa.dynamicObject.staffName,
        balanceAccountList: state.fa.dynamicObject.balanceAccountList,
        debtAccountList: state.fa.dynamicObject.debtAccountList,
        doubtfulDebtAccountList: state.fa.dynamicObject.doubtfulDebtAccountList,
        result: state.fa.dynamicObject.result,
    };
}

export default connect(mapStateToProps, {
    modifyLoader,
    //cleared by dynamic clear function
    clearDynObj,
    fetchDynamicFAGM,
    saveFahrb,
    changeDynObj,
})(injectIntl(Fahrb));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Loader,
    Table,
    Button,
    Dropdown,
    Icon,
    Container,
    Header,
    Grid,
    Label,
    Input,
    Sticky,
} from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';
import { notify } from '../../../general/notification/notification_action';
import {
    getTradeIn,
    tradeInOptions,
} from '../contractAdditionaComponents/marketingConstants';
import './prcltgs.css';
import { doGet, doPost } from '../../../utils/apiActions';

import { f4FetchBankPartnerOptions } from '../../../reference/f4/f4_action';
import { stringToMoment, momentToString } from '../../../utils/helpers';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

require('moment/locale/ru');
require('moment/locale/tr');

const categoryOptions = [
    { key: 1, text: 'Уборочная система', value: 1 },
    { key: 2, text: 'Система очистки воды', value: 2 },
    { key: 3, text: 'Все', value: 3 },
];
const premOptions = [
    { key: 1, text: '1', value: 1 },
    { key: 2, text: '2', value: 2 },
];
const monthNumOptions = [
    { key: 1, text: '1', value: 1 },
    { key: 2, text: '2', value: 2 },
    { key: 3, text: '3', value: 3 },
    { key: 4, text: '4', value: 4 },
    { key: 5, text: '5', value: 5 },
    { key: 6, text: '6', value: 6 },
    { key: 7, text: '7', value: 7 },
    { key: 8, text: '8', value: 8 },
    { key: 9, text: '9', value: 9 },
    { key: 10, text: '10', value: 10 },
    { key: 11, text: '11', value: 11 },
    { key: 12, text: '12', value: 12 },
    { key: 13, text: '13', value: 13 },
    { key: 14, text: '14', value: 14 },
    { key: 15, text: '15', value: 15 },
    { key: 16, text: '16', value: 16 },
    { key: 17, text: '17', value: 17 },
    { key: 18, text: '18', value: 18 },
    { key: 19, text: '19', value: 19 },
    { key: 20, text: '20', value: 20 },
    { key: 21, text: '21', value: 21 },
    { key: 22, text: '22', value: 22 },
    { key: 23, text: '23', value: 23 },
    { key: 24, text: '24', value: 24 },
    { key: 25, text: '25', value: 25 },
    { key: 26, text: '26', value: 26 },
    { key: 27, text: '27', value: 27 },
    { key: 28, text: '28', value: 28 },
    { key: 29, text: '29', value: 29 },
    { key: 30, text: '30', value: 30 },
    { key: 31, text: '31', value: 31 },
    { key: 32, text: '32', value: 32 },
    { key: 33, text: '33', value: 33 },
    { key: 34, text: '34', value: 34 },
    { key: 35, text: '35', value: 35 },
    { key: 36, text: '36', value: 36 },
];

// const arrayList= ;
class Prcltgs extends Component {
    constructor(props) {
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
        this.onSearchPriceList = this.onSearchPriceList.bind(this);
        this.onSelectBranch = this.onSelectBranch.bind(this);
        this.onSelectPriceList = this.onSelectPriceList.bind(this);
        this.addNewPrice = this.addNewPrice.bind(this);
        this.editPrice = this.editPrice.bind(this);
        this.removePrice = this.removePrice.bind(this);
        this.displayIconStatus = this.displayIconStatus.bind(this);

        this.addNewPayTemp = this.addNewPayTemp.bind(this);
        this.removePayTemp = this.removePayTemp.bind(this);
        this.onInputChangePrice = this.onInputChangePrice.bind(this);
        this.makeClickable = this.makeClickable.bind(this);
        this.onInputChangePayTemp = this.onInputChangePayTemp.bind(this);

        this.state = {
            searchTerm: { bukrs: '', branchList: [], selectedCategory: 3 },
            branchOptions: [],
            selectedBranchKey: null,
            branchList: [],
            priceList: [],
            selectedPriceListIndex: null,
            editPriceListIndex: null,
            matnrOptions: [],
            waers: '',
            countryId: null,
            loading: false,
        };
    }

    // contextRef = createRef();

    clearSelected() {
        this.setState({
            ...this.state,
            selectedBranchKey: null,
            selectedPriceListIndex: null,
            editPriceListIndex: null,
            branchList: [],
            priceList: [],
            matnrOptions: [],
            waers: '',
            countryId: null,
        });
    }

    componentDidMount() {
        this.props.f4FetchBankPartnerOptions();
    }
    fetchUserBranches(bukrs) {
        this.setState({ loading: true });
        doGet(`core/reference/branches/${bukrs}`)
            .then(({ data }) => {
                const newBranchOptions = data
                    .filter(
                        item =>
                            item.tovarCategory === 1 ||
                            item.tovarCategory === 2,
                    )
                    .map(item =>
                        // console.log(item.tovarCategory);
                        // console.log(item);
                        ({
                            key: item.branch_id,
                            text: item.text45,
                            value: item.branch_id,
                            tovarCategory: item.tovarCategory,
                        }),
                    );
                const newBranchOptions2 = newBranchOptions
                    .filter(
                        item =>
                            item.tovarCategory ===
                                this.state.searchTerm.selectedCategory ||
                            this.state.searchTerm.selectedCategory === 3,
                    )
                    .map(item2 => ({
                        key: item2.key,
                        text: item2.text,
                        value: item2.value,
                        tovarCategory: item2.tovarCategory,
                    }));
                // console.log(newBranchOptions);
                this.setState({
                    ...this.state,
                    branchOptions: newBranchOptions,
                    branchList: newBranchOptions2,
                    loading: false,
                });
            })
            .catch(err => console.log(err));
    }
    onInputChange(value, stateFieldName) {
        const waSearchTerm = Object.assign({}, this.state.searchTerm);
        if (stateFieldName === 'bukrs') {
            waSearchTerm.bukrs = value;
            this.clearSelected();
            this.fetchUserBranches(value);
            this.setState({ searchTerm: waSearchTerm });
        } else if (stateFieldName === 'category') {
            this.clearSelected();
            waSearchTerm.selectedCategory = value;
            const newBranchOptions = this.state.branchOptions
                .filter(item => item.tovarCategory === value || value === 3)
                .map(item2 => ({
                    key: item2.key,
                    text: item2.text,
                    value: item2.value,
                    tovarCategory: item2.tovarCategory,
                }));
            this.setState({
                searchTerm: waSearchTerm,
                branchList: newBranchOptions,
            });
        }

        // console.log(this.state);
    }

    onInputChangePrice(value, fieldName, index, obj) {
        if (obj.dataStatus === 'del') return;
        const priceList = this.state.priceList.slice();
        if (fieldName === 'premDiv') {
            obj.premDiv = value;
        } else if (fieldName === 'tradeIn') {
            obj.tradeIn = value;
        } else if (fieldName === 'bankPartnerId') {
            obj.bankPartnerId = value;
        } else if (fieldName === 'toDate') {
            obj.toDate = value;
        } else if (fieldName === 'matnr') {
            obj.matnr = value;
            this.state.matnrOptions
                .filter(item => item.value === value)
                .map(item => {
                    obj.matnrName = item.text;
                });
        } else return;
        priceList[index] = obj;
        if (priceList[index].dataStatus !== 'new') {
            priceList[index].dataStatus = 'mod';
        }

        this.setState({ priceList });
    }
    onInputChangePayTemp(value, fieldName, ptIndex, plIndex, obj) {
        if (obj.dataStatus === 'del') return;
        const priceList = this.state.priceList.slice();
        const price = priceList[plIndex];
        const ptList = price.ptList;
        if (price.dataStatus === 'del') return;
        // alert(typeof value) // displays "number"
        price.month = 0;
        price.price = 0;
        price.remain = 0;
        price.firstPayment = 0;

        // console.log(typeof value)
        if (fieldName === 'monthlyPaymentSum') {
            value = parseFloat(value);
            if (value > 99999999) return;
            obj.monthlyPaymentSum = value;
            ptList[ptIndex] = obj;
        } else if (fieldName === 'monthNum') {
            obj.monthNum = value;
            ptList[ptIndex] = obj;
        } else return;

        for (let i = 0; i < ptList.length; i++) {
            price.price += ptList[i].monthlyPaymentSum * ptList[i].monthNum;
            if (i === 0) {
                price.firstPayment = ptList[i].monthlyPaymentSum;
            } else {
                price.month += ptList[i].monthNum;
            }
        }
        price.remain = price.price - price.firstPayment;

        if (price.dataStatus !== 'new') {
            price.dataStatus = 'mod';
        }

        this.setState({ priceList });
        // ''
    }

    onSearchPriceList(branchId) {
        this.setState({ loading: true });
        doGet(`core/marketing/prcltgs/search`, {
            bukrs: this.state.searchTerm.bukrs,
            branchId,
        })
            .then(response => {
                this.setState({
                    ...this.state,
                    priceList: response.data.priceList,
                    matnrOptions: response.data.matnrOptions,
                    waers: response.data.waers,
                    countryId: response.data.countryId,
                    loading: false,
                });
            })
            .catch(error => {
                if (error.response.status === 403) {
                    // blog post has been created, navigate the user to the index
                    // We navigate by calling this.context.router.push with the new path to navigate to
                    this.context.router.push('/forbidden');
                } else {
                    this.props.notify(
                        'error',
                        error.response.data.message,
                        'Ошибка',
                    );
                }
            });
    }

    onSaveClick() {
        doPost(`core/marketing/prcltgs/save`, {
            priceList: this.state.priceList,
            countryId: this.state.countryId,
        })
            .then(response => {
                this.props.notify('success', 'Сохранен.', 'Успешно');
                const branchId = this.state.selectedBranchKey;
                this.onSelectBranch(branchId);
            })
            .catch(error => {
                if (error.response.status === 403) {
                    this.context.router.push('/forbidden');
                } else {
                    this.props.notify(
                        'error',
                        error.response.data.message,
                        'Ошибка',
                    );
                }
            });
    }

    onSelectBranch(key) {
        this.setState({
            selectedBranchKey: key,
            selectedPriceListIndex: null,
            editPriceListIndex: null,
            matnrOptions: [],
            waers: '',
            countryId: null,
        });
        this.onSearchPriceList(key);
    }

    onSelectPriceList(key, index) {
        this.setState({ selectedPriceListIndex: index });
    }
    editPrice(index) {
        const priceList = this.state.priceList.slice();
        if (priceList[index].dataStatus === 'del') return;
        this.setState({ editPriceListIndex: index });
    }
    removePayTemp(index, payTempRow) {
        // console.log(payTempRow,"del");
        // payTempRow.dataStatus="del";

        if (this.state.selectedPriceListIndex === null) return;
        if (
            this.state.priceList[this.state.selectedPriceListIndex]
                .dataStatus === 'del'
        )
            return;
        if (index === 0) return;
        const priceList = this.state.priceList;
        const price = priceList[this.state.selectedPriceListIndex];
        const ptList = price.ptList.slice();

        const newPtList = [];
        for (let i = 0; i < ptList.length; i++) {
            if (i !== index) {
                newPtList.push(ptList[i]);
            }
        }

        price.month = 0;
        price.price = 0;
        price.remain = 0;

        for (let i2 = 0; i2 < newPtList.length; i2++) {
            newPtList.ptOrder = i2;

            price.price +=
                newPtList[i2].monthlyPaymentSum * newPtList[i2].monthNum;
            if (i2 === 0) {
                price.firstPayment = newPtList[i2].monthlyPaymentSum;
                newPtList[i2].info = 'first_payment';
            } else {
                price.month += newPtList[i2].monthNum;
                newPtList[i2].info = 'monthly_payment';
            }
        }

        price.remain = price.price - price.firstPayment;
        price.ptList = newPtList;
        this.setState({ priceList });
    }
    addNewPayTemp() {
        if (this.state.selectedPriceListIndex === null) return;
        if (
            this.state.priceList[this.state.selectedPriceListIndex]
                .dataStatus === 'del'
        )
            return;
        const priceList = this.state.priceList;
        const price = priceList[this.state.selectedPriceListIndex];
        const ptList = price.ptList;
        const arraySize = ptList.length;
        const nextPtOrder = ptList[arraySize - 1].ptOrder + 1;
        const ptRow = {
            info: '',
            monthNum: 1,
            monthlyPaymentSum: 0,
            priceListId: null,
            ptId: null,
            ptOrder: nextPtOrder,
        };
        ptList.push(ptRow);

        price.month += ptRow.monthNum;
        price.price += ptRow.monthlyPaymentSum * ptRow.monthNum;
        price.remain += ptRow.monthlyPaymentSum * ptRow.monthNum;

        if (price.dataStatus !== 'new') {
            price.dataStatus = 'mod';
        }

        this.setState({
            priceList,
            editPriceListIndex: this.state.selectedPriceListIndex,
        });
    }

    removePrice(index, obj) {
        const priceList = this.state.priceList.slice();
        priceList[index].dataStatus = 'del';
        priceList[index].ptList.map(item => {
            item.dataStatus = 'del';
        });

        this.setState({ priceList });

        // console.log(this.state)
    }
    addNewPrice() {
        if (this.state.selectedBranchKey === null) return;

        const obj = {
            branchId: this.state.selectedBranchKey,
            bukrs: this.state.searchTerm.bukrs,
            countryId: null,
            createdBy: null,
            dataStatus: 'new',
            firstPayment: 0,
            fromDate: '',
            matnr: null,
            matnrName: '',
            month: 0,
            premDiv: 1,
            price: 0,
            priceListId: null,
            ptList: [
                {
                    info: '',
                    monthNum: 1,
                    monthlyPaymentSum: 0,
                    priceListId: null,
                    ptId: null,
                    ptOrder: 0,
                },
            ],
            remain: 0,
            waers: this.state.waers,
        };

        const newArray = this.state.priceList.slice();
        newArray.push(obj);

        this.setState({
            priceList: newArray,
            editPriceListIndex: newArray.length - 1,
            selectedPriceListIndex: newArray.length - 1,
        });
    }

    displayIconStatus(dataStatus) {
        if (dataStatus === 'new')
            return <Icon name="checkmark" size="large" color="green" />;
        if (dataStatus === 'del')
            return <Icon name="minus circle" size="large" color="red" />;
        if (dataStatus === 'mod')
            return <Icon name="options" size="large" color="orange" />;
    }
    makeClickable(idx) {
        if (this.state.selectedPriceListIndex !== idx) {
            return 'clickable';
        }

        return 'notClickable';
    }

    renderTableBranchList() {
        return this.state.branchList.map((wa, idx) => (
            // console.log(wa);==this.state.selectedBranchKey
            <Table.Row
                active={wa.key === this.state.selectedBranchKey}
                key={wa.key}
                onClick={() => this.onSelectBranch(wa.key)}
            >
                <Table.Cell>{wa.text}</Table.Cell>
            </Table.Row>
        ));
    }

    renderTablePriceListHeaders() {
        // console.log(this.state.priceList,'this.state.priceList')
        return this.state.priceList.map((wa, idx) => (
            // console.log(wa);
            <Table.Row
                active={idx === this.state.selectedPriceListIndex}
                key={idx}
                onClick={() => this.onSelectPriceList(wa.priceListId, idx)}
            >
                <Table.Cell className="clickable">
                    {this.displayIconStatus(wa.dataStatus)}
                </Table.Cell>

                <Table.Cell className={this.makeClickable(idx)}>
                    {idx !== this.state.editPriceListIndex && wa.matnrName}

                    {idx === this.state.editPriceListIndex && (
                        <Dropdown
                            selection
                            options={this.state.matnrOptions}
                            value={wa.matnr}
                            text={wa.matnrName}
                            onChange={(e, { value }) =>
                                this.onInputChangePrice(value, 'matnr', idx, wa)
                            }
                        />
                    )}
                </Table.Cell>
                <Table.Cell className="clickable">
                    {new Intl.NumberFormat('ru-RU').format(wa.price)} {wa.waers}
                </Table.Cell>
                <Table.Cell className="clickable">
                    {new Intl.NumberFormat('ru-RU').format(wa.firstPayment)}
                </Table.Cell>
                <Table.Cell className="clickable">
                    {new Intl.NumberFormat('ru-RU').format(wa.remain)}
                </Table.Cell>
                <Table.Cell className="clickable">{wa.month}</Table.Cell>

                <Table.Cell className="clickable">
                    {idx !== this.state.editPriceListIndex && wa.premDiv}
                    {idx === this.state.editPriceListIndex && (
                        <Dropdown
                            compact
                            selection
                            options={premOptions}
                            value={wa.premDiv}
                            onChange={(e, { value }) =>
                                this.onInputChangePrice(
                                    value,
                                    'premDiv',
                                    idx,
                                    wa,
                                )
                            }
                        />
                    )}
                </Table.Cell>
                <Table.Cell className="clickable">
                    {idx !== this.state.editPriceListIndex &&
                        getTradeIn(wa.tradeIn)}
                    {idx === this.state.editPriceListIndex && (
                        <Dropdown
                            compact
                            selection
                            options={tradeInOptions}
                            value={wa.tradeIn}
                            onChange={(e, { value }) =>
                                this.onInputChangePrice(
                                    value,
                                    'tradeIn',
                                    idx,
                                    wa,
                                )
                            }
                        />
                    )}
                </Table.Cell>
                <Table.Cell className="clickable">
                    {idx !== this.state.editPriceListIndex &&
                        wa.bankPartnerId > 0 && (
                            <div>
                                {
                                    this.props.bankPartnerOptions[
                                        this.props.bankPartnerOptions.findIndex(
                                            element =>
                                                element.value ===
                                                wa.bankPartnerId,
                                        )
                                    ].text
                                }
                            </div>
                        )}
                    {idx === this.state.editPriceListIndex && (
                        <Dropdown
                            compact
                            selection
                            options={this.props.bankPartnerOptions}
                            value={wa.bankPartnerId}
                            onChange={(e, { value }) =>
                                this.onInputChangePrice(
                                    value,
                                    'bankPartnerId',
                                    idx,
                                    wa,
                                )
                            }
                        />
                    )}
                </Table.Cell>
                <Table.Cell className="clickable">
                    {idx !== this.state.editPriceListIndex && wa.toDate}
                    {idx === this.state.editPriceListIndex && (
                        <DatePicker
                            className="date-100-width"
                            autoComplete="off"
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select" // timezone="UTC"
                            selected={stringToMoment(wa.toDate, 'DD.MM.YYYY')}
                            locale={this.props.language}
                            onChange={event =>
                                this.onInputChangePrice(
                                    momentToString(event, 'DD.MM.YYYY'),
                                    'toDate',
                                    idx,
                                    wa,
                                )
                            }
                            dateFormat="DD.MM.YYYY"
                        />
                    )}
                </Table.Cell>
                <Table.Cell className="clickable">{wa.userName}</Table.Cell>
                <Table.Cell>
                    {' '}
                    <Icon
                        name="edit"
                        size="large"
                        className="clickableIcon"
                        onClick={event => this.editPrice(idx)}
                    />
                    <Icon
                        name="remove"
                        size="large"
                        className="clickableIcon"
                        color="red"
                        onClick={event => this.removePrice(idx, wa)}
                    />
                </Table.Cell>
            </Table.Row>
        ));
    }
    renderTablePriceListRows() {
        let month = '';
        if (this.state.selectedPriceListIndex === null) return;
        if (this.state.priceList === null) return;
        if (
            this.state.priceList[this.state.selectedPriceListIndex].ptList ===
            null
        )
            return;
        return this.state.priceList[
            this.state.selectedPriceListIndex
        ].ptList.map((wa_pt, idx) => {
            if (wa_pt.ptOrder === 0) {
                month = 'Перв. взнос';
            } else {
                month = wa_pt.monthNum;
            }
            return (
                <Table.Row key={idx}>
                    <Table.Cell>
                        {(wa_pt.ptOrder === 0 ||
                            this.state.selectedPriceListIndex !==
                                this.state.editPriceListIndex) &&
                            month}
                        {wa_pt.ptOrder !== 0 &&
                            this.state.selectedPriceListIndex ===
                                this.state.editPriceListIndex && (
                                <Dropdown
                                    compact
                                    selection
                                    options={monthNumOptions}
                                    value={wa_pt.monthNum}
                                    onChange={(e, { value }) =>
                                        this.onInputChangePayTemp(
                                            value,
                                            'monthNum',
                                            idx,
                                            this.state.editPriceListIndex,
                                            wa_pt,
                                        )
                                    }
                                />
                            )}
                    </Table.Cell>
                    <Table.Cell>
                        {this.state.selectedPriceListIndex !==
                            this.state.editPriceListIndex &&
                            wa_pt.monthlyPaymentSum}
                        {this.state.selectedPriceListIndex ===
                            this.state.editPriceListIndex && (
                            <Input
                                value={wa_pt.monthlyPaymentSum}
                                onChange={(e, { value }) =>
                                    this.onInputChangePayTemp(
                                        value,
                                        'monthlyPaymentSum',
                                        idx,
                                        this.state.editPriceListIndex,
                                        wa_pt,
                                    )
                                }
                                className="moneyInput"
                            />
                        )}
                    </Table.Cell>
                    <Table.Cell>
                        {idx !== 0 && (
                            <Icon
                                name="remove"
                                size="large"
                                className="clickableIcon"
                                color="red"
                                onClick={event =>
                                    this.removePayTemp(idx, wa_pt)
                                }
                            />
                        )}
                    </Table.Cell>
                </Table.Row>
            );
        });
    }

    render() {
        const { companyOptions = [] } = this.props;
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
                    Цены продажи аппаратов
                    <Loader active={this.state.loading} />
                </Header>
                <Grid textAlign="justified">
                    <Grid.Row columns={1}>
                        <Grid.Column mobile={16} tablet={16} computer={16}>
                            <Button
                                icon
                                labelPosition="left"
                                primary
                                size="small"
                                disabled={this.state.selectedBranchKey === null}
                                onClick={() => this.onSaveClick()}
                            >
                                <Icon name="save" size="large" />
                                Сохранить
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <Grid textAlign="justified">
                    <Grid.Row columns={3}>
                        <Grid.Column mobile={16} tablet={16} computer={2}>
                            <Dropdown
                                placeholder="Компания"
                                fluid
                                selection
                                options={companyOptions}
                                value={this.state.searchTerm.bukrs}
                                onChange={(e, { value }) =>
                                    this.onInputChange(value, 'bukrs')
                                }
                            />
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={16} computer={3}>
                            <Dropdown
                                fluid
                                selection
                                options={categoryOptions}
                                value={this.state.searchTerm.selectedCategory}
                                onChange={(e, { value }) =>
                                    this.onInputChange(value, 'category')
                                }
                            />
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={16} computer={1}>
                            {this.state.waers !== '' && (
                                <Label as="a" color="blue">
                                    {this.state.waers}
                                </Label>
                            )}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={3}>
                        <Grid.Column mobile={16} tablet={16} computer={2}>
                            <Sticky>
                                <Table
                                    compact
                                    striped
                                    selectable
                                    celled
                                    id="branchList"
                                >
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>
                                                Филиал
                                            </Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {this.renderTableBranchList()}
                                    </Table.Body>
                                </Table>
                            </Sticky>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={16} computer={11}>
                            <Table
                                compact
                                striped
                                celled
                                selectable
                                id="priceListHeaders"
                            >
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell />
                                        <Table.HeaderCell>
                                            Товар
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Цена
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Перв. взнос
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Остаток
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Срок (месяц)
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Премия
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Trade-In
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Банк партнер
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>До</Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Создал
                                        </Table.HeaderCell>
                                        <Table.HeaderCell />
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {this.renderTablePriceListHeaders()}
                                </Table.Body>
                                <Table.Footer>
                                    <Table.Row>
                                        <Table.HeaderCell />
                                        <Table.HeaderCell />
                                        <Table.HeaderCell />
                                        <Table.HeaderCell />
                                        <Table.HeaderCell />
                                        <Table.HeaderCell />
                                        <Table.HeaderCell />
                                        <Table.HeaderCell />
                                        <Table.HeaderCell />
                                        <Table.HeaderCell />
                                        <Table.HeaderCell />
                                        <Table.HeaderCell>
                                            <Icon
                                                name="add"
                                                size="large"
                                                className="clickableIcon"
                                                color="green"
                                                onClick={event =>
                                                    this.addNewPrice()
                                                }
                                            />
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Footer>
                            </Table>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={16} computer={3}>
                            <Sticky offset={100} bottomOffset={50}>
                                <Table
                                    compact
                                    striped
                                    celled
                                    id="priceListRows"
                                >
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>
                                                Кол. мес
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                Сумма
                                            </Table.HeaderCell>
                                            <Table.HeaderCell />
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {this.renderTablePriceListRows()}
                                    </Table.Body>
                                    <Table.Footer>
                                        <Table.Row>
                                            <Table.HeaderCell />
                                            <Table.HeaderCell />
                                            <Table.HeaderCell>
                                                <Icon
                                                    name="add"
                                                    size="large"
                                                    className="clickableIcon"
                                                    color="green"
                                                    onClick={event =>
                                                        this.addNewPayTemp()
                                                    }
                                                />
                                            </Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Footer>
                                </Table>
                            </Sticky>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
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
                <br />
                <br />
                <br />
                <br />
            </Container>
        );
    }
}

function mapStateToProps(state) {
    // console.log(state.f4.bankPartnerOptions, 'state.f4.bankPartnerOptions');
    return {
        language: state.locales.lang,
        companyOptions: state.userInfo.companyOptions,
        bankPartnerOptions: state.f4.bankPartnerOptions,
    };
}

export default connect(mapStateToProps, { notify, f4FetchBankPartnerOptions })(
    Prcltgs,
);

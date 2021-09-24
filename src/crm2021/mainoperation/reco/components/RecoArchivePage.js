import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Header,
    Container,
    Icon,
    Segment,
    Table,
    Form,
    Loader,
    Button,
} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
// import BukrsF4 from '../../../../reference/f4/bukrs/BukrsF4';
// import BranchF4 from '../../../../reference/f4/branch/BranchF4';
import LazyPagination from '../../../../general/pagination/LazyPagination';
import RecoStatusLabel from './RecoStatusLabel';
import { fetchRecoArchive, fetchRecoStatuses } from '../actions/recoAction';
import { fetchGroupDealers } from '../../demo/actions/demoAction';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { modifyLoader } from '../../../../general/loader/loader_action';
import MaskedInput from 'react-text-mask';
import { Select } from 'semantic-ui-react';
import { f4FetchCountryList } from '../../../../reference/f4/f4_action';
import phoneMask from '../../../../utils/phoneMask';
import { Input } from 'semantic-ui-react';

class RecoArchivePage extends Component {
    constructor(props) {
        super(props);
        this.loadedSuccess = true;
        this.state = {
            queryParams: {
                bukrs: '',
                branchIds: [],
            },
            loaderOn: true,
            errors: {
                phoneNumber: false,
            },
        };

        this.renderTable = this.renderTable.bind(this);
        this.renderTableHeader = this.renderTableHeader.bind(this);
        this.renderTableBody = this.renderTableBody.bind(this);
        this.loadItems = this.loadItems.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
    }

    componentWillMount() {
        this.props.fetchRecoStatuses();
        this.props.fetchGroupDealers();
        this.props.f4FetchCountryList();
        this.loadItems(0);
    }

    componentDidUpdate(prevProps) {
        if (this.props.items !== prevProps.items) {
            this.setState({
                ...this.state,
                loaderOn: false,
            });
        }
    }

    loadItems(page) {
        const { queryParams } = this.state;
        const params = {};

        if (this.validation(queryParams)) {
            for (const k in queryParams) {
                if (k === 'branchIds' || k === 'statuses') {
                    if (
                        typeof queryParams[k] !== 'undefined' &&
                        queryParams[k].length > 0
                    ) {
                        params[k] = queryParams[k].join();
                    }
                } else {
                    params[k] = queryParams[k];
                }
            }

            params.page = page;

            this.props.fetchRecoArchive(params);
        }
    }

    isNullOrEmpty(param) {
        return param === null || param === undefined || param === '';
    }

    validation(queryParams) {
        const { phoneNumber } = queryParams;
        let errors = {};

        if (!this.isNullOrEmpty(phoneNumber) && phoneNumber.length < 7) {
            errors = {
                ...errors,
                phoneNumber: true,
            };
        }

        this.setState({
            ...this.state,
            errors: errors,
        });
        return Object.values(errors).length === 0;
    }

    renderTableHeader(messages) {
        return (
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>№</Table.HeaderCell>
                    <Table.HeaderCell>
                        {messages['Table.ClientFullName']}
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        {messages['Table.PhoneNumber']}
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        {messages['Table.ResponsibleStaff']}
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        {messages['Table.Category']}
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        {messages['Table.Status']}
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        {messages['Table.Date']}
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        {messages['Table.Actions']}
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
        );
    }

    renderTableRow(item, messages) {
        return (
            <Table.Row key={item.id}>
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell>{item.clientName}</Table.Cell>
                <Table.Cell>{item.phones ? item.phones : null}</Table.Cell>
                <Table.Cell>{item.responsibleName}</Table.Cell>
                <Table.Cell>{item.categoryName}</Table.Cell>
                <Table.Cell>
                    <RecoStatusLabel
                        statusId={item.statusId}
                        statusName={item.statusName}
                    />
                </Table.Cell>
                <Table.Cell>{item.docDate}</Table.Cell>
                <Table.Cell>
                    <Link
                        target="_blank"
                        className="ui icon button mini"
                        to={`/crm2021/reco/view/${item.id}`}
                    >
                        {messages['Table.View']}
                    </Link>
                </Table.Cell>
            </Table.Row>
        );
    }

    handleDropdownChange(e, o) {
        const { name, value } = o;
        const queryParams = Object.assign({}, this.state.queryParams);
        switch (name) {
            case 'bukrs':
                queryParams[name] = value;
                queryParams.branchIds = [];
                break;

            case 'branch':
                queryParams.branchIds = value;
                break;

            default:
                queryParams[name] = value;
                break;
        }

        this.setState({
            ...this.state,
            queryParams,
        });
    }

    handleChange(e, data) {
        const { name, value } = data;
        const { queryParams } = this.state;
        queryParams[name] = value;

        this.setState({
            ...this.state,
            queryParams,
        });
    }

    handleChangeDate(field, m) {
        const queryParams = Object.assign({}, this.state.queryParams);
        if (m) {
            queryParams[field] = m.format('YYYY-MM-DD');
        } else {
            queryParams[field] = null;
        }

        this.setState({ ...this.state, queryParams });
    }

    renderTableBody(messages) {
        if (!this.props.items || this.props.items.length === 0) {
            return (
                <Table.Body>
                    <Table.Row>
                        <Table.Cell colSpan={8}>Нет данных</Table.Cell>
                    </Table.Row>
                </Table.Body>
            );
        }
        return (
            <Table.Body>
                {this.props.items.map(item =>
                    this.renderTableRow(item, messages),
                )}
            </Table.Body>
        );
    }

    getDealersSelect(dealers, messages) {
        console.log('archive state: ', this.state.queryParams);
        return (
            <Form.Select
                name="responsibleId"
                multiple={false}
                // value={this.state.queryParams || []}
                search
                label={messages['Form.Dealer']}
                options={dealers || []}
                placeholder={messages['Form.Dealer']}
                onChange={this.handleDropdownChange}
            />
        );
    }

    renderSearchPanel(messages) {
        const { queryParams } = this.state;
        const { companyOptions, branchOptions } = this.props;

        const countryCodeOptions = this.props.countryList.map(item => {
            return {
                key: item.countryId,
                text: item.code,
                value: item.code,
            };
        });

        return (
            <Form>
                <Form.Group widths="equal">
                    <Form.Select
                        name="bukrs"
                        label="Компания"
                        options={companyOptions}
                        placeholder="Компания"
                        onChange={this.handleDropdownChange}
                    />
                    <Form.Select
                        name="branch"
                        multiple
                        search
                        selected
                        label="Филиал"
                        options={branchOptions[queryParams['bukrs']] || []}
                        placeholder="Филиал"
                        onChange={this.handleDropdownChange}
                    />
                    <Form.Select
                        name="statuses"
                        multiple
                        search
                        label={messages['Form.Status']}
                        options={this.props.statuses || []}
                        placeholder={messages['Form.Status']}
                        onChange={this.handleDropdownChange}
                    />
                    {this.props.dealers
                        ? this.getDealersSelect(this.props.dealers, messages)
                        : ''}
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>{messages['Form.DateFrom']}</label>
                        <DatePicker
                            autoComplete="off"
                            label=""
                            placeholderText={messages['Form.DateFrom']}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            dateFormat="DD.MM.YYYY"
                            selected={
                                this.state.queryParams.docDateFrom
                                    ? moment(this.state.queryParams.docDateFrom)
                                    : null
                            }
                            onChange={v =>
                                this.handleChangeDate('docDateFrom', v)
                            }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>{messages['Form.DateTo']}</label>
                        <DatePicker
                            autoComplete="off"
                            label=""
                            placeholderText={messages['Form.DateTo']}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            dateFormat="DD.MM.YYYY"
                            selected={
                                this.state.queryParams.docDateTo
                                    ? moment(this.state.queryParams.docDateTo)
                                    : null
                            }
                            onChange={v =>
                                this.handleChangeDate('docDateTo', v)
                            }
                        />
                    </Form.Field>
                    <Form.Input
                        name="clientName"
                        onChange={this.handleChange}
                        fluid
                        label={messages['Form.ClientFullName']}
                        placeholder={messages['Form.ClientFullName']}
                    />
                    {/* <Form.Field>
                        <label>Телефон</label>
                        <Form.Group>
                            <Select
                                compact
                                selection
                                name="countryCode"
                                options={countryCodeOptions}
                                onChange={(e, { value }) => {
                                    this.setState({ countryCode: value });
                                }}
                            />
                            <MaskedInput
                                fluid
                                mask={phoneMask(this.state.countryCode)}
                                value={
                                  this.state.phoneNumber ? this.state.phoneNumber : ''
                                }
                                onChange={event => {
                                    console.log(event.target.value)
                                    this.setState({
                                        phoneNumber: event.target.value,
                                    });
                                }}
                                label={messages['Form.Reco.PhoneNumber']}
                                placeholder={messages['Form.Reco.PhoneNumber']}
                            />
                        </Form.Group>
                    </Form.Field> */}
                    <Form.Input
                        name="phoneNumber"
                        onChange={this.handleChange}
                        fluid
                        label={messages['Form.Reco.PhoneNumber']}
                        placeholder={messages['Form.Reco.PhoneNumber']}
                        error={this.state.errors.phoneNumber}
                    />
                    <Form.Field>
                        <label>&nbsp;</label>
                        <Button onClick={() => this.loadItems(0)}>
                            {messages['Form.Search']}
                        </Button>
                    </Form.Field>
                </Form.Group>
            </Form>
        );
    }

    renderTableFooter(messages) {
        return (
            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan="2">
                        {messages.overallSum}: {this.props.meta.totalElements}
                    </Table.HeaderCell>
                    <Table.HeaderCell colSpan="6">
                        <LazyPagination
                            onItemClick={this.loadItems}
                            totalRows={this.props.meta.totalElements}
                            currentPage={this.props.meta.number}
                            perPage={this.props.meta.size}
                        />
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        );
    }

    renderLoader() {
        return (
            <Table.Body>
                <Table.Row>
                    <Table.Cell colSpan="8">
                        <Loader size="large" active inline="centered" />
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        );
    }

    renderTable(messages) {
        return (
            <Table celled>
                {this.renderTableHeader(messages)}
                <Loader active={this.state.loaderOn} />
                {this.renderTableBody(messages)}
                {this.renderTableFooter(messages)}
            </Table>
        );
    }

    render() {
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
                <Segment clearing>
                    <Header as="h2" floated="left">
                        {messages['Crm.RecoArchiveTitle']}
                    </Header>
                    <Link
                        className="ui icon button primary right floated"
                        to="/crm2021/reco/create"
                    >
                        <Icon name="plus" />{' '}
                        {messages['Crm.Wspace.CreateFromArchive']}
                    </Link>
                </Segment>
                {this.renderSearchPanel(messages)}
                {this.renderTable(messages)}
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        items: state.crmReco2021.items,
        meta: state.crmReco2021.meta,
        statuses: state.crmReco2021.statuses,
        loader: state.loader,
        dealers: state.crmDemo2021.dealers,
        companyOptions: state.userInfo.companyOptions,
        branchOptions: state.userInfo.branchOptionsMarketing,
        activeLoader: state.loader.active,
        countryList: state.f4.countryList,
    };
}

export default connect(mapStateToProps, {
    fetchRecoArchive,
    fetchRecoStatuses,
    fetchGroupDealers,
    f4FetchCountryList,
    modifyLoader,
})(injectIntl(RecoArchivePage));

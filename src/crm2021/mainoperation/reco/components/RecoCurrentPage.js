import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {
    Tab,
    Header,
    Container,
    Icon,
    Segment,
    Dimmer,
    Loader,
} from 'semantic-ui-react';
import Phone from './Phone';
//import moment from 'moment';
import { connect } from 'react-redux';
import {
    fetchRecoCurrentData,
    fetchCallResults,
    fetchRecoStatuses,
    // saveReco,
} from '../actions/recoAction';
import { fetchReasons } from '../../demo/actions/demoAction';
import { getRecoCategoriesOptionsByLanguage } from '../../../crmUtil';
import { injectIntl } from 'react-intl';
import { fetchDemoPrices } from '../../../../reference/mainoperation/actions/referenceAction';
import { Button } from 'react-yandex-maps';
import { modifyLoader } from '../../../../general/loader/loader_action';
import moment from 'moment';

class RecoCurrentPage extends Component {
    constructor(props) {
        super(props);
        this.loadedSuccess = true;
        this.state = {
            // callResultOptions: [],
            // callRefuseOptions: [],
            // usedItems: [],
            // newItems: [],
            // doneItems: [],
            // movedItems: [],
            demoPriceOptions: [],
            loadingDoneTab: true,
            loadingNewTab: true,
            loadingUsedTab: true,
            loadingMovedTab: true,
        };

        this.renderTabAppointed = this.renderTabAppointed.bind(this);
        this.renderTabNew = this.renderTabNew.bind(this);
        this.renderTabPositivePhoned = this.renderTabPositivePhoned.bind(this);
        this.renderTabRecalled = this.renderTabRecalled.bind(this);
        this.loadItems = this.loadItems.bind(this);
        this.onCallSaved = this.onCallSaved.bind(this);
    }

    loadItems() {}

    componentWillMount() {
        this.props.fetchRecoCurrentData('DEMO_APPOINTED');
        this.props.fetchRecoCurrentData('NEW');
        this.props.fetchRecoCurrentData('POSITIVE_PHONED');
        this.props.fetchRecoCurrentData('RECALL');
        this.props.fetchReasons();
        this.props.fetchCallResults();
        this.props.fetchRecoStatuses();
    }

    componentDidMount() {
        this.props
            .fetchDemoPrices({ 'dto-type': 'options' })
            .then(({ data }) => {
                this.setState({
                    ...this.state,
                    demoPriceOptions: data,
                });
            });
    }

    componentDidUpdate(prevProps) {
        if (this.props.newItems !== prevProps.newItems) {
            this.setState({
                ...this.state,
                loadingNewTab: false,
            });
        }
        if (this.props.positivePhonedItems !== prevProps.positivePhonedItems) {
            this.setState({
                ...this.state,
                loadingDoneTab: false,
            });
        }
        if (this.props.appointedItems !== prevProps.appointedItems) {
            this.setState({
                ...this.state,
                loadingUsedTab: false,
            });
        }
        if (this.props.recalledItems !== prevProps.recalledItems) {
            this.setState({
                ...this.state,
                loadingMovedTab: false,
            });
        }
    }

    renderPhoneCall(e, d) {
        console.log(e);
        console.log(d);
    }

    onCallSaved() {
        this.loadItems();
    }

    renderPhoneNumbers(recoId, phones, clientName) {
        return (
            <div>
                {phones.map(p => (
                    <Phone
                        demoPriceOptions={this.state.demoPriceOptions}
                        callRefuseOptions={this.props.callResults}
                        callResultOptions={this.props.callResults}
                        key={p.id}
                        phoneNumber={p.phoneNumber}
                        phoneId={p.id}
                        context="RECO"
                        contextId={recoId}
                        onCallSaved={this.onCallSaved}
                        clientName={clientName}
                    />
                ))}
            </div>
        );
    }

    renderTable(items, loading) {
        const { messages, locale } = this.props.intl;
        let statusOptions = [];
        if (this.props.statuses) {
            statusOptions = this.props.statuses.map(o => (
                <option value={o.text} key={o.value}>
                    {o.text}
                </option>
            ));
        }

        const categoryOptions = getRecoCategoriesOptionsByLanguage(locale).map(
            o => (
                <option value={o.text} key={o.value}>
                    {o.text}
                </option>
            ),
        );

        items = items.map(item => ({
            ...item,
            callDate: item.callDate
                ? moment(item.callDate, 'DD.MM.YYYY hh:mm').format(
                      'YYYY-MM-DD hh:mm',
                  )
                : null,
        }));

        return (
            <div>
                <Loader active={loading} />
                <ReactTable
                    defaultFilterMethod={(filter, row) => {
                        const colName =
                            filter.id === 'phoneNumbers'
                                ? 'phonesAsStr'
                                : filter.id;

                        if (
                            filter.value &&
                            filter.value.length > 0 &&
                            row[colName] &&
                            row[colName]
                        ) {
                            return row[colName]
                                .toLowerCase()
                                .includes(filter.value.toLowerCase());
                        }
                    }}
                    data={items}
                    columns={[
                        {
                            Header: 'ФИО',
                            accessor: 'clientName',
                        },
                        {
                            Header: '',
                            accessor: 'phonesAsStr',
                            show: false,
                        },
                        {
                            Header: messages.L__RECOMMENDER,
                            accessor: 'recommenderName',
                        },
                        {
                            Header: messages['Crm.CallDateTime'],
                            id: 'callDateDiv',
                            accessor: 'callDate',
                        },
                        {
                            Header: messages['Form.PhoneNumber'],
                            id: 'phoneNumbers',
                            accessor: row =>
                                this.renderPhoneNumbers(
                                    row.id,
                                    row.phones,
                                    row.clientName,
                                ),
                        },
                        {
                            Header: messages.L__CREATE_DATE,
                            accessor: 'createdAt',
                        },
                        {
                            Header: messages['Table.ResponsibleStaff'],
                            accessor: 'responsibleName',
                        },
                        {
                            Header: messages['Table.Note'],
                            accessor: 'note',
                        },
                        {
                            Header: messages['Table.Category'],
                            accessor: 'categoryName',
                            filterMethod: (filter, row) => {
                                if (filter.value === '0') {
                                    return true;
                                }
                                return (
                                    row[filter.id].toLowerCase() ===
                                    filter.value.toLowerCase()
                                );
                            },
                            Filter: ({ filter, onChange }) => (
                                <select
                                    onChange={event =>
                                        onChange(event.target.value)
                                    }
                                    style={{ width: '100%' }}
                                    value={filter ? filter.value : 0}
                                >
                                    <option value={0}>{messages.all}</option>
                                    {categoryOptions}
                                </select>
                            ),
                        },
                        {
                            Header: messages['Form.Status'],
                            accessor: 'statusName',
                            filterMethod: (filter, row) => {
                                if (filter.value === '0') {
                                    return true;
                                }
                                return String(row[filter.id]) === filter.value;
                            },
                            Filter: ({ filter, onChange }) => (
                                <select
                                    onChange={event =>
                                        onChange(event.target.value)
                                    }
                                    style={{ width: '100%' }}
                                    value={filter ? filter.value : 0}
                                >
                                    <option value={0}>{messages.all}</option>
                                    {statusOptions}
                                </select>
                            ),
                        },
                        {
                            Header: '',
                            accessor: 'id',
                            filterable: false,
                            Cell: ({ value }) => (
                                <Link
                                    target="_blank"
                                    className="ui icon button mini"
                                    to={`/crm2021/reco/view/${value}`}
                                >
                                    {messages['Table.View']}
                                </Link>
                            ),
                        },
                    ]}
                    previousText={messages.previousText}
                    nextText={messages.nextText}
                    defaultPageSize={50}
                    filterable
                    className="-striped -highlight"
                />
            </div>
        );
    }

    renderDocDate(row) {
        if (row.callDate) {
            return row.callDate;
            // const now = moment();
            {
                const docDate = row.callDate;
            }
            {
                /*if (now.isAfter(docDate)) {*/
            }
            {
                /*return <Label color="red">{docDate.format('DD.MM.YYYY HH:mm')}</Label>;*/
            }
            {
                /*} else if (now.format('DD.MM.YYYY') === docDate.format('DD.MM.YYYY')) {*/
            }
            {
                /*return (*/
            }
            {
                /*<Label color="orange">{docDate.format('DD.MM.YYYY HH:mm')}</Label>*/
            }
            {
                /*);*/
            }
            {
                /*}*/
            }

            {
                /*return <Label color="teal">{docDate.format('DD.MM.YYYY HH:mm')}</Label>;*/
            }
        }
        return '';
    }

    renderTabPositivePhoned() {
        return this.renderTable(
            this.props.positivePhonedItems,
            this.state.loadingDoneTab,
        );
    }

    renderTabNew() {
        return this.renderTable(this.props.newItems, this.state.loadingNewTab);
    }

    renderTabAppointed() {
        return this.renderTable(
            this.props.appointedItems,
            this.state.loadingUsedTab,
        );
    }

    renderTabRecalled() {
        return this.renderTable(
            this.props.recalledItems,
            this.state.loadingMovedTab,
        );
    }

    render() {
        const { messages } = this.props.intl;
        const panes = [
            { menuItem: messages['Crm.New'], render: this.renderTabNew },
            {
                menuItem: messages['Crm.PositiveCalls'],
                render: this.renderTabPositivePhoned,
            },
            {
                menuItem: messages['Crm.DemoAppointed'],
                render: this.renderTabPositivePhoned,
            },
            {
                menuItem: messages['Crm.Recall'],
                render: this.renderTabRecalled,
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
                <Segment clearing>
                    <Header as="h2" floated="left">
                        {messages['Crm.CurrentRecommendations']}
                    </Header>
                    <Link
                        className="ui icon button primary right floated"
                        to="/crm2021/reco/create"
                    >
                        <Icon name="plus" />{' '}
                        {messages['Crm.Wspace.CreateFromArchive']}
                    </Link>
                </Segment>
                <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        newItems: state.crmReco2021.newItems,
        positivePhonedItems: state.crmReco2021.positivePhonedItems,
        appointedItems: state.crmReco2021.appointedItems,
        recalledItems: state.crmReco2021.recalledItems,
        reasons: state.crmReco2021.reasons,
        callResults: state.crmReco2021.callResults,
        statuses: state.crmReco2021.statuses,
        saveCrmResponse: state.crmReco2021.saveCrmResponse,
        activeLoader: state.loader.active,
    };
}

export default connect(mapStateToProps, {
    fetchRecoCurrentData,
    fetchReasons,
    fetchCallResults,
    fetchRecoStatuses,
    fetchDemoPrices,
    modifyLoader,
    // saveReco,
})(injectIntl(RecoCurrentPage));

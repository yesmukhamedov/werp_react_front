import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactTable, { useSortBy } from 'react-table';
import 'react-table/react-table.css';
import { Header, Container, Icon, Button, Segment } from 'semantic-ui-react';
import moment from 'moment';
import VisitCreateModal from './VisitCreateModal';
import {
    fetchArchive,
    modalToggle,
    setVisitForUpdate,
    blankForCreate,
} from '../actions/visitAction';
import { fetchGroupDealers } from '../../demo/actions/demoAction';
import { fetchPhoneMeta } from '../../reco/actions/recoAction';
import { connect } from 'react-redux';
import matchSorter from 'match-sorter';
import { injectIntl } from 'react-intl';
import { Loader } from 'semantic-ui-react';

class VisitArchivePage extends Component {
    constructor(props) {
        super(props);
        this.loadedSuccess = true;
        this.state = {
            callResultOptions: [],
            callRefuseOptions: [],
            showCreateModal: false,
            loadingOn: true,
        };

        this.renderTable = this.renderTable.bind(this);
        this.toUpdate = this.toUpdate.bind(this);
        this.toCreate = this.toCreate.bind(this);
    }

    componentWillMount() {
        this.props.fetchArchive();
        this.props.fetchGroupDealers();
        this.props.fetchPhoneMeta();
    }

    componentDidUpdate(prevProps) {
        if (this.props.visits !== prevProps.visits) {
            this.setState({
                ...this.state,
                loadingOn: false,
            });
        }
    }

    toUpdate(visit) {
        this.props.setVisitForUpdate(visit);
        this.props.modalToggle(true);
    }

    renderTable(messages) {
        let { dealers } = this.props;
        let trimmed = dealers.slice(1);
        return (
            <div>
                <Loader active={this.state.loadingOn} />
                <ReactTable
                    data={
                        this.props.visits
                            ? this.props.visits.map(item => {
                                  return {
                                      ...item,
                                      docDate: item.docDate
                                          .split('.')
                                          .reverse()
                                          .join('-'),
                                  };
                              })
                            : []
                    }
                    columns={[
                        {
                            Header: '№',
                            accessor: 'id',
                            maxWidth: 70,
                        },
                        {
                            Header: messages['Table.Client'],
                            accessor: 'clientName',
                            filterMethod: (filter, rows) =>
                                matchSorter(rows, filter.value, {
                                    keys: ['clientName'],
                                }),
                            filterAll: true,
                        },
                        {
                            Header: messages['Table.Address'],
                            accessor: 'address',
                            filterMethod: (filter, rows) =>
                                matchSorter(rows, filter.value, {
                                    keys: ['address'],
                                }),
                            filterAll: true,
                        },
                        {
                            Header: messages['Table.Date'],
                            accessor: 'docDate',
                            filterMethod: (filter, rows) =>
                                matchSorter(rows, filter.value, {
                                    keys: ['docDate'],
                                }),
                            filterAll: true,
                            Cell: row => {
                                return row.value
                                    .split('-')
                                    .reverse()
                                    .join('.');
                            },
                        },
                        {
                            Header: messages['Table.Visitor'],
                            accessor: 'visitorName',
                            minWidth: 150,
                            Cell: row => row.original.visitorName,
                            filterMethod: (filter, d) => {
                                // if (filter.value === 0) {
                                //   return true;
                                // }
                                if (filter.value == 'Все') {
                                    return true;
                                }
                                return filter.value == d[filter.id];
                            },
                            // sortMethod: (a, b) => a.visitorName.localeCompare(b.visitorName),
                            Filter: ({ filter, onChange }) => (
                                <select
                                    onChange={event =>
                                        onChange(event.target.value)
                                    }
                                    style={{ width: '100%' }}
                                >
                                    <option>{'Все'}</option>
                                    {trimmed.map(d => (
                                        <option key={d.key} value={d.key}>
                                            {d.text}
                                        </option>
                                    ))}
                                </select>
                            ),
                        },
                        {
                            Header: messages['Table.Note'],
                            accessor: 'note',
                            filterMethod: (filter, rows) =>
                                matchSorter(rows, filter.value, {
                                    keys: ['note'],
                                }),
                            filterAll: true,
                        },
                        {
                            Header: messages['Table.Actions'],
                            accessor: 'id',
                            Cell: row => (
                                <div>
                                    <Link
                                        className="ui icon button mini"
                                        to={`/crm2021/visit/view/${row.value}`}
                                    >
                                        <Icon name="eye" />
                                    </Link>
                                    {/* <Button icon size={'mini'} onClick={() => this.toUpdate(row.original)}> */}
                                    {/* <Icon name={'pencil'}/> */}
                                    {/* </Button> */}
                                </div>
                            ),
                            filterable: false,
                        },
                    ]}
                    filterable
                    className="-striped -highlight"
                />
            </div>
        );
    }

    toCreate() {
        this.props.blankForCreate(0, 0);
        this.props.modalToggle(true);
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
                        {messages['Crm.VisitArchiveTitle']}
                    </Header>
                    <Button
                        className="ui icon button primary right floated"
                        onClick={this.toCreate}
                    >
                        <Icon name="plus" /> {messages['Table.Add']}
                    </Button>
                </Segment>
                {this.renderTable(messages)}
                <VisitCreateModal fromComponent="archive" />
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        visits: state.crmVisit2021.visits,
        dealers: state.crmDemo2021.dealers,
    };
}

export default connect(mapStateToProps, {
    fetchArchive,
    modalToggle,
    setVisitForUpdate,
    blankForCreate,
    fetchGroupDealers,
    fetchPhoneMeta,
})(injectIntl(VisitArchivePage));

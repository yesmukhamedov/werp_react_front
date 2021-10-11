import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { connect } from 'react-redux';
import {
    Container,
    Header,
    Segment,
    Form,
    Divider,
    Table,
    Button,
    Icon,
} from 'semantic-ui-react';
import BranchF4 from '../../../../reference/f4/branch/BranchF4';
import YearF4 from '../../../../reference/f4/date/YearF4';
import MonthF4 from '../../../../reference/f4/date/MonthF4';
import PositionF4 from '../../../../reference/f4/position/PositionF4';
import {
    fetchItems,
    fetchIndicators,
    blankItem,
    toggleKpiSettingFormModal,
    setForUpdate,
    deleteItem,
} from '../actions/kpiSettingAction';
import KpiFormModal from './KpiFormModal';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Tab } from 'semantic-ui-react';
import { EXPERIENCE_OPTIONS } from '../../../../utils/constants';

const currentDate = new Date();

class KpiSettingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bukrs: null,
            branchId: null,
            positionId: null,
            year: null,
            month: currentDate.getMonth() + 1,
            experience: null,
            activeMonthFrom: null,
            activeMonthTo: null,
            activeYearFrom: null,
            activeYearTo: null,
        };

        this.loadItems = this.loadItems.bind(this);
        this.renderDataTable = this.renderDataTable.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.handlePeriod = this.handlePeriod(this);
    }

    componentWillMount() {
        this.loadItems();
        this.props.fetchIndicators();
    }

    loadItems() {
        this.setState({
            ...this.state,
            loading: true,
        });
        let {
            bukrs,
            branchId,
            positionId,
            year,
            month,
            experience,
        } = this.state;
        this.props.fetchItems({
            bukrs: bukrs,
            branchId: branchId,
            year: year,
            month: month,
            positionId: positionId,
            experience: experience,
        });
    }

    showFormModal = () => {
        this.props.blankItem();
        this.props.toggleKpiSettingFormModal(true);
    };

    setForUpdate = setting => {
        this.props.setForUpdate(setting);
        this.props.toggleKpiSettingFormModal(true);
    };

    renderIndicators(setting) {
        let { items } = setting;
        if (!items) {
            items = [];
        }
        let showUpdate = true;
        if (setting.year < currentDate.getFullYear()) {
            showUpdate = false;
        }

        if (
            setting.year === currentDate.getFullYear() &&
            setting.month < currentDate.getMonth() + 1
        ) {
            showUpdate = false;
        }

        let indicators = Object.assign({}, this.props.indicators);
        return (
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Индикатор</Table.HeaderCell>
                        <Table.HeaderCell>План</Table.HeaderCell>
                        <Table.HeaderCell>Балл</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {items.map(row => {
                        return (
                            <Table.Row key={row.id}>
                                <Table.Cell>
                                    {indicators[row.indicatorId]}
                                </Table.Cell>
                                <Table.Cell>{row.value}</Table.Cell>
                                <Table.Cell>{row.point}</Table.Cell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>

                <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell colSpan="2">
                            {showUpdate ? (
                                <Button
                                    onClick={() => this.setForUpdate(setting)}
                                    icon
                                    floated={'right'}
                                >
                                    <Icon name="pencil" />
                                </Button>
                            ) : (
                                ''
                            )}
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );
    }

    deleteSetting = id => {
        let {
            bukrs,
            branchId,
            month,
            year,
            positionId,
            experience,
        } = this.state;
        if (!window.confirm('Действительно хотите удалить?')) {
            return;
        }
        this.props.deleteItem(id, () => {
            this.props.fetchItems({
                bukrs: bukrs,
                branchId: branchId,
                year: year,
                month: month,
                positionId: positionId,
                experience: experience,
                startDate: moment(),
            });
        });
    };

    renderDataTable() {
        const { items } = this.props;
        return (
            <div>
                <ReactTable
                    data={items || []}
                    columns={[
                        {
                            Header: '№',
                            accessor: 'index',
                            indexed: true,
                            maxWidth: 150,
                        },
                        {
                            Header: 'Компания',
                            accessor: 'bukrsName',
                            maxWidth: 150,
                        },
                        {
                            Header: 'Филиал',
                            accessor: 'branchName',
                            maxWidth: 250,
                            Cell: props => {
                                return props.value == null ? (
                                    <p>Для всех филиалов</p>
                                ) : (
                                    <p>{props.value}</p>
                                );
                            },
                        },
                        {
                            Header: 'Должность',
                            accessor: 'positionName',
                            maxWidth: 120,
                        },
                        {
                            Header: 'Активен с',
                            accessor: 'year',
                            maxWidth: 120,
                        },
                        {
                            Header: 'Активен по',
                            accessor: 'year',
                            maxWidth: 120,
                        },
                        {
                            Header: 'Стаж',
                            accessor: 'experience',
                            maxWidth: 120,
                        },
                        {
                            Header: 'Индикаторы',
                            accessor: 'items',
                            Cell: row => this.renderIndicators(row.original),
                        },
                        {
                            Header: '',
                            accessor: 'id',
                            filterable: false,
                            maxWidth: 150,
                            Cell: ({ value }) => (
                                <div>
                                    <Button
                                        icon={'edit'}
                                        // onClick={() => this.deleteSetting(value)}
                                    />
                                    <Button
                                        icon={'trash'}
                                        onClick={() =>
                                            this.deleteSetting(value)
                                        }
                                    />
                                </div>
                            ),
                        },
                    ]}
                    indexKey="indexKey"
                    defaultPageSize={50}
                    className="-striped -highlight"
                />
            </div>
        );
    }

    submitSearch() {
        this.loadItems();
    }

    handleDropdownChange(e, result) {
        const { value, name } = result;
        let {
            bukrs,
            branchId,
            month,
            year,
            positionId,
            experience,
            startDate,
        } = this.state;
        if (name === 'bukrs') {
            bukrs = value;
        } else if (name === 'branch') {
            branchId = value;
        } else if (name === 'month') {
            month = value;
        } else if (name === 'year') {
            year = value;
        } else if (name === 'position') {
            positionId = value;
        } else if (name === 'experience') {
            experience = value;
        } else if (name === 'date') {
            startDate = value;
        }
        this.setState({
            ...this.state,
            bukrs: bukrs,
            branchId: branchId,
            year: year,
            month: month,
            positionId: positionId,
            experience: experience,
            startDate: startDate,
        });
    }

    handlePeriod(name, date) {
        let {
            activeMonthFrom,
            activeYearFrom,
            activeMonthTo,
            activeYearTo,
        } = this.state;

        switch (name) {
            case 'dateFrom':
                activeMonthFrom = date.format('MM');
                activeYearFrom = date.format('YYYY');
                break;
            case 'dateTo':
                activeMonthTo = date.format('MM');
                activeYearTo = date.format('YYYY');
                break;
            default: {
            }
        }

        this.setState({
            ...this.state,
            activeMonthFrom: activeMonthFrom,
            activeYearFrom: activeYearFrom,
            activeMonthTo: activeMonthTo,
            activeYearTo: activeYearTo,
        });
        console.log(
            'localItemSettingPage: ',
            activeMonthFrom,
            activeYearFrom,
            activeMonthTo,
            activeYearTo,
        );
    }

    renderSearchForm() {
        let { companyOptions } = this.props;
        return (
            <Form>
                <Form.Group widths="equal">
                    <Form.Field>
                        <Form.Group>
                            <Form.Select
                                name="bukrs"
                                label="Компания"
                                options={companyOptions}
                                placeholder="Компания"
                                onChange={this.handleDropdownChange}
                            />
                            <BranchF4
                                value={this.state.branchId}
                                search
                                handleChange={this.handleDropdownChange}
                                bukrs={this.state.bukrs}
                            />
                            <MonthF4
                                value={this.state.month}
                                handleChange={this.handleDropdownChange}
                            />
                            <PositionF4
                                value={this.state.positionId}
                                handleChange={this.handleDropdownChange}
                            />
                            <Form.Select
                                name="experience"
                                label="Стаж"
                                options={EXPERIENCE_OPTIONS}
                                placeholder="Стаж"
                                onChange={this.handleDropdownChange}
                            />
                        </Form.Group>
                        <label>
                            <h3>Срок действия</h3>
                        </label>
                        <Form.Group>
                            <Form.Field>
                                <label>Активен c</label>
                                <DatePicker
                                    selected={moment()}
                                    dateFormat="MM/yyyy"
                                    showMonthYearPicker
                                    showMonthDropdown
                                    showYearDropdown
                                    onSelect={date =>
                                        this.handlePeriod('dateFrom', date)
                                    }
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Активен по</label>
                                <DatePicker
                                    selected={moment()}
                                    dateFormat="MM/yyyy"
                                    showMonthYearPicker
                                    showMonthDropdown
                                    showYearDropdown
                                    onSelect={date =>
                                        this.handlePeriod('dateTo', date)
                                    }
                                />
                            </Form.Field>
                        </Form.Group>
                    </Form.Field>
                    <Form.Field>
                        <Button.Group
                            vertical
                            style={{ marginTop: '10%' }}
                            floated="right"
                        >
                            <Form.Button
                                style={{ marginTop: '5%' }}
                                onClick={this.loadItems}
                            >
                                Сформировать
                            </Form.Button>
                            <Form.Button
                                style={{ marginTop: '5%' }}
                                color="red"
                                onClick={this.loadItems}
                            >
                                Очистить
                            </Form.Button>
                        </Button.Group>
                    </Form.Field>
                </Form.Group>
            </Form>
        );
    }

    render() {
        let { bukrs, branchId, positionId, year, month } = this.state;

        const panes = [
            {
                menuItem: 'Активные настройки',
                render: () => (
                    <Tab.Pane attached={false}>
                        {this.renderDataTable()}
                    </Tab.Pane>
                ),
            },
            {
                menuItem: 'Неактивные настройки',
                render: () => (
                    <Tab.Pane attached={false}>
                        {this.renderDataTable()}
                    </Tab.Pane>
                ),
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
                <div>
                    <Header as="h2" attached="top">
                        Индикаторы KPI
                        <Button
                            primary
                            floated={'right'}
                            onClick={this.showFormModal}
                        >
                            <Icon name="plus" /> Добавить
                        </Button>
                    </Header>
                    {this.renderSearchForm()}
                    <Divider clearing />
                    <Segment attached>
                        <KpiFormModal
                            bukrs={bukrs}
                            branchId={branchId}
                            year={year}
                            month={month}
                            positionId={positionId}
                        />
                        <Tab menu={{ pointing: true }} panes={panes} />
                        {/* {this.renderDataTable()} */}
                    </Segment>
                </div>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        items: state.crmKpiSetting2021.items,
        branchOptionsMarketing: state.userInfo.branchOptionsMarketing,
        companyOptions: state.userInfo.companyOptions,
        indicators: state.crmKpiSetting2021.indicators,
    };
}

export default connect(mapStateToProps, {
    fetchItems,
    fetchIndicators,
    blankItem,
    toggleKpiSettingFormModal,
    setForUpdate,
    deleteItem,
})(KpiSettingPage);

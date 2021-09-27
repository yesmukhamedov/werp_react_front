import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Container,
    Divider,
    Table,
    Icon,
    Header,
    Button,
    Segment,
    Form,
    Grid,
    Loader,
    Input,
    List,
} from 'semantic-ui-react';
import BukrsF4 from '../../../../reference/f4/bukrs/BukrsF4';
import BranchF4 from '../../../../reference/f4/branch/BranchF4';
import PositionF4 from '../../../../reference/f4/position/PositionF4';
import LazyPagination from '../../../../general/pagination/LazyPagination';
import { doGet } from '../../../../utils/apiActions';

const PAGINATION_TOTAL_COUNT_KEY = 'X-Pagination-Total-Count';
const PAGINATION_CURRENT_PAGE_KEY = 'X-Pagination-Current-Page';
const PAGINATION_PER_PAGE_KEY = 'X-Pagination-Per-Page';

class StaffList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            queryParams: {
                bukrs: '',
                branchIds: [],
                iinBin: '',
                firstName: '',
                lastName: '',
                departmentId: 0,
                positionId: 0,
                page: 0,
            },
            loading: false,
            totalRows: 0,
            perPage: 0,
            page: 0,
        };

        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.loadItems = this.loadItems.bind(this);
        this.renderTableFooter = this.renderTableFooter.bind(this);
        this.inputChanged = this.inputChanged.bind(this);
    }

    componentWillMount() {
        this.loadItems(0);
    }

    loadItems(page) {
        this.setState({
            ...this.state,
            loading: true,
        });

        const { queryParams } = this.state;
        const params = {};
        for (const k in queryParams) {
            if (k === 'branchIds') {
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

        doGet(`core/hr/staff`, params)
            .then(response => {
                this.setState({
                    ...this.state,
                    items: response.data.items,
                    loading: false,
                    totalRows: response.data.meta.totalRows,
                    page: response.data.meta.page,
                    perPage: response.data.meta.perPage,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    redirectToView(e, staffId) {
        this.props.history.pushState(null, `/hr/staff/view/${staffId}`);
    }

    renderTableHeader() {
        return (
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>StaffID</Table.HeaderCell>
                    <Table.HeaderCell>Фамилия</Table.HeaderCell>
                    <Table.HeaderCell>Имя</Table.HeaderCell>
                    <Table.HeaderCell>Отчество</Table.HeaderCell>
                    <Table.HeaderCell>Должности</Table.HeaderCell>
                    <Table.HeaderCell>Действия</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
        );
    }

    renderPositions(positions) {
        if (typeof positions !== 'undefined' && positions.length > 0) {
            return (
                <List bulleted>
                    {positions.map((p, idx) => (
                        <List.Item key={idx}>
                            {p.positionName} ({p.branchName})
                        </List.Item>
                    ))}
                </List>
            );
        }

        return '';
    }

    renderTableBody() {
        return (
            <Table.Body>
                {this.state.items.length > 0 ? (
                    this.state.items.map((item, idx) => (
                        <Table.Row key={idx}>
                            <Table.Cell>{item.staffId}</Table.Cell>
                            <Table.Cell>{item.lastname}</Table.Cell>
                            <Table.Cell>{item.firstname}</Table.Cell>
                            <Table.Cell>{item.middlename}</Table.Cell>
                            <Table.Cell>
                                {this.renderPositions(item.positions)}
                            </Table.Cell>
                            <Table.Cell width={2}>
                                <Link
                                    className="ui icon button"
                                    to={`/hr/staff/view/${item.staffId}`}
                                >
                                    <Icon name="eye" />
                                </Link>

                                <Link
                                    className="ui icon button"
                                    to={`/hr/staff/update/${item.staffId}`}
                                >
                                    <Icon name="pencil" />
                                </Link>
                            </Table.Cell>
                        </Table.Row>
                    ))
                ) : (
                    <Table.Row>
                        <Table.Cell>No Records</Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        );
    }

    renderTableFooter() {
        return (
            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan="2">
                        Количество: {this.state.totalRows}
                    </Table.HeaderCell>
                    <Table.HeaderCell colSpan="5">
                        <LazyPagination
                            onItemClick={this.loadItems}
                            totalRows={this.state.totalRows}
                            currentPage={this.state.page}
                            perPage={this.state.perPage}
                        />
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        );
    }

    inputChanged(e, data) {
        const { name, value } = data;
        const { queryParams } = this.state;
        queryParams[name] = value;
        this.setState({
            ...this.state,
            queryParams,
        });
    }

    renderSearchPanel() {
        return (
            <div>
                <Header as="h4" attached="top">
                    Расширенный поиск
                </Header>
                <Segment attached>
                    <Form>
                        <BukrsF4 handleChange={this.handleDropdownChange} />
                        <BranchF4
                            search
                            multiple
                            handleChange={this.handleDropdownChange}
                            bukrs={this.state.queryParams.bukrs}
                        />
                        <PositionF4 handleChange={this.handleDropdownChange} />
                        <Form.Field>
                            <label>Фамилия</label>
                            <Input
                                name="lastName"
                                placeholder="Фамилия"
                                onChange={this.inputChanged}
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Имя</label>
                            <Input
                                name="firstName"
                                placeholder="Имя"
                                onChange={this.inputChanged}
                            />
                        </Form.Field>

                        <Button
                            loading={this.state.btnLoading}
                            onClick={() => this.loadItems(0)}
                            type="submit"
                        >
                            Сформировать
                        </Button>
                    </Form>
                </Segment>
            </div>
        );
    }

    handleDropdownChange(e, o) {
        const { name, value } = o;
        const { queryParams } = this.state;
        switch (name) {
            case 'bukrs':
                queryParams[name] = value;
                queryParams.branchIds = [];
                break;

            case 'branch':
                queryParams.branchIds = value;
                break;

            case 'position':
                queryParams.positionId = value;
                break;

            case 'resultIds':
                queryParams[name] = value;
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

    render() {
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
                    Список сотрудников
                </Header>
                <Divider />
                <Grid>
                    <Grid.Column floated="left" width={4}>
                        {this.renderSearchPanel()}
                    </Grid.Column>

                    <Grid.Column floated="left" width={12}>
                        {this.state.loading ? (
                            <Loader active inline="centered" />
                        ) : (
                            <Table celled striped>
                                {this.renderTableHeader()}
                                {this.renderTableBody()}
                                {this.renderTableFooter()}
                            </Table>
                        )}
                    </Grid.Column>
                </Grid>
                <Divider />
            </Container>
        );
    }
}

export default StaffList;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal,
  List,
  Button,
  Table,
  Icon,
  Header,
  Segment,
  Form,
  Input,
} from 'semantic-ui-react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {
  fetchCurrentSalaries,
  toggleSalaryListModal,
  toggleSalaryListModalLoading,
} from '../actions/hrSalaryAction';

class SalaryListModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      items: [],
      queryParams: {},
    };

    this.renderItems = this.renderItems.bind(this);
    this.renderSearchPanel = this.renderSearchPanel.bind(this);
    this.loadItems = this.loadItems.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  loadItems() {}

  renderItems() {
    const { items } = this.state;

    const columns = [
      {
        Header: 'staffId',
        accessor: 'staffId',
      },
      {
        Header: 'ФИО',
        accessor: 'staffName',
      },
      {
        Header: 'Должность',
        accessor: 'positionName',
      },
      {
        Header: 'Филиал',
        accessor: 'branchName',
      },
      {
        Header: 'Отдел',
        accessor: 'departmentName',
      },
    ];

    return (
      <ReactTable
        defaultFilterMethod={(filter, row) => {
          const colName = filter.id;

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
        filterable
        data={items || []}
        columns={columns}
        defaultPageSize={10}
        showPagination
        loadingText="Loading..."
        noDataText="Нет записей"
        className="-striped -highlight"
        previousText="Пред."
        nextText="След."
        rowsText="строк"
        pageText="Страница"
        ofText="из"
        showPageSizeOptions={false}
        getTrProps={(state, rowInfo, column) => ({
          onClick: (e, handleOriginal) => {
            this.props.onSelect(rowInfo.original);
          },
        })}
      />
    );
  }

  getBukrsBranches = () => {
    return [];
  };

  handleChange(e, o) {
    const { name, type, value } = o;
    let queryParams = Object.assign({}, this.state.queryParams);
    queryParams[name] = value;

    this.setState({
      ...this.state,
      queryParams,
    });
  }

  renderSearchPanel() {
    const { companyOptions, branchOptions } = this.props;
    const { queryParams } = this.state;
    //const

    const genders = [];
    return (
      <div>
        <Segment attached>
          <Form>
            <Form.Group>
              <Form.Select
                name="bukrs"
                label="Компания"
                options={companyOptions}
                placeholder="Компания"
                onChange={this.handleChange}
              />
              <Form.Select
                name="branch"
                multiple
                search
                selection
                label="Филиал"
                options={branchOptions}
                placeholder="Филиал"
                onChange={this.handleChange}
              />

              <Form.Field>
                <label>Фамилия</label>
                <Input
                  name="lastName"
                  placeholder="Фамилия"
                  onChange={this.handleChange}
                />
              </Form.Field>

              <Form.Field>
                <label>Имя</label>
                <Input
                  name="firstName"
                  placeholder="Имя"
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Button
                loading={this.state.btnLoading}
                onClick={this.loadItems}
                type="submit"
              >
                Сформировать
              </Button>
            </Form.Group>
          </Form>
        </Segment>
      </div>
    );
  }

  renderSearchPanel1() {
    let showSearchPanel = false;
    return (
      <Table collapsing>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Form.Select
                name="branch"
                multiple
                search
                selection
                label="Филиал"
                options={this.getBukrsBranches(this.state.queryParams.bukrs)}
                placeholder="Филиал"
                onChange={this.handleDropdownChange}
              />
            </Table.Cell>
            <Table.Cell />
            <Table.Cell>
              {showSearchPanel ? (
                <Button
                  icon
                  labelPosition="left"
                  primary
                  size="small"
                  onClick={() => {
                    this.props.toggleSalaryListModalLoading(true);
                    this.props.fetchCurrentSalaries([]);
                  }}
                  loading={this.props.salaryListModalLoading}
                  disabled={this.props.salaryListModalLoading}
                >
                  <Icon name="search" size="large" />
                  Поиск
                </Button>
              ) : (
                ''
              )}
            </Table.Cell>
            <Table.Cell />
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }

  render() {
    const { showSearchPanel } = this.props;
    return (
      <Modal size="large" open={this.props.salaryListModalOpened} closeOnEscape>
        <Modal.Header>Список должностей</Modal.Header>
        <Modal.Content>
          {this.renderSearchPanel()}

          {this.renderItems()}
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => this.props.toggleSalaryListModal(false)}>
            Закрыть
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentSalaries: state.hrSalaryReducer.currentSalaries,
    salaryListModalOpened: state.hrSalaryReducer.salaryListModalOpened,
    salaryListModalLoading: state.hrSalaryReducer.salaryListModalLoading,
  };
}

export default connect(
  mapStateToProps,
  { fetchCurrentSalaries, toggleSalaryListModal, toggleSalaryListModalLoading },
)(SalaryListModal);

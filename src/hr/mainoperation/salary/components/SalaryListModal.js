import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Segment, Form } from 'semantic-ui-react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {
  fetchCurrentSalaries,
  toggleSalaryListModal,
  toggleSalaryListModalLoading,
} from '../actions/hrSalaryAction';
import {
  f4FetchBranchOptions,
  f4ClearBranchOptions,
} from '../../../../reference/f4/f4_action';

class SalaryListModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      items: [],
      queryParams: {
        showAll: props.showAll || false,
      },
    };

    this.renderItems = this.renderItems.bind(this);
    this.renderSearchPanel = this.renderSearchPanel.bind(this);
    this.loadItems = this.loadItems.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  loadItems() {
    const { queryParams } = this.state;
    let params = {};
    for (let k in queryParams) {
      if (k === 'branchIds') {
        if (queryParams[k].length > 0) {
          params[k] = queryParams[k].join(',');
        }
      } else {
        params[k] = queryParams[k];
      }
    }
    this.props.fetchCurrentSalaries(params);
  }

  renderItems() {
    const { currentSalaries } = this.props;

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
        data={currentSalaries || []}
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

  handleChange(e, o) {
    const { name, type, value } = o;
    let queryParams = Object.assign({}, this.state.queryParams);
    queryParams[name] = value;
    if (name === 'bukrs') {
      let params = {};
      if (value == null || value.length === 0) {
        this.props.f4ClearBranchOptions();
      } else {
        params['bukrs'] = value;
        this.props.f4FetchBranchOptions(params);
      }
    }
    this.setState({
      ...this.state,
      queryParams,
    });
  }

  renderSearchPanel() {
    const { companyOptions, branchOptions } = this.props;
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
                name="branchIds"
                multiple
                search
                selection
                label="Филиал"
                options={branchOptions}
                placeholder="Филиал"
                onChange={this.handleChange}
              />
              <Button
                loading={this.state.btnLoading}
                onClick={this.loadItems}
                type="submit"
              >
                Сформировать
              </Button>
            </Form.Group>
            <Form.Group />
          </Form>
        </Segment>
      </div>
    );
  }

  render() {
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
    companyOptions: state.f4.companyOptions,
    branchOptions: state.f4.branchOptions,
  };
}

export default connect(mapStateToProps, {
  fetchCurrentSalaries,
  toggleSalaryListModal,
  toggleSalaryListModalLoading,
  f4FetchBranchOptions,
  f4ClearBranchOptions,
})(SalaryListModal);

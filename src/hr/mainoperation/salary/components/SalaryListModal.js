import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Modal, List, Button, Table, Icon } from 'semantic-ui-react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {
  fetchCurrentSalaries,
  toggleSalaryListModal,
  toggleSalaryListModalLoading,
} from '../actions/hrSalaryAction';

class SalaryListModal extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  render() {
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

    const salaries = this.props.currentSalaries || [];
    const { showSearchPanel } = this.props;
    return (
      <Modal size="large" open={this.props.salaryListModalOpened} closeOnEscape>
        <Modal.Header>Список должностей</Modal.Header>
        <Modal.Content>
          <Table collapsing>
            <Table.Body>
              <Table.Row>
                <Table.Cell />
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
            data={salaries || []}
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

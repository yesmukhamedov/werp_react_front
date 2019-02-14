import React from 'react';
import { Modal, List, Button, Table, Icon } from 'semantic-ui-react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const SubCompanyListModal = props => {
  const columns = [
    {
      Header: 'Название',
      accessor: 'nameRu',
    },
    {
      Header: 'Тип',
      accessor: 'typeNameRu',
    },
    {
      Header: 'Type(En)',
      accessor: 'typeNameEn',
    },
    {
      Header: 'Type(Tr)',
      accessor: 'typeNameTr',
    },
    {
      Header: 'Директор',
      accessor: 'director.lf',
    },
  ];

  const { opened, items } = props;
  let showSearchPanel = false;
  return (
    <Modal size="large" open={opened} closeOnEscape>
      <Modal.Header>Список Фирм</Modal.Header>
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
          data={items || []}
          columns={columns}
          defaultPageSize={15}
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
              props.onSelect(rowInfo.original);
            },
          })}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={props.closeModal}>Закрыть</Button>
      </Modal.Actions>
    </Modal>
  );
};

export default SubCompanyListModal;

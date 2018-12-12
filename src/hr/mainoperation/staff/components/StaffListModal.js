import React from 'react';
import { Modal, List, Button } from 'semantic-ui-react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default function StaffListModal(props) {
  const { staffs, opened } = props;
  const positionRenderer = positions => {
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
  };
  const columns = [
    {
      Header: 'staffId',
      accessor: 'staffId',
    },
    {
      Header: 'Фамилия',
      accessor: 'lastname',
    },
    {
      Header: 'Имя',
      accessor: 'firstname',
    },
    {
      Header: 'Отчество',
      accessor: 'middlename',
    },
    {
      Header: 'Должности',
      id: 'positions',
      accessor: row => positionRenderer(row.positions || []),
    },
  ];
  return (
    <Modal size="large" open={opened} closeOnEscape>
      <Modal.Header>Список сотрудников</Modal.Header>
      <Modal.Content>
        <ReactTable
          defaultFilterMethod={(filter, row) => {
            const colName = filter.id;
            if (colName === 'positions') {
              if (row._original && row._original.positions) {
                let s = '';
                row._original.positions.map(p => {
                  s += p.positionName;
                });

                if (!s) {
                  return false;
                }
                return s.toLowerCase().includes(filter.value.toLowerCase());
              }
            }

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
          data={staffs || []}
          columns={columns}
          defaultPageSize={20}
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
        <Button onClick={props.close}>Закрыть</Button>
      </Modal.Actions>
    </Modal>
  );
}

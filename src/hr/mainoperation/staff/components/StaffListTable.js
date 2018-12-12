import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Icon, List } from 'semantic-ui-react';
import LazyPagination from '../../../../general/pagination/LazyPagination';

/**
 * Список
 */

class StaffListTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    const { staffs } = this.props;
    return (
      <Table.Body>
        {(staffs && staffs.length) > 0 ? (
          staffs.map((item, idx) => (
            <Table.Row key={idx}>
              <Table.Cell>{item.id}</Table.Cell>
              <Table.Cell>{item.lastname}</Table.Cell>
              <Table.Cell>{item.firstname}</Table.Cell>
              <Table.Cell>{item.middlename}</Table.Cell>
              <Table.Cell>{this.renderPositions(item.positions)}</Table.Cell>
              <Table.Cell width={2}>
                <Link
                  className="ui icon button"
                  to={`/hr/staff/view/${item.id}`}
                >
                  <Icon name="eye" />
                </Link>

                <Link
                  className="ui icon button"
                  to={`/hr/staff/update/${item.id}`}
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
    const { meta } = this.props;
    return (
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan="2">
            Количество: {meta.totalRows}
          </Table.HeaderCell>
          <Table.HeaderCell colSpan="5">
            <LazyPagination
              onItemClick={this.props.loadItems}
              totalRows={meta.totalRows}
              currentPage={meta.page}
              perPage={meta.perPage}
            />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    );
  }

  render() {
    return (
      <Table celled striped>
        {this.renderTableHeader()}
        {this.renderTableBody()}
        {this.renderTableFooter()}
      </Table>
    );
  }
}

export default StaffListTable;

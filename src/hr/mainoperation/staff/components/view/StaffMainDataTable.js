import React from 'react';
import { Table } from 'semantic-ui-react';
import { formatTimestamptToDate } from '../../../../../utils/helpers';

export default function StaffMainDataTable(props) {
  const { staff } = props;

  return (
    <Table celled striped>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Фамилия</Table.Cell>
          <Table.Cell>{staff.lastname}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Имя</Table.Cell>
          <Table.Cell>{staff.firstname}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Отчество</Table.Cell>
          <Table.Cell>{staff.middlename}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>ИИН</Table.Cell>
          <Table.Cell>{staff.iin}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>Дата рождения</Table.Cell>
          <Table.Cell>{formatTimestamptToDate(staff.birthday)}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>Пол</Table.Cell>
          <Table.Cell>
            {staff.gender === 'male' ? 'Мужской' : 'Женский'}
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>Оф. фирма</Table.Cell>
          <Table.Cell>{staff.subCompanyName}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>TS сотрудник</Table.Cell>
          <Table.Cell>{staff.tsStaffName}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>TS Date</Table.Cell>
          <Table.Cell>{staff.tsDate}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
